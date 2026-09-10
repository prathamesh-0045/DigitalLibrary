package com.oasis.library.controller;
import com.oasis.library.entity.Booking; import com.oasis.library.service.LibraryService; import org.springframework.web.bind.annotation.*; import java.util.List;
@RestController @RequestMapping("/api/bookings") public class BookingController { private final LibraryService s; public BookingController(LibraryService s){this.s=s;} @PostMapping("/reserve") public Booking reserve(@RequestParam Long userId,@RequestParam Long bookId){return s.reserve(userId,bookId);} @GetMapping public List<Booking> all(){return s.allBookings();} }
