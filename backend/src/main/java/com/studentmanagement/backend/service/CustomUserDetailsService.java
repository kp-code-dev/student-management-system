package com.studentmanagement.backend.service;

import com.studentmanagement.backend.model.AppUser;
import com.studentmanagement.backend.repository.AppUserRepository;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

// Marks this class as a Spring service.
// It provides user details to Spring Security during authentication.
@Service
public class CustomUserDetailsService implements UserDetailsService {

    // Repository used to find users in the database.
    private final AppUserRepository appUserRepository;

    // Constructor injection for the user repository.
    public CustomUserDetailsService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    // Loads user details using the user's email address.
    // Spring Security calls this method during authentication.
    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        // Searches for the user using the provided email.
        AppUser appUser = appUserRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "User not found with email: " + email
                ));

        // Normalize role name: any user with @studenthub.edu is recognized as ADMIN (Faculty)
        String emailLower = appUser.getEmail() != null ? appUser.getEmail().trim().toLowerCase() : "";
        String cleanRole;
        if (emailLower.endsWith("@studenthub.edu")) {
            cleanRole = "ADMIN";
        } else {
            String rawRole = appUser.getRole() != null ? appUser.getRole() : "STUDENT";
            cleanRole = rawRole.startsWith("ROLE_") ? rawRole.substring(5) : rawRole;
        }

        // Converts the application user into Spring Security's UserDetails object.
        // Spring Security User.builder().roles(...) will automatically add the "ROLE_" prefix.
        return User.builder()
                .username(appUser.getEmail())
                .password(appUser.getPassword())
                .roles(cleanRole)
                .build();
    }
}