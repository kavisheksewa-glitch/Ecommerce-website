





//2 sept 2026 moring



import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { shawls } from "../../data/shawls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductDetail({ cartProductIds = [], handleAddToCart, handleBuyNow }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(
    location.state?.product || shawls.find((item) => item.id === parseInt(id)) || null
  );
  const [loading, setLoading] = useState(!product);
  const [notFound, setNotFound] = useState(false);

  // ✅ FIX: Agar product state/static list se nahi mila (jaise share link naye tab mein
  // khola gaya), to backend se seedha product fetch karo.
  useEffect(() => {
    if (product) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);

    axios
      .get("https://ecommerce-website-ggui.onrender.com/api/seller/products/public")
      .then((res) => {
        if (!isMounted) return;

        const productList = Array.isArray(res.data) ? res.data : res.data.products || [];
        const found = productList.find((p) => String(p._id) === String(id));

        if (!found) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        // ✅ Home.jsx jaisa hi formatting (discount, image, brandLogo)
        const basePrice = Number(found.price || 0);
        const discountPercent = Number(found.discount || 0);
        const finalPrice = discountPercent > 0
          ? Math.round(basePrice - (basePrice * discountPercent) / 100)
          : basePrice;

        const rawImage = found.productImage || found.image || "";
        const formattedImage = rawImage.startsWith("http")
          ? rawImage
          : rawImage
          ? `https://ecommerce-website-ggui.onrender.com/${rawImage.replace(/\\/g, "/")}`
          : "https://via.placeholder.com/400";

        const formattedProduct = {
          id: found._id,
          title: found.productName || found.title,
          description: found.description,
          price: `₹${finalPrice}`,
          originalPrice: discountPercent > 0 ? `₹${basePrice}` : "",
          discount: discountPercent > 0 ? `${discountPercent}% OFF` : null,
          image: formattedImage,
          brandLogo: found.sellerId?.brandLogo
            ? (found.sellerId.brandLogo.startsWith("http")
                ? found.sellerId.brandLogo
                : `https://ecommerce-website-ggui.onrender.com/${found.sellerId.brandLogo}`)
            : "",
          stock: `Stock: ${found.stockQuantity ?? found.stock ?? 0}`,
          fabric: found.fabric || "N/A",
          color: found.color || "N/A",
          size: found.size || "N/A",
          careInstructions: found.washCare || "N/A",
          sellerId: found.sellerId?._id || found.sellerId || "",
        };

        setProduct(formattedProduct);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        if (isMounted) {
          setNotFound(true);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // ✅ Loading state — jab tak backend se product aa nahi jaata
  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted mt-3">Loading product details...</p>
      </div>
    );
  }

  if (!product || notFound) {
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

  const isInCart = cartProductIds?.includes(String(product.id));

  // --- Authentication Check Helper ---
  const checkAuthAndExecute = (actionCallback) => {
    const currentUserId = localStorage.getItem("userId");
    
    if (!currentUserId || currentUserId === "guest_user_id" || currentUserId === "null" || currentUserId === "undefined") {
      toast.warning("🔒 Please login first to perform this action!", {
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      return;
    }

    actionCallback();
  };

  // ✅ Add to Cart with Login Check
  const onAddToCartClick = () => {
    checkAuthAndExecute(() => {
      handleAddToCart(product);
    });
  };

  // ✅ Buy Now with Login Check
  const onBuyNowClick = () => {
    checkAuthAndExecute(() => {
      handleBuyNow(product);
    });
  };

  return (
    <div className="bg-light min-vh-100 py-4 py-md-5">
      <ToastContainer />

      <div className="container">
        <button
          className="btn btn-outline-dark btn-sm mb-4 fw-semibold px-3 py-2 shadow-sm"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="bg-white rounded-4 shadow-sm border p-3 p-sm-4 p-md-5">
          <div className="row g-4 align-items-center">
            {/* Left Column: Product Image */}
            <div className="col-12 col-md-6 col-lg-5">
              <div className="position-relative overflow-hidden rounded-3 bg-light text-center border">
                <img
                  src={product.image}
                  alt={product.title}
                  className="img-fluid w-100 object-fit-cover"
                  style={{ maxHeight: "480px" }}
                />
                <span className="position-absolute top-0 end-0 m-3 badge bg-dark opacity-75 fw-normal px-3 py-2 rounded-pill">
                  {product.stock}
                </span>
              </div>
            </div>

            {/* Right Column: Product Details */}
            <div className="col-12 col-md-6 col-lg-7">
              <div className="ps-md-3 ps-lg-4">
                <div className="mb-3">
                  <span className="badge bg-secondary-subtle text-secondary text-uppercase fw-bold tracking-wider mb-2">
                    {product.fabric}
                  </span>
                  <h1 className="fw-bold text-dark fs-2 mb-2">{product.title}</h1>
                  <div className="d-flex align-items-center gap-2">
                    <h2 className="fw-bold text-dark fs-3 mb-0">{product.price}</h2>
                    {product.originalPrice && (
                      <span className="text-decoration-line-through text-muted fs-5">
                        {product.originalPrice}
                      </span>
                    )}
                    {product.discount && (
                      <span className="badge bg-danger">{product.discount}</span>
                    )}
                  </div>
                </div>

                <p className="text-muted lh-base mb-4">{product.description}</p>

                <hr className="my-4 text-secondary opacity-25" />

                <h5 className="fw-bold text-dark mb-3 fs-6 text-uppercase tracking-wider">
                  Product Specifications
                </h5>
                <div className="row g-2 mb-4">
                  <div className="col-12 col-sm-6">
                    <div className="p-3 bg-light rounded-3 border">
                      <small className="text-muted text-uppercase fw-semibold d-block fs-7">Material</small>
                      <span className="fw-bold text-dark">{product.fabric}</span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="p-3 bg-light rounded-3 border">
                      <small className="text-muted text-uppercase fw-semibold d-block fs-7">Color</small>
                      <span className="fw-bold text-dark">{product.color}</span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="p-3 bg-light rounded-3 border">
                      <small className="text-muted text-uppercase fw-semibold d-block fs-7">Dimensions</small>
                      <span className="fw-bold text-dark">{product.size}</span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="p-3 bg-light rounded-3 border">
                      <small className="text-muted text-uppercase fw-semibold d-block fs-7">Care Instructions</small>
                      <span className="fw-bold text-dark">{product.careInstructions}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
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
                        className="btn btn-success w-100 py-3 fw-bold shadow-sm"
                        onClick={onAddToCartClick}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                  <div className="col-12 col-sm-6">
                    <button
                      type="button"
                      className="btn btn-warning text-dark w-100 py-3 fw-bold shadow-sm"
                      onClick={onBuyNowClick}
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