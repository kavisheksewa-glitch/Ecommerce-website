import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

import image1 from "../../assets/1.webp";
import image1111 from "../../assets/h1.webp";
import image1112 from "../../assets/h2.webp";
import image1113 from "../../assets/h3.webp";
import API, { BASE_URL } from "../../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaShareAlt, FaLink, FaHeart } from "react-icons/fa";

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

import { shawls } from "../../data/shawls";
import ProductImageSlider from "../../components/ProductImageSlider";

// ------------------------------------------------------------------
// HELPERS (component ke bahar, taaki har render pe dobara na bane)
// ------------------------------------------------------------------
const CACHE_KEY = "homeProductsCache_v1";

const readCache = () => {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : [];
  } catch {
    return [];
  }
};

const writeCache = (list) => {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(list));
  } catch {
    /* storage full / blocked — ignore */
  }
};

const toUrl = (raw) =>
  raw.startsWith("http")
    ? raw
    : `${API.defaults.baseURL}/${raw.replace(/\\/g, "/")}`;

const formatProduct = (p) => {
  const rawImages =
    Array.isArray(p.productImages) && p.productImages.length > 0
      ? p.productImages
      : [p.productImage || p.image].filter(Boolean);

  const formattedImages = rawImages.length
    ? rawImages.map(toUrl)
    : ["https://via.placeholder.com/150"];

  const basePrice = Number(p.price || 0);
  const discountPercent = Number(p.discount || 0);
  const finalPrice =
    discountPercent > 0
      ? Math.round(basePrice - (basePrice * discountPercent) / 100)
      : basePrice;

  return {
    id: p._id,
    title: p.productName || p.title,
    description: p.description,
    priceNum: finalPrice,
    price: `₹${finalPrice}`,
    originalPrice: discountPercent > 0 ? `₹${basePrice}` : "",
    discount: discountPercent > 0 ? `${discountPercent}% OFF` : null,
    image: formattedImages[0],
    images: formattedImages,
    brandLogo: p.sellerId?.brandLogo
      ? p.sellerId.brandLogo.startsWith("http")
        ? p.sellerId.brandLogo
        : `${BASE_URL}/${p.sellerId.brandLogo}`
      : "",
    stock: `Stock: ${p.stockQuantity ?? p.stock ?? 0}`,
    category: p.category || "Pashmina",
    fabric: p.fabric || p.category || "Pashmina",
    color: p.color || "N/A",
    size: p.size || "N/A",
    careInstructions: p.washCare || "N/A",
    sellerId: p.sellerId?._id || p.sellerId || "",
  };
};

const INITIAL_CATEGORIES = {
  Pashmina: false,
  Woolen: false,
  Silk: false,
  Cotton: false,
  Velvet: false,
  Acrylic: false,
};

const bannerImages = [image1, image1111, image1112, image1113];
const extendedBanners = [...bannerImages, bannerImages[0]];

