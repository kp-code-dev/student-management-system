package com.studentmanagement.backend.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

// This class stores the data received from the login form.
public class LoginRequest {

    // Checks that the email is valid and not empty.
    @Email(message = "Enter a valid email")
    @NotBlank(message = "Email is required")
    private String email;

    // Ensures that the password is not empty.
    @NotBlank(message = "Password is required")
    private String password;

    // Returns the email address.
    public String getEmail() {
        return email;
    }

    // Sets the email address.
    public void setEmail(String email) {
        this.email = email;
    }

    // Returns the password.
    public String getPassword() {
        return password;
    }

    // Sets the password.
    public void setPassword(String password) {
        this.password = password;
    }
}