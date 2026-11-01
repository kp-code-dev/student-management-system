# Java Assignment Concept Mapping

**Programme:** Master of Computer Applications (MCA)  
**Semester:** 1  
**Course:** Core Java  
**Course Code:** CAM5001C  
**Academic Year:** 2026–2027  
**Project:** Student Management System  
**Package:** `com.studentmanagement.backend.concepts` & `com.studentmanagement.backend`

---

## 1. Master Assignment Concept Mapping Table

| Unit | Topic | Java File | Implementation Details | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Unit 2** | Classes and Objects | `StudentOOPDemo.java` | Instantiates `StudentMember` and `FacultyMember` objects with state and behavior. | Completed |
| **Unit 2** | Constructors | `StudentOOPDemo.java` & `Student.java` | Demonstrates default constructors, parameterized constructors, and overloaded constructors. | Completed |
| **Unit 2** | `this` keyword | `StudentOOPDemo.java` & `Student.java` | Resolves instance variable shadowing (`this.name = name`) and invokes constructor chaining (`this(...)`). | Completed |
| **Unit 2** | Static members | `StudentOOPDemo.java` | `totalPersonsRegistered` static counter and static `getTotalPersonsRegistered()` method shared across all instances. | Completed |
| **Unit 2** | Inheritance | `StudentOOPDemo.java` & `StudentRepository.java` | `StudentMember` and `FacultyMember` extend `AcademicPerson` superclass using `super` keyword. | Completed |
| **Unit 2** | Abstract Classes | `StudentOOPDemo.java` | `AcademicPerson` abstract class defining abstract method `getRole()` and concrete utility methods. | Completed |
| **Unit 2** | Interfaces | `StudentOOPDemo.java` & `Printable` | `AcademicEntity` interface declaring contract methods `displayDetails()` and `getSummary()`. | Completed |
| **Unit 2** | Method Overloading | `StudentOOPDemo.java` | `matches(String query)` and `matches(String query, String filterCourse)` with differing parameter signatures. | Completed |
| **Unit 2** | Method Overriding | `StudentOOPDemo.java` & `Student.java` | Subclasses override `getRole()`, `displayDetails()`, and `toString()`. | Completed |
| **Unit 2** | Arrays and Data Handling | `StudentOOPDemo.java` | Iterates and computes averages from `int[] semesterMarks` and handles `StudentMember[]` object arrays. | Completed |
| **Unit 2** | Wrapper Classes & Math | `StudentWrapperMathDemo.java` | Autoboxing, unboxing, `Integer.valueOf()`, `Integer.parseInt()`, and `Math` functions (`sqrt`, `pow`, `max`, `round`). | Completed |
| **Unit 3** | Packages | All classes under `com.studentmanagement.backend.*` | Organized modular packaging separating models, repositories, services, controllers, exceptions, and concepts. | Completed |
| **Unit 3** | String Class | `StudentStringDemo.java` | Demonstrates String immutability, `length()`, `toUpperCase()`, `charAt()`, `concat()`, and `substring()`. | Completed |
| **Unit 3** | StringBuffer Class | `StudentStringDemo.java` | Demonstrates StringBuffer mutability, thread-safety, `append()`, `insert()`, and `reverse()`. | Completed |
| **Unit 3** | Exception Handling | `StudentExceptionDemo.java` & `GlobalExceptionHandler.java` | Structured handling with `try`, `catch`, `finally` and centralized `@RestControllerAdvice`. | Completed |
| **Unit 3** | try-catch-finally | `StudentExceptionDemo.java` | Multi-block error handling with cleanup executed unconditionally inside `finally`. | Completed |
| **Unit 3** | throw and throws | `StudentExceptionDemo.java` & `StudentService.java` | `validateMarks()` declares `throws` and explicitly fires `throw new InvalidStudentMarksException()`. | Completed |
| **Unit 3** | User-defined Exceptions | `StudentExceptionDemo.java` & `DuplicateEmailException.java` | Custom checked `InvalidStudentMarksException` and unchecked `DuplicateEmailException`. | Completed |
| **Unit 3** | Multithreading using Thread | `StudentThreadDemo.java` & `StudentTaskThread.java` | Extends `java.lang.Thread` for background student batch data processing. | Completed |
| **Unit 3** | Multithreading using Runnable | `StudentThreadDemo.java` & `StudentReportTask.java` | Implements `java.lang.Runnable` for background academic report card generation. | Completed |
| **Unit 3** | Thread Lifecycle & Execution | `StudentThreadLifecycleDemo.java` | Inspects thread lifecycle transitions: `NEW`, `RUNNABLE`, `TIMED_WAITING`, and `TERMINATED`. | Completed |
| **Unit 4** | Generic Classes | `StudentBox.java` | Type-safe container `StudentBox<T>` operating uniformly on `String`, `Integer`, and custom models. | Completed |
| **Unit 4** | Generic Methods | `StudentGenericMethodDemo.java` | `<T> void printElement(T)` and `<T> void printArray(T[])` accepting arbitrary data types. | Completed |
| **Unit 4** | Generic Inheritance | `StudentGenericInheritanceDemo.java` | Generic superclass `GenericEntityHolder<T>` extended by generic subclass and concrete specialization. | Completed |
| **Unit 4** | Wildcards | `StudentWildcardDemo.java` | Unbounded wildcard `List<?>` displaying any student data structure. | Completed |
| **Unit 4** | Upper Bounded Wildcards | `StudentWildcardDemo.java` | `List<? extends Number>` calculating average student marks and GPA values safely. | Completed |
| **Unit 4** | Lower Bounded Wildcards | `StudentWildcardDemo.java` | `List<? super Integer>` inserting semester credits safely into consumer collections. | Completed |
| **Unit 4** | Collections: List | `StudentCollectionDemo.java` | `List<AcademicRecord>` (`ArrayList`) preserving insertion order and enabling index-based iteration. | Completed |
| **Unit 4** | Collections: Set | `StudentCollectionDemo.java` | `Set<String>` (`HashSet`) ensuring uniqueness of registered student email addresses. | Completed |
| **Unit 4** | Collections: Map | `StudentCollectionDemo.java` | `Map<String, AcademicRecord>` (`HashMap`) storing key-value pairs keyed by enrollment numbers. | Completed |
| **Unit 4** | Iteration & Collection Ops | `StudentCollectionDemo.java` | Traversing collections using `Iterator<T>`, enhanced for-each loops, and `Map.Entry` sets. | Completed |
| **Unit 4** | Regular Expressions | `StudentRegexDemo.java` | Pattern matching with `Pattern` and `Matcher` for institutional email and phone number validation. | Completed |
| **Unit 4** | Date & Time Utilities | `StudentDateTimeDemo.java` | Utilizes `Date`, `Calendar`, `GregorianCalendar`, and `TimeZone` for academic scheduling. | Completed |
| **Unit 4** | Formatter Class | `StudentFormatterDemo.java` | Formats academic grade reports using `java.util.Formatter` with `%d`, `%s`, and `%.2f` specifiers. | Completed |

