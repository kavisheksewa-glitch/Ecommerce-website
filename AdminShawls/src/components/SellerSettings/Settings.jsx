// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./SellerDashboard.css";
// import logo from "../assets/logooo.png";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Settings() {
//   const sellerId = localStorage.getItem("sellerId");

//   const [seller, setSeller] = useState({
//     name: "",
//     shopName: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [profilePic, setProfilePic] = useState(null);

//   useEffect(() => {
//     if (!sellerId || sellerId === "null") {
//       return;
//     }
//     getSeller();
//   }, [sellerId]);

//   const getSeller = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/auth/seller/${sellerId}`
//       );

//       setSeller({
//         ...res.data,
//         password: "",
//         confirmPassword: "",
//       });
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to fetch seller details. Ensure backend server is running.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   };

//   const handleChange = (e) => {
//     setSeller({
//       ...seller,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!sellerId || sellerId === "null") {
//       toast.error("Seller ID is missing. Please log in again.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       return;
//     }

//     if (
//       seller.password &&
//       seller.password !== seller.confirmPassword
//     ) {
//       toast.error("Passwords do not match", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", seller.name);
//     formData.append("shopName", seller.shopName);
//     formData.append("email", seller.email);
//     formData.append("phone", seller.phone);
//     formData.append("address", seller.address);
//     formData.append("city", seller.city);
//     formData.append("state", seller.state);
//     formData.append("pincode", seller.pincode);
//     if (seller.password) {
//       formData.append("password", seller.password);
//     }
//     if (profilePic) {
//       formData.append("profilePicture", profilePic);
//     }

//     try {
//       await axios.put(
//         `http://localhost:5000/api/auth/seller/${sellerId}`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       toast.success("Profile Updated Successfully!", {
//         position: "top-right",
//         autoClose: 2000,
//       });
//     } catch (error) {
//       console.log(error.response?.data);
//       console.log(error.response?.status);
//       console.log(error.message);

//       toast.error(error.response?.data?.message || "Update Failed", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   };

//   if (!sellerId || sellerId === "null") {
//     return (
//       <div className="container py-5 text-center">
//         <h3 className="text-danger">Access Denied</h3>
//         <p>Please log in as a seller to view settings.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-light min-vh-100 py-5">
//       <div className="container">
//         <ToastContainer />

//         {/* Header Title & Logo */}
//         <div className="text-center mb-4">
//           <img
//             src={logo}
//             alt="logo"
//             className="img-fluid mb-2 Seller_signup-logo"
//           />
//           <h2 className="fw-bold Seller_text-brown">
//             ⚙️ Seller Settings
//           </h2>
//           <p className="text-muted">Manage your store details and profile settings</p>
//         </div>

//         <div className="row justify-content-center">
//           <div className="col-lg-8 col-md-10">
//             <div className="card shadow-lg border-0 rounded-4 Seller_signup-card">
//               <div className="card-body p-5">
//                 <form onSubmit={handleSubmit}>
//                   <div className="row">
//                     <div className="col-md-6 mb-3">
//                       <label className="form-label fw-semibold">
//                         Seller Name
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control Seller_form-control"
//                         name="name"
//                         value={seller.name}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>

//                     <div className="col-md-6 mb-3">
//                       <label className="form-label fw-semibold">
//                         Shop Name
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control Seller_form-control"
//                         name="shopName"
//                         value={seller.shopName}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">
//                       Email Address
//                     </label>
//                     <input
//                       type="email"
//                       className="form-control Seller_form-control"
//                       name="email"
//                       value={seller.email}
//                       onChange={handleChange}
//                       autoComplete="off"
//                       required
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">
//                       Mobile Number
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control Seller_form-control"
//                       name="phone"
//                       value={seller.phone}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">
//                       Business Address
//                     </label>
//                     <textarea
//                       className="form-control Seller_form-control Seller_textarea"
//                       rows="3"
//                       name="address"
//                       value={seller.address}
//                       onChange={handleChange}
//                       required
//                     ></textarea>
//                   </div>

//                   <div className="row">
//                     <div className="col-md-4 mb-3">
//                       <label className="form-label fw-semibold">
//                         City
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control Seller_form-control"
//                         name="city"
//                         value={seller.city}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>

//                     <div className="col-md-4 mb-3">
//                       <label className="form-label fw-semibold">
//                         State
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control Seller_form-control"
//                         name="state"
//                         value={seller.state}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>

