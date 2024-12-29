import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
// import Footer from '../../components/Footer'

export default function Auth() {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<h1> Page Not Found </h1>} />
        {/* <Register/>
        <Footer/> */}
      </Routes>
    </>
  );
}
