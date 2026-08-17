// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Login.css";
// //import bgVideo from "../assets/login-bg.mp4"; // Apni video ka path yahan dein
// import bgVideo from "../../assets/login-bg.mp4";

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
//       const response = await fetch("http://localhost:5000/api/shawls/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert(data.message);
//         navigate("/customer");
//       } else {
//         setError(data.message || "Invalid email or password!");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("Something went wrong. Please try again later.");
//     }
//   };

//   return (
//     <div className="video-bg-container">
//       {/* Background Video */}
//       <video autoPlay loop muted playsInline className="bg-video-element">
//         <source src={bgVideo} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>

//       {/* Login Box Container */}
//       <div className="Customer_login-container">
//         <div className="Customer_login-card">
//           <h2 className="Customer_login-title">Welcome Back</h2>
//           <p className="Customer_login-subtitle">Login to your Kavi Shawls account</p>

//           {error && <div className="alert alert-danger py-2">{error}</div>}

//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label className="Customer_form-label">Email Address</label>
//               <input
//                 type="email"
//                 name="email"
//                 className="Customer_form-control"
//                 placeholder="you@example.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 autoComplete="off"
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label className="Customer_form-label">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 className="Customer_form-control"
//                 placeholder="Enter your password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 autoComplete="current-password"
//                 required
//               />
//             </div>

//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <div className="form-check">
//                 <input type="checkbox" className="form-check-input" id="remember" />
//                 <label className="form-check-label" htmlFor="remember" style={{ fontSize: "13px" }}>
//                   Remember me
//                 </label>
//               </div>
//               <Link to="/forgot-password" className="Customer_forgot-link">
//                 Forgot Password?
//               </Link>
//             </div>

//             <button type="submit" className="Customer_login-btn w-100">
//               Login
//             </button>
//           </form>

//           <p className="Customer_signup-text">
//             Don't have an account? <Link to="/signup">Sign Up</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;




// new







// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Login.css";
// import bgVideo from "../../assets/login-bg.mp4";

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
//       const response = await fetch("http://localhost:5000/api/shawls/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // ✅ Login Success hone par Notification ko localStorage mein save karein
//         const existingNotifications = JSON.parse(localStorage.getItem("user_notifications")) || [];
//         const newLoginNotification = {
//           id: Date.now(),
//           title: "Login Successful! 🎉",
//           message: `Welcome back! You successfully logged in with ${formData.email}.`,
//           time: "Just now",
//           read: false,
//           type: "order",
//         };
        
//         localStorage.setItem(
//           "user_notifications",
//           JSON.stringify([newLoginNotification, ...existingNotifications])
//         );

//         alert(data.message || "Login Successful!");
//         navigate("/customer");
//       } else {
//         setError(data.message || "Invalid email or password!");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("Something went wrong. Please try again later.");
//     }
//   };

//   return (
//     <div className="video-bg-container">
//       {/* Background Video */}
//       <video autoPlay loop muted playsInline className="bg-video-element">
//         <source src={bgVideo} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>

//       {/* Login Box Container */}
//       <div className="Customer_login-container">
//         <div className="Customer_login-card">
//           <h2 className="Customer_login-title">Welcome Back</h2>
//           <p className="Customer_login-subtitle">Login to your Kavi Shawls account</p>

//           {error && <div className="alert alert-danger py-2">{error}</div>}

//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label className="Customer_form-label">Email Address</label>
//               <input
//                 type="email"
//                 name="email"
//                 className="Customer_form-control"
//                 placeholder="you@example.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 autoComplete="off"
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label className="Customer_form-label">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 className="Customer_form-control"
//                 placeholder="Enter your password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 autoComplete="current-password"
//                 required
//               />
//             </div>

//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <div className="form-check">
//                 <input type="checkbox" className="form-check-input" id="remember" />
//                 <label className="form-check-label" htmlFor="remember" style={{ fontSize: "13px" }}>
//                   Remember me
//                 </label>
//               </div>
//               <Link to="/forgot-password" className="Customer_forgot-link">
//                 Forgot Password?
//               </Link>
//             </div>

//             <button type="submit" className="Customer_login-btn w-100">
//               Login
//             </button>
//           </form>

//           <p className="Customer_signup-text">
//             Don't have an account? <Link to="/signup">Sign Up</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;








// neeeeeeeeeeeeewwwwwwww









import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import bgVideo from "../../assets/login-bg.mp4";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/shawls/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ 1. Backend se aane wali user ID ko localStorage mein save karein
        localStorage.setItem("userId", data.user._id);
        localStorage.setItem("customerUser", JSON.stringify(data.user));

        alert(data.message || "Login Successful!");
        navigate("/customer"); // Ya jahan aapka main dashboard hai
      } else {
        setError(data.message || "Invalid email or password!");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="video-bg-container">
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="bg-video-element">
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Login Box Container */}
      <div className="Customer_login-container">
        <div className="Customer_login-card">
          <h2 className="Customer_login-title">Welcome Back</h2>
          <p className="Customer_login-subtitle">Login to your Kavi Shawls account</p>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="Customer_form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="Customer_form-control"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
                required
              />
            </div>

            <div className="mb-3">
              <label className="Customer_form-label">Password</label>
              <input
                type="password"
                name="password"
                className="Customer_form-control"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="remember" />
                <label className="form-check-label" htmlFor="remember" style={{ fontSize: "13px" }}>
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="Customer_forgot-link">
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="Customer_login-btn w-100">
              Login
            </button>
          </form>

          <p className="Customer_signup-text">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;