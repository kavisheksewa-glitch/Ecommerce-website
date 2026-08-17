// import React, { useState } from "react";
// import { FaBell, FaCheckCircle, FaTrash, FaArrowLeft, FaShoppingBag, FaTag } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./whislist.css";
// function Notifications({ onUpdateUnreadCount }) {
//   const [notifications, setNotifications] = useState([
//     { 
//       id: 1, 
//       title: "Order Dispatched! 📦", 
//       message: "Your luxury Pashmina shawl order has been shipped and is on its way.", 
//       time: "10 mins ago", 
//       read: false,
//       type: "order"
//     },
//     { 
//       id: 2, 
//       title: "Special Summer Offer 🎉", 
//       message: "Get 20% off on all new String Summer collection shawls. Use code SUMMER20.", 
//       time: "2 hours ago", 
//       read: false,
//       type: "offer"
//     },
//     { 
//       id: 3, 
//       title: "Order Delivered", 
//       message: "Your order #KS-5921 has been successfully delivered. Enjoy your purchase!", 
//       time: "Yesterday", 
//       read: true,
//       type: "order"
//     },
//   ]);

//   // Unread count calculate karna
//   const unreadCount = notifications.filter(n => !n.read).length;

//   const handleMarkAsRead = (id) => {
//     const updated = notifications.map((item) => (item.id === id ? { ...item, read: true } : item));
//     setNotifications(updated);
    
//     // Parent/App ko naya count bhejne ke liye agar state maintain kar rahe hain
//     if(onUpdateUnreadCount) onUpdateUnreadCount(updated.filter(n => !n.read).length);

//     toast.info("Marked as read", { position: "top-right", autoClose: 1500 });
//   };

//   const handleDelete = (id) => {
//     const updated = notifications.filter((item) => item.id !== id);
//     setNotifications(updated);
    
//     if(onUpdateUnreadCount) onUpdateUnreadCount(updated.filter(n => !n.read).length);

//     toast.error("Notification deleted", { position: "top-right", autoClose: 1500 });
//   };

//   const handleClearAll = () => {
//     setNotifications([]);
//     if(onUpdateUnreadCount) onUpdateUnreadCount(0);

//     toast.warn("All notifications cleared", { position: "top-right", autoClose: 1500 });
//   };

//   return (
//     <div className="container py-5 mt-5">
//       <ToastContainer />
      
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <Link to="/" className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2">
//           <FaArrowLeft /> Continue Shopping
//         </Link>
//         <h2 className="fw-bold mb-0 text-dark d-flex align-items-center gap-2">
//           <h1><FaBell className="text-warning" /> Your Notifications   </h1>      
//           {unreadCount > 0 && <span className="badge bg-danger fs-6">{unreadCount}</span>}
//         </h2>
//         {notifications.length > 0 ? (
//           <button onClick={handleClearAll} className="btn btn-danger btn-sm">
//             Clear All
//           </button>
//         ) : (
//           <div></div>
//         )}
//       </div>

//       <div className="card shadow-sm border-0">
//         <div className="card-body p-0">
//           {notifications.length === 0 ? (
//             <div className="text-center py-5">
//               <FaBell size={40} className="text-muted mb-3 opacity-50" />
//               <p className="text-muted mb-0">You have no new notifications right now.</p>
//             </div>
//           ) : (
//             <ul className="list-group list-group-flush">
//               {notifications.map((n) => (
//                 <li
//                   key={n.id}
//                   className={`list-group-item p-3 d-flex justify-content-between align-items-start ${
//                     !n.read ? "bg-light fw-semibold" : ""
//                   }`}
//                 >
//                   <div className="d-flex gap-3 align-items-start">
//                     <div className="mt-1">
//                       {n.type === "offer" ? (
//                         <FaTag className="text-success fs-4" />
//                       ) : (
//                         <FaShoppingBag className="text-primary fs-4" />
//                       )}
//                     </div>

//                     <div>
//                       <div className="d-flex align-items-center gap-2">
//                         <h5 className="mb-1 text-dark fs-6 fw-bold">{n.title}</h5>
//                         {!n.read && <span className="badge bg-primary rounded-pill" style={{ fontSize: "10px" }}>New</span>}
//                       </div>
//                       <p className="mb-1 text-secondary small">{n.message}</p>
//                       <small className="text-muted" style={{ fontSize: "11px" }}>{n.time}</small>
//                     </div>
//                   </div>

