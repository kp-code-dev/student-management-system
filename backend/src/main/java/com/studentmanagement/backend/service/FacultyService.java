package com.studentmanagement.backend.service;

/*
 * COURSE: Core Java - CAM5001C
 * UNIT: Unit 2 & Unit 3
 * TOPIC: Classes, Dependency Injection, and Exception Handling
 * PURPOSE: Business service for managing Faculty entities and optional user logins.
 */

import com.studentmanagement.backend.dto.faculty.FacultyRequest;
import com.studentmanagement.backend.exception.DuplicateEmailException;
import com.studentmanagement.backend.exception.ResourceNotFoundException;
import com.studentmanagement.backend.model.AppUser;
import com.studentmanagement.backend.model.Faculty;
import com.studentmanagement.backend.repository.AppUserRepository;
import com.studentmanagement.backend.repository.FacultyRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FacultyService {

    private final FacultyRepository facultyRepository;
    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;

    public FacultyService(FacultyRepository facultyRepository,
                          AppUserRepository appUserRepository,
                          PasswordEncoder passwordEncoder) {
        this.facultyRepository = facultyRepository;
        this.appUserRepository = appUserRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Faculty> getAllFaculty() {
        return facultyRepository.findAll();
    }

    public Faculty getFacultyById(Long id) {
        return facultyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Faculty member not found with ID: " + id));
    }

    @Transactional
    public Faculty createFaculty(FacultyRequest request) {
        // Check for duplicate email
        if (facultyRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateEmailException("Faculty email is already registered: " + request.getEmail());
        }

        // Check for duplicate faculty ID
        if (facultyRepository.existsByFacultyId(request.getFacultyId())) {
            throw new RuntimeException("Faculty ID is already registered: " + request.getFacultyId());
        }

        Faculty faculty = new Faculty();
        faculty.setName(request.getName());
        faculty.setEmail(request.getEmail());
        faculty.setFacultyId(request.getFacultyId());
        faculty.setDepartment(request.getDepartment());
        faculty.setPhone(request.getPhone());

        Faculty savedFaculty = facultyRepository.save(faculty);

        // If a temporary password was provided, also create an AppUser account for login
        if (request.getTemporaryPassword() != null && !request.getTemporaryPassword().trim().isEmpty()) {
            if (!appUserRepository.existsByEmail(request.getEmail())) {
                AppUser user = new AppUser();
                user.setName(request.getName());
                user.setEmail(request.getEmail());
                user.setPassword(passwordEncoder.encode(request.getTemporaryPassword()));
                user.setRole("ROLE_FACULTY"); // Faculty members hold Admin/Faculty role
                appUserRepository.save(user);
            }
        }

        return savedFaculty;
    }

    @Transactional
    public Faculty updateFaculty(Long id, FacultyRequest request) {
        Faculty faculty = getFacultyById(id);

        // Email conflict check
        if (request.getEmail() != null && !request.getEmail().equalsIgnoreCase(faculty.getEmail())) {
            if (facultyRepository.existsByEmail(request.getEmail())) {
                throw new DuplicateEmailException("Faculty email already in use: " + request.getEmail());
            }
            faculty.setEmail(request.getEmail());
        }

        // Faculty ID conflict check
        if (request.getFacultyId() != null && !request.getFacultyId().equalsIgnoreCase(faculty.getFacultyId())) {
            if (facultyRepository.existsByFacultyId(request.getFacultyId())) {
                throw new RuntimeException("Faculty ID already in use: " + request.getFacultyId());
            }
            faculty.setFacultyId(request.getFacultyId());
        }

        faculty.setName(request.getName());
        faculty.setDepartment(request.getDepartment());
        if (request.getPhone() != null) {
            faculty.setPhone(request.getPhone());
        }

        // If password update requested
        if (request.getTemporaryPassword() != null && !request.getTemporaryPassword().trim().isEmpty()) {
            appUserRepository.findByEmail(faculty.getEmail()).ifPresent(user -> {
                user.setPassword(passwordEncoder.encode(request.getTemporaryPassword()));
                appUserRepository.save(user);
            });
        }

        return facultyRepository.save(faculty);
    }

    @Transactional
    public void deleteFaculty(Long id) {
        Faculty faculty = getFacultyById(id);
        facultyRepository.delete(faculty);
    }
}

