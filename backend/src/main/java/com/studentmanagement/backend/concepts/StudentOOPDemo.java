/*
 * COURSE: Core Java - CAM5001C
 * UNIT: Unit 2
 * TOPIC: Classes and Objects, Constructors, 'this' keyword, Static Members,
 *        Inheritance, Abstract Classes, Interfaces, Method Overloading,
 *        Method Overriding, Arrays and Data Handling
 * PURPOSE: Demonstrates fundamental and advanced OOP concepts using
 *          Student Management entities and academic records.
 */

package com.studentmanagement.backend.concepts;

// UNIT 2 - TOPIC: Interfaces
// An interface defines a contract that implementing classes must fulfill.
interface AcademicEntity {
    // Abstract method to display formatted details
    void displayDetails();
    
    // Abstract method returning a summary string
    String getSummary();
}

// UNIT 2 - TOPIC: Abstract Classes
// An abstract class provides a common base for all persons in the institution.
abstract class AcademicPerson implements AcademicEntity {
    // Encapsulated attributes
    protected String name;
    protected String email;

    // UNIT 2 - TOPIC: Static Members
    // Static variable shared across all instances of AcademicPerson
    protected static int totalPersonsRegistered = 0;

    // UNIT 2 - TOPIC: Constructors & 'this' keyword
    // Parameterized constructor initializing instance variables
    public AcademicPerson(String name, String email) {
        this.name = name;      // 'this' distinguishes instance field from constructor parameter
        this.email = email;
        totalPersonsRegistered++; // Increment shared static counter
    }

    // Default / No-arg constructor
    public AcademicPerson() {
        this("Unknown", "unknown@university.edu"); // Constructor chaining using this(...)
    }

    // UNIT 2 - TOPIC: Static Method
    public static int getTotalPersonsRegistered() {
        return totalPersonsRegistered;
    }

    // UNIT 2 - TOPIC: Abstract Method
    // Must be implemented by concrete subclasses
    public abstract String getRole();

    // Concrete method inherited by subclasses
    public String getEmail() {
        return this.email;
    }
}

// UNIT 2 - TOPIC: Inheritance (Subclass extends Superclass)
// StudentMember inherits properties and methods from AcademicPerson
class StudentMember extends AcademicPerson {
    private String enrollmentNumber;
    private String course;
    // UNIT 2 - TOPIC: Arrays and data handling
    private int[] semesterMarks;

    // UNIT 2 - TOPIC: Constructor Overloading & 'super' keyword
    public StudentMember(String name, String email, String enrollmentNumber, String course, int[] semesterMarks) {
        super(name, email); // Calls superclass constructor
        this.enrollmentNumber = enrollmentNumber;
        this.course = course;
        this.semesterMarks = semesterMarks != null ? semesterMarks : new int[0];
    }

    // Overloaded Constructor with fewer parameters
    public StudentMember(String name, String email, String enrollmentNumber, String course) {
        this(name, email, enrollmentNumber, course, new int[]{85, 90, 88});
    }

    // UNIT 2 - TOPIC: Method Overriding
    // Overriding abstract method getRole() from AcademicPerson
    @Override
    public String getRole() {
        return "STUDENT";
    }

    // UNIT 2 - TOPIC: Method Overriding from AcademicEntity interface
    @Override
    public void displayDetails() {
        System.out.println("Role: " + getRole());
        System.out.println("Enrollment No: " + this.enrollmentNumber);
        System.out.println("Student Name: " + this.name);
        System.out.println("Email: " + this.email);
        System.out.println("Course: " + this.course);
        
        // Processing array elements
        System.out.print("Semester Marks: ");
        for (int mark : this.semesterMarks) {
            System.out.print(mark + " ");
        }
        System.out.println();
    }

    @Override
    public String getSummary() {
        return "[" + getRole() + "] " + this.enrollmentNumber + " - " + this.name + " (" + this.course + ")";
    }

