import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SellerForgetPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your registered email address.');
      return;
    }

    setLoading(true);
    try {
      // Yahan aap apna API call integrate karenge (e.g., axios.post)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-sm p-4 border-0" style={{ maxWidth: '450px', width: '100%', borderRadius: '12px' }}>
        <div className="card-body">
          <div className="text-center mb-4">
            <h3 className="fw-bold" style={{ color: '#064e3b' }}>Forgot Password</h3>
            <p className="text-muted small">Enter your seller account email to reset your password.</p>
          </div>

          {error && <div className="alert alert-danger py-2 small">{error}</div>}

          {submitted ? (
            <div className="text-center">
              <div className="alert alert-success py-3 mb-3" style={{ backgroundColor: '#f3e5ab', color: '#064e3b', border: 'none' }}>
                Reset instructions have been sent to your email.
              </div>
              <Link 
                to="/seller-login" 
                className="btn btn-sm w-100 fw-bold py-2 text-decoration-none" 
                style={{ backgroundColor: '#064e3b', color: '#fff', borderRadius: '6px' }}
              >
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-bold" style={{ color: '#064e3b' }}>Email Address</label>
                <input
                  type="email"
                  className="form-control shadow-sm"
                  placeholder="seller@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ borderRadius: '6px' }}
                />
              </div>

              <button
                type="submit"
                className="btn w-100 fw-bold shadow-sm py-2"
                style={{ backgroundColor: '#f3e5ab', color: '#064e3b', borderRadius: '6px' }}
                disabled={loading}
              >
                {loading ? 'Sending Link...' : 'Send Reset Link'}
              </button>

              <div className="text-center mt-3">
                <Link to="/seller/login" className="text-decoration-none small" style={{ color: '#064e3b' }}>
                  Remember your password? Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}