//                     <div className="col-md-4 mb-3">
//                       <label className="form-label fw-semibold">
//                         Pincode
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control Seller_form-control"
//                         name="pincode"
//                         value={seller.pincode}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">
//                       New Password
//                     </label>
//                     <input
//                       type="password"
//                       className="form-control Seller_form-control"
//                       name="password"
//                       value={seller.password}
//                       onChange={handleChange}
//                       placeholder="Leave blank if you don't want to change"
//                       autoComplete="new-password"
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">
//                       Confirm Password
//                     </label>
//                     <input
//                       type="password"
//                       className="form-control Seller_form-control"
//                       name="confirmPassword"
//                       value={seller.confirmPassword}
//                       onChange={handleChange}
//                       placeholder="Confirm new password"
//                     />
//                   </div>

//                   <div className="mb-4">
//                     <label className="form-label fw-semibold">
//                       Upload Shop Logo / Profile Picture
//                     </label>
//                     <input
//                       type="file"
//                       className="form-control Seller_form-control Seller_file-input"
//                       accept="image/*"
//                       onChange={(e) => setProfilePic(e.target.files[0])}
//                     />
//                   </div>

//                   <button
//                     type="submit"
//                     className="btn Seller_btn-brown btn-lg w-100"
//                   >
//                     Save Changes
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Settings;       


// new 



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./SellerDashboard.css";
// import logo from "../assets/logooo.png";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Settings() {
//   const sellerId = localStorage.getItem("sellerId");

//   const [seller, setSeller] = useState({
//     name: "",
//     shopName: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//     password: "",
//     confirmPassword: "",
//     profileImage: "",
//   });

//   const [profilePic, setProfilePic] = useState(null);

//   useEffect(() => {
//     if (!sellerId || sellerId === "null") {
//       return;
//     }
//     getSeller();
//   }, [sellerId]);

//   const getSeller = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/auth/seller/${sellerId}`
//       );

//       setSeller({
//         ...res.data,
//         password: "",
//         confirmPassword: "",
//       });
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to fetch seller details. Ensure backend server is running.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   };

//   const handleChange = (e) => {
//     setSeller({
//       ...seller,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!sellerId || sellerId === "null") {
//       toast.error("Seller ID is missing. Please log in again.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       return;
//     }

//     if (
//       seller.password &&
//       seller.password !== seller.confirmPassword
//     ) {
//       toast.error("Passwords do not match", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", seller.name);
//     formData.append("shopName", seller.shopName);
//     formData.append("email", seller.email);
//     formData.append("phone", seller.phone);
//     formData.append("address", seller.address);
//     formData.append("city", seller.city);
//     formData.append("state", seller.state);
//     formData.append("pincode", seller.pincode);
//     if (seller.password) {
//       formData.append("password", seller.password);
//     }
//     if (profilePic) {
//       formData.append("profilePicture", profilePic);
//     }

//     try {
//       const res = await axios.put(
//         `http://localhost:5000/api/seller/auth/seller/${sellerId}`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       setSeller((prev) => ({
//         ...prev,
//         ...res.data.seller,
//         password: "",
//         confirmPassword: "",
//       }));
//       setProfilePic(null);

//       toast.success("Profile Updated Successfully!", {
//         position: "top-right",
//         autoClose: 2000,
//       });
//     } catch (error) {
//       console.log(error.response?.data);
//       toast.error(error.response?.data?.message || "Update Failed", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   };

//   if (!sellerId || sellerId === "null") {
//     return (
//       <div className="container py-5 text-center">
//         <h3 className="text-danger">Access Denied</h3>
//         <p>Please log in as a seller to view settings.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-light min-vh-100 py-5">
//       <div className="container">
//         <ToastContainer />

//         <div className="text-center mb-4">
//           <img
//             src={logo}
//             alt="logo"
//             className="img-fluid mb-2 Seller_signup-logo"
//           />
//           <h2 className="fw-bold Seller_text-brown">
//             ⚙️ Seller Settings
//           </h2>
//           <p className="text-muted">Manage your store details and profile settings</p>
//         </div>

//         <div className="row justify-content-center">
//           <div className="col-lg-8 col-md-10">
//             <div className="card shadow-lg border-0 rounded-4 Seller_signup-card">
//               <div className="card-body p-5">
//                 <form onSubmit={handleSubmit}>
//                   <div className="row">
//                     <div className="col-md-6 mb-3">
//                       <label className="form-label fw-semibold">
//                         Seller Name
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control Seller_form-control"
//                         name="name"
//                         value={seller.name}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>

//                     <div className="col-md-6 mb-3">
//                       <label className="form-label fw-semibold">
//                         Shop Name
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control Seller_form-control"
//                         name="shopName"
//                         value={seller.shopName}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">
//                       Email Address
//                     </label>
//                     <input
//                       type="email"
//                       className="form-control Seller_form-control"
//                       name="email"
//                       value={seller.email}
//                       onChange={handleChange}
//                       autoComplete="off"
//                       required
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">
//                       Mobile Number
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control Seller_form-control"
//                       name="phone"
//                       value={seller.phone}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">
//                       Business Address
//                     </label>
//                     <textarea
//                       className="form-control Seller_form-control Seller_textarea"
//                       rows="3"
//                       name="address"
//                       value={seller.address}
//                       onChange={handleChange}
//                       required
//                     ></textarea>
//                   </div>