//                   <div className="d-flex gap-2 align-items-center mt-1">
//                     {!n.read && (
//                       <button
//                         onClick={() => handleMarkAsRead(n.id)}
//                         className="btn btn-sm btn-outline-success border-0"
//                         title="Mark as Read"
//                       >
//                         <FaCheckCircle />
//                       </button>
//                     )}
//                     <button
//                       onClick={() => handleDelete(n.id)}
//                       className="btn btn-sm btn-outline-danger border-0"
//                       title="Delete Notification"
//                     >
//                       <FaTrash />
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Notifications;



// import React, { useState } from "react";
// import { FaBell, FaCheckCircle, FaTrash, FaArrowLeft, FaShoppingBag, FaTag } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// //import "./wishlist.css";
// import "../Whislist/wishlist.css";

// function Notifications({ onUpdateUnreadCount }) {
//   const [notifications, setNotifications] = useState([
//     {
//       id: 1,
//       title: "Order Dispatched! 📦",
//       message: "Your luxury Pashmina shawl order has been shipped and is on its way.",
//       time: "10 mins ago",
//       read: false,
//       type: "order",
//     },
//     {
//       id: 2,
//       title: "Special Summer Offer 🎉",
//       message: "Get 20% off on all new String Summer collection shawls. Use code SUMMER20.",
//       time: "2 hours ago",
//       read: false,
//       type: "offer",
//     },
//     {
//       id: 3,
//       title: "Order Delivered",
//       message: "Your order #KS-5921 has been successfully delivered. Enjoy your purchase!",
//       time: "Yesterday",
//       read: true,
//       type: "order",
//     },
//   ]);

//   // Unread count calculate karna
//   const unreadCount = notifications.filter((n) => !n.read).length;

//   const handleMarkAsRead = (id) => {
//     const updated = notifications.map((item) => (item.id === id ? { ...item, read: true } : item));
//     setNotifications(updated);

//     // Parent/App ko naya count bhejne ke liye agar state maintain kar rahe hain
//     if (onUpdateUnreadCount) onUpdateUnreadCount(updated.filter((n) => !n.read).length);

//     toast.info("Marked as read", { position: "top-right", autoClose: 1500 });
//   };

//   const handleDelete = (id) => {
//     const updated = notifications.filter((item) => item.id !== id);
//     setNotifications(updated);

//     if (onUpdateUnreadCount) onUpdateUnreadCount(updated.filter((n) => !n.read).length);

//     toast.error("Notification deleted", { position: "top-right", autoClose: 1500 });
//   };

//   const handleClearAll = () => {
//     setNotifications([]);
//     if (onUpdateUnreadCount) onUpdateUnreadCount(0);

//     toast.warn("All notifications cleared", { position: "top-right", autoClose: 1500 });
//   };

//   return (
//     <div className="container py-5 mt-5">
//       <ToastContainer />

//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <Link to="/" className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2">
//           <FaArrowLeft /> Continue Shopping
//         </Link>

//         {/* ✅ fixed: h1 ko h2 ke andar nest nahi kiya, ab valid HTML hai */}
//         <h2 className="fw-bold mb-0 text-dark d-flex align-items-center gap-2">
//           <FaBell className="text-warning" /> Your Notifications
//           {unreadCount > 0 && <span className="badge bg-danger fs-6">{unreadCount}</span>}
//         </h2>

//         {notifications.length > 0 ? (
//           <button onClick={handleClearAll} className="btn btn-danger btn-sm">
//             Clear All
//           </button>
//         ) : (
//           <div></div>
//         )}
//       </div>

//       <div className="card shadow-sm border-0">
//         <div className="card-body p-0">
//           {notifications.length === 0 ? (
//             <div className="text-center py-5">
//               <FaBell size={40} className="text-muted mb-3 opacity-50" />
//               <p className="text-muted mb-0">You have no new notifications right now.</p>
//             </div>
//           ) : (
//             <ul className="list-group list-group-flush">
//               {notifications.map((n) => (
//                 <li
//                   key={n.id}
//                   className={`list-group-item p-3 d-flex justify-content-between align-items-start ${
//                     !n.read ? "bg-light fw-semibold" : ""
//                   }`}
//                 >
//                   <div className="d-flex gap-3 align-items-start">
//                     <div className="mt-1">
//                       {n.type === "offer" ? (
//                         <FaTag className="text-success fs-4" />
//                       ) : (
//                         <FaShoppingBag className="text-primary fs-4" />
//                       )}
//                     </div>

