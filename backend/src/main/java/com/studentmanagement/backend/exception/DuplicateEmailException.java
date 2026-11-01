package com.studentmanagement.backend.exception;

// Unit 3: Exception Handling
// Topic: User-Defined Exception

// Unit 2: Inheritance
// RuntimeException is the parent class.

public class DuplicateEmailException extends RuntimeException {

    // Unit 2: Constructor
    public DuplicateEmailException(String message) {

        // Unit 2: super keyword
        // Calls the parent class constructor.
        super(message);
    }
}