//                   <div className="row">
//                     <div className="col-md-4 mb-3">
//                       <label className="form-label fw-semibold">
//                         City
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control Seller_form-control"
//                         name="city"
//                         value={seller.city}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>

//                     <div className="col-md-4 mb-3">
//                       <label className="form-label fw-semibold">
//                         State
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control Seller_form-control"
//                         name="state"
//                         value={seller.state}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>

//                     <div className="col-md-4 mb-3">
//                       <label className="form-label fw-semibold">
//                         Pincode
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control Seller_form-control"
//                         name="pincode"
//                         value={seller.pincode}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">
//                       New Password
//                     </label>
//                     <input
//                       type="password"
//                       className="form-control Seller_form-control"
//                       name="password"
//                       value={seller.password}
//                       onChange={handleChange}
//                       placeholder="Leave blank if you don't want to change"
//                       autoComplete="new-password"
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">
//                       Confirm Password
//                     </label>
//                     <input
//                       type="password"
//                       className="form-control Seller_form-control"
//                       name="confirmPassword"
//                       value={seller.confirmPassword}
//                       onChange={handleChange}
//                       placeholder="Confirm new password"
//                     />
//                   </div>

//                   {seller.profileImage && (
//                     <div className="mb-3 text-center">
//                       <label className="form-label fw-semibold d-block">Current Shop Logo</label>
//                       <img
//                         src={`http://localhost:5000/${seller.profileImage}`}
//                         alt="Shop Logo"
//                         className="rounded shadow-sm"
//                         style={{ width: "100px", height: "100px", objectFit: "cover" }}
//                       />
//                     </div>
//                   )}

//                   <div className="mb-4">
//                     <label className="form-label fw-semibold">
//                       Upload New Shop Logo / Profile Picture
//                     </label>
//                     <input
//                       type="file"
//                       className="form-control Seller_form-control Seller_file-input"
//                       accept="image/*"
//                       onChange={(e) => setProfilePic(e.target.files[0])}
//                     />
//                   </div>

//                   <button
//                     type="submit"
//                     className="Seller_btn-brown btn-lg w-100"
//                   >
//                     Save Changes
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Settings;

// new1



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// // import "./SellerDashboard.css";
// import "./Settings.css";
// import logo from "../../assets/logooo.png";
// //import logo from "../assets/logooo.png";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Settings() {
//   const sellerId = localStorage.getItem("sellerId");

//   const [seller, setSeller] = useState({
//     name: "",
//     shopName: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//     password: "",
//     confirmPassword: "",
//     profileImage: "",
//   });

//   const [profilePic, setProfilePic] = useState(null);

//   useEffect(() => {
//     if (!sellerId || sellerId === "null") {
//       return;
//     }
//     getSeller();
//   }, [sellerId]);

//   const getSeller = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/seller/auth/seller/${sellerId}`
//       );

//       setSeller({
//         ...res.data,
//         password: "",
//         confirmPassword: "",
//       });
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to fetch seller details. Ensure backend server is running.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   };

//   const handleChange = (e) => {
//     setSeller({
//       ...seller,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!sellerId || sellerId === "null") {
//       toast.error("Seller ID is missing. Please log in again.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       return;
//     }

//     if (
//       seller.password &&
//       seller.password !== seller.confirmPassword
//     ) {
//       toast.error("Passwords do not match", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", seller.name);
//     formData.append("shopName", seller.shopName);
//     formData.append("email", seller.email);
//     formData.append("phone", seller.phone);
//     formData.append("address", seller.address);
//     formData.append("city", seller.city);
//     formData.append("state", seller.state);
//     formData.append("pincode", seller.pincode);
//     if (seller.password) {
//       formData.append("password", seller.password);
//     }
//     if (profilePic) {
//       formData.append("profilePicture", profilePic);
//     }

//     try {
//       const res = await axios.put(
//         `http://localhost:5000/api/seller/auth/seller/${sellerId}`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       setSeller((prev) => ({
//         ...prev,
//         ...res.data.seller,
//         password: "",
//         confirmPassword: "",
//       }));
//       setProfilePic(null);

//       toast.success("Profile Updated Successfully!", {
//         position: "top-right",
//         autoClose: 2000,
//       });
//     } catch (error) {
//       console.log(error.response?.data);
//       toast.error(error.response?.data?.message || "Update Failed", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   };

