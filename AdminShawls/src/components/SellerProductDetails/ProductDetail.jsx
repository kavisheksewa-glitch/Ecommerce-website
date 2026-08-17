import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ProductDetail({ cartProductIds = [], handleAddToCart, handleBuyNow }) {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  if (!product) {
    return (
      <div className="container text-center py-5">
        <div className="p-4 p-md-5 rounded-4 shadow-sm bg-white mx-auto border" style={{ maxWidth: "500px" }}>
          <h3 className="fw-bold mb-3">Product Details Not Found</h3>
          <p className="text-muted mb-4">The item you are looking for might have been moved or removed.</p>
          <button className="btn btn-dark px-4 py-2 fw-semibold" onClick={() => navigate("/")}>
            Back to Catalog
          </button>
        </div>
      </div>
    );
  }

  const isInCart = cartProductIds?.includes(product.id || product._id);

  return (
    <div className="bg-light min-vh-100 py-4 py-md-5">
      <div className="container">
        
        {/* Back Button */}
        <button 
          className="btn btn-outline-dark btn-sm mb-4 fw-semibold px-3 py-2 shadow-sm" 
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        {/* Main Product Card Container */}
        <div className="bg-white rounded-4 shadow-sm border p-3 p-sm-4 p-md-5">
          <div className="row g-4 align-items-center">
            
            {/* Left Column: Product Image */}
            <div className="col-12 col-md-6 col-lg-5">
              <div className="position-relative overflow-hidden rounded-3 bg-light text-center border">
                <img 
                  src={product.image || product.productImage} 
                  alt={product.title || product.productName} 
                  className="img-fluid w-100 object-fit-cover" 
                  style={{ maxHeight: "480px" }}
                />
                <span className="position-absolute top-0 end-0 m-3 badge bg-dark opacity-75 fw-normal px-3 py-2 rounded-pill">
                  Stock: {product.stock || product.stockQuantity || "Available"}
                </span>
              </div>
            </div>

            {/* Right Column: Product Details */}
            <div className="col-12 col-md-6 col-lg-7">
              <div className="ps-md-3 ps-lg-4">
                
                {/* Header */}
                <div className="mb-3">
                  <span className="badge bg-secondary-subtle text-secondary text-uppercase fw-bold tracking-wider mb-2">
                    {product.fabric || product.material || "Shawl"}
                  </span>
                  <h1 className="fw-bold text-dark fs-2 mb-2">{product.title || product.productName}</h1>
                  <h2 className="fw-bold text-dark fs-3 mb-0">₹{product.price}</h2>
                </div>

                <p className="text-muted lh-base mb-4">{product.description || "No description available."}</p>

                <hr className="my-4 text-secondary opacity-25" />

                {/* Responsive Specifications Grid */}
                <h5 className="fw-bold text-dark mb-3 fs-6 text-uppercase tracking-wider">
                  Product Specifications
                </h5>
                <div className="row g-2 mb-4">
                  <div className="col-12 col-sm-6">
                    <div className="p-3 bg-light rounded-3 border">
                      <small className="text-muted text-uppercase fw-semibold d-block fs-7">Material</small>
                      <span className="fw-bold text-dark">{product.fabric || product.material || "N/A"}</span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="p-3 bg-light rounded-3 border">
                      <small className="text-muted text-uppercase fw-semibold d-block fs-7">Color</small>
                      <span className="fw-bold text-dark">{product.color || "N/A"}</span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="p-3 bg-light rounded-3 border">
                      <small className="text-muted text-uppercase fw-semibold d-block fs-7">Dimensions</small>
                      <span className="fw-bold text-dark">{product.size || product.dimensions || "N/A"}</span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="p-3 bg-light rounded-3 border">
                      <small className="text-muted text-uppercase fw-semibold d-block fs-7">Care Instructions</small>
                      <span className="fw-bold text-dark">{product.washCare || product.careInstructions || "N/A"}</span>
                    </div>
                  </div>
                </div>

                {/* Responsive Action Buttons */}
                <div className="row g-2 mb-3">
                  <div className="col-12 col-sm-6">
                    {isInCart ? (
                      <button 
                        type="button" 
                        className="btn btn-success w-100 py-3 fw-bold shadow-sm" 
                        onClick={() => navigate("/cart")}
                      >
                        Go to Cart →
                      </button>
                    ) : (
                      <button 
                        type="button" 
                        className="btn btn-dark w-100 py-3 fw-bold shadow-sm" 
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                  <div className="col-12 col-sm-6">
                    <button 
                      type="button" 
                      className="btn btn-warning text-dark w-100 py-3 fw-bold shadow-sm"
                      onClick={() => handleBuyNow(product)}
                    >
                      ⚡ Buy Now
                    </button>
                  </div>
                </div>

                <div className="text-muted small">
                  <small>{product.updated}</small>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}