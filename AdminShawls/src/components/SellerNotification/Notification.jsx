import React from "react";
import "./Notification.css";
import logo from "../../assets/logooo.png";
//import logo from "../assets/logooo.png";

function Notification() {
  const notifications = [
    {
      id: 1,
      title: "🛒 New Order Received",
      message: "Rahul Sharma ordered a Luxury Pashmina Shawl.",
      time: "5 mins ago",
      type: "success",
    },
    {
      id: 2,
      title: "📦 Low Stock Alert",
      message: "Cashmere Shawl stock is below 5 units.",
      time: "20 mins ago",
      type: "warning",
    },
    {
      id: 3,
      title: "💳 Payment Received",
      message: "Payment of ₹4,500 has been received.",
      time: "1 hour ago",
      type: "primary",
    },
    {
      id: 4,
      title: "🚚 Order Delivered",
      message: "Order #1023 has been delivered successfully.",
      time: "3 hours ago",
      type: "info",
    },
    {
      id: 5,
      title: "🎉 New Seller Review",
      message: "You received a 5-star review from Priya Singh.",
      time: "Yesterday",
      type: "success",
    },
  ];

  return (
    <div className="container py-5">
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
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`alert alert-${item.type} mb-3`}
            >
              <h5>{item.title}</h5>
              <p className="mb-1">{item.message}</p>
              <small className="text-muted">{item.time}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notification;