//                     <div>
//                       <div className="d-flex align-items-center gap-2">
//                         <h5 className="mb-1 text-dark fs-6 fw-bold">{n.title}</h5>
//                         {!n.read && (
//                           <span className="badge bg-primary rounded-pill" style={{ fontSize: "10px" }}>
//                             New
//                           </span>
//                         )}
//                       </div>
//                       <p className="mb-1 text-secondary small">{n.message}</p>
//                       <small className="text-muted" style={{ fontSize: "11px" }}>
//                         {n.time}
//                       </small>
//                     </div>
//                   </div>

//                   <div className="d-flex gap-2 align-items-center mt-1">
//                     {!n.read && (
//                       <button
//                         onClick={() => handleMarkAsRead(n.id)}
//                         className="btn btn-sm btn-outline-success border-0"
//                         title="Mark as Read"
//                       >
//                         <FaCheckCircle />
//                       </button>
//                     )}
//                     <button
//                       onClick={() => handleDelete(n.id)}
//                       className="btn btn-sm btn-outline-danger border-0"
//                       title="Delete Notification"
//                     >
//                       <FaTrash />
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Notifications;






// newwwwwwwwwwww










// import React, { useState, useEffect } from "react";
// import { FaBell, FaCheckCircle, FaTrash, FaArrowLeft, FaShoppingBag, FaTag } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "../Whislist/wishlist.css";

// function Notifications({ onUpdateUnreadCount }) {
//   const [notifications, setNotifications] = useState([]);

//   // Component load hone par localStorage se notifications fetch karein
//   useEffect(() => {
//     const savedNotifications = JSON.parse(localStorage.getItem("user_notifications"));
//     if (savedNotifications) {
//       setNotifications(savedNotifications);
//       const initialUnread = savedNotifications.filter((n) => !n.read).length;
//       if (onUpdateUnreadCount) onUpdateUnreadCount(initialUnread);
//     } else {
//       // Default initial notifications agar localStorage empty ho
//       const defaultNotifs = [
//         {
//           id: 1,
//           title: "Order Dispatched! 📦",
//           message: "Your luxury Pashmina shawl order has been shipped and is on its way.",
//           time: "10 mins ago",
//           read: false,
//           type: "order",
//         },
//         {
//           id: 2,
//           title: "Special Summer Offer 🎉",
//           message: "Get 20% off on all new String Summer collection shawls. Use code SUMMER20.",
//           time: "2 hours ago",
//           read: false,
//           type: "offer",
//         },
//       ];
//       setNotifications(defaultNotifs);
//       localStorage.setItem("user_notifications", JSON.stringify(defaultNotifs));
//       if (onUpdateUnreadCount) onUpdateUnreadCount(defaultNotifs.filter((n) => !n.read).length);
//     }
//   }, []);

//   // Unread count calculate karna
//   const unreadCount = notifications.filter((n) => !n.read).length;

//   const handleMarkAsRead = (id) => {
//     const updated = notifications.map((item) => (item.id === id ? { ...item, read: true } : item));
//     setNotifications(updated);
//     localStorage.setItem("user_notifications", JSON.stringify(updated));

//     const newUnreadCount = updated.filter((n) => !n.read).length;
//     if (onUpdateUnreadCount) onUpdateUnreadCount(newUnreadCount);

//     toast.info("Marked as read", { position: "top-right", autoClose: 1500 });
//   };

//   const handleDelete = (id) => {
//     const updated = notifications.filter((item) => item.id !== id);
//     setNotifications(updated);
//     localStorage.setItem("user_notifications", JSON.stringify(updated));

//     const newUnreadCount = updated.filter((n) => !n.read).length;
//     if (onUpdateUnreadCount) onUpdateUnreadCount(newUnreadCount);

//     toast.error("Notification deleted", { position: "top-right", autoClose: 1500 });
//   };

//   const handleClearAll = () => {
//     setNotifications([]);
//     localStorage.removeItem("user_notifications");
//     if (onUpdateUnreadCount) onUpdateUnreadCount(0);

//     toast.warn("All notifications cleared", { position: "top-right", autoClose: 1500 });
//   };

