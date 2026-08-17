// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { FaStore, FaArrowLeft, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

// function AdminSellers() {
//   const [sellers, setSellers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchSellers = async () => {
//       try {
//        const response = await fetch("http://localhost:5000/api/seller/auth/admin/sellers");
//         const data = await response.json();

//         if (response.ok) {
//           // Check karein ki data array hai ya object ke andar sellers key hai
//           setSellers(data.sellers || data);
//         } else {
//           setError(data.message || "Failed to fetch sellers");
//         }
//       } catch (err) {
//         setError("Server error while connecting to backend.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSellers();
//   }, []);

//   return (
//     <div className="container-fluid p-4" style={{ backgroundColor: "#f0fdf4", minHeight: "100vh" }}>
//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
//         <div className="d-flex align-items-center gap-3">
//           <Link to="/admin/dashboard" className="btn btn-outline-success btn-sm d-flex align-items-center gap-1">
//             <FaArrowLeft /> Back to Dashboard
//           </Link>
//           <h2 className="fw-bold m-0" style={{ color: "#064e3b" }}>
//             <FaStore className="me-2" /> Registered Sellers ({sellers.length})
//           </h2>
//         </div>
//       </div>

//       {/* Loading & Error States */}
//       {loading && <div className="text-center py-5 text-success fw-semibold">Loading sellers...</div>}
//       {error && <div className="alert alert-danger">{error}</div>}

//       {/* Sellers Table / Grid */}
//       {!loading && !error && (
//         <div className="card border-0 shadow-sm rounded-4 bg-white p-3">
//           <div className="table-responsive">
//             <table className="table align-middle table-hover mb-0">
//               <thead className="table-light text-uppercase fs-7 text-muted">
//                 <tr>
//                   <th>Seller Name</th>
//                   <th>Shop Name</th>
//                   <th>Contact Info</th>
//                   <th>Location</th>
//                   <th>Joined Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {sellers.length > 0 ? (
//                   sellers.map((seller) => (
//                     <tr key={seller._id}>
//                       <td className="fw-semibold" style={{ color: "#064e3b" }}>
//                         {seller.name}
//                       </td>
//                       <td>
//                         <span className="badge bg-success bg-opacity-10 text-success px-2 py-1">
//                           {seller.shopName || "N/A"}
//                         </span>
//                       </td>
//                       <td>
//                         <div className="small text-muted"><FaEnvelope className="me-1" /> {seller.email}</div>
//                         <div className="small text-muted"><FaPhone className="me-1" /> {seller.phone}</div>
//                       </td>
//                       <td className="small text-muted">
//                         <FaMapMarkerAlt className="me-1 text-danger" />
//                         {seller.city}, {seller.state} - {seller.pincode}
//                       </td>
//                       <td className="small text-muted">
//                         {seller.createdAt ? new Date(seller.createdAt).toLocaleDateString() : "N/A"}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="5" className="text-center py-4 text-muted">
//                       No sellers registered yet.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AdminSellers;




// new




// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { 
//   FaStore, FaArrowLeft, FaEnvelope, FaPhone, FaMapMarkerAlt, 
//   FaBox, FaShoppingCart, FaUsers, FaChartLine, FaBars 
// } from "react-icons/fa";
// import logoImage from "../../assets/logooo.png";

