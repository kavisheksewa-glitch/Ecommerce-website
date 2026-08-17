


// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"; // ✅ fixed: correct path (was "react-toastify/ReactToastify.css")

// function Checkout() {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   const product = state?.product;

//   const [quantity, setQuantity] = useState(1);
//   const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

//   const [formData, setFormData] = useState({
//     fullName: "",
//     phone: "",
//     address: "",
//   });

//   if (!product) {
//     return (
//       <div className="container mt-5 text-center">
//         <h2>No Product Selected</h2>
//         <button className="btn btn-dark mt-3" onClick={() => navigate("/")}>
//           Back to Home
//         </button>
//       </div>
//     );
//   }

//   const price = Number(product.price.replace(/[₹,]/g, ""));
//   const total = price * quantity;

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Razorpay Payment Handler
//   const handleRazorpayPayment = () => {
//     // Guard: agar Razorpay script load nahi hua (public/index.html me
//     // <script src="https://checkout.razorpay.com/v1/checkout.js"></script> add karna zaroori hai)
//     if (!window.Razorpay) {
//       toast.error("Payment gateway not loaded. Please try again later.");
//       return;
//     }

//     const options = {
//       key: "rzp_test_TISSbct8luq7js", // Yahan apni Razorpay Key dalein (Dashboard se milegi)
//       amount: total * 100, // Amount paise mein hota hai (e.g. ₹100 = 10000 paise)
//       currency: "INR",
//       name: "Kavi Shawls",
//       description: `Purchase of ${product.title}`,
//       handler: async function (response) {
//         toast.success("🎉 Payment Successful & Order Placed!");

//         // Yahan aap backend API call kar sakte hain order save karne ke liye
//         console.log("Payment ID:", response.razorpay_payment_id);

//         setTimeout(() => {
//           navigate("/");
//         }, 2000);
//       },
//       prefill: {
//         name: formData.fullName,
//         contact: formData.phone,
//       },
//       theme: {
//         color: "#064e3b",
//       },
//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//   };

//   const handleOrder = (e) => {
//     e.preventDefault();

//     if (!formData.fullName || !formData.phone || !formData.address) {
//       toast.error("Please fill in all delivery details!", { autoClose: 2000 });
//       return;
//     }

//     if (paymentMethod === "Online Payment (Razorpay)") {
//       handleRazorpayPayment();
//     } else {
//       // Cash on Delivery Success Logic
//       toast.success("🎉 Your COD order has been placed successfully!", {
//         autoClose: 2000,
//       });

//       setTimeout(() => {
//         navigate("/");
//       }, 2000);
//     }
//   };

//   return (
//     <div className="container my-5">
//       <ToastContainer />
//       <div className="row">
//         {/* Product Details */}
//         <div className="col-lg-5 mb-4">
//           <div className="card shadow border-0">
//             <img
//               src={product.image}
//               alt={product.title}
//               className="card-img-top bg-light"
//               style={{ height: "450px", objectFit: "contain" }}
//             />
//             <div className="card-body">
//               <h3>{product.title}</h3>
//               <p className="text-muted">{product.description}</p>
//               <h4 className="text-success fw-bold">{product.price}</h4>
//             </div>
//           </div>
//         </div>

//         {/* Checkout Form */}
//         <div className="col-lg-7">
//           <div className="card shadow border-0 p-4">
//             <h2 className="mb-4">Checkout & Payment</h2>

//             <form onSubmit={handleOrder}>
//               <h5 className="mb-3 text-secondary">1. Shipping Information</h5>
//               <div className="mb-3">
//                 <label className="form-label">Full Name</label>
//                 <input
//                   type="text"
//                   name="fullName"
//                   className="form-control"
//                   placeholder="Enter your full name"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Phone Number</label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   className="form-control"
//                   placeholder="Enter phone number"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Delivery Address</label>
//                 <textarea
//                   name="address"
//                   className="form-control"
//                   rows="2"
//                   placeholder="Enter your address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   required
//                 ></textarea>
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Quantity</label>
//                 <input
//                   type="number"
//                   className="form-control"
//                   min="1"
//                   value={quantity}
//                   onChange={(e) => setQuantity(Number(e.target.value))}
//                   required
//                 />
//               </div>