//   return (
//     <div className="container py-5 mt-5">
//       <ToastContainer />

//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <Link to="/" className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2">
//           <FaArrowLeft /> Continue Shopping
//         </Link>

//         <h2 className="fw-bold mb-0 text-dark d-flex align-items-center gap-2">
//           <FaBell className="text-warning" /> Your Notifications
//           {unreadCount > 0 && <span className="badge bg-danger fs-6">{unreadCount}</span>}
//         </h2>

//         {notifications.length > 0 ? (
//           <button onClick={handleClearAll} className="btn btn-danger btn-sm">
//             Clear All
//           </button>
//         ) : (
//           <div></div>
//         )}
//       </div>

//       <div className="card shadow-sm border-0">
//         <div className="card-body p-0">
//           {notifications.length === 0 ? (
//             <div className="text-center py-5">
//               <FaBell size={40} className="text-muted mb-3 opacity-50" />
//               <p className="text-muted mb-0">You have no new notifications right now.</p>
//             </div>
//           ) : (
//             <ul className="list-group list-group-flush">
//               {notifications.map((n) => (
//                 <li
//                   key={n.id}
//                   className={`list-group-item p-3 d-flex justify-content-between align-items-start ${
//                     !n.read ? "bg-light fw-semibold" : ""
//                   }`}
//                 >
//                   <div className="d-flex gap-3 align-items-start">
//                     <div className="mt-1">
//                       {n.type === "offer" ? (
//                         <FaTag className="text-success fs-4" />
//                       ) : (
//                         <FaShoppingBag className="text-primary fs-4" />
//                       )}
//                     </div>

//                     <div>
//                       <div className="d-flex align-items-center gap-2">
//                         <h5 className="mb-1 text-dark fs-6 fw-bold">{n.title}</h5>
//                         {!n.read && (
//                           <span className="badge bg-primary rounded-pill" style={{ fontSize: "10px" }}>
//                             New
//                           </span>
//                         )}
//                       </div>
//                       <p className="mb-1 text-secondary small">{n.message}</p>
//                       <small className="text-muted" style={{ fontSize: "11px" }}>
//                         {n.time}
//                       </small>
//                     </div>
//                   </div>

//                   <div className="d-flex gap-2 align-items-center mt-1">
//                     {!n.read && (
//                       <button
//                         onClick={() => handleMarkAsRead(n.id)}
//                         className="btn btn-sm btn-outline-success border-0 d-flex align-items-center gap-1"
//                         title="Mark as Read"
//                       >
//                         <FaCheckCircle /> <span style={{ fontSize: "12px" }}>I Read</span>
//                       </button>
//                     )}
//                     <button
//                       onClick={() => handleDelete(n.id)}
//                       className="btn btn-sm btn-outline-danger border-0"
//                       title="Delete Notification"
//                     >
//                       <FaTrash />
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Notifications;






// newwwww1








// import React, { useState, useEffect } from "react";
// import { FaBell, FaCheckCircle, FaTrash, FaArrowLeft, FaShoppingBag, FaTag } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "../Whislist/wishlist.css";

// function Notifications() {
//   const [notifications, setNotifications] = useState([]);
//   const userId = localStorage.getItem("userId") || "guest_user_id";

//   // Backend se notifications fetch karna
//   const fetchNotifications = async () => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/shawls/notifications/${userId}`);
//       const data = await res.json();
//       if (Array.isArray(data)) {
//         setNotifications(data);
//         // Header ko update karne ke liye event dispatch karein
//         window.dispatchEvent(new Event("notificationsUpdated"));
//       }
//     } catch (err) {
//       console.error("Error fetching notifications:", err);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//   }, [userId]);

//   // Unread count calculate karna
//   const unreadCount = notifications.filter((n) => !n.read).length;

//   // Mark as Read (I Read) API call
//   const handleMarkAsRead = async (id) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/shawls/notifications/read/${id}`, {
//         method: "PUT",
//       });
//       if (res.ok) {
//         fetchNotifications(); // Refresh list
//         toast.info("Marked as read", { position: "top-right", autoClose: 1500 });
//       }
//     } catch (err) {
//       console.error("Error updating notification:", err);
//     }
//   };

