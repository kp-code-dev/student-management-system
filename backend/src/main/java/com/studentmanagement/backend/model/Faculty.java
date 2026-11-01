package com.studentmanagement.backend.model;

/*
 * COURSE: Core Java - CAM5001C
 * UNIT: Unit 2
 * TOPIC: Class and Object, Encapsulation
 * PURPOSE: Represents a Faculty / Teacher entity in the Student Management System.
 */

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "faculties")
public class Faculty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Faculty name is required")
    private String name;

    @Email(message = "Enter a valid email address")
    @NotBlank(message = "Faculty email is required")
    @Column(unique = true, nullable = false)
    private String email;

    @NotBlank(message = "Faculty ID is required")
    @Column(unique = true, nullable = false)
    private String facultyId;

    @NotBlank(message = "Department is required")
    private String department;

    // Optional phone or temporary password reference
    private String phone;

    public Faculty() {
    }

    public Faculty(String name, String email, String facultyId, String department) {
        this.name = name;
        this.email = email;
        this.facultyId = facultyId;
        this.department = department;
    }

    public Faculty(String name, String email, String facultyId, String department, String phone) {
        this.name = name;
        this.email = email;
        this.facultyId = facultyId;
        this.department = department;
        this.phone = phone;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFacultyId() {
        return facultyId;
    }

    public void setFacultyId(String facultyId) {
        this.facultyId = facultyId;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}

