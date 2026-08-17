import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaEnvelope } from "react-icons/fa";

//import logoImage from "../assets/logooo.png"; 
import logoImage from "../../assets/logooo.png";
function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Backend API ko request bhej rahe hain
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // 1. LocalStorage mein Admin status set karein
        localStorage.setItem("isAdmin", "true");
        if (data.token) {
          localStorage.setItem("adminToken", data.token);
        }

        // 2. Sahi password hone par seedha Dashboard par bhej dein
        navigate("/admin/dashboard");
      } else {
        // Agar password ya email galat ho
        alert(data.message || "Invalid Email or Password!");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server se connect nahi ho pa raha. Backend server check karein!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: "#fdfbf7" }}>
      <div className="card shadow-lg p-5 border-0 rounded-4" style={{ width: "420px", backgroundColor: "#ffffff" }}>
        
        {/* Header / Logo Section */}
        <div className="text-center mb-4">
          <div className="mb-3 d-flex justify-content-center">
            <img 
              src={logoImage} 
              alt="Kavi Shawls Logo" 
              style={{ maxHeight: "100px", width: "auto", objectFit: "contain" }} 
            />
          </div>
          
          <h3 className="fw-bold" style={{ color: "#4A0E17" }}>Welcome Back</h3>
          <p className="text-muted small">Sign in to your Kavi Shawls Admin Panel</p>
        </div>

        <form onSubmit={handleLogin}>
          {/* Email Field */}
          <div className="mb-3">
            <label className="form-label fw-semibold text-secondary small">Email Address</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0 text-muted">
                <FaEnvelope />
              </span>
              <input
                type="email"
                className="form-control border-start-0 ps-0 bg-light"
                placeholder="admin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="off"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="form-label fw-semibold text-secondary small">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0 text-muted">
                <FaLock />
              </span>
              <input
                type="password"
                className="form-control border-start-0 ps-0 bg-light"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
          </div>

          {/* Login Button */}
          <button 
            type="submit" 
            className="btn w-100 py-2 fw-bold text-white shadow-sm rounded-3"
            style={{ backgroundColor: "#4A0E17", border: "none" }}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-4">
          <small className="text-muted">Protected area. Authorized personnel only.</small>
        </div>

      </div>
    </div>
  );
}

export default AdminLogin;