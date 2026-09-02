



//claude office 




import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SellerHeader.css";
import logo from "../../assets/logooo.png";

function SellerHeader() {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  // ✅ FIX: seller ka token "sellerToken" key mein save hota hai, "token" nahi
  // (SellerLogin.jsx mein localStorage.setItem("sellerToken", data.token) hota hai)
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("sellerToken");

        if (!token) return;

        const response = await fetch("https://ecommerce-website-ggui.onrender.com/api/seller/notifications", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });

        const data = await response.json();
        

        if (response.ok) {
          const list = Array.isArray(data) ? data : data.notifications || [];
          const unreadCount = list.filter((n) => !n.isRead && !n.read).length;
          setNotificationCount(unreadCount);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();

    // Kisi bhi seller page se notification mark-as-read hone par yahan bhi refresh ho
    window.addEventListener("sellerNotificationsUpdated", fetchNotifications);
    return () => window.removeEventListener("sellerNotificationsUpdated", fetchNotifications);
  }, []);

  // ✅ FIX: sellerToken aur sellerUser (jo bhi seller-side keys hain) clear honi chahiye,
  // "seller" wali key ka koi matlab nahi tha kyunki SellerLogin.jsx usko set hi nahi karta
  const handleLogout = () => {
    localStorage.removeItem("sellerToken");
    alert("Logout Successful!");
    navigate("/seller/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm fixed-top px-4 py-3 Seller_seller-navbar">

      <div className="navbar-brand d-flex align-items-center">
        <div>
          <h5 className="mb-0 fw-bold Seller_text-brown">
            Kavi Shawls
          </h5>
        </div>
      </div>

      <div className="ms-auto d-flex align-items-center gap-3">

        <button
          className="btn btn-light d-flex align-items-center gap-1"
          onClick={() => navigate("/seller-dashboard")}
          title="Dashboard"
        >
          🏠 <span className="d-none d-md-inline">Home</span>
        </button>

        <button
          className="btn btn-light position-relative"
          onClick={() => navigate("/notification")}
        >
          🔔
          {notificationCount > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {notificationCount}
            </span>
          )}
        </button>

        <div className="position-relative">
          <button
            className="btn btn-light"
            onClick={() => setShowProfile(!showProfile)}
          >
            👤 Seller ▼
          </button>

          {showProfile && (
            <div className="dropdown-menu show position-absolute end-0 mt-2 p-2">
              <div className="px-3 py-2">
                <strong>👤 Seller</strong>
                <br />
                <small className="text-muted">
                  Kavi Shawls
                </small>
              </div>

              <hr className="my-1" />

              <button
                className="dropdown-item"
                onClick={() => navigate("/seller-details")}
              >
                👤 Seller Details
              </button>

              <button
                className="dropdown-item"
                onClick={() => navigate("/settings")}
              >
                ⚙️ Settings
              </button>

              <button
                type="button"
                className="dropdown-item text-danger"
                onClick={handleLogout}
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>

      </div>

    </nav>
  );
}

export default SellerHeader;