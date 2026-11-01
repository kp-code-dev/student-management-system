/*
 * COURSE: Core Java - CAM5001C
 * UNIT: Unit 4
 * TOPIC: Generic Classes - StudentBox<T>
 * PURPOSE: Demonstrates generic type parameters in class definition to provide
 *          type-safe storage and retrieval of student-related data without casting.
 */

package com.studentmanagement.backend.concepts;

// UNIT 4 - TOPIC: Generic Classes
// T is a formal type parameter that can be substituted with any object type.
public class StudentBox<T> {

    // Stores an object of generic type T
    private T item;

    // Parameterized constructor
    public StudentBox(T item) {
        this.item = item;
    }

    // Default constructor
    public StudentBox() {
    }

    // Returns item of generic type T
    public T getItem() {
        return item;
    }

    // Sets item of generic type T
    public void setItem(T item) {
        this.item = item;
    }

    @Override
    public String toString() {
        return "StudentBox containing [" + (item != null ? item.toString() : "empty") + "]";
    }

    public static void main(String[] args) {
        System.out.println("=== UNIT 4: GENERIC CLASS (StudentBox<T>) DEMO ===");

        // Type safety: Box containing String
        StudentBox<String> nameBox = new StudentBox<>("Rahul Sharma");
        System.out.println("Name Box: " + nameBox.getItem());

        // Box containing Integer (e.g. Student ID)
        StudentBox<Integer> idBox = new StudentBox<>(101);
        System.out.println("ID Box: " + idBox.getItem());

        // Box containing Double (e.g. Grade Point Average)
        StudentBox<Double> gpaBox = new StudentBox<>(9.45);
        System.out.println("GPA Box: " + gpaBox.getItem());

        System.out.println("=== END OF GENERIC CLASS DEMO ===");
    }
}