//               <hr className="my-4" />

//               <h5 className="mb-3 text-secondary">2. Select Payment Method</h5>
//               <div className="mb-3">
//                 <select
//                   className="form-select"
//                   value={paymentMethod}
//                   onChange={(e) => setPaymentMethod(e.target.value)}
//                 >
//                   <option value="Cash on Delivery">Cash on Delivery</option>
//                   <option value="Online Payment (Razorpay)">
//                     Online Payment (UPI, Credit/Debit Card, NetBanking)
//                   </option>
//                 </select>
//               </div>

//               <hr />

//               <div className="d-flex justify-content-between align-items-center mb-4">
//                 <h4 className="m-0">Total Amount:</h4>
//                 <h3 className="text-success fw-bold m-0">₹{total.toLocaleString()}</h3>
//               </div>

//               <button
//                 type="submit"
//                 className="btn w-100 py-2 text-white fw-bold shadow-sm"
//                 style={{ backgroundColor: "#064e3b" }}
//               >
//                 {paymentMethod === "Online Payment (Razorpay)" ? "Pay Now & Place Order" : "Place Order (COD)"}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Checkout;











// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Checkout() {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   const product = state?.product;
//   const userId = localStorage.getItem("userId") || "guest_user_id";

//   const [quantity, setQuantity] = useState(1);
//   const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
//   const [placing, setPlacing] = useState(false);

//   const [formData, setFormData] = useState({
//     fullName: "",
//     phone: "",
//     address: "",
//   });

//   if (!product) {
//     return (
//       <div className="container mt-5 text-center">
//         <h2>No Product Selected</h2>
//         <button className="btn btn-dark mt-3" onClick={() => navigate("/")}>
//           Back to Home
//         </button>
//       </div>
//     );
//   }

//   const price = Number(product.price.replace(/[₹,]/g, ""));
//   const total = price * quantity;

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Backend mein order save karne ka common function
//   const saveOrderToBackend = async ({ paymentStatus, razorpayPaymentId }) => {
//     const response = await fetch("http://localhost:5000/api/shawls/orders/add", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         userId,
//         productId: product.id,
//         productTitle: product.title,
//         productImage: product.image,
//         price,
//         quantity,
//         totalAmount: total,
//         fullName: formData.fullName,
//         phone: formData.phone,
//         address: formData.address,
//         paymentMethod,
//         paymentStatus,
//         razorpayPaymentId: razorpayPaymentId || "",
//       }),
//     });

//     const data = await response.json();
//     if (!response.ok) {
//       throw new Error(data.message || "Failed to save order");
//     }
//     return data;
//   };

//   // Razorpay Payment Handler
//   const handleRazorpayPayment = () => {
//     if (!window.Razorpay) {
//       toast.error("Payment gateway not loaded. Please try again later.");
//       return;
//     }

//     const options = {
//       key: "rzp_test_TISSbct8luq7js",
//       amount: total * 100,
//       currency: "INR",
//       name: "Kavi Shawls",
//       description: `Purchase of ${product.title}`,
//       handler: async function (response) {
//         try {
//           await saveOrderToBackend({
//             paymentStatus: "Paid",
//             razorpayPaymentId: response.razorpay_payment_id,
//           });
//           toast.success("🎉 Payment Successful & Order Placed!");
//           setTimeout(() => {
//             navigate("/track-order");
//           }, 2000);
//         } catch (err) {
//           console.error("Error saving order after payment:", err);
//           toast.error(
//             "Payment succeeded but saving the order failed. Please contact support with Payment ID: " +
//               response.razorpay_payment_id
//           );
//         }
//       },
//       prefill: {
//         name: formData.fullName,
//         contact: formData.phone,
//       },
//       theme: {
//         color: "#064e3b",
//       },
//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//   };

//   const handleOrder = async (e) => {
//     e.preventDefault();

