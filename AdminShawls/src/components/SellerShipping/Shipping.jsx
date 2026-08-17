// import React from "react";
// import "./Shipping.css";
// //import logo from "../assets/logooo.png";
// //import SellerHeader from "./SellerHeader";
// import logo from "../../assets/logooo.png";
// import SellerHeader from "../SellerHeader/SellerHeader";


// function Shipping() {
//   const orders = [
//     { id: 101, customer: "Rahul Sharma", product: "Luxury Pashmina Shawl", address: "Delhi", courier: "Blue Dart", tracking: "BD123456789", status: "Shipped" },
//     { id: 102, customer: "Priya Singh", product: "Cashmere Shawl", address: "Mumbai", courier: "DTDC", tracking: "DT987654321", status: "Processing" },
//     { id: 103, customer: "Amit Verma", product: "Silk Shawl", address: "Lucknow", courier: "Delhivery", tracking: "DL456789123", status: "Delivered" },
//   ];

//   return (
//     <div className="bg-light min-vh-100 py-5 mt-4">
//       <div className="container">
//         {/* Header */}
//         <SellerHeader />

//         {/* Title with Logo */}
//         <div className="text-center mb-5 d-flex flex-column align-items-center">
//           <img 
//             src={logo} 
//             alt="Logo" 
//             className="img-fluid mb-2 Seller_signup-logo" 
//           />
//           <h2 className="fw-bold Seller_text-brown">Shipping Management</h2>
//           <p className="text-muted">Track and update customer order deliveries</p>
//         </div>

//         {/* Grid */}
//         <div className="row g-4">
//           {orders.map((order) => (
//             <div key={order.id} className="col-12 col-md-6 col-lg-4">
//               <div className="card h-100 shadow-sm border-0 rounded-4 p-3 Seller_signup-card">
//                 <div className="card-body">
//                   <div className="d-flex justify-content-between align-items-center mb-3">
//                     <h5 className="fw-bold m-0 Seller_text-brown">Order #{order.id}</h5>
//                     <span className={`badge px-3 py-2 ${
//                       order.status === "Delivered" ? "bg-success" : 
//                       order.status === "Shipped" ? "bg-primary" : "bg-warning text-dark"
//                     }`}>
//                       {order.status}
//                     </span>
//                   </div>
                  
//                   <p className="mb-1"><strong>Customer:</strong> {order.customer}</p>
//                   <p className="mb-1"><strong>Product:</strong> {order.product}</p>
//                   <p className="mb-1"><strong>Address:</strong> {order.address}</p>
//                   <p className="mb-1"><strong>Courier:</strong> {order.courier}</p>
//                   <p className="mb-3 text-muted small"><strong>Tracking:</strong> {order.tracking}</p>

//                   <div className="d-flex gap-2">
//                     <button className=" Seller_btn-brown btn-sm w-100">Update</button>
//                     <button className=" Seller_btn-brown btn-sm w-100">Track</button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Shipping;


// new


// import React, { useState, useEffect } from "react";
// import "./Shipping.css";
// import logo from "../../assets/logooo.png";
// import SellerHeader from "../SellerHeader/SellerHeader";

// function Shipping() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Backend se saare orders fetch karna
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/shawls/orders");
//         const data = await response.json();
        
//         if (response.ok) {
//           setOrders(data);
//         } else {
//           console.error("Failed to fetch shipping orders");
//         }
//       } catch (err) {
//         console.error("Error connecting to backend:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   return (
//     <div className="bg-light min-vh-100 py-5 mt-4">
//       <div className="container">
//         {/* Header */}
//         <SellerHeader />

//         {/* Title with Logo */}
//         <div className="text-center mb-5 d-flex flex-column align-items-center">
//           <img 
//             src={logo} 
//             alt="Logo" 
//             className="img-fluid mb-2 Seller_signup-logo" 
//           />
//           <h2 className="fw-bold Seller_text-brown">Shipping Management</h2>
//           <p className="text-muted">Track and update customer order deliveries</p>
//         </div>

//         {/* Grid / Loading States */}
//         {loading ? (
//           <div className="text-center py-5">
//             <h5 className="text-muted">Loading shipping details...</h5>
//           </div>
//         ) : orders.length === 0 ? (
//           <div className="text-center py-5">
//             <h5 className="text-muted">Abhi tak koi order delivery ke liye nahi aaya hai.</h5>
//           </div>
//         ) : (
//           <div className="row g-4">
//             {orders.map((order) => (
//               <div key={order._id} className="col-12 col-md-6 col-lg-4">
//                 <div className="card h-100 shadow-sm border-0 rounded-4 p-3 Seller_signup-card">
//                   <div className="card-body">
//                     <div className="d-flex justify-content-between align-items-center mb-3">
//                       <h5 className="fw-bold m-0 Seller_text-brown">
//                         Order ID: {order._id ? order._id.slice(-6) : ""}
//                       </h5>
//                       <span className={`badge px-3 py-2 ${
//                         order.orderStatus === "Delivered" ? "bg-success" : 
//                         order.orderStatus === "Shipped" ? "bg-primary" : "bg-warning text-dark"
//                       }`}>
//                         {order.orderStatus || "Pending"}
//                       </span>
//                     </div>
                    
