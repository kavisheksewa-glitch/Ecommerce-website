import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const API_BASE = "http://localhost:5000/api/customer";

function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();

  // CustomerRegister.jsx se navigate() ke through userId + email bheja gaya tha
  const { userId, email } = location.state || {};

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Agar koi seedha /verify-email URL type kar de bina register kiye, userId nahi milega
  if (!userId) {
    return (
      <div className="container py-5">
        <div className="card shadow p-4 mx-auto text-center" style={{ maxWidth: "450px" }}>
          <p className="text-danger">
            No registration info found. Please register first.
          </p>
          <button className="btn btn-dark w-100" onClick={() => navigate("/register")}>
            Go to Register
          </button>
        </div>
      </div>
    );
  }

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, otp }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Invalid OTP");
        return;
      }

      setMessage("Email verified successfully!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setMessage("");

    try {
      setResending(true);
      const res = await fetch(`${API_BASE}/resend-verification-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Could not resend OTP");
        return;
      }

      setMessage("A new OTP has been sent to your email.");
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "450px" }}>
        <h2 className="text-center mb-3">Verify Your Email</h2>
        <p className="text-center text-muted">
          Enter the 6-digit OTP sent to <b>{email}</b>
        </p>

        {error && <div className="alert alert-danger py-2">{error}</div>}
        {message && <div className="alert alert-success py-2">{message}</div>}

        <form onSubmit={handleVerify}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter OTP"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button className="btn btn-dark w-100" disabled={loading}>
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <button
          className="btn btn-link w-100 mt-2"
          onClick={handleResend}
          disabled={resending}
        >
          {resending ? "Resending..." : "Resend OTP"}
        </button>
      </div>
    </div>
  );
}

export default VerifyEmail;