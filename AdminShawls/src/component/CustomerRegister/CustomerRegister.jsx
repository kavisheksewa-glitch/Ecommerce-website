import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerRegister.css"; // CSS file import karein
//import bgVideo from "../assets/Register-bg.mp4"; // Apni video ka path yahan dein
import bgVideo from "../../assets/Register-bg.mp4";

function CustomerRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    dob: "",
    password: "",
    confirmPassword: "",
    houseNo: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/shawls/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration Successful!");
        navigate("/login");
      } else {
        alert(data.message || "Registration failed!");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert(error.message || "Server connection failed. Please try again later.");
    }
  };

  return (
    <div className="video-bg-container">
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="bg-video-element">
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Main Form Wrapper */}
      <div className="container py-4 Customer_register-wrapper">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card Customer_register-card border-0 rounded-4">
              <div className="card-header bg-dark text-white text-center py-3 rounded-top-4">
                <h2 className="mb-0">Customer Registration</h2>
              </div>

              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="fw-semibold">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        className="form-control"
                        placeholder="Enter Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="fw-semibold">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="off"
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="fw-semibold">Mobile Number</label>
                      <input
                        type="tel"
                        name="mobile"
                        className="form-control"
                        placeholder="Enter Mobile Number"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="fw-semibold">Date of Birth</label>
                      <input
                        type="date"
                        name="dob"
                        className="form-control"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="fw-semibold">Password</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="new-password"
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="fw-semibold">Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <hr />
                  <h4 className="mb-3 text-secondary">Address Details</h4>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="fw-semibold">House No.</label>
                      <input
                        type="text"
                        name="houseNo"
                        className="form-control"
                        placeholder="House No."
                        value={formData.houseNo}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="fw-semibold">Street / Area</label>
                      <input
                        type="text"
                        name="street"
                        className="form-control"
                        placeholder="Street / Area"
                        value={formData.street}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="fw-semibold">City</label>
                      <input
                        type="text"
                        name="city"
                        className="form-control"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="fw-semibold">State</label>
                      <input
                        type="text"
                        name="state"
                        className="form-control"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="fw-semibold">PIN Code</label>
                      <input
                        type="text"
                        name="pincode"
                        className="form-control"
                        placeholder="PIN Code"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="fw-semibold">Country</label>
                      <input
                        type="text"
                        name="country"
                        className="form-control"
                        value={formData.country}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="form-check mt-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label">
                      I agree to the Terms & Conditions
                    </label>
                  </div>

                  <button type="submit" className="btn btn-warning w-100 mt-4 fw-bold py-2">
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerRegister;