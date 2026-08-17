import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./wishlist.css";

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const userId = localStorage.getItem("userId") || "guest_user_id";
  const navigate = useNavigate();

  // Backend se wishlist items fetch karna
  const fetchWishlist = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/shawls/${userId}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setWishlistItems(data);
      }
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    }
  };

  useEffect(() => {
    fetchWishlist();

    // Event listener taaki real-time update ho sake
    window.addEventListener("wishlistUpdated", fetchWishlist);
    return () => {
      window.removeEventListener("wishlistUpdated", fetchWishlist);
    };
  }, [userId]);

  // Remove from Wishlist Handler
  const handleRemove = async (productId) => {
    try {
      const response = await fetch("http://localhost:5000/api/shawls/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId }),
      });

      if (response.ok) {
        toast.info("Removed from wishlist", { autoClose: 1000 });
        setWishlistItems((prev) => prev.filter((item) => item.productId !== productId));
        window.dispatchEvent(new Event("wishlistUpdated"));
      } else {
        toast.error("Failed to remove item");
      }
    } catch (err) {
      console.error("Error connecting to backend:", err);
      toast.error("Server connection failed");
    }
  };

  // Add to Cart Handler from Wishlist
  const handleAddToCart = async (product) => {
    try {
      const response = await fetch("http://localhost:5000/api/shawls/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          productId: product.productId,
          title: product.title,
          description: product.description,
          price: product.price,
          originalPrice: product.originalPrice,
          discount: product.discount,
          image: product.image,
          quantity: 1,
        }),
      });

      if (response.ok) {
        toast.success(`${product.title} added to cart! 🛒`, { autoClose: 1000 });
        window.dispatchEvent(new Event("cartUpdated"));
      } else {
        toast.error("Failed to add to cart");
      }
    } catch (err) {
      console.error("Error connecting to backend:", err);
      toast.error("Server connection failed");
    }
  };

  return (
    <div className="container py-5">
      <ToastContainer />
      <h1 className="text-center mb-4">My Wishlist ❤️</h1>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted fs-5">Your wishlist is empty!</p>
          <button className="btn btn-dark mt-2" onClick={() => navigate("/")}>
            Explore Products
          </button>
        </div>
      ) : (
        <div className="row">
          {wishlistItems.map((item) => (
            <div className="col-md-4 mb-4" key={item._id || item.productId}>
              <div className="card shadow h-100 border-0" style={{ borderRadius: "16px", backgroundColor: "#e4c893" }}>
                <img
                  src={item.image}
                  className="card-img-top rounded-top"
                  id="img"
                  alt={item.title}
                  style={{ height: "250px", objectFit: "cover" }}
                />

                <div className="card-body text-center d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="fw-bold text-dark">{item.title}</h5>
                    <p className="text-muted small">{item.description}</p>
                    <h4 className="text-success fw-bold">{item.price}</h4>
                  </div>

                  <div className="mt-3 d-flex justify-content-center gap-2">
                    <button className="btn btn-dark btn-sm fw-semibold" onClick={() => handleAddToCart(item)}>
                      Add to Cart
                    </button>

                    <button className="btn btn-outline-danger btn-sm fw-semibold" onClick={() => handleRemove(item.productId)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;