---

## 2. Distinction: Production Application vs Academic Concepts

### A. Production Application Code
- **`com.studentmanagement.backend.model`**: Production JPA entities (`Student`, `AppUser`).
- **`com.studentmanagement.backend.repository`**: Spring Data JPA interfaces (`StudentRepository`, `AppUserRepository`).
- **`com.studentmanagement.backend.service`**: Production service layer enforcing business logic, user authentication, and data manipulation.
- **`com.studentmanagement.backend.controller`**: Production REST endpoints (`StudentController`, `AuthController`) protected by Spring Security and JWT.
- **`com.studentmanagement.backend.security`**: Security filter chain, JWT service, and token extraction.
- **`com.studentmanagement.backend.exception`**: Production global exception advice (`GlobalExceptionHandler`, `ValidationExceptionHandler`).

### B. Academic Demonstration Code
- **`com.studentmanagement.backend.concepts`**: Isolated, standalone executable demonstration programs containing standard `public static void main(String[] args)` entry points for college practical examination and viva demonstration.
- Every concept class can be executed independently from the command line using standard `java` command without needing a database connection.

---

## 3. How to Run Each Academic Demonstration Class

Set your `JAVA_HOME` to JDK 17+ (or JDK 25/26 as installed) and run with the compiled classes on classpath:

