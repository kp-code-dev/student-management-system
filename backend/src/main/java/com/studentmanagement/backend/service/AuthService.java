package com.studentmanagement.backend.service;

import com.studentmanagement.backend.dto.auth.AuthResponse;
import com.studentmanagement.backend.dto.auth.LoginRequest;
import com.studentmanagement.backend.dto.auth.RegisterRequest;
import com.studentmanagement.backend.model.AppUser;
import com.studentmanagement.backend.repository.AppUserRepository;
import com.studentmanagement.backend.security.JwtService;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

// Marks this class as a service component.
// It contains the business logic for user authentication.
@Service
public class AuthService {

    // Repository used to access user records in the database.
    private final AppUserRepository appUserRepository;

    // Encoder used to hash passwords securely.
    private final PasswordEncoder passwordEncoder;

    // Used to authenticate users during login.
    private final AuthenticationManager authenticationManager;

    // Service used to generate JWT tokens.
    private final JwtService jwtService;

    // Constructor injection for all required dependencies.
    public AuthService(
            AppUserRepository appUserRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtService jwtService) {
        this.appUserRepository = appUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    // Registers a new user in the application.
    public AuthResponse register(RegisterRequest request) {

        // Checks whether the email is already registered.
        if (appUserRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        // Creates a new user object.
        AppUser user = new AppUser();

        // Sets user details received from the registration request.
        user.setName(request.getName());
        user.setEmail(request.getEmail());

        // Hashes the password before storing it in the database.
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // Assigns role: Any faculty email ending with @studenthub.edu is granted ROLE_FACULTY (Faculty).
        // Otherwise, standard students receive ROLE_STUDENT.
        String email = request.getEmail().trim().toLowerCase();

        if (email.endsWith("@studenthub.edu")) {
            throw new RuntimeException("Faculty accounts can only be created by Admin");
        }

        String assignedRole = "ROLE_STUDENT";
        user.setRole(assignedRole);

        // Saves the new user in the database.
        AppUser savedUser = appUserRepository.save(user);

        // Include role and userId claims in JWT
        java.util.Map<String, Object> claims = new java.util.HashMap<>();
        claims.put("role", assignedRole);
        claims.put("userId", savedUser.getId());

        // Generates a JWT token for the registered user.
        String token = jwtService.generateToken(savedUser.getEmail(), claims);

        // Returns the token and user details (role without ROLE_ prefix for clean frontend consumption if desired, or standardized)
        String roleName = savedUser.getRole().replace("ROLE_", "");
        return new AuthResponse(
                token,
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                roleName
        );
    }

    // Authenticates an existing user using email and password.
    public AuthResponse login(LoginRequest request) {

        // Verifies the provided email and password.
        // Spring Security checks the password using the configured PasswordEncoder.
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // Finds the authenticated user in the database.
        AppUser user = appUserRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Normalize stored role: Any user with @studenthub.edu is treated as Faculty / ADMIN
        String storedRole = user.getRole();

        if (storedRole == null || storedRole.isBlank()) {
            throw new RuntimeException("User role is not assigned");
        }

        if (!storedRole.startsWith("ROLE_")) {
            storedRole = "ROLE_" + storedRole.toUpperCase();
        }

        java.util.Map<String, Object> claims = new java.util.HashMap<>();
        claims.put("role", storedRole);
        claims.put("userId", user.getId());

        // Generates a new JWT token after successful login.
        String token = jwtService.generateToken(user.getEmail(), claims);

        String roleName = storedRole.replace("ROLE_", "");

        // Returns the token and user details to the frontend.
        return new AuthResponse(
                token,
                user.getId(),
                user.getName(),
                user.getEmail(),
                roleName
        );
    }

    // Allows authenticated users to change their password securely
    public void changePassword(String email, com.studentmanagement.backend.dto.auth.ChangePasswordRequest request) {
        AppUser user = appUserRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

        // Verify current password matches
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Current password does not match!");
        }

        // Encode and update new password
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        appUserRepository.save(user);
    }
}