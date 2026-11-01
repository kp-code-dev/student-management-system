package com.studentmanagement.backend.dto.auth;

// This class represents the response sent after successful authentication.
public class AuthResponse {

    // JWT authentication token.
    private String token;

    // Type of authentication token.
    private String tokenType;

    // Unique ID of the registered user.
    private Long id;

    // Name of the user.
    private String name;

    // Email address of the user.
    private String email;

    // Role assigned to the user.
    private String role;

    // Constructor to initialize all response fields.
    public AuthResponse(String token, Long id, String name, String email, String role) {
        this.token = token;
        this.tokenType = "Bearer";
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    // Returns the JWT token.
    public String getToken() {
        return token;
    }

    // Returns the token type.
    public String getTokenType() {
        return tokenType;
    }

    // Returns the user ID.
    public Long getId() {
        return id;
    }

    // Returns the user's name.
    public String getName() {
        return name;
    }

    // Returns the user's email.
    public String getEmail() {
        return email;
    }

    // Returns the user's role.
    public String getRole() {
        return role;
    }
}