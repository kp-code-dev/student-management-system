/*
 * COURSE: Core Java - CAM5001C
 * UNIT: Unit 4
 * TOPIC: Generic Inheritance
 * PURPOSE: Demonstrates inheritance hierarchies with generic superclasses and subclasses
 *          in the context of student record repositories and wrappers.
 */

package com.studentmanagement.backend.concepts;

// UNIT 4 - TOPIC: Generic Superclass
class GenericEntityHolder<T> {
    protected T entity;

    public GenericEntityHolder(T entity) {
        this.entity = entity;
    }

    public T getEntity() {
        return entity;
    }

    public void displayType() {
        System.out.println("Holder contains type: " + (entity != null ? entity.getClass().getSimpleName() : "null"));
    }
}

// UNIT 4 - TOPIC: Generic Subclass extending Generic Superclass
// Subclass preserves generic type parameter T
class AcademicEntityHolder<T> extends GenericEntityHolder<T> {

    public AcademicEntityHolder(T entity) {
        super(entity);
    }

    public void printDetails() {
        displayType();
        System.out.println("Payload value: " + getEntity());
    }
}

// Subclass specifying a concrete type for superclass generic parameter
class StudentNameHolder extends GenericEntityHolder<String> {

    public StudentNameHolder(String studentName) {
        super(studentName);
    }

    public void displayUppercase() {
        System.out.println("Student Name (Uppercase): " + getEntity().toUpperCase());
    }
}

public class StudentGenericInheritanceDemo {

    public static void main(String[] args) {
        System.out.println("=== UNIT 4: GENERIC INHERITANCE DEMONSTRATION ===");

        // Generic subclass with String
        System.out.println("\n--- 1. AcademicEntityHolder<String> ---");
        AcademicEntityHolder<String> courseHolder = new AcademicEntityHolder<>("Master of Computer Applications");
        courseHolder.printDetails();

        // Generic subclass with Integer
        System.out.println("\n--- 2. AcademicEntityHolder<Integer> ---");
        AcademicEntityHolder<Integer> totalCredits = new AcademicEntityHolder<>(80);
        totalCredits.printDetails();

        // Specialized subclass extending GenericEntityHolder<String>
        System.out.println("\n--- 3. Specialized StudentNameHolder ---");
        StudentNameHolder nameHolder = new StudentNameHolder("Rahul Sharma");
        nameHolder.displayUppercase();

        System.out.println("\n=== END OF GENERIC INHERITANCE DEMONSTRATION ===");
    }
}
