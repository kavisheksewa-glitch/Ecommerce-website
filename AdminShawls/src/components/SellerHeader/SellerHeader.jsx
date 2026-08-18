// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./SellerHeader.css";
// // import logo from "../assets/logooo.png";
// import logo from "../../assets/logooo.png";

// function SellerHeader() {
//   const navigate = useNavigate();
//   const [showProfile, setShowProfile] = useState(false);
  
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("seller");

//     alert("Logout Successful!");

//     navigate("/");
//   };

//   return (
//     <nav className="navbar navbar-expand-lg bg-white shadow-sm fixed-top px-4 py-3 Seller_seller-navbar">
      
//       {/* Logo */}
//       <div className="navbar-brand d-flex align-items-center">
//         <div>
//           <h5 className="mb-0 fw-bold Seller_text-brown">
//             Kavi Shawls
//           </h5>
//         </div>
//       </div>

//       {/* Right Menu */}
//       <div className="ms-auto d-flex align-items-center gap-3">
       
//         {/* Notification */}
//         <button
//           className="btn btn-light position-relative"
//           onClick={() => navigate("/notification")}
//         >
//           🔔
//           <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//             3
//           </span>
//         </button>

//         {/* Seller Profile */}
//         <div className="position-relative">
//           <button
//             className="btn btn-light"
//             onClick={() => setShowProfile(!showProfile)}
//           >
//             👤 Seller ▼
//           </button>

//           {/* Dropdown */}
//           {showProfile && (
//             <div className="dropdown-menu show position-absolute end-0 mt-2 p-2">
//               <div className="px-3 py-2">
//                 <strong>👤 Seller</strong>
//                 <br />
//                 <small className="text-muted">
//                   Kavi Shawls
//                 </small>
//               </div>

//               <hr className="my-1" />

//               <button
//                 className="dropdown-item"
//                 onClick={() => navigate("/seller-details")}
//               >
//                 👤 Seller Details
//               </button>

//               <button
//                 className="dropdown-item"
//                 onClick={() => navigate("/settings")}
//               >
//                 ⚙️ Settings
//               </button>

//               {/* Logout */}
//               <button
//                 type="button"
//                 className="dropdown-item text-danger"
//                 onClick={handleLogout}
//               >
//                 🚪 Logout
//               </button>
//             </div>
//           )}
//         </div>

//       </div>

//     </nav>
//   );
// }

// export default SellerHeader;



// new


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./SellerHeader.css";
// // import logo from "../assets/logooo.png";
// import logo from "../../assets/logooo.png";

// function SellerHeader() {
//   const navigate = useNavigate();
//   const [showProfile, setShowProfile] = useState(false);
  
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("seller");

//     alert("Logout Successful!");

//     navigate("/");
//   };

//   return (
//     <nav className="navbar navbar-expand-lg bg-white shadow-sm fixed-top px-4 py-3 Seller_seller-navbar">
      
//       {/* Logo */}
//       <div className="navbar-brand d-flex align-items-center">
//         <div>
//           <h5 className="mb-0 fw-bold Seller_text-brown">
//             Kavi Shawls
//           </h5>
//         </div>
//       </div>

//       {/* Right Menu */}
//       <div className="ms-auto d-flex align-items-center gap-3">
       
//         {/* Home Button */}
//         <button
//           className="btn btn-light d-flex align-items-center gap-1"
//           onClick={() => navigate("/seller-dashboard")} // Agar seller ka dashboard route alag hai toh yahan change kar sakte hain
//           title="Dashboard"
//         >
//           🏠 <span className="d-none d-md-inline">Home</span>
//         </button>

//         {/* Notification */}
//         <button
//           className="btn btn-light position-relative"
//           onClick={() => navigate("/notification")}
//         >
//           🔔
//           <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//             3
//           </span>
//         </button>

//         {/* Seller Profile */}
//         <div className="position-relative">
//           <button
//             className="btn btn-light"
//             onClick={() => setShowProfile(!showProfile)}
//           >
//             👤 Seller ▼
//           </button>

//           {/* Dropdown */}
//           {showProfile && (
//             <div className="dropdown-menu show position-absolute end-0 mt-2 p-2">
//               <div className="px-3 py-2">
//                 <strong>👤 Seller</strong>
//                 <br />
//                 <small className="text-muted">
//                   Kavi Shawls
//                 </small>
//               </div>

//               <hr className="my-1" />

//               <button
//                 className="dropdown-item"
//                 onClick={() => navigate("/seller-details")}
//               >
//                 👤 Seller Details
//               </button>

//               <button
//                 className="dropdown-item"
//                 onClick={() => navigate("/settings")}
//               >
//                 ⚙️ Settings
//               </button>

//               {/* Logout */}
//               <button
//                 type="button"
//                 className="dropdown-item text-danger"
//                 onClick={handleLogout}
//               >
//                 🚪 Logout
//               </button>
//             </div>
//           )}
//         </div>

//       </div>

//     </nav>
//   );
// }

// export default SellerHeader;












// nnnnnnnnnnnn










import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SellerHeader.css";
import logo from "../../assets/logooo.png";

function SellerHeader() {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0); // 1. Count ke liye state

  // 2. Component mount hone par notifications count fetch karein
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        
        // Agar token nahi hai toh request na bhejein
        if (!token) return; 

        const response = await fetch("http://localhost:5000/api/seller/notifications", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Seller ka token bhej rahe hain taaki uski specific notifications milein
          },
        });

        const data = await response.json();
        
        if (response.ok) {
          // Maan lijiye API array ya count return kar rahi hai
          // Jaise: data.count ya unread notifications ki length
          const unreadCount = data.filter(n => !n.isRead).length; 
          setNotificationCount(unreadCount);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("seller");
    alert("Logout Successful!");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm fixed-top px-4 py-3 Seller_seller-navbar">
      
      {/* Logo */}
      <div className="navbar-brand d-flex align-items-center">
        <div>
          <h5 className="mb-0 fw-bold Seller_text-brown">
            Kavi Shawls
          </h5>
        </div>
      </div>

      {/* Right Menu */}
      <div className="ms-auto d-flex align-items-center gap-3">
       
        {/* Home Button */}
        <button
          className="btn btn-light d-flex align-items-center gap-1"
          onClick={() => navigate("/seller-dashboard")}
          title="Dashboard"
        >
          🏠 <span className="d-none d-md-inline">Home</span>
        </button>

        {/* Notification */}
        <button
          className="btn btn-light position-relative"
          onClick={() => navigate("/notification")}
        >
          🔔
          {/* 3 ki jagah dynamic state variable dikhayenge */}
          {notificationCount > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {notificationCount}
            </span>
          )}
        </button>

        {/* Seller Profile */}
        <div className="position-relative">
          <button
            className="btn btn-light"
            onClick={() => setShowProfile(!showProfile)}
          >
            👤 Seller ▼
          </button>

          {/* Dropdown */}
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

              {/* Logout */}
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