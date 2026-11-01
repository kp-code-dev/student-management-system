package com.studentmanagement.backend.controller;
// Unit 2: Inheritance and Interface
// Topics: Class, Object, Methods and Annotations

import com.studentmanagement.backend.model.Student;
import com.studentmanagement.backend.service.StudentService;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Spring Boot: Marks this class as a REST Controller.
// It handles HTTP requests from the frontend.
@CrossOrigin(origins = "http://localhost:5173")
@RestController
// All API endpoints start with /api/students.
@RequestMapping("/api/students")
public class StudentController {

    // Unit 2: Object and Encapsulation
    // Service object handles the business logic.
    private final StudentService studentService;

    // Unit 2: Constructor
    // Constructor Injection provides the StudentService object.
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // Helper: checks if authenticated user is ADMIN
    private boolean isAdmin(Authentication auth) {
        if (auth == null) return false;
        return auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(r -> r.equals("ROLE_FACULTY") || r.equals("ADMIN"));
    }

    // Unit 4: Generic Programming
    // List<Student> returns a collection of Student objects.
    // HTTP GET: Fetch all students. ONLY Admin/Faculty can view all students.
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    // HTTP POST: Add a new student. ONLY Admin can add students.
    // @Valid checks validation rules defined in Student.java.
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public Student addStudent(@Valid @RequestBody Student student) {
        return studentService.saveStudent(student);
    }

    // HTTP GET: Fetch logged-in student's own profile
    // Accessible by authenticated STUDENT or ADMIN
    @GetMapping("/me")
    public Student getCurrentStudentProfile(Authentication authentication) {
        String email = authentication.getName();
        return studentService.getStudentByEmail(email);
    }

    // HTTP PUT: Update logged-in student's own permitted profile details
    // Accessible by authenticated STUDENT
    @PutMapping("/me")
    public Student updateCurrentStudentProfile(
            Authentication authentication,
            @RequestBody Student updatedDetails) {
        String email = authentication.getName();
        Student current = studentService.getStudentByEmail(email);
        
        // Students can update permitted personal fields: Name, Phone, Gender, and Birthdate.
        // Email, Enrollment number, and Course/Semester are official academic records and cannot be altered by student.
        if (updatedDetails.getName() != null && !updatedDetails.getName().isBlank()) {
            current.setName(updatedDetails.getName().trim());
        }
        if (updatedDetails.getPhone() != null) {
            current.setPhone(updatedDetails.getPhone().trim());
        }
        if (updatedDetails.getGender() != null) {
            current.setGender(updatedDetails.getGender().trim());
        }
        if (updatedDetails.getBirthdate() != null) {
            current.setBirthdate(updatedDetails.getBirthdate().trim());
        }
        
        return studentService.updateStudent(current.getId(), current);
    }

    // HTTP GET: Fetch a student using their ID.
    // ADMIN can access any ID. STUDENT can ONLY access their own student ID.
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id, Authentication authentication) {
        Student student = studentService.getStudentById(id);
        
        if (!isAdmin(authentication)) {
            // Verify ownership: logged-in user email must match student's email
            String loggedInEmail = authentication.getName();
            if (!student.getEmail().equalsIgnoreCase(loggedInEmail)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
        }
        
        return ResponseEntity.ok(student);
    }

    // HTTP PUT: Update existing student details.
    // ADMIN can update any student. STUDENT can ONLY update their own record and cannot change ID/role.
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(
            @PathVariable Long id,
            @Valid @RequestBody Student student,
            Authentication authentication) {

        Student existing = studentService.getStudentById(id);
        
        if (!isAdmin(authentication)) {
            // Verify ownership
            String loggedInEmail = authentication.getName();
            if (!existing.getEmail().equalsIgnoreCase(loggedInEmail)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
            // Enforce that student cannot change their email to bypass verification
            student.setEmail(existing.getEmail());
        }

        return ResponseEntity.ok(studentService.updateStudent(id, student));
    }

    // HTTP DELETE: Delete a student using their ID.
    // ONLY ADMIN can delete students.
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
    }
}