```bash
# Set Java Home (macOS example):
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-26.jdk/Contents/Home

# 1. Run Unit 2 OOP Demonstration:
$JAVA_HOME/bin/java -cp backend/target/classes com.studentmanagement.backend.concepts.StudentOOPDemo

# 2. Run Unit 2 Wrapper Classes & Math Demonstration:
$JAVA_HOME/bin/java -cp backend/target/classes com.studentmanagement.backend.concepts.StudentWrapperMathDemo

# 3. Run Unit 3 Exception Handling Demonstration:
$JAVA_HOME/bin/java -cp backend/target/classes com.studentmanagement.backend.concepts.StudentExceptionDemo

# 4. Run Unit 3 Multithreading Demonstration:
$JAVA_HOME/bin/java -cp backend/target/classes com.studentmanagement.backend.concepts.StudentThreadDemo

# 5. Run Unit 3 Thread Lifecycle Demonstration:
$JAVA_HOME/bin/java -cp backend/target/classes com.studentmanagement.backend.concepts.StudentThreadLifecycleDemo

# 6. Run Unit 3 String and StringBuffer Demonstration:
$JAVA_HOME/bin/java -cp backend/target/classes com.studentmanagement.backend.concepts.StudentStringDemo

# 7. Run Unit 4 Generic Class (StudentBox) Demonstration:
$JAVA_HOME/bin/java -cp backend/target/classes com.studentmanagement.backend.concepts.StudentBox

# 8. Run Unit 4 Generic Methods Demonstration:
$JAVA_HOME/bin/java -cp backend/target/classes com.studentmanagement.backend.concepts.StudentGenericMethodDemo

# 9. Run Unit 4 Generic Inheritance Demonstration:
$JAVA_HOME/bin/java -cp backend/target/classes com.studentmanagement.backend.concepts.StudentGenericInheritanceDemo

# 10. Run Unit 4 Wildcards in Generics Demonstration:
$JAVA_HOME/bin/java -cp backend/target/classes com.studentmanagement.backend.concepts.StudentWildcardDemo

# 11. Run Unit 4 Collection Framework (List, Set, Map) Demonstration:
$JAVA_HOME/bin/java -cp backend/target/classes com.studentmanagement.backend.concepts.StudentCollectionDemo

# 12. Run Unit 4 Regular Expressions Demonstration:
$JAVA_HOME/bin/java -cp backend/target/classes com.studentmanagement.backend.concepts.StudentRegexDemo

# 13. Run Unit 4 Date and Time Demonstration:
$JAVA_HOME/bin/java -cp backend/target/classes com.studentmanagement.backend.concepts.StudentDateTimeDemo

# 14. Run Unit 4 Formatter Demonstration:
$JAVA_HOME/bin/java -cp backend/target/classes com.studentmanagement.backend.concepts.StudentFormatterDemo
```

---

## 4. Expected Console Outputs

### Unit 2: `StudentOOPDemo`
```text
=== UNIT 2: OOP & JAVA FUNDAMENTALS DEMONSTRATION ===

--- Displaying Student 1 Details ---
Role: STUDENT
Enrollment No: MCA2026-001
Student Name: Rahul Sharma
Email: rahul@studenthub.edu
Course: MCA
Semester Marks: 88 92 85 90 
Average Percentage: 88.75%

--- Displaying Faculty Details ---
Role: ADMIN_FACULTY
Faculty ID: FAC-2026-01
Faculty Name: Dr. Amit Verma
Department: Computer Science

--- Static Member Access ---
Total Academic Persons Registered: 3

--- Method Overloading Search ---
Matches query 'Rahul Sharma': true
Matches query 'Rahul Sharma' and Course 'MCA': true
Matches query 'Rahul Sharma' and Course 'MBA': false

--- Array of Student Records ---
 -> [STUDENT] MCA2026-001 - Rahul Sharma (MCA)
 -> [STUDENT] MCA2026-002 - Priya Patel (MCA)
=== END OF UNIT 2 DEMONSTRATION ===
```

