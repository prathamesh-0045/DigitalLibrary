package com.oasis.library.controller;

import com.oasis.library.entity.User;
import com.oasis.library.service.LibraryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Read-only listing of registered members for the admin dashboard.
 * Deliberately returns a safe view (id/name/email/role) rather than
 * the raw User entity, since that entity also carries the password hash.
 */
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final LibraryService s;
    public UserController(LibraryService s) { this.s = s; }

    @GetMapping
    public List<Map<String, Object>> all() {
        return s.allUsers().stream()
                .map(u -> Map.<String, Object>of(
                        "id", u.getId(),
                        "name", u.getName(),
                        "email", u.getEmail(),
                        "role", u.getRole()))
                .collect(Collectors.toList());
    }
}
