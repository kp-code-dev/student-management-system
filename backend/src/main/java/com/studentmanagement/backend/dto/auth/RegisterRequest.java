package com.studentmanagement.backend.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

// This class stores the data received from the registration form.
public class RegisterRequest {

    // Name is mandatory and cannot be blank.
    @NotBlank(message = "Name is required")
    private String name;

    // Validates the email format and checks that it is not empty.
    @Email(message = "Enter a valid email")
    @NotBlank(message = "Email is required")
    private String email;

    // Password must contain at least 8 characters.
    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

    // Returns the user's name.
    public String getName() {
        return name;
    }

    // Sets the user's name.
    public void setName(String name) {
        this.name = name;
    }

    // Returns the user's email.
    public String getEmail() {
        return email;
    }

    // Sets the user's email.
    public void setEmail(String email) {
        this.email = email;
    }

    // Returns the user's password.
    public String getPassword() {
        return password;
    }

    // Sets the user's password.
    public void setPassword(String password) {
        this.password = password;
    }
}