### Unit 3: `StudentThreadDemo`
```text
=== UNIT 3: MULTITHREADING DEMONSTRATION ===
Current Main Thread: main | Priority: 5
State before start(): NEW
State after start(): RUNNABLE
[Thread Start] Background task running on thread: Student-Batch-Processor
Main thread waiting for background worker threads to finish...
Processing student batch #1 on Student-Batch-Processor
[Report Generation Start] Generating PDF grade card for: Rahul Sharma (MCA2026-001) on thread: Student-Report-Generator
Processing student batch #2 on Student-Batch-Processor
[Report Generation Finish] PDF grade card generated for: Rahul Sharma (MCA2026-001) on thread: Student-Report-Generator
Processing student batch #3 on Student-Batch-Processor
[Thread Complete] All student batches processed successfully by Student-Batch-Processor
Background processing thread state after join: TERMINATED
Report generator thread state after join: TERMINATED
All student asynchronous tasks completed successfully.
=== END OF UNIT 3 MULTITHREADING DEMONSTRATION ===
```

### Unit 4: `StudentCollectionDemo`
```text
=== UNIT 4: GENERIC COLLECTIONS FRAMEWORK DEMONSTRATION ===

--- 1. List<AcademicRecord> (ArrayList) ---
Total records in List (including duplicate): 4
Iterating through List using Iterator:
 -> MCA2026-001 | Rahul Sharma (MCA) <rahul@studenthub.edu>
 -> MCA2026-002 | Priya Patel (MCA) <priya@studenthub.edu>
 -> MCA2026-003 | Amit Verma (BCA) <amit@studenthub.edu>
 -> MCA2026-001 | Rahul Sharma Duplicate (MCA) <rahul@studenthub.edu>

--- 2. Set<String> for Unique Student Emails (HashSet) ---
Total unique emails registered: 3
 Unique Registered Email: rahul@studenthub.edu
 Unique Registered Email: priya@studenthub.edu
 Unique Registered Email: amit@studenthub.edu

--- 3. Map<String, AcademicRecord> (HashMap) ---
Lookup by Enrollment No 'MCA2026-002': MCA2026-002 | Priya Patel (MCA) <priya@studenthub.edu>
Iterating Map EntrySet:
 Key [MCA2026-001] => Rahul Sharma
 Key [MCA2026-002] => Priya Patel
 Key [MCA2026-003] => Amit Verma

=== END OF UNIT 4 COLLECTIONS DEMONSTRATION ===
```

---

## 5. Key Files for College Viva Preparation

1. **`StudentOOPDemo.java`**: Best for explaining inheritance, abstract classes, interfaces, method overloading vs overriding, and arrays.
2. **`StudentExceptionDemo.java`**: Best for explaining checked vs unchecked exceptions, `try-catch-finally`, and custom exception throwing.
3. **`StudentThreadDemo.java` & `StudentThreadLifecycleDemo.java`**: Best for explaining `Thread` vs `Runnable`, `start()` vs `run()`, `join()`, and thread states (`NEW`, `RUNNABLE`, `TIMED_WAITING`, `TERMINATED`).
4. **`StudentCollectionDemo.java`**: Best for explaining differences between `List` (ordered, allows duplicates), `Set` (unique), and `Map` (key-value lookup).
5. **`StudentWildcardDemo.java`**: Best for explaining upper bounded (`? extends Number`) vs lower bounded (`? super Integer`) wildcards in Java Generics.

