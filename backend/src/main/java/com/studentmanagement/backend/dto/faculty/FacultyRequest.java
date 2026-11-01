package com.studentmanagement.backend.dto.faculty;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class FacultyRequest {

    @NotBlank(message = "Full Name is required")
    private String name;

    @Email(message = "Enter a valid email address")
    @NotBlank(message = "Email Address is required")
    private String email;

    @NotBlank(message = "Faculty ID is required")
    private String facultyId;

    @NotBlank(message = "Department is required")
    private String department;

    @Size(min = 6, message = "Temporary Password must be at least 6 characters")
    private String temporaryPassword;

    private String phone;

    public FacultyRequest() {
    }

    public FacultyRequest(String name, String email, String facultyId, String department, String temporaryPassword) {
        this.name = name;
        this.email = email;
        this.facultyId = facultyId;
        this.department = department;
        this.temporaryPassword = temporaryPassword;
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

    public String getTemporaryPassword() {
        return temporaryPassword;
    }

    public void setTemporaryPassword(String temporaryPassword) {
        this.temporaryPassword = temporaryPassword;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}

