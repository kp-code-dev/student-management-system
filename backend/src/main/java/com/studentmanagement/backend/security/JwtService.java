package com.studentmanagement.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

// Service class responsible for generating and validating JWT tokens.
@Service
public class JwtService {

    // Reads the secret key from application.properties.
    @Value("${app.jwt.secret}")
    private String secret;

    // Reads the token expiration time in milliseconds.
    @Value("${app.jwt.expiration}")
    private long expiration;

    // Converts the Base64 secret into a cryptographic signing key.
    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // Generates a JWT token for the given user's email.
    public String generateToken(String email) {
        return generateToken(email, java.util.Collections.emptyMap());
    }

    // Generates a JWT token for the given user's email with custom claims (role, userId).
    public String generateToken(String email, java.util.Map<String, Object> extraClaims) {
        Date now = new Date();
        return Jwts.builder()
                .claims(extraClaims)
                .subject(email)
                .issuedAt(now)
                .expiration(new Date(now.getTime() + expiration))
                .signWith(getSigningKey())
                .compact();
    }

    // Extracts the email stored in the JWT subject.
    public String extractEmail(String token) {
        return getClaims(token).getSubject();
    }

    // Checks whether the token belongs to the given email and is not expired.
    public boolean isTokenValid(String token, String email) {
        String extractedEmail = extractEmail(token);
        return extractedEmail.equals(email) && !isTokenExpired(token);
    }

    // Checks whether the token expiration date has passed.
    private boolean isTokenExpired(String token) {
        return getClaims(token).getExpiration().before(new Date());
    }

    // Parses the token and returns its claims after signature verification.
    private Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}