// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./cart.css";

// function Cart() {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const userId = localStorage.getItem("userId") || "guest_user_id";

//   const fetchCartItems = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/shawls/cart/${userId}`);
//       const data = await response.json();
//       setCartItems(data);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching cart:", err);
//       toast.error("Failed to load cart items");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCartItems();
//   }, [userId]);

//   const handleRemove = async (id) => {
//     try {
//       //const response = await fetch(`http://localhost:5000/api/cart/remove/${id}`, { new>
//       const response = await fetch(`http://localhost:5000/api/shawls/cart/remove/${id}`, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         toast.success("Item removed from cart");
//         fetchCartItems();
//       } else {
//         toast.error("Failed to remove item");
//       }
//     } catch (err) {
//       console.error("Error removing item:", err);
//       toast.error("Server connection failed");
//     }
//   };

//   const totalPrice = cartItems.reduce((total, item) => {
//     const priceNumber = Number(item.price.replace(/[^0-9]/g, ""));
//     return total + priceNumber * item.quantity;
//   }, 0);

//   if (loading) {
//     return <div className="text-center my-5 fw-bold fs-4">Loading Cart...</div>;
//   }

//   return (
//     <div className="container my-5">
//       <ToastContainer />
//       <h1 className="mb-4 text-center">Your Shopping Cart 🛒</h1>

//       {cartItems.length === 0 ? (
//         <div className="text-center my-5">
//           <p className="text-muted fs-5">Your cart is empty!</p>
//           <button 
//             className="btn customer_btn-dark mt-2" 
//             onClick={() => navigate("/")}
//           >
//             Continue Shopping
//           </button>
//         </div>
//       ) : (
//         <div className="row g-4">
//           <div className="col-lg-8">
//             {cartItems.map((item) => (
//               <div className="card customer_card mb-3 border-0 shadow-sm p-3 imgc" key={item._id}>
//                 <div className="row align-items-center">
//                   <div className="col-md-3 text-center">
//                     <img 
//                       src={item.image} 
//                       alt={item.title} 
//                       className="img-fluid rounded customer_card-img" 
//                     />
//                   </div>
//                   <div className="col-md-6">
//                     <h5 className="fw-bold">{item.title}</h5>
//                     <p className="text-muted small mb-1">{item.description}</p>
//                     <p className="fw-bold text-danger mb-0">{item.price} (Qty: {item.quantity})</p>
//                   </div>
//                   <div className="col-md-3 text-end">
//                     <button 
//                       onClick={() => handleRemove(item._id)}
//                       className="btn btn-outline-danger btn-sm fw-semibold"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Cart Summary */}
//           <div className="col-lg-4">
//             <div className="card customer_card border-0 shadow-sm p-4 bg-light">
//               <h4 className="fw-bold mb-3">Order Summary</h4>
//               <hr />
//               <div className="d-flex justify-content-between mb-3">
//                 <span className="fw-semibold">Total Amount:</span>
//                 <span className="fw-bold fs-5 text-success">₹{totalPrice.toLocaleString()}</span>
//               </div>
//               <button 
//                 className="btn customer_btn-dark w-100 fw-bold text-white py-2"
//                 style={{ background: "linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)", border: "none" }}
//                 onClick={() => toast.info("Proceeding to checkout...")}
//               >
//                 Proceed to Checkout ⚡
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Cart;



// sahi



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./cart.css";

// function Cart() {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showCheckoutModal, setShowCheckoutModal] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("COD"); // 'COD' or 'ONLINE'
  
//   const navigate = useNavigate();
//   const userId = localStorage.getItem("userId") || "guest_user_id";

//   const fetchCartItems = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/shawls/cart/${userId}`);
//       const data = await response.json();
//       setCartItems(data);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching cart:", err);
//       toast.error("Failed to load cart items");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCartItems();
//     // Load Razorpay script dynamically
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     document.body.appendChild(script);
//   }, [userId]);

//   const handleRemove = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/shawls/cart/remove/${id}`, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         toast.success("Item removed from cart");
//         fetchCartItems();
//       } else {
//         toast.error("Failed to remove item");
//       }
//     } catch (err) {
//       console.error("Error removing item:", err);
//       toast.error("Server connection failed");
//     }
//   };

//   const totalPrice = cartItems.reduce((total, item) => {
//     const priceNumber = Number(item.price.replace(/[^0-9]/g, ""));
//     return total + priceNumber * item.quantity;
//   }, 0);

//   // Handle Razorpay Online Payment Integration
//   const handleOnlinePayment = () => {
//     const options = {
//       key: "YOUR_RAZORPAY_KEY_ID", // Yahan apni Razorpay test/live key daalein
//       amount: totalPrice * 100, // Amount in paise
//       currency: "INR",
//       name: "Your Store Name",
//       description: "Order Payment",
//       handler: function (response) {
//         toast.success(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
//         setShowCheckoutModal(false);
//         // Aap yahan order success hone par backend API ko call kar sakte hain
//       },
//       prefill: {
//         name: "Customer Name",
//         email: "customer@example.com",
//         contact: "9999999999",
//       },
//       theme: {
//         color: "#ff416c",
//       },
//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//   };

//   // Handle Order Placement Confirmation
//   const handleConfirmOrder = () => {
//     if (paymentMethod === "COD") {
//       toast.success("Order Placed Successfully via Cash on Delivery! 🎉");
//       setShowCheckoutModal(false);
//       // COD ke liye backend order placement API call yahan karein
//     } else {
//       handleOnlinePayment();
//     }
//   };

//   if (loading) {
//     return <div className="text-center my-5 fw-bold fs-4">Loading Cart...</div>;
//   }

//   return (
//     <div className="container my-5">
//       <ToastContainer />
//       <h1 className="mb-4 text-center">Your Shopping Cart 🛒</h1>

//       {cartItems.length === 0 ? (
//         <div className="text-center my-5">
//           <p className="text-muted fs-5">Your cart is empty!</p>
//           <button 
//             className="btn customer_btn-dark mt-2" 
//             onClick={() => navigate("/")}
//           >
//             Continue Shopping
//           </button>
//         </div>
//       ) : (
//         <div className="row g-4">
//           <div className="col-lg-8">
//             {cartItems.map((item) => (
//               <div className="card customer_card mb-3 border-0 shadow-sm p-3 imgc" key={item._id}>
//                 <div className="row align-items-center">
//                   <div className="col-md-3 text-center">
//                     <img 
//                       src={item.image} 
//                       alt={item.title} 
//                       className="img-fluid rounded customer_card-img" 
//                     />
//                   </div>
//                   <div className="col-md-6">
//                     <h5 className="fw-bold">{item.title}</h5>
//                     <p className="text-muted small mb-1">{item.description}</p>
//                     <p className="fw-bold text-danger mb-0">{item.price} (Qty: {item.quantity})</p>
//                   </div>
//                   <div className="col-md-3 text-end">
//                     <button 
//                       onClick={() => handleRemove(item._id)}
//                       className="btn btn-outline-danger btn-sm fw-semibold"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Cart Summary */}
//           <div className="col-lg-4">
//             <div className="card customer_card border-0 shadow-sm p-4 bg-light">
//               <h4 className="fw-bold mb-3">Order Summary</h4>
//               <hr />
//               <div className="d-flex justify-content-between mb-3">
//                 <span className="fw-semibold">Total Amount:</span>
//                 <span className="fw-bold fs-5 text-success">₹{totalPrice.toLocaleString()}</span>
//               </div>
//               <button 
//                 className="btn customer_btn-dark w-100 fw-bold text-white py-2"
//                 style={{ background: "linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)", border: "none" }}
//                 onClick={() => setShowCheckoutModal(true)}
//               >
//                 Proceed to Checkout ⚡
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Checkout Payment Method Modal */}
//       {showCheckoutModal && (
//         <div 
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0,0,0,0.5)",
//             zIndex: 1050,
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center"
//           }}
//         >
//           <div className="bg-white p-4 rounded shadow w-100" style={{ maxWidth: "400px" }}>
//             <h4 className="fw-bold mb-3">Select Payment Method</h4>
//             <p className="text-muted small">Choose how you want to pay for this order.</p>
            