//                     <p className="mb-1"><strong>Customer:</strong> {order.fullName}</p>
//                     <p className="mb-1"><strong>Product:</strong> {order.productTitle}</p>
//                     <p className="mb-1"><strong>Address:</strong> {order.address}</p>
//                     <p className="mb-1"><strong>Phone:</strong> {order.phone}</p>
//                     <p className="mb-3 text-muted small"><strong>Amount:</strong> ₹{order.totalAmount?.toLocaleString()}</p>

//                     <div className="d-flex gap-2">
//                       <button className="Seller_btn-brown btn-sm w-100">Update</button>
//                       <button className="Seller_btn-brown btn-sm w-100">Track</button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Shipping;

// new1





import React, { useState, useEffect } from "react";
import "./Shipping.css";
import logo from "../../assets/logooo.png";
import SellerHeader from "../SellerHeader/SellerHeader";

function Shipping() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Selected order ko track karne ke liye state
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Backend se saare orders fetch karna
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/shawls/orders");
        const data = await response.json();
        
        if (response.ok) {
          setOrders(data);
        } else {
          console.error("Failed to fetch shipping orders");
        }
      } catch (err) {
        console.error("Error connecting to backend:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Track button click hone par order details show karne ka function
  const handleTrackClick = (order) => {
    setSelectedOrder(order);
  };

  // Popup band karne ke liye function
  const closeModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="bg-light min-vh-100 py-5 mt-4">
      <div className="container">
        {/* Header */}
        <SellerHeader />

        {/* Title with Logo */}
        <div className="text-center mb-5 d-flex flex-column align-items-center">
          <img 
            src={logo} 
            alt="Logo" 
            className="img-fluid mb-2 Seller_signup-logo" 
          />
          <h2 className="fw-bold Seller_text-brown">Shipping Management</h2>
          <p className="text-muted">Track and update customer order deliveries</p>
        </div>

        {/* Grid / Loading States */}
        {loading ? (
          <div className="text-center py-5">
            <h5 className="text-muted">Loading shipping details...</h5>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-5">
            <h5 className="text-muted">Abhi tak koi order delivery ke liye nahi aaya hai.</h5>
          </div>
        ) : (
          <div className="row g-4">
            {orders.map((order) => (
              <div key={order._id} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm border-0 rounded-4 p-3 Seller_signup-card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="fw-bold m-0 Seller_text-brown">
                        Order ID: {order._id ? order._id.slice(-6) : ""}
                      </h5>
                      <span className={`badge px-3 py-2 ${
                        order.orderStatus === "Delivered" ? "bg-success" : 
                        order.orderStatus === "Shipped" ? "bg-primary" : "bg-warning text-dark"
                      }`}>
                        {order.orderStatus || "Pending"}
                      </span>
                    </div>
                    
                    <p className="mb-1"><strong>Customer:</strong> {order.fullName}</p>
                    <p className="mb-1"><strong>Product:</strong> {order.productTitle}</p>
                    <p className="mb-1"><strong>Address:</strong> {order.address}</p>
                    <p className="mb-1"><strong>Phone:</strong> {order.phone}</p>
                    <p className="mb-3 text-muted small"><strong>Amount:</strong> ₹{order.totalAmount?.toLocaleString()}</p>

                    <div className="d-flex gap-2">
                      <button className="Seller_btn-brown btn-sm w-100">Update</button>
                      {/* Track Button par click event lagaya hai */}
                      <button 
                        className="Seller_btn-brown btn-sm w-100"
                        onClick={() => handleTrackClick(order)}
                      >
                        Track
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tracking Details Popup / Modal */}
        {selectedOrder && (
          <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content p-3 rounded-4 shadow">
                <div className="modal-header border-0">
                  <h5 className="modal-title fw-bold text-success">📦 Order Tracking Information</h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  <p><strong>Customer Name:</strong> {selectedOrder.fullName}</p>
                  <p><strong>Product:</strong> {selectedOrder.productTitle}</p>
                  <p><strong>Full Database ID:</strong> <span className="badge bg-secondary">{selectedOrder._id}</span></p>
                  <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
                  <p><strong>Payment Status:</strong> {selectedOrder.paymentStatus}</p>
                  {selectedOrder.razorpayPaymentId && (
                    <p><strong>Razorpay Payment ID:</strong> {selectedOrder.razorpayPaymentId}</p>
                  )}
                  <p><strong>Delivery Address:</strong> {selectedOrder.address}</p>
                  <p><strong>Phone Number:</strong> {selectedOrder.phone}</p>
                </div>
                <div className="modal-footer border-0">
                  <button type="button" className="btn btn-dark w-100" onClick={closeModal}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Shipping;