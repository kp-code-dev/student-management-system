package com.studentmanagement.backend.concepts;

// Unit 4: Generic Programming
// Topic: Creating and Using Generic Methods

public class StudentGenericMethodDemo {

    // Unit 4: Generic Method
    // <T> represents a generic type parameter.
    // This method can accept different types of values.
    public static <T> void displayValue(T value) {

        System.out.println("Value: " + value);
    }

    // Unit 2: Method Overloading
    // Same method name with different parameter types.
    public static void displayStudent(String name) {

        System.out.println("Student Name: " + name);
    }

    // Main method to execute the examples.
    public static void main(String[] args) {

        // Unit 4: Generic Method with String.
        displayValue("Rahul");

        // Unit 4: Generic Method with Integer.
        displayValue(101);

        // Unit 4: Generic Method with Double.
        displayValue(85.5);

        // Unit 2: Calling a method.
        displayStudent("Rahul");
    }
}