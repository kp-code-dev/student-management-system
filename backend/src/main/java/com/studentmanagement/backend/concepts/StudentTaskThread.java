/*
 * COURSE: Core Java - CAM5001C
 * UNIT: Unit 3
 * TOPIC: Packages and Multithreading using Thread Class
 * PURPOSE: Demonstrates background thread creation and execution using Thread inheritance.
 */

package com.studentmanagement.backend.concepts;

// UNIT 3 - TOPIC: Multithreading using Thread class
public class StudentTaskThread extends Thread {

    public StudentTaskThread(String threadName) {
        super(threadName);
    }

    // UNIT 3 - TOPIC: Thread lifecycle & run() method
    @Override
    public void run() {
        System.out.println("[Thread Start] Background task running on thread: " + Thread.currentThread().getName());

        try {
            // Simulate processing 3 student batches
            for (int i = 1; i <= 3; i++) {
                System.out.println("Processing student batch #" + i + " on " + Thread.currentThread().getName());
                // UNIT 3 - TOPIC: TIMED_WAITING state using sleep()
                Thread.sleep(400);
            }
            System.out.println("[Thread Complete] All student batches processed successfully by " + Thread.currentThread().getName());

        } catch (InterruptedException exception) {
            // UNIT 3 - TOPIC: Exception Handling inside Thread
            System.err.println("Student batch processing interrupted: " + exception.getMessage());
            Thread.currentThread().interrupt();
        }
    }
}
