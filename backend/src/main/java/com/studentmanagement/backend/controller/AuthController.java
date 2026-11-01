package com.studentmanagement.backend.controller;

import com.studentmanagement.backend.dto.auth.AuthResponse;
import com.studentmanagement.backend.dto.auth.LoginRequest;
import com.studentmanagement.backend.dto.auth.RegisterRequest;
import com.studentmanagement.backend.service.AuthService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Marks this class as a REST API controller.
// It handles HTTP requests and returns JSON responses.
@RestController

// Defines the common URL for all authentication APIs.
@RequestMapping("/api/auth")

// Allows the React frontend to access these APIs.
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    // Service object used to perform authentication operations.
    private final AuthService authService;

    // Constructor injection to initialize AuthService.
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // Handles user registration requests.
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            // Validates the incoming registration data.
            @Valid @RequestBody RegisterRequest request) {

        // Returns HTTP 201 Created after successful registration.
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(authService.register(request));
    }

    // Handles user login requests.
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            // Validates the incoming login data.
            @Valid @RequestBody LoginRequest request) {

        // Returns HTTP 200 OK with authentication details.
        return ResponseEntity.ok(authService.login(request));
    }

    // Handles password change for authenticated users
    @PostMapping("/change-password")
    public ResponseEntity<java.util.Map<String, String>> changePassword(
            @Valid @RequestBody com.studentmanagement.backend.dto.auth.ChangePasswordRequest request,
            org.springframework.security.core.Authentication authentication) {

        if (authentication == null || authentication.getName() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        authService.changePassword(authentication.getName(), request);

        java.util.Map<String, String> response = new java.util.HashMap<>();
        response.put("message", "Password changed successfully!");
        return ResponseEntity.ok(response);
    }
}