//             <div className="mb-3">
//               <div className="form-check mb-2 p-2 border rounded" style={{ cursor: "pointer" }}>
//                 <input 
//                   className="form-check-input ms-1" 
//                   type="radio" 
//                   name="paymentMethod" 
//                   id="cod" 
//                   value="COD" 
//                   checked={paymentMethod === "COD"} 
//                   onChange={() => setPaymentMethod("COD")}
//                 />
//                 <label className="form-check-label ms-2 fw-semibold" htmlFor="cod" style={{ cursor: "pointer" }}>
//                   💵 Cash on Delivery (COD)
//                 </label>
//               </div>

//               <div className="form-check p-2 border rounded" style={{ cursor: "pointer" }}>
//                 <input 
//                   className="form-check-input ms-1" 
//                   type="radio" 
//                   name="paymentMethod" 
//                   id="online" 
//                   value="ONLINE" 
//                   checked={paymentMethod === "ONLINE"} 
//                   onChange={() => setPaymentMethod("ONLINE")}
//                 />
//                 <label className="form-check-label ms-2 fw-semibold" htmlFor="online" style={{ cursor: "pointer" }}>
//                   💳 Online Payment (Razorpay / UPI / Card)
//                 </label>
//               </div>
//             </div>

//             <div className="d-flex justify-content-end gap-2">
//               <button 
//                 className="btn btn-outline-secondary btn-sm" 
//                 onClick={() => setShowCheckoutModal(false)}
//               >
//                 Cancel
//               </button>
//               <button 
//                 className="btn btn-success btn-sm px-4 fw-bold" 
//                 onClick={handleConfirmOrder}
//               >
//                 {paymentMethod === "COD" ? "Place Order" : "Pay Now"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Cart;




// sahi1






// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./cart.css";

// function Cart() {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const userId = localStorage.getItem("userId") || "guest_user_id";

//   const fetchCartItems = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/shawls/cart/${userId}`);
//       const data = await response.json();
//       setCartItems(data);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching cart:", err);
//       toast.error("Failed to load cart items");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCartItems();
//   }, [userId]);

//   const handleRemove = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/shawls/cart/remove/${id}`, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         toast.success("Item removed from cart");
//         fetchCartItems();
//       } else {
//         toast.error("Failed to remove item");
//       }
//     } catch (err) {
//       console.error("Error removing item:", err);
//       toast.error("Server connection failed");
//     }
//   };

//   // Navigate to Checkout page with the selected product
//   const handleBuyNow = (item) => {
//     navigate("/checkout", { state: { product: item } });
//   };

//   if (loading) {
//     return <div className="text-center my-5 fw-bold fs-4">Loading Cart...</div>;
//   }

//   return (
//     <div className="container my-5">
//       <ToastContainer />
//       <h1 className="mb-4 text-center">Your Shopping Cart 🛒</h1>

//       {cartItems.length === 0 ? (
//         <div className="text-center my-5">
//           <p className="text-muted fs-5">Your cart is empty!</p>
//           <button 
//             className="btn btn-dark mt-2" 
//             onClick={() => navigate("/")}
//           >
//             Continue Shopping
//           </button>
//         </div>
//       ) : (
//         <div className="row g-4 justify-content-center">
//           <div className="col-lg-10">
//             {cartItems.map((item) => (
//               <div className="card customer_card mb-3 border-0 shadow-sm p-3" key={item._id}>
//                 <div className="row align-items-center">
//                   <div className="col-md-2 text-center">
//                     <img 
//                       src={item.image} 
//                       alt={item.title} 
//                       className="img-fluid rounded" 
//                       style={{ height: "100px", objectFit: "cover" }}
//                     />
//                   </div>
//                   <div className="col-md-6">
//                     <h5 className="fw-bold">{item.title}</h5>
//                     <p className="text-muted small mb-1">{item.description}</p>
//                     <p className="fw-bold text-danger mb-0">{item.price} (Qty: {item.quantity})</p>
//                   </div>
                  
//                   {/* Buttons Section */}
//                   <div className="col-md-4 text-md-end mt-3 mt-md-0 d-flex gap-2 justify-content-md-end">
//                     <button 
//                       onClick={() => handleBuyNow(item)}
//                       className="btn btn-warning btn-sm fw-bold text-dark px-3"
//                     >
//                       ⚡ Buy Now
//                     </button>
//                     <button 
//                       onClick={() => handleRemove(item._id)}
//                       className="btn btn-outline-danger btn-sm fw-semibold px-3"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Cart;



// new middlewar




// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./cart.css";

// function Cart() {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const fetchCartItems = async () => {
//     const token = localStorage.getItem("token"); // 👈 Token nikalein
//     try {
//       const response = await fetch(`http://localhost:5000/api/customer/cart`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}` // 👈 Header mein token bhejein
//         }
//       });
//       const data = await response.json();
//       setCartItems(data);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching cart:", err);
//       toast.error("Failed to load cart items");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCartItems();
//   }, []);

//   const handleRemove = async (id) => {
//     const token = localStorage.getItem("token"); // 👈 Token nikalein
//     try {
//       const response = await fetch(`http://localhost:5000/api/customer/cart/remove/${id}`, {
//         method: "DELETE",
//         headers: {
//           "Authorization": `Bearer ${token}` // 👈 Header mein token bhejein
//         }
//       });

//       if (response.ok) {
//         toast.success("Item removed from cart");
//         fetchCartItems();
//       } else {
//         toast.error("Failed to remove item");
//       }
//     } catch (err) {
//       console.error("Error removing item:", err);
//       toast.error("Server connection failed");
//     }
//   };

//   // Navigate to Checkout page with the selected product
//   const handleBuyNow = (item) => {
//     navigate("/checkout", { state: { product: item } });
//   };

//   if (loading) {
//     return <div className="text-center my-5 fw-bold fs-4">Loading Cart...</div>;
//   }

//   return (
//     <div className="container my-5">
//       <ToastContainer />
//       <h1 className="mb-4 text-center">Your Shopping Cart 🛒</h1>

//       {cartItems.length === 0 ? (
//         <div className="text-center my-5">
//           <p className="text-muted fs-5">Your cart is empty!</p>
//           <button 
//             className="btn btn-dark mt-2" 
//             onClick={() => navigate("/")}
//           >
//             Continue Shopping
//           </button>
//         </div>
//       ) : (
//         <div className="row g-4 justify-content-center">
//           <div className="col-lg-10">
//             {cartItems.map((item) => (
//               <div className="card customer_card mb-3 border-0 shadow-sm p-3" key={item._id}>
//                 <div className="row align-items-center">
//                   <div className="col-md-2 text-center">
//                     <img 
//                       src={item.image} 
//                       alt={item.title} 
//                       className="img-fluid rounded" 
//                       style={{ height: "100px", objectFit: "cover" }}
//                     />
//                   </div>
//                   <div className="col-md-6">
//                     <h5 className="fw-bold">{item.title}</h5>
//                     <p className="text-muted small mb-1">{item.description}</p>
//                     <p className="fw-bold text-danger mb-0">Rs. {item.price} (Qty: {item.quantity})</p>
//                   </div>
                  
//                   {/* Buttons Section */}
//                   <div className="col-md-4 text-md-end mt-3 mt-md-0 d-flex gap-2 justify-content-md-end">
//                     <button 
//                       onClick={() => handleBuyNow(item)}
//                       className="btn btn-warning btn-sm fw-bold text-dark px-3"
//                     >
//                       ⚡ Buy Now
//                     </button>
//                     <button 
//                       onClick={() => handleRemove(item._id)}
//                       className="btn btn-outline-danger btn-sm fw-semibold px-3"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Cart;



//morning




// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./cart.css";

// function cart() {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const fetchCartItems = async () => {
//     const token = localStorage.getItem("token");
//     try {
//       const response = await fetch(`http://localhost:5000/api/customer/cart`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`
//         }
//       });
//       const data = await response.json();

//       console.log("Backend se aaya data:", data);
      
//       // Fix: Backend object se sirf 'cart' array nikal kar state me save karein
//       setCartItems(data.cart || []);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching cart:", err);
//       toast.error("Failed to load cart items");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCartItems();
//   }, []);

//   const handleRemove = async (id) => {
//     const token = localStorage.getItem("token");
//     try {
//       const response = await fetch(`http://localhost:5000/api/customer/cart/remove/${id}`, {
//         method: "DELETE",
//         headers: {
//           "Authorization": `Bearer ${token}`
//         }
//       });

//       if (response.ok) {
//         toast.success("Item removed from cart");
//         fetchCartItems();
//       } else {
//         toast.error("Failed to remove item");
//       }
//     } catch (err) {
//       console.error("Error removing item:", err);
//       toast.error("Server connection failed");
//     }
//   };

