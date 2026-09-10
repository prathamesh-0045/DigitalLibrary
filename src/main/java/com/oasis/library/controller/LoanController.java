package com.oasis.library.controller;
import com.oasis.library.entity.Loan; import com.oasis.library.service.LibraryService; import org.springframework.web.bind.annotation.*; import java.util.List;
@RestController @RequestMapping("/api/loans") public class LoanController { private final LibraryService s; public LoanController(LibraryService s){this.s=s;}
 @PostMapping("/issue") public Loan issue(@RequestParam Long userId,@RequestParam Long bookId){return s.issue(userId,bookId);}
 @PutMapping("/{id}/return") public Loan returnBook(@PathVariable Long id){return s.returnBook(id);}
 @PutMapping("/{id}/fine-paid") public Loan markFinePaid(@PathVariable Long id){return s.markFinePaid(id);}
 @GetMapping public List<Loan> issued(){return s.issued();}
 @GetMapping("/all") public List<Loan> all(){return s.allLoans();}
 @GetMapping("/user/{userId}") public List<Loan> user(@PathVariable Long userId){return s.userLoans(userId);}
}
