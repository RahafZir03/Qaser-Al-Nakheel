/* eslint-disable react/prop-types */
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function ProtectedRoute({ element }) {
  const navigate = useNavigate();
  const authData = useSelector((state) => state.authData);
  const userId = authData?.userId;
  const userRole = authData?.userRole;
  
  useEffect(() => {
    if (userId && userRole !== "admin") {
      toast.warn("You do not have permission to access this link.");
      navigate("/");
    }
  }, [userRole, userId, navigate]);

  if (!userId) {
    return <Navigate to="/login" />;
  }

  return userRole === "admin" ? element : null;
}
