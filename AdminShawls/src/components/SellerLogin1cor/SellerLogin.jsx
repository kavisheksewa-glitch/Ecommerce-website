import "./SellerLogin.css";
//import image0 from "../assets/logooo.png";
import image0 from "../../assets/logooo.png";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
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
      const response = await axios.post("http://localhost:5000/api/seller/auth/login", formData);
      
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("seller", JSON.stringify(response.data.seller));
      localStorage.setItem("sellerId", response.data.seller._id);

      // Success Toast Notification
      toast.success("Login Successful!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Thoda delay taaki toast message dikhe phir navigate ho
      setTimeout(() => {
        navigate("/seller-dashboard");
      }, 1500);

    } catch (error) {
      // Error Toast Notification
      toast.error(error.response?.data?.message || "Invalid Credentials", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex justify-content-center align-items-center">
      {/* ToastContainer zaroori hai notifications screen par dikhane ke liye */}
      <ToastContainer />
      
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
                      autoComplete="new-password"
                    />
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="remember"  required/>
                      <label className="form-check-label" htmlFor="remember" >Remember me</label>
                    </div>
                    <Link to="/seller/forget" className="text-decoration-none small Seller_text-brown">
                      Forgot Password?
                    </Link>
                  </div>

                  <button type="submit" className=" Seller_btn-brown btn-lg w-100">
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