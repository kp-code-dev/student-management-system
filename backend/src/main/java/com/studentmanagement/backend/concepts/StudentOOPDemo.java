package com.studentmanagement.backend.concepts;

// Unit 2: Abstract Class
abstract class Person {

    // Unit 2: Encapsulation and protected access modifier
    protected String name;

    public Person(String name) {
        this.name = name;
    }

    // Unit 2: Abstract Method
    abstract void displayRole();

    // Unit 2: final method cannot be overridden
    public final void showCategory() {
        System.out.println("Category: Person");
    }

    // Unit 2: Object class method overriding
    @Override
    public String toString() {
        return "Person Name: " + name;
    }
}

// Unit 2: Interface
interface Printable {

    void printDetails();
}

// Unit 2: Inheritance (Student inherits Person)
// Unit 2: Interface Implementation
class StudentPerson extends Person implements Printable {

    // Unit 2: final variable
    private final int studentId;

    public StudentPerson(String name, int studentId) {

        // Unit 2: super keyword calls parent constructor
        super(name);

        this.studentId = studentId;
    }

    // Unit 2: Method Overriding
    @Override
    void displayRole() {
        System.out.println("Role: Student");
    }

    // Unit 2: Interface method implementation
    @Override
    public void printDetails() {
        System.out.println("ID: " + studentId);
        System.out.println("Name: " + name);
    }

    // Unit 2: Object class method overriding
    @Override
    public boolean equals(Object obj) {

        if (this == obj) {
            return true;
        }

        if (!(obj instanceof StudentPerson)) {
            return false;
        }

        StudentPerson other = (StudentPerson) obj;

        return studentId == other.studentId;
    }

    // Unit 2: Method Overloading
    public void showStudent(String course) {
        System.out.println("Course: " + course);
    }

    public void showStudent(String course, int semester) {
        System.out.println(
            "Course: " + course + ", Semester: " + semester
        );
    }
}

public class StudentOOPDemo {

    public static void main(String[] args) {

        StudentPerson student =
            new StudentPerson("Rahul", 101);

        // Unit 2: Polymorphism
        // Parent class reference stores child class object
        Person person = student;

        person.displayRole();

        // Unit 2: Interface reference
        Printable printable = student;
        printable.printDetails();

        // Unit 2: final method
        student.showCategory();

        // Unit 2: Method Overloading
        student.showStudent("MCA");
        student.showStudent("MCA", 1);

        // Unit 2: Object class toString() method
        System.out.println(student.toString());

        // Unit 2: Object class equals() method
        StudentPerson anotherStudent =
            new StudentPerson("Rahul", 101);

        System.out.println(
            "Both students equal: " + student.equals(anotherStudent)
        );
    }
}