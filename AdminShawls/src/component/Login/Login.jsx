import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./Login.css";
import bgVideo from "../../assets/login-bg.webm";
import { BASE_URL } from "../../utils/api";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    // Remove old error when user starts typing
    if (error) {
      setError("");
    }
  };

  // =========================
  // HANDLE LOGIN
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent double click / multiple requests
    if (loading) return;

    setError("");

    // =========================
    // EMPTY FIELD VALIDATION
    // =========================
    if (!formData.email || !formData.password) {
      toast.warning("Please fill in all fields.", {
        position: "top-right",
        autoClose: 2500,
      });

      return;
    }

    // Start loader
    setLoading(true);

    try {
      // =========================
      // LOGIN API
      // =========================
      const response = await fetch(
        `${BASE_URL}/api/customer/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      // =========================
      // LOGIN SUCCESS
      // =========================
      if (response.ok) {
        // Save token
        localStorage.setItem("token", data.token);

        // Decode JWT
        try {
          const decoded = jwtDecode(data.token);

          localStorage.setItem("userId", decoded.id);
          localStorage.setItem(
            "customerRole",
            decoded.role
          );
        } catch (decodeErr) {
          console.error(
            "Token decode failed:",
            decodeErr
          );
        }

        // Success toast
        toast.success(
          data.message || "Login successful!",
          {
            position: "top-right",
            autoClose: 1800,
          }
        );

        // Redirect after toast
        setTimeout(() => {
          window.location.href = "/customer";
        }, 2000);

        return;
      }

      // =========================
      // EMAIL NOT VERIFIED
      // =========================
      if (data.notVerified) {
        toast.warning(
          "Please verify your email first.",
          {
            position: "top-right",
            autoClose: 2000,
          }
        );

        setTimeout(() => {
          navigate("/verify-email", {
            state: {
              email:
                data.email || formData.email,
            },
          });
        }, 2200);

        return;
      }

      // =========================
      // INVALID LOGIN
      // =========================
      const errorMessage =
        data.message ||
        "Invalid email or password!";

      setError(errorMessage);

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });

      // Allow retry
      setLoading(false);

    } catch (err) {
      console.error("Login error:", err);

      const errorMessage =
        "Something went wrong. Please try again later.";

      setError(errorMessage);

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });

      // Allow retry
      setLoading(false);
    }
  };

  return (
    <div className="video-bg-container">

      {/* =========================
          BACKGROUND VIDEO
      ========================= */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="bg-video-element"
      >
        <source
          src={bgVideo}
          type="video/webm"
        />

        Your browser does not support the video tag.
      </video>

      {/* =========================
          TOAST CONTAINER
      ========================= */}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />

      {/* =========================
          LOGIN CONTAINER
      ========================= */}
      <div className="Customer_login-container">

        <div className="Customer_login-card">

          {/* TITLE */}
          <h2 className="Customer_login-title">
            Welcome Back
          </h2>

          <p className="Customer_login-subtitle">
            Login to your Kavi Shawls account
          </p>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="alert alert-danger py-2">
              {error}
            </div>
          )}

          {/* =========================
              LOGIN FORM
          ========================= */}
          <form onSubmit={handleSubmit}>

            {/* EMAIL */}
            <div className="mb-3">

              <label className="Customer_form-label">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                className="Customer_form-control"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
                required
                disabled={loading}
              />

            </div>

            {/* PASSWORD */}
            <div className="mb-3">

              <label className="Customer_form-label">
                Password
              </label>

              <input
                type="password"
                name="password"
                className="Customer_form-control"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
                disabled={loading}
              />

            </div>

            {/* REMEMBER + FORGOT PASSWORD */}
            <div className="d-flex justify-content-between align-items-center mb-3">

              <div className="form-check">

                <input
                  type="checkbox"
                  className="form-check-input"
                  id="remember"
                  disabled={loading}
                />

                <label
                  className="form-check-label"
                  htmlFor="remember"
                  style={{ fontSize: "13px" }}
                >
                  Remember me
                </label>

              </div>

              <Link
                to="/forgot-password"
                className="Customer_forgot-link"
              >
                Forgot Password?
              </Link>

            </div>

            {/* =========================
                LOGIN BUTTON
            ========================= */}
            <button
              type="submit"
              className="Customer_login-btn w-100"
              disabled={loading}
            >

              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>

                  Logging in...
                </>
              ) : (
                "Login"
              )}

            </button>

          </form>

          {/* SIGN UP */}
          <p className="Customer_signup-text">

            Don't have an account?{" "}

            <Link to="/signup">
              Sign Up
            </Link>

          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;