// function AdminSellers() {
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [sellers, setSellers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchSellers = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/seller/auth/admin/sellers");
//         const data = await response.json();

//         if (response.ok) {
//           setSellers(data.sellers || data);
//         } else {
//           setError(data.message || "Failed to fetch sellers");
//         }
//       } catch (err) {
//         setError("Server error while connecting to backend.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSellers();
//   }, []);

//   return (
//     <div className="container-fluid p-0" style={{ backgroundColor: "#f0fdf4", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
//       <div className="row g-0">
        
//         {/* Mobile Header Bar */}
//         <div className="col-12 d-md-none d-flex justify-content-between align-items-center px-4 py-3 text-white shadow-sm sticky-top border-bottom" style={{ backgroundColor: "#064e3b", zIndex: 1060 }}>
//           <div className="d-flex align-items-center gap-2">
//             <img src={logoImage} alt="Logo" style={{ maxHeight: "30px", width: "auto", objectFit: "contain" }} />
//             <span className="fw-semibold small text-uppercase text-light" style={{ letterSpacing: "1.5px" }}>Registered Sellers</span>
//           </div>
//           <button 
//             className="btn btn-link text-white p-0 text-decoration-none" 
//             onClick={() => setShowSidebar(!showSidebar)}
//             aria-label="Toggle Sidebar"
//           >
//             <FaBars size={20} />
//           </button>
//         </div>

//         {/* Backdrop for Mobile Sidebar */}
//         {showSidebar && (
//           <div 
//             className="d-md-none position-fixed top-0 start-0 w-100 h-100" 
//             style={{ backgroundColor: "rgba(0,0,0,0.3)", zIndex: 1045 }}
//             onClick={() => setShowSidebar(false)}
//           />
//         )}

//         {/* Sidebar (Royal Emerald Theme) */}
//         <nav 
//           className={`col-md-3 col-lg-2 d-md-block sidebar text-white min-vh-100 p-4 shadow-sm ${showSidebar ? "d-block" : "d-none d-md-block"}`} 
//           style={{ 
//             backgroundColor: "#064e3b", 
//             position: "fixed", 
//             top: 0, 
//             bottom: 0, 
//             left: 0, 
//             zIndex: 1050, 
//             transition: "all 0.3s ease",
//             borderRight: "1px solid #047857"
//           }}
//         >
//           <div className="d-flex justify-content-end d-md-none mb-3">
//             <button className="btn btn-sm text-white fw-light" onClick={() => setShowSidebar(false)}>✕ Close</button>
//           </div>

//           <div className="text-center py-3 border-bottom border-success mb-4">
//             <img src={logoImage} alt="Brand Logo" style={{ maxHeight: "100px", width: "auto", objectFit: "contain" }} />
//             <span className="d-block mt-3 fw-semibold text-uppercase tracking-wider small text-light" style={{ letterSpacing: "2px", fontSize: "0.75rem" }}>
//               ADMIN PANEL
//             </span>
//           </div>

//           <ul className="nav flex-column gap-2">
//             <li className="nav-item">
//               <Link to="/admin/dashboard" className="nav-link text-white py-2 px-3 rounded-2 d-flex align-items-center gap-3" style={{ fontSize: "0.95rem" }}>
//                 <FaChartLine size={15} /> Dashboard
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/admin/orders" className="nav-link text-white py-2 px-3 rounded-2 d-flex align-items-center gap-3" style={{ fontSize: "0.95rem" }}>
//                 <FaShoppingCart size={15} /> Orders
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/admin/users" className="nav-link text-white py-2 px-3 rounded-2 d-flex align-items-center gap-3" style={{ fontSize: "0.95rem" }}>
//                 <FaUsers size={15} /> Customers
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/admin/sellers" className="nav-link active rounded-2 py-2 px-3 shadow-sm d-flex align-items-center gap-3 text-white" style={{ backgroundColor: "#047857", fontSize: "0.95rem" }}>
//                 <FaStore size={15} /> View Sellers
//               </Link>
//             </li>
//           </ul>
//         </nav>

//         {/* Main Content */}
//         <main className="col-md-9 ms-sm-auto col-lg-10 px-4 px-lg-5 py-4 py-lg-5" style={{ marginLeft: "auto" }}>
//           <div className="d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom">
//             <div className="d-flex align-items-center gap-3">
//               <Link to="/admin/dashboard" className="btn btn-outline-success btn-sm d-md-none border-0 shadow-none"><FaArrowLeft /></Link>
//               <div>
//                 <h2 className="fw-bold m-0" style={{ color: "#064e3b", letterSpacing: "-0.5px" }}>
//                   Registered Sellers ({sellers.length})
//                 </h2>
//                 <p className="text-muted small m-0">View and manage accounts of registered store owners.</p>
//               </div>
//             </div>
//           </div>

//           {/* Loading & Error States */}
//           {loading && <div className="text-center py-5 text-success fw-semibold">Loading sellers...</div>}
//           {error && <div className="alert alert-danger">{error}</div>}

//           {/* Sellers Table / Grid */}
//           {!loading && !error && (
//             <div className="card shadow-sm border-0 rounded-4 p-3 p-md-4 bg-white" style={{ border: "1px solid #e2e8f0" }}>
//               <div className="table-responsive">
//                 <table className="table align-middle table-hover mb-0">
//                   <thead className="table-light text-uppercase text-muted" style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}>
//                     <tr>
//                       <th className="py-3 ps-3">Seller Name</th>
//                       <th className="py-3">Shop Name</th>
//                       <th className="py-3">Contact Info</th>
//                       <th className="py-3">Location</th>
//                       <th className="py-3 text-end pe-3">Joined Date</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {sellers.length > 0 ? (
//                       sellers.map((seller) => (
//                         <tr key={seller._id} style={{ fontSize: "0.9rem" }}>
//                           <td className="fw-semibold ps-3" style={{ color: "#064e3b" }}>
//                             {seller.name}
//                           </td>
//                           <td>
//                             <span className="badge bg-success bg-opacity-10 text-success px-2 py-1">
//                               {seller.shopName || "N/A"}
//                             </span>
//                           </td>
//                           <td>
//                             <div className="small text-muted"><FaEnvelope className="me-1" /> {seller.email}</div>
//                             <div className="small text-muted"><FaPhone className="me-1" /> {seller.phone}</div>
//                           </td>
//                           <td className="small text-muted">
//                             <FaMapMarkerAlt className="me-1 text-danger" />
//                             {seller.city}, {seller.state} - {seller.pincode}
//                           </td>
//                           <td className="small text-end pe-3 text-muted">
//                             {seller.createdAt ? new Date(seller.createdAt).toLocaleDateString() : "N/A"}
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="5" className="text-center py-4 text-muted">
//                           No sellers registered yet.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }

// export default AdminSellers;



// new1








import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FaStore, FaArrowLeft, FaEnvelope, FaPhone, FaMapMarkerAlt, 
  FaShoppingCart, FaUsers, FaChartLine, FaBars, FaCheck, FaTimes 
} from "react-icons/fa";
import logoImage from "../../assets/logooo.png";

