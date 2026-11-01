package com.studentmanagement.backend.controller;

/*
 * COURSE: Core Java - CAM5001C
 * UNIT: Unit 2
 * TOPIC: Rest Controller, Class, Annotations
 * PURPOSE: Exposes administrative CRUD endpoints for Faculty management.
 */

import com.studentmanagement.backend.dto.faculty.FacultyRequest;
import com.studentmanagement.backend.model.Faculty;
import com.studentmanagement.backend.service.FacultyService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/faculty")
@PreAuthorize("hasRole('ADMIN')")
public class FacultyController {

    private final FacultyService facultyService;

    public FacultyController(FacultyService facultyService) {
        this.facultyService = facultyService;
    }

    // View Faculty - All faculty list
    @GetMapping
    public List<Faculty> getAllFaculty() {
        return facultyService.getAllFaculty();
    }

    // View Single Faculty by ID
    @GetMapping("/{id}")
    public Faculty getFacultyById(@PathVariable Long id) {
        return facultyService.getFacultyById(id);
    }

    // Add Faculty - New faculty register
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Faculty addFaculty(@Valid @RequestBody FacultyRequest request) {
        return facultyService.createFaculty(request);
    }

    // Edit Faculty - Details update
    @PutMapping("/{id}")
    public Faculty updateFaculty(@PathVariable Long id, @Valid @RequestBody FacultyRequest request) {
        return facultyService.updateFaculty(id, request);
    }

    // Delete Faculty - Faculty remove
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFaculty(@PathVariable Long id) {
        facultyService.deleteFaculty(id);
    }
}

