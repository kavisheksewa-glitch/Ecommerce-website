import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaArrowLeft, FaBox, FaShoppingCart, 
  FaUsers, FaChartLine, FaBars, FaSave 
} from "react-icons/fa";
//import logoImage from "../assets/logooo.png";
import logoImage from "../../assets/logooo.png";
function AdminAddProduct() {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    category: "Pashmina",
    price: "",
    image: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("https://ecommerce-website-ggui.onrender.com/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log("Server Response:", data); // F12 dabakar Console mein check karein ye print ho raha hai ya nahi

    if (response.ok) {
      alert("Product added successfully!");
      navigate("/admin/products");
    } else {
      alert("Failed to add product");
    }
  } catch (error) {
    console.error("Error connecting to server:", error);
    alert("Backend server se connect nahi ho pa raha!");
  }
};

  return (
    <div className="container-fluid p-0" style={{ backgroundColor: "#f0fdf4", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <div className="row g-0">
        
        {/* Mobile Header Bar */}
        <div className="col-12 d-md-none d-flex justify-content-between align-items-center px-4 py-3 text-white shadow-sm sticky-top border-bottom" style={{ backgroundColor: "#064e3b", zIndex: 1060 }}>
          <div className="d-flex align-items-center gap-2">
            <img src={logoImage} alt="Logo" style={{ maxHeight: "100px", width: "auto", objectFit: "contain" }} />
            <span className="fw-semibold small text-uppercase text-light" style={{ letterSpacing: "1.5px" }}>Add Product</span>
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
            <img src={logoImage} alt="Brand Logo" style={{ maxHeight: "70px", width: "auto", objectFit: "contain" }} />
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
              <Link to="/admin/products" className="nav-link active rounded-2 py-2 px-3 shadow-sm d-flex align-items-center gap-3 text-white" style={{ backgroundColor: "#047857", fontSize: "0.95rem" }}>
                <FaBox size={15} /> Products
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
          </ul>
        </nav>

        {/* Main Content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-4 px-lg-5 py-4 py-lg-5" style={{ marginLeft: "auto" }}>
          <div className="d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom">
            <div className="d-flex align-items-center gap-3">
              <Link to="/admin/products" className="btn btn-outline-success btn-sm border-0 shadow-none"><FaArrowLeft /></Link>
              <div>
                <h1 className="h3 fw-bold mb-1" style={{ color: "#064e3b", letterSpacing: "-0.5px" }}>Add New Product</h1>
                <p className="text-muted small m-0">Fill in the details to list a new luxury item.</p>
              </div>
            </div>
          </div>

          <div className="card shadow-sm border-0 rounded-4 p-4 p-md-5 bg-white max-w-lg" style={{ border: "1px solid #e2e8f0", maxWidth: "700px" }}>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold small text-secondary">Product Title</label>
                <input 
                  type="text" 
                  name="title" 
                  className="form-control shadow-none" 
                  placeholder="e.g. Royal Kashmiri Pashmina" 
                  value={formData.title} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold small text-secondary">Category</label>
                  <select 
                    name="category" 
                    className="form-select shadow-none" 
                    value={formData.category} 
                    onChange={handleChange}
                  >
                    <option value="Pashmina">Pashmina</option>
                    <option value="Woolen">Woolen</option>
                    <option value="Silk">Silk</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold small text-secondary">Price (₹)</label>
                  <input 
                    type="text" 
                    name="category" // wait, field name check: price
                    className="form-control shadow-none" 
                    placeholder="e.g. ₹4,500" 
                    value={formData.price} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold small text-secondary">Image URL</label>
                <input 
                  type="text" 
                  name="image" 
                  className="form-control shadow-none" 
                  placeholder="Paste image link here" 
                  value={formData.image} 
                  onChange={handleChange} 
                />
              </div>

              <div className="d-flex gap-3">
                <button type="submit" className="btn text-white fw-medium shadow-sm d-flex align-items-center gap-2 px-4 py-2 rounded-pill border-0" style={{ backgroundColor: "#064e3b" }}>
                  <FaSave size={14} /> Save Product
                </button>
                <Link to="/admin/products" className="btn btn-light fw-medium px-4 py-2 rounded-pill border">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminAddProduct;