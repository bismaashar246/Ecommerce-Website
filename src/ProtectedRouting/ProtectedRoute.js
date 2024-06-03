import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const mode = localStorage.getItem("mode");
  const location = useLocation();

  if (token === "true") {
    // Check if the route is /adminhome and the user is not an admin
    if (location.pathname === "/adminhome" && mode !== "admin") {
      return <Navigate to="/home" />;
    }
    return <Outlet />;
  }

  return <Navigate to="/" />;
};

export default ProtectedRoute;
