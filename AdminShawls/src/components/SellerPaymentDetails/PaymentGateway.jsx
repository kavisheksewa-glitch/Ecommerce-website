

//claude office




import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentGateway.css";
import logo from "../../assets/logooo.png";
import SellerHeader from "../SellerHeader/SellerHeader";

function PaymentGateway() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Naya secure route — server-side JWT se seller ki id nikal ke
  // sirf uske orders/payments return karta hai
  useEffect(() => {
    const fetchOrders = async () => {
      const sellerToken = localStorage.getItem("sellerToken");

      if (!sellerToken) {
        navigate("/seller/login");
        return;
      }

      try {
        const response = await fetch("https://ecommerce-website-ggui.onrender.com/api/shawls/orders/seller/my-orders", {
          headers: { Authorization: `Bearer ${sellerToken}` },
        });
        const data = await response.json();

        if (response.ok && data.success && Array.isArray(data.orders)) {
          setPayments(data.orders);
        } else {
          console.error("Failed to fetch payments");
        }
      } catch (err) {
        console.error("Error connecting to backend:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  const totalRevenue = payments
    .filter(item => item.paymentStatus === "Paid")
    .reduce((acc, curr) => acc + (Number(curr.totalAmount) || 0), 0);

  const pendingPayment = payments
    .filter(item => item.paymentStatus === "Pending")
    .reduce((acc, curr) => acc + (Number(curr.totalAmount) || 0), 0);

  return (
    <div className="container py-5 mt-5">
      <SellerHeader />

      <div className="text-center mb-5 d-flex flex-column align-items-center Seller_dashboard-title">
        <img src={logo} alt="Logo" className="mb-2 Seller_dashboard-logo" style={{ width: "100px" }} />
        <h2 className="fw-bold">Payment Details</h2>
      </div>

      <div className="row g-3 mb-5">
        <div className="col-6 col-md-3">
          <div className="card shadow-sm border-0 p-3 h-100 text-center Seller_card">
            <p className="text-muted small mb-1">Total Revenue (Paid)</p>
            <h4 className="fw-bold text-success">₹{totalRevenue.toLocaleString()}</h4>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card shadow-sm border-0 p-3 h-100 text-center Seller_card">
            <p className="text-muted small mb-1">Pending Payment</p>
            <h4 className="fw-bold text-warning">₹{pendingPayment.toLocaleString()}</h4>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card shadow-sm border-0 p-3 h-100 text-center Seller_card">
            <p className="text-muted small mb-1">Total Orders</p>
            <h4 className="fw-bold text-primary">{payments.length}</h4>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card shadow-sm border-0 p-3 h-100 text-center Seller_card">
            <p className="text-muted small mb-1">Refund</p>
            <h4 className="fw-bold text-danger">₹0</h4>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <h5 className="text-muted">Loading payments...</h5>
        </div>
      ) : payments.length === 0 ? (
        <div className="text-center py-5">
          <h5 className="text-muted">Abhi tak koi order ya payment nahi aayi hai.</h5>
        </div>
      ) : (
        <div className="row g-4">
          {payments.map((payment) => (
            <div key={payment._id} className="col-12 col-md-6 col-lg-4">
              <div className="card shadow-sm border-0 p-3 h-100 Seller_card">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="fw-bold m-0">Order ID: {payment._id ? payment._id.slice(-6) : ""}</h6>
                  <span className={`badge ${payment.paymentStatus === "Paid" ? "bg-success" : "bg-warning text-dark"}`}>
                    {payment.paymentStatus || "Pending"}
                  </span>
                </div>
                <p className="mb-1"><strong>Customer:</strong> {payment.fullName}</p>
                <p className="mb-1"><strong>Product:</strong> {payment.productTitle}</p>
                <p className="mb-1"><strong>Amount:</strong> <span className="text-primary fw-bold">₹{payment.totalAmount?.toLocaleString()}</span></p>
                <p className="mb-1"><strong>Method:</strong> {payment.paymentMethod}</p>
                <p className="text-muted small mt-2 mb-0">
                  Date: {payment.createdAt ? new Date(payment.createdAt).toLocaleDateString() : "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PaymentGateway;