package com.studentmanagement.backend.repository;

// Unit 2: Inheritance and Interface
// Topic: Interface, Inheritance

import com.studentmanagement.backend.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// Spring Data JPA: Marks this interface as a repository.
// Unit 2: Interface
// StudentRepository is an interface, not a class.

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    /*
     * Unit 2: Inheritance
     * The extends keyword allows this interface to inherit
     * CRUD methods from JpaRepository.
     *
     * Unit 4: Generic Programming
     * Student = Entity type
     * Long = Data type of Student's ID
     *
     * Spring Data JPA automatically provides methods like:
     * save(), findAll(), findById(), deleteById().
     */

    // Spring Data JPA: Checks whether a student email already exists.
    // The method is automatically implemented by Spring Data JPA.
    boolean existsByEmail(String email);

    // Finds a student by email address.
    java.util.Optional<Student> findByEmail(String email);

}