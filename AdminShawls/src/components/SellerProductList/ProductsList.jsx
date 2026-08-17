import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SellerHeader from "../SellerHeader/SellerHeader";
import "./ProductList.css";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category");

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((response) => {
        const allProducts = response.data;
        
        if (selectedCategory) {
          const filtered = allProducts.filter(
            (product) => product.category === selectedCategory
          );
          setProducts(filtered);
        } else {
          setProducts(allProducts);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [selectedCategory]);

  return (
    <div className="Seller_dashboard-page">
      <SellerHeader />
      <div className="container py-5 mt-5">
        <h2 className="text-center fw-bold mb-4 Seller_dashboard-title">
          {selectedCategory ? `Products in "${selectedCategory}"` : "All Products"}
        </h2>

        {loading ? (
          <p className="text-center">Loading products...</p>
        ) : products.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted">No products found in this category.</p>
          </div>
        ) : (
          <div className="row">
            {products.map((product, index) => (
              <div className="col-lg-4 col-md-6 mb-4" key={index}>
                <div className="card shadow border-0 rounded-4 h-100 p-3 Seller_card">
                  {product.productImage && (
                    <img 
                      src={`http://localhost:5000/${product.productImage}`} 
                      alt={product.productName} 
                      className="card-img-top rounded-3"
                      style={{ height: "300px", objectFit: "contain" }}
                    />
                  )}
                  <div className="card-body text-center">
                    <h5 className="fw-bold">{product.productName}</h5>
                    <p className="text-muted">Price: ₹{product.price}</p>
                    <p className="small text-secondary">{product.description}</p>
                    <p className="small text-muted">Category: {product.category}</p>
                    
                    <button className="btn btn-sm btn-outline-danger me-2">Delete</button>
                    <button className="btn btn-sm btn-outline-primary">Edit</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsList;