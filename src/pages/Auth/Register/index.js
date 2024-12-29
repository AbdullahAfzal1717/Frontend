import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { message } from "antd";
import axios from "axios"

export default function Register() {
  const [state, setState] = useState({ fullName: "", email: "", password: "" });
  const [file, setFile] = useState()
  const navigate = useNavigate('')
  const { dispatch, setIsAppLoading } = useContext(AuthContext);


  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  let { fullName, email, password } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();

    fullName = fullName.trim();

    if (fullName.length < 3) {
      return message.error("Please enter your full name", 3);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return message.error("Please enter a valid email address", 3);
    }
    if (password.length < 6) {
      return message.error("Password must be at least 6 characters long", 3);
    }

    try {

      axios.post("https://hackthonfinal.vercel.app/auth/register", { email, password })
        .then(({ status, data }) => {
          if (status === 201) {
            const { _id } = data.user
            setProfile(_id);
            // console.log(data.newTask._id)
          }
          else {
            message.success(data.message)
            console.log("error creating")
          }
        })
    }
    catch (err) {
      console.error('error', err)
    }
  }

  const setProfile = async (uid) => {
    const formData = new FormData();
    formData.append("name", fullName)
    formData.append("email", email)
    formData.append("uid", uid)
    if (file) {
      formData.append("image", file)
    }

    try {
      axios.post("https://hackthonfinal.vercel.app/auth/profile", formData)

        .then(({ status, data }) => {
          if (status === 201) {
            message.success(data.message)
            let user = data.userProfile
            console.log("user", user)
            dispatch({ type: "SET_PROFILE", payload: { user } })
            navigate("/auth/login")
          }
          else {
            message.error(data.message)
            console.log("error creating")
          }
        })


    } catch (error) {
      console.log("Error adding document: ", error);
    } finally {
      setIsAppLoading(false);
    }
  };

  // let { fullName, email, password } = state;
  // if (fullName.length > 2 && email !== "" && password.length > 7) {
  //   const newuser = {
  //     fullName,
  //     email,
  //     password,
  //   };
  //   const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  //   existingUsers.push(newuser);

  //   localStorage.setItem("users", JSON.stringify(existingUsers));

  //   const formData = { fullName, email, password };
  //   console.log("formData", formData);

  //   navigate("/auth/login");
  // } else {
  //   setMessage("Information is not correct");
  // }
  return (
    <main className="auth py-5" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <div className="container d-flex align-items-center justify-content-center vh-100">
        <div
          className="card shadow-lg p-4 rounded"
          style={{
            maxWidth: 450,
            width: "100%",
            borderRadius: "15px",
            background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
          }}
        >
          <h2 className="text-center text-primary mb-4">Register</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                className="form-control"
                placeholder="Enter your full name"
                name="fullName"
                onChange={handleChange}
                style={{ borderRadius: "10px", padding: "10px" }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                name="email"
                onChange={handleChange}
                style={{ borderRadius: "10px", padding: "10px" }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                name="password"
                onChange={handleChange}
                style={{ borderRadius: "10px", padding: "10px" }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="form-label">
                Profile Picture
              </label>
              <input
                type="file"
                id="image"
                className="form-control"
                name="image"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ borderRadius: "10px", padding: "10px" }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{
                borderRadius: "10px",
                padding: "10px",
                fontWeight: "bold",
              }}
            >
              Register
            </button>
            <p className="text-center mt-3 mb-0" style={{ fontSize: "14px" }}>
              Already have an account?{" "}
              <Link to="/auth/login" className="text-primary" style={{ textDecoration: "underline" }}>
                Login Now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>


  );
}
