import React, { useState } from "react";
import "./InventoryStock.css";
//import logo from "../assets/logooo.png";
//import SellerHeader from "../SellerHeader";
import logo from "../../assets/logooo.png";
import SellerHeader from "../SellerHeader/SellerHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function InventoryStock() {
  const [products, setProducts] = useState([
    { id: 1, name: "Luxury Pashmina Shawl", category: "Pashmina", stock: 25, status: "In Stock" },
    { id: 2, name: "Cashmere Shawl", category: "Cashmere", stock: 5, status: "Low Stock" },
    { id: 3, name: "Silk Shawl", category: "Silk", stock: 0, status: "Out of Stock" },
    { id: 4, name: "Wool Shawl", category: "Wool", stock: 18, status: "In Stock" },
    { id: 5, name: "Designer Shawl", category: "Designer", stock: 7, status: "Low Stock" },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [updatedStock, setUpdatedStock] = useState("");

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "In Stock":
        return "bg-success";
      case "Low Stock":
        return "bg-warning text-dark";
      case "Out of Stock":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  const handleStartEdit = (product) => {
    setEditingId(product.id);
    setUpdatedStock(product.stock);
  };

  const handleSaveStock = (productId) => {
    const numStock = parseInt(updatedStock, 10);

    if (isNaN(numStock) || numStock < 0) {
      toast.error("Please enter a valid positive number for stock.", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    let newStatus = "In Stock";
    if (numStock === 0) {
      newStatus = "Out of Stock";
    } else if (numStock <= 10) {
      newStatus = "Low Stock";
    }

    setProducts(
      products.map((p) =>
        p.id === productId ? { ...p, stock: numStock, status: newStatus } : p
      )
    );

    setEditingId(null);
    toast.success("Stock updated successfully!", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setUpdatedStock("");
  };

  return (
    <div className="container py-5 mt-5">
      <ToastContainer />
      <SellerHeader />
      
      <div className="text-center mb-5">
        <img 
          src={logo} 
          alt="Logo" 
          className="Seller_dashboard-logo mb-2 shadow-sm rounded-circle" 
          style={{ width: "90px", height: "90px", objectFit: "cover" }} 
        />
        <h2 className="fw-bold Seller_dashboard-title text-dark">Inventory Stock</h2>
        <p className="text-muted">Manage and monitor your product stock levels in real-time</p>
      </div>

      <div className="row g-4">
        {products.map((product) => (
          <div key={product.id} className="col-12 col-md-6 col-lg-4">
            <div className="Seller_card h-100 shadow-sm border-0 p-2">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="card-title fw-bold text-dark mb-0">{product.name}</h5>
                    <span className={`badge ${getStatusBadgeClass(product.status)} px-2 py-1`}>
                      {product.status}
                    </span>
                  </div>
                  
                  <p className="text-muted mb-1">
                    <strong>Category:</strong> {product.category}
                  </p>

                  {editingId === product.id ? (
                    <div className="mb-3 mt-3 p-2 bg-light rounded border">
                      <label className="form-label small fw-semibold text-secondary mb-1">Update Stock Units:</label>
                      <input
                        type="number"
                        className="form-control form-control-sm mb-2"
                        value={updatedStock}
                        onChange={(e) => setUpdatedStock(e.target.value)}
                        min="0"
                        autoFocus
                      />
                      <div className="d-flex gap-2">
                        <button
                          onClick={() => handleSaveStock(product.id)}
                          className="btn btn-sm btn-success w-50 py-1 fw-semibold"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="btn btn-sm btn-secondary w-50 py-1 fw-semibold"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="mb-3">
                      <strong>Available Stock:</strong>{" "}
                      <span className={product.stock === 0 ? "text-danger fw-bold" : "fw-bold"}>
                        {product.stock} units
                      </span>
                    </p>
                  )}
                </div>
                
                {editingId !== product.id && (
                  <button 
                    onClick={() => handleStartEdit(product)}
                    className="btn btn-sm w-100 py-2 fw-semibold text-white shadow-sm" 
                    style={{ backgroundColor: "#3a954f", border: "none" }}
                  >
                    Update Stock
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InventoryStock;