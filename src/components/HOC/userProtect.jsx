/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UserProtect({ element }) {
  const authData = useSelector((state) => state.authData);
  const userId = authData?.userId;
  const userRole = authData?.userRole;

  if (!userId) {
    return <Navigate to="/login" />;
  }

  if (userRole !== "user") {
    return <Navigate to="/" />;
  }

  return element;
}
