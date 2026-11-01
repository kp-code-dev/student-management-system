package com.studentmanagement.backend.concepts;

// Unit 4: Generic Programming
// Topic: Inheritance Rules for Generic Types

// Unit 2: Inheritance
// Parent class with a generic type parameter.
class StudentData<T> {

    private T data;

    public StudentData(T data) {
        this.data = data;
    }

    public T getData() {
        return data;
    }
}

// Unit 4: Generic Inheritance
// Child class inherits the generic parent class.
class StudentDetails<T> extends StudentData<T> {

    public StudentDetails(T data) {
        super(data);
    }

    public void displayDetails() {
        System.out.println("Student Data: " + getData());
    }
}

public class StudentGenericInheritanceDemo {

    public static void main(String[] args) {

        // Generic inheritance with String.
        StudentDetails<String> studentName =
                new StudentDetails<>("Rahul");

        studentName.displayDetails();

        // Generic inheritance with Integer.
        StudentDetails<Integer> studentId =
                new StudentDetails<>(101);

        studentId.displayDetails();
    }
}