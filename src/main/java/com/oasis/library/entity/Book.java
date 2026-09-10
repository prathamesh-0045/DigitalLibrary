package com.oasis.library.entity;

import jakarta.persistence.*;

@Entity
public class Book {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @Column(nullable=false) private String title;
    @Column(nullable=false) private String author;
    @Column(nullable=false, unique=true) private String isbn;
    private String category;
    private int quantity;
    private int availableQuantity;
    public Book() {}
    public Long getId(){return id;} public String getTitle(){return title;} public String getAuthor(){return author;} public String getIsbn(){return isbn;} public String getCategory(){return category;} public int getQuantity(){return quantity;} public int getAvailableQuantity(){return availableQuantity;}
    public void setTitle(String v){title=v;} public void setAuthor(String v){author=v;} public void setIsbn(String v){isbn=v;} public void setCategory(String v){category=v;} public void setQuantity(int v){quantity=v;} public void setAvailableQuantity(int v){availableQuantity=v;}
}
