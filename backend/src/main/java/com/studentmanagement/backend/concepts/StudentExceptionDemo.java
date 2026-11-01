package com.studentmanagement.backend.concepts;

// Unit 3: User-Defined Exception
class InvalidStudentDataException extends Exception {

    public InvalidStudentDataException(String message) {
        super(message);
    }
}

public class StudentExceptionDemo {

    public static void main(String[] args) {

        try {

            // Unit 3: try block
            int marks = -10;

            if (marks < 0 || marks > 100) {

                // Unit 3: Throwing a user-defined exception
                throw new InvalidStudentDataException(
                    "Marks must be between 0 and 100."
                );
            }

            System.out.println("Student Marks: " + marks);

        } catch (InvalidStudentDataException e) {

            // Unit 3: catch block handles the exception
            System.out.println("Error: " + e.getMessage());

        } finally {

            // Unit 3: finally block always executes
            System.out.println("Student validation completed.");
        }

        // Unit 3: Exception Chaining
        try {

            try {
                int result = 10 / 0;

            } catch (ArithmeticException e) {

                // Unit 3: Wrapping one exception inside another
                throw new RuntimeException(
                    "Unable to calculate student result.", e
                );
            }

        } catch (RuntimeException e) {

            System.out.println("Chained Exception: " + e.getMessage());

            // Unit 3: Throwable getCause() method
            System.out.println("Original Cause: " + e.getCause());
        }
    }
}