package com.studentmanagement.backend.repository;

/*
 * COURSE: Core Java - CAM5001C
 * UNIT: Unit 2
 * TOPIC: Interface and Inheritance (extends JpaRepository)
 * PURPOSE: Data access interface for Faculty entity.
 */

import com.studentmanagement.backend.model.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FacultyRepository extends JpaRepository<Faculty, Long> {

    boolean existsByEmail(String email);

    boolean existsByFacultyId(String facultyId);

    Optional<Faculty> findByEmail(String email);

    Optional<Faculty> findByFacultyId(String facultyId);
}

