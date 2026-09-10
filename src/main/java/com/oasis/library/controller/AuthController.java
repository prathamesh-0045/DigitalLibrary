package com.oasis.library.controller;

import com.oasis.library.entity.User;
import com.oasis.library.service.LibraryService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/auth")
public class AuthController {
    private final LibraryService service; public AuthController(LibraryService service){this.service=service;}
    public record AuthRequest(@NotBlank String name,@Email @NotBlank String email,@Size(min=8) String password){}
    public record LoginRequest(@Email @NotBlank String email,@NotBlank String password){}
    @PostMapping("/register") public ResponseEntity<?> register(@Valid @RequestBody AuthRequest r){User u=service.register(r.name(),r.email(),r.password());return ResponseEntity.ok(java.util.Map.of("id",u.getId(),"name",u.getName(),"email",u.getEmail(),"role",u.getRole()));}
    @PostMapping("/login") public ResponseEntity<?> login(@Valid @RequestBody LoginRequest r){User u=service.login(r.email(),r.password());return ResponseEntity.ok(java.util.Map.of("id",u.getId(),"name",u.getName(),"email",u.getEmail(),"role",u.getRole()));}
    @PostMapping("/admin") public ResponseEntity<?> createAdmin(@Valid @RequestBody AuthRequest r){User u=service.createAdmin(r.name(),r.email(),r.password());return ResponseEntity.ok(java.util.Map.of("id",u.getId(),"name",u.getName(),"email",u.getEmail(),"role",u.getRole()));}
}
