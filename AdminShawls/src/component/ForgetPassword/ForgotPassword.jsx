

//claude forget password



import React, { useState } from "react";

// Apne backend base URL ke hisaab se badal lena (agar proxy setup hai to sirf "/api" bhi chalega)
const API_BASE = "https://ecommerce-website-ggui.onrender.com/api/customer";

function ForgetPassword() {
  const [step, setStep] = useState(1); // 1 = email, 2 = otp, 3 = new password, 4 = done

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [userId, setUserId] = useState(""); // step 1 ke response se milega

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // ---------- STEP 1: Email submit -> OTP request ----------
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Something went wrong");
        return;
      }

      setUserId(data.userId);
      setMessage("OTP sent to your email!");
      setStep(2);
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ---------- STEP 2: OTP verify ----------
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, otp }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Invalid OTP");
        return;
      }

      setMessage("OTP verified! Set your new password.");
      setStep(3);
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ---------- STEP 3: New password set ----------
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (!newPassword || newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, newPassword }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Something went wrong");
        return;
      }

      setMessage("Password reset successful! You can now log in.");
      setStep(4);
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "450px" }}>
        <h2 className="text-center mb-3">Forgot Password</h2>

        {error && <div className="alert alert-danger py-2">{error}</div>}
        {message && step !== 4 && <div className="alert alert-success py-2">{message}</div>}

        {/* STEP 1: Email */}
        {step === 1 && (
          <>
            <p className="text-center text-muted">Enter your registered email address.</p>
            <form onSubmit={handleSendOtp}>
              <input
                type="email"
                className="form-control mb-3"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="btn btn-dark w-100" disabled={loading}>
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </form>
          </>
        )}

        {/* STEP 2: OTP */}
        {step === 2 && (
          <>
            <p className="text-center text-muted">
              Enter the 6-digit OTP sent to <b>{email}</b>
            </p>
            <form onSubmit={handleVerifyOtp}>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter OTP"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button className="btn btn-dark w-100" disabled={loading}>
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          </>
        )}

        {/* STEP 3: New Password */}
        {step === 3 && (
          <>
            <p className="text-center text-muted">Set your new password.</p>
            <form onSubmit={handleResetPassword}>
              <input
                type="password"
                className="form-control mb-3"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                className="form-control mb-3"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button className="btn btn-dark w-100" disabled={loading}>
                {loading ? "Saving..." : "Reset Password"}
              </button>
            </form>
          </>
        )}

        {/* STEP 4: Done */}
        {step === 4 && (
          <div className="text-center">
            <p className="text-success">✅ {message}</p>
            <a href="/login" className="btn btn-dark w-100">
              Go to Login
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgetPassword;