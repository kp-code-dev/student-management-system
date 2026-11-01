package com.studentmanagement.backend.concepts;

// Unit 4: Generic Programming
// Topics: Collection Framework, List, Set, Map and Generics

import java.util.*;

public class StudentCollectionDemo {

    public static void main(String[] args) {

        // Unit 4: List Interface
        // List allows duplicate values and maintains insertion order.
        List<String> studentNames = new ArrayList<>();

        studentNames.add("Rahul");
        studentNames.add("Amit");
        studentNames.add("Jay");
        studentNames.add("Rahul");

        System.out.println("Student List: " + studentNames);

        // Unit 4: Set Interface
        // Set stores unique values and removes duplicates.
        Set<String> studentCourses = new HashSet<>();

        studentCourses.add("MCA");
        studentCourses.add("BCA");
        studentCourses.add("MCA");

        System.out.println("Student Courses: " + studentCourses);

        // Unit 4: Map Interface
        // Map stores data in key-value pairs.
        Map<Integer, String> students = new HashMap<>();

        students.put(101, "Rahul");
        students.put(102, "Amit");
        students.put(103, "Jay");

        System.out.println("Student Map: " + students);

        // Accessing Map values using keys.
        System.out.println("Student ID 101: " + students.get(101));

        // Unit 4: Collection Interface
        // Collection is the parent interface of List and Set.
        Collection<String> names = new ArrayList<>();

        names.add("Rahul");
        names.add("Amit");

        // Displaying collection using enhanced for loop.
        for (String name : names) {
            System.out.println("Name: " + name);
        }
    }
}