//   // Delete Single Notification API call
//   const handleDelete = async (id) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/shawls/notifications/${id}`, {
//         method: "DELETE",
//       });
//       if (res.ok) {
//         fetchNotifications();
//         toast.error("Notification deleted", { position: "top-right", autoClose: 1500 });
//       }
//     } catch (err) {
//       console.error("Error deleting notification:", err);
//     }
//   };

//   // Clear All API call
//   const handleClearAll = async () => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/shawls/notifications/clear/${userId}`, {
//         method: "DELETE",
//       });
//       if (res.ok) {
//         setNotifications([]);
//         window.dispatchEvent(new Event("notificationsUpdated"));
//         toast.warn("All notifications cleared", { position: "top-right", autoClose: 1500 });
//       }
//     } catch (err) {
//       console.error("Error clearing notifications:", err);
//     }
//   };

//   return (
//     <div className="container py-5 mt-5">
//       <ToastContainer />

//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <Link to="/" className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2">
//           <FaArrowLeft /> Continue Shopping
//         </Link>

//         <h2 className="fw-bold mb-0 text-dark d-flex align-items-center gap-2">
//           <FaBell className="text-warning" /> Your Notifications
//           {unreadCount > 0 && <span className="badge bg-danger fs-6">{unreadCount}</span>}
//         </h2>

//         {notifications.length > 0 ? (
//           <button onClick={handleClearAll} className="btn btn-danger btn-sm">
//             Clear All
//           </button>
//         ) : (
//           <div></div>
//         )}
//       </div>

//       <div className="card shadow-sm border-0">
//         <div className="card-body p-0">
//           {notifications.length === 0 ? (
//             <div className="text-center py-5">
//               <FaBell size={40} className="text-muted mb-3 opacity-50" />
//               <p className="text-muted mb-0">You have no new notifications right now.</p>
//             </div>
//           ) : (
//             <ul className="list-group list-group-flush">
//               {notifications.map((n) => (
//                 <li
//                   key={n._id}
//                   className={`list-group-item p-3 d-flex justify-content-between align-items-start ${
//                     !n.read ? "bg-light fw-semibold" : ""
//                   }`}
//                 >
//                   <div className="d-flex gap-3 align-items-start">
//                     <div className="mt-1">
//                       {n.type === "offer" ? (
//                         <FaTag className="text-success fs-4" />
//                       ) : (
//                         <FaShoppingBag className="text-primary fs-4" />
//                       )}
//                     </div>

//                     <div>
//                       <div className="d-flex align-items-center gap-2">
//                         <h5 className="mb-1 text-dark fs-6 fw-bold">{n.title}</h5>
//                         {!n.read && (
//                           <span className="badge bg-primary rounded-pill" style={{ fontSize: "10px" }}>
//                             New
//                           </span>
//                         )}
//                       </div>
//                       <p className="mb-1 text-secondary small">{n.message}</p>
//                       <small className="text-muted" style={{ fontSize: "11px" }}>
//                         {n.time}
//                       </small>
//                     </div>
//                   </div>

//                   <div className="d-flex gap-2 align-items-center mt-1">
//                     {!n.read && (
//                       <button
//                         onClick={() => handleMarkAsRead(n._id)}
//                         className="btn btn-sm btn-outline-success border-0 d-flex align-items-center gap-1"
//                         title="Mark as Read"
//                       >
//                         <FaCheckCircle /> <span style={{ fontSize: "12px" }}>I Read</span>
//                       </button>
//                     )}
//                     <button
//                       onClick={() => handleDelete(n._id)}
//                       className="btn btn-sm btn-outline-danger border-0"
//                       title="Delete Notification"
//                     >
//                       <FaTrash />
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Notifications;









// neeeeeeeeeeeeeeeeewww\



import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  // 1. Fetch Notifications from Backend Database
  const fetchNotifications = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/shawls/notifications/${userId}`);
      const data = await response.json();
      if (response.ok && Array.isArray(data)) {
        setNotifications(data);
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [userId]);

  // 2. Mark Single Notification as Read
  const handleMarkAsRead = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/shawls/notifications/read/${id}`, {
        method: "PUT",
      });
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
    if (!userId) return;
    try {
      const response = await fetch(`http://localhost:5000/api/shawls/notifications/clear/${userId}`, {
        method: "DELETE",
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
        ) : !userId ? (
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
                  <small className="text-muted">{n.time || "Just now"}</small>
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