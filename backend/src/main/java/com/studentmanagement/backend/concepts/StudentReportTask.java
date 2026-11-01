package com.studentmanagement.backend.concepts;

// Unit 3: Multithreading
// Topic: Creating Threads using Runnable Interface

// Unit 2: Inheritance and Interface
// Runnable is an interface that must be implemented.
public class StudentReportTask implements Runnable {

    // Unit 2: Constructor
    private final String studentName;

    public StudentReportTask(String studentName) {
        this.studentName = studentName;
    }

    // Unit 3: Multithreading
    // run() contains the task executed by the thread.
    @Override
    public void run() {

        System.out.println(
                "Generating report for: " + studentName
        );

        try {
            // Pauses the current thread for 1 second.
            Thread.sleep(1000);

            System.out.println(
                    "Report generated for: " + studentName
            );

        } catch (InterruptedException exception) {

            // Unit 3: Exception Handling
            System.out.println("Report generation interrupted.");

            Thread.currentThread().interrupt();
        }
    }
}