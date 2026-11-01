package com.studentmanagement.backend.config;

/*
 * COURSE: Core Java - CAM5001C
 * UNIT: Unit 2
 * TOPIC: CommandLineRunner, Object Initialization & Security Seeding
 * PURPOSE: Automatically seeds or verifies default Faculty and Student accounts on startup.
 */

import com.studentmanagement.backend.model.AppUser;
import com.studentmanagement.backend.model.Faculty;
import com.studentmanagement.backend.repository.AppUserRepository;
import com.studentmanagement.backend.repository.FacultyRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class FacultyDataInitializer {

    @Bean
    public CommandLineRunner initDefaultFaculty(
            AppUserRepository appUserRepository,
            FacultyRepository facultyRepository,
            PasswordEncoder passwordEncoder) {
        return args -> {
            String defaultFacultyEmail = "faculty@studenthub.edu";

            // If default faculty user does not exist in app_users, seed it
            if (!appUserRepository.existsByEmail(defaultFacultyEmail)) {
                AppUser facultyUser = new AppUser();
                facultyUser.setName("Prof. Rahul Sharma");
                facultyUser.setEmail(defaultFacultyEmail);
                facultyUser.setPassword(passwordEncoder.encode("Faculty@12345"));
                facultyUser.setRole("ROLE_ADMIN");
                appUserRepository.save(facultyUser);
                System.out.println(">>> [DataInitializer] Seeded default Faculty user: " + defaultFacultyEmail + " / Faculty@12345");
            } else {
                // Ensure role is ROLE_ADMIN
                appUserRepository.findByEmail(defaultFacultyEmail).ifPresent(user -> {
                    if (!"ROLE_ADMIN".equals(user.getRole())) {
                        user.setRole("ROLE_ADMIN");
                        appUserRepository.save(user);
                    }
                });
            }

            // Also ensure corresponding Faculty directory record exists
            if (!facultyRepository.existsByEmail(defaultFacultyEmail)) {
                Faculty facultyRecord = new Faculty();
                facultyRecord.setName("Prof. Rahul Sharma");
                facultyRecord.setEmail(defaultFacultyEmail);
                facultyRecord.setFacultyId("FAC-2026-001");
                facultyRecord.setDepartment("Computer Applications");
                facultyRecord.setPhone("+91 9876543210");
                facultyRepository.save(facultyRecord);
                System.out.println(">>> [DataInitializer] Seeded default Faculty directory entry for: " + defaultFacultyEmail);
            }
        };
    }
}

