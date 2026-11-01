package com.studentmanagement.backend.controller;
// Unit 2: Inheritance and Interface
// Topics: Class, Object, Methods and Annotations

import com.studentmanagement.backend.model.Student;
import com.studentmanagement.backend.service.StudentService;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Spring Boot: Marks this class as a REST Controller.
// It handles HTTP requests from the frontend.
// Allows the React frontend running on port 5173 to access these APIs.
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

    // Unit 4: Generic Programming
    // List<Student> returns a collection of Student objects.
    // HTTP GET: Fetch all students.
    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    // HTTP POST: Add a new student.
    // @Valid checks validation rules defined in Student.java.
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Student addStudent(@Valid @RequestBody Student student) {
        return studentService.saveStudent(student);
    }

    // HTTP GET: Fetch a student using their ID.
    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }

    // HTTP PUT: Update existing student details.
    @PutMapping("/{id}")
    public Student updateStudent(
            @PathVariable Long id,
            @Valid @RequestBody Student student) {

        return studentService.updateStudent(id, student);
    }

    // HTTP DELETE: Delete a student using their ID.
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
    }
}