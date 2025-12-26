import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ children }) {
  const { token, user } = useAuth();
  const location = useLocation();

  if (!token) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // If logged in, redirect based on email (admin@test.com = admin)
  if (user?.email === "admin@test.com" && location.pathname !== "/dashboard") {
    return <Navigate to="/dashboard" replace />;
  }

  if (user?.email !== "admin@test.com" && location.pathname !== "/my-tasks") {
    return <Navigate to="/my-tasks" replace />;
  }

  // If allowed, render children
  return children;
}
