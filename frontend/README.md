# Student Management System (SMS)

A full-stack Student Management System developed to manage student
records through a web interface. The project combines a React frontend
with a Java Spring Boot backend and a PostgreSQL database.

## Project Overview

The application provides an authenticated interface for managing student
information. Users can sign in and perform student record operations
such as adding, viewing, updating, searching, filtering, and deleting
records.

**Project type:** Full-stack web application\
**Backend:** Java, Spring Boot, Spring Data JPA\
**Frontend:** React, Vite, JavaScript\
**Database:** PostgreSQL\
**Authentication:** Spring Security and JWT

## Main Features

-   User registration and login using JWT authentication.
-   Protected student-management API endpoints.
-   Create, read, update, and delete student records.
-   Search and filter student records.
-   Dashboard with student summaries and charts.
-   Course-related views and reports based on student records.
-   CSV export from the frontend.
-   Settings stored in the browser for the current browser profile.

> Note: Settings currently use browser local storage. They are not
> synchronised between different browsers or devices.

## Technology Stack

### Frontend

-   React
-   Vite
-   JavaScript
-   Tailwind CSS and the project's UI components
-   Recharts for dashboard charts

### Backend

-   Java
-   Spring Boot
-   Spring Web
-   Spring Data JPA
-   Spring Security
-   Bean Validation
-   Maven
-   JSON Web Token (JWT)

### Database and Deployment

-   PostgreSQL (Neon)
-   AWS EC2
-   Nginx reverse proxy
-   Let's Encrypt HTTPS certificate
-   Vercel frontend hosting

## Project Structure

The repository is organised into `frontend` and `backend` applications.

``` text
student-management-system/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── .env.example
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/studentmanagement/backend/
│   │   │   │   ├── concepts/
│   │   │   │   ├── controller/
│   │   │   │   ├── dto/
│   │   │   │   ├── exception/
│   │   │   │   ├── model/
│   │   │   │   ├── repository/
│   │   │   │   ├── security/
│   │   │   │   └── service/
│   │   │   └── resources/application.properties
│   │   └── test/
│   ├── pom.xml
│   └── mvnw
│
└── README.md
```

## Backend Setup

### Requirements

-   JDK 25 (the Maven project is configured for Java 25)
-   Maven, or use the included Maven Wrapper
-   PostgreSQL database
-   Git

### Configure environment variables

The backend reads database and JWT configuration from environment
variables. Do not put real credentials in source control.

Configure these variables in your shell or deployment environment:

``` bash
DB_URL=jdbc:postgresql://YOUR_DATABASE_HOST/YOUR_DATABASE_NAME?sslmode=require
DB_USERNAME=YOUR_DATABASE_USERNAME
DB_PASSWORD=YOUR_DATABASE_PASSWORD
JWT_SECRET=YOUR_LONG_RANDOM_SECRET
FRONTEND_URL=http://localhost:5173
```

The database URL should not contain the username or password; provide
those separately.

### Run the backend locally

From the repository root:

``` bash
cd backend
./mvnw spring-boot:run
```

If Maven is installed, this can also be used:

``` bash
mvn spring-boot:run
```

The backend runs on port `8080` by default.

To build the executable JAR:

``` bash
./mvnw clean package
```

Run the JAR after setting the required environment variables:

