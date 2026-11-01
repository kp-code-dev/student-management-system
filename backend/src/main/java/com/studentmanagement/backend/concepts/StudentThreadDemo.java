package com.studentmanagement.backend.concepts;

// Unit 3: Multithreading
// Topics: Main Thread, Thread Creation and Thread States

public class StudentThreadDemo {

    // Unit 2: Class and Method
    // main() is the entry point of this Java program.
    public static void main(String[] args) {

        // Displays the currently running main thread.
        System.out.println(
                "Main Thread: " + Thread.currentThread().getName()
        );

        // Unit 3: Thread Creation using Thread class.
        StudentTaskThread studentThread =
                new StudentTaskThread("Student-Task-Thread");

        // Displays the initial thread state.
        System.out.println("Thread State: " + studentThread.getState());

        // Starts the first thread.
        studentThread.start();

        // Unit 3: Thread Creation using Runnable interface.
        StudentReportTask reportTask =
                new StudentReportTask("Rahul");

        Thread reportThread = new Thread(reportTask, "Report-Thread");

        // Starts the second thread.
        reportThread.start();

        // Displays the current state of both threads.
        System.out.println("Student Thread: " + studentThread.getState());
        System.out.println("Report Thread: " + reportThread.getState());
    }
}