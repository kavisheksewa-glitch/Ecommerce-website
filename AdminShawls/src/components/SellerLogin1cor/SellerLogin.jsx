



import "./SellerLogin.css";
import image0 from "../../assets/logooo.png";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SellerLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // ✅ formData se email aur password destructure kar liye hain
      const { email, password } = formData;

      const response = await fetch("https://ecommerce-website-ggui.onrender.com/api/seller/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success: Token save karein aur dashboard bhej dein
        localStorage.setItem("sellerToken", data.token);
        toast.success("Login Successful!");
        setTimeout(() => navigate("/seller-dashboard"), 1000);
      } else {
        // 🔴 Yahan backend ka message (jaise "Rejected" ya "Pending") toast mein dikhega
        toast.error(data.message || "Login failed"); 
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex justify-content-center align-items-center">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-4 col-lg-5 col-md-6 col-sm-10">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-5">
                {/* Logo Section */}
                <div className="text-center mb-4">
                  <img src={image0} alt="logo" className="seller-logo-img" />
                  <h2 className="fw-bold Seller_text-brown">Seller Portal</h2>
                  <p className="text-muted">Login to your Kavi Shawls Seller Account</p>
                </div>

                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control form-control-lg Seller_form-control"
                      placeholder="seller@example.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control form-control-lg Seller_form-control"
                      placeholder="Enter Password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="current-password"
                    />
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="remember" />
                      <label className="form-check-label" htmlFor="remember">Remember me</label>
                    </div>
                    <Link to="/seller/forget" className="text-decoration-none small Seller_text-brown">
                      Forgot Password?
                    </Link>
                  </div>

                  <button type="submit" className="Seller_btn-brown btn-lg w-100">
                    Login
                  </button>

                  <p className="text-center mt-4 mb-0">
                    Don't have an account?
                    <Link to="/seller/signup" className="text-decoration-none fw-bold Seller_text-brown ms-1">
                      Sign Up
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerLogin;