package com.oasis.library.controller;
import com.oasis.library.entity.ContactMessage; import com.oasis.library.service.LibraryService; import org.springframework.web.bind.annotation.*; import java.util.List;
@RestController @RequestMapping("/api/contact") public class ContactController { private final LibraryService s; public ContactController(LibraryService s){this.s=s;} @PostMapping public ContactMessage send(@RequestBody ContactMessage m){return s.message(m);} @GetMapping public List<ContactMessage> all(){return s.messages();} }
