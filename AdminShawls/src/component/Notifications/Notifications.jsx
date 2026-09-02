




//kavishclaude


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Backend ab userId URL me nahi leta — token se hi customer identify hota hai
  const token = localStorage.getItem("token");

  // 1. Fetch Notifications from Backend Database
  const fetchNotifications = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://ecommerce-website-ggui.onrender.com/api/customer/notifications", {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ pehle yeh missing tha
        },
      });
      const data = await response.json();

      if (response.ok && Array.isArray(data.notifications)) {
        setNotifications(data.notifications);
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [token]);

  // 2. Mark Single Notification as Read
  const handleMarkAsRead = async (id) => {
    try {
      const response = await fetch(
        `https://ecommerce-website-ggui.onrender.com/api/customer/notifications/read/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`, // ✅ pehle yeh missing tha
          },
        }
      );
      if (response.ok) {
        setNotifications(
          notifications.map((n) => (n._id === id ? { ...n, read: true } : n))
        );
      }
    } catch (err) {
      console.error("Error marking as read:", err);
    }
  };

  // 3. Clear All Notifications
  const handleClearAll = async () => {
    if (!token) return;
    try {
      const response = await fetch("https://ecommerce-website-ggui.onrender.com/api/customer/notifications/clear", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ pehle yeh missing tha
        },
      });
      if (response.ok) {
        setNotifications([]);
      }
    } catch (err) {
      console.error("Error clearing notifications:", err);
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Link to="/customer" className="btn btn-outline-secondary btn-sm mb-2">
            ← Continue Shopping
          </Link>
          <h2>🔔 Your Notifications</h2>
        </div>
        {notifications.length > 0 && (
          <button className="btn btn-outline-danger btn-sm" onClick={handleClearAll}>
            Clear All
          </button>
        )}
      </div>

      <div className="card shadow-sm p-4">
        {loading ? (
          <p className="text-center py-4">Loading notifications...</p>
        ) : !token ? (
          <p className="text-center py-4 text-muted">Please login first to view your notifications.</p>
        ) : notifications.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted">You have no new notifications right now.</p>
          </div>
        ) : (
          <div className="list-group">
            {notifications.map((n) => (
              <div
                key={n._id}
                className={`list-group-item list-group-item-action d-flex justify-content-between align-items-start mb-2 rounded ${
                  n.read ? "bg-light" : "bg-white border-start border-primary border-4"
                }`}
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{n.title}</div>
                  <p className="mb-1">{n.message}</p>
                  <small className="text-muted">
                    {n.createdAt ? new Date(n.createdAt).toLocaleString() : "Just now"}
                  </small>
                </div>
                {!n.read && (
                  <button
                    className="btn btn-sm btn-outline-primary ms-3 mt-1"
                    onClick={() => handleMarkAsRead(n._id)}
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;