package com.studentmanagement.backend.model;

import jakarta.persistence.*;

// Marks this class as a JPA entity.
// Its objects are stored in the database.
@Entity

// Maps this entity to the app_users database table.
@Table(name = "app_users")
public class AppUser {

    // Primary key of the table.
    @Id

    // Automatically generates a unique ID.
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Stores the user's name. It cannot be NULL.
    @Column(nullable = false)
    private String name;

    // Stores a unique email address.
    @Column(nullable = false, unique = true)
    private String email;

    // Stores the encrypted password.
    @Column(nullable = false)
    private String password;

    // Assigns USER as the default role.
    @Column(nullable = false)
    private String role = "USER";

    // Default constructor required by JPA.
    public AppUser() {
    }

    // Returns the user ID.
    public Long getId() {
        return id;
    }

    // Sets the user ID.
    public void setId(Long id) {
        this.id = id;
    }

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

    // Returns the encrypted password.
    public String getPassword() {
        return password;
    }

    // Sets the encrypted password.
    public void setPassword(String password) {
        this.password = password;
    }

    // Returns the user's role.
    public String getRole() {
        return role;
    }

    // Sets the user's role.
    public void setRole(String role) {
        this.role = role;
    }
}