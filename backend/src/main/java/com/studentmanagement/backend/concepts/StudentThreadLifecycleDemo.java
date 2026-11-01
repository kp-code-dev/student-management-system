/*
 * COURSE: Core Java - CAM5001C
 * UNIT: Unit 3
 * TOPIC: Multithreading - Thread Lifecycle and Execution States
 * PURPOSE: Demonstrates transitions across thread lifecycle states:
 *          NEW, RUNNABLE, TIMED_WAITING, and TERMINATED using student tasks.
 */

package com.studentmanagement.backend.concepts;

public class StudentThreadLifecycleDemo {

    public static void main(String[] args) throws InterruptedException {
        System.out.println("=== UNIT 3: THREAD LIFECYCLE & EXECUTION STATES ===");

        // Display current thread
        Thread mainThread = Thread.currentThread();
        System.out.println("Main Thread executing: " + mainThread.getName());

        // UNIT 3 - TOPIC: Thread Creation & State NEW
        Thread workerThread = new Thread(() -> {
            try {
                System.out.println("[Worker] Thread is in RUNNABLE state.");
                // Transition to TIMED_WAITING
                System.out.println("[Worker] Simulating asynchronous task (sleeping 1000ms)...");
                Thread.sleep(1000);
                System.out.println("[Worker] Completed student task.");
            } catch (InterruptedException e) {
                System.err.println("[Worker] Interrupted during sleep.");
                Thread.currentThread().interrupt();
            }
        }, "Lifecycle-Worker-Thread");

        // 1. NEW State
        System.out.println("1. Thread state before start(): " + workerThread.getState()); // NEW

        // 2. Start thread -> RUNNABLE
        workerThread.start();
        System.out.println("2. Thread state immediately after start(): " + workerThread.getState()); // RUNNABLE

        // Brief pause to inspect TIMED_WAITING state
        Thread.sleep(300);
        System.out.println("3. Thread state during sleep: " + workerThread.getState()); // TIMED_WAITING

        // 3. Wait for worker thread to finish using join()
        workerThread.join();

        // 4. TERMINATED State
        System.out.println("4. Thread state after join() completion: " + workerThread.getState()); // TERMINATED

        System.out.println("=== END OF UNIT 3 THREAD LIFECYCLE DEMONSTRATION ===");
    }
}
