import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import Login from "@/features/auth/pages/Login";
import DashboardLayout from "@/components/layout/DashboardLayout";

import Dashboard from "@/features/dashboard/pages/Dashboard";
import StudentDashboard from "@/features/dashboard/pages/StudentDashboard";
import StudentProfile from "@/features/dashboard/pages/StudentProfile";
import AccountSettings from "@/features/dashboard/pages/AccountSettings";
import Students from "@/features/students/pages/Students";
import Courses from "@/features/courses/pages/Courses";
import Faculty from "@/features/faculty/pages/Faculty";
import Reports from "@/features/reports/pages/Reports";
import Settings from "@/features/settings/pages/Settings";

import ProtectedRoute from "./ProtectedRoute";
import LoginRoute from "./LoginRoute";
import NotFound from "./NotFound";
import { getCurrentUser } from "@/features/auth/authService";

// Helper component to redirect root "/" or default protected to respective role dashboard
function RoleDefaultRedirect() {
  const user = getCurrentUser();
  let role = (user?.role || "STUDENT").toUpperCase().replace("ROLE_", "");
  if (role === "USER") role = "STUDENT";
  if (role === "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }
  return <Navigate to="/student-dashboard" replace />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RoleDefaultRedirect />,
  },
  {
    element: <LoginRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    // Shared Layout for authenticated routes
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <DashboardLayout />,
        children: [
          // Common routes accessible by both STUDENT and ADMIN
          {
            path: "settings",
            element: <Settings />,
          },
          // STUDENT-Specific Protected Routes (Only STUDENT allowed)
          {
            element: <ProtectedRoute allowedRoles={["STUDENT"]} />,
            children: [
              {
                path: "student-dashboard",
                element: <StudentDashboard />,
              },
              {
                path: "student-profile",
                element: <StudentProfile />,
              },
              {
                path: "student-settings",
                element: <AccountSettings />,
              },
            ],
          },
          // ADMIN-Specific Protected Routes (Only ADMIN / Faculty allowed)
          {
            element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
            children: [
              {
                path: "dashboard",
                element: <Dashboard />,
              },
              {
                path: "students",
                element: <Students />,
              },
              {
                path: "courses",
                element: <Courses />,
              },
              {
                path: "faculty",
                element: <Faculty />,
              },
              {
                path: "reports",
                element: <Reports />,
              },
            ],
          },
          {
            index: true,
            element: <RoleDefaultRedirect />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
