// src/utils/DashboardRedirect.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function DashboardRedirect() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin-dashboard", { replace: true });
    } else {
      navigate("/user-dashboard", { replace: true });
    }
  }, [user, navigate]);

  return null; // or a loader if you want
}

export default DashboardRedirect;
