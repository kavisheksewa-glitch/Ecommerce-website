
//2 sept 2026 morning




import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TrackOrder() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [cancelling, setCancelling] = useState(false);

  // ✅ Previous Orders states
  const [previousOrders, setPreviousOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [showPreviousOrders, setShowPreviousOrders] = useState(false);

  useEffect(() => {
    if (state?.orderId) {
      setOrderId(state.orderId);
      fetchOrderStatus(state.orderId);
    }
  }, [state]);

  const fetchOrderStatus = async (id) => {
    try {
      setErrorMsg("");
      const response = await fetch(`https://ecommerce-website-ggui.onrender.com/api/shawls/orders/${id}`);
      const data = await response.json();
      
      if (response.ok) {
        setOrderDetails(data);
      } else {
        setErrorMsg(data.message || "Order not found");
        setOrderDetails(null);
      }
    } catch (err) {
      console.error("Error fetching order:", err);
      setErrorMsg("Server error while fetching tracking details.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!orderId.trim()) {
      alert("Please enter your Order ID");
      return;
    }
    fetchOrderStatus(orderId);
  };


  const handleCancelOrder = async () => {
  if (!orderDetails?._id && !orderId) return;

  const token = localStorage.getItem("token");
  if (!token) {
    toast.warning("🔒 Please login first to cancel your order!", { autoClose: 2000 });
    setTimeout(() => navigate("/login"), 1000);
    return;
  }

  const idToCancel = orderDetails?._id || orderId;

  if (!window.confirm("Kya aap sach mein yeh order cancel karna chahte hain?")) return;

  try {
    setCancelling(true);

    const response = await fetch(
      `https://ecommerce-website-ggui.onrender.com/api/customer/order/cancel/${idToCancel}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      toast.success("Order cancelled successfully!", { autoClose: 2000 });
      setOrderDetails((prev) => ({ ...prev, orderStatus: "Cancelled" }));
    } else {
      toast.error(data.message || "Failed to cancel order");
    }
  } catch (err) {
    console.error("Error cancelling order:", err);
    toast.error("Server error while cancelling order.");
  } finally {
    setCancelling(false);
  }
};

  // ✅ PREVIOUS ORDERS — customer ke saare orders login token se fetch karo
  const fetchPreviousOrders = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.warning("🔒 Please login first to view your previous orders!", {
        autoClose: 2000,
      });
      setTimeout(() => navigate("/login"), 1000);
      return;
    }

    try {
      setLoadingOrders(true);
      const response = await fetch("https://ecommerce-website-ggui.onrender.com/api/customer/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (response.ok) {
        const orders = Array.isArray(data) ? data : data.orders || [];
        setPreviousOrders(orders);
      } else {
        toast.error(data.message || "Failed to fetch previous orders");
      }
    } catch (err) {
      console.error("Error fetching previous orders:", err);
      toast.error("Server error while fetching previous orders.");
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleTogglePreviousOrders = () => {
    const next = !showPreviousOrders;
    setShowPreviousOrders(next);
    if (next && previousOrders.length === 0) {
      fetchPreviousOrders();
    }
  };

  const handleSelectPreviousOrder = (id) => {
    setOrderId(id);
    fetchOrderStatus(id);
    setShowPreviousOrders(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Order cancel karne layak hai ya nahi (Delivered/Cancelled ho chuka to nahi)
  const isCancellable =
    orderDetails &&
    !["Delivered", "Cancelled"].includes(orderDetails.orderStatus);

  return (
    <div className="container py-5">
      <ToastContainer />
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "600px" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Track Your Order</h2>
          <button
            className="btn btn-outline-dark btn-sm"
            onClick={handleTogglePreviousOrders}
          >
            {showPreviousOrders ? "Hide" : "📜 My Previous Orders"}
          </button>
        </div>

        {/* ✅ PREVIOUS ORDERS LIST */}
        {showPreviousOrders && (
          <div className="mb-4 p-3 border rounded bg-light">
            <h6 className="fw-bold mb-3">Your Previous Orders</h6>

            {loadingOrders ? (
              <p className="text-muted small mb-0">Loading your orders...</p>
            ) : previousOrders.length === 0 ? (
              <p className="text-muted small mb-0">No previous orders found.</p>
            ) : (
              <div className="d-flex flex-column gap-2">
                {previousOrders.map((order) => (
                  <div
                    key={order._id}
                    className="d-flex justify-content-between align-items-center p-2 bg-white border rounded"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSelectPreviousOrder(order._id)}
                  >
                    <div>
                      <div className="fw-semibold small">{order.productTitle || "Product"}</div>
                      <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                        Order ID: {order._id}
                      </div>
                    </div>
                    <span
                      className={`badge ${
                        order.orderStatus === "Delivered"
                          ? "bg-success"
                          : order.orderStatus === "Cancelled"
                          ? "bg-danger"
                          : "bg-primary"
                      }`}
                    >
                      {order.orderStatus || "Pending"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {state?.orderId && (
          <div className="alert alert-success text-center" role="alert">
            <strong>Order Placed Successfully!</strong>
            <p className="mb-0 small">Aapki Order ID yahan niche di gayi hai:</p>
            <span className="badge bg-dark mt-2 p-2 fs-6">{state.orderId}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Order ID (Database ID)</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your Order ID"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
          </div>

          <button className="btn btn-dark w-100">
            Track Order
          </button>
        </form>

        {errorMsg && <div className="alert alert-danger mt-3 text-center">{errorMsg}</div>}

        {/* Agar order details mil gayi hain toh display karein */}
        {orderDetails && (
          <div className="mt-4 p-3 border rounded bg-light">
            <h5 className="text-success fw-bold">📦 Order Status Details</h5>
            <p className="mb-1"><strong>Product:</strong> {orderDetails.productTitle}</p>
            <p className="mb-1"><strong>Status:</strong> <span className="badge bg-primary">{orderDetails.orderStatus || "Pending"}</span></p>
            
            {/* Yahan Seller ki bheji hui Tracking ID show hogi */}
            <p className="mb-1">
              <strong>Tracking ID / Courier ID:</strong>{" "}
              {orderDetails.trackingId ? (
                <span className="badge bg-success">{orderDetails.trackingId}</span>
              ) : (
                <span className="text-muted">Not assigned yet by seller</span>
              )}
            </p>
            
            <p className="mb-1"><strong>Delivery Address:</strong> {orderDetails.address}</p>
            <p className="mb-0"><strong>Phone:</strong> {orderDetails.phone}</p>

            {/* ✅ CANCEL ORDER BUTTON */}
            {isCancellable && (
              <button
                className="btn btn-outline-danger w-100 mt-3 fw-semibold"
                onClick={handleCancelOrder}
                disabled={cancelling}
              >
                {cancelling ? "Cancelling..." : "❌ Cancel Order"}
              </button>
            )}

            {orderDetails.orderStatus === "Cancelled" && (
              <div className="alert alert-danger mt-3 mb-0 text-center py-2">
                This order has been cancelled.
              </div>
            )}
          </div>
        )}

        <hr className="my-4" />

        <h5>Delivery Status Flow</h5>
        <ul>
          <li>✔ Order Confirmed</li>
          <li>📦 Packed</li>
          <li>🚚 Shipped {orderDetails?.trackingId ? `(Tracking ID: ${orderDetails.trackingId})` : ""}</li>
          <li>🏠 Out for Delivery</li>
          <li>✅ Delivered</li>
        </ul>
      </div>
    </div>
  );
}

export default TrackOrder;