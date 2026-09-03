


//claude office 




// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Shipping.css";
// import logo from "../../assets/logooo.png";
// import SellerHeader from "../SellerHeader/SellerHeader";

// function Shipping() {
//   const navigate = useNavigate();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [trackingIdInput, setTrackingIdInput] = useState("");

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   // ✅ Naya secure route — server-side JWT se seller ki id nikal ke
//   // sirf uske orders return karta hai
//   const fetchOrders = async () => {
//     const sellerToken = localStorage.getItem("sellerToken");

//     if (!sellerToken) {
//       navigate("/seller/login");
//       return;
//     }

//     try {
//       const response = await fetch("https://ecommerce-website-ggui.onrender.com/api/shawls/orders/seller/my-orders", {
//         headers: { Authorization: `Bearer ${sellerToken}` },
//       });
//       const data = await response.json();
//       if (response.ok && data.success && Array.isArray(data.orders)) {
//         setOrders(data.orders);
//       } else {
//         console.error("Failed to fetch shipping orders");
//       }
//     } catch (err) {
//       console.error("Error connecting to backend:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTrackClick = (order) => {
//     setSelectedOrder(order);
//     setTrackingIdInput(order.trackingId || "");
//   };

//   const closeModal = () => {
//     setSelectedOrder(null);
//     setTrackingIdInput("");
//   };

//   const handleSendTrackingId = async (orderId) => {
//     if (!trackingIdInput.trim()) {
//       alert("Please enter a valid tracking ID!");
//       return;
//     }

//     try {
//       const response = await fetch(`https://ecommerce-website-ggui.onrender.com/api/shawls/orders/${orderId}/track`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ trackingId: trackingIdInput }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Tracking ID successfully sent to the customer!");
//         fetchOrders();
//         closeModal();
//       } else {
//         alert(data.message || "Failed to update tracking ID");
//       }
//     } catch (err) {
//       console.error("Error updating tracking ID:", err);
//       alert("Server error while updating tracking ID.");
//     }
//   };

//   return (
//     <div className="bg-light min-vh-100 py-5 mt-4">
//       <div className="container">
//         <SellerHeader />

//         <div className="text-center mb-5 d-flex flex-column align-items-center">
//           <img src={logo} alt="Logo" className="img-fluid mb-2 Seller_signup-logo" />
//           <h2 className="fw-bold Seller_text-brown">Shipping Management</h2>
//           <p className="text-muted">Track and update customer order deliveries</p>
//         </div>

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
//                       <button
//                         className="Seller_btn-brown btn-sm w-100"
//                         onClick={() => handleTrackClick(order)}
//                       >
//                         Track / Send ID
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {selectedOrder && (
//           <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
//             <div className="modal-dialog modal-dialog-centered">
//               <div className="modal-content p-3 rounded-4 shadow">
//                 <div className="modal-header border-0">
//                   <h5 className="modal-title fw-bold text-success">📦 Order Tracking Information</h5>
//                   <button type="button" className="btn-close" onClick={closeModal}></button>
//                 </div>
//                 <div className="modal-body">
//                   <p><strong>Customer Name:</strong> {selectedOrder.fullName}</p>
//                   <p><strong>Product:</strong> {selectedOrder.productTitle}</p>
//                   <p><strong>Full Database ID:</strong> <span className="badge bg-secondary">{selectedOrder._id}</span></p>
//                   <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
//                   <p><strong>Delivery Address:</strong> {selectedOrder.address}</p>

//                   <div className="mb-3 mt-3">
//                     <label className="form-label fw-bold">Enter Courier Tracking ID:</label>
//                     <div className="input-group">
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="e.g., TRK123456789"
//                         value={trackingIdInput}
//                         onChange={(e) => setTrackingIdInput(e.target.value)}
//                       />
//                       <button
//                         className="btn btn-success"
//                         type="button"
//                         onClick={() => handleSendTrackingId(selectedOrder._id)}
//                       >
//                         Send
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="modal-footer border-0">
//                   <button type="button" className="btn btn-dark w-100" onClick={closeModal}>
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Shipping;





//3 sept removed cancllled product




import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Shipping.css";
import logo from "../../assets/logooo.png";
import SellerHeader from "../SellerHeader/SellerHeader";

function Shipping() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackingIdInput, setTrackingIdInput] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Naya secure route — server-side JWT se seller ki id nikal ke
  // sirf uske orders return karta hai
  const fetchOrders = async () => {
    const sellerToken = localStorage.getItem("sellerToken");

    if (!sellerToken) {
      navigate("/seller/login");
      return;
    }

    try {
      const response = await fetch("https://ecommerce-website-ggui.onrender.com/api/shawls/orders/seller/my-orders", {
        headers: { Authorization: `Bearer ${sellerToken}` },
      });
      const data = await response.json();
      if (response.ok && data.success && Array.isArray(data.orders)) {
        // ✅ Cancelled orders ko shipping list se hata do — inko track/update
        // karne ki zaroorat nahi hoti
        const activeOrders = data.orders.filter(
          (o) => o.orderStatus !== "Cancelled" && o.orderStatus !== "cancelled"
        );
        setOrders(activeOrders);
      } else {
        console.error("Failed to fetch shipping orders");
      }
    } catch (err) {
      console.error("Error connecting to backend:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTrackClick = (order) => {
    setSelectedOrder(order);
    setTrackingIdInput(order.trackingId || "");
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setTrackingIdInput("");
  };

  const handleSendTrackingId = async (orderId) => {
    if (!trackingIdInput.trim()) {
      alert("Please enter a valid tracking ID!");
      return;
    }

    try {
      const response = await fetch(`https://ecommerce-website-ggui.onrender.com/api/shawls/orders/${orderId}/track`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trackingId: trackingIdInput }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Tracking ID successfully sent to the customer!");
        fetchOrders();
        closeModal();
      } else {
        alert(data.message || "Failed to update tracking ID");
      }
    } catch (err) {
      console.error("Error updating tracking ID:", err);
      alert("Server error while updating tracking ID.");
    }
  };

  return (
    <div className="bg-light min-vh-100 py-5 mt-4">
      <div className="container">
        <SellerHeader />

        <div className="text-center mb-5 d-flex flex-column align-items-center">
          <img src={logo} alt="Logo" className="img-fluid mb-2 Seller_signup-logo" />
          <h2 className="fw-bold Seller_text-brown">Shipping Management</h2>
          <p className="text-muted">Track and update customer order deliveries</p>
        </div>

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
                      <button
                        className="Seller_btn-brown btn-sm w-100"
                        onClick={() => handleTrackClick(order)}
                      >
                        Track / Send ID
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

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
                  <p><strong>Delivery Address:</strong> {selectedOrder.address}</p>

                  <div className="mb-3 mt-3">
                    <label className="form-label fw-bold">Enter Courier Tracking ID:</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g., TRK123456789"
                        value={trackingIdInput}
                        onChange={(e) => setTrackingIdInput(e.target.value)}
                      />
                      <button
                        className="btn btn-success"
                        type="button"
                        onClick={() => handleSendTrackingId(selectedOrder._id)}
                      >
                        Send
                      </button>
                    </div>
                  </div>
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