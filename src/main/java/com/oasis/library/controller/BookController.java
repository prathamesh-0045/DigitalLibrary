package com.oasis.library.controller;

import com.oasis.library.entity.Book; import com.oasis.library.service.LibraryService; import org.springframework.web.bind.annotation.*; import java.util.List;
@RestController @RequestMapping("/api/books")
public class BookController {
 private final LibraryService s; public BookController(LibraryService s){this.s=s;}
 @GetMapping public List<Book> all(@RequestParam(required=false) String search,@RequestParam(required=false) String category){if(search!=null&&!search.isBlank())return s.search(search);if(category!=null&&!category.isBlank())return s.category(category);return s.allBooks();}
 @PostMapping public Book add(@RequestBody Book b){return s.addBook(b);}
 @PutMapping("/{id}") public Book update(@PathVariable Long id,@RequestBody Book b){return s.updateBook(id,b);}
 @DeleteMapping("/{id}") public void delete(@PathVariable Long id){s.deleteBook(id);}
}