//   if (!sellerId || sellerId === "null") {
//     return (
//       <div className="container py-5 text-center">
//         <h3 className="text-danger">Access Denied</h3>
//         <p>Please log in as a seller to view settings.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-light min-vh-100 py-5">
//       <div className="container">
//         <ToastContainer />

//         <div className="text-center mb-4">
//           <img
//             src={logo}
//             alt="logo"
//             className="img-fluid mb-2 Seller_signup-logo mt-5"
//           />
//           <h2 className="fw-bold Seller_text-brown">
//             ⚙️ Seller Settings
//           </h2>
//           <p className="text-muted">Manage your store details and profile settings</p>
//         </div>

//         <div className="row justify-content-center">
//           <div className="col-lg-8 col-md-10">
//             <div className="card shadow-lg border-0 rounded-4 Seller_signup-card">
//               <div className="card-body p-5">
//                 <form onSubmit={handleSubmit}>
//                   <div className="row">
//                     {seller.profileImage && (
//                     <div className="mb-3 text-center">
//                       <label className="form-label fw-semibold d-block">profile pic</label>
//                       <img
//                         src={`http://localhost:5000/${seller.profileImage}`}
//                         alt="Shop Logo"
//                         className="rounded shadow-sm"
//                         style={{ width: "200px", height: "200px", objectFit: "cover" }}
//                       />
//                     </div>
//                   )}
//                     <div className="col-md-6 mb-3">
//                       <label className="form-label fw-semibold">
//                         Seller Name
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control Seller_form-control"
//                         name="name"
//                         value={seller.name}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>

//                     <div className="col-md-6 mb-3">
//                       <label className="form-label fw-semibold">
//                         Shop Name
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control Seller_form-control"
//                         name="shopName"
//                         value={seller.shopName}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">
//                       Email Address
//                     </label>
//                     <input
//                       type="email"
//                       className="form-control Seller_form-control"
//                       name="email"
//                       value={seller.email}
//                       onChange={handleChange}
//                       autoComplete="off"
//                       required
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">
//                       Mobile Number
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control Seller_form-control"
//                       name="phone"
//                       value={seller.phone}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">
//                       Business Address
//                     </label>
//                     <textarea
//                       className="form-control Seller_form-control Seller_textarea"
//                       rows="3"
//                       name="address"
//                       value={seller.address}
//                       onChange={handleChange}
//                       required
//                     ></textarea>
//                   </div>

//                   <div className="row">
//                     <div className="col-md-4 mb-3">
//                       <label className="form-label fw-semibold">
//                         City
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control Seller_form-control"
//                         name="city"
//                         value={seller.city}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>

//                     <div className="col-md-4 mb-3">
//                       <label className="form-label fw-semibold">
//                         State
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control Seller_form-control"
//                         name="state"
//                         value={seller.state}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>

//                     <div className="col-md-4 mb-3">
//                       <label className="form-label fw-semibold">
//                         Pincode
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control Seller_form-control"
//                         name="pincode"
//                         value={seller.pincode}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">
//                       New Password
//                     </label>
//                     <input
//                       type="password"
//                       className="form-control Seller_form-control"
//                       name="password"
//                       value={seller.password}
//                       onChange={handleChange}
//                       placeholder="Leave blank if you don't want to change"
//                       autoComplete="new-password"
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">
//                       Confirm Password
//                     </label>
//                     <input
//                       type="password"
//                       className="form-control Seller_form-control"
//                       name="confirmPassword"
//                       value={seller.confirmPassword}
//                       onChange={handleChange}
//                       placeholder="Confirm new password"
//                     />
//                   </div>

//                   {/* {seller.profileImage && (
//                     <div className="mb-3 text-center">
//                       <label className="form-label fw-semibold d-block">profile pic</label>
//                       <img
//                         src={`http://localhost:5000/${seller.profileImage}`}
//                         alt="Shop Logo"
//                         className="rounded shadow-sm"
//                         style={{ width: "100px", height: "100px", objectFit: "cover" }}
//                       />
//                     </div>
//                   )} */}

//                   <div className="mb-4">
//                     <label className="form-label fw-semibold">
//                        Profile Picture
//                     </label>
//                     <input
//                       type="file"
//                       className="form-control Seller_form-control Seller_file-input"
//                       accept="image/*"
//                       onChange={(e) => setProfilePic(e.target.files[0])}
//                     />
//                   </div>

//                   <button
//                     type="submit"
//                     className="Seller_btn-brown btn-lg w-100"
//                   >
//                     Save Changes
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Settings;




// neww



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Settings.css";
// import logo from "../../assets/logooo.png";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Settings() {
//   const sellerId = localStorage.getItem("sellerId");

