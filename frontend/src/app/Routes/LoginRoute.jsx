import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser, isAuthenticated } from "@/features/auth/authService";

function LoginRoute() {
  const authed = isAuthenticated();

  if (authed) {
    const user = getCurrentUser();
    let role = (user?.role || "STUDENT").toUpperCase().replace("ROLE_", "");
    if (role === "USER") role = "STUDENT";
    if (role === "ADMIN") {
      return <Navigate to="/dashboard" replace />;
    } else {
      return <Navigate to="/student-dashboard" replace />;
    }
  }

  return <Outlet />;
}

export default LoginRoute;
