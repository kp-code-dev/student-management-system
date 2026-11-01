package com.studentmanagement.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import com.studentmanagement.backend.service.CustomUserDetailsService;

import java.io.IOException;

// Component makes this filter available to Spring.
// OncePerRequestFilter executes the filter once per request.
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    // Service responsible for JWT token operations.
    private final JwtService jwtService;

    // Service responsible for loading user details.
    private final CustomUserDetailsService userDetailsService;

    // Constructor injection for required services.
    public JwtAuthenticationFilter(
            JwtService jwtService,
            CustomUserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    // This method executes for every incoming HTTP request.
    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        // Reads the Authorization header from the request.
        final String authHeader = request.getHeader("Authorization");

        // Checks whether the request contains a Bearer token.
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {

            // Continues the filter chain if no token is provided.
            filterChain.doFilter(request, response);
            return;
        }

        try {
            // Extracts the JWT token after the Bearer prefix.
            String token = authHeader.substring(7);

            // Extracts the user's email from the token.
            String email = jwtService.extractEmail(token);

            // Checks whether the user is not already authenticated.
            if (email != null &&
                    SecurityContextHolder.getContext().getAuthentication() == null) {

                // Loads the user details using the email address.
                UserDetails userDetails =
                        userDetailsService.loadUserByUsername(email);

                // Validates the token before authenticating the user.
                if (jwtService.isTokenValid(token, userDetails.getUsername())) {

                    // Creates an authentication object for Spring Security.
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );

                    // Adds request details to the authentication object.
                    authentication.setDetails(
                            new WebAuthenticationDetailsSource()
                                    .buildDetails(request)
                    );

                    // Stores authenticated user information in the security context.
                    SecurityContextHolder.getContext()
                            .setAuthentication(authentication);
                }
            }
        } catch (io.jsonwebtoken.JwtException |
                 org.springframework.security.core.userdetails.UsernameNotFoundException ex) {

            // Clears the security context if the token is invalid or user is missing.
            SecurityContextHolder.clearContext();
        }

        // Passes the request to the next filter.
        filterChain.doFilter(request, response);
    }
}