//   // Navigate to Checkout page with the selected product
//   const handleBuyNow = (item) => {
//     // Check karein ki item ke paas sellerId hai ya nahi
//     console.log("Cart item being passed:", item); 
//     navigate("/checkout", { state: { product: item } });
//   };

//   if (loading) {
//     return <div className="text-center my-5 fw-bold fs-4">Loading Cart...</div>;
//   }

//   return (
//     <div className="container my-5">
//       <ToastContainer />
//       <h1 className="mb-4 text-center">Your Shopping Cart 🛒</h1>

//       {cartItems.length === 0 ? (
//         <div className="text-center my-5">
//           <p className="text-muted fs-5">Your cart is empty!</p>
//           <button 
//             className="btn btn-dark mt-2" 
//             onClick={() => navigate("/")}
//           >
//             Continue Shopping
//           </button>
//         </div>
//       ) : (
//         <div className="row g-4 justify-content-center">
//           <div className="col-lg-10">
//             {cartItems.map((item) => (
//               <div className="card customer_card mb-3 border-0 shadow-sm p-3" key={item._id}>
//                 <div className="row align-items-center">
//                   <div className="col-md-2 text-center">
//                     <img 
//                       src={item.image} 
//                       alt={item.title} 
//                       className="img-fluid rounded" 
//                       style={{ height: "100px", objectFit: "cover" }}
//                     />
//                   </div>
//                   <div className="col-md-6">
//                     <h5 className="fw-bold">{item.title}</h5>
//                     <p className="text-muted small mb-1">{item.description}</p>
//                     <p className="fw-bold text-danger mb-0">Rs. {item.price} (Qty: {item.quantity})</p>
//                   </div>
                  
//                   {/* Buttons Section */}
//                   <div className="col-md-4 text-md-end mt-3 mt-md-0 d-flex gap-2 justify-content-md-end">
//                     <button 
//                       onClick={() => handleBuyNow(item)}
//                       className="btn btn-warning btn-sm fw-bold text-dark px-3"
//                     >
//                       ⚡ Buy Now
//                     </button>
//                     <button 
//                       onClick={() => handleRemove(item._id)}
//                       className="btn btn-outline-danger btn-sm fw-semibold px-3"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default cart;




//night




// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./cart.css";