``` bash
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

## Frontend Setup

### Requirements

-   Node.js
-   npm

Create `frontend/.env` with the backend API base URL:

``` bash
VITE_API_BASE_URL=http://localhost:8080/api
```

Install dependencies and start the development server:

``` bash
cd frontend
npm install
npm run dev
```

For a production build:

``` bash
npm run build
```

For the deployed frontend, configure `VITE_API_BASE_URL` in the hosting
provider's environment-variable settings and redeploy after changing it.

## API Endpoints

The backend exposes the following main endpoints:

  Method   Endpoint               Purpose                          Access
  -------- ---------------------- -------------------------------- --------------
  POST     `/api/auth/register`   Register a user                  Public
  POST     `/api/auth/login`      Authenticate and receive a JWT   Public
  GET      `/api/students`        Get all students                 JWT required
  POST     `/api/students`        Add a student                    JWT required
  GET      `/api/students/{id}`   Get a student by ID              JWT required
  PUT      `/api/students/{id}`   Update a student                 JWT required
  DELETE   `/api/students/{id}`   Delete a student                 JWT required

Include the JWT in the request header for protected endpoints:

``` text
Authorization: Bearer YOUR_JWT_TOKEN
```

## Backend Package Guide

  Package        Responsibility
  -------------- ------------------------------------------------------
  `model`        JPA entities such as Student and AppUser
  `repository`   Database access through Spring Data JPA
  `service`      Application and business logic
  `controller`   REST API endpoints
  `dto`          Request and response data objects
  `security`     JWT authentication and Spring Security configuration
  `exception`    Custom exceptions and API exception handling
  `concepts`     Core Java concept demonstration programs

## Core Java Concepts Demonstrated

The `concepts` package contains standalone demonstration classes used to
illustrate concepts relevant to the Core Java assignment.

  ---------------------------------------------------------------------------------------
  Assignment unit         Concepts                Example source files
  ----------------------- ----------------------- ---------------------------------------
  Unit 2                  Classes and objects,    `StudentOOPDemo.java`
                          inheritance, abstract   
                          classes, interfaces,    
                          polymorphism, method    
                          overloading and         
                          overriding              

  Unit 3                  String handling,        `StudentStringDemo.java`,
                          exception handling,     `StudentExceptionDemo.java`,
                          user-defined exception, `StudentThreadDemo.java`,
                          threads and Runnable    `StudentTaskThread.java`,
                                                  `StudentReportTask.java`

  Unit 4                  Generic classes,        `StudentBox.java`,
                          generic methods,        `StudentGenericMethodDemo.java`,
                          generic inheritance,    `StudentGenericInheritanceDemo.java`,
                          wildcards and           `StudentWildcardDemo.java`,
                          collections             `StudentCollectionDemo.java`
  ---------------------------------------------------------------------------------------

Other supporting demonstrations in the package cover wrapper classes,
date/time, regular expressions, formatter utilities, and thread
lifecycle.

### Run a concept demonstration

The concept classes are in the Java package:

``` text
com.studentmanagement.backend.concepts
```

They are part of the Maven source tree and can be compiled with the
project's dependencies. From `backend`, compile the project:

``` bash
./mvnw clean compile
```

To run an individual class with Maven-managed dependencies, use an IDE
run configuration for its `main` method, or construct a classpath that
includes the compiled classes and Maven dependencies. These
demonstration classes are separate from the Spring Boot web application
flow.

To start the complete application, use:

``` bash
./mvnw spring-boot:run
```

## Security Notes

-   Never commit `.env` files, database passwords, JWT secrets, access
    tokens, or private keys.
-   Use a strong, randomly generated JWT secret in each environment.
-   Keep database credentials in environment variables or the hosting
    provider's secret manager.
-   Protected student endpoints require a valid JWT.
-   The frontend must use the HTTPS backend URL in production.

## Testing Checklist

-   [ ] Register a user.
-   [ ] Log in and receive a JWT.
-   [ ] Confirm protected endpoints reject unauthenticated requests.
-   [ ] Add a student.
-   [ ] View the student list and an individual record.
-   [ ] Update a student.
-   [ ] Delete a student.
-   [ ] Verify duplicate email handling.
-   [ ] Test search and course filtering in the frontend.
-   [ ] Run the Core Java concept demonstrations and capture their
    outputs.

## Assignment Deliverables

For the Core Java integrated assignment, prepare and submit the items
required by the faculty:

-   Java source code.
-   UML-style class diagram.
-   Unit 2, Unit 3, and Unit 4 concept checklist.
-   Output screenshots for normal and exception-handling cases.
-   Brief report explaining the project and where each concept is
    implemented.
-   Project presentation (PPT), if required by the submission form.

Only include screenshots and claims that correspond to the final
submitted source code and actual execution.

## Author

**Student Management System**\
Developed as an MCA Semester 1 project for the Core Java and full-stack
development learning work at Silver Oak College of Computer Application.

------------------------------------------------------------------------

*This README describes the project structure and features represented in
the supplied project source. Update any deployment URLs, author details,
and screenshots before publishing the repository publicly.*
