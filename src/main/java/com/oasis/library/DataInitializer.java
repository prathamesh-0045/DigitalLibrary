package com.oasis.library;

import com.oasis.library.entity.Book;
import com.oasis.library.entity.User;
import com.oasis.library.repository.BookRepository;
import com.oasis.library.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {
    @Bean
    CommandLineRunner seedData(UserRepository users, BookRepository books, PasswordEncoder encoder) {
        return args -> {
            if (users.findByEmail("admin@libris.com").isEmpty()) {
                User admin = new User();
                admin.setName("Libris Administrator");
                admin.setEmail("admin@libris.com");
                admin.setPassword(encoder.encode("Admin@123"));
                admin.setRole(User.Role.ADMIN);
                users.save(admin);
            }

            if (books.count() == 0) {
                addBook(books, "Atomic Habits", "James Clear", "9780735211292", "Self Development", 4);
                addBook(books, "Clean Code", "Robert C. Martin", "9780132350884", "Technology", 3);
                addBook(books, "The Alchemist", "Paulo Coelho", "9780062315007", "Fiction", 5);
                addBook(books, "Deep Work", "Cal Newport", "9781455586691", "Productivity", 3);
                addBook(books, "The Pragmatic Programmer", "David Thomas", "9780135957059", "Technology", 4);
                addBook(books, "Ikigai", "Hector Garcia", "9780143130727", "Lifestyle", 2);
            }
        };
    }

    private void addBook(BookRepository books, String title, String author, String isbn, String category, int quantity) {
        Book b = new Book();
        b.setTitle(title); b.setAuthor(author); b.setIsbn(isbn); b.setCategory(category);
        b.setQuantity(quantity); b.setAvailableQuantity(quantity);
        books.save(b);
    }
}