//     if (!formData.fullName || !formData.phone || !formData.address) {
//       toast.error("Please fill in all delivery details!", { autoClose: 2000 });
//       return;
//     }

//     if (paymentMethod === "Online Payment (Razorpay)") {
//       handleRazorpayPayment();
//       return;
//     }

//     // Cash on Delivery -> seedha backend mein save
//     setPlacing(true);
//     try {
//       await saveOrderToBackend({ paymentStatus: "Pending" });
//       toast.success("🎉 Your COD order has been placed successfully!", {
//         autoClose: 2000,
//       });
//       setTimeout(() => {
//         navigate("/track-order");
//       });
//     } catch (err) {
//       console.error("Error placing order:", err);
//       toast.error("Failed to place order. Please try again.");
//     } finally {
//       setPlacing(false);
//     }
//   };

//   return (
//     <div className="container my-5">
//       <ToastContainer />
//       <div className="row">
//         {/* Product Details */}
//         <div className="col-lg-5 mb-4">
//           <div className="card shadow border-0">
//             <img
//               src={product.image}
//               alt={product.title}
//               className="card-img-top bg-light"
//               style={{ height: "450px", objectFit: "contain" }}
//             />
//             <div className="card-body">
//               <h3>{product.title}</h3>
//               <p className="text-muted">{product.description}</p>
//               <h4 className="text-success fw-bold">{product.price}</h4>
//             </div>
//           </div>
//         </div>

//         {/* Checkout Form */}
//         <div className="col-lg-7">
//           <div className="card shadow border-0 p-4">
//             <h2 className="mb-4">Checkout & Payment</h2>

//             <form onSubmit={handleOrder}>
//               <h5 className="mb-3 text-secondary">1. Shipping Information</h5>
//               <div className="mb-3">
//                 <label className="form-label">Full Name</label>
//                 <input
//                   type="text"
//                   name="fullName"
//                   className="form-control"
//                   placeholder="Enter your full name"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Phone Number</label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   className="form-control"
//                   placeholder="Enter phone number"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Delivery Address</label>
//                 <textarea
//                   name="address"
//                   className="form-control"
//                   rows="2"
//                   placeholder="Enter your address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   required
//                 ></textarea>
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Quantity</label>
//                 <input
//                   type="number"
//                   className="form-control"
//                   min="1"
//                   value={quantity}
//                   onChange={(e) => setQuantity(Number(e.target.value))}
//                   required
//                 />
//               </div>

//               <hr className="my-4" />

//               <h5 className="mb-3 text-secondary">2. Select Payment Method</h5>
//               <div className="mb-3">
//                 <select
//                   className="form-select"
//                   value={paymentMethod}
//                   onChange={(e) => setPaymentMethod(e.target.value)}
//                 >
//                   <option value="Cash on Delivery">Cash on Delivery</option>
//                   <option value="Online Payment (Razorpay)">
//                     Online Payment (UPI, Credit/Debit Card, NetBanking)
//                   </option>
//                 </select>
//               </div>

//               <hr />

//               <div className="d-flex justify-content-between align-items-center mb-4">
//                 <h4 className="m-0">Total Amount:</h4>
//                 <h3 className="text-success fw-bold m-0">₹{total.toLocaleString()}</h3>
//               </div>

//               <button
//                 type="submit"
//                 disabled={placing}
//                 className="btn w-100 py-2 text-white fw-bold shadow-sm"
//                 style={{ backgroundColor: "#064e3b" }}
//               >
//                 {placing
//                   ? "Placing Order..."
//                   : paymentMethod === "Online Payment (Razorpay)"
//                   ? "Pay Now & Place Order"
//                   : "Place Order (COD)"}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Checkout;



// new






