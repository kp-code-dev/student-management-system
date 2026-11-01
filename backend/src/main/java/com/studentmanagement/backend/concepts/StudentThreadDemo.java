/*
 * COURSE: Core Java - CAM5001C
 * UNIT: Unit 3
 * TOPIC: Multithreading using Thread and Runnable, Thread Lifecycle and Execution
 * PURPOSE: Demonstrates multithreading concepts by simulating background student
 *          report generation and asynchronous student data processing.
 */

package com.studentmanagement.backend.concepts;

public class StudentThreadDemo {

    public static void main(String[] args) {
        System.out.println("=== UNIT 3: MULTITHREADING DEMONSTRATION ===");

        // UNIT 3 - TOPIC: Thread lifecycle & Main thread
        Thread mainThread = Thread.currentThread();
        System.out.println("Current Main Thread: " + mainThread.getName() + " | Priority: " + mainThread.getPriority());

        // UNIT 3 - TOPIC: Multithreading using Thread class
        // Creating background task thread
        StudentTaskThread dataProcessingThread = new StudentTaskThread("Student-Batch-Processor");

        // Thread state before starting
        System.out.println("State before start(): " + dataProcessingThread.getState()); // NEW

        // Starting data processing thread
        dataProcessingThread.start();
        System.out.println("State after start(): " + dataProcessingThread.getState()); // RUNNABLE / TIMED_WAITING

        // UNIT 3 - TOPIC: Multithreading using Runnable interface
        // Runnable separates task logic from Thread control
        StudentReportTask reportTask = new StudentReportTask("Rahul Sharma (MCA2026-001)");
        Thread reportThread = new Thread(reportTask, "Student-Report-Generator");

        // Starting report generator thread
        reportThread.start();

        try {
            // UNIT 3 - TOPIC: Thread synchronization / join()
            // Main thread waits for background workers to complete before finishing
            System.out.println("Main thread waiting for background worker threads to finish...");
            dataProcessingThread.join();
            reportThread.join();
            System.out.println("Background processing thread state after join: " + dataProcessingThread.getState()); // TERMINATED
            System.out.println("Report generator thread state after join: " + reportThread.getState()); // TERMINATED
        } catch (InterruptedException e) {
            System.err.println("Main thread interrupted: " + e.getMessage());
            Thread.currentThread().interrupt();
        }

        System.out.println("All student asynchronous tasks completed successfully.");
        System.out.println("=== END OF UNIT 3 MULTITHREADING DEMONSTRATION ===");
    }
}