// function Cart() { // 👈 Capital 'C' zaroori hai
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const fetchCartItems = async () => {
//     const token = localStorage.getItem("token");
//     try {
//       const response = await fetch(`http://localhost:5000/api/customer/cart`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`
//         }
//       });
//       const data = await response.json();

//       console.log("Backend se aaya data:", data);
      
//       // ✅ Backend se { success: true, count: X, cart: [...] } aa raha hai
//       if (data.success && Array.isArray(data.cart)) {
//         setCartItems(data.cart);
//       } else if (Array.isArray(data)) {
//         setCartItems(data);
//       } else {
//         setCartItems([]);
//       }

//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching cart:", err);
//       toast.error("Failed to load cart items");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCartItems();
//   }, []);

//   const handleRemove = async (id) => {
//     const token = localStorage.getItem("token");
//     try {
//       const response = await fetch(`http://localhost:5000/api/customer/cart/remove/${id}`, {
//         method: "DELETE",
//         headers: {
//           "Authorization": `Bearer ${token}`
//         }
//       });

//       if (response.ok) {
//         toast.success("Item removed from cart");
//         fetchCartItems();
//       } else {
//         toast.error("Failed to remove item");
//       }
//     } catch (err) {
//       console.error("Error removing item:", err);
//       toast.error("Server connection failed");
//     }
//   };

//   const handleBuyNow = (item) => {
//     navigate("/checkout", { state: { product: item } });
//   };

//   if (loading) {
//     return <div className="text-center my-5 fw-bold fs-4">Loading Cart...</div>;
//   }

//   return (
//     <div className="container my-5">
//       <ToastContainer />
//       <h1 className="mb-4 text-center">Your Shopping Cart 🛒</h1>

//       {cartItems.length === 0 ? (
//         <div className="text-center my-5">
//           <p className="text-muted fs-5">Your cart is empty!</p>
//           <button 
//             className="btn btn-dark mt-2" 
//             onClick={() => navigate("/")}
//           >
//             Continue Shopping
//           </button>
//         </div>
//       ) : (
//         <div className="row g-4 justify-content-center">
//           <div className="col-lg-10">
//             {cartItems.map((item) => (
//               <div className="card customer_card mb-3 border-0 shadow-sm p-3" key={item._id}>
//                 <div className="row align-items-center">
//                   <div className="col-md-2 text-center">
//                     <img 
//                       src={item.image} 
//                       alt={item.title} 
//                       className="img-fluid rounded" 
//                       style={{ height: "100px", objectFit: "cover" }}
//                     />
//                   </div>
//                   <div className="col-md-6">
//                     <h5 className="fw-bold">{item.title}</h5>
//                     <p className="text-muted small mb-1">{item.description}</p>
//                     <p className="fw-bold text-danger mb-0">Rs. {item.price} (Qty: {item.quantity})</p>
//                   </div>
                  
//                   <div className="col-md-4 text-md-end mt-3 mt-md-0 d-flex gap-2 justify-content-md-end">
//                     <button 
//                       onClick={() => handleBuyNow(item)}
//                       className="btn btn-warning btn-sm fw-bold text-dark px-3"
//                     >
//                       ⚡ Buy Now
//                     </button>
//                     <button 
//                       onClick={() => handleRemove(item._id)}
//                       className="btn btn-outline-danger btn-sm fw-semibold px-3"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Cart;




//claude evenning





import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Not logged in -> empty cart, no point calling the API
      setCartItems([]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/customer/cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        // Token invalid/expired etc.
        toast.error("Please login again to view your cart");
        setCartItems([]);
        setLoading(false);
        return;
      }

      const data = await response.json();

      // Backend se { success: true, count: X, cart: [...] } aata hai
      if (data.success && Array.isArray(data.cart)) {
        setCartItems(data.cart);
      } else if (Array.isArray(data)) {
        setCartItems(data);
      } else {
        setCartItems([]);
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching cart:", err);
      toast.error("Failed to load cart items");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();

    // Home.jsx (ya kahin bhi) se "cartUpdated" event fire hone par yahan bhi refresh ho jaye
    window.addEventListener("cartUpdated", fetchCartItems);
    return () => window.removeEventListener("cartUpdated", fetchCartItems);
  }, []);

  const handleRemove = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5000/api/customer/cart/remove/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        toast.success("Item removed from cart");
        fetchCartItems();
        window.dispatchEvent(new Event("cartUpdated")); // Home.jsx ke isInCart state ko bhi sync karo
      } else {
        toast.error("Failed to remove item");
      }
    } catch (err) {
      console.error("Error removing item:", err);
      toast.error("Server connection failed");
    }
  };

  const handleBuyNow = (item) => {
    navigate("/checkout", { state: { product: item } });
  };

  if (loading) {
    return <div className="text-center my-5 fw-bold fs-4">Loading Cart...</div>;
  }

  return (
    <div className="container my-5">
      <ToastContainer />
      <h1 className="mb-4 text-center">Your Shopping Cart 🛒</h1>

      {cartItems.length === 0 ? (
        <div className="text-center my-5">
          <p className="text-muted fs-5">Your cart is empty!</p>
          <button
            className="btn btn-dark mt-2"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="row g-4 justify-content-center">
          <div className="col-lg-10">
            {cartItems.map((item) => (
              <div className="card customer_card mb-3 border-0 shadow-sm p-3" key={item._id}>
                <div className="row align-items-center">
                  <div className="col-md-2 text-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="img-fluid rounded"
                      style={{ height: "100px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="col-md-6">
                    <h5 className="fw-bold">{item.title}</h5>
                    <p className="text-muted small mb-1">{item.description}</p>
                    <p className="fw-bold text-danger mb-0">Rs. {item.price} (Qty: {item.quantity})</p>
                  </div>

                  <div className="col-md-4 text-md-end mt-3 mt-md-0 d-flex gap-2 justify-content-md-end">
                    <button
                      onClick={() => handleBuyNow(item)}
                      className="btn btn-warning btn-sm fw-bold text-dark px-3"
                    >
                      ⚡ Buy Now
                    </button>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="btn btn-outline-danger btn-sm fw-semibold px-3"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;