//   const [seller, setSeller] = useState({
//     name: "",
//     shopName: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//     password: "",
//     confirmPassword: "",
//     profileImage: "",
//   });

//   const [profilePic, setProfilePic] = useState(null);

//   useEffect(() => {
//     if (!sellerId || sellerId === "null") {
//       return;
//     }
//     getSeller();
//   }, [sellerId]);

//   const getSeller = async () => {
//     try {
//       // ✅ Corrected URL (removed extra 'seller/')
//       const res = await axios.get(
//         `http://localhost:5000/api/seller/auth/${sellerId}`
//       );

//       setSeller({
//         ...res.data,
//         password: "",
//         confirmPassword: "",
//       });
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to fetch seller details. Ensure backend server is running.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   };

//   const handleChange = (e) => {
//     setSeller({
//       ...seller,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!sellerId || sellerId === "null") {
//       toast.error("Seller ID is missing. Please log in again.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       return;
//     }

//     if (
//       seller.password &&
//       seller.password !== seller.confirmPassword
//     ) {
//       toast.error("Passwords do not match", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", seller.name);
//     formData.append("shopName", seller.shopName);
//     formData.append("email", seller.email);
//     formData.append("phone", seller.phone);
//     formData.append("address", seller.address);
//     formData.append("city", seller.city);
//     formData.append("state", seller.state);
//     formData.append("pincode", seller.pincode);
    
//     if (seller.password) {
//       formData.append("password", seller.password);
//     }
    
//     if (profilePic) {
//       // ✅ 'profileImage' match karna chahiye backend multer field name ke sath
//       formData.append("profileImage", profilePic);
//     }

//     try {
//       // ✅ Corrected URL (changed from update/${sellerId} or seller/${sellerId} to match routes/sellerAuthRoutes.js)
//       const res = await axios.put(
//         `http://localhost:5000/api/seller/auth/update/${sellerId}`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       setSeller((prev) => ({
//         ...prev,
//         ...res.data.seller,
//         password: "",
//         confirmPassword: "",
//       }));
//       setProfilePic(null);

//       toast.success("Profile Updated Successfully!", {
//         position: "top-right",
//         autoClose: 2000,
//       });
//     } catch (error) {
//       console.log(error.response?.data);
//       toast.error(error.response?.data?.message || "Update Failed", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   };

//   if (!sellerId || sellerId === "null") {
//     return (
//       <div className="container py-5 text-center">
//         <h3 className="text-danger">Access Denied</h3>
//         <p>Please log in as a seller to view settings.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-light min-vh-100 py-5">
//       <div className="container">
//         <ToastContainer />

//         <div className="text-center mb-4">
//           <img
//             src={logo}
//             alt="logo"
//             className="img-fluid mb-2 Seller_signup-logo mt-5"
//           />
//           <h2 className="fw-bold Seller_text-brown">
//             ⚙️ Seller Settings
//           </h2>
//           <p className="text-muted">Manage your store details and profile settings</p>
//         </div>

//         <div className="row justify-content-center">
//           <div className="col-lg-8 col-md-10">
//             <div className="card shadow-lg border-0 rounded-4 Seller_signup-card">
//               <div className="card-body p-5">
//                 <form onSubmit={handleSubmit}>
//                   <div className="row">
//                     {seller.profileImage && (
//                       <div className="mb-3 text-center">
//                         <label className="form-label fw-semibold d-block">Profile Picture</label>
//                         <img
//                           src={`http://localhost:5000/${seller.profileImage}`}
//                           alt="Shop Logo"
//                           className="rounded shadow-sm"
//                           style={{ width: "200px", height: "200px", objectFit: "cover" }}
//                         />
//                       </div>
//                     )}
//                     <div className="col-md-6 mb-3">
//                       <label className="form-label fw-semibold">
//                         Seller Name
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control Seller_form-control"
//                         name="name"
//                         value={seller.name}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>

//                     <div className="col-md-6 mb-3">
//                       <label className="form-label fw-semibold">
//                         Shop Name
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control Seller_form-control"
//                         name="shopName"
//                         value={seller.shopName}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">
//                       Email Address
//                     </label>
//                     <input
//                       type="email"
//                       className="form-control Seller_form-control"
//                       name="email"
//                       value={seller.email}
//                       onChange={handleChange}
//                       autoComplete="off"
//                       required
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">
//                       Mobile Number
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control Seller_form-control"
//                       name="phone"
//                       value={seller.phone}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">
//                       Business Address
//                     </label>
//                     <textarea
//                       className="form-control Seller_form-control Seller_textarea"
//                       rows="3"
//                       name="address"
//                       value={seller.address}
//                       onChange={handleChange}
//                       required
//                     ></textarea>
//                   </div>

