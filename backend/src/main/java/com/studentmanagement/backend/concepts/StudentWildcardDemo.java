/*
 * COURSE: Core Java - CAM5001C
 * UNIT: Unit 4
 * TOPIC: Wildcards in Generics (Upper Bounded, Lower Bounded, and Unbounded Wildcards)
 * PURPOSE: Demonstrates flexible generic method arguments for processing student marks,
 *          lists of student records, and numeric collections.
 */

package com.studentmanagement.backend.concepts;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class StudentWildcardDemo {

    // UNIT 4 - TOPIC: Upper Bounded Wildcard (? extends Number)
    // Accepts List of Number or any subclass of Number (Integer, Double, Float).
    // Read-only access to numeric values.
    public static double calculateAverageMarks(List<? extends Number> marksList) {
        if (marksList == null || marksList.isEmpty()) return 0.0;
        double sum = 0.0;
        for (Number n : marksList) {
            sum += n.doubleValue();
        }
        return sum / marksList.size();
    }

    // UNIT 4 - TOPIC: Lower Bounded Wildcard (? super Integer)
    // Accepts List of Integer or any superclass of Integer (Number, Object).
    // Allows safely adding Integer elements to the collection.
    public static void addDefaultSemesterCredits(List<? super Integer> creditsList) {
        creditsList.add(20);
        creditsList.add(22);
        creditsList.add(24);
        System.out.println("Added semester credits: " + creditsList);
    }

    // UNIT 4 - TOPIC: Unbounded Wildcard (List<?>)
    // Accepts a List containing objects of any unknown type.
    public static void printAnyList(List<?> items) {
        System.out.print("[");
        for (int i = 0; i < items.size(); i++) {
            System.out.print(items.get(i));
            if (i < items.size() - 1) System.out.print(", ");
        }
        System.out.println("]");
    }

    public static void main(String[] args) {
        System.out.println("=== UNIT 4: WILDCARDS IN GENERICS DEMONSTRATION ===");

        // 1. Upper Bounded Wildcard demonstration with Integer marks
        System.out.println("\n--- 1. Upper Bounded Wildcard (? extends Number) ---");
        List<Integer> theoryMarks = Arrays.asList(85, 90, 78, 92);
        System.out.printf("Integer Theory Marks Average: %.2f%n", calculateAverageMarks(theoryMarks));

        // Upper Bounded Wildcard with Double GPA values
        List<Double> gpaScores = Arrays.asList(9.2, 8.8, 9.5, 9.0);
        System.out.printf("Double GPA Scores Average: %.2f%n", calculateAverageMarks(gpaScores));

        // 2. Lower Bounded Wildcard demonstration (? super Integer)
        System.out.println("\n--- 2. Lower Bounded Wildcard (? super Integer) ---");
        List<Number> numberList = new ArrayList<>();
        addDefaultSemesterCredits(numberList);

        List<Object> objectList = new ArrayList<>();
        addDefaultSemesterCredits(objectList);

        // 3. Unbounded Wildcard demonstration (List<?>)
        System.out.println("\n--- 3. Unbounded Wildcard (List<?>) ---");
        List<String> studentNames = Arrays.asList("Rahul Sharma", "Priya Patel", "Amit Verma");
        System.out.print("Student Names List: ");
        printAnyList(studentNames);

        List<Integer> enrollmentIds = Arrays.asList(101, 102, 103);
        System.out.print("Enrollment IDs List: ");
        printAnyList(enrollmentIds);

        System.out.println("\n=== END OF WILDCARDS DEMONSTRATION ===");
    }
}
