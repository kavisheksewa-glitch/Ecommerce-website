import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FaBox, FaShoppingCart, 
  FaUsers, FaChartLine, FaBars, FaStore 
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
        const token = localStorage.getItem("adminToken");

        const response = await fetch("https://ecommerce-website-ggui.onrender.com/api/admin/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }); 

        const data = await response.json();

        if (response.ok) {
          setUsers(data.users || data); 
        } else {
          console.error("Failed to fetch users:", data.message);
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
    <div className="container-fluid" style={{ backgroundColor: "#ECFDF5", minHeight: "100vh", overflowX: "hidden" }}>
      <div className="row">
        
        {/* Mobile & Tablet Navbar Header */}
        <div className="col-12 d-md-none d-flex justify-content-between align-items-center p-3 text-white shadow-sm" style={{ background: "linear-gradient(135deg, #065f46 0%, #059669 50%, #34d399 100%)" }}>
          <div className="d-flex align-items-center gap-2">
            <div 
              className="bg-white d-flex align-items-center justify-content-center shadow-sm" 
              style={{ width: "42px", height: "42px", borderRadius: "50%", padding: "4px", overflow: "hidden" }}
            >
              <img src={logoImage} alt="Logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <span className="fw-bold small text-white">ADMIN</span>
          </div>
          <button 
            className="btn btn-outline-light btn-sm border-0" 
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <FaBars size={22} />
          </button>
        </div>

        {/* Sidebar for Desktop & Mobile Toggle */}
        <nav 
          className={`col-md-3 col-lg-2 d-md-block sidebar text-white min-vh-100 p-3 shadow-sm ${showSidebar ? "d-block" : "d-none d-md-block"}`} 
          style={{ background: "linear-gradient(180deg, #065f46 0%, #059669 60%, #047857 100%)", position: "fixed", top: 0, bottom: 0, left: 0, zIndex: 1050, transition: "0.3s ease" }}
        >
          <div className="d-flex justify-content-end d-md-none mb-2">
            <button className="btn btn-sm text-white fw-bold" onClick={() => setShowSidebar(false)}>✕ Close</button>
          </div>

          <div className="text-center py-3 mb-3 border-bottom" style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}>
            <div 
              className="bg-white shadow-sm mx-auto d-flex align-items-center justify-content-center" 
              style={{ 
                width: "75px", 
                height: "75px", 
                borderRadius: "50%", 
                padding: "6px",
                overflow: "hidden" 
              }}
            >
              <img src={logoImage} alt="Kavi Shawls Logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <span className="d-block mt-2 fw-bold text-light small tracking-wider">ADMIN PANEL</span>
          </div>

          <ul className="nav flex-column gap-2 mt-2">
            <li className="nav-item">
              <Link to="/admin/dashboard" className="nav-link text-white py-2 px-3 rounded">
                📊 Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/orders" className="nav-link text-white py-2 px-3 rounded">
                📦 Manage Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/users" className="nav-link text-white active rounded py-2 px-3 shadow-sm" style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}>
                👥 View Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/sellers" className="nav-link text-white py-2 px-3 rounded d-flex align-items-center gap-2">
                <FaStore /> View Sellers
              </Link>
            </li>
          </ul>
        </nav>

        {/* Main Content Area */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-3 px-md-4 py-4" style={{ marginLeft: "auto" }}>
          
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-3 mb-4 border-bottom gap-3">
            <h1 className="h4 h-md-3 fw-bold m-0" style={{ color: "#059669" }}>Registered Users</h1>
          </div>

          <div className="card shadow-sm border-0 rounded-4 p-2 p-md-3 bg-white">
            <div className="table-responsive">
              <table className="table align-middle table-hover mb-0 text-nowrap">
                <thead className="table-light text-uppercase fs-7 text-muted">
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
                      <tr key={user._id || user.id}>
                        <td className="fw-semibold ps-3" style={{ color: "#059669" }}>#USR-{index + 1}</td>
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