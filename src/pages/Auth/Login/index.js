import React, { useContext, useState } from "react";

import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { message } from "antd";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAppLoading, setuser } = useContext(AuthContext);

  // const { login } = useContext(AuthContext);
  // const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
  // const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return message.error("Please enter a valid email address", 3);
    }
    if (password.length < 6) {
      return message.error("Password must be at least 6 characters long", 3);
    }

    setIsAppLoading(true);

    axios.post("https://hackthonfinal.vercel.app/auth/login", { email, password })
      .then(({ status, data }) => {
        if (status === 201) {
          message.success(data.message)
          console.log("token", data.token)
          const token = data.token
          localStorage.setItem("token", JSON.stringify(token));
          setuser(token)
          setIsAppLoading(false)
        }
      })
      .catch((error) => {
        setIsAppLoading(false);
        message.error("Invalid credentials", 3);
      }
      )
      .finally(() => {
        setIsAppLoading(false);
      })
  };
  return (
    <main className="auth py-5" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <div className="container d-flex justify-content-center align-items-center">
        <div className="row w-100">
          <div className="col d-flex justify-content-center">
            <div
              className="card shadow-lg border-0 p-4"
              style={{
                maxWidth: 400,
                borderRadius: "15px",
                background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
              }}
            >
              <h2 className="text-center text-primary mb-4">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12 mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter Email"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ borderRadius: "10px", padding: "10px" }}
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter Password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ borderRadius: "10px", padding: "10px" }}
                    />
                  </div>
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      style={{
                        borderRadius: "10px",
                        padding: "10px",
                        fontWeight: "bold",
                      }}
                    >
                      Login
                    </button>
                    <p className="text-muted text-center mt-3 mb-0" style={{ fontSize: "14px" }}>
                      Don't have an account?{" "}
                      <Link to="/auth/register" className="text-primary" style={{ textDecoration: "underline" }}>
                        Register Now
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>

  );
}
