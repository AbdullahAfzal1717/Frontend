import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./Auth";
import Frontend from "./Frontend";
import PrivateRoute from "../components/PrivateRoute";
import { AuthContext } from "../context/AuthContext";

export default function Index() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/*"
        element={<PrivateRoute Component={Frontend} />}
      />

      <Route
        path="auth/*"
        element={
          !isAuthenticated ? <Auth /> : <Navigate to="/" />
        }
      />
    </Routes>
  );
}
