// src/utils/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ requiredRole }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (requiredRole && user.userType !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
