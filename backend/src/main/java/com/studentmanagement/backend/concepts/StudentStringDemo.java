package com.studentmanagement.backend.concepts;

public class StudentStringDemo {

    public static void main(String[] args) {

        // Unit 2: String class
        // String is immutable (its original value cannot be changed).
        String name = "Rahul";

        System.out.println("Original Name: " + name);

        // Unit 2: String methods
        System.out.println("Length: " + name.length());
        System.out.println("Uppercase: " + name.toUpperCase());
        System.out.println("Lowercase: " + name.toLowerCase());
        System.out.println("Character at 0: " + name.charAt(0));
        System.out.println("Contains 'ah': " + name.contains("ah"));

        // Unit 2: String immutability
        name.concat(" Sharma");

        // Original String remains unchanged
        System.out.println("After concat: " + name);

        // Store the new String returned by concat()
        name = name.concat(" Sharma");

        System.out.println("Updated Name: " + name);

        // Unit 2: StringBuffer class
        // StringBuffer is mutable (its value can be changed).
        StringBuffer course = new StringBuffer("MCA");

        System.out.println("Original Course: " + course);

        // Unit 2: StringBuffer append() method
        course.append(" Semester 1");

        System.out.println("After Append: " + course);

        // Unit 2: StringBuffer insert() method
        course.insert(4, "Java ");

        System.out.println("After Insert: " + course);

        // Unit 2: StringBuffer reverse() method
        StringBuffer message = new StringBuffer("JAVA");

        System.out.println("Reversed: " + message.reverse());
    }
}