//                   <div className="row">
//                     <div className="col-md-4 mb-3">
//                       <label className="form-label fw-semibold">
//                         City
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control Seller_form-control"
//                         name="city"
//                         value={seller.city}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>

//                     <div className="col-md-4 mb-3">
//                       <label className="form-label fw-semibold">
//                         State
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control Seller_form-control"
//                         name="state"
//                         value={seller.state}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>

//                     <div className="col-md-4 mb-3">
//                       <label className="form-label fw-semibold">
//                         Pincode
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control Seller_form-control"
//                         name="pincode"
//                         value={seller.pincode}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">
//                       New Password
//                     </label>
//                     <input
//                       type="password"
//                       className="form-control Seller_form-control"
//                       name="password"
//                       value={seller.password}
//                       onChange={handleChange}
//                       placeholder="Leave blank if you don't want to change"
//                       autoComplete="new-password"
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">
//                       Confirm Password
//                     </label>
//                     <input
//                       type="password"
//                       className="form-control Seller_form-control"
//                       name="confirmPassword"
//                       value={seller.confirmPassword}
//                       onChange={handleChange}
//                       placeholder="Confirm new password"
//                     />
//                   </div>

//                   <div className="mb-4">
//                     <label className="form-label fw-semibold">
//                        Profile Picture
//                     </label>
//                     <input
//                       type="file"
//                       className="form-control Seller_form-control Seller_file-input"
//                       accept="image/*"
//                       onChange={(e) => setProfilePic(e.target.files[0])}
//                     />
//                   </div>

//                   <button
//                     type="submit"
//                     className="Seller_btn-brown btn-lg w-100"
//                   >
//                     Save Changes
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Settings;



//claude office



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Settings.css";
// import logo from "../../assets/logooo.png";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Tiny helper: JWT ka payload decode karta hai (bina kisi library ke)
// function decodeToken(token) {
//   try {
//     const payload = token.split(".")[1];
//     return JSON.parse(atob(payload));
//   } catch (err) {
//     return null;
//   }
// }

// function Settings() {
//   const navigate = useNavigate();

//   // ✅ FIX: "sellerId" localStorage mein kabhi save hi nahi hota (SellerLogin.jsx
//   // sirf "sellerToken" save karta hai). Ab id token decode karke nikali ja rahi hai.
//   const sellerToken = localStorage.getItem("sellerToken");
//   const decoded = sellerToken ? decodeToken(sellerToken) : null;
//   const sellerId = decoded?.id;

//   const [seller, setSeller] = useState({
//     name: "",
//     shopName: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//     password: "",
//     confirmPassword: "",
//     profileImage: "",
//   });

//   const [profilePic, setProfilePic] = useState(null);

//   useEffect(() => {
//     if (!sellerId) {
//       return;
//     }
//     getSeller();
//   }, [sellerId]);

//   const getSeller = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/seller/auth/${sellerId}`
//       );

//       setSeller({
//         ...res.data,
//         password: "",
//         confirmPassword: "",
//       });
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to fetch seller details. Ensure backend server is running.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   };

//   const handleChange = (e) => {
//     setSeller({
//       ...seller,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!sellerId) {
//       toast.error("Seller ID is missing. Please log in again.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       return;
//     }

//     if (
//       seller.password &&
//       seller.password !== seller.confirmPassword
//     ) {
//       toast.error("Passwords do not match", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", seller.name);
//     formData.append("shopName", seller.shopName);
//     formData.append("email", seller.email);
//     formData.append("phone", seller.phone);
//     formData.append("address", seller.address);
//     formData.append("city", seller.city);
//     formData.append("state", seller.state);
//     formData.append("pincode", seller.pincode);

//     if (seller.password) {
//       formData.append("password", seller.password);
//     }

//     if (profilePic) {
//       formData.append("profileImage", profilePic);
//     }

//     try {
//       const res = await axios.put(
//         `http://localhost:5000/api/seller/auth/update/${sellerId}`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       setSeller((prev) => ({
//         ...prev,
//         ...res.data.seller,
//         password: "",
//         confirmPassword: "",
//       }));
//       setProfilePic(null);

//       toast.success("Profile Updated Successfully!", {
//         position: "top-right",
//         autoClose: 2000,
//       });
//     } catch (error) {
//       console.log(error.response?.data);
//       toast.error(error.response?.data?.message || "Update Failed", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   };

//   if (!sellerId) {
//     return (
//       <div className="container py-5 text-center">
//         <h3 className="text-danger">Access Denied</h3>
//         <p>Please log in as a seller to view settings.</p>
//         <button className="btn btn-dark mt-2" onClick={() => navigate("/seller/login")}>
//           Go to Seller Login
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-light min-vh-100 py-5">
//       <div className="container">
//         <ToastContainer />

