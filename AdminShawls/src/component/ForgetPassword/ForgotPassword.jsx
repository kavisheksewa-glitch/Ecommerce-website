
import React, { useState } from "react";
import { BASE_URL } from "../../utils/api";

const API_BASE = `${BASE_URL}/api/customer`;

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ---------- Direct Password Reset Request ----------
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

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

      setMessage("Password reset instructions have been sent to your email!");
      setIsSubmitted(true);
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
        {message && <div className="alert alert-success py-2">{message}</div>}

        {!isSubmitted ? (
          <>
            <p className="text-center text-muted">Enter your registered email address.</p>
            <form onSubmit={handleForgotPassword}>
              <input
                type="email"
                className="form-control mb-3"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="btn btn-dark w-100" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <button 
              onClick={() => { setIsSubmitted(false); setEmail(""); setMessage(""); }}
              className="btn btn-outline-secondary w-100 mb-3">
              Resend Email
            </button>
          </div>
        )}

        <div className="text-center mt-3">
          <a href="/login" className="text-decoration-none text-dark">
            ← Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;