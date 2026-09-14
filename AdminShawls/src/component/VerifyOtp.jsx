import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import API from "../utils/api";

const OTP_SECONDS = 180;

function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(OTP_SECONDS);
  const [expired, setExpired] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!email) {
      navigate("/signup");
      return;
    }
    startTimer();
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startTimer = () => {
    clearInterval(timerRef.current);
    setExpired(false);
    setTimeLeft(OTP_SECONDS);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (expired) {
      setError("OTP expired. Please resend OTP.");
      return;
    }
    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    try {
      const response = await API.post("/api/customer/verify-otp", { email, otp });
      const data = response.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("customerRole", "customer");

      setMessage("Email verified successfully!");
      navigate("/customer");
    } catch (err) {
      setError(err.response?.data?.message || "Enter correct OTP");
    }
  };

  const handleResend = async () => {
    setError("");
    setMessage("");
    try {
      await API.post("/api/customer/resend-otp", { email });
      setMessage("A new OTP has been sent to your email.");
      setOtp("");
      startTimer();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="Customer_login-container">
      <div className="Customer_login-card">
        <h2 className="Customer_login-title">Verify Your Email</h2>
        <p className="Customer_login-subtitle">
          We've sent a 6-digit OTP to <b>{email}</b>
        </p>

        {error && <div className="alert alert-danger py-2">{error}</div>}
        {message && <div className="alert alert-success py-2">{message}</div>}

        <form onSubmit={handleVerify}>
          <div className="mb-3">
            <label className="Customer_form-label">Enter OTP</label>
            <input
              type="text"
              maxLength={6}
              className="Customer_form-control"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              disabled={expired}
              required
            />
          </div>

          <p style={{ fontSize: "13px" }}>
            {expired ? (
              <span className="text-danger">OTP expired.</span>
            ) : (
              <span>OTP valid for {timeLeft}s</span>
            )}
          </p>

          <button type="submit" className="Customer_login-btn w-100" disabled={expired}>
            Verify
          </button>
        </form>

        <p className="Customer_signup-text">
          Didn't get the OTP?{" "}
          <button type="button" className="btn btn-link p-0" onClick={handleResend}>
            Resend OTP
          </button>
        </p>

        <p className="Customer_signup-text">
          <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}

export default VerifyOtp;