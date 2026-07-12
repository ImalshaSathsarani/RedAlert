import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("adminRole"); // store this during login

  if (!token || role !== "admin") {
    // Not logged in or not an admin
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
