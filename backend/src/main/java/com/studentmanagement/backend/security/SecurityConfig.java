package com.studentmanagement.backend.security;

import java.util.List;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// Marks this class as a Spring configuration class.
@Configuration
public class SecurityConfig {

    // Custom JWT filter used to authenticate incoming requests.
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    // Constructor injection for the JWT filter.
    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    // Frontend URL from environment variable.
    @Value("${app.frontend.url}")
    private String frontendUrl;

    // CORS Configuration
    // Allows requests from localhost and deployed Vercel frontend.
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
    // Your CORS configuration code...
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(List.of(
            "http://localhost:5173",
            frontendUrl
        ));

        configuration.setAllowedMethods(List.of(
            "GET", "POST", "PUT", "DELETE", "OPTIONS"
        ));

        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    // Creates a BCrypt password encoder bean.
    // BCrypt hashes passwords before storing them in the database.
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Provides the AuthenticationManager bean for login verification.
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    // Configures HTTP security rules for the application.
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
            // Disables CSRF protection because the API uses stateless JWT authentication.
            .csrf(csrf -> csrf.disable())

            // Enables CORS configuration.
            .cors(Customizer.withDefaults())

            // Prevents the server from creating HTTP sessions.
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // Defines which API endpoints require authentication.
            .authorizeHttpRequests(auth -> auth

                // Registration and login endpoints are publicly accessible.
                .requestMatchers("/api/auth/**").permitAll()

                // All other endpoints require authentication.
                .anyRequest().authenticated()
            )

            // Executes the JWT filter before the standard username/password filter.
            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        // Builds and returns the security filter chain.
        return http.build();
    }
}