//         <div className="text-center mb-4">
//           <img
//             src={logo}
//             alt="logo"
//             className="img-fluid mb-2 Seller_signup-logo mt-5"
//           />
//           <h2 className="fw-bold Seller_text-brown">
//             ⚙️ Seller Settings
//           </h2>
//           <p className="text-muted">Manage your store details and profile settings</p>
//         </div>

//         <div className="row justify-content-center">
//           <div className="col-lg-8 col-md-10">
//             <div className="card shadow-lg border-0 rounded-4 Seller_signup-card">
//               <div className="card-body p-5">
//                 <form onSubmit={handleSubmit}>
//                   <div className="row">
//                     {seller.profileImage && (
//                       <div className="mb-3 text-center">
//                         <label className="form-label fw-semibold d-block">Profile Picture</label>
//                         <img
//                           src={`http://localhost:5000/${seller.profileImage}`}
//                           alt="Shop Logo"
//                           className="rounded shadow-sm"
//                           style={{ width: "200px", height: "200px", objectFit: "cover" }}
//                         />
//                       </div>
//                     )}
//                     <div className="col-md-6 mb-3">
//                       <label className="form-label fw-semibold">
//                         Seller Name
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control Seller_form-control"
//                         name="name"
//                         value={seller.name}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>

//                     <div className="col-md-6 mb-3">
//                       <label className="form-label fw-semibold">
//                         Shop Name
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control Seller_form-control"
//                         name="shopName"
//                         value={seller.shopName}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">
//                       Email Address
//                     </label>
//                     <input
//                       type="email"
//                       className="form-control Seller_form-control"
//                       name="email"
//                       value={seller.email}
//                       onChange={handleChange}
//                       autoComplete="off"
//                       required
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">
//                       Mobile Number
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control Seller_form-control"
//                       name="phone"
//                       value={seller.phone}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">
//                       Business Address
//                     </label>
//                     <textarea
//                       className="form-control Seller_form-control Seller_textarea"
//                       rows="3"
//                       name="address"
//                       value={seller.address}
//                       onChange={handleChange}
//                       required
//                     ></textarea>
//                   </div>

//                   <div className="row">
//                     <div className="col-md-4 mb-3">
//                       <label className="form-label fw-semibold">
//                         City
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control Seller_form-control"
//                         name="city"
//                         value={seller.city}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>

//                     <div className="col-md-4 mb-3">
//                       <label className="form-label fw-semibold">
//                         State
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control Seller_form-control"
//                         name="state"
//                         value={seller.state}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>

//                     <div className="col-md-4 mb-3">
//                       <label className="form-label fw-semibold">
//                         Pincode
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control Seller_form-control"
//                         name="pincode"
//                         value={seller.pincode}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">
//                       New Password
//                     </label>
//                     <input
//                       type="password"
//                       className="form-control Seller_form-control"
//                       name="password"
//                       value={seller.password}
//                       onChange={handleChange}
//                       placeholder="Leave blank if you don't want to change"
//                       autoComplete="new-password"
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-semibold">
//                       Confirm Password
//                     </label>
//                     <input
//                       type="password"
//                       className="form-control Seller_form-control"
//                       name="confirmPassword"
//                       value={seller.confirmPassword}
//                       onChange={handleChange}
//                       placeholder="Confirm new password"
//                     />
//                   </div>

//                   <div className="mb-4">
//                     <label className="form-label fw-semibold">
//                        Profile Picture
//                     </label>
//                     <input
//                       type="file"
//                       className="form-control Seller_form-control Seller_file-input"
//                       accept="image/*"
//                       onChange={(e) => setProfilePic(e.target.files[0])}
//                     />
//                   </div>

//                   <button
//                     type="submit"
//                     className="Seller_btn-brown btn-lg w-100"
//                   >
//                     Save Changes
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Settings;



//claude office night



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Settings.css";
import logo from "../../assets/logooo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Tiny helper: JWT ka payload decode karta hai (bina kisi library ke)
function decodeToken(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch (err) {
    return null;
  }
}

