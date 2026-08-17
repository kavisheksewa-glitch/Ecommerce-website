// import React from "react";
// import "./PaymentGateway.css";
// //import logo from "../assets/logooo.png";
// import logo from "../../assets/logooo.png";
// //import SellerHeader from "../SellerHeader";
// import SellerHeader from "../SellerHeader/SellerHeader";
// function PaymentGateway() {
//   const payments = [
//     { id: 1001, customer: "Rahul Sharma", orderId: "ORD001", amount: "₹4,500", method: "UPI", status: "Success", date: "15-07-2026" },
//     { id: 1002, customer: "Priya Singh", orderId: "ORD002", amount: "₹3,200", method: "Credit Card", status: "Pending", date: "15-07-2026" },
//     { id: 1003, customer: "Amit Verma", orderId: "ORD003", amount: "₹5,800", method: "Net Banking", status: "Success", date: "14-07-2026" },
//     { id: 1004, customer: "Neha Gupta", orderId: "ORD004", amount: "₹2,750", method: "Cash on Delivery", status: "Pending", date: "14-07-2026" },
//   ];

//   return (
//     <div className="container py-5 mt-5">
//       <SellerHeader />
//       {/* Header */}
//       <div className="text-center mb-5 d-flex flex-column align-items-center Seller_dashboard-title">
//         <img src={logo} alt="Logo" className="mb-2 Seller_dashboard-logo" style={{ width: "100px" }} />
//         <h2 className="fw-bold">Payment Details</h2>
//       </div>

//       {/* Summary Cards */}
//       <div className="row g-3 mb-5">
//         {[
//           { title: "Total Revenue", val: "₹2,45,000", color: "text-success" },
//           { title: "Today's Payment", val: "₹18,500", color: "text-primary" },
//           { title: "Pending Payment", val: "₹12,000", color: "text-warning" },
//           { title: "Refund", val: "₹2,000", color: "text-danger" },
//         ].map((item, idx) => (
//           <div key={idx} className="col-6 col-md-3">
//             <div className="card shadow-sm border-0 p-3 h-100 text-center Seller_card">
//               <p className="text-muted small mb-1">{item.title}</p>
//               <h4 className={`fw-bold ${item.color}`}>{item.val}</h4>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Payment List Grid */}
//       <div className="row g-4">
//         {payments.map((payment) => (
//           <div key={payment.id} className="col-12 col-md-6 col-lg-4">
//             <div className="card shadow-sm border-0 p-3 h-100 Seller_card">
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h6 className="fw-bold m-0">Payment #{payment.id}</h6>
//                 <span className={`badge ${payment.status === "Success" ? "bg-success" : "bg-warning text-dark"}`}>
//                   {payment.status}
//                 </span>
//               </div>
//               <p className="mb-1"><strong>Customer:</strong> {payment.customer}</p>
//               <p className="mb-1"><strong>Order ID:</strong> {payment.orderId}</p>
//               <p className="mb-1"><strong>Amount:</strong> <span className="text-primary fw-bold">{payment.amount}</span></p>
//               <p className="mb-1"><strong>Method:</strong> {payment.method}</p>
//               <p className="text-muted small mt-2 mb-0">Date: {payment.date}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default PaymentGateway;


// new



import React, { useState, useEffect } from "react";
import "./PaymentGateway.css";
import logo from "../../assets/logooo.png";
import SellerHeader from "../SellerHeader/SellerHeader";

function PaymentGateway() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Component load hote hi backend se orders/payments fetch karna
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/shawls/orders"); // Yahan apna backend API URL check kar lena
        const data = await response.json();
        
        if (response.ok) {
          setPayments(data);
        } else {
          console.error("Failed to fetch payments");
        }
      } catch (err) {
        console.error("Error connecting to backend:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Database ke orders se Total Revenue aur Pending amount automatically calculate karna
  const totalRevenue = payments
    .filter(item => item.paymentStatus === "Paid")
    .reduce((acc, curr) => acc + curr.totalAmount, 0);

  const pendingPayment = payments
    .filter(item => item.paymentStatus === "Pending")
    .reduce((acc, curr) => acc + curr.totalAmount, 0);

  return (
    <div className="container py-5 mt-5">
      <SellerHeader />
      
      {/* Header */}
      <div className="text-center mb-5 d-flex flex-column align-items-center Seller_dashboard-title">
        <img src={logo} alt="Logo" className="mb-2 Seller_dashboard-logo" style={{ width: "100px" }} />
        <h2 className="fw-bold">Payment Details</h2>
      </div>

      {/* Summary Cards */}
      <div className="row g-3 mb-5">
        <div className="col-6 col-md-3">
          <div className="card shadow-sm border-0 p-3 h-100 text-center Seller_card">
            <p className="text-muted small mb-1">Total Revenue (Paid)</p>
            <h4 className="fw-bold text-success">₹{totalRevenue.toLocaleString()}</h4>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card shadow-sm border-0 p-3 h-100 text-center Seller_card">
            <p className="text-muted small mb-1">Pending Payment</p>
            <h4 className="fw-bold text-warning">₹{pendingPayment.toLocaleString()}</h4>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card shadow-sm border-0 p-3 h-100 text-center Seller_card">
            <p className="text-muted small mb-1">Total Orders</p>
            <h4 className="fw-bold text-primary">{payments.length}</h4>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card shadow-sm border-0 p-3 h-100 text-center Seller_card">
            <p className="text-muted small mb-1">Refund</p>
            <h4 className="fw-bold text-danger">₹0</h4>
          </div>
        </div>
      </div>

      {/* Payment List Grid */}
      {loading ? (
        <div className="text-center py-5">
          <h5 className="text-muted">Loading payments...</h5>
        </div>
      ) : payments.length === 0 ? (
        <div className="text-center py-5">
          <h5 className="text-muted">Abhi tak koi order ya payment nahi aayi hai.</h5>
        </div>
      ) : (
        <div className="row g-4">
          {payments.map((payment) => (
            <div key={payment._id} className="col-12 col-md-6 col-lg-4">
              <div className="card shadow-sm border-0 p-3 h-100 Seller_card">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="fw-bold m-0">Order ID: {payment._id ? payment._id.slice(-6) : ""}</h6>
                  <span className={`badge ${payment.paymentStatus === "Paid" ? "bg-success" : "bg-warning text-dark"}`}>
                    {payment.paymentStatus || "Pending"}
                  </span>
                </div>
                <p className="mb-1"><strong>Customer:</strong> {payment.fullName}</p>
                <p className="mb-1"><strong>Product:</strong> {payment.productTitle}</p>
                <p className="mb-1"><strong>Amount:</strong> <span className="text-primary fw-bold">₹{payment.totalAmount?.toLocaleString()}</span></p>
                <p className="mb-1"><strong>Method:</strong> {payment.paymentMethod}</p>
                <p className="text-muted small mt-2 mb-0">
                  Date: {payment.createdAt ? new Date(payment.createdAt).toLocaleDateString() : "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PaymentGateway;