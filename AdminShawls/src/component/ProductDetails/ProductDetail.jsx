import React, {
  useEffect,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import API, { BASE_URL } from "../../utils/api";

import { shawls } from "../../data/shawls";

import {
  ToastContainer,
  toast,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { FaHeart } from "react-icons/fa";

import ProductImageSlider from "../../components/ProductImageSlider";


// =====================================================
// IMAGE URL HELPER
// =====================================================

const toImageUrl = (raw) => {
  if (!raw) {
    return "";
  }

  return raw.startsWith("http")
    ? raw
    : `${API.defaults.baseURL}/${raw.replace(
        /\\/g,
        "/"
      )}`;
};


// =====================================================
// PRODUCT DETAIL
// =====================================================

export default function ProductDetail({
  cartProductIds = [],
  handleAddToCart,
  handleBuyNow,
}) {
  const location = useLocation();

  const navigate = useNavigate();

  const { id } = useParams();


  // ===================================================
  // PRODUCT STATE
  // ===================================================

  const [product, setProduct] =
    useState(
      location.state?.product ||
        shawls.find(
          (item) =>
            item.id === parseInt(id)
        ) ||
        null
    );

  const [loading, setLoading] =
    useState(!product);

  const [notFound, setNotFound] =
    useState(false);

  // ===================================================
  // WISHLIST STATE (synced with backend, same as Men.jsx)
  // ===================================================

  const [wishlistProductIds, setWishlistProductIds] =
    useState([]);

  const fetchWishlist = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setWishlistProductIds([]);
      return;
    }

    fetch(`${BASE_URL}/api/customer/wishlist`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.wishlist)) {
          setWishlistProductIds(
            data.wishlist.map((item) =>
              String(item.productId)
            )
          );
        }
      })
      .catch((err) =>
        console.error(
          "Error fetching wishlist items:",
          err
        )
      );
  };

  useEffect(() => {
    fetchWishlist();

    window.addEventListener(
      "wishlistUpdated",
      fetchWishlist
    );

    return () =>
      window.removeEventListener(
        "wishlistUpdated",
        fetchWishlist
      );
  }, []);


  // ===================================================
  // FETCH PRODUCT FROM BACKEND
  // ===================================================

  useEffect(() => {
    if (product) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    setLoading(true);

    API.get(
      "/api/seller/products/public"
    )
      .then((res) => {
        if (!isMounted) {
          return;
        }

        const productList =
          Array.isArray(res.data)
            ? res.data
            : res.data.products || [];

        const found =
          productList.find(
            (p) =>
              String(p._id) ===
              String(id)
          );

        if (!found) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        const basePrice =
          Number(found.price || 0);

        const discountPercent =
          Number(found.discount || 0);

        const finalPrice =
          discountPercent > 0
            ? Math.round(
                basePrice -
                  (basePrice *
                    discountPercent) /
                    100
              )
            : basePrice;

        const rawImages =
          Array.isArray(
            found.productImages
          ) &&
          found.productImages.length > 0
            ? found.productImages
            : [
                found.productImage ||
                  found.image,
              ].filter(Boolean);

        const formattedImages =
          rawImages.map(toImageUrl);

        if (
          formattedImages.length ===
          0
        ) {
          formattedImages.push(
            "https://via.placeholder.com/400"
          );
        }

        let brandLogo = "";

        if (
          found.sellerId?.brandLogo
        ) {
          brandLogo =
            found.sellerId.brandLogo.startsWith(
              "http"
            )
              ? found.sellerId.brandLogo
              : `${API.defaults.baseURL}/${found.sellerId.brandLogo}`;
        }

        const formattedProduct = {
          id: found._id,

          title:
            found.productName ||
            found.title,

          description:
            found.description,

          price: `₹${finalPrice}`,

          originalPrice:
            discountPercent > 0
              ? `₹${basePrice}`
              : "",

          discount:
            discountPercent > 0
              ? `${discountPercent}% OFF`
              : null,

          image:
            formattedImages[0],

          images:
            formattedImages,

          brandLogo,

          stock: `Stock: ${
            found.stockQuantity ??
            found.stock ??
            0
          }`,

          fabric:
            found.fabric || "N/A",

          color:
            found.color || "N/A",

         size:
  found.size || found.productSize || found.dimensions || found.lengthWidth || "N/A",

          careInstructions:
            found.washCare || "N/A",

          sellerId:
            found.sellerId?._id ||
            found.sellerId ||
            "",
        };

        setProduct(
          formattedProduct
        );

        setLoading(false);
      })

      .catch((err) => {
        console.error(
          "Error fetching product:",
          err
        );

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


  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div
          className="spinner-border text-dark"
          role="status"
        >
          <span className="visually-hidden">
            Loading...
          </span>
        </div>
        <p className="text-muted mt-3">
          Loading product details...
        </p>
      </div>
    );
  }


  // ===================================================
  // NOT FOUND
  // ===================================================

  if (!product || notFound) {
    return (
      <div className="container text-center py-5">
        <div
          className="p-4 p-md-5 rounded-4 shadow-sm bg-white mx-auto border"
          style={{
            maxWidth: "500px",
          }}
        >
          <h3 className="fw-bold mb-3">
            Product Details Not Found
          </h3>
          <p className="text-muted mb-4">
            The item you are looking
            for might have been moved
            or removed.
          </p>
          <button
            className="btn btn-dark px-4 py-2 fw-semibold"
            onClick={() =>
              navigate("/")
            }
          >
            Back to Catalog
          </button>
        </div>
      </div>
    );
  }


  // ===================================================
  // CART STATUS
  // ===================================================

  const isInCart =
    cartProductIds?.includes(
      String(product.id)
    );


  // ===================================================
  // GALLERY IMAGES
  // ===================================================

  const galleryImages =
    Array.isArray(product.images) &&
    product.images.length > 0
      ? product.images.slice(0, 5)
      : [product.image];


  // ===================================================
  // AUTH CHECK
  // ===================================================

  const checkAuthAndExecute = (
    actionCallback
  ) => {
    const token =
      localStorage.getItem(
        "token"
      );

    if (!token) {
      toast.warning(
        "🔒 Please login first to perform this action!",
        {
          autoClose: 2000,
        }
      );

      setTimeout(() => {
        navigate("/login");
      }, 1000);

      return;
    }

    actionCallback();
  };


  // ===================================================
  // ADD TO CART
  // ===================================================

  const onAddToCartClick = () => {
    checkAuthAndExecute(() => {
      handleAddToCart(product);
    });
  };


  // ===================================================
  // BUY NOW
  // ===================================================

  const onBuyNowClick = () => {
    checkAuthAndExecute(() => {
      handleBuyNow(product);
    });
  };


  // ===================================================
  // WISHLIST TOGGLE (real API, same endpoints as Men.jsx)
  // ===================================================

  const isWishlisted = wishlistProductIds.includes(
    String(product.id)
  );

  const onWishlistClick = () => {
    checkAuthAndExecute(async () => {
      const token = localStorage.getItem("token");

      try {
        if (isWishlisted) {
          const res = await fetch(
            `${BASE_URL}/api/customer/wishlist`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const data = await res.json();

          const wishlistItem =
            data.wishlist?.find(
              (w) =>
                String(w.productId) ===
                String(product.id)
            );

          if (wishlistItem) {
            const delRes = await fetch(
              `${BASE_URL}/api/customer/wishlist/remove/${wishlistItem._id}`,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (delRes.ok) {
              toast.info(
                `${product.title} removed from wishlist`,
                { autoClose: 1000 }
              );

              setWishlistProductIds((prev) =>
                prev.filter(
                  (pid) =>
                    pid !== String(product.id)
                )
              );
            } else {
              toast.error(
                "Failed to update wishlist"
              );
            }
          }
        } else {
          const response = await fetch(
            `${BASE_URL}/api/customer/wishlist/add`,
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                productId: product.id,
                title: product.title,
                description:
                  product.description,
                price: product.price,
                originalPrice:
                  product.originalPrice || "",
                discount:
                  product.discount || "",
                image: product.image,
              }),
            }
          );

          if (response.ok) {
            toast.success(
              `${product.title} added to wishlist ❤️`,
              { autoClose: 1000 }
            );

            setWishlistProductIds((prev) => [
              ...prev,
              String(product.id),
            ]);
          } else {
            toast.error(
              "Failed to update wishlist"
            );
          }
        }

        window.dispatchEvent(
          new Event("wishlistUpdated")
        );
      } catch (err) {
        console.error(
          "Error connecting to backend:",
          err
        );
        toast.error("Server connection failed");
      }
    });
  };


  // ===================================================
  // UI
  // ===================================================

  return (
    <div
      className="bg-light min-vh-100 pb-4 pb-md-5"
      style={{
        // reduced top space (was clamp(90px, 12vw, 120px))
        paddingTop:
          "clamp(35px, 1vw, 40px)",
      }}
    >

      <ToastContainer />

      <div className="container">

        {/* BACK BUTTON */}

        <button
          className="btn btn-outline-dark btn-sm mb-4 fw-semibold px-3 py-2 shadow-sm"
          onClick={() =>
            navigate(-1)
          }
        >
          ← Back
        </button>

        {/* PRODUCT CARD */}

        <div className="bg-white rounded-4 shadow-sm border p-3 p-sm-4 p-md-5">

          <div className="row g-4 align-items-center">

            {/* LEFT COLUMN — IMAGES */}

            <div className="col-12 col-md-6">

              <div
                className="position-relative overflow-hidden rounded-3 bg-light text-center"
                style={{
                  isolation: "isolate",
                }}
              >
                <ProductImageSlider
                  images={galleryImages}
                  alt={product.title}
                  height="clamp(300px, 60vw, 480px)"
                  showThumbs={true}
                  brandLogo={
                    product.brandLogo
                  }
                  stockLabel={
                    product.stock
                  }
                />

              </div>

            </div>

            {/* RIGHT COLUMN — DETAILS */}

            <div className="col-12 col-md-6">

              <div className="ps-md-3 ps-lg-4">

                {/* HEADER */}

                <div className="mb-3">

                  <div className="d-flex justify-content-between align-items-start gap-2">

                    <span className="badge bg-secondary-subtle text-secondary text-uppercase fw-bold tracking-wider mb-2">
                      {product.fabric}
                    </span>

                    {/* WISHLIST ICON (NEW) */}

                    <button
                      type="button"
                      aria-label="Toggle wishlist"
                      onClick={
                        onWishlistClick
                      }
                      className="btn btn-light border rounded-circle shadow-sm d-flex align-items-center justify-content-center"
                      style={{
                        width: "42px",
                        height: "42px",
                        flexShrink: 0,
                      }}
                    >
                      <FaHeart
                        style={{
                          fontSize: "1.1rem",
                          color: isWishlisted
                            ? "red"
                            : "#ccc",
                          transition:
                            "color 0.2s ease",
                        }}
                      />
                    </button>

                  </div>

                  <h1 className="fw-bold text-dark fs-2 mb-2">
                    {product.title}
                  </h1>

                  <div className="d-flex align-items-center gap-2">

                    <h2 className="fw-bold text-dark fs-3 mb-0">
                      {product.price}
                    </h2>

                    {product.originalPrice && (
                      <span className="text-decoration-line-through text-muted fs-5">
                        {
                          product.originalPrice
                        }
                      </span>
                    )}

                    {product.discount && (
                      <span className="badge bg-danger">
                        {
                          product.discount
                        }
                      </span>
                    )}

                  </div>

                </div>

                {/* DESCRIPTION */}

                <p className="text-muted lh-base mb-4">
                  {
                    product.description
                  }
                </p>

                <hr className="my-4 text-secondary opacity-25" />

                {/* SPECIFICATIONS */}

                <h5 className="fw-bold text-dark mb-3 fs-6 text-uppercase tracking-wider">
                  Product Specifications
                </h5>

                <div className="row g-2 mb-4">

                  <div className="col-12 col-sm-6">
                    <div className="p-3 bg-light rounded-3 border">
                      <small className="text-muted text-uppercase fw-semibold d-block fs-7">
                        Material
                      </small>
                      <span className="fw-bold text-dark">
                        {
                          product.fabric
                        }
                      </span>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6">
                    <div className="p-3 bg-light rounded-3 border">
                      <small className="text-muted text-uppercase fw-semibold d-block fs-7">
                        Color
                      </small>
                      <span className="fw-bold text-dark">
                        {
                          product.color
                        }
                      </span>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6">
                    <div className="p-3 bg-light rounded-3 border">
                      <small className="text-muted text-uppercase fw-semibold d-block fs-7">
                        Dimensions
                      </small>
                      <span className="fw-bold text-dark">
                        {
                          product.size
                        }
                      </span>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6">
                    <div className="p-3 bg-light rounded-3 border">
                      <small className="text-muted text-uppercase fw-semibold d-block fs-7">
                        Care Instructions
                      </small>
                      <span className="fw-bold text-dark">
                        {
                          product.careInstructions
                        }
                      </span>
                    </div>
                  </div>

                </div>

                {/* ACTION BUTTONS */}

                <div className="row g-2 mb-3">

                  <div className="col-12 col-sm-6">

                    {isInCart ? (
                      <button
                        type="button"
                        className="btn btn-success w-100 py-3 fw-bold shadow-sm"
                        onClick={() =>
                          navigate(
                            "/cart"
                          )
                        }
                      >
                        Go to Cart →
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-success w-100 py-3 fw-bold shadow-sm"
                        onClick={
                          onAddToCartClick
                        }
                      >
                        Add to Cart
                      </button>
                    )}

                  </div>

                  <div className="col-12 col-sm-6">
                    <button
                      type="button"
                      className="btn btn-warning text-dark w-100 py-3 fw-bold shadow-sm"
                      onClick={
                        onBuyNowClick
                      }
                    >
                      ⚡ Buy Now
                    </button>
                  </div>

                </div>

                {product.updated && (
                  <div className="text-muted small">
                    <small>
                      {
                        product.updated
                      }
                    </small>
                  </div>
                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}