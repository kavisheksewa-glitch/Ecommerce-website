// import React from "react";
// import { useNavigate } from "react-router-dom";

// function SellerDetails() {
//   const navigate = useNavigate();

//   // Login ke time save hua seller data
//   const seller = JSON.parse(localStorage.getItem("seller"));

//   return (
//     <div className="container py-5 mt-5">

//       <div className="card shadow border-0 mx-auto" style={{ maxWidth: "750px" }}>

//         {/* Header */}
//         <div
//           className="card-header text-white text-center py-3"
//           style={{
//             background: "linear-gradient(90deg, #8b5a2b, #d4a373)",
//           }}
//         >
//           <h3 className="mb-0">Seller Details</h3>
//         </div>
        


//         {/* Seller Details */}
//         <div className="card-body p-4">
          
          

//           {seller ? (
//             <div className="row g-4">

              
//                {/* Profile Image */}
//               {seller.profileImage && (
//                 <div className="col-12 text-center">
//                   <label className="fw-bold d-block mb-2">
//                     Profile Image
//                   </label>

//                   <img
//                     src={`http://localhost:5000/${seller.profileImage}`}
//                     alt="Seller Profile"
//                     width="120"
//                     height="120"
//                     className="rounded-circle object-fit-cover"
//                   />
//                 </div>
//               )}

//               {/* Name */}
//               <div className="col-md-6">
//                 <label className="fw-bold">Name</label>
//                 <div className="form-control">
//                   {seller.name}
//                 </div>
//               </div>


//               {/* Email */}
//               <div className="col-md-6">
//                 <label className="fw-bold">Email</label>
//                 <div className="form-control">
//                   {seller.email}
//                 </div>
//               </div>


//               {/* Phone */}
//               <div className="col-md-6">
//                 <label className="fw-bold">Phone</label>
//                 <div className="form-control">
//                   {seller.phone}
//                 </div>
//               </div>


//               {/* Shop Name */}
//               <div className="col-md-6">
//                 <label className="fw-bold">Shop Name</label>
//                 <div className="form-control">
//                   {seller.shopName}
//                 </div>
//               </div>


//               {/* Address */}
//               <div className="col-12">
//                 <label className="fw-bold">Address</label>
//                 <div className="form-control">
//                   {seller.address}
//                 </div>
//               </div>


//               {/* City */}
//               <div className="col-md-4">
//                 <label className="fw-bold">City</label>
//                 <div className="form-control">
//                   {seller.city}
//                 </div>
//               </div>


//               {/* State */}
//               <div className="col-md-4">
//                 <label className="fw-bold">State</label>
//                 <div className="form-control">
//                   {seller.state}
//                 </div>
//               </div>


//               {/* Pincode */}
//               <div className="col-md-4">
//                 <label className="fw-bold">Pincode</label>
//                 <div className="form-control">
//                   {seller.pincode}
//                 </div>
//               </div>


//               {/* Profile Image */}
//               {/* {seller.profileImage && (
//                 <div className="col-12 text-center">
//                   <label className="fw-bold d-block mb-2">
//                     Profile Image
//                   </label>

//                   <img
//                     src={`http://localhost:5000/${seller.profileImage}`}
//                     alt="Seller Profile"
//                     width="120"
//                     height="120"
//                     className="rounded-circle object-fit-cover"
//                   />
//                 </div>
//               )} */}

//             </div>
//           ) : (
//             <div className="alert alert-warning text-center">
//               Seller details not found. Please login again.
//             </div>
//           )}


//           {/* Back Button */}
//           <div className="text-center mt-4">

//             <button
//               className="btn btn-secondary px-4"
//               onClick={() => navigate("/seller-dashboard")}
//             >
//               ← Back to Dashboard
//             </button>

//           </div>

//         </div>
//       </div>

//     </div>
//   );
// }

// export default SellerDetails;










// new







// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./SellerDetails.css";

// function SellerDetails() {
//   const navigate = useNavigate();
//   const sellerId = localStorage.getItem("sellerId");
//   const [seller, setSeller] = useState(null);

//   useEffect(() => {
//     if (!sellerId || sellerId === "null") {
//       return;
//     }
//     fetchSellerDetails();
//   }, [sellerId]);

//   const fetchSellerDetails = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/seller/auth/seller/${sellerId}`
//       );
//       setSeller(res.data);
//     } catch (error) {
//       console.log("Failed to fetch seller details", error);
//     }
//   };

//   return (
//     <div className="container py-5 mt-5">
//       <div className="card shadow border-0 mx-auto" style={{ maxWidth: "750px" }}>
//         {/* Header */}
//         <div
//           className="card-header text-white text-center py-3"
//           style={{
//             background: "linear-gradient(90deg, #8b5a2b, #d4a373)",
//           }}
//         >
//           <h3 className="mb-0">Seller Details</h3>
//         </div>

//         {/* Seller Details */}
//         <div className="card-body p-4">
//           {seller ? (
//             <div className="row g-4">
//               {/* Profile Image */}
//               {seller.profileImage && (
//                 <div className="col-12 text-center">
//                   <label className="fw-bold d-block mb-2">
//                     Profile Image
//                   </label>
//                   <img
//                     src={`http://localhost:5000/${seller.profileImage}`}
//                     alt="Seller Profile"
//                     width="120px"
//                     height="120px"
//                     className="rounded-circle object-fit-cover shadow-sm"
//                   />
//                 </div>
//               )}

