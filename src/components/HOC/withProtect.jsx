/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Mosaic } from "react-loading-indicators";

export default function ProtectedRoute({ element }) {
  const { userId, userRole, isLoading } = useSelector(
    (state) => state.authData
  );

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-my-color">
        <Mosaic color={["#7a6a1d", "#a38d27", "#ccb131", "#d7c159"]} />
      </div>
    );
  }

  if (!userId) {
    toast.warn("Please log in first.");
    return <Navigate to="/logIn" />;
  }

  if (userRole !== "admin" || userRole !== "reception") {
    toast.warn("You do not have permission to access this link.");
    return <Navigate to="/" />;
  }

  return element;
}
