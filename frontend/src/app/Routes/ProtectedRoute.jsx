import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser, isAuthenticated } from "@/features/auth/authService";

/**
 * ProtectedRoute component with optional role-based authorization.
 * If allowedRoles is provided, ensures current user's role is in allowedRoles.
 * If unauthorized, redirects to appropriate destination:
 * - Unauthenticated users -> /login
 * - Students trying to access Admin routes -> /student-dashboard
 * - Admin users accessing student-only routes -> /dashboard
 */
function ProtectedRoute({ allowedRoles = [] }) {
  const authed = isAuthenticated();

  if (!authed) {
    return <Navigate to="/login" replace />;
  }

  const user = getCurrentUser();
  let rawRole = (user?.role || "STUDENT").toUpperCase().replace("ROLE_", "");
  // Normalize legacy "USER" to "STUDENT"
  if (rawRole === "USER") {
    rawRole = "STUDENT";
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(rawRole)) {
    // Redirect based on role
    if (rawRole === "ADMIN") {
      return <Navigate to="/dashboard" replace />;
    } else {
      return <Navigate to="/student-dashboard" replace />;
    }
  }

  return <Outlet />;
}

export default ProtectedRoute;
