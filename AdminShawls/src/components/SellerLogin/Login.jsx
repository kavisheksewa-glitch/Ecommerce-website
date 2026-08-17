// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Login.css";

// function Login() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!formData.email || !formData.password) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     try {
//       // Backend API call
//       const response = await fetch("http://localhost:5000/api/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Token save karein taaki protected routes aur seller API calls kaam karein
//         if (data.token) {
//           localStorage.setItem("token", data.token);
//         }
//         alert(data.message || "Login Successfully"); 
//         navigate("/"); // Home page par redirect karega
//       } else {
//         setError(data.message || "Invalid email or password!");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("Something went wrong. Please try again later.");
//     }
//   };

//   return (
//     <div className="Seller_login-container">
//       <div className="Seller_login-card">
//         <h2 className="Seller_login-title">Welcome Back</h2>
//         <p className="Seller_login-subtitle">Login to your Kavi Shawls account</p>

//         {error && <div className="alert alert-danger py-2">{error}</div>}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label">Email Address</label>
//             <input
//               type="email"
//               name="email"
//               className="form-control"
//               placeholder="you@example.com"
//               value={formData.email}
//               onChange={handleChange}
//               autoComplete="off"
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Password</label>
//             <input
//               type="password"
//               name="password"
//               className="form-control"
//               placeholder="Enter your password"
//               value={formData.password}
//               onChange={handleChange}
//               autoComplete="new-password"
//               required
//             />
//           </div>

//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <div className="form-check">
//               <input type="checkbox" className="form-check-input" id="remember" />
//               <label className="form-check-label" htmlFor="remember">
//                 Remember me
//               </label>
//             </div>
//             <Link to="/forgot-password" className="Seller_forgot-link">
//               Forgot Password?
//             </Link>
//           </div>

//           <button type="submit" className="btn Seller_login-btn w-100">
//             Login
//           </button>
//         </form>

//         <p className="Seller_signup-text">
//           Don't have an account? <Link to="/signup">Sign Up</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;