function Home() {
  const navigate = useNavigate();

  const [shareProduct, setShareProduct] = useState(null);
  const [cartProductIds, setCartProductIds] = useState([]);
  const [wishlistProductIds, setWishlistProductIds] = useState([]);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  // Carousel
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // 0 = first 8, 1 = first 12, 2 = full list
  const [viewStage, setViewStage] = useState(0);

  // ✅ Cache se turant products dikhao (agar pehle load ho chuke hain)
  const [dbProducts, setDbProducts] = useState(() => readCache());
  // Loader sirf tab jab cache bhi khali ho
  const [isPageLoading, setIsPageLoading] = useState(() => readCache().length === 0);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState(5000);
  const [sortBy, setSortBy] = useState("Newest First");
  const [selectedCategories, setSelectedCategories] = useState(INITIAL_CATEGORIES);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // --- Auth helper ---
  const checkAuthAndExecute = (actionCallback) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.warning("🔒 Please login first to perform this action!", {
        autoClose: 2000,
      });
      setTimeout(() => navigate("/login"), 1000);
      return;
    }
    actionCallback(token);
  };

  // COOKIE CHECK
  useEffect(() => {
    if (!localStorage.getItem("cookieConsent")) setShowCookieBanner(true);
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowCookieBanner(false);
  };

  const handleDeclineCookies = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShowCookieBanner(false);
  };

  // CAROUSEL TIMER
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrentSlide((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleTransitionEnd = () => {
    if (currentSlide === bannerImages.length) {
      setIsTransitioning(false);
      setCurrentSlide(0);
    }
  };

  // ------------------------------------------------------------------
  // EFFECT 1: PRODUCTS (alag chalta hai, cart/wishlist ka wait nahi karta)
  // ------------------------------------------------------------------
  useEffect(() => {
    let cancelled = false;

    API.get("/api/seller/products/public")
      .then((res) => {
        if (cancelled) return;
        const productList = Array.isArray(res.data)
          ? res.data
          : res.data.products || [];

        if (Array.isArray(productList)) {
          const formatted = productList.map(formatProduct);
          setDbProducts(formatted);
          writeCache(formatted);
        }
      })
      .catch((err) => console.error("Error fetching live products:", err))
      .finally(() => {
        if (!cancelled) setIsPageLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // ------------------------------------------------------------------
  // EFFECT 2: CART + WISHLIST (parallel, products ko block nahi karta)
  // ------------------------------------------------------------------
  useEffect(() => {
    const fetchCartAndWishlist = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setCartProductIds([]);
        setWishlistProductIds([]);
        return;
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const [cartRes, wishRes] = await Promise.allSettled([
        fetch(`${BASE_URL}/api/customer/cart`, { headers }).then((r) => r.json()),
        fetch(`${BASE_URL}/api/customer/wishlist`, { headers }).then((r) => r.json()),
      ]);

      if (
        cartRes.status === "fulfilled" &&
        cartRes.value?.success &&
        Array.isArray(cartRes.value.cart)
      ) {
        setCartProductIds(cartRes.value.cart.map((i) => String(i.productId)));
      }

      if (
        wishRes.status === "fulfilled" &&
        wishRes.value?.success &&
        Array.isArray(wishRes.value.wishlist)
      ) {
        setWishlistProductIds(
          wishRes.value.wishlist.map((i) => String(i.productId))
        );
      }
    };

    fetchCartAndWishlist();

    window.addEventListener("cartUpdated", fetchCartAndWishlist);
    window.addEventListener("wishlistUpdated", fetchCartAndWishlist);

    return () => {
      window.removeEventListener("cartUpdated", fetchCartAndWishlist);
      window.removeEventListener("wishlistUpdated", fetchCartAndWishlist);
    };
  }, []);

  // ------------------------------------------------------------------
  // FILTERS
  // ------------------------------------------------------------------
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const handleClearAllFilters = () => {
    setPriceFilter(5000);
    setSearchQuery("");
    setSelectedCategories(INITIAL_CATEGORIES);
  };

  const getProcessedProducts = (list) => {
    const q = searchQuery.toLowerCase().trim();
    const activeCategories = Object.keys(selectedCategories).filter(
      (cat) => selectedCategories[cat]
    );

    const filtered = list
      .map((item) => ({
        ...item,
        priceNum:
          item.priceNum !== undefined
            ? item.priceNum
            : Number(String(item.price || "0").replace(/[^0-9]/g, "")),
      }))
      .filter((item) => {
        const matchesSearch =
          q === "" ||
          item.title?.toLowerCase().includes(q) ||
          item.category?.toLowerCase().includes(q) ||
          item.fabric?.toLowerCase().includes(q);

        const matchesPrice = item.priceNum <= Number(priceFilter);

        const matchesCategory =
          activeCategories.length === 0 ||
          activeCategories.some(
            (cat) =>
              item.category?.toLowerCase().includes(cat.toLowerCase()) ||
              item.fabric?.toLowerCase().includes(cat.toLowerCase())
          );

        return matchesSearch && matchesPrice && matchesCategory;
      });

    filtered.sort((a, b) => {
      if (sortBy === "Price: Low to High") return a.priceNum - b.priceNum;
      if (sortBy === "Price: High to Low") return b.priceNum - a.priceNum;
      return 0;
    });

    return filtered;
  };

  // ✅ useMemo: har render pe dobara filter/sort nahi hoga
  const displayedHomeShawls = useMemo(
    () => getProcessedProducts(dbProducts),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dbProducts, searchQuery, priceFilter, sortBy, selectedCategories]
  );

  const displayedAllShawls = useMemo(
    () => (viewStage === 2 ? getProcessedProducts([...shawls, ...dbProducts]) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dbProducts, viewStage, searchQuery, priceFilter, sortBy, selectedCategories]
  );

  const activeProductsList =
    viewStage === 2 ? displayedAllShawls : displayedHomeShawls;

  let currentProducts;
  if (viewStage === 0) currentProducts = activeProductsList.slice(0, 8);
  else if (viewStage === 1) currentProducts = activeProductsList.slice(0, 12);
  else currentProducts = activeProductsList;

  const handleViewAllClick = () => {
    if (viewStage === 0) setViewStage(1);
    else if (viewStage === 1) setViewStage(2);
    else {
      setViewStage(0);
      setSearchQuery("");
      setIsFilterOpen(false);
    }
  };

  // ------------------------------------------------------------------
  // ACTIONS
  // ------------------------------------------------------------------
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

  const cartPayload = (product) => ({
    productId: product.id,
    title: product.title,
    description: product.description,
    price: product.price,
    originalPrice: product.originalPrice,
    discount: product.discount,
    image: product.image,
    quantity: 1,
    sellerId: product.sellerId,
  });

  const handleAddToCart = (product) => {
    checkAuthAndExecute(async (token) => {
      try {
        const response = await fetch(`${BASE_URL}/api/customer/cart/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(cartPayload(product)),
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

  const handleToggleWishlist = (product) => {
    checkAuthAndExecute(async (token) => {
      const isWishlisted = wishlistProductIds.includes(String(product.id));

      try {
        if (isWishlisted) {
          const res = await fetch(`${BASE_URL}/api/customer/wishlist`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          const wishlistItem = data.wishlist?.find(
            (w) => String(w.productId) === String(product.id)
          );

          if (wishlistItem) {
            const delRes = await fetch(
              `${BASE_URL}/api/customer/wishlist/remove/${wishlistItem._id}`,
              {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            if (delRes.ok) {
              toast.info(`${product.title} removed from wishlist`, {
                autoClose: 1000,
              });
              setWishlistProductIds((prev) =>
                prev.filter((id) => id !== String(product.id))
              );
            } else {
              toast.error("Failed to update wishlist");
            }
          }
        } else {
          const response = await fetch(`${BASE_URL}/api/customer/wishlist/add`, {
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
              originalPrice: product.originalPrice,
              discount: product.discount,
              image: product.image,
              sellerId: product.sellerId,
            }),
          });

          if (response.ok) {
            toast.success(`${product.title} added to wishlist ❤️`, {
              autoClose: 1000,
            });
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

  const handleBuyNow = (product) => {
    checkAuthAndExecute(async (token) => {
      if (!cartProductIds.includes(String(product.id))) {
        try {
          await fetch(`${BASE_URL}/api/customer/cart/add`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(cartPayload(product)),
          });
          window.dispatchEvent(new Event("cartUpdated"));
        } catch (err) {
          console.error(err);
        }
      }
      navigate("/checkout", { state: { product } });
    });
  };

  // ------------------------------------------------------------------
  // RENDER  (❌ full-page loader hata diya — page turant dikhega)
  // ------------------------------------------------------------------
  return (
    <div>
      <ToastContainer />

      <style>{`
        .Customer_card { padding: 10px !important; }
        .Customer_product-image-box {
          aspect-ratio: 1 / 1;
          width: 100%;
          isolation: isolate;
        }
        .Customer_product-image { width: 100%; height: 100%; object-fit: cover; }
        .Customer_brand-logo-box {
          position: absolute; top: 10px; left: 10px;
          width: 50px; height: 50px; z-index: 3;
        }
        .Customer_discount-badge { font-size: 0.72rem; padding: 4px 8px; }
        .Customer_wishlist-btn {
          position: absolute; top: 10px; right: 10px;
          width: 35px; height: 35px;
        }
        .Customer_card-title { font-size: 0.86rem; margin-bottom: 4px !important; }
        .Customer_card-desc { font-size: 0.74rem; min-height: 2.2em; }
        .Customer_share-btn-flat {
          flex-shrink: 0; border: none; background: transparent;
          padding: 2px; color: #6b4e14; font-size: 15px; line-height: 1;
          cursor: pointer; transition: color 0.2s ease, transform 0.2s ease;
        }
        .Customer_share-btn-flat:hover { color: #b8860b; transform: scale(1.15); }
        .Customer_price-row { margin-bottom: 10px !important; flex-wrap: wrap; row-gap: 4px; }
        .Customer_price-main { font-size: 0.9rem; }
        .Customer_price-original { font-size: 0.72rem; }
        .Customer_card-btn {
          font-size: clamp(0.68rem, 2.4vw, 0.85rem);
          padding: 6px 8px; letter-spacing: 0.2px;
          white-space: nowrap; line-height: 1.3;
        }
        .Customer_buy-now-btn {
          font-size: clamp(0.72rem, 2.4vw, 0.9rem); padding: 7px 8px;
        }

        /* Hero banner: layout shift se bachne ke liye fixed height area */
        .Customer_hero-carousel-container { background: #f3e7cc; }

        @media (max-width: 767.98px) and (min-width: 576px) {
          .Customer_brand-logo-box { width: 42px; height: 42px; }
          .Customer_wishlist-btn { width: 34px; height: 34px; font-size: 15px; }
          .Customer_share-btn-flat { font-size: 17px; }
        }

        @media (max-width: 575.98px) {
          .Customer_card { padding: 7px !important; border-radius: 12px !important; }
          .Customer_brand-logo-box { width: 34px; height: 34px; top: 6px; left: 6px; }
          .Customer_discount-badge { font-size: 0.62rem; padding: 3px 6px !important; }
          .Customer_wishlist-btn {
            width: 30px; height: 30px; top: 6px; right: 6px; font-size: 14px;
          }
          .Customer_share-btn-flat { font-size: 16px; }
          .Customer_card-body { padding: 8px 4px !important; }
          .Customer_card-title { font-size: 0.78rem; line-height: 1.25; }
          .Customer_card-desc { font-size: 0.68rem; min-height: 1.8em; }
          .Customer_price-main { font-size: 0.82rem; }
          .Customer_price-original { font-size: 0.65rem; }
          .Customer_card-btn { font-size: 0.68rem; padding: 5px 4px; letter-spacing: 0.1px; }
          .Customer_buy-now-btn { font-size: 0.72rem; padding: 6px 4px; }
          .Customer_card-actions { gap: 6px !important; }
        }
      `}</style>

      {/* COOKIE CONSENT */}
      {showCookieBanner && (
        <div
          className="position-fixed bottom-0 start-0 w-100 bg-dark text-white p-3 shadow-lg d-flex flex-column flex-md-row justify-content-between align-items-center gap-3"
          style={{ zIndex: 9999 }}
        >
          <div style={{ maxWidth: "800px", fontSize: "0.9rem" }}>
            <span>
              🍪 We use cookies to enhance your user experience. By using our
              website, you agree to our use of cookies.
            </span>
          </div>
          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-light btn-sm px-3"
              onClick={handleDeclineCookies}
            >
              Decline
            </button>
            <button
              className="btn btn-warning btn-sm px-3 fw-bold text-dark"
              onClick={handleAcceptCookies}
            >
              Accept
            </button>
          </div>
        </div>
      )}

      {/* SHARE MODAL */}
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
            <button
              className="Customer_close-btn"
              onClick={() => setShareProduct(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* HERO BANNER CAROUSEL */}
      {viewStage !== 2 && (
        <>
          <div className="Customer_hero-carousel-container position-relative overflow-hidden">
            <div
              className="Customer_hero-carousel-wrapper d-flex"
              onTransitionEnd={handleTransitionEnd}
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
                transition: isTransitioning ? "transform 2s ease-in-out" : "none",
              }}
            >
              {extendedBanners.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Kavi Shawls Banner ${(index % bannerImages.length) + 1}`}
                  className="Customer_hero0-image w-100 flex-shrink-0"
                  style={{ minWidth: "100%", objectFit: "cover", objectPosition: "top" }}
                  // ✅ Sirf pehla banner turant load, baaki lazy
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  decoding="async"
                />
              ))}
            </div>

            <div className="Customer_carousel-dots position-absolute bottom-0 start-50 translate-middle-x mb-3 d-flex gap-2">
              {bannerImages.map((_, index) => {
                const activeIndex = currentSlide % bannerImages.length;
                return (
                  <button
                    key={index}
                    aria-label={`Go to slide ${index + 1}`}
                    onClick={() => {
                      setIsTransitioning(true);
                      setCurrentSlide(index);
                    }}
                    className={`border-0 rounded-circle ${
                      activeIndex === index ? "bg-warning" : "bg-white opacity-50"
                    }`}
                    style={{
                      width: activeIndex === index ? "24px" : "12px",
                      height: "12px",
                      cursor: "pointer",
                      borderRadius: "20px",
                      transition: "all 0.5s ease-in-out",
                    }}
                  />
                );
              })}
            </div>
          </div>
          <h2
            className="Customer_luxury-title text-center fw-bold mb-4 fst-italic"
            style={{ color: "#9d6a0cc4", paddingTop: "40px" }}
          >
            Our Featured Shawls
          </h2>
        </>
      )}

      {/* SEARCH BAR */}
      <div className="container my-4 text-center">
        <div className="position-relative mx-auto" style={{ maxWidth: "600px" }}>
          <span
            className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted"
            style={{ pointerEvents: "none" }}
          >
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            placeholder="Search products by name..."
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

      {/* MAIN PRODUCTS SECTION */}
      <div className="container my-5">
        {/* TOP FILTERS & SORT BAR */}
        <div className="bg-white p-3 rounded shadow-sm border mb-4 d-flex flex-wrap justify-content-between align-items-center gap-3">
          <span className="text-muted small fw-semibold">
            {isPageLoading
              ? "Loading products..."
              : `Showing ${currentProducts.length} of ${activeProductsList.length} products`}
          </span>

          <div className="d-flex align-items-center gap-3">
            <button
              className="btn btn-outline-dark btn-sm px-3 py-2 d-flex align-items-center gap-2"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              style={{ borderRadius: "8px" }}
            >
              <i className="bi bi-funnel"></i> Filters{" "}
              {Object.values(selectedCategories).some(Boolean) || priceFilter < 5000
                ? "●"
                : ""}
            </button>

            <div className="d-flex align-items-center gap-2">
              <span className="text-muted small">Sort By:</span>
              <select
                className="form-select form-select-sm w-auto"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="Newest First">Newest First</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* FILTER PANEL */}
        {isFilterOpen && (
          <div className="row g-3 mb-4 p-4 bg-white border rounded-4 shadow-sm position-relative">
            <button
              type="button"
              className="btn-close position-absolute top-0 end-0 m-3"
              aria-label="Close"
              onClick={() => setIsFilterOpen(false)}
            ></button>

            <h5 className="fw-bold mb-3">Filter Options</h5>

            <div className="col-md-6">
              <label className="form-label fw-bold small text-secondary">
                Price Range: ₹{priceFilter}
              </label>
              <input
                type="range"
                className="form-range"
                min="500"
                max="5000"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
              />
              <div className="d-flex justify-content-between text-muted small">
                <span>₹500</span>
                <span>₹5000</span>
              </div>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold small text-secondary d-block">
                Categories
              </label>
              <div className="d-flex flex-wrap gap-3 align-items-center mt-2">
                {Object.keys(INITIAL_CATEGORIES).map((cat) => (
                  <div className="form-check" key={cat}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`filter-${cat}`}
                      checked={selectedCategories[cat]}
                      onChange={() => handleCategoryChange(cat)}
                    />
                    <label className="form-check-label small" htmlFor={`filter-${cat}`}>
                      {cat}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-12 text-end mt-3">
              <button
                className="btn btn-outline-danger btn-sm px-4"
                onClick={handleClearAllFilters}
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {/* PRODUCTS GRID */}
        <div className="row g-2 g-md-4">
          {isPageLoading ? (
            // ✅ Skeleton cards — page turant dikhta hai, sirf grid load hoti hai
            Array.from({ length: 8 }).map((_, i) => (
              <div className="col-6 col-sm-6 col-md-4 col-lg-3" key={`sk-${i}`}>
                <div
                  className="placeholder-glow p-2 h-100"
                  style={{ backgroundColor: "#e4c893", borderRadius: "16px" }}
                >
                  <div
                    className="placeholder w-100"
                    style={{ aspectRatio: "1 / 1", borderRadius: "12px", display: "block" }}
                  />
                  <span className="placeholder col-8 mt-3 d-block" />
                  <span className="placeholder col-5 mt-2 d-block" />
                  <span
                    className="placeholder col-12 mt-3 d-block"
                    style={{ height: "30px", borderRadius: "8px" }}
                  />
                  <span
                    className="placeholder col-12 mt-2 d-block"
                    style={{ height: "30px", borderRadius: "8px" }}
                  />
                </div>
              </div>
            ))
          ) : currentProducts.length > 0 ? (
            currentProducts.map((item, idx) => {
              const productIdStr = String(item.id);
              const isInCart = cartProductIds.includes(productIdStr);
              const isWishlisted = wishlistProductIds.includes(productIdStr);

              return (
                <div className="col-6 col-sm-6 col-md-4 col-lg-3" key={productIdStr}>
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
                            src={item.brandLogo}
                            alt="Brand Logo"
                            loading="lazy"
                            decoding="async"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </div>
                      )}

                      {/* Saari images pass hoti hain, par slider sirf current image
                          load karta hai; baaki hover/swipe ke baad load hoti hain. */}
                      <ProductImageSlider
                        images={item.images && item.images.length ? item.images : [item.image]}
                        alt={item.title}
                        hideArrowsOnMobile={true}
                        hideArrowsOnDesktop={true}
                        priority={idx < 4}
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
                              setShareProduct(item);
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
                            <span className="Customer_price-main fw-bold text-success">
                              {item.price}
                            </span>
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
                            style={{
                              backgroundColor: "#2b8a3e",
                              border: "none",
                              borderRadius: "8px",
                            }}
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
                            style={{
                              backgroundColor: "#166228",
                              border: "none",
                              borderRadius: "8px",
                            }}
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
                          style={{
                            background: "linear-gradient(135deg, #d6bd69 0%, #dfa00b 100%)",
                            borderRadius: "8px",
                          }}
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
              <p className="text-muted fs-5">
                No products found matching your search or filters.
              </p>
            </div>
          )}
        </div>

        {/* VIEW MORE BUTTON */}
        {viewStage !== 2 && !isPageLoading && (
          <div className="text-center mt-4">
            <button
              className="btn btn-outline-secondary btn-sm px-4 py-2 fw-semibold"
              onClick={handleViewAllClick}
              style={{ borderRadius: "20px" }}
            >
              View More Products ➔
            </button>
          </div>
        )}

        {/* EXPLORE CATEGORY BUTTONS */}
        {viewStage !== 2 && (
          <div className="Customer_explore-buttons mt-4">
            <button
              className="btn btn-outline-dark fw-semibold"
              onClick={() => navigate("/shop/womens")}
            >
              Explore Women Shawls
            </button>

            <button
              className="btn btn-outline-dark fw-semibold"
              onClick={() => navigate("/shop/mens")}
            >
              Explore Men Shawls
            </button>

            <button
              className="btn btn-outline-dark fw-semibold"
              onClick={() => navigate("/shop/summer")}
            >
              Explore Summer Shawls
            </button>

            <button
              className="btn btn-outline-dark fw-semibold"
              onClick={() => navigate("/shop/featured")}
            >
              Explore Featured Shawls
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;