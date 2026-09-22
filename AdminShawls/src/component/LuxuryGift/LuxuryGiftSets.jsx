


import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import API, { BASE_URL } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaShareAlt,
  FaLink,
  FaHeart,
  FaStar,
  FaGift,
  FaShippingFast,
  FaUndo,
  FaCommentAlt,
  FaSearch,
} from "react-icons/fa";
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
import "../Featured/Featuredcol.css";
import luxuryBgImage from "../../assets/image.webp";
import { LuxuryShawls } from "../../data/shawls";
import ProductImageSlider from "../../components/ProductImageSlider";

const PRICE_MIN = 3000;
const PRICE_DEFAULT_MAX = 8000;
const PRICE_STEP = 100;

// Original filter fields (label dikhega, match = fabric me ye word dhundhta hai)
const MATERIAL_OPTIONS = [
  { label: "Pashmina", match: "pashmina" },
  { label: "Wool", match: "wool" },
  { label: "Silk Blend", match: "silk" },
];

const PLACEHOLDER_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><rect width='100%' height='100%' fill='#efe6d2'/><text x='50%' y='50%' fill='#8a7a55' font-size='16' text-anchor='middle' dominant-baseline='middle'>No image</text></svg>`
  );

// ✅ Image path ko full URL me badalta hai (backslash + leading slash normalize)
const toImageUrl = (raw) => {
  if (!raw) return "";
  if (String(raw).startsWith("http")) return raw;
  const path = String(raw).replace(/\\/g, "/").replace(/^\//, "");
  return `${BASE_URL}/${path}`;
};

// ✅ "₹1,299.50" -> 1299.5 (decimal bhi handle hota hai)
const parsePrice = (value) => {
  if (typeof value === "number") return value;
  return Number(String(value ?? "").replace(/[^0-9.]/g, "")) || 0;
};

// ✅ Static products ko format karta hai.
// createdAt negative index hai, taaki "Newest" me DB products upar aaye
// aur static products apne original order me neeche rahe.
const formatStatic = (list) =>
  list.map((item, index) => ({
    ...item,
    images:
      Array.isArray(item.images) && item.images.length > 0
        ? item.images
        : [item.image].filter(Boolean),
    rawPrice: parsePrice(item.price),
    createdAt: -index,
    fabric: item.fabric || "N/A",
    sellerId: item.sellerId || "",
  }));

const authHeaders = (token) => ({ headers: { Authorization: `Bearer ${token}` } });

const CARD_STYLES = `
  .Customer_luxury-banner { border-radius: 16px; }
  .Customer_luxury-banner h1 { text-shadow: 0 2px 8px rgba(0, 0, 0, 0.35); }
  .Customer_card { padding: 10px !important; }
  .Customer_product-image-box { aspect-ratio: 1 / 1; width: 100%; }
  .Customer_product-image { width: 100%; height: 100%; object-fit: cover; }
  .Customer_brand-logo-box { position: absolute; top: 10px; left: 10px; width: 50px; height: 50px; z-index: 3; }
  .Customer_discount-badge { font-size: 0.72rem; padding: 4px 8px; }
  .Customer_wishlist-btn { position: absolute; top: 10px; right: 10px; width: 35px; height: 35px; }
  .Customer_card-title { font-size: 0.86rem; margin-bottom: 4px !important; }
  .Customer_card-desc { font-size: 0.74rem; margin-bottom: 8px !important; }
  .Customer_rating-row { font-size: 0.75rem; }
  .Customer_share-btn-flat { flex-shrink: 0; border: none; background: transparent; padding: 2px; color: #6b4e14; font-size: 15px; line-height: 1; cursor: pointer; transition: color 0.2s ease, transform 0.2s ease; }
  .Customer_share-btn-flat:hover { color: #b8860b; transform: scale(1.15); }
  .Customer_price-row { margin-bottom: 8px !important; flex-wrap: wrap; row-gap: 4px; }
  .Customer_price-main { font-size: 0.9rem; }
  .Customer_price-original { font-size: 0.72rem; }
  .Customer_card-btn { font-size: clamp(0.68rem, 2.4vw, 0.85rem); padding: 6px 8px; letter-spacing: 0.2px; white-space: nowrap; line-height: 1.3; }
  .Customer_buy-now-btn { font-size: clamp(0.72rem, 2.4vw, 0.9rem); padding: 7px 8px; }
  .Customer_card:focus-visible { outline: 2px solid #b8860b; outline-offset: 2px; }

  @media (max-width: 575.98px) {
    .Customer_luxury-banner { min-height: 260px !important; padding: 20px !important; text-align: center; justify-content: center !important; }
    .Customer_luxury-banner h1 { font-size: 1.5rem; }
    .Customer_luxury-banner p { font-size: 0.8rem; }
    .Customer_card { padding: 7px !important; border-radius: 12px !important; }
    .Customer_brand-logo-box { width: 30px; height: 30px; top: 6px; left: 6px; }
    .Customer_discount-badge { font-size: 0.6rem; padding: 2px 5px !important; }
    .Customer_wishlist-btn { width: 28px; height: 28px; top: 6px; right: 6px; font-size: 12px; }
    .Customer_share-btn-flat { font-size: 16px; }
    .Customer_card-body { padding: 8px 4px !important; }
    .Customer_card-title { font-size: 0.78rem; line-height: 1.25; }
    .Customer_card-desc { display: none; }
    .Customer_rating-row { font-size: 0.62rem !important; }
    .Customer_price-main { font-size: 0.82rem; }
    .Customer_price-original { font-size: 0.65rem; }
    .Customer_card-btn { font-size: 0.68rem; padding: 5px 4px; letter-spacing: 0.1px; }
    .Customer_buy-now-btn { font-size: 0.72rem; padding: 6px 4px; }
    .Customer_card-actions { gap: 6px !important; }
  }
`;

function LuxuryGiftSets() {
  const navigate = useNavigate();

  const [allProducts, setAllProducts] = useState(() => formatStatic(LuxuryShawls));
  const [shareProduct, setShareProduct] = useState(null);
  const [cartProductIds, setCartProductIds] = useState([]);
  // { [productId]: wishlistItemId | null }  (null = abhi add hua, id refetch se aayegi)
  const [wishlistMap, setWishlistMap] = useState({});
  const [pendingIds, setPendingIds] = useState([]);
  const pendingRef = useRef(new Set());

  // priceLimit null = koi limit nahi (saare products dikhenge)
  const [priceLimit, setPriceLimit] = useState(null);
  const [selectedFabrics, setSelectedFabrics] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Newest First");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // ✅ Double click se bachne ke liye per-action lock
  const startPending = (key) => {
    if (pendingRef.current.has(key)) return false;
    pendingRef.current.add(key);
    setPendingIds([...pendingRef.current]);
    return true;
  };
  const endPending = (key) => {
    pendingRef.current.delete(key);
    setPendingIds([...pendingRef.current]);
  };

  // ✅ Login check: token na ho to toast + redirect, warna token return
  const requireToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.warning("🔒 Please login first to perform this action!", { autoClose: 2000 });
      navigate("/login");
      return null;
    }
    return token;
  };

  const fetchCart = useCallback(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCartProductIds([]);
      return;
    }
    API.get("/api/customer/cart", authHeaders(token))
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.cart)) {
          setCartProductIds(res.data.cart.map((item) => String(item.productId)));
        }
      })
      .catch((err) => console.error("Error fetching cart items:", err));
  }, []);

  const fetchWishlist = useCallback(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setWishlistMap({});
      return;
    }
    API.get("/api/customer/wishlist", authHeaders(token))
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.wishlist)) {
          const map = {};
          res.data.wishlist.forEach((item) => {
            map[String(item.productId)] = item._id;
          });
          setWishlistMap(map);
        }
      })
      .catch((err) => console.error("Error fetching wishlist:", err));
  }, []);

  useEffect(() => {
    let cancelled = false;

    API.get("/api/seller/products/public")
      .then((res) => {
        if (cancelled || !Array.isArray(res.data)) return;

        const dbProducts = res.data
          .filter((p) => p.category === "LuxuryGift Shawls")
          .map((p, index) => {
            const basePrice = Number(p.price || 0);
            const discountPercent = Number(p.discount || 0);
            const finalPrice =
              discountPercent > 0
                ? Math.round(basePrice - (basePrice * discountPercent) / 100)
                : basePrice;

            // Multiple images + purane single-image products dono support
            const rawImages =
              Array.isArray(p.productImages) && p.productImages.length > 0
                ? p.productImages
                : [p.productImage || p.image].filter(Boolean);
            const images = rawImages.map(toImageUrl);

            return {
              id: p._id,
              title: p.productName,
              description: p.description,
              price: `₹${finalPrice}`,
              rawPrice: finalPrice || 0,
              originalPrice: discountPercent > 0 ? `₹${basePrice}` : "",
              discount: discountPercent > 0 ? `${discountPercent}% OFF` : null,
              images,
              image: images[0] || PLACEHOLDER_IMG,
              brandLogo: toImageUrl(p.sellerId?.brandLogo),
              stock: `Stock: ${p.stockQuantity}`,
              stockQuantity: Number(p.stockQuantity),
              fabric: p.fabric || "N/A",
              color: p.color || "N/A",
              size: p.size || "N/A",
              careInstructions: p.washCare || "N/A",
              rating: 5,
              reviews: 18,
              createdAt: p.createdAt ? new Date(p.createdAt).getTime() : index,
              sellerId: p.sellerId?._id || p.sellerId || "",
            };
          });

        setAllProducts([...formatStatic(LuxuryShawls), ...dbProducts]);
      })
      .catch((err) => {
        console.error("Error fetching live luxury products:", err);
        if (!cancelled) setAllProducts(formatStatic(LuxuryShawls));
      });

    fetchCart();
    fetchWishlist();
    window.addEventListener("cartUpdated", fetchCart);
    window.addEventListener("wishlistUpdated", fetchWishlist);
    return () => {
      cancelled = true;
      window.removeEventListener("cartUpdated", fetchCart);
      window.removeEventListener("wishlistUpdated", fetchWishlist);
    };
  }, [fetchCart, fetchWishlist]);

  // ✅ Share modal: Esc se band ho
  useEffect(() => {
    if (!shareProduct) return;
    const onKey = (e) => {
      if (e.key === "Escape") setShareProduct(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shareProduct]);

  // ✅ Price slider ka max products se nikalta hai (mehnge products hide nahi honge)
  const priceCeiling = useMemo(() => {
    const highest = allProducts.reduce((m, p) => Math.max(m, p.rawPrice || 0), 0);
    return Math.max(PRICE_DEFAULT_MAX, Math.ceil(highest / 500) * 500);
  }, [allProducts]);

  const effectiveMaxPrice = priceLimit === null ? priceCeiling : Math.min(priceLimit, priceCeiling);

  const displayedLuxuryShawls = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    const list = allProducts.filter((item) => {
      const matchesPrice = (item.rawPrice || 0) <= effectiveMaxPrice;
      const matchesSearch =
        !query ||
        item.title?.toLowerCase().includes(query) ||
        item.fabric?.toLowerCase().includes(query) ||
        item.color?.toLowerCase().includes(query);
      const fabricText = String(item.fabric || "").toLowerCase();
      const matchesFabric =
        selectedFabrics.length === 0 || selectedFabrics.some((kw) => fabricText.includes(kw));
      return matchesPrice && matchesSearch && matchesFabric;
    });

    if (sortBy === "Price: Low to High") {
      list.sort((a, b) => a.rawPrice - b.rawPrice);
    } else if (sortBy === "Price: High to Low") {
      list.sort((a, b) => b.rawPrice - a.rawPrice);
    } else {
      list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    }
    return list;
  }, [allProducts, effectiveMaxPrice, searchQuery, selectedFabrics, sortBy]);

  const toggleFabric = (key) => {
    setSelectedFabrics((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const resetFilters = () => {
    setPriceLimit(null);
    setSelectedFabrics([]);
    setSearchQuery("");
    setSortBy("Newest First");
  };

  // ---------- SHARE ----------
  const shareUrl = shareProduct ? `${window.location.origin}/product/${shareProduct.id}` : "";

  const copyLink = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        // HTTP par clipboard API nahi chalti, isliye fallback
        const ta = document.createElement("textarea");
        ta.value = shareUrl;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        if (!ok) throw new Error("copy failed");
      }
      toast.success("Link copied successfully!");
      setShareProduct(null);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  // ---------- CART ----------
  // ✅ success par true, fail par false return karta hai
  const handleAddToCart = async (product) => {
    const token = requireToken();
    if (!token) return false;

    const pid = String(product.id);
    const key = `cart-${pid}`;
    if (!startPending(key)) return false;

    try {
      await API.post(
        "/api/customer/cart/add",
        {
          productId: product.id,
          title: product.title,
          description: product.description,
          price: product.price,
          originalPrice: product.originalPrice || "",
          discount: product.discount || "",
          image: product.image,
          quantity: 1,
          sellerId: product.sellerId,
        },
        authHeaders(token)
      );

      toast.success(`${product.title} added to cart! 🛒`, {
        position: "top-right",
        autoClose: 1000,
      });
      setCartProductIds((prev) => (prev.includes(pid) ? prev : [...prev, pid]));
      window.dispatchEvent(new Event("cartUpdated"));
      return true;
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error(err.response ? "Failed to add to cart" : "Server connection failed");
      return false;
    } finally {
      endPending(key);
    }
  };

  // ---------- WISHLIST ----------
  const handleToggleWishlist = async (product) => {
    const token = requireToken();
    if (!token) return;

    const pid = String(product.id);
    const key = `wish-${pid}`;
    if (!startPending(key)) return;

    try {
      if (pid in wishlistMap) {
        let itemId = wishlistMap[pid];

        // id abhi tak nahi mili (naya add hua tha) to fresh list se dhundo
        if (!itemId) {
          const res = await API.get("/api/customer/wishlist", authHeaders(token));
          const found = res.data.wishlist?.find((w) => String(w.productId) === pid);
          itemId = found?._id;
        }

        if (itemId) {
          await API.delete(`/api/customer/wishlist/remove/${itemId}`, authHeaders(token));
        }

        // item server par mila ya nahi, local state se hamesha hata do (heart atakega nahi)
        setWishlistMap((prev) => {
          const next = { ...prev };
          delete next[pid];
          return next;
        });
        toast.info(`${product.title} removed from wishlist`, { autoClose: 1000 });
      } else {
        await API.post(
          "/api/customer/wishlist/add",
          {
            productId: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
            originalPrice: product.originalPrice || "",
            discount: product.discount || "",
            image: product.image,
          },
          authHeaders(token)
        );
        setWishlistMap((prev) => ({ ...prev, [pid]: null }));
        toast.success(`${product.title} added to wishlist ❤️`, { autoClose: 1000 });
      }

      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (err) {
      console.error("Error updating wishlist:", err);
      toast.error(err.response ? "Failed to update wishlist" : "Server connection failed");
    } finally {
      endPending(key);
    }
  };

  // ---------- BUY NOW ----------
  // ✅ cart add fail ho to checkout nahi khulta
  const handleBuyNow = async (product) => {
    const token = requireToken();
    if (!token) return;

    if (!cartProductIds.includes(String(product.id))) {
      const ok = await handleAddToCart(product);
      if (!ok) return;
    }
    navigate("/checkout", { state: { product } });
  };

  const openProduct = (item) => navigate(`/product/${item.id}`, { state: { product: item } });

  return (
    <div className="Customer_container1 bg-light pb-5">
      <ToastContainer />

      <style>{CARD_STYLES}</style>

      {/* SHARE MODAL */}
      {shareProduct && (
        <div
          className="Customer_share-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Share product"
          onClick={() => setShareProduct(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="Customer_share-modal bg-white p-4 rounded shadow text-center"
            style={{ width: "320px", maxWidth: "90vw" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="fw-bold mb-1">Share Product</h4>
            <p className="text-muted small">{shareProduct.title}</p>
            <div className="Customer_share-icons d-flex justify-content-center gap-3 my-3">
              <WhatsappShareButton url={shareUrl}>
                <WhatsappIcon size={42} round />
              </WhatsappShareButton>
              <FacebookShareButton url={shareUrl}>
                <FacebookIcon size={42} round />
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl}>
                <TwitterIcon size={42} round />
              </TwitterShareButton>
              <EmailShareButton url={shareUrl}>
                <EmailIcon size={42} round />
              </EmailShareButton>
            </div>
            <button type="button" className="btn btn-dark mb-2 btn-sm w-100" onClick={copyLink}>
              <FaLink className="me-2" /> Copy Link
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm w-100"
              onClick={() => setShareProduct(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* BANNER */}
      <div className="mb-4">
        <div
          className="p-4 p-md-5 text-white rounded position-relative overflow-hidden d-flex align-items-center justify-content-between shadow-sm Customer_luxury-banner"
          style={{
            backgroundImage: `url(${luxuryBgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "360px",
          }}
        >
          <div style={{ maxWidth: "600px", zIndex: 2 }}>
            <h1 className="fw-bold display-6 fst-italic" style={{ color: "#f3e5ab" }}>
              Luxury Gift Sets
            </h1>
            <p className="text-light opacity-95 small mb-3">
              Exclusive gift boxes with premium packaging designed for your special loved ones. Give
              the ultimate experience of sophistication and warmth.
            </p>
            <button
              type="button"
              onClick={() => navigate("/customer")}
              className="btn btn-sm px-4 py-2 fw-bold shadow-sm"
              style={{ backgroundColor: "#f3e5ab", color: "#064e3b", borderRadius: "6px" }}
            >
              Explore Collection
            </button>
          </div>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="container my-3 text-center">
        <div className="position-relative mx-auto" style={{ maxWidth: "600px" }}>
          <span
            className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted"
            style={{ pointerEvents: "none" }}
          >
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="Search luxury gift sets..."
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
          {/* FILTERS */}
          <div className="col-lg-3 mb-4">
            <div className="d-block d-lg-none mb-2">
              <button
                className="btn w-100 d-flex justify-content-between align-items-center py-2 text-white"
                style={{ backgroundColor: "#050e0c" }}
                type="button"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <span>🔍 Filter Luxury Products</span>
                <span>{isFilterOpen ? "▲" : "▼"}</span>
              </button>
            </div>

            <div
              className={`bg-white p-3 rounded shadow-sm border ${
                !isFilterOpen ? "d-none d-lg-block" : "d-block"
              }`}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold mb-0">Filters</h6>
                <button
                  type="button"
                  className="btn btn-link btn-sm p-0 text-muted text-decoration-none"
                  onClick={resetFilters}
                >
                  Clear All
                </button>
              </div>

              <div className="mb-3 border-bottom pb-3">
                <label className="fw-bold small mb-2 d-block">Category</label>
                <div className="form-check small mb-1">
                  <input className="form-check-input" type="checkbox" defaultChecked />
                  <label className="form-check-label">Luxury Hampers</label>
                </div>
                <div className="form-check small">
                  <input className="form-check-input" type="checkbox" />
                  <label className="form-check-label">Signature Sets</label>
                </div>
              </div>

              <div className="mb-3 border-bottom pb-3">
                <label className="fw-bold small mb-2 d-block" htmlFor="luxuryPriceRange">
                  Price Range
                </label>
                <input
                  id="luxuryPriceRange"
                  type="range"
                  className="form-range"
                  min={PRICE_MIN}
                  max={priceCeiling}
                  step={PRICE_STEP}
                  value={effectiveMaxPrice}
                  onChange={(e) => setPriceLimit(Number(e.target.value))}
                />
                <div className="d-flex justify-content-between text-muted small">
                  <span>₹{PRICE_MIN}</span>
                  <span>₹{effectiveMaxPrice}</span>
                </div>
              </div>

              <div>
                <label className="fw-bold small mb-2 d-block">Material</label>
                <div className="d-flex flex-column gap-1 small">
                  {MATERIAL_OPTIONS.map(({ label, match }) => (
                    <div className="form-check" key={match}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`luxuryMaterial-${match}`}
                        checked={selectedFabrics.includes(match)}
                        onChange={() => toggleFabric(match)}
                      />
                      <label className="form-check-label" htmlFor={`luxuryMaterial-${match}`}>
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* PRODUCTS */}
          <div className="col-lg-9">
            <div className="d-flex justify-content-between align-items-center mb-3 bg-white p-2 px-3 rounded shadow-sm border">
              <span className="text-muted small">
                {displayedLuxuryShawls.length > 0
                  ? `Showing ${displayedLuxuryShawls.length} product${displayedLuxuryShawls.length > 1 ? "s" : ""}`
                  : "No products found"}
              </span>
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

            <div className="row g-3">
              {displayedLuxuryShawls.length > 0 ? (
                displayedLuxuryShawls.map((item) => {
                  const pid = String(item.id);
                  const isInCart = cartProductIds.includes(pid);
                  const isWishlisted = pid in wishlistMap;
                  const isCartBusy = pendingIds.includes(`cart-${pid}`);
                  const isOutOfStock =
                    Number.isFinite(item.stockQuantity) && item.stockQuantity <= 0;

                  return (
                    <div className="col-6 col-sm-6 col-md-4" key={pid}>
                      <div
                        className="Customer_card h-100 border-0 shadow-sm d-flex flex-column justify-content-between p-2 position-relative"
                        style={{ backgroundColor: "#fff", borderRadius: "12px", cursor: "pointer" }}
                        role="link"
                        tabIndex={0}
                        onClick={() => openProduct(item)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && e.target === e.currentTarget) openProduct(item);
                        }}
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
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                              />
                            </div>
                          )}

                          <ProductImageSlider
                            images={
                              item.images && item.images.length
                                ? item.images
                                : [item.image]
                            }
                            alt={item.title}
                            hideArrowsOnMobile={true}
                            hideArrowsOnDesktop={true}
                          />

                          <button
                            type="button"
                            className="Customer_wishlist-btn"
                            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
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
                              <h6 className="Customer_card-title fw-bold mb-0 text-dark">
                                {item.title}
                              </h6>
                              <button
                                type="button"
                                className="Customer_share-btn-flat"
                                aria-label="Share product"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShareProduct(item);
                                }}
                                title="Share Product"
                              >
                                <FaShareAlt />
                              </button>
                            </div>

                            <div className="Customer_rating-row text-warning small mb-1">
                              {[...Array(item.rating || 5)].map((_, i) => (
                                <FaStar key={i} />
                              ))}
                              <span className="text-muted ms-1">({item.reviews || 16})</span>
                            </div>

                            <p
                              className="Customer_card-desc text-muted small mb-2"
                              style={{
                                display: "-webkit-box",
                                WebkitLineClamp: "2",
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {item.description}
                            </p>

                            <div className="Customer_price-row d-flex align-items-center gap-2 mb-2">
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

                          <div className="Customer_card-actions d-flex flex-column gap-1 mt-auto">
                            {isOutOfStock ? (
                              <button
                                type="button"
                                disabled
                                onClick={(e) => e.stopPropagation()}
                                className="Customer_card-btn btn w-100 fw-semibold text-white"
                                style={{
                                  backgroundColor: "#8a8a8a",
                                  border: "none",
                                  borderRadius: "6px",
                                }}
                              >
                                Out of Stock
                              </button>
                            ) : (
                              <>
                                {isInCart ? (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      navigate("/cart");
                                    }}
                                    className="Customer_card-btn btn w-100 fw-semibold text-white"
                                    style={{
                                      backgroundColor: "#2b8a3e",
                                      border: "none",
                                      borderRadius: "6px",
                                    }}
                                  >
                                    Go to Cart
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    disabled={isCartBusy}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleAddToCart(item);
                                    }}
                                    className="Customer_card-btn btn btn-dark w-100 fw-semibold text-white"
                                    style={{
                                      backgroundColor: "#064e3b",
                                      border: "none",
                                      borderRadius: "6px",
                                    }}
                                  >
                                    {isCartBusy ? "Adding..." : "Add to Cart"}
                                  </button>
                                )}

                                <button
                                  type="button"
                                  disabled={isCartBusy}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleBuyNow(item);
                                  }}
                                  className="Customer_card-btn Customer_buy-now-btn btn w-100 fw-bold text-white border-0 shadow-sm"
                                  style={{
                                    background: "linear-gradient(135deg, #d6bd69 0%, #dfa00b 100%)",
                                    borderRadius: "6px",
                                  }}
                                >
                                  Buy Now
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-12 text-center py-5">
                  <p className="text-muted fs-5">
                    No luxury gift sets found matching your filters.
                  </p>
                  <button
                    type="button"
                    className="btn btn-outline-dark btn-sm mt-2"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* PERKS STRIP */}
      <div className="container my-5">
        <div className="bg-white p-3 rounded shadow-sm border d-flex flex-wrap justify-content-around text-center gap-3">
          <div className="d-flex align-items-center gap-2">
            <FaGift className="fs-3" style={{ color: "#064e3b" }} />
            <div className="text-start">
              <h6 className="fw-bold mb-0 small">Signature Gift Chest</h6>
              <small className="text-muted" style={{ fontSize: "0.7rem" }}>
                Handcrafted rigid gift cases
              </small>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <FaCommentAlt className="fs-3" style={{ color: "#064e3b" }} />
            <div className="text-start">
              <h6 className="fw-bold mb-0 small">Personalized Note Card</h6>
              <small className="text-muted" style={{ fontSize: "0.7rem" }}>
                Handwritten gold-foil message
              </small>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <FaShippingFast className="fs-3" style={{ color: "#064e3b" }} />
            <div className="text-start">
              <h6 className="fw-bold mb-0 small">Insured Priority Shipping</h6>
              <small className="text-muted" style={{ fontSize: "0.7rem" }}>
                Safe & secure transit
              </small>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <FaUndo className="fs-3" style={{ color: "#064e3b" }} />
            <div className="text-start">
              <h6 className="fw-bold mb-0 small">Easy 7-Day Return</h6>
              <small className="text-muted" style={{ fontSize: "0.7rem" }}>
                Hassle-free return policy
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LuxuryGiftSets;