/*
 * COURSE: Core Java - CAM5001C
 * UNIT: Unit 4
 * TOPIC: Regular Expressions - Pattern and Matcher Classes
 * PURPOSE: Demonstrates input validation for student emails and phone numbers.
 */

package com.studentmanagement.backend.concepts;

// Unit 4: Regular Expressions
// Topics: Pattern and Matcher Classes

import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class StudentRegexDemo {

    public static void main(String[] args) {

        // Regular expression for email validation.
        String emailPattern =
                "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";

        String studentEmail = "student@gmail.com";

        // Unit 4: Pattern Class
        // Compiles the regular expression.
        Pattern pattern = Pattern.compile(emailPattern);

        // Unit 4: Matcher Class
        // Checks whether the email matches the pattern.
        Matcher matcher = pattern.matcher(studentEmail);

        if (matcher.matches()) {
            System.out.println("Valid Email Address");
        } else {
            System.out.println("Invalid Email Address");
        }

        // Regular expression for checking digits.
        String phonePattern = "[0-9]{10}";

        String studentPhone = "9876543210";

        Pattern phoneRegex = Pattern.compile(phonePattern);

        Matcher phoneMatcher = phoneRegex.matcher(studentPhone);

        if (phoneMatcher.matches()) {
            System.out.println("Valid Phone Number");
        } else {
            System.out.println("Invalid Phone Number");
        }
    }
}