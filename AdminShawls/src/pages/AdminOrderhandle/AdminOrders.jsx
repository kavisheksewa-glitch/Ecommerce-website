// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { 
//   FaArrowLeft, FaCheckCircle, FaTimesCircle, 
//   FaBox, FaShoppingCart, FaUsers, FaChartLine, FaBars ,FaStore,
// } from "react-icons/fa";
// //import logoImage from "../assets/logooo.png";
// import logoImage from "../../assets/logooo.png";
// function AdminOrders() {
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [orders, setOrders] = useState([
//     { id: "#KS-101", customer: "Aarav Sharma", product: "Kashmiri Pashmina Shawl", amount: "₹4,500", status: "Delivered" },
//     { id: "#KS-102", customer: "Priya Verma", product: "Embroidered Woolen Shawl", amount: "₹2,800", status: "Pending" },
//     { id: "#KS-103", customer: "Rahul Singh", product: "Designer Silk Shawl", amount: "₹6,200", status: "Processing" },
//   ]);

//   const updateStatus = (id, newStatus) => {
//     setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
//   };

//   return (
//     <div className="container-fluid p-0" style={{ backgroundColor: "#f0fdf4", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
//       <div className="row g-0">
        
//         {/* Mobile Header Bar */}
//         <div className="col-12 d-md-none d-flex justify-content-between align-items-center px-4 py-3 text-white shadow-sm sticky-top border-bottom" style={{ backgroundColor: "#064e3b", zIndex: 1060 }}>
//           <div className="d-flex align-items-center gap-2">
//             <img src={logoImage} alt="Logo" style={{ maxHeight: "30px", width: "auto", objectFit: "contain" }} />
//             <span className="fw-semibold small text-uppercase text-light" style={{ letterSpacing: "1.5px" }}>Manage Orders</span>
//           </div>
//           <button 
//             className="btn btn-link text-white p-0 text-decoration-none" 
//             onClick={() => setShowSidebar(!showSidebar)}
//             aria-label="Toggle Sidebar"
//           >
//             <FaBars size={20} />
//           </button>
//         </div>

//         {/* Backdrop for Mobile Sidebar */}
//         {showSidebar && (
//           <div 
//             className="d-md-none position-fixed top-0 start-0 w-100 h-100" 
//             style={{ backgroundColor: "rgba(0,0,0,0.3)", zIndex: 1045 }}
//             onClick={() => setShowSidebar(false)}
//           />
//         )}

//         {/* Sidebar (Royal Emerald Theme) */}
//         <nav 
//           className={`col-md-3 col-lg-2 d-md-block sidebar text-white min-vh-100 p-4 shadow-sm ${showSidebar ? "d-block" : "d-none d-md-block"}`} 
//           style={{ 
//             backgroundColor: "#064e3b", 
//             position: "fixed", 
//             top: 0, 
//             bottom: 0, 
//             left: 0, 
//             zIndex: 1050, 
//             transition: "all 0.3s ease",
//             borderRight: "1px solid #047857"
//           }}
//         >
//           <div className="d-flex justify-content-end d-md-none mb-3">
//             <button className="btn btn-sm text-white fw-light" onClick={() => setShowSidebar(false)}>✕ Close</button>
//           </div>

//           <div className="text-center py-3 border-bottom border-success mb-4">
//             <img src={logoImage} alt="Brand Logo" style={{ maxHeight: "100px", width: "auto", objectFit: "contain" }} />
//             <span className="d-block mt-3 fw-semibold text-uppercase tracking-wider small text-light" style={{ letterSpacing: "2px", fontSize: "0.75rem" }}>
//               ADMIN PANEL
//             </span>
//           </div>

//           <ul className="nav flex-column gap-2">
//             <li className="nav-item">
//               <Link to="/admin/dashboard" className="nav-link text-white py-2 px-3 rounded-2 d-flex align-items-center gap-3" style={{ fontSize: "0.95rem" }}>
//                 <FaChartLine size={15} /> Dashboard
//               </Link>
//             </li>
//             {/* <li className="nav-item">
//               <Link to="/admin/products" className="nav-link text-white py-2 px-3 rounded-2 d-flex align-items-center gap-3" style={{ fontSize: "0.95rem" }}>
//                 <FaBox size={15} /> Products
//               </Link>
//             </li> */}
//             <li className="nav-item">
//               <Link to="/admin/orders" className="nav-link active rounded-2 py-2 px-3 shadow-sm d-flex align-items-center gap-3 text-white" style={{ backgroundColor: "#047857", fontSize: "0.95rem" }}>
//                 <FaShoppingCart size={15} /> Orders
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/admin/users" className="nav-link text-white py-2 px-3 rounded-2 d-flex align-items-center gap-3" style={{ fontSize: "0.95rem" }}>
//                 <FaUsers size={15} /> Customers
//               </Link>
//             </li>
//             {/* View Sellers Link Added Here */}
//                         <li className="nav-item">
//                           <Link to="/admin/sellers" className="nav-link text-white py-2 px-3 rounded d-flex align-items-center gap-2">
//                             <FaStore /> View Sellers
//                           </Link>
//                         </li>
//           </ul>
//         </nav>

//         {/* Main Content */}
//         <main className="col-md-9 ms-sm-auto col-lg-10 px-4 px-lg-5 py-4 py-lg-5" style={{ marginLeft: "auto" }}>
//           <div className="d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom">
//             <div className="d-flex align-items-center gap-3">
//               <Link to="/admin/dashboard" className="btn btn-outline-success btn-sm d-md-none border-0 shadow-none"><FaArrowLeft /></Link>
//               <div>
//                 <h1 className="h3 fw-bold mb-1" style={{ color: "#064e3b", letterSpacing: "-0.5px" }}>Manage Orders</h1>
//                 <p className="text-muted small m-0">Review patron requests and update fulfillment states.</p>
//               </div>
//             </div>
//           </div>

//           <div className="card shadow-sm border-0 rounded-4 p-3 p-md-4 bg-white" style={{ border: "1px solid #e2e8f0" }}>
//             <div className="table-responsive">
//               <table className="table align-middle table-hover mb-0">
//                 <thead className="table-light text-uppercase text-muted" style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}>
//                   <tr>
//                     <th className="py-3 ps-3">Order ID</th>
//                     <th className="py-3">Patron</th>
//                     <th className="py-3">Masterpiece / Product</th>
//                     <th className="py-3">Amount</th>
//                     <th className="py-3">Status</th>
//                     <th className="py-3 text-end pe-3">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {orders.map((order, index) => (
//                     <tr key={index} style={{ fontSize: "0.9rem" }}>
//                       <td className="fw-semibold ps-3" style={{ color: "#064e3b" }}>{order.id}</td>
//                       <td className="fw-medium">{order.customer}</td>
//                       <td className="text-muted">{order.product}</td>
//                       <td className="fw-bold" style={{ color: "#064e3b" }}>{order.amount}</td>
//                       <td>
//                         <span className={`badge px-2.5 py-1.5 rounded-pill fw-normal ${
//                           order.status === "Delivered" ? "bg-success bg-opacity-10 text-success" :
//                           order.status === "Pending" ? "bg-warning bg-opacity-10 text-dark" : 
//                           order.status === "Processing" ? "bg-info bg-opacity-10 text-info" : "bg-danger bg-opacity-10 text-danger"
//                         }`} style={{ fontSize: "0.75rem" }}>
//                           {order.status}
//                         </span>
//                       </td>
//                       <td className="text-end pe-3">
//                         <div className="d-flex gap-2 justify-content-end">
//                           <button className="btn btn-sm btn-light text-success border-0 p-2 rounded-circle shadow-none" onClick={() => updateStatus(order.id, "Delivered")} title="Mark Delivered">
//                             <FaCheckCircle size={15} />
//                           </button>
//                           <button className="btn btn-sm btn-light text-danger border-0 p-2 rounded-circle shadow-none" onClick={() => updateStatus(order.id, "Cancelled")} title="Cancel Order">
//                             <FaTimesCircle size={15} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default AdminOrders;



// new



// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { 
//   FaArrowLeft, FaCheckCircle, FaTimesCircle, 
//   FaBox, FaShoppingCart, FaUsers, FaChartLine, FaBars, FaStore,
// } from "react-icons/fa";
// import logoImage from "../../assets/logooo.png";

// function AdminOrders() {
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // 1. Fetch Orders from Backend on Mount
//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("http://localhost:5000/api/orders"); // Apne backend ke orders route ke hisaab se URL adjust kar sakte hain
//       const data = await response.json();
      
//       if (response.ok) {
//         // Agar response success hai toh orders set karein
//         setOrders(data.orders || data); 
//       } else {
//         setError(data.message || "Failed to fetch orders");
//       }
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//       setError("Server error while fetching orders.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 2. Update Order Status in Backend and UI
//   const updateStatus = async (id, newStatus) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/orders/${id}/status`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ status: newStatus }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // State update karein taaki UI turant reflect ho
//         setOrders(orders.map(order => (order._id === id || order.id === id) ? { ...order, status: newStatus } : order));
//       } else {
//         alert(data.message || "Failed to update status");
//       }
//     } catch (err) {
//       console.error("Error updating status:", err);
//       alert("Server error while updating order status.");
//     }
//   };

//   return (
//     <div className="container-fluid p-0" style={{ backgroundColor: "#f0fdf4", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
//       <div className="row g-0">
        
//         {/* Mobile Header Bar */}
//         <div className="col-12 d-md-none d-flex justify-content-between align-items-center px-4 py-3 text-white shadow-sm sticky-top border-bottom" style={{ backgroundColor: "#064e3b", zIndex: 1060 }}>
//           <div className="d-flex align-items-center gap-2">
//             <img src={logoImage} alt="Logo" style={{ maxHeight: "30px", width: "auto", objectFit: "contain" }} />
//             <span className="fw-semibold small text-uppercase text-light" style={{ letterSpacing: "1.5px" }}>Manage Orders</span>
//           </div>
//           <button 
//             className="btn btn-link text-white p-0 text-decoration-none" 
//             onClick={() => setShowSidebar(!showSidebar)}
//             aria-label="Toggle Sidebar"
//           >
//             <FaBars size={20} />
//           </button>
//         </div>

//         {/* Backdrop for Mobile Sidebar */}
//         {showSidebar && (
//           <div 
//             className="d-md-none position-fixed top-0 start-0 w-100 h-100" 
//             style={{ backgroundColor: "rgba(0,0,0,0.3)", zIndex: 1045 }}
//             onClick={() => setShowSidebar(false)}
//           />
//         )}

//         {/* Sidebar */}
//         <nav 
//           className={`col-md-3 col-lg-2 d-md-block sidebar text-white min-vh-100 p-4 shadow-sm ${showSidebar ? "d-block" : "d-none d-md-block"}`} 
//           style={{ 
//             backgroundColor: "#064e3b", 
//             position: "fixed", 
//             top: 0, 
//             bottom: 0, 
//             left: 0, 
//             zIndex: 1050, 
//             transition: "all 0.3s ease",
//             borderRight: "1px solid #047857"
//           }}
//         >
//           <div className="d-flex justify-content-end d-md-none mb-3">
//             <button className="btn btn-sm text-white fw-light" onClick={() => setShowSidebar(false)}>✕ Close</button>
//           </div>

//           <div className="text-center py-3 border-bottom border-success mb-4">
//             <img src={logoImage} alt="Brand Logo" style={{ maxHeight: "100px", width: "auto", objectFit: "contain" }} />
//             <span className="d-block mt-3 fw-semibold text-uppercase tracking-wider small text-light" style={{ letterSpacing: "2px", fontSize: "0.75rem" }}>
//               ADMIN PANEL
//             </span>
//           </div>

//           <ul className="nav flex-column gap-2">
//             <li className="nav-item">
//               <Link to="/admin/dashboard" className="nav-link text-white py-2 px-3 rounded-2 d-flex align-items-center gap-3" style={{ fontSize: "0.95rem" }}>
//                 <FaChartLine size={15} /> Dashboard
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/admin/orders" className="nav-link active rounded-2 py-2 px-3 shadow-sm d-flex align-items-center gap-3 text-white" style={{ backgroundColor: "#047857", fontSize: "0.95rem" }}>
//                 <FaShoppingCart size={15} /> Orders
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/admin/users" className="nav-link text-white py-2 px-3 rounded-2 d-flex align-items-center gap-3" style={{ fontSize: "0.95rem" }}>
//                 <FaUsers size={15} /> Customers
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/admin/sellers" className="nav-link text-white py-2 px-3 rounded d-flex align-items-center gap-2" style={{ fontSize: "0.95rem" }}>
//                 <FaStore /> View Sellers
//               </Link>
//             </li>
//           </ul>
//         </nav>

//         {/* Main Content */}
//         <main className="col-md-9 ms-sm-auto col-lg-10 px-4 px-lg-5 py-4 py-lg-5" style={{ marginLeft: "auto" }}>
//           <div className="d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom">
//             <div className="d-flex align-items-center gap-3">
//               <Link to="/admin/dashboard" className="btn btn-outline-success btn-sm d-md-none border-0 shadow-none"><FaArrowLeft /></Link>
//               <div>
//                 <h1 className="h3 fw-bold mb-1" style={{ color: "#064e3b", letterSpacing: "-0.5px" }}>Manage Orders</h1>
//                 <p className="text-muted small m-0">Review patron requests and update fulfillment states.</p>
//               </div>
//             </div>
//           </div>

//           <div className="card shadow-sm border-0 rounded-4 p-3 p-md-4 bg-white" style={{ border: "1px solid #e2e8f0" }}>
//             <div className="table-responsive">
//               {loading ? (
//                 <div className="text-center py-5">
//                   <div className="spinner-border text-success" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                   </div>
//                 </div>
//               ) : error ? (
//                 <div className="alert alert-danger text-center my-3">{error}</div>
//               ) : orders.length === 0 ? (
//                 <div className="text-center py-4 text-muted">No orders found.</div>
//               ) : (
//                 <table className="table align-middle table-hover mb-0">
//                   <thead className="table-light text-uppercase text-muted" style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}>
//                     <tr>
//                       <th className="py-3 ps-3">Order ID</th>
//                       <th className="py-3">Patron</th>
//                       <th className="py-3">Masterpiece / Product</th>
//                       <th className="py-3">Amount</th>
//                       <th className="py-3">Status</th>
//                       <th className="py-3 text-end pe-3">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {orders.map((order) => (
//                       <tr key={order._id || order.id} style={{ fontSize: "0.9rem" }}>
//                         <td className="fw-semibold ps-3" style={{ color: "#064e3b" }}>{order.id || order._id?.slice(-6)}</td>
//                         <td className="fw-medium">{order.customer || order.user?.name || "N/A"}</td>
//                         <td className="text-muted">{order.product || (order.items && order.items[0]?.name) || "Shawl Product"}</td>
//                         <td className="fw-bold" style={{ color: "#064e3b" }}>₹{order.amount || order.totalAmount}</td>
//                         <td>
//                           <span className={`badge px-2.5 py-1.5 rounded-pill fw-normal ${
//                             order.status === "Delivered" ? "bg-success bg-opacity-10 text-success" :
//                             order.status === "Pending" ? "bg-warning bg-opacity-10 text-dark" : 
//                             order.status === "Processing" ? "bg-info bg-opacity-10 text-info" : "bg-danger bg-opacity-10 text-danger"
//                           }`} style={{ fontSize: "0.75rem" }}>
//                             {order.status}
//                           </span>
//                         </td>
//                         <td className="text-end pe-3">
//                           <div className="d-flex gap-2 justify-content-end">
//                             <button className="btn btn-sm btn-light text-success border-0 p-2 rounded-circle shadow-none" onClick={() => updateStatus(order._id || order.id, "Delivered")} title="Mark Delivered">
//                               <FaCheckCircle size={15} />
//                             </button>
//                             <button className="btn btn-sm btn-light text-danger border-0 p-2 rounded-circle shadow-none" onClick={() => updateStatus(order._id || order.id, "Cancelled")} title="Cancel Order">
//                               <FaTimesCircle size={15} />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default AdminOrders;


// new1


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FaArrowLeft, FaCheckCircle, FaTimesCircle, 
  FaBox, FaShoppingCart, FaUsers, FaChartLine, FaBars, FaStore,
} from "react-icons/fa";
import logoImage from "../../assets/logooo.png";

function AdminOrders() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/shawls/orders");
      const data = await response.json();
      
      if (response.ok) {
        setOrders(data); 
      } else {
        setError(data.message || "Failed to fetch orders");
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Server error while fetching orders.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/shawls/orders/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderStatus: newStatus }),
      });

      const data = await response.json();

      if (response.ok) {
        setOrders(orders.map(order => (order._id === id) ? { ...order, orderStatus: newStatus } : order));
      } else {
        alert(data.message || "Failed to update status");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Server error while updating order status.");
    }
  };

  return (
    <div className="container-fluid p-0" style={{ backgroundColor: "#f0fdf4", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <div className="row g-0">
        
        {/* Mobile Header Bar */}
        <div className="col-12 d-md-none d-flex justify-content-between align-items-center px-4 py-3 text-white shadow-sm sticky-top border-bottom" style={{ backgroundColor: "#064e3b", zIndex: 1060 }}>
          <div className="d-flex align-items-center gap-2">
            <img src={logoImage} alt="Logo" style={{ maxHeight: "30px", width: "auto", objectFit: "contain" }} />
            <span className="fw-semibold small text-uppercase text-light" style={{ letterSpacing: "1.5px" }}>Manage Orders</span>
          </div>
          <button 
            className="btn btn-link text-white p-0 text-decoration-none" 
            onClick={() => setShowSidebar(!showSidebar)}
            aria-label="Toggle Sidebar"
          >
            <FaBars size={20} />
          </button>
        </div>

        {/* Sidebar */}
        <nav 
          className={`col-md-3 col-lg-2 d-md-block sidebar text-white min-vh-100 p-4 shadow-sm ${showSidebar ? "d-block" : "d-none d-md-block"}`} 
          style={{ 
            backgroundColor: "#064e3b", 
            position: "fixed", 
            top: 0, 
            bottom: 0, 
            left: 0, 
            zIndex: 1050, 
            transition: "all 0.3s ease",
            borderRight: "1px solid #047857"
          }}
        >
          <div className="text-center py-3 border-bottom border-success mb-4">
            <img src={logoImage} alt="Brand Logo" style={{ maxHeight: "100px", width: "auto", objectFit: "contain" }} />
            <span className="d-block mt-3 fw-semibold text-uppercase tracking-wider small text-light" style={{ letterSpacing: "2px", fontSize: "0.75rem" }}>
              ADMIN PANEL
            </span>
          </div>

          <ul className="nav flex-column gap-2">
            <li className="nav-item">
              <Link to="/admin/dashboard" className="nav-link text-white py-2 px-3 rounded-2 d-flex align-items-center gap-3" style={{ fontSize: "0.95rem" }}>
                <FaChartLine size={15} /> Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/orders" className="nav-link active rounded-2 py-2 px-3 shadow-sm d-flex align-items-center gap-3 text-white" style={{ backgroundColor: "#047857", fontSize: "0.95rem" }}>
                <FaShoppingCart size={15} /> Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/users" className="nav-link text-white py-2 px-3 rounded-2 d-flex align-items-center gap-3" style={{ fontSize: "0.95rem" }}>
                <FaUsers size={15} /> Customers
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/sellers" className="nav-link text-white py-2 px-3 rounded d-flex align-items-center gap-2" style={{ fontSize: "0.95rem" }}>
                <FaStore /> View Sellers
              </Link>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-4 px-lg-5 py-4 py-lg-5" style={{ marginLeft: "auto" }}>
          <div className="d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom">
            <div>
              <h1 className="h3 fw-bold mb-1" style={{ color: "#064e3b", letterSpacing: "-0.5px" }}>Manage Orders</h1>
              <p className="text-muted small m-0">Review Customer requests and update fulfillment states.</p>
            </div>
          </div>

          <div className="card shadow-sm border-0 rounded-4 p-3 p-md-4 bg-white" style={{ border: "1px solid #e2e8f0" }}>
            <div className="table-responsive">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="alert alert-danger text-center my-3">{error}</div>
              ) : orders.length === 0 ? (
                <div className="text-center py-4 text-muted">No orders found.</div>
              ) : (
                <table className="table align-middle table-hover mb-0">
                  <thead className="table-light text-uppercase text-muted" style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}>
                    <tr>
                      <th className="py-3 ps-3">Order ID</th>
                      <th className="py-3">Customer</th>
                      <th className="py-3">Product</th>
                      <th className="py-3">Amount</th>
                      <th className="py-3">Status</th>
                      <th className="py-3 text-end pe-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id} style={{ fontSize: "0.9rem" }}>
                        <td className="fw-semibold ps-3" style={{ color: "#064e3b" }}>{order._id.slice(-6)}</td>
                        <td className="fw-medium">{order.fullName}</td>
                        <td className="text-muted">{order.productTitle}</td>
                        <td className="fw-bold" style={{ color: "#064e3b" }}>₹{order.totalAmount}</td>
                        <td>
                          <span className={`badge px-2.5 py-1.5 rounded-pill fw-normal ${
                            order.orderStatus === "Delivered" ? "bg-success bg-opacity-10 text-success" :
                            order.orderStatus === "Pending" ? "bg-warning bg-opacity-10 text-dark" : "bg-info bg-opacity-10 text-info"
                          }`} style={{ fontSize: "0.75rem" }}>
                            {order.orderStatus || "Pending"}
                          </span>
                        </td>
                        <td className="text-end pe-3">
                          <div className="d-flex gap-2 justify-content-end">
                            <button className="btn btn-sm btn-light text-success border-0 p-2 rounded-circle shadow-none" onClick={() => updateStatus(order._id, "Delivered")} title="Mark Delivered">
                              <FaCheckCircle size={15} />
                            </button>
                            <button className="btn btn-sm btn-light text-danger border-0 p-2 rounded-circle shadow-none" onClick={() => updateStatus(order._id, "Cancelled")} title="Cancel Order">
                              <FaTimesCircle size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminOrders;