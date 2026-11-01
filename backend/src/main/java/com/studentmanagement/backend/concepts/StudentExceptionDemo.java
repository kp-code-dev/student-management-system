/*
 * COURSE: Core Java - CAM5001C
 * UNIT: Unit 3
 * TOPIC: Exception Handling, try-catch-finally, throw and throws, User-defined Exceptions
 * PURPOSE: Demonstrates robust exception handling using student management domain
 *          validations (invalid email, marks out of bounds, duplicate enrollment).
 */

package com.studentmanagement.backend.concepts;

// UNIT 3 - TOPIC: User-defined Exceptions
// Checked Exception for invalid academic marks
class InvalidStudentMarksException extends Exception {
    public InvalidStudentMarksException(String message) {
        super(message);
    }
}

// User-defined Unchecked / Runtime Exception for student validation
class StudentValidationException extends RuntimeException {
    public StudentValidationException(String message) {
        super(message);
    }
}

public class StudentExceptionDemo {

    // UNIT 3 - TOPIC: 'throws' keyword
    // Declares that this method can throw InvalidStudentMarksException
    public static void validateMarks(int marks) throws InvalidStudentMarksException {
        if (marks < 0 || marks > 100) {
            // UNIT 3 - TOPIC: 'throw' keyword
            throw new InvalidStudentMarksException("Marks must be between 0 and 100. Provided: " + marks);
        }
        System.out.println("Marks validation successful: " + marks);
    }

    // Method validating student email format
    public static void validateEmail(String email) {
        if (email == null || !email.contains("@") || !email.endsWith(".edu")) {
            throw new StudentValidationException("Institutional email must end with .edu! Invalid: " + email);
        }
        System.out.println("Email validation successful: " + email);
    }

    public static void main(String[] args) {
        System.out.println("=== UNIT 3: EXCEPTION HANDLING DEMONSTRATION ===");

        // 1. UNIT 3 - TOPIC: try-catch-finally with Checked Exception
        System.out.println("\n--- 1. Testing Valid and Invalid Student Marks ---");
        try {
            System.out.println("Validating marks (95)...");
            validateMarks(95);

            System.out.println("Validating invalid marks (115)...");
            validateMarks(115); // Will throw exception

        } catch (InvalidStudentMarksException ex) {
            // UNIT 3 - TOPIC: catch block
            System.err.println("Caught Checked Exception: " + ex.getMessage());
        } finally {
            // UNIT 3 - TOPIC: finally block (always executes)
            System.out.println("Finally block executed: Mark validation routine cleanup complete.");
        }

        // 2. UNIT 3 - TOPIC: try-catch with User-defined Runtime Exception
        System.out.println("\n--- 2. Testing Custom Runtime Exception (Email Validation) ---");
        try {
            validateEmail("rahul@studenthub.edu");
            validateEmail("invalid-student-email"); // Will throw exception
        } catch (StudentValidationException ex) {
            System.err.println("Caught Runtime Exception: " + ex.getMessage());
        } finally {
            System.out.println("Finally block executed: Email check completed.");
        }

        // 3. UNIT 3 - TOPIC: Exception Chaining
        System.out.println("\n--- 3. Testing Exception Chaining ---");
        try {
            try {
                // Simulating arithmetic exception during GPA calculation
                int totalMarks = 400;
                int totalSubjects = 0;
                int average = totalMarks / totalSubjects;
            } catch (ArithmeticException ae) {
                // Wrap and rethrow with contextual message
                throw new StudentValidationException("Calculation error while calculating GPA: " + ae.getMessage());
            }
        } catch (StudentValidationException sve) {
            System.out.println("Chained Exception handled: " + sve.getMessage());
        }

        System.out.println("\n=== END OF UNIT 3 EXCEPTION HANDLING DEMONSTRATION ===");
    }
}