function Settings() {
  const navigate = useNavigate();

  const sellerToken = localStorage.getItem("sellerToken");
  const decoded = sellerToken ? decodeToken(sellerToken) : null;
  const sellerId = decoded?.id;

  const [seller, setSeller] = useState({
    name: "",
    shopName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    password: "",
    confirmPassword: "",
    profileImage: "",
  });

  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    if (!sellerId) {
      return;
    }
    getSeller();
  }, [sellerId]);

  const getSeller = async () => {
    try {
      // ✅ FIX: Authorization header add kiya, route par "protect" middleware lagi hai
      const res = await axios.get(
        `http://localhost:5000/api/seller/auth/${sellerId}`,
        {
          headers: {
            Authorization: `Bearer ${sellerToken}`,
          },
        }
      );

      setSeller({
        ...res.data,
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch seller details. Ensure backend server is running.", {
        position: "top-right",
        autoClose: 3000,
      });

      // ✅ Token invalid/expired hone par login page pe bhej do
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("sellerToken");
        navigate("/seller/login");
      }
    }
  };

  const handleChange = (e) => {
    setSeller({
      ...seller,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sellerId) {
      toast.error("Seller ID is missing. Please log in again.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (
      seller.password &&
      seller.password !== seller.confirmPassword
    ) {
      toast.error("Passwords do not match", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", seller.name);
    formData.append("shopName", seller.shopName);
    formData.append("email", seller.email);
    formData.append("phone", seller.phone);
    formData.append("address", seller.address);
    formData.append("city", seller.city);
    formData.append("state", seller.state);
    formData.append("pincode", seller.pincode);

    if (seller.password) {
      formData.append("password", seller.password);
    }

    if (profilePic) {
      formData.append("profileImage", profilePic);
    }

    try {
      // ✅ FIX: Authorization header add kiya, "update/:id" route bhi "protect" maangta hai
      const res = await axios.put(
        `http://localhost:5000/api/seller/auth/update/${sellerId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${sellerToken}`,
          },
        }
      );

      setSeller((prev) => ({
        ...prev,
        ...res.data.seller,
        password: "",
        confirmPassword: "",
      }));
      setProfilePic(null);

      toast.success("Profile Updated Successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Update Failed", {
        position: "top-right",
        autoClose: 3000,
      });

      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("sellerToken");
        navigate("/seller/login");
      }
    }
  };

  if (!sellerId) {
    return (
      <div className="container py-5 text-center">
        <h3 className="text-danger">Access Denied</h3>
        <p>Please log in as a seller to view settings.</p>
        <button className="btn btn-dark mt-2" onClick={() => navigate("/seller/login")}>
          Go to Seller Login
        </button>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <ToastContainer />

        <div className="text-center mb-4">
          <img
            src={logo}
            alt="logo"
            className="img-fluid mb-2 Seller_signup-logo mt-5"
          />
          <h2 className="fw-bold Seller_text-brown">
            ⚙️ Seller Settings
          </h2>
          <p className="text-muted">Manage your store details and profile settings</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="card shadow-lg border-0 rounded-4 Seller_signup-card">
              <div className="card-body p-5">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {seller.profileImage && (
                      <div className="mb-3 text-center">
                        <label className="form-label fw-semibold d-block">Profile Picture</label>
                        <img
                          src={`http://localhost:5000/${seller.profileImage}`}
                          alt="Shop Logo"
                          className="rounded shadow-sm"
                          style={{ width: "200px", height: "200px", objectFit: "cover" }}
                        />
                      </div>
                    )}
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">
                        Seller Name
                      </label>
                      <input
                        type="text"
                        className="form-control Seller_form-control"
                        name="name"
                        value={seller.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">
                        Shop Name
                      </label>
                      <input
                        type="text"
                        className="form-control Seller_form-control"
                        name="shopName"
                        value={seller.shopName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control Seller_form-control"
                      name="email"
                      value={seller.email}
                      onChange={handleChange}
                      autoComplete="off"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      className="form-control Seller_form-control"
                      name="phone"
                      value={seller.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Business Address
                    </label>
                    <textarea
                      className="form-control Seller_form-control Seller_textarea"
                      rows="3"
                      name="address"
                      value={seller.address}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-semibold">
                        City
                      </label>
                      <input
                        type="text"
                        className="form-control Seller_form-control"
                        name="city"
                        value={seller.city}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-semibold">
                        State
                      </label>
                      <input
                        type="text"
                        className="form-control Seller_form-control"
                        name="state"
                        value={seller.state}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-semibold">
                        Pincode
                      </label>
                      <input
                        type="text"
                        className="form-control Seller_form-control"
                        name="pincode"
                        value={seller.pincode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="form-control Seller_form-control"
                      name="password"
                      value={seller.password}
                      onChange={handleChange}
                      placeholder="Leave blank if you don't want to change"
                      autoComplete="new-password"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control Seller_form-control"
                      name="confirmPassword"
                      value={seller.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm new password"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                       Profile Picture
                    </label>
                    <input
                      type="file"
                      className="form-control Seller_form-control Seller_file-input"
                      accept="image/*"
                      onChange={(e) => setProfilePic(e.target.files[0])}
                    />
                  </div>

                  <button
                    type="submit"
                    className="Seller_btn-brown btn-lg w-100"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;