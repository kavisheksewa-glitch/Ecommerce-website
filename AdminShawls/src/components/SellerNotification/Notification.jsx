

//claude office 




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

  // ✅ FIX: seller ka token "sellerToken" key mein save hota hai, "token" nahi
  // (SellerLogin.jsx mein localStorage.setItem("sellerToken", data.token) hota hai)
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("sellerToken");

      if (!token) {
        toast.error("Please login to view notifications.");
        navigate("/seller/login");
        return;
      }

      const response = await axios.get("https://ecommerce-website-ggui.onrender.com/api/seller/notifications", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (Array.isArray(response.data)) {
        setNotifications(response.data);
      } else if (response.data.notifications) {
        setNotifications(response.data.notifications);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      toast.error("Please login to view notifications.");
      navigate("/seller/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [navigate]);

  // "I Read" button click handler
  const handleMarkAsRead = async (id) => {
    try {
      const token = localStorage.getItem("sellerToken");

      await axios.put(`https://ecommerce-website-ggui.onrender.com/api/seller/notifications/${id}/read`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setNotifications((prevNotifications) =>
        prevNotifications.filter((item) => (item._id || item.id) !== id)
      );

      toast.success("Notification marked as read");
    } catch (error) {
      console.error("Error marking notification as read:", error);
      toast.error("Failed to update notification status.");
    }
  };

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
            notifications.map((item) => {
              const notifId = item._id || item.id;
              return (
                // <div
                //   key={notifId}
                //   className={`alert alert-${item.type || "info"} mb-3 shadow-sm d-flex justify-content-between align-items-center`}
                // >
                <div
                  key={notifId}
                  className={`alert alert-${item.type || "info"} mb-3 shadow-sm d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 Seller_notif-item`}
                >
                  <div>
                    <h5 className="alert-heading fw-bold">{item.title}</h5>
                    <p className="mb-1">{item.message}</p>
                    <small className="text-muted">
                      {item.createdAt ? new Date(item.createdAt).toLocaleString() : item.time}
                    </small>
                  </div>
                  <div>
                    <button
                      className="btn btn-sm btn-outline-dark fw-bold px-3 py-1 ms-2"
                      onClick={() => handleMarkAsRead(notifId)}
                    >
                      I Read
                    </button>
                  </div>
                </div>
              );
            })
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