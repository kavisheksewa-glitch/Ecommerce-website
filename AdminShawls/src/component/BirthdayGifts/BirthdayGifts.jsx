import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaShareAlt, FaLink, FaHeart, FaStar, FaGift, FaShippingFast, FaUndo, FaCommentAlt } from "react-icons/fa";
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
//import "../Featured/Featuredcol.css";
import "../BirthdayGifts/BirthdayGift.css";
import birthdayBgImage from "../../assets/image1.png";
import { BirthdayShawls } from "../../data/shawls";

function BirthdayGifts() {
  const navigate = useNavigate();
  const [shareProduct, setShareProduct] = useState(null);
  const [cartProductIds, setCartProductIds] = useState([]);
  const [birthdayGifts, setBirthdayGifts] = useState([...BirthdayShawls]);
  const [wishlistProductIds, setWishlistProductIds] = useState([]);
  const [priceFilter, setPriceFilter] = useState(8000);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Newest First");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
      .catch((err) => console.error("Error fetching cart items:", err));

    fetch("https://ecommerce-website-ggui.onrender.com/api/customer/wishlist", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.wishlist)) {
          setWishlistProductIds(data.wishlist.map((item) => String(item.productId)));
        }
      })
      .catch((err) => console.error("Error fetching wishlist:", err));
  };

  useEffect(() => {
    axios.get("https://ecommerce-website-ggui.onrender.com/api/seller/products/public")
      .then((res) => {
        if (Array.isArray(res.data)) {
          const dbProducts = res.data
            .filter((p) => p.category === "BirthdayGift Shawls")
            .map((p) => {
              // ✅ seller ne jo price enter kiya wahi "original" price hai; discount hone par
              // actual bikne wala price (finalPrice) usse kam hoga
              const basePrice = Number(p.price || 0);
              const discountPercent = Number(p.discount || 0);
              const finalPrice = discountPercent > 0
                ? Math.round(basePrice - (basePrice * discountPercent) / 100)
                : basePrice;
                return{
              id: p._id,
              title: p.productName,
              description: p.description,
              price: `₹${finalPrice}`,
                originalPrice: discountPercent > 0 ? `₹${basePrice}` : "",
                discount: discountPercent > 0 ? `${discountPercent}% OFF` : null,
          
              image: p.productImage?.startsWith("http") ? p.productImage : `https://ecommerce-website-ggui.onrender.com/${p.productImage}`,
             
             brandLogo: p.sellerId?.brandLogo ? (p.sellerId.brandLogo.startsWith("http") ? p.sellerId.brandLogo : `https://ecommerce-website-ggui.onrender.com/${p.sellerId.brandLogo}`): "",
              stock: `Stock: ${p.stockQuantity}`,
              fabric: p.fabric || "N/A",
              color: p.color || "N/A",
              size: p.size || "N/A",
              careInstructions: p.washCare || "N/A",
              rating: 5,
              reviews: 18,
              sellerId: p.sellerId?._id || p.sellerId || "",
            };
             });
          setBirthdayGifts([...BirthdayShawls, ...dbProducts]);
        }
      })
      .catch((err) => console.error("Error fetching live birthday products:", err));

    fetchCartAndWishlist();
    window.addEventListener("cartUpdated", fetchCartAndWishlist);
    window.addEventListener("wishlistUpdated", fetchCartAndWishlist);
    return () => {
      window.removeEventListener("cartUpdated", fetchCartAndWishlist);
      window.removeEventListener("wishlistUpdated", fetchCartAndWishlist);
    };
  }, []);

  const getProcessedProducts = (list) => {
    return list.filter((item) => {
      const numericPrice = typeof item.price === "string"
        ? parseInt(item.price.replace(/[^\d]/g, ""), 10)
        : Number(item.price);

      const matchesPrice = isNaN(numericPrice) || numericPrice <= Number(priceFilter);
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || item.title?.toLowerCase().includes(query);

      return matchesPrice && matchesSearch;
    }).sort((a, b) => {
      const priceA = typeof a.price === "string" ? parseInt(a.price.replace(/[^\d]/g, ""), 10) : Number(a.price);
      const priceB = typeof b.price === "string" ? parseInt(b.price.replace(/[^\d]/g, ""), 10) : Number(b.price);

      if (sortBy === "Price: Low to High") {
        return priceA - priceB;
      } else if (sortBy === "Price: High to Low") {
        return priceB - priceA;
      } else {
        return 0;
      }
    });
  };

  const displayedGifts = getProcessedProducts(birthdayGifts);

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
  const handleAddToCart = (product) => {
    checkAuthAndExecute(async (token) => {
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
    });
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
          const wishlistItem = data.wishlist?.find(
            (w) => String(w.productId) === String(product.id)
          );

          if (wishlistItem) {
            const delRes = await fetch(
              `https://ecommerce-website-ggui.onrender.com/api/customer/wishlist/remove/${wishlistItem._id}`,
              { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
            );
            if (delRes.ok) {
              toast.info(`${product.title} removed from wishlist`, { autoClose: 1000 });
              setWishlistProductIds((prev) => prev.filter((id) => id !== String(product.id)));
            } else {
              toast.error("Failed to update wishlist");
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
              originalPrice: product.originalPrice || "",
              discount: product.discount || "",
              image: product.image,
            }),
          });

          if (response.ok) {
            toast.success(`${product.title} added to wishlist ❤️`, { autoClose: 1000 });
            setWishlistProductIds((prev) => [...prev, String(product.id)]);
          } else {
            toast.error("Failed to update wishlist");
          }
        }

        window.dispatchEvent(new Event("wishlistUpdated"));
      } catch (err) {
        console.error("Error connecting to backend:", err);
        toast.error("Server connection failed");
      }
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
              sellerId: product.sellerId,
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

  return (
    <div className="Customer_container1 bg-light pb-5">
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
          margin-bottom: 8px !important;
        }
        .Customer_rating-row {
          font-size: 0.7rem;
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
          margin-bottom: 8px !important;
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

        @media (max-width: 575.98px) {
          .Customer_card {
            padding: 7px !important;
            border-radius: 12px !important;
          }
          .Customer_brand-logo-box {
            width: 22px;
            height: 22px;
            top: 6px;
            left: 6px;
          }
          .Customer_discount-badge {
            font-size: 0.6rem;
            padding: 2px 5px !important;
          }
          .Customer_wishlist-btn {
            width: 24px;
            height: 24px;
            top: 6px;
            right: 6px;
            font-size: 11px;
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
            display: none;
          }
          .Customer_rating-row {
            display: none;
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
        <div className="Customer_share-overlay" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div className="Customer_share-modal bg-white p-4 rounded shadow text-center" style={{ width: "320px" }}>
            <h4 className="fw-bold mb-1">Share Product</h4>
            <p className="text-muted small">{shareProduct.title}</p>
            <div className="Customer_share-icons d-flex justify-content-center gap-3 my-3">
              <WhatsappShareButton url={`${window.location.origin}/product/${shareProduct.id}`}><WhatsappIcon size={42} round /></WhatsappShareButton>
              <FacebookShareButton url={`${window.location.origin}/product/${shareProduct.id}`}><FacebookIcon size={42} round /></FacebookShareButton>
              <TwitterShareButton url={`${window.location.origin}/product/${shareProduct.id}`}><TwitterIcon size={42} round /></TwitterShareButton>
              <EmailShareButton url={`${window.location.origin}/product/${shareProduct.id}`}><EmailIcon size={42} round /></EmailShareButton>
            </div>
            <button className="btn btn-dark mb-2 btn-sm w-100" onClick={copyLink}><FaLink className="me-2" /> Copy Link</button>
            <button className="btn btn-outline-secondary btn-sm w-100" onClick={() => setShareProduct(null)}>Close</button>
          </div>
        </div>
      )}

      

      <div className="mb-4">
        <div
          className="p-4 p-md-5 text-white rounded position-relative overflow-hidden d-flex align-items-center justify-content-between shadow-sm Customer_luxury-banner Customer_birthday-banner"
          style={{
            backgroundImage: `url(${birthdayBgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "260px"
          }}
        >

          
          <div style={{ maxWidth: "600px", zIndex: 2 }}>
            <h1 className="fw-bold display-6 fst-italic" style={{ color: "#f3e5ab" }}>Birthday Gift Sets</h1>
            <p className="text-light opacity-95 small mb-3">
              Exclusive gift boxes with premium packaging designed for your special loved ones. Give the ultimate experience of sophistication and warmth.
            </p>
            <button onClick={() => navigate("/customer")} className="btn btn-sm px-4 py-2 fw-bold shadow-sm" style={{ backgroundColor: "#f3e5ab", color: "#064e3b", borderRadius: "6px" }}>
              Explore Collection
            </button>
          </div>
        </div>
      </div>
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
            placeholder="Search birthday gift shawls..."
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
      <div className="container-fluid">
        <div className="row">

          <div className="col-lg-3 mb-4">
            <div className="d-block d-lg-none mb-2">
              <button
                className="btn w-100 d-flex justify-content-between align-items-center py-2 text-white"
                style={{ backgroundColor: "#050e0c" }}
                type="button"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <span>🔍 Filter Birthday Products</span>
                <span>{isFilterOpen ? "▲" : "▼"}</span>
              </button>
            </div>

            <div className={`bg-white p-3 rounded shadow-sm border ${!isFilterOpen ? "d-none d-lg-block" : "d-block"}`}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold mb-0">Filters</h6>
                <span className="text-muted small" style={{ cursor: "pointer" }} onClick={() => setPriceFilter(8000)}>Clear All</span>
              </div>

              <div className="mb-3 border-bottom pb-3">
                <label className="fw-bold small mb-2 d-block">Category</label>
                <div className="form-check small mb-1"><input className="form-check-input" type="checkbox" defaultChecked /><label className="form-check-label">Birthday Hampers</label></div>
                <div className="form-check small"><input className="form-check-input" type="checkbox" /><label className="form-check-label">Signature Sets</label></div>
              </div>

              <div className="mb-3 border-bottom pb-3">
                <label className="fw-bold small mb-2 d-block">Price Range</label>
                <input type="range" className="form-range" min="3000" max="8000" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} />
                <div className="d-flex justify-content-between text-muted small">
                  <span>₹3000</span>
                  <span>₹{priceFilter}</span>
                </div>
              </div>

              <div>
                <label className="fw-bold small mb-2 d-block">Material</label>
                <div className="d-flex flex-column gap-1 small">
                  <div className="form-check"><input className="form-check-input" type="checkbox" /><label className="form-check-label">Pashmina</label></div>
                  <div className="form-check"><input className="form-check-input" type="checkbox" /><label className="form-check-label">Wool</label></div>
                  <div className="form-check"><input className="form-check-input" type="checkbox" /><label className="form-check-label">Silk Blend</label></div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-9">
            <div className="d-flex justify-content-between align-items-center mb-3 bg-white p-2 px-3 rounded shadow-sm border">
              <span className="text-muted small">Showing 1–{displayedGifts.length} products</span>

              <select
                className="form-select form-select-sm w-auto"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="Newest First">Sort By: Newest First</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
              </select>
            </div>

            <div className="row g-2 g-md-3">
              {displayedGifts.length > 0 ? (
                displayedGifts.map((item) => {
                  const productIdStr = String(item.id);
                  const isInCart = cartProductIds.includes(productIdStr);
                  const isWishlisted = wishlistProductIds.includes(productIdStr);

                  return (
                    <div className="col-6 col-sm-6 col-md-4" key={productIdStr}>
                      <div
                        className="Customer_card h-100 border-0 shadow-sm d-flex flex-column justify-content-between p-2 position-relative"
                        style={{ backgroundColor: "#fff", borderRadius: "12px", cursor: "pointer" }}
                        onClick={() => navigate(`/product/${item.id}`, { state: { product: item } })}
                      >

                        <div className="Customer_product-image-box card overflow-hidden position-relative">

                          {/* ✅ Brand Logo Display */}
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

                        <div className="Customer_card-body card-body px-2 py-2 d-flex flex-column justify-content-between">
                          <div>
                            <div className="d-flex justify-content-between align-items-start gap-2 mb-1">
                              <h6 className="Customer_card-title fw-bold mb-0 text-dark">{item.title}</h6>
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
                            <div className="Customer_rating-row text-warning small mb-1">
                              {[...Array(item.rating || 5)].map((_, i) => (<FaStar key={i} />))}
                              <span className="text-muted ms-1">({item.reviews || 16})</span>
                            </div>
                            <p className="Customer_card-desc text-muted small mb-2" style={{ display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                              {item.description}
                            </p>
                            <div className="Customer_price-row d-flex align-items-center gap-2 mb-2">
                              <span className="Customer_price-main fw-bold text-success">{item.price}</span>
                              {item.originalPrice && <span className="Customer_price-original text-decoration-line-through text-muted">{item.originalPrice}</span>}
                              {item.discount && (
                                <span className="Customer_discount-badge badge bg-danger fw-bold" style={{ borderRadius: "6px" }}>
                                  {item.discount}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="Customer_card-actions d-flex flex-column gap-1 mt-auto">
                            {isInCart ? (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate("/cart");
                                }}
                                className="Customer_card-btn btn w-100 fw-semibold text-white"
                                style={{ backgroundColor: "#2b8a3e", border: "none", borderRadius: "6px" }}
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
                                style={{ backgroundColor: "#064e3b", border: "none", borderRadius: "6px" }}
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
                              style={{ background: "linear-gradient(135deg, #d6bd69 0%, #dfa00b 100%)", borderRadius: "6px" }}
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
                  <p className="text-muted fs-5">No birthday gift sets found matching your search or price range.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      <div className="container my-5">
        <div className="bg-white p-3 rounded shadow-sm border d-flex flex-wrap justify-content-around text-center gap-3">
          <div className="d-flex align-items-center gap-2">
            <FaGift className="fs-3" style={{ color: "#064e3b" }} />
            <div className="text-start">
              <h6 className="fw-bold mb-0 small">Signature Gift Chest</h6>
              <small className="text-muted" style={{ fontSize: "0.7rem" }}>Handcrafted rigid gift cases</small>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <FaCommentAlt className="fs-3" style={{ color: "#064e3b" }} />
            <div className="text-start">
              <h6 className="fw-bold mb-0 small">Personalized Note Card</h6>
              <small className="text-muted" style={{ fontSize: "0.7rem" }}>Handwritten gold-foil message</small>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <FaShippingFast className="fs-3" style={{ color: "#064e3b" }} />
            <div className="text-start">
              <h6 className="fw-bold mb-0 small">Insured Priority Shipping</h6>
              <small className="text-muted" style={{ fontSize: "0.7rem" }}>Safe & secure transit</small>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <FaUndo className="fs-3" style={{ color: "#064e3b" }} />
            <div className="text-start">
              <h6 className="fw-bold mb-0 small">Easy 7-Day Return</h6>
              <small className="text-muted" style={{ fontSize: "0.7rem" }}>Hassle-free return policy</small>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default BirthdayGifts;