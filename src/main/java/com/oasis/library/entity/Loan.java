package com.oasis.library.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name="loans")
public class Loan {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @ManyToOne(optional=false) private User user;
    @ManyToOne(optional=false) private Book book;
    private LocalDate issueDate;
    private LocalDate dueDate;
    private LocalDate returnDate;
    private double fine;
    private boolean finePaid = false;
    public Loan() {}
    public Long getId(){return id;} public User getUser(){return user;} public Book getBook(){return book;} public LocalDate getIssueDate(){return issueDate;} public LocalDate getDueDate(){return dueDate;} public LocalDate getReturnDate(){return returnDate;} public double getFine(){return fine;} public boolean isFinePaid(){return finePaid;}
    public void setUser(User v){user=v;} public void setBook(Book v){book=v;} public void setIssueDate(LocalDate v){issueDate=v;} public void setDueDate(LocalDate v){dueDate=v;} public void setReturnDate(LocalDate v){returnDate=v;} public void setFine(double v){fine=v;} public void setFinePaid(boolean v){finePaid=v;}
}
