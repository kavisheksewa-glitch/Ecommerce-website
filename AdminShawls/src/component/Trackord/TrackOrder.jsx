// import React, { useState } from "react";

// function TrackOrder() {
//   const [orderId, setOrderId] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (orderId === "") {
//       alert("Please enter your Order ID");
//       return;
//     }

//     alert(`Tracking details for Order ID: ${orderId}`);
//   };

//   return (
//     <div className="container py-5">
//       <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px" }}>
//         <h2 className="text-center mb-4">Track Your Order</h2>

//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label">Order ID</label>

//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter your Order ID"
//               value={orderId}
//               onChange={(e) => setOrderId(e.target.value)}
//             />
//           </div>

//           <button className="btn btn-dark w-100">
//             Track Order
//           </button>
//         </form>

//         <hr />

//         <h5>Order Status</h5>

//         <ul>
//           <li>✔ Order Confirmed</li>
//           <li>📦 Packed</li>
//           <li>🚚 Shipped</li>
//           <li>🏠 Out for Delivery</li>
//           <li>✅ Delivered</li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default TrackOrder;



// new





// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";

// function TrackOrder() {
//   const { state } = useLocation();
//   const [orderId, setOrderId] = useState("");
//   const [orderDetails, setOrderDetails] = useState(null);

//   // Agar Checkout se koi Order ID aayi hai, toh use automatically set kar dena
//   useEffect(() => {
//     if (state?.orderId) {
//       setOrderId(state.orderId);
//       fetchOrderStatus(state.orderId);
//     }
//   }, [state]);

//   const fetchOrderStatus = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/shawls/orders/${id}`); // Agar single order fetch karne ka route ho
//       // Ya fir aap saare orders fetch karke filter bhi kar sakte hain
//     } catch (err) {
//       console.error("Error fetching order:", err);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (orderId === "") {
//       alert("Please enter your Order ID");
//       return;
//     }

//     alert(`Tracking details for Order ID: ${orderId}`);
//   };

//   return (
//     <div className="container py-5">
//       <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px" }}>
//         <h2 className="text-center mb-4">Track Your Order</h2>

//         {/* Agar naya order place hua hai, toh success banner dikhana */}
//         {state?.orderId && (
//           <div className="alert alert-success text-center" role="alert">
//             <strong>Order Placed Successfully!</strong>
//             <p className="mb-0 small">Aapki Order ID yahan niche di gayi hai:</p>
//             <span className="badge bg-dark mt-2 p-2 fs-6">{state.orderId}</span>
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label">Order ID</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter your Order ID"
//               value={orderId}
//               onChange={(e) => setOrderId(e.target.value)}
//             />
//           </div>

//           <button className="btn btn-dark w-100">
//             Track Order
//           </button>
//         </form>

//         <hr />

//         <h5>Order Status</h5>

//         <ul>
//           <li>✔ Order Confirmed</li>
//           <li>📦 Packed</li>
//           <li>🚚 Shipped</li>
//           <li>🏠 Out for Delivery</li>
//           <li>✅ Delivered</li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default TrackOrder;




// new shai



import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function TrackOrder() {
  const { state } = useLocation();
  const [orderId, setOrderId] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (state?.orderId) {
      setOrderId(state.orderId);
      fetchOrderStatus(state.orderId);
    }
  }, [state]);

  const fetchOrderStatus = async (id) => {
    try {
      setErrorMsg("");
      const response = await fetch(`http://localhost:5000/api/shawls/orders/${id}`);
      const data = await response.json();
      
      if (response.ok) {
        setOrderDetails(data);
      } else {
        setErrorMsg(data.message || "Order not found");
        setOrderDetails(null);
      }
    } catch (err) {
      console.error("Error fetching order:", err);
      setErrorMsg("Server error while fetching tracking details.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!orderId.trim()) {
      alert("Please enter your Order ID");
      return;
    }
    fetchOrderStatus(orderId);
  };

  return (
    <div className="container py-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "600px" }}>
        <h2 className="text-center mb-4">Track Your Order</h2>

        {state?.orderId && (
          <div className="alert alert-success text-center" role="alert">
            <strong>Order Placed Successfully!</strong>
            <p className="mb-0 small">Aapki Order ID yahan niche di gayi hai:</p>
            <span className="badge bg-dark mt-2 p-2 fs-6">{state.orderId}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Order ID (Database ID)</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your Order ID"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
          </div>

          <button className="btn btn-dark w-100">
            Track Order
          </button>
        </form>

        {errorMsg && <div className="alert alert-danger mt-3 text-center">{errorMsg}</div>}

        {/* Agar order details mil gayi hain toh display karein */}
        {orderDetails && (
          <div className="mt-4 p-3 border rounded bg-light">
            <h5 className="text-success fw-bold">📦 Order Status Details</h5>
            <p className="mb-1"><strong>Product:</strong> {orderDetails.productTitle}</p>
            <p className="mb-1"><strong>Status:</strong> <span className="badge bg-primary">{orderDetails.orderStatus || "Pending"}</span></p>
            
            {/* Yahan Seller ki bheji hui Tracking ID show hogi */}
            <p className="mb-1">
              <strong>Tracking ID / Courier ID:</strong>{" "}
              {orderDetails.trackingId ? (
                <span className="badge bg-success">{orderDetails.trackingId}</span>
              ) : (
                <span className="text-muted">Not assigned yet by seller</span>
              )}
            </p>
            
            <p className="mb-1"><strong>Delivery Address:</strong> {orderDetails.address}</p>
            <p className="mb-0"><strong>Phone:</strong> {orderDetails.phone}</p>
          </div>
        )}

        <hr className="my-4" />

        <h5>Delivery Status Flow</h5>
        <ul>
          <li>✔ Order Confirmed</li>
          <li>📦 Packed</li>
          <li>🚚 Shipped {orderDetails?.trackingId ? `(Tracking ID: ${orderDetails.trackingId})` : ""}</li>
          <li>🏠 Out for Delivery</li>
          <li>✅ Delivered</li>
        </ul>
      </div>
    </div>
  );
}

export default TrackOrder;