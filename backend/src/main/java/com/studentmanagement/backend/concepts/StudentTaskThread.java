package com.studentmanagement.backend.concepts;

// Unit 3: Exception Handling and Multithreading
// Topic: Creating a Thread by Extending Thread Class

public class StudentTaskThread extends Thread {

    // Constructor to set the thread name.
    public StudentTaskThread(String threadName) {
        super(threadName);
    }

    // Unit 3: Thread Class
    // run() contains the task executed by this thread.
    @Override
    public void run() {

        System.out.println(
                "Student task started by: " + Thread.currentThread().getName()
        );

        // Simulates a background task.
        try {
            Thread.sleep(1000);

            System.out.println("Student task completed successfully.");

        } catch (InterruptedException exception) {

            // Unit 3: Exception Handling
            // Handles interruption while the thread is sleeping.
            System.out.println("Student task was interrupted.");

            // Restores the interrupted status.
            Thread.currentThread().interrupt();
        }
    }
}