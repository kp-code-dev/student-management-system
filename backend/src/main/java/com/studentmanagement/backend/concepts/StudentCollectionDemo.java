/*
 * COURSE: Core Java - CAM5001C
 * UNIT: Unit 4
 * TOPIC: Generic Programming and Collection Framework (List, Set, Map, Iteration)
 * PURPOSE: Demonstrates generics and collections using student records, unique email sets,
 *          and key-value mapping of enrollment numbers to student models.
 */

package com.studentmanagement.backend.concepts;

import java.util.*;

// StudentRecord model for collections demonstration
class AcademicRecord {
    private final String enrollmentNo;
    private final String name;
    private final String email;
    private final String course;

    public AcademicRecord(String enrollmentNo, String name, String email, String course) {
        this.enrollmentNo = enrollmentNo;
        this.name = name;
        this.email = email;
        this.course = course;
    }

    public String getEnrollmentNo() { return enrollmentNo; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getCourse() { return course; }

    @Override
    public String toString() {
        return enrollmentNo + " | " + name + " (" + course + ") <" + email + ">";
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AcademicRecord)) return false;
        AcademicRecord that = (AcademicRecord) o;
        return Objects.equals(enrollmentNo, that.enrollmentNo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(enrollmentNo);
    }
}

public class StudentCollectionDemo {

    public static void main(String[] args) {
        System.out.println("=== UNIT 4: GENERIC COLLECTIONS FRAMEWORK DEMONSTRATION ===");

        AcademicRecord s1 = new AcademicRecord("MCA2026-001", "Rahul Sharma", "rahul@studenthub.edu", "MCA");
        AcademicRecord s2 = new AcademicRecord("MCA2026-002", "Priya Patel", "priya@studenthub.edu", "MCA");
        AcademicRecord s3 = new AcademicRecord("MCA2026-003", "Amit Verma", "amit@studenthub.edu", "BCA");
        AcademicRecord s4Duplicate = new AcademicRecord("MCA2026-001", "Rahul Sharma Duplicate", "rahul@studenthub.edu", "MCA");

        // UNIT 4 - TOPIC: List Interface (ArrayList)
        // Ordered collection, allows duplicate values, indexed access
        System.out.println("\n--- 1. List<AcademicRecord> (ArrayList) ---");
        List<AcademicRecord> studentList = new ArrayList<>();
        studentList.add(s1);
        studentList.add(s2);
        studentList.add(s3);
        studentList.add(s4Duplicate); // duplicates allowed in List

        System.out.println("Total records in List (including duplicate): " + studentList.size());
        
        // UNIT 4 - TOPIC: Iteration and Collection operations
        System.out.println("Iterating through List using Iterator:");
        Iterator<AcademicRecord> iterator = studentList.iterator();
        while (iterator.hasNext()) {
            AcademicRecord record = iterator.next();
            System.out.println(" -> " + record);
        }

        // UNIT 4 - TOPIC: Set Interface (HashSet)
        // Unordered collection, guarantees unique elements (no duplicates)
        System.out.println("\n--- 2. Set<String> for Unique Student Emails (HashSet) ---");
        Set<String> uniqueEmails = new HashSet<>();
        uniqueEmails.add(s1.getEmail());
        uniqueEmails.add(s2.getEmail());
        uniqueEmails.add(s3.getEmail());
        uniqueEmails.add(s4Duplicate.getEmail()); // duplicate email will NOT be added

        System.out.println("Total unique emails registered: " + uniqueEmails.size());
        for (String email : uniqueEmails) {
            System.out.println(" Unique Registered Email: " + email);
        }

        // UNIT 4 - TOPIC: Map Interface (HashMap)
        // Key-Value pairs, fast lookup by enrollment number key
        System.out.println("\n--- 3. Map<String, AcademicRecord> (HashMap) ---");
        Map<String, AcademicRecord> studentDirectory = new HashMap<>();
        studentDirectory.put(s1.getEnrollmentNo(), s1);
        studentDirectory.put(s2.getEnrollmentNo(), s2);
        studentDirectory.put(s3.getEnrollmentNo(), s3);

        System.out.println("Lookup by Enrollment No 'MCA2026-002': " + studentDirectory.get("MCA2026-002"));

        System.out.println("Iterating Map EntrySet:");
        for (Map.Entry<String, AcademicRecord> entry : studentDirectory.entrySet()) {
            System.out.println(" Key [" + entry.getKey() + "] => " + entry.getValue().getName());
        }

        System.out.println("\n=== END OF UNIT 4 COLLECTIONS DEMONSTRATION ===");
    }
}
