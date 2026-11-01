package com.studentmanagement.backend.repository;

import com.studentmanagement.backend.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// Marks this interface as a repository component.
@Repository

// JpaRepository provides built-in database operations
// such as save(), findById(), findAll() and deleteById().
public interface AppUserRepository extends JpaRepository<AppUser, Long> {

    // Finds a user by email address.
    // Optional handles cases where the user does not exist.
    Optional<AppUser> findByEmail(String email);

    // Checks whether an email already exists in the database.
    boolean existsByEmail(String email);
}