//               {/* Name */}
//               <div className="col-md-6">
//                 <label className="fw-bold">Name</label>
//                 <div className="form-control bg-light">{seller.name}</div>
//               </div>

//               {/* Email */}
//               <div className="col-md-6">
//                 <label className="fw-bold">Email</label>
//                 <div className="form-control bg-light">{seller.email}</div>
//               </div>

//               {/* Phone */}
//               <div className="col-md-6">
//                 <label className="fw-bold">Phone</label>
//                 <div className="form-control bg-light">{seller.phone}</div>
//               </div>

//               {/* Shop Name */}
//               <div className="col-md-6">
//                 <label className="fw-bold">Shop Name</label>
//                 <div className="form-control bg-light">{seller.shopName}</div>
//               </div>

//               {/* Address */}
//               <div className="col-12">
//                 <label className="fw-bold">Address</label>
//                 <div className="form-control bg-light">{seller.address}</div>
//               </div>

//               {/* City */}
//               <div className="col-md-4">
//                 <label className="fw-bold">City</label>
//                 <div className="form-control bg-light">{seller.city}</div>
//               </div>

//               {/* State */}
//               <div className="col-md-4">
//                 <label className="fw-bold">State</label>
//                 <div className="form-control bg-light">{seller.state}</div>
//               </div>

//               {/* Pincode */}
//               <div className="col-md-4">
//                 <label className="fw-bold">Pincode</label>
//                 <div className="form-control bg-light">{seller.pincode}</div>
//               </div>
//             </div>
//           ) : (
//             <div className="alert alert-warning text-center">
//               Seller details not found. Please login again.
//             </div>
//           )}

//           {/* Back Button */}
//           <div className="text-center mt-4">
//             <button
//               className="btn btn-secondary px-4"
//               onClick={() => navigate("/seller-dashboard")}
//             >
//               ← Back to Dashboard
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SellerDetails;



// new



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SellerDetails.css";

function SellerDetails() {
  const navigate = useNavigate();
  const sellerId = localStorage.getItem("sellerId");
  const [seller, setSeller] = useState(null);

  useEffect(() => {
    if (!sellerId || sellerId === "null") {
      return;
    }
    fetchSellerDetails();
  }, [sellerId]);

  const fetchSellerDetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/seller/auth/seller/${sellerId}`
      );
      setSeller(res.data);
    } catch (error) {
      console.log("Failed to fetch seller details", error);
    }
  };

  return (
    <div className="container py-5 mt-5">
      <div className="card shadow border-0 mx-auto" style={{ maxWidth: "750px" }}>
        {/* Header */}
        <div
          className="card-header text-white text-center py-3"
          style={{
            background: "linear-gradient(90deg, #8b5a2b, #d4a373)",
          }}
        >
          <h3 className="mb-0">Seller Details</h3>
        </div>

        {/* Seller Details */}
        <div className="card-body p-4">
          {seller ? (
            <div className="row g-4">
              {/* Profile Image */}
              {seller.profileImage && (
                <div className="col-12 text-center">
                  <label className="fw-bold d-block mb-2">
                    Profile Image
                  </label>
                  <img
                    src={`http://localhost:5000/${seller.profileImage}`}
                    alt="Seller Profile"
                    // width="120px"
                    // height="120px"
                    className="rounded-circle object-fit-cover shadow-sm ingg"
                  />
                </div>
              )}

              {/* Name */}
              <div className="col-md-6">
                <label className="fw-bold">Name</label>
                <div className="form-control bg-light">{seller.name}</div>
              </div>

              {/* Email */}
              <div className="col-md-6">
                <label className="fw-bold">Email</label>
                <div className="form-control bg-light">{seller.email}</div>
              </div>

              {/* Phone */}
              <div className="col-md-6">
                <label className="fw-bold">Phone</label>
                <div className="form-control bg-light">{seller.phone}</div>
              </div>

              {/* Shop Name */}
              <div className="col-md-6">
                <label className="fw-bold">Shop Name</label>
                <div className="form-control bg-light">{seller.shopName}</div>
              </div>

              {/* Address */}
              <div className="col-12">
                <label className="fw-bold">Address</label>
                <div className="form-control bg-light">{seller.address}</div>
              </div>

              {/* City */}
              <div className="col-md-4">
                <label className="fw-bold">City</label>
                <div className="form-control bg-light">{seller.city}</div>
              </div>

              {/* State */}
              <div className="col-md-4">
                <label className="fw-bold">State</label>
                <div className="form-control bg-light">{seller.state}</div>
              </div>

              {/* Pincode */}
              <div className="col-md-4">
                <label className="fw-bold">Pincode</label>
                <div className="form-control bg-light">{seller.pincode}</div>
              </div>
            </div>
          ) : (
            <div className="alert alert-warning text-center">
              Seller details not found. Please login again.
            </div>
          )}

          {/* Back Button */}
          <div className="text-center mt-4">
            <button
              className="btn btn-secondary px-4"
              onClick={() => navigate("/seller-dashboard")}
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerDetails;