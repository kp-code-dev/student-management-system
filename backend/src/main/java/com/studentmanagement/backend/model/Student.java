
package com.studentmanagement.backend.model;

// Unit 2: Inheritance and Interface
// Topic: Class and Object
// Student class represents a student in our system.

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "students")
public class Student {

    // JPA: Primary key with automatically generated ID.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Unit 2: Access Specifiers
    // Topic: Encapsulation - private variables protect data.
    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Enter a valid email")
    @NotBlank(message = "Email is required")
    @Column(unique = true)
    private String email;

    private String course;
    private String phone;
    private String gender;
    private String birthdate;

    // Unit 2: Constructors
    // Default constructor required by JPA.
    public Student() {
    }

    // Unit 2: Parameterized Constructor
    public Student(String name, String email, String course, String phone) {
        this.name = name;
        this.email = email;
        this.course = course;
        this.phone = phone;
    }

    public Student(String name, String email, String course, String phone, String gender, String birthdate) {
        this.name = name;
        this.email = email;
        this.course = course;
        this.phone = phone;
        this.gender = gender;
        this.birthdate = birthdate;
    }

    // Unit 2: Encapsulation - Getter and Setter methods.
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

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(String birthdate) {
        this.birthdate = birthdate;
    }
}
