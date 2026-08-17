// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { 
//   FaArrowLeft, FaBox, FaShoppingCart, 
//   FaUsers, FaChartLine, FaBars 
// } from "react-icons/fa";
// //import logoImage from "../assets/logooo.png";
// import logoImage from "../../assets/logooo.png";

// function AdminUsers() {
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [users] = useState([
//     { id: 1, name: "Aarav Sharma", email: "aarav@gmail.com", joined: "12 Jan 2026" },
//     { id: 2, name: "Priya Verma", email: "priya@gmail.com", joined: "15 Jan 2026" },
//     { id: 3, name: "Rahul Singh", email: "rahul@gmail.com", joined: "20 Jan 2026" },
//   ]);

//   return (
//     <div className="container-fluid p-0" style={{ backgroundColor: "#f0fdf4", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
//       <div className="row g-0">
        
//         {/* Mobile Header Bar */}
//         <div className="col-12 d-md-none d-flex justify-content-between align-items-center px-4 py-3 text-white shadow-sm sticky-top border-bottom" style={{ backgroundColor: "#064e3b", zIndex: 1060 }}>
//           <div className="d-flex align-items-center gap-2">
//             <img src={logoImage} alt="Logo" style={{ maxHeight: "30px", width: "auto", objectFit: "contain" }} />
//             <span className="fw-semibold small text-uppercase text-light" style={{ letterSpacing: "1.5px" }}>Registered Users</span>
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
//               <Link to="/admin/products" className="nav-link text-white py-2 px-3 rounded-2 d-flex align-items-center gap-3" style={{ fontSize: "0.95rem" }}>
//                 <FaBox size={15} /> Products
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/admin/orders" className="nav-link text-white py-2 px-3 rounded-2 d-flex align-items-center gap-3" style={{ fontSize: "0.95rem" }}>
//                 <FaShoppingCart size={15} /> Orders
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/admin/users" className="nav-link active rounded-2 py-2 px-3 shadow-sm d-flex align-items-center gap-3 text-white" style={{ backgroundColor: "#047857", fontSize: "0.95rem" }}>
//                 <FaUsers size={15} /> Customers
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
//                 <h1 className="h3 fw-bold mb-1" style={{ color: "#064e3b", letterSpacing: "-0.5px" }}>Registered Users</h1>
//                 <p className="text-muted small m-0">View and manage accounts of registered patrons.</p>
//               </div>
//             </div>
//           </div>

//           <div className="card shadow-sm border-0 rounded-4 p-3 p-md-4 bg-white" style={{ border: "1px solid #e2e8f0" }}>
//             <div className="table-responsive">
//               <table className="table align-middle table-hover mb-0">
//                 <thead className="table-light text-uppercase text-muted" style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}>
//                   <tr>
//                     <th className="py-3 ps-3">User ID</th>
//                     <th className="py-3">Full Name</th>
//                     <th className="py-3">Email Address</th>
//                     <th className="py-3 text-end pe-3">Joined Date</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users.length > 0 ? (
//                     users.map((user) => (
//                       <tr key={user.id} style={{ fontSize: "0.9rem" }}>
//                         <td className="fw-semibold ps-3" style={{ color: "#064e3b" }}>#USR-{user.id}</td>
//                         <td className="fw-medium">{user.name}</td>
//                         <td className="text-muted">{user.email}</td>
//                         <td className="text-end pe-3">{user.joined}</td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="4" className="text-center py-4 text-muted">No registered users found.</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default AdminUsers;


// new




import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FaArrowLeft, FaBox, FaShoppingCart, 
  FaUsers, FaChartLine, FaBars,FaStore 
} from "react-icons/fa";
import logoImage from "../../assets/logooo.png";

function AdminUsers() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Backend se registered users fetch karna
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/shawls/auth/admin/users"); // Apne backend ka users API endpoint yahan likhein
        const data = await response.json();

        if (response.ok) {
          setUsers(data.users || data); // Depend karta hai ki backend response ka format kya hai
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error connecting to server:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container-fluid p-0" style={{ backgroundColor: "#f0fdf4", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <div className="row g-0">
        
        {/* Mobile Header Bar */}
        <div className="col-12 d-md-none d-flex justify-content-between align-items-center px-4 py-3 text-white shadow-sm sticky-top border-bottom" style={{ backgroundColor: "#064e3b", zIndex: 1060 }}>
          <div className="d-flex align-items-center gap-2">
            <img src={logoImage} alt="Logo" style={{ maxHeight: "30px", width: "auto", objectFit: "contain" }} />
            <span className="fw-semibold small text-uppercase text-light" style={{ letterSpacing: "1.5px" }}>Registered Users</span>
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
            {/* <li className="nav-item">
              <Link to="/admin/products" className="nav-link text-white py-2 px-3 rounded-2 d-flex align-items-center gap-3" style={{ fontSize: "0.95rem" }}>
                <FaBox size={15} /> Products
              </Link>
            </li> */}
            <li className="nav-item">
              <Link to="/admin/orders" className="nav-link text-white py-2 px-3 rounded-2 d-flex align-items-center gap-3" style={{ fontSize: "0.95rem" }}>
                <FaShoppingCart size={15} /> Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/users" className="nav-link active rounded-2 py-2 px-3 shadow-sm d-flex align-items-center gap-3 text-white" style={{ backgroundColor: "#047857", fontSize: "0.95rem" }}>
                <FaUsers size={15} /> Customers
              </Link>
            </li>
                {/* View Sellers Link Added Here */}
                  <li className="nav-item">
                  <Link to="/admin/sellers" className="nav-link text-white py-2 px-3 rounded d-flex align-items-center gap-2">
                <FaStore /> View Sellers
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
                <h1 className="h3 fw-bold mb-1" style={{ color: "#064e3b", letterSpacing: "-0.5px" }}>Registered Users</h1>
                <p className="text-muted small m-0">View and manage accounts of registered patrons.</p>
              </div>
            </div>
          </div>

          <div className="card shadow-sm border-0 rounded-4 p-3 p-md-4 bg-white" style={{ border: "1px solid #e2e8f0" }}>
            <div className="table-responsive">
              <table className="table align-middle table-hover mb-0">
                <thead className="table-light text-uppercase text-muted" style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}>
                  <tr>
                    <th className="py-3 ps-3">User ID</th>
                    <th className="py-3">Full Name</th>
                    <th className="py-3">Email Address</th>
                    <th className="py-3">Mobile</th>
                    <th className="py-3 text-end pe-3">Joined Date</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-muted">Loading users...</td>
                    </tr>
                  ) : users.length > 0 ? (
                    users.map((user, index) => (
                      <tr key={user._id || user.id} style={{ fontSize: "0.9rem" }}>
                        <td className="fw-semibold ps-3" style={{ color: "#064e3b" }}>#USR-{index + 1}</td>
                        <td className="fw-medium">{user.fullName}</td>
                        <td className="text-muted">{user.email}</td>
                        <td className="text-muted">{user.mobile || "N/A"}</td>
                        <td className="text-end pe-3">
                          {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-muted">No registered users found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminUsers;