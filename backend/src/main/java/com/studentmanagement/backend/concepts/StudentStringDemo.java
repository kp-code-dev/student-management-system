/*
 * COURSE: Core Java - CAM5001C
 * UNIT: Unit 3
 * TOPIC: String Class, StringBuffer Class, Packages and String Manipulation
 * PURPOSE: Demonstrates immutability of String vs mutability of StringBuffer
 *          using student registration and record formatting examples.
 */

package com.studentmanagement.backend.concepts;

public class StudentStringDemo {

    public static void main(String[] args) {
        System.out.println("=== UNIT 3: STRING & STRINGBUFFER DEMONSTRATION ===");

        // UNIT 3 - TOPIC: String class & Immutability
        // String objects are immutable; once created, their internal character sequence cannot be modified.
        String studentFirstName = "Rahul";
        System.out.println("Original String: " + studentFirstName);

        // Attempting modification via concat() without reassigning
        studentFirstName.concat(" Sharma");
        System.out.println("After concat() without reassignment (unchanged): " + studentFirstName);

        // Proper reassignment creating a new String object
        studentFirstName = studentFirstName.concat(" Sharma");
        System.out.println("After reassignment: " + studentFirstName);

        // UNIT 3 - TOPIC: Common String methods
        System.out.println("\n--- Common String Methods ---");
        System.out.println("Length: " + studentFirstName.length());
        System.out.println("Uppercase: " + studentFirstName.toUpperCase());
        System.out.println("Lowercase: " + studentFirstName.toLowerCase());
        System.out.println("Character at index 0: " + studentFirstName.charAt(0));
        System.out.println("Contains 'Sharma': " + studentFirstName.contains("Sharma"));
        System.out.println("Replaced 'Sharma' with 'Verma': " + studentFirstName.replace("Sharma", "Verma"));
        System.out.println("Substring (0 to 5): " + studentFirstName.substring(0, 5));

        // UNIT 3 - TOPIC: StringBuffer class & Mutability
        // StringBuffer is mutable and thread-safe (synchronized methods).
        System.out.println("\n--- StringBuffer Mutability & Operations ---");
        StringBuffer transcript = new StringBuffer("Student: ");
        System.out.println("Initial StringBuffer: " + transcript);

        // append() modifies the existing object directly
        transcript.append(studentFirstName);
        transcript.append(" | Program: MCA");
        System.out.println("After append(): " + transcript);

        // insert() inserts characters at the specified index
        transcript.insert(9, "[Verified] ");
        System.out.println("After insert(): " + transcript);

        // reverse() reverses the buffer content
        StringBuffer code = new StringBuffer("MCA2026");
        System.out.println("Original Code: " + code);
        System.out.println("Reversed Code: " + code.reverse());

        System.out.println("\n=== END OF UNIT 3 STRING DEMONSTRATION ===");
    }
}
