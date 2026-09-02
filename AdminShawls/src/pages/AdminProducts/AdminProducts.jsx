import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FaPlus, FaTrash, FaEdit, FaArrowLeft, 
  FaBox, FaShoppingCart, FaUsers, FaChartLine, FaBars, FaSearch 
} from "react-icons/fa";
//import logoImage from "../assets/logooo.png";
import logoImage from "../../assets/logooo.png";
function AdminProducts() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // 1. Products state ko empty array se start karein
  const [products, setProducts] = useState([]);

  // 2. Backend se MongoDB ka data fetch karein
  useEffect(() => {
    fetch("https://ecommerce-website-ggui.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.products);
        }
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // 3. Delete function (Database se delete karne ke liye API call kar sakte hain)
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`https://ecommerce-website-ggui.onrender.com/api/products/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setProducts(products.filter((item) => item._id !== id));
        } else {
          alert("Failed to delete product");
        }
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  // Search aur Category filter logic
  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container-fluid p-0" style={{ backgroundColor: "#f0fdf4", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <div className="row g-0">
        
        {/* Mobile Header Bar */}
        <div className="col-12 d-md-none d-flex justify-content-between align-items-center px-4 py-3 text-white shadow-sm sticky-top border-bottom" style={{ backgroundColor: "#064e3b", zIndex: 1060 }}>
          <div className="d-flex align-items-center gap-2">
            <img src={logoImage} alt="Logo" style={{ maxHeight: "30px", width: "auto", objectFit: "contain" }} />
            <span className="fw-semibold small text-uppercase text-light" style={{ letterSpacing: "1.5px" }}>Manage Products</span>
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
          <div className="d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom flex-wrap gap-3">
            <div className="d-flex align-items-center gap-3">
              <Link to="/admin/dashboard" className="btn btn-outline-success btn-sm d-md-none border-0 shadow-none"><FaArrowLeft /></Link>
              <div>
                <h1 className="h3 fw-bold mb-1" style={{ color: "#064e3b", letterSpacing: "-0.5px" }}>Manage Products</h1>
                <p className="text-muted small m-0">Curate and maintain your luxury shawl collection inventory.</p>
              </div>
            </div>
            <Link to="/admin/products/add" className="btn text-white fw-medium shadow-sm d-flex align-items-center gap-2 px-3 py-2 rounded-pill border-0 text-decoration-none" style={{ backgroundColor: "#064e3b", fontSize: "0.9rem" }}>
              <FaPlus size={14} /> Add New Product
            </Link>
          </div>

          {/* Search and Filter Controls */}
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <div className="input-group shadow-sm bg-white rounded-pill overflow-hidden border">
                <span className="input-group-text bg-white border-0 text-muted ps-3">
                  <FaSearch />
                </span>
                <input 
                  type="text" 
                  className="form-control border-0 shadow-none ps-2" 
                  placeholder="Search product by title..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <select 
                className="form-select shadow-sm rounded-pill border py-2 px-3"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Pashmina">Pashmina</option>
                <option value="Woolen">Woolen</option>
                <option value="Silk">Silk</option>
              </select>
            </div>
          </div>

          <div className="card shadow-sm border-0 rounded-4 p-3 p-md-4 bg-white" style={{ border: "1px solid #e2e8f0" }}>
            <div className="table-responsive">
              <table className="table align-middle table-hover mb-0">
                <thead className="table-light text-uppercase text-muted" style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}>
                  <tr>
                    <th className="py-3 ps-3">ID</th>
                    <th className="py-3">Product Title</th>
                    <th className="py-3">Category</th>
                    <th className="py-3">Price</th>
                    <th className="py-3 text-end pe-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((item, index) => (
                      <tr key={item._id || index} style={{ fontSize: "0.9rem" }}>
                        <td className="fw-semibold ps-3" style={{ color: "#064e3b" }}>#PRD-{index + 1}</td>
                        <td className="fw-medium">{item.title}</td>
                        <td><span className="badge px-2.5 py-1.5 rounded-pill fw-normal bg-light text-dark border">{item.category}</span></td>
                        <td className="fw-bold" style={{ color: "#064e3b" }}>{item.price}</td>
                        <td className="text-end pe-3">
                          <div className="d-flex gap-2 justify-content-end">
                            <button className="btn btn-sm btn-light text-primary border-0 p-2 rounded-circle shadow-none" title="Edit Product">
                              <FaEdit size={14} />
                            </button>
                            <button className="btn btn-sm btn-light text-danger border-0 p-2 rounded-circle shadow-none" onClick={() => handleDelete(item._id)} title="Delete Product">
                              <FaTrash size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-muted">No products found matching your search.</td>
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

export default AdminProducts;