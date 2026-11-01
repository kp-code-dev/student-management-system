
import { Navigate, Outlet } from "react-router-dom";

function LoginRoute() {
  const isAuthenticated =
    localStorage.getItem("isAuthenticated") === "true";

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default LoginRoute;
