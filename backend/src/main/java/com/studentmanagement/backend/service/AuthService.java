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

        // Assigns the default USER role.
        user.setRole("USER");

        // Saves the new user in the database.
        AppUser savedUser = appUserRepository.save(user);

        // Generates a JWT token for the registered user.
        String token = jwtService.generateToken(savedUser.getEmail());

        // Returns the token and user details.
        return new AuthResponse(
                token,
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getRole()
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

        // Generates a new JWT token after successful login.
        String token = jwtService.generateToken(user.getEmail());

        // Returns the token and user details to the frontend.
        return new AuthResponse(
                token,
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }
}