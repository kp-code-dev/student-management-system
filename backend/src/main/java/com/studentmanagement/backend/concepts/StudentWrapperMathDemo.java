package com.studentmanagement.backend.concepts;

public class StudentWrapperMathDemo {

    public static void main(String[] args) {

        // Unit 2: Wrapper Classes
        // Wrapper classes convert primitive values into objects.
        int marks = 85;

        Integer wrappedMarks = Integer.valueOf(marks);

        System.out.println("Primitive Marks: " + marks);
        System.out.println("Wrapper Marks: " + wrappedMarks);

        // Unit 2: Autoboxing
        // Automatic conversion of primitive into wrapper object.
        Integer studentAge = 22;

        // Unit 2: Unboxing
        // Automatic conversion of wrapper object into primitive.
        int age = studentAge;

        System.out.println("Student Age: " + age);

        // Unit 2: Wrapper class conversion methods
        String number = "101";

        int convertedNumber = Integer.parseInt(number);

        System.out.println("Converted Number: " + convertedNumber);

        // Unit 2: Math class
        System.out.println("Square Root: " + Math.sqrt(64));
        System.out.println("Power: " + Math.pow(2, 3));
        System.out.println("Maximum: " + Math.max(85, 90));
        System.out.println("Minimum: " + Math.min(85, 90));
        System.out.println("Absolute Value: " + Math.abs(-50));
        System.out.println("Rounded Value: " + Math.round(85.6));
    }
}