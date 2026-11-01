# Viva & Practical Examination Preparation Guide

**Programme:** Master of Computer Applications (MCA)  
**Semester:** 1  
**Course:** Core Java (CAM5001C)  
**Academic Year:** 2026–2027  
**Project:** Student Management System  

---

## 1. Quick Project Summary for Viva

When the examiner asks: *"What is your project, and what technologies did you use?"*

> **Answer:**  
> "Sir/Madam, I have developed a full-stack **Student Management System** tailored for academic institutions.  
> - **Backend:** Java with **Spring Boot**, using **Spring Security** and **JWT (JSON Web Tokens)** for stateless authentication.  
> - **Role-Based Access Control (RBAC):** Supports two distinct roles — **STUDENT** and **ADMIN (Faculty)**.  
> - **Frontend:** **React.js** with Vite, implementing protected, role-aware routing.  
> - **Database:** **PostgreSQL** using Spring Data JPA / Hibernate.  
> - **Academic Integration:** In addition to the production application, the Java backend implements comprehensive demonstrations for **Unit 2 (OOP & Java Fundamentals)**, **Unit 3 (Exceptions, Strings, Multithreading)**, and **Unit 4 (Generics & Collections Framework)** under the package `com.studentmanagement.backend.concepts`."

---

## 2. Core Java Concepts & Explanations (Simple English)

### Unit 2: Object-Oriented Programming (OOP)

1. **What is the difference between a Class and an Object?**
   - **Class:** A blueprint, template, or prototype from which objects are created (e.g., `StudentMember`).
   - **Object:** A concrete instance of a class that has state (attributes) and behavior (methods) in memory (e.g., `student1`).

2. **What is Constructor Overloading?**
   - Having multiple constructors in the same class with different parameter lists. In `StudentMember.java`, we have one constructor taking 5 parameters (including marks array) and another taking 4 parameters which calls the first using `this(...)`.

3. **What is the difference between `this` and `super` keywords?**
   - `this`: Refers to the current class instance (used to resolve variable shadowing like `this.name = name` or to call another constructor in the same class).
   - `super`: Refers to the immediate parent class instance (used to invoke the superclass constructor like `super(name, email)` or call overridden superclass methods).

4. **What are Static Members?**
   - Variables and methods belonging to the class itself rather than individual instances. In our project, `AcademicPerson.totalPersonsRegistered` is shared across all student and faculty instances to maintain a global count.

5. **What is the difference between Method Overloading and Method Overriding?**
   - **Overloading (Compile-time Polymorphism):** Methods in the same class with the same name but different signatures (different number or types of parameters). Example: `matches(String query)` and `matches(String query, String filterCourse)`.
   - **Overriding (Run-time Polymorphism):** A subclass provides a specific implementation of a method already defined in its parent class with the exact same name, return type, and parameters. Example: `StudentMember` overriding `getRole()`.

6. **What is the difference between an Abstract Class and an Interface?**
   - **Abstract Class:** Can have both abstract methods and concrete methods with state (instance variables). Supports single inheritance (`extends`). Example: `AcademicPerson`.
   - **Interface:** A contract defining abstract methods (and default/static methods). A class can implement multiple interfaces (`implements`). Example: `AcademicEntity`.

---

### Unit 3: Exception Handling, Strings & Multithreading

1. **What is the difference between Checked and Unchecked Exceptions?**
   - **Checked Exceptions:** Inherit from `java.lang.Exception` (excluding `RuntimeException`). Checked at compile-time; the compiler forces you to handle them using `try-catch` or declare them with `throws`. Example: `InvalidStudentMarksException`.
   - **Unchecked Exceptions:** Inherit from `java.lang.RuntimeException`. Occur during runtime and do not require mandatory compile-time handling. Example: `StudentValidationException` and `DuplicateEmailException`.

2. **What is the purpose of `try-catch-finally`?**
   - `try`: Encloses code that might throw an exception.
   - `catch`: Handles the specific exception if one occurs.
   - `finally`: A block that **always executes**, regardless of whether an exception occurred or was handled. Used for resource cleanups (closing files, database connections, streams).

3. **What is the difference between `throw` and `throws`?**
   - `throw`: Used inside a method to explicitly throw an exception object (e.g., `throw new InvalidStudentMarksException(...)`).
   - `throws`: Used in the method signature to declare that the method might throw one or more exceptions to the caller.

4. **What is the difference between `String` and `StringBuffer`?**
   - **`String`:** Immutable. Any modification (like `concat()`) creates a new String object in memory, leaving the original unchanged.
   - **`StringBuffer`:** Mutable and thread-safe (methods are synchronized). Operations like `append()` and `insert()` modify the buffer in-place without creating new objects.

5. **What are the two ways to create a thread in Java?**
   - **Extending `Thread` class:** Override the `run()` method and invoke `start()`. Example: `StudentTaskThread`.
   - **Implementing `Runnable` interface:** Implement `run()`, pass the Runnable instance to a `new Thread(runnable)` object, and invoke `start()`. Preferred in industry because Java allows implementing multiple interfaces while supporting only single class inheritance. Example: `StudentReportTask`.

