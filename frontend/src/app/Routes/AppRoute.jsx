
import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import Login from "@/features/auth/pages/Login";
import DashboardLayout from "@/components/layout/DashboardLayout";

import Dashboard from "@/features/dashboard/pages/Dashboard";
import Students from "@/features/students/pages/Students";
import Courses from "@/features/courses/pages/Courses";
import Reports from "@/features/reports/pages/Reports";
import Settings from "@/features/settings/pages/Settings";

import ProtectedRoute from "./ProtectedRoute";
import LoginRoute from "./LoginRoute";
import NotFound from "./NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
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
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <DashboardLayout />,
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
            path: "reports",
            element: <Reports />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
          {
            index: true,
            element: <Navigate to="/dashboard" replace />,
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