function AdminSellers() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Sellers
  const fetchSellers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/seller/auth/admin/sellers");
      const data = await response.json();

      if (response.ok) {
        setSellers(data.sellers || data);
      } else {
        setError(data.message || "Failed to fetch sellers");
      }
    } catch (err) {
      setError("Server error while connecting to backend.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  // Handle Approve / Reject Status Update
  const handleStatusUpdate = async (sellerId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/seller/auth/admin/seller-status/${sellerId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }), // 'Approved' ya 'Rejected'
      });

      const data = await response.json();

      if (response.ok) {
        // UI mein turant state update karein
        setSellers((prevSellers) =>
          prevSellers.map((seller) =>
            seller._id === sellerId ? { ...seller, status: newStatus } : seller
          )
        );
      } else {
        alert(data.message || "Failed to update status");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Server error while updating seller status.");
    }
  };

  return (
    <div className="container-fluid p-0" style={{ backgroundColor: "#f0fdf4", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <div className="row g-0">
        
        {/* Mobile Header Bar */}
        <div className="col-12 d-md-none d-flex justify-content-between align-items-center px-4 py-3 text-white shadow-sm sticky-top border-bottom" style={{ backgroundColor: "#064e3b", zIndex: 1060 }}>
          <div className="d-flex align-items-center gap-2">
            <img src={logoImage} alt="Logo" style={{ maxHeight: "30px", width: "auto", objectFit: "contain" }} />
            <span className="fw-semibold small text-uppercase text-light" style={{ letterSpacing: "1.5px" }}>Registered Sellers</span>
          </div>
          <button 
            className="btn btn-link text-white p-0 text-decoration-none" 
            onClick={() => setShowSidebar(!showSidebar)}
            aria-label="Toggle Sidebar"
          >
            <FaBars size={20} />
          </button>
        </div>

        {/* Backdrop for Mobile Sidebar */}
        {showSidebar && (
          <div 
            className="d-md-none position-fixed top-0 start-0 w-100 h-100" 
            style={{ backgroundColor: "rgba(0,0,0,0.3)", zIndex: 1045 }}
            onClick={() => setShowSidebar(false)}
          />
        )}

        {/* Sidebar (Royal Emerald Theme) */}
        <nav 
          className={`col-md-3 col-lg-2 d-md-block sidebar text-white min-vh-100 p-4 shadow-sm ${showSidebar ? "d-block" : "d-none d-md-block"}`} 
          style={{ 
            backgroundColor: "#064e3b", 
            position: "fixed", 
            top: 0, 
            bottom: 0, 
            left: 0, 
            zIndex: 1050, 
            transition: "all 0.3s ease",
            borderRight: "1px solid #047857"
          }}
        >
          <div className="d-flex justify-content-end d-md-none mb-3">
            <button className="btn btn-sm text-white fw-light" onClick={() => setShowSidebar(false)}>✕ Close</button>
          </div>

          <div className="text-center py-3 border-bottom border-success mb-4">
            <img src={logoImage} alt="Brand Logo" style={{ maxHeight: "100px", width: "auto", objectFit: "contain" }} />
            <span className="d-block mt-3 fw-semibold text-uppercase tracking-wider small text-light" style={{ letterSpacing: "2px", fontSize: "0.75rem" }}>
              ADMIN PANEL
            </span>
          </div>

          <ul className="nav flex-column gap-2">
            <li className="nav-item">
              <Link to="/admin/dashboard" className="nav-link text-white py-2 px-3 rounded-2 d-flex align-items-center gap-3" style={{ fontSize: "0.95rem" }}>
                <FaChartLine size={15} /> Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/orders" className="nav-link text-white py-2 px-3 rounded-2 d-flex align-items-center gap-3" style={{ fontSize: "0.95rem" }}>
                <FaShoppingCart size={15} /> Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/users" className="nav-link text-white py-2 px-3 rounded-2 d-flex align-items-center gap-3" style={{ fontSize: "0.95rem" }}>
                <FaUsers size={15} /> Customers
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/sellers" className="nav-link active rounded-2 py-2 px-3 shadow-sm d-flex align-items-center gap-3 text-white" style={{ backgroundColor: "#047857", fontSize: "0.95rem" }}>
                <FaStore size={15} /> View Sellers
              </Link>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-4 px-lg-5 py-4 py-lg-5" style={{ marginLeft: "auto" }}>
          <div className="d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom">
            <div className="d-flex align-items-center gap-3">
              <Link to="/admin/dashboard" className="btn btn-outline-success btn-sm d-md-none border-0 shadow-none"><FaArrowLeft /></Link>
              <div>
                <h2 className="fw-bold m-0" style={{ color: "#064e3b", letterSpacing: "-0.5px" }}>
                  Registered Sellers ({sellers.length})
                </h2>
                <p className="text-muted small m-0">View, manage and approve accounts of registered store owners.</p>
              </div>
            </div>
          </div>

          {/* Loading & Error States */}
          {loading && <div className="text-center py-5 text-success fw-semibold">Loading sellers...</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Sellers Table */}
          {!loading && !error && (
            <div className="card shadow-sm border-0 rounded-4 p-3 p-md-4 bg-white" style={{ border: "1px solid #e2e8f0" }}>
              <div className="table-responsive">
                <table className="table align-middle table-hover mb-0">
                  <thead className="table-light text-uppercase text-muted" style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}>
                    <tr>
                      <th className="py-3 ps-3">Seller Name</th>
                      <th className="py-3">Shop Name</th>
                      <th className="py-3">Contact Info</th>
                      <th className="py-3">Location</th>
                      <th className="py-3">Status</th>
                      <th className="py-3 text-end pe-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sellers.length > 0 ? (
                      sellers.map((seller) => (
                        <tr key={seller._id} style={{ fontSize: "0.9rem" }}>
                          <td className="fw-semibold ps-3" style={{ color: "#064e3b" }}>
                            {seller.name}
                          </td>
                          <td>
                            <span className="badge bg-success bg-opacity-10 text-success px-2 py-1">
                              {seller.shopName || "N/A"}
                            </span>
                          </td>
                          <td>
                            <div className="small text-muted"><FaEnvelope className="me-1" /> {seller.email}</div>
                            <div className="small text-muted"><FaPhone className="me-1" /> {seller.phone}</div>
                          </td>
                          <td className="small text-muted">
                            <FaMapMarkerAlt className="me-1 text-danger" />
                            {seller.city}, {seller.state} - {seller.pincode}
                          </td>
                          <td>
                            <span className={`badge px-2 py-1 ${
                              seller.status === "Approved" 
                                ? "bg-success" 
                                : seller.status === "Rejected" 
                                ? "bg-danger" 
                                : "bg-warning text-dark"
                            }`}>
                              {seller.status || "Pending"}
                            </span>
                          </td>
                          <td className="text-end pe-3">
                            <div className="d-flex justify-content-end gap-2">
                              {seller.status !== "Approved" && (
                                <button 
                                  className="btn btn-sm btn-outline-success d-flex align-items-center gap-1"
                                  onClick={() => handleStatusUpdate(seller._id, "Approved")}
                                  title="Approve Seller"
                                >
                                  <FaCheck size={12} /> Approve
                                </button>
                              )}
                              {seller.status !== "Rejected" && (
                                <button 
                                  className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                                  onClick={() => handleStatusUpdate(seller._id, "Rejected")}
                                  title="Reject Seller"
                                >
                                  <FaTimes size={12} /> Reject
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center py-4 text-muted">
                          No sellers registered yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminSellers;