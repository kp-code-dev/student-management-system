package com.studentmanagement.backend.exception;

// Unit 3: Exception Handling
// Topics: Exception Handling, try-catch and User-Defined Exception

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

// Spring Boot: Handles exceptions globally for REST controllers.
@RestControllerAdvice
public class GlobalExceptionHandler {

    // Handles our custom ResourceNotFoundException.
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleNotFoundException(
            ResourceNotFoundException exception) {

        // Unit 4: Generic Programming - Map<String, String>
        // Stores error details as key-value pairs.
        Map<String, String> error = new HashMap<>();

        error.put("error", "Not Found");
        error.put("message", exception.getMessage());

        // Returns HTTP 404 response.
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    // Unit 3: Exception Handling
    // Topic: Exception Handling using @ExceptionHandler

    // Handles duplicate email exception.
    @ExceptionHandler(DuplicateEmailException.class)
    public ResponseEntity<Map<String, String>> handleDuplicateEmailException(
            DuplicateEmailException exception) {

        // Unit 4: Generic Programming
        // Map stores error information in key-value pairs.
        Map<String, String> error = new HashMap<>();

        error.put("error", "Duplicate Email");
        error.put("message", exception.getMessage());

        // Returns HTTP 409 Conflict response.
        return new ResponseEntity<>(error, HttpStatus.CONFLICT);
    }

    // Handles authentication failures (Bad credentials / invalid login)
    @ExceptionHandler(org.springframework.security.authentication.BadCredentialsException.class)
    public ResponseEntity<Map<String, String>> handleBadCredentials(
            org.springframework.security.authentication.BadCredentialsException exception) {
        Map<String, String> error = new HashMap<>();
        error.put("error", "Unauthorized");
        error.put("message", "Invalid email or password");
        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }

    // Handles generic runtime exceptions (e.g. duplicate faculty ID)
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleRuntimeException(RuntimeException exception) {
        Map<String, String> error = new HashMap<>();
        error.put("error", "Bad Request");
        error.put("message", exception.getMessage());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
}