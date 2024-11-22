import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute(props) {
  const location = useLocation();
  const isAuthenticated = Boolean(localStorage.getItem("userToken"));
  const isHomePage = location.pathname === "/" || location.pathname === "/home";

  if (isHomePage) {
    return props.children;
  }

  if (isAuthenticated) {
    return props.children;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
}
