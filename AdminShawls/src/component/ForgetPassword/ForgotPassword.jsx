import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/api";

import {
  ToastContainer,
  toast,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const API_BASE = `${BASE_URL}/api/customer`;

function ForgetPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);

  // 1 = Email
  // 2 = OTP + New Password
  const [step, setStep] = useState(1);

  // =========================
  // SEND OTP
  // =========================
  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (loading) return;

    const cleanEmail = email.trim();

    if (!cleanEmail) {
      toast.warning("Please enter your email.", {
        position: "top-right",
      });
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      toast.error(
        "Please enter a valid email address.",
        {
          position: "top-right",
        }
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE}/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: cleanEmail,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        toast.error(
          data.message ||
            "Unable to send OTP.",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );

        return;
      }

      toast.success(
        "Password reset OTP sent to your email!",
        {
          position: "top-right",
          autoClose: 2500,
        }
      );

      setStep(2);

    } catch (error) {
      console.error(
        "Forgot password error:",
        error
      );

      toast.error(
        "Unable to connect to server.",
        {
          position: "top-right",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // RESET PASSWORD
  // =========================
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!otp) {
      toast.warning("Please enter the OTP.", {
        position: "top-right",
      });
      return;
    }

    if (!newPassword) {
      toast.warning(
        "Please enter your new password.",
        {
          position: "top-right",
        }
      );
      return;
    }

    if (newPassword.length < 6) {
      toast.warning(
        "Password must be at least 6 characters.",
        {
          position: "top-right",
        }
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error(
        "Passwords do not match.",
        {
          position: "top-right",
        }
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE}/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
            newPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        toast.error(
          data.message ||
            "Unable to reset password.",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );

        return;
      }

      toast.success(
        "Password reset successfully!",
        {
          position: "top-right",
          autoClose: 2000,
        }
      );

      setTimeout(() => {
        navigate("/login");
      }, 2200);

    } catch (error) {
      console.error(
        "Reset password error:",
        error
      );

      toast.error(
        "Unable to connect to server.",
        {
          position: "top-right",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // RESEND OTP
  // =========================
  const handleResendOtp = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE}/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        toast.error(
          data.message ||
            "Unable to resend OTP.",
          {
            position: "top-right",
          }
        );

        return;
      }

      toast.success(
        "New OTP sent successfully!",
        {
          position: "top-right",
          autoClose: 2500,
        }
      );

    } catch (error) {
      console.error(
        "Resend OTP error:",
        error
      );

      toast.error(
        "Unable to resend OTP.",
        {
          position: "top-right",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">

      <ToastContainer
        position="top-right"
        autoClose={2500}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />

      <div
        className="card shadow p-4 mx-auto"
        style={{
          maxWidth: "450px",
          borderRadius: "15px",
        }}
      >

        <h2 className="text-center mb-3">
          Forgot Password
        </h2>

        {/* =========================
            STEP 1
        ========================= */}
        {step === 1 && (
          <>
            <p className="text-center text-muted">
              Enter your registered email address.
            </p>

            <form
              onSubmit={handleForgotPassword}
            >

              <input
                type="email"
                className="form-control mb-3"
                placeholder="Enter Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                autoComplete="email"
                disabled={loading}
                required
              />

              <button
                type="submit"
                className="btn btn-dark w-100"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>

                    Sending OTP...
                  </>
                ) : (
                  "Send Reset OTP"
                )}
              </button>

            </form>
          </>
        )}

        {/* =========================
            STEP 2
        ========================= */}
        {step === 2 && (
          <>
            <p className="text-center text-muted">
              OTP has been sent to:
            </p>

            <p className="text-center fw-bold">
              {email}
            </p>

            <form
              onSubmit={handleResetPassword}
            >

              {/* OTP */}
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value)
                }
                maxLength={6}
                inputMode="numeric"
                disabled={loading}
                required
              />

              {/* NEW PASSWORD */}
              <input
                type="password"
                className="form-control mb-3"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                autoComplete="new-password"
                disabled={loading}
                required
              />

              {/* CONFIRM PASSWORD */}
              <input
                type="password"
                className="form-control mb-3"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                autoComplete="new-password"
                disabled={loading}
                required
              />

              <button
                type="submit"
                className="btn btn-dark w-100 mb-3"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>

                    Resetting Password...
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>

            </form>

            {/* RESEND */}
            <button
              type="button"
              className="btn btn-outline-secondary w-100"
              onClick={handleResendOtp}
              disabled={loading}
            >
              Resend OTP
            </button>

          </>
        )}

        {/* =========================
            LOGIN
        ========================= */}
        <div className="text-center mt-3">

          <Link
            to="/login"
            className="text-decoration-none text-dark"
          >
            ← Back to Login
          </Link>

        </div>

      </div>
    </div>
  );
}

export default ForgetPassword;