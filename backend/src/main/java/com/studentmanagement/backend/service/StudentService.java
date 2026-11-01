package com.studentmanagement.backend.service;

// Unit 2: Class, Object, Constructor and Methods
// Unit 3: Exception Handling

import com.studentmanagement.backend.model.Student;
import com.studentmanagement.backend.repository.StudentRepository;
import com.studentmanagement.backend.exception.DuplicateEmailException;
import com.studentmanagement.backend.exception.ResourceNotFoundException;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    // Unit 2: Encapsulation and Object
    private final StudentRepository studentRepository;

    // Unit 2: Constructor and Dependency Injection
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    // Unit 4: Generic Programming - List<Student>
    // Returns all students.
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Unit 3: Exception Handling
    // Topic: User-Defined Exception

    // Checks whether the email is already registered.
    public Student saveStudent(Student student) {

        // Unit 3: Exception Handling
        // Throws custom exception if email already exists.
        if (studentRepository.existsByEmail(student.getEmail())) {
            throw new DuplicateEmailException(
                    "Email is already registered: " + student.getEmail()
            );
        }

        // Saves student if email is unique.
        return studentRepository.save(student);
}

    // Unit 3: Exception Handling
    // Throws a user-defined exception if student is not found.
    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Student not found with ID: " + id
                        ));
    }

    // Updates existing student details.
    public Student updateStudent(Long id, Student updatedStudent) {

        Student student = getStudentById(id);

        student.setName(updatedStudent.getName());
        // If email is being changed, ensure it does not conflict with another student
        if (updatedStudent.getEmail() != null && !updatedStudent.getEmail().equalsIgnoreCase(student.getEmail())) {
            if (studentRepository.existsByEmail(updatedStudent.getEmail())) {
                throw new DuplicateEmailException("Email is already registered: " + updatedStudent.getEmail());
            }
            student.setEmail(updatedStudent.getEmail());
        }
        student.setCourse(updatedStudent.getCourse());
        student.setPhone(updatedStudent.getPhone());
        if (updatedStudent.getGender() != null) {
            student.setGender(updatedStudent.getGender());
        }
        if (updatedStudent.getBirthdate() != null) {
            student.setBirthdate(updatedStudent.getBirthdate());
        }

        return studentRepository.save(student);
    }

    // Fetches student profile using user email (for logged-in student)
    // If not found in student directory, automatically initializes a student profile for the user
    public Student getStudentByEmail(String email) {
        return studentRepository.findByEmail(email)
                .orElseGet(() -> {
                    Student newStudent = new Student();
                    newStudent.setEmail(email);
                    newStudent.setName("Student");
                    newStudent.setCourse("MCA");
                    newStudent.setPhone("");
                    newStudent.setGender("");
                    newStudent.setBirthdate("");
                    return studentRepository.save(newStudent);
                });
    }

    // Deletes a student using ID.
    public void deleteStudent(Long id) {
        Student student = getStudentById(id);
        studentRepository.delete(student);
    }
}