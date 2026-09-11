import React, { useState, useEffect } from "react";
import axios from "axios";
import image112 from "../../assets/featured.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaShareAlt, FaLink, FaHeart, FaFilter } from "react-icons/fa";
import {
  WhatsappShareButton,
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  WhatsappIcon,
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
} from "react-share";
import "./Featuredcol.css";
import { featuredShawls } from "../../data/shawls";

function Featuredcoll() {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([...featuredShawls]);
  const [shareProduct, setShareProduct] = useState(null);
  const [cartProductIds, setCartProductIds] = useState([]);
  const [wishlistProductIds, setWishlistProductIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedFabric, setSelectedFabric] = useState("All");
  const [selectedColor, setSelectedColor] = useState("All");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // ✅ Sirf JWT "token" ke basis pe auth check hota hai
  const checkAuthAndExecute = (actionCallback) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.warning("🔒 Please login first to perform this action!", {
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      return;
    }
    actionCallback(token);
  };

  const fetchCartAndWishlist = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCartProductIds([]);
      setWishlistProductIds([]);
      return;
    }

    fetch("https://ecommerce-website-ggui.onrender.com/api/customer/cart", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.cart)) {
          setCartProductIds(data.cart.map((item) => String(item.productId)));
        }
      })
      .catch((err) => console.error("Cart fetch error", err));

    fetch("https://ecommerce-website-ggui.onrender.com/api/customer/wishlist", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.wishlist)) {
          setWishlistProductIds(data.wishlist.map((item) => String(item.productId)));
        }
      })
      .catch((err) => console.error("Wishlist fetch error", err));
  };

  useEffect(() => {
    axios.get("https://ecommerce-website-ggui.onrender.com/api/seller/products/public")
      .then((res) => {
        if (Array.isArray(res.data)) {
          const dbProducts = res.data
            .filter((p) => p.category === "Featured Shawls")
            .map((p, index) => {
              // ✅ seller ne jo price enter kiya wahi "original" price hai; discount hone par
              // actual bikne wala price (finalPrice) usse kam hoga
              const basePrice = Number(p.price || 0);
              const discountPercent = Number(p.discount || 0);
              const finalPrice = discountPercent > 0
                ? Math.round(basePrice - (basePrice * discountPercent) / 100)
                : basePrice;

              return {
                id: p._id,
                title: p.productName,
                description: p.description,
                price: `₹${finalPrice}`,
                rawPrice: finalPrice || 0,
              originalPrice: discountPercent > 0 ? `₹${basePrice}` : "",
              discount: discountPercent > 0 ? `${discountPercent}% OFF` : null,
             
              image: p.productImage?.startsWith("http") ? p.productImage : `https://ecommerce-website-ggui.onrender.com/${p.productImage}`, // ✅ SAHI CODE
              brandLogo: p.sellerId?.brandLogo ? (p.sellerId.brandLogo.startsWith("http") ? p.sellerId.brandLogo : `https://ecommerce-website-ggui.onrender.com/${p.sellerId.brandLogo}`): "",
              stock: `Stock: ${p.stockQuantity}`,
              fabric: p.fabric || "N/A",
              color: p.color || "N/A",
              size: p.size || "N/A",
              careInstructions: p.washCare || "N/A",
              createdAt: p.createdAt ? new Date(p.createdAt).getTime() : index,
              sellerId: p.sellerId?._id || p.sellerId || "",
            };
          });

          const formattedStatic = featuredShawls.map((item, index) => ({
            ...item,
            rawPrice: Number(item.price.replace(/[^0-9]/g, "")) || 0,
            createdAt: index,
          }));

          setAllProducts([...formattedStatic, ...dbProducts]);
        }
      })
      .catch((err) => {
        console.error("Error fetching live products:", err);
        const formattedStatic = featuredShawls.map((item, index) => ({
          ...item,
          rawPrice: Number(item.price.replace(/[^0-9]/g, "")) || 0,
          createdAt: index,
        }));
        setAllProducts(formattedStatic);
      });

    fetchCartAndWishlist();
    window.addEventListener("cartUpdated", fetchCartAndWishlist);
    window.addEventListener("wishlistUpdated", fetchCartAndWishlist);
    return () => {
      window.removeEventListener("cartUpdated", fetchCartAndWishlist);
      window.removeEventListener("wishlistUpdated", fetchCartAndWishlist);
    };
  }, []);

  const fabrics = [...new Set(allProducts.map((p) => p.fabric).filter((f) => f && f !== "N/A"))];
  const colors = ["All", ...new Set(allProducts.map((p) => p.color).filter((c) => c && c !== "N/A"))];

  const getProcessedProducts = () => {
    let list = [...allProducts];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      list = list.filter((item) => item.title?.toLowerCase().includes(query));
    }

    if (selectedFabric !== "All") {
      list = list.filter((item) => item.fabric === selectedFabric);
    }

    if (selectedColor !== "All") {
      list = list.filter((item) => item.color === selectedColor);
    }

    list = list.filter((item) => item.rawPrice <= maxPrice);

    if (sortBy === "low-high") {
      list.sort((a, b) => a.rawPrice - b.rawPrice);
    } else if (sortBy === "high-low") {
      list.sort((a, b) => b.rawPrice - a.rawPrice);
    } else if (sortBy === "newest") {
      list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    }

    return list;
  };

  const filteredProducts = getProcessedProducts();

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedFabric, selectedColor, maxPrice, sortBy]);

  const copyLink = async () => {
    try {
      const url = `${window.location.origin}/product/${shareProduct.id}`;
      await navigator.clipboard.writeText(url);
      toast.success("Link copied successfully!");
      setShareProduct(null);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  // ✅ ADD TO CART
  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");
       if (!token) {
         toast.error("Please login first!");
         navigate("/login");
         return;
       }
   
       try {
         const response = await fetch("https://ecommerce-website-ggui.onrender.com/api/customer/cart/add", {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${token}`,
           },
           body: JSON.stringify({
             productId: product.id,
             title: product.title,
             description: product.description,
             price: product.price,
             originalPrice: product.originalPrice || "",
             discount: product.discount || "",
             image: product.image,
             quantity: 1,
             sellerId: product.sellerId,
           }),
         });
   
         if (response.ok) {
           toast.success(`${product.title} added to cart! 🛒`, {
             position: "top-right",
             autoClose: 1000,
           });
           setCartProductIds((prev) => [...prev, String(product.id)]);
           window.dispatchEvent(new Event("cartUpdated"));
         } else {
           toast.error("Failed to add to cart");
         }
       } catch (err) {
         console.error("Error connecting to backend:", err);
         toast.error("Server connection failed");
       }
  };

  // ✅ WISHLIST
  const handleToggleWishlist = (product) => {
    checkAuthAndExecute(async (token) => {
      const isWishlisted = wishlistProductIds.includes(String(product.id));

      try {
        if (isWishlisted) {
          const res = await fetch("https://ecommerce-website-ggui.onrender.com/api/customer/wishlist", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          const wishlistItem = data.wishlist?.find((w) => String(w.productId) === String(product.id));

          if (wishlistItem) {
            const delRes = await fetch(
              `https://ecommerce-website-ggui.onrender.com/api/customer/wishlist/remove/${wishlistItem._id}`,
              { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
            );
            if (delRes.ok) {
              toast.info(`${product.title} removed from wishlist`, { autoClose: 1000 });
              setWishlistProductIds((prev) => prev.filter((id) => id !== String(product.id)));
            }
          }
        } else {
          const response = await fetch("https://ecommerce-website-ggui.onrender.com/api/customer/wishlist/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              productId: product.id,
              title: product.title,
              description: product.description,
              price: product.price,
              image: product.image,
            }),
          });
          if (response.ok) {
            toast.success(`${product.title} added to wishlist ❤️`, { autoClose: 1000 });
            setWishlistProductIds((prev) => [...prev, String(product.id)]);
          }
        }
        window.dispatchEvent(new Event("wishlistUpdated"));
      } catch (err) { toast.error("Error updating wishlist"); }
    });
  };

  // ✅ BUY NOW
  const handleBuyNow = (product) => {
    checkAuthAndExecute(async (token) => {
      if (!cartProductIds.includes(String(product.id))) {
        try {
          await fetch("https://ecommerce-website-ggui.onrender.com/api/customer/cart/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              productId: product.id,
              title: product.title,
              description: product.description,
              price: product.price,
              originalPrice: product.originalPrice || "",
              discount: product.discount || "",
              image: product.image,
              quantity: 1,
              sellerId: product.sellerId || "",
            }),
          });
          window.dispatchEvent(new Event("cartUpdated"));
        } catch (err) {
          console.error(err);
        }
      }
      navigate("/checkout", { state: { product } });
    });
  };

  const handleShare = (product) => {
    setShareProduct(product);
  };

  const resetFilters = () => {
    setSelectedFabric("All");
    setSelectedColor("All");
    setMaxPrice(5000);
    setSortBy("newest");
    setSearchQuery("");
  };

  return (
    <div className="Customer_container1">
      <ToastContainer />

      {/* Responsive, professional card & button styling — same structure/feature as Home.jsx */}
      <style>{`
        .Customer_card {
          padding: 10px !important;
        }
        .Customer_product-image-box {
          aspect-ratio: 1 / 1;
          width: 100%;
        }
        .Customer_product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .Customer_brand-logo-box {
          position: absolute;
          top: 10px;
          left: 10px;
          width: 50px;
          height: 50px;
          z-index: 3;
        }
        .Customer_discount-badge {
          font-size: 0.72rem;
          padding: 4px 8px;
        }
        .Customer_wishlist-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 35px;
          height: 35px;
        }
        .Customer_card-title {
          font-size: 0.86rem;
          margin-bottom: 4px !important;
        }
        .Customer_card-desc {
          font-size: 0.74rem;
          min-height: 2.2em;
        }
        .Customer_share-btn-flat {
          flex-shrink: 0;
          border: none;
          background: transparent;
          padding: 2px;
          color: #6b4e14;
          font-size: 15px;
          line-height: 1;
          cursor: pointer;
          transition: color 0.2s ease, transform 0.2s ease;
        }
        .Customer_share-btn-flat:hover {
          color: #b8860b;
          transform: scale(1.15);
        }
        .Customer_price-row {
          margin-bottom: 10px !important;
          flex-wrap: wrap;
          row-gap: 4px;
        }
        .Customer_price-main {
          font-size: 0.9rem;
        }
        .Customer_price-original {
          font-size: 0.72rem;
        }
        .Customer_card-btn {
          font-size: clamp(0.68rem, 2.4vw, 0.85rem);
          padding: 6px 8px;
          letter-spacing: 0.2px;
          white-space: nowrap;
          line-height: 1.3;
        }
        .Customer_buy-now-btn {
          font-size: clamp(0.72rem, 2.4vw, 0.9rem);
          padding: 7px 8px;
        }

        /* TABLET */
        @media (max-width: 767.98px) and (min-width: 576px) {
          .Customer_brand-logo-box {
            width: 42px;
            height: 42px;
          }
          .Customer_wishlist-btn {
            width: 34px;
            height: 34px;
            font-size: 15px;
          }
          .Customer_share-btn-flat {
            font-size: 17px;
          }
        }

        /* MOBILE */
        @media (max-width: 575.98px) {
          .Customer_card {
            padding: 7px !important;
            border-radius: 12px !important;
          }
          .Customer_brand-logo-box {
            width: 34px;
            height: 34px;
            top: 6px;
            left: 6px;
          }
          .Customer_discount-badge {
            font-size: 0.62rem;
            padding: 3px 6px !important;
          }
          .Customer_wishlist-btn {
            width: 30px;
            height: 30px;
            top: 6px;
            right: 6px;
            font-size: 14px;
          }
          .Customer_share-btn-flat {
            font-size: 16px;
          }
          .Customer_card-body {
            padding: 8px 4px !important;
          }
          .Customer_card-title {
            font-size: 0.78rem;
            line-height: 1.25;
          }
          .Customer_card-desc {
            font-size: 0.68rem;
            min-height: 1.8em;
          }
          .Customer_price-main {
            font-size: 0.82rem;
          }
          .Customer_price-original {
            font-size: 0.65rem;
          }
          .Customer_card-btn {
            font-size: 0.68rem;
            padding: 5px 4px;
            letter-spacing: 0.1px;
          }
          .Customer_buy-now-btn {
            font-size: 0.72rem;
            padding: 6px 4px;
          }
          .Customer_card-actions {
            gap: 6px !important;
          }
        }
      `}</style>

      {shareProduct && (
        <div className="Customer_share-overlay">
          <div className="Customer_share-modal">
            <h4 className="fw-bold mb-1">Share Product</h4>
            <p className="text-muted small">{shareProduct.title}</p>

            <div className="Customer_share-icons">
              <WhatsappShareButton url={`${window.location.origin}/product/${shareProduct.id}`}>
                <WhatsappIcon size={46} round />
              </WhatsappShareButton>

              <FacebookShareButton url={`${window.location.origin}/product/${shareProduct.id}`}>
                <FacebookIcon size={46} round />
              </FacebookShareButton>

              <TwitterShareButton url={`${window.location.origin}/product/${shareProduct.id}`}>
                <TwitterIcon size={46} round />
              </TwitterShareButton>

              <EmailShareButton url={`${window.location.origin}/product/${shareProduct.id}`}>
                <EmailIcon size={46} round />
              </EmailShareButton>
            </div>

            <button className="Customer_copy-btn" onClick={copyLink}>
              <FaLink className="me-2" /> Copy Link
            </button>

            <button className="Customer_close-btn" onClick={() => setShareProduct(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      

      <h1 className="Customer_luxury-title text-center my-4 fw-bold fst-italic" style={{ color: "#54411d" }}>FEATURED COLLECTION</h1>
      <img src={image112} alt="Banner" className="Customer_hero-image w-100 mb-4" />

      <div className="container my-3 text-center">
        <div className="position-relative mx-auto" style={{ maxWidth: "600px" }}>
          <span
            className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted"
            style={{ pointerEvents: "none" }}
          >
            <i className="bi bi-search"></i>
          </span>

          <input
            type="text"
            placeholder="Search featured shawls..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control w-100 shadow-sm"
            style={{
              padding: "12px 15px 12px 45px",
              borderRadius: "30px",
              border: "1px solid #ccc",
              fontSize: "0.95rem",
            }}
          />
        </div>
      </div>

      
      <div className="container my-3">
        <div className="d-flex flex-wrap justify-content-between align-items-center bg-white p-3 rounded-4 shadow-sm gap-3 border">
          <div className="text-muted small fw-semibold">
            {filteredProducts.length > 0
              ? `Showing ${indexOfFirstProduct + 1}-${Math.min(
                  indexOfLastProduct,
                  filteredProducts.length
                )} of ${filteredProducts.length} products`
              : "No products found"}
          </div>

          <div className="d-flex align-items-center gap-3">
            <button
              className="btn btn-outline-dark btn-sm d-flex align-items-center gap-1 rounded-pill px-3"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter /> Filters
            </button>

            <div className="d-flex align-items-center gap-2">
              <span className="text-muted small fw-semibold">Sort By:</span>
              <select
                className="form-select form-select-sm rounded-pill px-3"
                style={{ width: "160px" }}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {showFilters && (
          <div className="row g-3 mt-2 p-4 bg-white border rounded-4 shadow-sm position-relative">
            <button
              type="button"
              className="btn-close position-absolute top-0 end-0 m-3"
              aria-label="Close"
              onClick={() => setShowFilters(false)}
            ></button>

            <h5 className="fw-bold mb-3">Filter Options</h5>

            <div className="col-md-6">
              <label className="form-label fw-bold small text-secondary">
                Price Range: ₹{maxPrice}
              </label>
              <input
                type="range"
                className="form-range"
                min="500"
                max="10000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
              <div className="d-flex justify-content-between text-muted small">
                <span>₹500</span>
                <span>₹10000</span>
              </div>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold small text-secondary d-block">
                Material / Fabric
              </label>
              <div className="d-flex flex-wrap gap-3 align-items-center mt-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="fabricRadioFeatured"
                    id="fabricAllFeatured"
                    checked={selectedFabric === "All"}
                    onChange={() => setSelectedFabric("All")}
                  />
                  <label className="form-check-label small" htmlFor="fabricAllFeatured">
                    All
                  </label>
                </div>
                {fabrics.map((fab, idx) => (
                  <div className="form-check" key={idx}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="fabricRadioFeatured"
                      id={`fabricFeatured-${idx}`}
                      checked={selectedFabric === fab}
                      onChange={() => setSelectedFabric(fab)}
                    />
                    <label className="form-check-label small" htmlFor={`fabricFeatured-${idx}`}>
                      {fab}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-12 text-end mt-3">
              <button
                className="btn btn-outline-danger btn-sm px-4"
                onClick={resetFilters}
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* --- PRODUCTS GRID (same card structure/feature as Home.jsx) --- */}
      <div className="container my-5">
        <div className="row g-2 g-md-4">
          {currentProducts.length > 0 ? (
            currentProducts.map((item) => {
              const pid = String(item.id);
              const isInCart = cartProductIds.includes(pid);
              const isWishlisted = wishlistProductIds.includes(pid);

              return (
                <div className="col-6 col-sm-6 col-md-4 col-lg-3" key={pid}>
                  <div
                    className="Customer_card h-100 border-0 shadow-sm d-flex flex-column justify-content-between p-2 position-relative"
                    style={{
                      backgroundColor: "#e4c893",
                      borderRadius: "16px",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      navigate(`/product/${item.id}`, { state: { product: item } })
                    }
                  >
                    <div className="Customer_product-image-box card overflow-hidden position-relative">
                      {item.brandLogo && (
                        <div
                          className="Customer_brand-logo-box shadow-sm rounded-circle overflow-hidden bg-white d-flex align-items-center justify-content-center"
                          style={{ border: "1.5px solid #fff" }}
                          title="Brand Logo"
                        >
                          <img
                            src={
                              item.brandLogo.startsWith("http")
                                ? item.brandLogo
                                : `https://ecommerce-website-ggui.onrender.com/${item.brandLogo}`
                            }
                            alt="Brand Logo"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </div>
                      )}

                      <img
                        src={item.image}
                        className="card-img-top rounded Customer_product-image"
                        alt={item.title}
                      />

                      <button
                        className="Customer_wishlist-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleWishlist(item);
                        }}
                        title="Wishlist Product"
                        style={{
                          background: "white",
                          border: "none",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                          color: isWishlisted ? "red" : "#ccc",
                          transition: "color 0.2s ease",
                          zIndex: 2,
                        }}
                      >
                        <FaHeart />
                      </button>
                    </div>

                    <div className="Customer_card-body px-2 py-3 d-flex flex-column justify-content-between">
                      <div>
                        <div className="d-flex justify-content-between align-items-start gap-2 mb-1">
                          <h6 className="Customer_card-title fw-bold mb-0 text-dark">
                            {item.title}
                          </h6>

                          <button
                            className="Customer_share-btn-flat"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare(item);
                            }}
                            title="Share Product"
                          >
                            <FaShareAlt />
                          </button>
                        </div>

                        <p className="Customer_card-desc text-muted small mb-2 Customer_text-truncate-2">
                          {item.description}
                        </p>

                        <div className="Customer_price-row d-flex align-items-center mb-3">
                          <div className="d-flex align-items-center gap-2 flex-wrap">
                            <span className="Customer_price-main fw-bold text-success">{item.price}</span>
                            {item.originalPrice && (
                              <span className="Customer_price-original text-decoration-line-through text-muted">
                                {item.originalPrice}
                              </span>
                            )}
                            {item.discount && (
                              <span
                                className="Customer_discount-badge badge bg-danger fw-bold"
                                style={{ borderRadius: "6px" }}
                              >
                                {item.discount}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="Customer_card-actions d-flex flex-column gap-2 mt-auto">
                        {isInCart ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate("/cart");
                            }}
                            className="Customer_card-btn btn w-100 fw-semibold text-white"
                            style={{ backgroundColor: "#2b8a3e", border: "none", borderRadius: "8px" }}
                          >
                            Go to Cart
                          </button>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(item);
                            }}
                            className="Customer_card-btn btn btn-dark w-100 fw-semibold text-white"
                            style={{ backgroundColor: "#166228", border: "none", borderRadius: "8px" }}
                          >
                            Add to Cart
                          </button>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBuyNow(item);
                          }}
                          className="Customer_card-btn Customer_buy-now-btn btn w-100 fw-bold text-white border-0 shadow-sm"
                          style={{ background: "linear-gradient(135deg, #d6bd69 0%, #dfa00b 100%)", borderRadius: "8px" }}
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-12 text-center py-5">
              <p className="text-muted fs-5">No featured shawls found matching your filters.</p>
              <button className="btn btn-outline-dark btn-sm mt-2" onClick={resetFilters}>
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <nav className="d-flex justify-content-center mt-5">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                  Previous
                </button>
              </li>

              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(index + 1)}
                    style={
                      currentPage === index + 1
                        ? { backgroundColor: "#54411d", borderColor: "#54411d", color: "#fff" }
                        : { color: "#54411d" }
                    }
                  >
                    {index + 1}
                  </button>
                </li>
              ))}

              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}

export default Featuredcoll;