import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FaStore, FaEnvelope, FaPhone, FaMapMarkerAlt, 
  FaShoppingCart, FaUsers, FaChartLine, FaBars, FaCheck, FaTimes 
} from "react-icons/fa";
import logoImage from "../../assets/logooo.png";

function AdminSellers() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const adminToken = localStorage.getItem("adminToken");

  const fetchSellers = async () => {
    try {
      const response = await fetch("https://ecommerce-website-ggui.onrender.com/api/seller/auth", {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
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

  const handleStatusUpdate = async (sellerId, newStatus) => {
    try {
      const response = await fetch(`https://ecommerce-website-ggui.onrender.com/api/seller/auth/status/${sellerId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (response.ok) {
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
              <Link to="/admin/users" className="nav-link text-white py-2 px-3 rounded">
                👥 View Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/sellers" className="nav-link text-white active rounded py-2 px-3 shadow-sm d-flex align-items-center gap-2" style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}>
                <FaStore /> View Sellers
              </Link>
            </li>
          </ul>
        </nav>

        {/* Main Content Area */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-3 px-md-4 py-4" style={{ marginLeft: "auto" }}>
          
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-3 mb-4 border-bottom gap-3">
            <h1 className="h4 h-md-3 fw-bold m-0" style={{ color: "#059669" }}>
              Registered Sellers ({sellers.length})
            </h1>
          </div>

          {loading && <div className="text-center py-5 fw-semibold" style={{ color: "#059669" }}>Loading sellers...</div>}
          {error && <div className="alert alert-danger text-center my-3">{error}</div>}

          {!loading && !error && (
            <div className="card shadow-sm border-0 rounded-4 p-2 p-md-3 bg-white">
              <div className="table-responsive">
                <table className="table align-middle table-hover mb-0 text-nowrap">
                  <thead className="table-light text-uppercase fs-7 text-muted">
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
                        <tr key={seller._id}>
                          <td className="fw-semibold ps-3" style={{ color: "#059669" }}>
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
                                  className="btn btn-sm btn-outline-success d-flex align-items-center gap-1 px-2 py-1"
                                  onClick={() => handleStatusUpdate(seller._id, "Approved")}
                                  title="Approve Seller"
                                >
                                  <FaCheck size={12} /> Approve
                                </button>
                              )}
                              {seller.status !== "Rejected" && (
                                <button 
                                  className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1 px-2 py-1"
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