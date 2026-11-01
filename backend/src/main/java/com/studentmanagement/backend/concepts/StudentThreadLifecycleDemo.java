package com.studentmanagement.backend.concepts;

public class StudentThreadLifecycleDemo {

    public static void main(String[] args)
            throws InterruptedException {

        // Unit 3: Main Thread
        Thread mainThread = Thread.currentThread();

        System.out.println(
            "Main Thread: " + mainThread.getName()
        );

        // Unit 3: Thread Creation
        Thread studentThread = new Thread(() -> {

            // Unit 3: Runnable state while executing
            System.out.println("Student task started.");

            try {

                // Unit 3: TIMED_WAITING state
                Thread.sleep(2000);

            } catch (InterruptedException e) {

                // Unit 3: Exception Handling
                System.out.println("Thread interrupted.");
                Thread.currentThread().interrupt();
            }

            System.out.println("Student task completed.");

        }, "StudentThread");

        // Unit 3: NEW state
        System.out.println(
            "Before start: " + studentThread.getState()
        );

        // Unit 3: Starting a thread
        studentThread.start();

        // Unit 3: Waiting for thread completion
        studentThread.join();

        // Unit 3: TERMINATED state
        System.out.println(
            "After completion: " + studentThread.getState()
        );
    }
}