

//claude office night



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SellerDetails.css";

// Tiny helper: JWT ka payload decode karta hai (bina kisi library ke)
function decodeToken(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch (err) {
    return null;
  }
}

function SellerDetails() {
  const navigate = useNavigate();
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSellerDetails();
  }, []);

  const fetchSellerDetails = async () => {
    const sellerToken = localStorage.getItem("sellerToken");

    if (!sellerToken) {
      setLoading(false);
      navigate("/seller/login");
      return;
    }

    const decoded = decodeToken(sellerToken);
    const sellerId = decoded?.id;

    if (!sellerId) {
      setLoading(false);
      return;
    }

    try {
      // ✅ FIX: Authorization header add kiya, kyunki route par "protect" middleware lagi hai
      const res = await axios.get(
        `https://kavi-shawls.vercel.app/api/seller/auth/${sellerId}`,
        {
          headers: {
            Authorization: `Bearer ${sellerToken}`,
          },
        }
      );
      setSeller(res.data);
    } catch (error) {
      console.log("Failed to fetch seller details", error);
      // ✅ Agar token invalid/expired hai to login page pe bhej do
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("sellerToken");
        navigate("/seller/login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 mt-5">
      <div className="card shadow border-0 mx-auto" style={{ maxWidth: "750px" }}>
        <div
          className="card-header text-white text-center py-3"
          style={{
            background: "linear-gradient(90deg, #8b5a2b, #d4a373)",
          }}
        >
          <h3 className="mb-0">Seller Details</h3>
        </div>

        <div className="card-body p-4">
          {loading ? (
            <p className="text-center py-3">Loading seller details...</p>
          ) : seller ? (
            <div className="row g-4">
              {seller.profileImage && (
                <div className="col-12 text-center">
                  <label className="fw-bold d-block mb-2">
                    Profile Image
                  </label>
                  <img
                    src={`https://kavi-shawls.vercel.app/${seller.profileImage}`}
                    alt="Seller Profile"
                    className="rounded-circle object-fit-cover shadow-sm ingg"
                  />
                </div>
              )}

              <div className="col-md-6">
                <label className="fw-bold">Name</label>
                <div className="form-control bg-light">{seller.name}</div>
              </div>

              <div className="col-md-6">
                <label className="fw-bold">Email</label>
                <div className="form-control bg-light">{seller.email}</div>
              </div>

              <div className="col-md-6">
                <label className="fw-bold">Phone</label>
                <div className="form-control bg-light">{seller.phone}</div>
              </div>

              <div className="col-md-6">
                <label className="fw-bold">Shop Name</label>
                <div className="form-control bg-light">{seller.shopName}</div>
              </div>

              <div className="col-12">
                <label className="fw-bold">Address</label>
                <div className="form-control bg-light">{seller.address}</div>
              </div>

              <div className="col-md-4">
                <label className="fw-bold">City</label>
                <div className="form-control bg-light">{seller.city}</div>
              </div>

              <div className="col-md-4">
                <label className="fw-bold">State</label>
                <div className="form-control bg-light">{seller.state}</div>
              </div>

              <div className="col-md-4">
                <label className="fw-bold">Pincode</label>
                <div className="form-control bg-light">{seller.pincode}</div>
              </div>
            </div>
          ) : (
            <div className="alert alert-warning text-center">
              Seller details not found. Please login again.
            </div>
          )}

          <div className="text-center mt-4">
            <button
              className="btn btn-secondary px-4"
              onClick={() => navigate("/seller-dashboard")}
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerDetails;