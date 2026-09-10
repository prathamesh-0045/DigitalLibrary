package com.oasis.library.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Booking {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @ManyToOne(optional=false) private User user;
    @ManyToOne(optional=false) private Book book;
    private LocalDateTime bookingDate = LocalDateTime.now();
    public Booking() {}
    public Long getId(){return id;} public User getUser(){return user;} public Book getBook(){return book;} public LocalDateTime getBookingDate(){return bookingDate;}
    public void setUser(User v){user=v;} public void setBook(Book v){book=v;}
}
