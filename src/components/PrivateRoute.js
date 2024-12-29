import { AuthContext } from "../context/AuthContext";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ Component, allowedRoles }) {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) return <Navigate to="/auth/login" />;

  return <Component />;
}