    // UNIT 2 - TOPIC: Method Overloading (Search methods)
    // 1. Search by name query
    public boolean matches(String query) {
        return this.name.equalsIgnoreCase(query) || this.enrollmentNumber.equalsIgnoreCase(query);
    }

    // 2. Overloaded: Search by name and course
    public boolean matches(String query, String filterCourse) {
        return matches(query) && this.course.equalsIgnoreCase(filterCourse);
    }

    // Calculate percentage from array of marks
    public double calculatePercentage() {
        if (this.semesterMarks.length == 0) return 0.0;
        int total = 0;
        for (int mark : this.semesterMarks) {
            total += mark;
        }
        return (double) total / this.semesterMarks.length;
    }

    // Object class method overriding
    @Override
    public String toString() {
        return getSummary();
    }
}

// UNIT 2 - TOPIC: Inheritance
// FacultyMember inherits from AcademicPerson
class FacultyMember extends AcademicPerson {
    private String department;
    private String employeeId;

    public FacultyMember(String name, String email, String employeeId, String department) {
        super(name, email);
        this.employeeId = employeeId;
        this.department = department;
    }

    @Override
    public String getRole() {
        return "ADMIN_FACULTY";
    }

    @Override
    public void displayDetails() {
        System.out.println("Role: " + getRole());
        System.out.println("Faculty ID: " + this.employeeId);
        System.out.println("Faculty Name: " + this.name);
        System.out.println("Department: " + this.department);
    }

    @Override
    public String getSummary() {
        return "[" + getRole() + "] " + this.employeeId + " - " + this.name + " (" + this.department + ")";
    }
}

// Main class demonstrating Unit 2 concepts
public class StudentOOPDemo {

    public static void main(String[] args) {
        System.out.println("=== UNIT 2: OOP & JAVA FUNDAMENTALS DEMONSTRATION ===");

        // UNIT 2 - TOPIC: Arrays and data handling
        int[] marksRahul = new int[]{88, 92, 85, 90};

        // UNIT 2 - TOPIC: Classes and Objects
        StudentMember student1 = new StudentMember(
                "Rahul Sharma",
                "rahul@studenthub.edu",
                "MCA2026-001",
                "MCA",
                marksRahul
        );

        StudentMember student2 = new StudentMember(
                "Priya Patel",
                "priya@studenthub.edu",
                "MCA2026-002",
                "MCA"
        );

        FacultyMember faculty = new FacultyMember(
                "Dr. Amit Verma",
                "admin@studenthub.edu",
                "FAC-2026-01",
                "Computer Science"
        );

        // UNIT 2 - TOPIC: Polymorphism (Interface reference to object)
        System.out.println("\n--- Displaying Student 1 Details ---");
        AcademicEntity entity1 = student1;
        entity1.displayDetails();
        System.out.printf("Average Percentage: %.2f%%%n", student1.calculatePercentage());

        System.out.println("\n--- Displaying Faculty Details ---");
        AcademicEntity entity2 = faculty;
        entity2.displayDetails();

        // UNIT 2 - TOPIC: Static members demonstration
        System.out.println("\n--- Static Member Access ---");
        System.out.println("Total Academic Persons Registered: " + AcademicPerson.getTotalPersonsRegistered());

        // UNIT 2 - TOPIC: Method Overloading demonstration
        System.out.println("\n--- Method Overloading Search ---");
        System.out.println("Matches query 'Rahul Sharma': " + student1.matches("Rahul Sharma"));
        System.out.println("Matches query 'Rahul Sharma' and Course 'MCA': " + student1.matches("Rahul Sharma", "MCA"));
        System.out.println("Matches query 'Rahul Sharma' and Course 'MBA': " + student1.matches("Rahul Sharma", "MBA"));

        // UNIT 2 - TOPIC: Arrays of Objects
        System.out.println("\n--- Array of Student Records ---");
        StudentMember[] studentList = new StudentMember[]{student1, student2};
        for (StudentMember s : studentList) {
            System.out.println(" -> " + s.getSummary());
        }

        System.out.println("=== END OF UNIT 2 DEMONSTRATION ===");
    }
}