import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const product = state?.product;
  const userId = localStorage.getItem("userId") || "guest_user_id";

  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [placing, setPlacing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
  });

  if (!product) {
    return (
      <div className="container mt-5 text-center">
        <h2>No Product Selected</h2>
        <button className="btn btn-dark mt-3" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  const price = Number(product.price.replace(/[₹,]/g, ""));
  const total = price * quantity;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Backend mein order save karne ka common function
  const saveOrderToBackend = async ({ paymentStatus, razorpayPaymentId }) => {
    const response = await fetch("http://localhost:5000/api/shawls/orders/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        productId: product.id,
        productTitle: product.title,
        productImage: product.image,
        price,
        quantity,
        totalAmount: total,
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        paymentMethod,
        paymentStatus,
        razorpayPaymentId: razorpayPaymentId || "",
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to save order");
    }
    return data;
  };

  // Razorpay Payment Handler
  const handleRazorpayPayment = () => {
    if (!window.Razorpay) {
      toast.error("Payment gateway not loaded. Please try again later.");
      return;
    }

    const options = {
      key: "rzp_test_TISSbct8luq7js",
      amount: total * 100,
      currency: "INR",
      name: "Kavi Shawls",
      description: `Purchase of ${product.title}`,
      handler: async function (response) {
        try {
          const data = await saveOrderToBackend({
            paymentStatus: "Paid",
            razorpayPaymentId: response.razorpay_payment_id,
          });
          toast.success("🎉 Payment Successful & Order Placed!");
          setTimeout(() => {
            navigate("/track-order", { state: { orderId: data.order._id } });
          }, 2000);
        } catch (err) {
          console.error("Error saving order after payment:", err);
          toast.error(
            "Payment succeeded but saving the order failed. Please contact support with Payment ID: " +
              response.razorpay_payment_id
          );
        }
      },
      prefill: {
        name: formData.fullName,
        contact: formData.phone,
      },
      theme: {
        color: "#064e3b",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleOrder = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phone || !formData.address) {
      toast.error("Please fill in all delivery details!", { autoClose: 2000 });
      return;
    }

    if (paymentMethod === "Online Payment (Razorpay)") {
      handleRazorpayPayment();
      return;
    }

    // Cash on Delivery -> seedha backend mein save karke track-order par bhejna with Order ID
    setPlacing(true);
    try {
      const data = await saveOrderToBackend({ paymentStatus: "Pending" });
      toast.success("🎉 Your COD order has been placed successfully!", {
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate("/track-order", { state: { orderId: data.order._id } });
      }, 2000);
    } catch (err) {
      console.error("Error placing order:", err);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="container my-5">
      <ToastContainer />
      <div className="row">
        {/* Product Details */}
        <div className="col-lg-5 mb-4">
          <div className="card shadow border-0">
            <img
              src={product.image}
              alt={product.title}
              className="card-img-top bg-light"
              style={{ height: "450px", objectFit: "contain" }}
            />
            <div className="card-body">
              <h3>{product.title}</h3>
              <p className="text-muted">{product.description}</p>
              <h4 className="text-success fw-bold">{product.price}</h4>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="col-lg-7">
          <div className="card shadow border-0 p-4">
            <h2 className="mb-4">Checkout & Payment</h2>

            <form onSubmit={handleOrder}>
              <h5 className="mb-3 text-secondary">1. Shipping Information</h5>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  className="form-control"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Delivery Address</label>
                <textarea
                  name="address"
                  className="form-control"
                  rows="2"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  required
                />
              </div>

              <hr className="my-4" />

              <h5 className="mb-3 text-secondary">2. Select Payment Method</h5>
              <div className="mb-3">
                <select
                  className="form-select"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="Cash on Delivery">Cash on Delivery</option>
                  <option value="Online Payment (Razorpay)">
                    Online Payment (UPI, Credit/Debit Card, NetBanking)
                  </option>
                </select>
              </div>

              <hr />

              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="m-0">Total Amount:</h4>
                <h3 className="text-success fw-bold m-0">₹{total.toLocaleString()}</h3>
              </div>

              <button
                type="submit"
                disabled={placing}
                className="btn w-100 py-2 text-white fw-bold shadow-sm"
                style={{ backgroundColor: "#064e3b" }}
              >
                {placing
                  ? "Placing Order..."
                  : paymentMethod === "Online Payment (Razorpay)"
                  ? "Pay Now & Place Order"
                  : "Place Order (COD)"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;