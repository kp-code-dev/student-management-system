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

        // Converts the application user into Spring Security's UserDetails object.
        // This allows Spring Security to verify the user's password and role.
        return User.builder()
                .username(appUser.getEmail())
                .password(appUser.getPassword())
                .roles(appUser.getRole())
                .build();
    }
}