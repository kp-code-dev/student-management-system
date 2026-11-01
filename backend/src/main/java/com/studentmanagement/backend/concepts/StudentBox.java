package com.studentmanagement.backend.concepts;

// Unit 4: Generic Programming
// Topic: Creating a Generic Class

// T is a type parameter.
// It allows this class to work with different data types.
public class StudentBox<T> {

    // Stores a value of generic type T.
    private T value;

    // Unit 2: Constructor
    public StudentBox(T value) {
        this.value = value;
    }

    // Returns the stored value.
    public T getValue() {
        return value;
    }

    // Updates the stored value.
    public void setValue(T value) {
        this.value = value;
    }
}