6. **What is the Thread Lifecycle?**
   - **NEW:** Thread object created, but `start()` has not been called yet.
   - **RUNNABLE:** Thread is ready to run or actively executing in the CPU.
   - **TIMED_WAITING:** Thread is waiting for a specified duration (e.g., `Thread.sleep(1000)`).
   - **TERMINATED:** Thread has finished executing its `run()` method.

---

### Unit 4: Generic Programming & Collections Framework

1. **Why do we use Generics in Java?**
   - Provides **compile-time type safety** and eliminates the need for explicit type casting. It catches type errors at compile time rather than crashing with `ClassCastException` at runtime.

2. **What is a Generic Class and a Generic Method?**
   - **Generic Class:** A class defined with type parameters (e.g., `StudentBox<T>`), allowing it to store objects of different types safely.
   - **Generic Method:** A method declared with its own type parameter (e.g., `public static <T> void printElement(T item)`), independent of whether the class is generic.

3. **Explain Upper Bounded vs Lower Bounded Wildcards.**
   - **Upper Bounded (`? extends Number`):** Restricts the unknown type to a specific class or its subclasses. Best for **producers (read-only)**: e.g., calculating average marks from `List<? extends Number>`.
   - **Lower Bounded (`? super Integer`):** Restricts the unknown type to a specific class or its superclasses. Best for **consumers (write-friendly)**: e.g., safely adding integers into `List<? super Integer>`.
   - **Unbounded (`<?>`):** Can represent any unknown object type (`List<?>`).

4. **What is the difference between `List`, `Set`, and `Map`?**
   - **`List` (e.g., `ArrayList`):** Ordered collection, allows duplicate values, supports positional index access (`get(i)`).
   - **`Set` (e.g., `HashSet`):** Unordered collection, **does not allow duplicate values**. Used in our system to store unique student emails.
   - **`Map` (e.g., `HashMap`):** Stores key-value pairs (`K, V`). Keys must be unique; values can be duplicated. Used in our system to look up student records by their enrollment number.

---

## 3. Architecture & Authentication Q&A

1. **How does Student and Admin authentication work?**
   - The user enters their email and password on the React login page.
   - The frontend sends a `POST /api/auth/login` request.
   - Spring Security's `AuthenticationManager` verifies the BCrypt-hashed password against PostgreSQL.
   - If valid, `JwtService` creates a signed JWT containing the user's email and role (`ROLE_STUDENT` or `ROLE_FACULTY`).
   - The frontend stores the token in `localStorage` and redirects `ADMIN` users to `/dashboard` and `STUDENT` users to `/student-dashboard`.

2. **What is JWT and why is it used?**
   - JWT stands for **JSON Web Token**. It is an open standard (RFC 7519) for securely transmitting information as a JSON object.
   - It consists of three parts separated by dots: **Header**, **Payload (Claims)**, and **Signature** (`HMAC-SHA256`).
   - We use JWT because it is **stateless**: the backend server does not need to store HTTP sessions in memory. Every incoming request presents `Authorization: Bearer <token>`, which is verified mathematically.

3. **How does the backend prevent a Student from accessing Admin APIs?**
   - We enforce authorization using Spring Security's `@EnableMethodSecurity` and `@PreAuthorize("hasRole('ADMIN')")` on endpoints such as `GET /api/students`, `POST /api/students`, and `DELETE /api/students/{id}`.
   - Furthermore, in `StudentController`, if a student tries to access another student's record (`GET /api/students/{id}`), the backend inspects the authenticated JWT principal email. If it does not match the record's email, the server immediately returns **403 Forbidden**.

---

## 4. How to Demonstrate the Project to the Examiner

1. **Start the Demonstration:**
   - Mention the MCA Course Code: **CAM5001C** and Course Title: **Core Java**.
   - Show the concept demonstration scripts running cleanly in the terminal (`StudentOOPDemo`, `StudentExceptionDemo`, `StudentThreadDemo`, `StudentCollectionDemo`, etc.).
2. **Demonstrate Role-Based Access Control:**
   - **Step 1:** Log in with an **ADMIN** account (`admin@studenthub.edu`). Show the Admin Dashboard with total student statistics, the Student Management directory, Add Student modal, Update Student, and Delete Student features.
   - **Step 2:** Log in with a **STUDENT** account (or click "New Student? Create a student account").
   - **Step 3:** Show that the student is automatically routed to `/student-dashboard`.
   - **Step 4:** Highlight that the student view **only displays their personal academic profile** and permitted profile editing. Show that administrative CRUD controls (Add Student, Delete Student, Student Management table) are completely hidden and inaccessible.
   - **Step 5:** Attempt to manually navigate to `/dashboard` or `/students` as a student, demonstrating that the React protected route automatically blocks access and redirects back to `/student-dashboard`.

