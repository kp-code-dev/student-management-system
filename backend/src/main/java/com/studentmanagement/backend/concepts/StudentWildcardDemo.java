package com.studentmanagement.backend.concepts;

// Unit 4: Generic Programming
// Topic: Wildcard Types

import java.util.Arrays;
import java.util.List;

public class StudentWildcardDemo {

    // Unit 4: Upper Bounded Wildcard
    // ? extends Number accepts Number or its subclasses.
    public static void displayNumbers(List<? extends Number> numbers) {

        for (Number number : numbers) {
            System.out.println(number);
        }
    }

    // Unit 4: Lower Bounded Wildcard
    // ? super Integer accepts Integer or its parent types.
    public static void addNumbers(List<? super Integer> numbers) {

        numbers.add(10);
        numbers.add(20);
        numbers.add(30);

        System.out.println(numbers);
    }

    // Unit 4: Unbounded Wildcard
    // ? accepts a list of any data type.
    public static void displayList(List<?> values) {

        for (Object value : values) {
            System.out.println(value);
        }
    }

    public static void main(String[] args) {

        List<Integer> marks = Arrays.asList(70, 80, 90);

        List<String> names = Arrays.asList("Rahul", "Amit", "Jay");

        displayNumbers(marks);

        displayList(names);

        List<Number> numbers = new java.util.ArrayList<>();

        addNumbers(numbers);
    }
}