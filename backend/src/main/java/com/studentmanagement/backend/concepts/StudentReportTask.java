/*
 * COURSE: Core Java - CAM5001C
 * UNIT: Unit 3
 * TOPIC: Packages and Multithreading using Runnable Interface
 * PURPOSE: Demonstrates task creation using the Runnable interface for student report processing.
 */

package com.studentmanagement.backend.concepts;

// UNIT 3 - TOPIC: Multithreading using Runnable interface
public class StudentReportTask implements Runnable {

    private final String studentIdentifier;

    public StudentReportTask(String studentIdentifier) {
        this.studentIdentifier = studentIdentifier;
    }

    // UNIT 3 - TOPIC: Runnable run() method
    @Override
    public void run() {
        System.out.println("[Report Generation Start] Generating PDF grade card for: " 
                + studentIdentifier + " on thread: " + Thread.currentThread().getName());

        try {
            // Simulate intensive work: fetching grades, rendering charts, compiling PDF
            Thread.sleep(600);
            System.out.println("[Report Generation Finish] PDF grade card generated for: " 
                    + studentIdentifier + " on thread: " + Thread.currentThread().getName());

        } catch (InterruptedException exception) {
            System.err.println("Report generation interrupted: " + exception.getMessage());
            Thread.currentThread().interrupt();
        }
    }
}
