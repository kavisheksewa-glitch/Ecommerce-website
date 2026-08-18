import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Notification.css";
import logo from "../../assets/logooo.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Notification() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Seller/User ID from localStorage
  const sellerId = localStorage.getItem("userId") || localStorage.getItem("sellerId");

  // Fetch notifications from backend (`sellersnotification` or equivalent endpoint)
  useEffect(() => {
    if (!sellerId || sellerId === "guest_user_id") {
      toast.warning("Please login as a seller to view notifications.");
      navigate("/login");
      return;
    }

    const fetchNotifications = async () => {
      try {
        setLoading(true);
        // Aapke backend route ke mutabiq endpoint call kiya gaya hai
        const response = await axios.get(`http://localhost:5000/api/seller/notifications/${sellerId}`);
        if (Array.isArray(response.data)) {
          setNotifications(response.data);
        } else if (response.data.notifications) {
          setNotifications(response.data.notifications);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
        toast.error("Failed to load notifications from server.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [sellerId, navigate]);

  return (
    <div className="container py-5">
      <ToastContainer />
      <h2 className="text-center fw-bold mb-4 Seller_dashboard-title mt-5">
        <img
          src={logo}
          alt="Kavi Shawls Logo"
          className="Seller_dashboard-logo"
        />
        🔔 Notifications
      </h2>

      <div className="card shadow border-0 Seller_card">
        <div className="card-body">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : notifications.length > 0 ? (
            notifications.map((item) => (
              <div
                key={item._id || item.id}
                className={`alert alert-${item.type || "info"} mb-3 shadow-sm`}
              >
                <h5 className="alert-heading fw-bold">{item.title}</h5>
                <p className="mb-1">{item.message}</p>
                <small className="text-muted">
                  {item.createdAt ? new Date(item.createdAt).toLocaleString() : item.time}
                </small>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-muted">
              <p className="mb-0">No new notifications found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notification;