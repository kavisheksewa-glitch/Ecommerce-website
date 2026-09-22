
import React, { useState } from "react";
import API from "../../utils/api";
import { useNavigate } from "react-router-dom";
import "./CustomerRegister.css";
import bgVideo from "../../assets/Register-bg.webm";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CustomerRegister() {
  const navigate = useNavigate();

  // Loader state
  const [loading, setLoading] = useState(false);

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

  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =========================
  // HANDLE REGISTRATION
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent double click / multiple API requests
    if (loading) return;

    // =========================
    // PASSWORD VALIDATION
    // =========================
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!", {
        position: "top-right",
        autoClose: 2500,
      });

      return;
    }

    // Start loader
    setLoading(true);

    try {
      // =========================
      // REGISTER CUSTOMER
      // =========================
      const response = await API.post(
        "/api/customer/register",
        formData
      );

      console.log("Registration successful:", response.data);

      // =========================
      // SUCCESS TOAST
      // =========================
      toast.success("Customer registered successfully!", {
        position: "top-right",
        autoClose: 2000,
      });

      // =========================
      // GO TO OTP PAGE
      // =========================
      setTimeout(() => {
        navigate("/verify-email", {
          state: {
            email: formData.email,
          },
        });
      }, 2200);

    } catch (error) {
      console.error("Registration error:", error);

      const status = error.response?.status;

      const serverMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "";

      const message = serverMessage.toString();

      // =========================
      // EMAIL ALREADY REGISTERED
      // =========================
      if (
        status === 400 &&
        (
          message.toLowerCase().includes("email") ||
          message.toLowerCase().includes("already") ||
          message.toLowerCase().includes("registered")
        )
      ) {
        toast.warning("Email already registered!", {
          position: "top-right",
          autoClose: 2000,
        });

        // Existing customer -> Login page
        setTimeout(() => {
          navigate("/login");
        }, 2200);

        return;
      }

      // =========================
      // OTHER ERROR
      // =========================
      toast.error(
        message ||
          "Registration failed. Please try again later.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );

      // Allow user to try again
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
          MAIN FORM
      ========================= */}
      <div className="container py-4 Customer_register-wrapper">

        <div className="row justify-content-center">

          <div className="col-lg-8">

            <div className="card Customer_register-card border-0 rounded-4">

              {/* =========================
                  HEADER
              ========================= */}
              <div className="card-header bg-dark text-white text-center py-3 rounded-top-4">

                <h2 className="mb-0">
                  Customer Registration
                </h2>

              </div>

              {/* =========================
                  CARD BODY
              ========================= */}
              <div className="card-body p-4">

                <form onSubmit={handleSubmit}>

                  {/* =========================
                      PERSONAL DETAILS
                  ========================= */}
                  <div className="row">

                    {/* FULL NAME */}
                    <div className="col-md-6 mb-3">

                      <label className="fw-semibold">
                        Full Name
                      </label>

                      <input
                        type="text"
                        name="fullName"
                        className="form-control"
                        placeholder="Enter Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />

                    </div>

                    {/* EMAIL */}
                    <div className="col-md-6 mb-3">

                      <label className="fw-semibold">
                        Email
                      </label>

                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="off"
                        required
                        disabled={loading}
                      />

                    </div>

                    {/* MOBILE */}
                    <div className="col-md-6 mb-3">

                      <label className="fw-semibold">
                        Mobile Number
                      </label>

                      <input
                        type="tel"
                        name="mobile"
                        className="form-control"
                        placeholder="Enter Mobile Number"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />

                    </div>

                    {/* DATE OF BIRTH */}
                    <div className="col-md-6 mb-3">

                      <label className="fw-semibold">
                        Date of Birth
                      </label>

                      <input
                        type="date"
                        name="dob"
                        className="form-control"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />

                    </div>

                    {/* PASSWORD */}
                    <div className="col-md-6 mb-3">

                      <label className="fw-semibold">
                        Password
                      </label>

                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="new-password"
                        required
                        disabled={loading}
                      />

                    </div>

                    {/* CONFIRM PASSWORD */}
                    <div className="col-md-6 mb-3">

                      <label className="fw-semibold">
                        Confirm Password
                      </label>

                      <input
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />

                    </div>

                  </div>

                  <hr />

                  {/* =========================
                      ADDRESS DETAILS
                  ========================= */}
                  <h4 className="mb-3 text-secondary">
                    Address Details
                  </h4>

                  <div className="row">

                    {/* HOUSE NUMBER */}
                    <div className="col-md-6 mb-3">

                      <label className="fw-semibold">
                        House No.
                      </label>

                      <input
                        type="text"
                        name="houseNo"
                        className="form-control"
                        placeholder="House No."
                        value={formData.houseNo}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />

                    </div>

                    {/* STREET */}
                    <div className="col-md-6 mb-3">

                      <label className="fw-semibold">
                        Street / Area
                      </label>

                      <input
                        type="text"
                        name="street"
                        className="form-control"
                        placeholder="Street / Area"
                        value={formData.street}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />

                    </div>

                    {/* CITY */}
                    <div className="col-md-6 mb-3">

                      <label className="fw-semibold">
                        City
                      </label>

                      <input
                        type="text"
                        name="city"
                        className="form-control"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />

                    </div>

                    {/* STATE */}
                    <div className="col-md-6 mb-3">

                      <label className="fw-semibold">
                        State
                      </label>

                      <input
                        type="text"
                        name="state"
                        className="form-control"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />

                    </div>

                    {/* PIN CODE */}
                    <div className="col-md-6 mb-3">

                      <label className="fw-semibold">
                        PIN Code
                      </label>

                      <input
                        type="text"
                        name="pincode"
                        className="form-control"
                        placeholder="PIN Code"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />

                    </div>

                    {/* COUNTRY */}
                    <div className="col-md-6 mb-3">

                      <label className="fw-semibold">
                        Country
                      </label>

                      <input
                        type="text"
                        name="country"
                        className="form-control"
                        value={formData.country}
                        readOnly
                      />

                    </div>

                  </div>

                  {/* =========================
                      TERMS & CONDITIONS
                  ========================= */}
                  <div className="form-check mt-3">

                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />

                    <label className="form-check-label">
                      I agree to the Terms & Conditions
                    </label>

                  </div>

                  {/* =========================
                      REGISTER BUTTON
                  ========================= */}
                  <button
                    type="submit"
                    className="btn btn-warning w-100 mt-4 fw-bold py-2"
                    disabled={loading}
                  >

                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>

                        Registering...
                      </>
                    ) : (
                      "Register"
                    )}

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

