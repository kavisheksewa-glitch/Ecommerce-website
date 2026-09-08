import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBoxOpen, FaTruck, FaClock, FaCheckCircle, FaTimesCircle, FaEye } from "react-icons/fa";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("https://ecommerce-website-ggui.onrender.com/api/customer/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        
        // Handling both array response or { success: true, orders: [...] } structure
        const orderList = Array.isArray(data) ? data : data.orders || [];
        setOrders(orderList);
      } catch (err) {
        console.error("Error fetching order history:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return <span className="badge bg-success d-inline-flex align-items-center gap-1"><FaCheckCircle /> Delivered</span>;
      case "cancelled":
        return <span className="badge bg-danger d-inline-flex align-items-center gap-1"><FaTimesCircle /> Cancelled</span>;
      case "shipped":
        return <span className="badge bg-info text-dark d-inline-flex align-items-center gap-1"><FaTruck /> Shipped</span>;
      default:
        return <span className="badge bg-warning text-dark d-inline-flex align-items-center gap-1"><FaClock /> Processing</span>;
    }
  };

  const handleTrackOrder = (orderId) => {
    navigate("/track-order", { state: { orderId } });
  };

  return (
    <div className="container py-5">
      <h3 className="fw-bold mb-4 d-flex align-items-center gap-2">
        <FaBoxOpen /> Order History
      </h3>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-dark" role="status"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="card border-0 shadow-sm text-center py-5">
          <div className="card-body">
            <h5>No orders placed yet!</h5>
            <p className="text-muted">Explore our collection and make your first order.</p>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {orders.map((order) => {
            // Support both orderStatus and status fields from backend
            const currentStatus = order.orderStatus || order.status;

            return (
              <div key={order._id || order.id} className="card border-0 shadow-sm">
                <div className="card-header bg-light d-flex justify-content-between align-items-center flex-wrap py-3">
                  <div>
                    <span className="fw-semibold me-3">Order ID: #{order._id?.slice(-8)}</span>
                    <span className="text-muted small">
                      Date: {new Date(order.createdAt || Date.now()).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    {getStatusBadge(currentStatus)}
                    <button 
                      className="btn btn-sm btn-outline-dark d-inline-flex align-items-center gap-1"
                      onClick={() => handleTrackOrder(order._id)}
                    >
                      <FaEye /> Track
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row g-3 align-items-center">
                    <div className="col-md-8">
                      {order.items && order.items.length > 0 ? (
                        order.items.map((item, idx) => (
                          <div key={idx} className="d-flex align-items-center gap-3 mb-2">
                            <img
                              src={item.image || "https://via.placeholder.com/60"}
                              alt={item.title || item.productTitle}
                              style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px" }}
                            />
                            <div>
                              <h6 className="mb-0 fw-semibold">{item.title || item.productTitle}</h6>
                              <small className="text-muted">Qty: {item.quantity} | ₹{item.price}</small>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div>
                          <h6 className="mb-0 fw-semibold">{order.productTitle || "Product Item"}</h6>
                          <small className="text-muted">Order ID: {order._id}</small>
                        </div>
                      )}
                    </div>
                    <div className="col-md-4 text-md-end border-start-md">
                      <p className="mb-1 text-muted small">Total Amount</p>
                      <h5 className="fw-bold text-dark">₹{order.totalAmount || order.price}</h5>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default OrderHistory; // Export default OrderHistory