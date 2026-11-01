package com.studentmanagement.backend.exception;

// Unit 3: Exception Handling
// Topics: User-Defined Exception and Exception Handling

// Unit 2: Inheritance
// RuntimeException is the parent class of this custom exception.

public class ResourceNotFoundException extends RuntimeException {

    // Constructor accepts a custom error message.
    public ResourceNotFoundException(String message) {

        // Calls the parent class constructor using super.
        super(message);
    }
}