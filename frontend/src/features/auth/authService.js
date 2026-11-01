import { apiRequest } from "@/services/api";

const AUTH_ENDPOINT = "/auth";

/**
 * Log in a user (Student or Admin).
 * Returns AuthResponse { token, tokenType, id, name, email, role }
 */
export const loginUser = async (credentials) => {
  return apiRequest(`${AUTH_ENDPOINT}/login`, {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};

/**
 * Register a new student account.
 * Role is strictly assigned as STUDENT by backend.
 */
export const registerUser = async (userData) => {
  return apiRequest(`${AUTH_ENDPOINT}/register`, {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

/**
 * Retrieve the current logged-in user details stored in localStorage.
 */
export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
};

/**
 * Check if the user is authenticated.
 */
export const isAuthenticated = () => {
  return localStorage.getItem("isAuthenticated") === "true" && Boolean(localStorage.getItem("token"));
};

/**
 * Check if the current user has ADMIN role.
 */
export const isAdminUser = () => {
  const user = getCurrentUser();
  if (!user || !user.role) return false;
  const role = user.role.toUpperCase();
  return role === "ADMIN" || role === "ROLE_FACULTY";
};

/**
 * Check if the current user has STUDENT role.
 */
export const isStudentUser = () => {
  const user = getCurrentUser();
  if (!user || !user.role) return false;
  const role = user.role.toUpperCase();
  return role === "STUDENT" || role === "ROLE_STUDENT";
};

/**
 * Change password for the logged-in user.
 */
export const changePassword = async (passwordData) => {
  return apiRequest(`${AUTH_ENDPOINT}/change-password`, {
    method: "POST",
    body: JSON.stringify(passwordData),
  });
};

/**
 * Clear session and log out.
 */
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("studenthub_student_profile");
};

