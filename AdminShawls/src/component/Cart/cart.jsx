

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Not logged in -> empty cart, no point calling the API
      setCartItems([]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`https://ecommerce-website-ggui.onrender.com/api/customer/cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        // Token invalid/expired etc.
        toast.error("Please login again to view your cart");
        setCartItems([]);
        setLoading(false);
        return;
      }

      const data = await response.json();

      // Backend se { success: true, count: X, cart: [...] } aata hai
      if (data.success && Array.isArray(data.cart)) {
        setCartItems(data.cart);
      } else if (Array.isArray(data)) {
        setCartItems(data);
      } else {
        setCartItems([]);
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching cart:", err);
      toast.error("Failed to load cart items");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();

    // Home.jsx (ya kahin bhi) se "cartUpdated" event fire hone par yahan bhi refresh ho jaye
    window.addEventListener("cartUpdated", fetchCartItems);
    return () => window.removeEventListener("cartUpdated", fetchCartItems);
  }, []);

  const handleRemove = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`https://ecommerce-website-ggui.onrender.com/api/customer/cart/remove/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        toast.success("Item removed from cart");
        fetchCartItems();
        window.dispatchEvent(new Event("cartUpdated")); // Home.jsx ke isInCart state ko bhi sync karo
      } else {
        toast.error("Failed to remove item");
      }
    } catch (err) {
      console.error("Error removing item:", err);
      toast.error("Server connection failed");
    }
  };

  const handleBuyNow = (item) => {
    navigate("/checkout", { state: { product: item } });
  };

  if (loading) {
    return <div className="text-center my-5 fw-bold fs-4">Loading Cart...</div>;
  }

  return (
    <div className="container my-5">
      <ToastContainer />
      <h1 className="mb-4 text-center">Your Shopping Cart 🛒</h1>

      {cartItems.length === 0 ? (
        <div className="text-center my-5">
          <p className="text-muted fs-5">Your cart is empty!</p>
          <button
            className="btn btn-dark mt-2"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="row g-4 justify-content-center">
          <div className="col-lg-10">
            {cartItems.map((item) => (
              <div className="card customer_card mb-3 border-0 shadow-sm p-3" key={item._id}>
                <div className="row align-items-center">
                  <div className="col-md-2 text-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="img-fluid rounded"
                      style={{ height: "100px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="col-md-6">
                    <h5 className="fw-bold">{item.title}</h5>
                    <p className="text-muted small mb-1">{item.description}</p>
                    <p className="fw-bold text-danger mb-0">Rs. {item.price} (Qty: {item.quantity})</p>
                  </div>

                  <div className="col-md-4 text-md-end mt-3 mt-md-0 d-flex gap-2 justify-content-md-end">
                    <button
                      onClick={() => handleBuyNow(item)}
                      className="btn btn-warning btn-sm fw-bold text-dark px-3"
                    >
                      ⚡ Buy Now
                    </button>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="btn btn-outline-danger btn-sm fw-semibold px-3"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;