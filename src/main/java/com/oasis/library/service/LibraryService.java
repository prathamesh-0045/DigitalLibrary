package com.oasis.library.service;

import com.oasis.library.entity.*;
import com.oasis.library.repository.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class LibraryService {
    private final UserRepository users; private final BookRepository books; private final LoanRepository loans; private final BookingRepository bookings; private final ContactMessageRepository messages; private final PasswordEncoder encoder;
    public LibraryService(UserRepository users,BookRepository books,LoanRepository loans,BookingRepository bookings,ContactMessageRepository messages,PasswordEncoder encoder){this.users=users;this.books=books;this.loans=loans;this.bookings=bookings;this.messages=messages;this.encoder=encoder;}

    public User register(String name,String email,String password){ if(users.findByEmail(email).isPresent()) throw new IllegalArgumentException("Email already registered"); User u=new User();u.setName(name);u.setEmail(email);u.setPassword(encoder.encode(password));u.setRole(User.Role.USER);return users.save(u); }
    public User login(String email,String password){ User u=users.findByEmail(email).orElseThrow(()->new IllegalArgumentException("Invalid credentials")); if(!encoder.matches(password,u.getPassword())) throw new IllegalArgumentException("Invalid credentials"); return u; }
    public User createAdmin(String name,String email,String password){ User u=users.findByEmail(email).orElseGet(User::new);u.setName(name);u.setEmail(email);u.setPassword(encoder.encode(password));u.setRole(User.Role.ADMIN);return users.save(u); }

    public List<Book> allBooks(){return books.findAll();}
    public List<Book> search(String q){return books.findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(q,q);}
    public List<Book> category(String q){return books.findByCategoryIgnoreCase(q);}
    public Book addBook(Book b){b.setAvailableQuantity(b.getQuantity());return books.save(b);}
    public Book updateBook(Long id,Book b){Book x=books.findById(id).orElseThrow();int issued=x.getQuantity()-x.getAvailableQuantity();x.setTitle(b.getTitle());x.setAuthor(b.getAuthor());x.setIsbn(b.getIsbn());x.setCategory(b.getCategory());x.setQuantity(b.getQuantity());x.setAvailableQuantity(Math.max(0,b.getQuantity()-issued));return books.save(x);}
    public void deleteBook(Long id){books.deleteById(id);}

    public Loan issue(Long userId,Long bookId){User u=users.findById(userId).orElseThrow();Book b=books.findById(bookId).orElseThrow();if(b.getAvailableQuantity()<=0)throw new IllegalStateException("Book unavailable");b.setAvailableQuantity(b.getAvailableQuantity()-1);books.save(b);Loan l=new Loan();l.setUser(u);l.setBook(b);l.setIssueDate(LocalDate.now());l.setDueDate(LocalDate.now().plusDays(14));return loans.save(l);}
    public Loan returnBook(Long loanId){Loan l=loans.findByIdAndReturnDateIsNull(loanId).orElseThrow();LocalDate today=LocalDate.now();l.setReturnDate(today);long late=Math.max(0,today.toEpochDay()-l.getDueDate().toEpochDay());l.setFine(late*5.0);Book b=l.getBook();b.setAvailableQuantity(b.getAvailableQuantity()+1);books.save(b);return loans.save(l);}
    public List<Loan> issued(){return loans.findByReturnDateIsNull();}
    public List<Loan> userLoans(Long userId){return loans.findByUserIdAndReturnDateIsNull(userId);}
    public List<Loan> allLoans(){return loans.findAll();}
    public Loan markFinePaid(Long loanId){Loan l=loans.findById(loanId).orElseThrow();l.setFinePaid(true);return loans.save(l);}
    public Booking reserve(Long userId,Long bookId){User u=users.findById(userId).orElseThrow();Book b=books.findById(bookId).orElseThrow();if(b.getAvailableQuantity()>0)throw new IllegalStateException("Book is currently available; issue it instead");Booking x=new Booking();x.setUser(u);x.setBook(b);return bookings.save(x);}
    public List<Booking> allBookings(){return bookings.findAll();}
    public ContactMessage message(ContactMessage m){return messages.save(m);} public List<ContactMessage> messages(){return messages.findAll();}
    public List<User> allUsers(){return users.findAll();}
}
