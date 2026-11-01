# Student Management System

[![Java](https://img.shields.io/badge/Java-25%2B-ED8B00?logo=openjdk&logoColor=white)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.1.2-6DB33F?logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Spring Security](https://img.shields.io/badge/Spring%20Security-JWT-6DB33F?logo=springsecurity&logoColor=white)](https://spring.io/projects/spring-security)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)

A full-stack, enterprise-grade academic management system designed and developed for the **Master of Computer Applications (MCA) Semester 1 Core Java (CAM5001C)** curriculum.

The application features Role-Based Access Control (RBAC) separating **STUDENT** from **ADMIN (Faculty)** roles with Spring Security 6.x and stateless JWT authentication, coupled with academic implementations of Unit 2, Unit 3, and Unit 4 Core Java concepts.

---

## 1. Academic Programme Information

- **Programme:** Master of Computer Applications (MCA)
- **Semester:** 1
- **Course Title:** Core Java
- **Course Code:** CAM5001C
- **Academic Year:** 2026–2027
- **Concept Package:** `com.studentmanagement.backend.concepts`

---

## 2. Key Features

### Role-Based Access Control (RBAC)
- **Student Capabilities:**
  - Secure authentication via institutional credentials.
  - Dedicated **Student Dashboard** (`/student-dashboard`).
  - View personal enrollment identifier, program details, and verified profile data.
  - In-place updating of permitted personal contact information.
  - Strict prevention from accessing administrative CRUD controls or other students' data.
- **Admin (Faculty) Capabilities:**
  - Dedicated **Admin Dashboard** (`/dashboard`).
  - Full CRUD operations over student records (`/students`).
  - Real-time student search, filtering, and matriculation tracking.
  - Course curriculum management and enrolled student counts (`/courses`).
  - Institutional analytics and CSV report generation (`/reports`).

### Core Java Assignment 2 Mandatory Integrations
- **Unit 2 — OOP & Java Fundamentals:** Classes, Objects, Constructors, `this`, `super`, Static members, Inheritance, Abstract classes, Interfaces, Overloading, Overriding, Arrays, Wrapper classes, and Math class.
- **Unit 3 — Exceptions, Strings, Multithreading:** Custom checked and unchecked exceptions, `try-catch-finally`, `throw`/`throws`, `String` immutability vs `StringBuffer` mutability, `Thread` class, `Runnable` interface, and thread lifecycle states (`NEW`, `RUNNABLE`, `TIMED_WAITING`, `TERMINATED`).
- **Unit 4 — Generics & Collection Framework:** Generic container `StudentBox<T>`, Generic methods, Generic inheritance, Wildcards (upper bounded `? extends Number`, lower bounded `? super Integer`, unbounded `List<?>`), `List`, `Set`, `Map`, `Iterator`, Regular Expressions (`Pattern`/`Matcher`), Date/Time, and `Formatter`.

---

## 3. Technology Stack

- **Frontend:** React 18, Vite 8, React Router v6/v7, Tailwind CSS, Material Symbols, Recharts, React Toastify.
- **Backend:** Java 25 (compatible with Java 17+), Spring Boot 4.1.2, Spring Data JPA, Spring Security, jjwt (io.jsonwebtoken 0.12.6), Maven.
- **Database:** PostgreSQL.
- **Architecture:** Client-Server RESTful Architecture with Stateless JWT Bearer Authorization.

---

## 4. Local Development Setup

### Prerequisites
- Java Development Kit (JDK 17 or higher)
- Apache Maven (v3.9+)
- Node.js (v18+) and npm
- PostgreSQL database instance

### Backend Configuration & Run
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Configure your local environment variables in `src/main/resources/application.properties` (or export in shell):
   ```bash
   export DB_URL=jdbc:postgresql://localhost:5432/studenthub
   export DB_USERNAME=postgres
   export DB_PASSWORD=your_password
   export JWT_SECRET=YourBase64SecretKeyHereMinimum32BytesLengthForHmacSha256
   export FRONTEND_URL=http://localhost:5173
   ```
3. Compile and launch the Spring Boot service:
   ```bash
   mvn clean spring-boot:run
   ```
   The backend runs at `http://localhost:8080`.

### Frontend Configuration & Run
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Start the Vite local development server:
   ```bash
   npm run dev
   ```
   Access the frontend at `http://localhost:5173`.

---

## 5. Running Core Java Academic Demos

Execute any of the concept demonstration classes directly using Java:

```bash
# Compile backend classes first:
cd backend && mvn compile && cd ..

# Run Unit 2 OOP & Fundamentals Demo:
java -cp backend/target/classes com.studentmanagement.backend.concepts.StudentOOPDemo

# Run Unit 3 Exception Handling Demo:
java -cp backend/target/classes com.studentmanagement.backend.concepts.StudentExceptionDemo

# Run Unit 3 Multithreading Demo:
java -cp backend/target/classes com.studentmanagement.backend.concepts.StudentThreadDemo

# Run Unit 3 Thread Lifecycle Demo:
java -cp backend/target/classes com.studentmanagement.backend.concepts.StudentThreadLifecycleDemo

# Run Unit 3 String and StringBuffer Demo:
java -cp backend/target/classes com.studentmanagement.backend.concepts.StudentStringDemo

# Run Unit 4 Collections (List, Set, Map) Demo:
java -cp backend/target/classes com.studentmanagement.backend.concepts.StudentCollectionDemo

# Run Unit 4 Generic Class (StudentBox) Demo:
java -cp backend/target/classes com.studentmanagement.backend.concepts.StudentBox

# Run Unit 4 Generic Methods Demo:
java -cp backend/target/classes com.studentmanagement.backend.concepts.StudentGenericMethodDemo

# Run Unit 4 Wildcards Demo:
java -cp backend/target/classes com.studentmanagement.backend.concepts.StudentWildcardDemo
```

---

## 6. Project Documentation Directory

- **`JAVA_ASSIGNMENT_CONCEPT_MAPPING.md`**: Detailed mapping of Unit 2, Unit 3, and Unit 4 topics to Java classes, code samples, and expected outputs.
- **`ROLE_PERMISSION_MATRIX.md`**: Complete security matrix for STUDENT and ADMIN roles across APIs and React routes.
- **`VIVA_PREPARATION.md`**: Simplified English explanations, important viva questions & answers, and demonstration procedures for university examiners.
