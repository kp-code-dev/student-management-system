/*
 * COURSE: Core Java - CAM5001C
 * UNIT: Unit 4
 * TOPIC: Generic Methods
 * PURPOSE: Demonstrates generic methods with type parameters that operate
 *          across different data types (arrays, collections, elements).
 */

package com.studentmanagement.backend.concepts;

public class StudentGenericMethodDemo {

    // UNIT 4 - TOPIC: Generic Method
    // <T> declares a generic type parameter before the return type
    public static <T> void printElement(T element) {
        System.out.println("Element (" + element.getClass().getSimpleName() + "): " + element);
    }

    // Generic method to print an array of any object type
    public static <T> void printArray(T[] array) {
        System.out.print("[");
        for (int i = 0; i < array.length; i++) {
            System.out.print(array[i]);
            if (i < array.length - 1) System.out.print(", ");
        }
        System.out.println("]");
    }

    // Generic method returning the first element or null
    public static <T> T getFirst(T[] array) {
        if (array == null || array.length == 0) return null;
        return array[0];
    }

    public static void main(String[] args) {
        System.out.println("=== UNIT 4: GENERIC METHODS DEMONSTRATION ===");

        // Generic method with different single argument types
        System.out.println("\n--- 1. Generic printElement ---");
        printElement("MCA - Core Java 2026");
        printElement(2026);
        printElement(98.5);

        // Generic method with String array
        System.out.println("\n--- 2. Generic printArray (String[]) ---");
        String[] studentNames = {"Rahul Sharma", "Priya Patel", "Amit Verma"};
        printArray(studentNames);
        System.out.println("First student: " + getFirst(studentNames));

        // Generic method with Integer array (marks)
        System.out.println("\n--- 3. Generic printArray (Integer[]) ---");
        Integer[] marks = {85, 90, 92, 88};
        printArray(marks);
        System.out.println("First mark: " + getFirst(marks));

        System.out.println("\n=== END OF GENERIC METHODS DEMONSTRATION ===");
    }
}
