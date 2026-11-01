# Role & Permission Matrix

**Project:** Student Management System  
**Framework:** Spring Security 6.x + JWT / React.js  
**Course Code:** CAM5001C — Core Java  
**Academic Year:** 2026–2027  

This document details the Role-Based Access Control (RBAC) architecture separating the **STUDENT** role from the **ADMIN** (Faculty) role across backend REST API endpoints and frontend React routes.

---

## 1. Role Definitions

| Role Identifier | Assigned To | Registration Source | Security Scope |
| :--- | :--- | :--- | :--- |
| **`STUDENT`** (`ROLE_STUDENT`) | Enrolled students | Public `/api/auth/register` form | Restricted to personal dashboard, personal student profile, and updating permitted personal fields. Cannot access administrative endpoints. |
| **`ADMIN`** (`ROLE_FACULTY`) | Faculty / Administrators | Controlled database seed / Admin provisioning | Full administrative authority across student records, CRUD operations, academic courses, reports, and system settings. |

---

## 2. Backend REST API Permission Matrix

All endpoints require a valid JWT `Bearer <token>` in the `Authorization` header, except `/api/auth/**`.

| HTTP Method | API Endpoint | Description | Permitted Roles | Authorization Enforcement | HTTP Responses |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/login` | Authenticate user & issue JWT | Public | None | `200 OK`, `400 Bad Request`, `401 Unauthorized` |
| **POST** | `/api/auth/register` | Register new student account | Public (Force `ROLE_STUDENT`) | Server overrides any client role to `ROLE_STUDENT` | `201 Created`, `400 Bad Request`, `409 Conflict` |
| **GET** | `/api/students` | Retrieve all student records | **ADMIN** | `@PreAuthorize("hasRole('ADMIN')")` | `200 OK`, `401 Unauthorized`, `403 Forbidden` |
| **POST** | `/api/students` | Add new student record | **ADMIN** | `@PreAuthorize("hasRole('ADMIN')")` | `201 Created`, `400 Bad Request`, `403 Forbidden`, `409 Conflict` |
| **GET** | `/api/students/me` | Fetch logged-in student profile | **STUDENT**, **ADMIN** | Authenticated principal email lookup | `200 OK`, `401 Unauthorized`, `404 Not Found` |
| **PUT** | `/api/students/me` | Update logged-in student details | **STUDENT** | Authenticated principal ownership | `200 OK`, `400 Bad Request`, `401 Unauthorized` |
| **GET** | `/api/students/{id}` | View student record by ID | **ADMIN** or Owner **STUDENT** | Ownership verification: student email must match entity email | `200 OK`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found` |
| **PUT** | `/api/students/{id}` | Update student record by ID | **ADMIN** or Owner **STUDENT** | Ownership verification; students cannot alter other records | `200 OK`, `400 Bad Request`, `403 Forbidden`, `404 Not Found` |
| **DELETE**| `/api/students/{id}` | Delete student record | **ADMIN** | `@PreAuthorize("hasRole('ADMIN')")` | `204 No Content`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found` |

---

## 3. Frontend Route Permission Matrix

Protected routes are guarded by `<ProtectedRoute allowedRoles={[...]} />`. Unauthenticated requests redirect to `/login`. Unauthorized role attempts redirect to the respective user's dashboard.

| Route Path | View / Component | Permitted Roles | Behavior if Unauthorized |
| :--- | :--- | :--- | :--- |
| `/login` | `Login.jsx` | Unauthenticated (Public) | If already logged in: redirects `ADMIN` to `/dashboard`, `STUDENT` to `/student-dashboard` |
| `/student-dashboard` | `StudentDashboard.jsx` | **STUDENT** | `ADMIN` redirected to `/dashboard` |
| `/dashboard` | `Dashboard.jsx` (Overview) | **ADMIN** | `STUDENT` redirected to `/student-dashboard` |
| `/students` | `Students.jsx` (Student Directory & CRUD) | **ADMIN** | `STUDENT` redirected to `/student-dashboard` |
| `/courses` | `Courses.jsx` (Academic Programs) | **ADMIN** | `STUDENT` redirected to `/student-dashboard` |
| `/reports` | `Reports.jsx` (Analytics & CSV Export) | **ADMIN** | `STUDENT` redirected to `/student-dashboard` |
| `/settings` | `Settings.jsx` (Profile & Preferences) | **STUDENT**, **ADMIN** | Unauthenticated redirected to `/login` |

---

## 4. Privilege Escalation Prevention Rules

1. **Backend Role Assignment Lock:**  
   The `RegisterRequest` DTO does not expose a role attribute. `AuthService.register()` explicitly calls `user.setRole("ROLE_STUDENT")`. Even if a user crafts a raw JSON payload containing `"role": "ADMIN"`, the backend ignores it.

2. **Ownership Validation on Profile Operations:**  
   When a student attempts to fetch or update records via `/api/students/{id}`, `StudentController` extracts the logged-in user's email from `Authentication.getName()` and verifies that it strictly matches `student.getEmail()`. If there is any mismatch, the backend immediately terminates the request with HTTP `403 Forbidden`.

3. **Stateless JWT Claims:**  
   JWT tokens issued at login include the verified database role (`role`) and subject (`sub: email`). Upon every request, `JwtAuthenticationFilter` validates the signature using HMAC-SHA256 and establishes `SecurityContextHolder` with `ROLE_FACULTY` or `ROLE_STUDENT`.

