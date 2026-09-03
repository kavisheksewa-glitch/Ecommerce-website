
//claude corrected corrected office


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ naya import
import "./Login.css";
import bgVideo from "../../assets/login-bg.mp4";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("https://ecommerce-website-ggui.onrender.com/api/customer/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Backend ab sirf { message, token } bhejta hai — "user" object nahi.
        // Isliye token ko hi decode karke id/role nikal rahe hain.
        localStorage.setItem("token", data.token);

        try {
          const decoded = jwtDecode(data.token); // { id, email, role, iat, exp }
          localStorage.setItem("userId", decoded.id);
          localStorage.setItem("customerRole", decoded.role);
        } catch (decodeErr) {
          console.error("Token decode failed:", decodeErr);
        }

        alert(data.message || "Login Successful!");
        navigate("/customer"); // Ya jahan aapka main dashboard hai
      // } else {
      //   setError(data.message || "Invalid email or password!");
      // }
      } else if (data.notVerified) {
        // ✅ Email verify nahi hua - verify page pe bhej do
        setError(data.message || "Please verify your email first.");
        navigate("/verify-email", {
          state: { userId: data.userId, email: data.email },
        });
      } else {
        setError(data.message || "Invalid email or password!");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="video-bg-container">
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="bg-video-element">
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Login Box Container */}
      <div className="Customer_login-container">
        <div className="Customer_login-card">
          <h2 className="Customer_login-title">Welcome Back</h2>
          <p className="Customer_login-subtitle">Login to your Kavi Shawls account</p>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="Customer_form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="Customer_form-control"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
                required
              />
            </div>

            <div className="mb-3">
              <label className="Customer_form-label">Password</label>
              <input
                type="password"
                name="password"
                className="Customer_form-control"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="remember" />
                <label className="form-check-label" htmlFor="remember" style={{ fontSize: "13px" }}>
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="Customer_forgot-link">
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="Customer_login-btn w-100">
              Login
            </button>
          </form>

          <p className="Customer_signup-text">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;