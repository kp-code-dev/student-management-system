/*
 * COURSE: Core Java - CAM5001C
 * UNIT: Unit 4
 * TOPIC: Java Utility - Formatter Class
 * PURPOSE: Demonstrates output formatting for student transcripts and mark sheets.
 */

package com.studentmanagement.backend.concepts;

import java.util.Formatter;

public class StudentFormatterDemo {

    public static void main(String[] args) {

        // Unit 4: Formatter class
        // Formatter is used to format output in a specific pattern.
        Formatter formatter = new Formatter();

        int studentId = 101;
        String studentName = "Rahul";
        double marks = 85.567;

        // Unit 4: Formatter format() method
        // %d = Integer, %s = String, %.2f = Decimal (2 digits)
        formatter.format(
            "Student ID: %d%nStudent Name: %s%nMarks: %.2f",
            studentId,
            studentName,
            marks
        );

        // Display formatted output
        System.out.println(formatter);

        // Close Formatter to release resources
        formatter.close();
    }
}