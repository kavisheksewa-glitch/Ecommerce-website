









// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Home.css";

// import image1 from "../../assets/1.png";
// import image1111 from "../../assets/h1.png";
// import image1112 from "../../assets/h2.png";
// import image1113 from "../../assets/h3.png";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import { FaShareAlt, FaLink, FaHeart } from "react-icons/fa";

// import {
//   WhatsappShareButton,
//   FacebookShareButton,
//   TwitterShareButton,
//   EmailShareButton,
//   WhatsappIcon,
//   FacebookIcon,
//   TwitterIcon,
//   EmailIcon,
// } from "react-share";

// import { homeShawls, shawls } from "../../data/shawls";

// function Home() {
//   const navigate = useNavigate();

//   // Share Product
//   const [shareProduct, setShareProduct] = useState(null);

//   // Cart
//   const [cartProductIds, setCartProductIds] = useState([]);

//   // Wishlist
//   const [wishlistProductIds, setWishlistProductIds] = useState([]);

//   // Cookie Consent
//   const [showCookieBanner, setShowCookieBanner] = useState(false);

//   // Carousel
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isTransitioning, setIsTransitioning] = useState(true);

//   // VIEW ALL PRODUCTS STATE
//   const [showAllProducts, setShowAllProducts] = useState(false);

//   // DYNAMIC & STATIC PRODUCTS STATES
//   const [dbProducts, setDbProducts] = useState([]);

//   // SEARCH STATE
//   const [searchQuery, setSearchQuery] = useState("");

//   // BANNER IMAGES
//   const bannerImages = [image1, image1111, image1112, image1113];

//   // Infinite Loop
//   const extendedBanners = [...bannerImages, bannerImages[0]];

//   // USER ID
//   const userId = localStorage.getItem("userId") || "guest_user_id";

//   // COOKIE CHECK
//   useEffect(() => {
//     const cookieConsent = localStorage.getItem("cookieConsent");
//     if (!cookieConsent) {
//       setShowCookieBanner(true);
//     }
//   }, []);

//   const handleAcceptCookies = () => {
//     localStorage.setItem("cookieConsent", "accepted");
//     setShowCookieBanner(false);
//   };

//   const handleDeclineCookies = () => {
//     localStorage.setItem("cookieConsent", "declined");
//     setShowCookieBanner(false);
//   };

//   // CAROUSEL TIMER
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setIsTransitioning(true);
//       setCurrentSlide((prev) => prev + 1);
//     }, 4000);

//     return () => clearInterval(timer);
//   }, []);

//   // CAROUSEL TRANSITION END
//   const handleTransitionEnd = () => {
//     if (currentSlide === bannerImages.length) {
//       setIsTransitioning(false);
//       setCurrentSlide(0);
//     }
//   };

//   // FETCH CART + WISHLIST + DB PRODUCTS
//   useEffect(() => {
//     const fetchCartItems = () => {
//       // ---------------- CART ----------------
//       fetch(`http://localhost:5000/api/shawls/cart/${userId}`)
//         .then((res) => res.json())
//         .then((data) => {
//           if (Array.isArray(data)) {
//             const ids = data.map((item) => String(item.productId));
//             setCartProductIds(ids);
//           }
//         })
//         .catch((err) => console.error("Error fetching cart items:", err));

//       // ---------------- WISHLIST ----------------
//       fetch(`http://localhost:5000/api/shawls/${userId}`)
//         .then((res) => res.json())
//         .then((data) => {
//           if (Array.isArray(data)) {
//             const ids = data.map((item) => String(item.productId));
//             setWishlistProductIds(ids);
//           }
//         })
//         .catch((err) => console.error("Error fetching wishlist items:", err));
//     };

//     fetchCartItems();

//     // Fetch Database Products from Seller API
//     axios
//       .get("http://localhost:5000/api/seller/products/public")
//       .then((res) => {
//         const productList = Array.isArray(res.data)
//           ? res.data
//           : res.data.products || [];

//         if (Array.isArray(productList)) {
//           const formattedDbProducts = productList.map((p) => {
//             const rawImage = p.productImage || p.image || "";
//             const formattedImage = rawImage.startsWith("http")
//               ? rawImage
//               : rawImage
//               ? `http://localhost:5000/${rawImage.replace(/\\/g, "/")}`
//               : "https://via.placeholder.com/150";

//             return {
//               id: p._id,
//               title: p.productName || p.title,
//               description: p.description,
//               price: `₹${p.price}`,
//               originalPrice: p.discount
//                 ? `₹${Math.round(p.price * (1 + p.discount / 100))}`
//                 : "",
//               discount: p.discount ? `${p.discount}% OFF` : null,
//               image: formattedImage,
//               stock: `Stock: ${p.stockQuantity ?? p.stock ?? 0}`,
//               category: p.category,
//               fabric: p.fabric || "N/A",
//               color: p.color || "N/A",
//               size: p.size || "N/A",
//               careInstructions: p.washCare || "N/A",
//             };
//           });
//           setDbProducts(formattedDbProducts);
//         }
//       })
//       .catch((err) => console.error("Error fetching live products:", err));
//   }, []); // Empty dependency array prevents infinite re-rendering loops

//   // COMBINED LISTS FOR DISPLAY WITH SEARCH SORTING/FILTERING LOGIC
//   const getProcessedProducts = (list) => {
//     if (!searchQuery.trim()) {
//       return list;
//     }
//     const query = searchQuery.toLowerCase().trim();

//     const sorted = [...list].sort((a, b) => {
//       const titleA = a.title?.toLowerCase() || "";
//       const titleB = b.title?.toLowerCase() || "";
//       const matchA = titleA.includes(query) ? 1 : 0;
//       const matchB = titleB.includes(query) ? 1 : 0;
//       return matchB - matchA;
//     });

//     return sorted.filter(
//       (item) =>
//         item.title?.toLowerCase().includes(query) ||
//         item.category?.toLowerCase().includes(query)
//     );
//   };

//   const displayedHomeShawls = getProcessedProducts([...dbProducts]);
//   const displayedAllShawls = getProcessedProducts([...shawls, ...dbProducts]);

//   // COPY PRODUCT LINK
//   const copyLink = async () => {
//     try {
//       const url = `${window.location.origin}/product/${shareProduct.id}`;
//       await navigator.clipboard.writeText(url);
//       toast.success("Link copied successfully!");
//       setShareProduct(null);
//     } catch (err) {
//       toast.error("Failed to copy link");
//     }
//   };

//   // ADD TO CART
//   const handleAddToCart = async (product) => {
//     try {
//       const response = await fetch("http://localhost:5000/api/shawls/cart/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userId: userId,
//           productId: product.id,
//           title: product.title,
//           description: product.description,
//           price: product.price,
//           originalPrice: product.originalPrice,
//           discount: product.discount,
//           image: product.image,
//           quantity: 1,
//         }),
//       });

//       if (response.ok) {
//         toast.success(`${product.title} added to cart! 🛒`, {
//           position: "top-right",
//           autoClose: 1000,
//         });

//         setCartProductIds((prev) => [...prev, String(product.id)]);
//         window.dispatchEvent(new Event("cartUpdated"));
//       } else {
//         toast.error("Failed to add to cart");
//       }
//     } catch (err) {
//       console.error("Error connecting to backend:", err);
//       toast.error("Server connection failed");
//     }
//   };

//   // WISHLIST
//   const handleToggleWishlist = async (product) => {
//     const isWishlisted = wishlistProductIds.includes(String(product.id));
//     const endpoint = isWishlisted ? "remove" : "add";

//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/shawls/${endpoint}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             userId: userId,
//             productId: product.id,
//             title: product.title,
//             description: product.description,
//             price: product.price,
//             originalPrice: product.originalPrice,
//             discount: product.discount,
//             image: product.image,
//           }),
//         }
//       );

//       if (response.ok) {
//         if (isWishlisted) {
//           toast.info(`${product.title} removed from wishlist`, {
//             autoClose: 1000,
//           });
//           setWishlistProductIds((prev) =>
//             prev.filter((id) => id !== String(product.id))
//           );
//         } else {
//           toast.success(`${product.title} added to wishlist ❤️`, {
//             autoClose: 1000,
//           });
//           setWishlistProductIds((prev) => [...prev, String(product.id)]);
//         }

//         window.dispatchEvent(new Event("wishlistUpdated"));
//       } else {
//         toast.error("Failed to update wishlist");
//       }
//     } catch (err) {
//       console.error("Error connecting to backend:", err);
//       toast.error("Server connection failed");
//     }
//   };

//   // BUY NOW
//   const handleBuyNow = async (product) => {
//     if (!cartProductIds.includes(String(product.id))) {
//       await handleAddToCart(product);
//     }

//     navigate("/checkout", {
//       state: {
//         product,
//       },
//     });
//   };

//   // SHARE
//   const handleShare = (product) => {
//     setShareProduct(product);
//   };

//   return (
//     <div>
//       <ToastContainer />

//       {/* COOKIE CONSENT */}
//       {showCookieBanner && (
//         <div
//           className="position-fixed bottom-0 start-0 w-100 bg-dark text-white p-3 shadow-lg d-flex flex-column flex-md-row justify-content-between align-items-center gap-3"
//           style={{ zIndex: 9999 }}
//         >
//           <div style={{ maxWidth: "800px", fontSize: "0.9rem" }}>
//             <span>
//               🍪 We use cookies to enhance your user experience. By using our
//               website, you agree to our use of cookies.
//             </span>
//           </div>

//           <div className="d-flex gap-2">
//             <button
//               className="btn btn-outline-light btn-sm px-3"
//               onClick={handleDeclineCookies}
//             >
//               Decline
//             </button>
//             <button
//               className="btn btn-warning btn-sm px-3 fw-bold text-dark"
//               onClick={handleAcceptCookies}
//             >
//               Accept
//             </button>
//           </div>
//         </div>
//       )}

//       {/* SHARE MODAL */}
//       {shareProduct && (
//         <div className="Customer_share-overlay">
//           <div className="Customer_share-modal">
//             <h4 className="fw-bold mb-1">Share Product</h4>
//             <p className="text-muted small">{shareProduct.title}</p>

//             <div className="Customer_share-icons">
//               <WhatsappShareButton
//                 url={`${window.location.origin}/product/${shareProduct.id}`}
//               >
//                 <WhatsappIcon size={46} round />
//               </WhatsappShareButton>

//               <FacebookShareButton
//                 url={`${window.location.origin}/product/${shareProduct.id}`}
//               >
//                 <FacebookIcon size={46} round />
//               </FacebookShareButton>

//               <TwitterShareButton
//                 url={`${window.location.origin}/product/${shareProduct.id}`}
//               >
//                 <TwitterIcon size={46} round />
//               </TwitterShareButton>

//               <EmailShareButton
//                 url={`${window.location.origin}/product/${shareProduct.id}`}
//               >
//                 <EmailIcon size={46} round />
//               </EmailShareButton>
//             </div>

//             <button className="Customer_copy-btn" onClick={copyLink}>
//               <FaLink className="me-2" />
//               Copy Link
//             </button>

//             <button
//               className="Customer_close-btn"
//               onClick={() => setShareProduct(null)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {/* SEARCH BAR SECTION */}
// <div className="container my-4 text-center">
//   <div className="position-relative mx-auto" style={{ maxWidth: "600px" }}>
//     {/* Search Icon */}
//     <span
//       className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted"
//       style={{ pointerEvents: "none" }}
//     >
//       <i className="bi bi-search"></i>
//     </span>

//     {/* Search Input */}
//     <input
//       type="text"
//       placeholder="Search products by name..."
//       value={searchQuery}
//       onChange={(e) => setSearchQuery(e.target.value)}
//       className="form-control w-100 shadow-sm"
//       style={{
//         padding: "12px 15px 12px 45px", // Left padding badhai hai taaki text icon ke upar na aaye
//         borderRadius: "30px",
//         border: "1px solid #ccc",
//         fontSize: "0.95rem",
//       }}
//     />
//   </div>
// </div>

//       {/* HERO BANNER CAROUSEL */}
//       <div className="Customer_hero-carousel-container position-relative overflow-hidden">
//         <div
//           className="Customer_hero-carousel-wrapper d-flex"
//           onTransitionEnd={handleTransitionEnd}
//           style={{
//             transform: `translateX(-${currentSlide * 100}%)`,
//             transition: isTransitioning
//               ? "transform 2s ease-in-out"
//               : "none",
//           }}
//         >
//           {extendedBanners.map((img, index) => (
//             <img
//               key={index}
//               src={img}
//               alt={`Kavi Shawls Banner ${(index % bannerImages.length) + 1}`}
//               className="Customer_hero-image w-100 flex-shrink-0"
//               style={{
//                 minWidth: "100%",
//                 objectFit: "cover",
//               }}
//             />
//           ))}
//         </div>

//         {/* CAROUSEL DOTS */}
//         <div className="Customer_carousel-dots position-absolute bottom-0 start-50 translate-middle-x mb-3 d-flex gap-2">
//           {bannerImages.map((_, index) => {
//             const activeIndex = currentSlide % bannerImages.length;

//             return (
//               <button
//                 key={index}
//                 onClick={() => {
//                   setIsTransitioning(true);
//                   setCurrentSlide(index);
//                 }}
//                 className={`border-0 rounded-circle ${
//                   activeIndex === index
//                     ? "bg-warning"
//                     : "bg-white opacity-50"
//                 }`}
//                 style={{
//                   width: activeIndex === index ? "24px" : "12px",
//                   height: "12px",
//                   cursor: "pointer",
//                   borderRadius: "20px",
//                   transition: "all 0.5s ease-in-out",
//                 }}
//               />
//             );
//           })}
//         </div>
//       </div>

//       {/* PRODUCT SECTION */}
//       <div className="container my-5">
//         <h2
//           className="Customer_luxury-title text-center fw-bold mb-4 fst-italic"
//           style={{ color: "#9d6a0cc4" }}
//         >
//           Our Featured Shawls
//         </h2>

//         {/* PRODUCT GRID */}
//         <div className="row g-4">
//           {(showAllProducts
//             ? displayedAllShawls
//             : displayedHomeShawls.slice(0, 8)
//           ).map((item) => {
//             const productIdStr = String(item.id);
//             const isInCart = cartProductIds.includes(productIdStr);
//             const isWishlisted = wishlistProductIds.includes(productIdStr);

//             return (
//               <div className="col-12 col-sm-6 col-md-3" key={productIdStr}>
//                 <div
//                   className="Customer_card h-100 border-0 shadow-sm d-flex flex-column justify-content-between p-2 position-relative"
//                   style={{
//                     backgroundColor: "#e4c893",
//                     borderRadius: "16px",
//                   }}
//                 >
//                   {/* IMAGE */}
//                   <div className="Customer_product-image-box card overflow-hidden position-relative">
//                     {item.discount && (
//                       <span
//                         className="badge bg-danger position-absolute top-0 start-0 m-2 px-2 py-1 shadow-sm fw-bold"
//                         style={{
//                           zIndex: 2,
//                           fontSize: "0.75rem",
//                           borderRadius: "6px",
//                         }}
//                       >
//                         {item.discount}
//                       </span>
//                     )}

//                     <img
//                       src={item.image}
//                       className="card-img-top rounded Customer_product-image"
//                       alt={item.title}
//                     />

//                     <button
//                       className="Customer_share-btn"
//                       onClick={() => handleShare(item)}
//                       title="Share Product"
//                     >
//                       <FaShareAlt />
//                     </button>

//                     <button
//                       className="Customer_wishlist-btn"
//                       onClick={() => handleToggleWishlist(item)}
//                       title="Wishlist Product"
//                       style={{
//                         position: "absolute",
//                         top: "10px",
//                         right: "50px",
//                         background: "white",
//                         border: "none",
//                         borderRadius: "50%",
//                         width: "35px",
//                         height: "35px",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         cursor: "pointer",
//                         boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
//                         color: isWishlisted ? "red" : "#ccc",
//                         transition: "color 0.2s ease",
//                         zIndex: 2,
//                       }}
//                     >
//                       <FaHeart />
//                     </button>
//                   </div>

//                   {/* CARD BODY */}
//                   <div className="Customer_card-body px-2 py-3 d-flex flex-column justify-content-between">
//                     <div>
//                       <h6
//                         className="fw-bold mb-1 text-dark"
//                         style={{ fontSize: "0.95rem", lineHeight: "1.3" }}
//                       >
//                         {item.title}
//                       </h6>

//                       <p
//                         className="text-muted small mb-2 Customer_text-truncate-2"
//                         style={{
//                           fontSize: "0.82rem",
//                           lineHeight: "1.4",
//                           minHeight: "2.6em",
//                         }}
//                       >
//                         {item.description}
//                       </p>

//                       <div className="d-flex justify-content-between align-items-center mb-3">
//                         <div className="d-flex align-items-center gap-2">
//                           <span className="fw-bold fs-6 text-success">
//                             {item.price}
//                           </span>
//                           {item.originalPrice && (
//                             <span
//                               className="text-decoration-line-through text-muted"
//                               style={{ fontSize: "0.8rem" }}
//                             >
//                               {item.originalPrice}
//                             </span>
//                           )}
//                         </div>

//                         <span
//                           className="badge bg-white text-secondary border fw-normal"
//                           style={{ fontSize: "0.7rem" }}
//                         >
//                           {item.stock}
//                         </span>
//                       </div>
//                     </div>

//                     {/* BUTTONS */}
//                     <div className="d-flex flex-column gap-2 mt-auto">
//                       <div className="d-flex gap-2">
//                         <button
//                           onClick={() =>
//                             navigate(`/product/${item.id}`, {
//                               state: { product: item },
//                             })
//                           }
//                           className="btn btn-outline-dark btn-sm w-50 fw-semibold"
//                           style={{ borderRadius: "8px" }}
//                         >
//                           View
//                         </button>

//                         {isInCart ? (
//                           <button
//                             onClick={() => navigate("/cart")}
//                             className="btn btn-sm w-50 fw-semibold text-white"
//                             style={{
//                               backgroundColor: "#2b8a3e",
//                               border: "none",
//                               borderRadius: "8px",
//                             }}
//                           >
//                             Go to Cart ➔
//                           </button>
//                         ) : (
//                           <button
//                             onClick={() => handleAddToCart(item)}
//                             className="btn btn-dark btn-sm w-50 fw-semibold text-white"
//                             style={{
//                               backgroundColor: "#166228",
//                               border: "none",
//                               borderRadius: "8px",
//                             }}
//                           >
//                             Add to Cart
//                           </button>
//                         )}
//                       </div>

//                       <button
//                         onClick={() => handleBuyNow(item)}
//                         className="btn btn-sm w-100 fw-bold text-white border-0 shadow-sm"
//                         style={{
//                           background:
//                             "linear-gradient(135deg, #d6bd69 0%, #dfa00b 100%)",
//                           borderRadius: "8px",
//                         }}
//                       >
//                         ⚡ Buy Now
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* VIEW ALL PRODUCTS BUTTON */}
//         <div className="text-center mt-5">
//           {!showAllProducts ? (
//             <button
//               onClick={() => setShowAllProducts(true)}
//               className="btn fw-bold px-5 py-3"
//               style={{
//                 background:
//                   "linear-gradient(135deg, #d6bd69 0%, #dfa00b 100%)",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "10px",
//                 boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
//                 fontSize: "1rem",
//                 cursor: "pointer",
//               }}
//             >
//               View All Products →
//             </button>
//           ) : (
//             <button
//               onClick={() => setShowAllProducts(false)}
//               className="btn btn-outline-dark fw-bold px-5 py-3"
//               style={{
//                 borderRadius: "10px",
//                 fontSize: "1rem",
//                 cursor: "pointer",
//               }}
//             >
//               Show Less ↑
//             </button>
//           )}
//         </div>

//         {/* EXPLORE CATEGORY BUTTONS */}
//         <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
//           <button
//             className="btn btn-outline-dark fw-semibold"
//             onClick={() => navigate("/shop/womens")}
//           >
//             Explore Women Shawls
//           </button>

//           <button
//             className="btn btn-outline-dark fw-semibold"
//             onClick={() => navigate("/shop/mens")}
//           >
//             Explore Men Shawls
//           </button>

//           <button
//             className="btn btn-outline-dark fw-semibold"
//             onClick={() => navigate("/shop/summer")}
//           >
//             Explore Summer Shawls
//           </button>

//           <button
//             className="btn btn-outline-dark fw-semibold"
//             onClick={() => navigate("/shop/featured")}
//           >
//             Explore Featured Shawls
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;







// nnnnnnnnnnnnnnnnnnn




// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Home.css";

// import image1 from "../../assets/1.png";
// import image1111 from "../../assets/h1.png";
// import image1112 from "../../assets/h2.png";
// import image1113 from "../../assets/h3.png";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import { FaShareAlt, FaLink, FaHeart } from "react-icons/fa";

// import {
//   WhatsappShareButton,
//   FacebookShareButton,
//   TwitterShareButton,
//   EmailShareButton,
//   WhatsappIcon,
//   FacebookIcon,
//   TwitterIcon,
//   EmailIcon,
// } from "react-share";

// import { homeShawls, shawls } from "../../data/shawls";

// function Home() {
//   const navigate = useNavigate();

//   // Share Product
//   const [shareProduct, setShareProduct] = useState(null);

//   // Cart
//   const [cartProductIds, setCartProductIds] = useState([]);

//   // Wishlist
//   const [wishlistProductIds, setWishlistProductIds] = useState([]);

//   // Cookie Consent
//   const [showCookieBanner, setShowCookieBanner] = useState(false);

//   // Carousel
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isTransitioning, setIsTransitioning] = useState(true);

//   // VIEW ALL PRODUCTS STATE
//   const [showAllProducts, setShowAllProducts] = useState(false);

//   // DYNAMIC & STATIC PRODUCTS STATES
//   const [dbProducts, setDbProducts] = useState([]);

//   // FILTER & SEARCH STATES
//   const [searchQuery, setSearchQuery] = useState("");
//   const [priceFilter, setPriceFilter] = useState(5000);
//   const [sortBy, setSortBy] = useState("Newest First");

//   // PAGINATION STATES
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 6; // Aap yahan apne hisaab se products ki limit change kar sakte hain (e.g., 6, 8, 9)

//   // Category Filter States
//   const [selectedCategory, setSelectedCategory] = useState({
//     womens: true,
//     mens: true,
//     // unisex: true,
//   });

//   // Material Filter States
//   const [selectedMaterials, setSelectedMaterials] = useState({
//     Pashmina: false,
//     Wool: false,
//     "Silk Blend": false,
//   });

//   // Mobile Filter Toggle State
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

//   // BANNER IMAGES
//   const bannerImages = [image1, image1111, image1112, image1113];

//   // Infinite Loop
//   const extendedBanners = [...bannerImages, bannerImages[0]];

//   // USER ID
//   const userId = localStorage.getItem("userId") || "guest_user_id";

//   // --- Authentication Check Helper ---
//   const checkAuthAndExecute = (actionCallback) => {
//     const currentUserId = localStorage.getItem("userId");
    
//     if (!currentUserId || currentUserId === "guest_user_id" || currentUserId === "null" || currentUserId === "undefined") {
//       toast.warning("🔒 Please login first to perform this action!", {
//         autoClose: 2000,
//       });
//       setTimeout(() => {
//         navigate("/login");
//       }, 1000);
//       return;
//     }

//     actionCallback();
//   };

//   // COOKIE CHECK
//   useEffect(() => {
//     const cookieConsent = localStorage.getItem("cookieConsent");
//     if (!cookieConsent) {
//       setShowCookieBanner(true);
//     }
//   }, []);

//   const handleAcceptCookies = () => {
//     localStorage.setItem("cookieConsent", "accepted");
//     setShowCookieBanner(false);
//   };

//   const handleDeclineCookies = () => {
//     localStorage.setItem("cookieConsent", "declined");
//     setShowCookieBanner(false);
//   };

//   // CAROUSEL TIMER
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setIsTransitioning(true);
//       setCurrentSlide((prev) => prev + 1);
//     }, 4000);

//     return () => clearInterval(timer);
//   }, []);

//   // CAROUSEL TRANSITION END
//   const handleTransitionEnd = () => {
//     if (currentSlide === bannerImages.length) {
//       setIsTransitioning(false);
//       setCurrentSlide(0);
//     }
//   };

//   // FETCH CART + WISHLIST + DB PRODUCTS
//   useEffect(() => {
//     const fetchCartItems = () => {
//       // ---------------- CART ----------------
//       fetch(`http://localhost:5000/api/shawls/cart/${userId}`)
//         .then((res) => res.json())
//         .then((data) => {
//           if (Array.isArray(data)) {
//             const ids = data.map((item) => String(item.productId));
//             setCartProductIds(ids);
//           }
//         })
//         .catch((err) => console.error("Error fetching cart items:", err));

//       // ---------------- WISHLIST ----------------
//       fetch(`http://localhost:5000/api/shawls/${userId}`)
//         .then((res) => res.json())
//         .then((data) => {
//           if (Array.isArray(data)) {
//             const ids = data.map((item) => String(item.productId));
//             setWishlistProductIds(ids);
//           }
//         })
//         .catch((err) => console.error("Error fetching wishlist items:", err));
//     };

//     fetchCartItems();

//     // Fetch Database Products from Seller API
//     axios
//       .get("http://localhost:5000/api/seller/products/public")
//       .then((res) => {
//         const productList = Array.isArray(res.data)
//           ? res.data
//           : res.data.products || [];

//         if (Array.isArray(productList)) {
//           const formattedDbProducts = productList.map((p) => {
//             const rawImage = p.productImage || p.image || "";
//             const formattedImage = rawImage.startsWith("http")
//               ? rawImage
//               : rawImage
//               ? `http://localhost:5000/${rawImage.replace(/\\/g, "/")}`
//               : "https://via.placeholder.com/150";

//             return {
//               id: p._id,
//               title: p.productName || p.title,
//               description: p.description,
//               priceNum: Number(p.price || 0),
//               price: `₹${p.price}`,
//               originalPrice: p.discount
//                 ? `₹${Math.round(p.price * (1 + p.discount / 100))}`
//                 : "",
//               discount: p.discount ? `${p.discount}% OFF` : null,
//               image: formattedImage,
//               stock: `Stock: ${p.stockQuantity ?? p.stock ?? 0}`,
//               category: p.category || "Unisex",
//               fabric: p.fabric || "N/A",
//               color: p.color || "N/A",
//               size: p.size || "N/A",
//               careInstructions: p.washCare || "N/A",
//             };
//           });
//           setDbProducts(formattedDbProducts);
//         }
//       })
//       .catch((err) => console.error("Error fetching live products:", err));
//   }, [userId]);

//   // RESET TO PAGE 1 WHEN FILTER/SEARCH/SORT CHANGES
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchQuery, priceFilter, sortBy, selectedMaterials, showAllProducts]);

//   // HANDLE MATERIAL CHECKBOX TOGGLE
//   const handleMaterialChange = (material) => {
//     setSelectedMaterials((prev) => ({
//       ...prev,
//       [material]: !prev[material],
//     }));
//   };

//   const handleClearAllFilters = () => {
//     setPriceFilter(5000);
//     setSearchQuery("");
//     setSelectedCategory({ womens: true, mens: true, unisex: true });
//     setSelectedMaterials({ Pashmina: false, Wool: false, "Silk Blend": false });
//   };

//   // COMBINED LISTS FOR DISPLAY WITH ADVANCED FILTERING & SORTING LOGIC
//   const getProcessedProducts = (list) => {
//     let filtered = list.map(item => ({
//       ...item,
//       priceNum: item.priceNum !== undefined ? item.priceNum : Number(String(item.price || "0").replace(/[^0-9]/g, ""))
//     })).filter((item) => {
//       // 1. Search Filter
//       const matchesSearch = searchQuery.trim() === "" || 
//         item.title?.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
//         item.category?.toLowerCase().includes(searchQuery.toLowerCase().trim());

//       // 2. Price Filter
//       const matchesPrice = item.priceNum <= Number(priceFilter);

//       // 3. Material Filter
//       const activeMaterials = Object.keys(selectedMaterials).filter((m) => selectedMaterials[m]);
//       const matchesMaterial = activeMaterials.length === 0 || 
//         activeMaterials.some((mat) => item.fabric?.toLowerCase().includes(mat.toLowerCase()));

//       return matchesSearch && matchesPrice && matchesMaterial;
//     });

//     // 4. Sorting Logic
//     filtered.sort((a, b) => {
//       if (sortBy === "Price: Low to High") {
//         return a.priceNum - b.priceNum;
//       } else if (sortBy === "Price: High to Low") {
//         return b.priceNum - a.priceNum;
//       } else {
//         return 0; // Newest First / Default
//       }
//     });

//     return filtered;
//   };

//   const allCombinedShawls = [...dbProducts];
//   const allFullShawlsList = [...shawls, ...dbProducts];

//   const displayedHomeShawls = getProcessedProducts(allCombinedShawls);
//   const displayedAllShawls = getProcessedProducts(allFullShawlsList);

//   // Active items list based on "View All Products" toggle
//   const activeProductsList = showAllProducts ? displayedAllShawls : displayedHomeShawls;

//   // PAGINATION LOGIC
//   const totalPages = Math.ceil(activeProductsList.length / productsPerPage);
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = activeProductsList.slice(indexOfFirstProduct, indexOfLastProduct);

//   // COPY PRODUCT LINK
//   const copyLink = async () => {
//     try {
//       const url = `${window.location.origin}/product/${shareProduct.id}`;
//       await navigator.clipboard.writeText(url);
//       toast.success("Link copied successfully!");
//       setShareProduct(null);
//     } catch (err) {
//       toast.error("Failed to copy link");
//     }
//   };

//   // ADD TO CART (With Auth Check)
//   const handleAddToCart = (product) => {
//     checkAuthAndExecute(async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/shawls/cart/add", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             userId: localStorage.getItem("userId"),
//             productId: product.id,
//             title: product.title,
//             description: product.description,
//             price: product.price,
//             originalPrice: product.originalPrice,
//             discount: product.discount,
//             image: product.image,
//             quantity: 1,
//           }),
//         });

//         if (response.ok) {
//           toast.success(`${product.title} added to cart! 🛒`, {
//             position: "top-right",
//             autoClose: 1000,
//           });

//           setCartProductIds((prev) => [...prev, String(product.id)]);
//           window.dispatchEvent(new Event("cartUpdated"));
//         } else {
//           toast.error("Failed to add to cart");
//         }
//       } catch (err) {
//         console.error("Error connecting to backend:", err);
//         toast.error("Server connection failed");
//       }
//     });
//   };

//   // WISHLIST (With Auth Check)
//   const handleToggleWishlist = (product) => {
//     checkAuthAndExecute(async () => {
//       const isWishlisted = wishlistProductIds.includes(String(product.id));
//       const endpoint = isWishlisted ? "remove" : "add";

//       try {
//         const response = await fetch(
//           `http://localhost:5000/api/shawls/${endpoint}`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               userId: localStorage.getItem("userId"),
//               productId: product.id,
//               title: product.title,
//               description: product.description,
//               price: product.price,
//               originalPrice: product.originalPrice,
//               discount: product.discount,
//               image: product.image,
//             }),
//           }
//         );

//         if (response.ok) {
//           if (isWishlisted) {
//             toast.info(`${product.title} removed from wishlist`, {
//               autoClose: 1000,
//             });
//             setWishlistProductIds((prev) =>
//               prev.filter((id) => id !== String(product.id))
//             );
//           } else {
//             toast.success(`${product.title} added to wishlist ❤️`, {
//               autoClose: 1000,
//             });
//             setWishlistProductIds((prev) => [...prev, String(product.id)]);
//           }

//           window.dispatchEvent(new Event("wishlistUpdated"));
//         } else {
//           toast.error("Failed to update wishlist");
//         }
//       } catch (err) {
//         console.error("Error connecting to backend:", err);
//         toast.error("Server connection failed");
//       }
//     });
//   };

//   // BUY NOW (With Auth Check)
//   const handleBuyNow = (product) => {
//     checkAuthAndExecute(async () => {
//       if (!cartProductIds.includes(String(product.id))) {
//         try {
//           await fetch("http://localhost:5000/api/shawls/cart/add", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               userId: localStorage.getItem("userId"),
//               productId: product.id,
//               title: product.title,
//               description: product.description,
//               price: product.price,
//               originalPrice: product.originalPrice,
//               discount: product.discount,
//               image: product.image,
//               quantity: 1,
//             }),
//           });
//         } catch (err) {
//           console.error(err);
//         }
//       }

//       navigate("/checkout", {
//         state: {
//           product,
//         },
//       });
//     });
//   };

//   // SHARE
//   const handleShare = (product) => {
//     setShareProduct(product);
//   };

//   return (
//     <div>
//       <ToastContainer />

//       {/* COOKIE CONSENT */}
//       {showCookieBanner && (
//         <div
//           className="position-fixed bottom-0 start-0 w-100 bg-dark text-white p-3 shadow-lg d-flex flex-column flex-md-row justify-content-between align-items-center gap-3"
//           style={{ zIndex: 9999 }}
//         >
//           <div style={{ maxWidth: "800px", fontSize: "0.9rem" }}>
//             <span>
//               🍪 We use cookies to enhance your user experience. By using our
//               website, you agree to our use of cookies.
//             </span>
//           </div>

//           <div className="d-flex gap-2">
//             <button
//               className="btn btn-outline-light btn-sm px-3"
//               onClick={handleDeclineCookies}
//             >
//               Decline
//             </button>
//             <button
//               className="btn btn-warning btn-sm px-3 fw-bold text-dark"
//               onClick={handleAcceptCookies}
//             >
//               Accept
//             </button>
//           </div>
//         </div>
//       )}

//       {/* SHARE MODAL */}
//       {shareProduct && (
//         <div className="Customer_share-overlay">
//           <div className="Customer_share-modal">
//             <h4 className="fw-bold mb-1">Share Product</h4>
//             <p className="text-muted small">{shareProduct.title}</p>

//             <div className="Customer_share-icons">
//               <WhatsappShareButton
//                 url={`${window.location.origin}/product/${shareProduct.id}`}
//               >
//                 <WhatsappIcon size={46} round />
//               </WhatsappShareButton>

//               <FacebookShareButton
//                 url={`${window.location.origin}/product/${shareProduct.id}`}
//               >
//                 <FacebookIcon size={46} round />
//               </FacebookShareButton>

//               <TwitterShareButton
//                 url={`${window.location.origin}/product/${shareProduct.id}`}
//               >
//                 <TwitterIcon size={46} round />
//               </TwitterShareButton>

//               <EmailShareButton
//                 url={`${window.location.origin}/product/${shareProduct.id}`}
//               >
//                 <EmailIcon size={46} round />
//               </EmailShareButton>
//             </div>

//             <button className="Customer_copy-btn" onClick={copyLink}>
//               <FaLink className="me-2" />
//               Copy Link
//             </button>

//             <button
//               className="Customer_close-btn"
//               onClick={() => setShareProduct(null)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}

    

//       {/* HERO BANNER CAROUSEL */}
//       <div className="Customer_hero-carousel-container position-relative overflow-hidden">
//         <div
//           className="Customer_hero-carousel-wrapper d-flex"
//           onTransitionEnd={handleTransitionEnd}
//           style={{
//             transform: `translateX(-${currentSlide * 100}%)`,
//             transition: isTransitioning
//               ? "transform 2s ease-in-out"
//               : "none",
//           }}
//         >
//           {extendedBanners.map((img, index) => (
//             <img
//               key={index}
//               src={img}
//               alt={`Kavi Shawls Banner ${(index % bannerImages.length) + 1}`}
//               className="Customer_hero-image w-100 flex-shrink-0"
//               style={{
//                 minWidth: "100%",
//                 objectFit: "cover",
//                 objectPosition:"top"
//               }}
//             />
//           ))}
//         </div>

//         {/* CAROUSEL DOTS */}
//         <div className="Customer_carousel-dots position-absolute bottom-0 start-50 translate-middle-x mb-3 d-flex gap-2">
//           {bannerImages.map((_, index) => {
//             const activeIndex = currentSlide % bannerImages.length;

//             return (
//               <button
//                 key={index}
//                 onClick={() => {
//                   setIsTransitioning(true);
//                   setCurrentSlide(index);
//                 }}
//                 className={`border-0 rounded-circle ${
//                   activeIndex === index
//                     ? "bg-warning"
//                     : "bg-white opacity-50"
//                 }`}
//                 style={{
//                   width: activeIndex === index ? "24px" : "12px",
//                   height: "12px",
//                   cursor: "pointer",
//                   borderRadius: "20px",
//                   transition: "all 0.5s ease-in-out",
//                 }}
//               />
//             );
//           })}
//         </div>
//       </div>


//       <div className="container my-4 text-center">
//         <div className="position-relative mx-auto" style={{ maxWidth: "600px" }}>
//           <span
//             className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted"
//             style={{ pointerEvents: "none" }}
//           >
//             <i className="bi bi-search"></i>
//           </span>

//           <input
//             type="text"
//             placeholder="Search products by name..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="form-control w-100 shadow-sm"
//             style={{
//               padding: "12px 15px 12px 45px",
//               borderRadius: "30px",
//               border: "1px solid #ccc",
//               fontSize: "0.95rem",
//             }}
//           />
//         </div>
//       </div>

//       {/* PRODUCT SECTION WITH FILTERS & GRID */}
//       <div className="container my-5">
//         <h2
//           className="Customer_luxury-title text-center fw-bold mb-4 fst-italic"
//           style={{ color: "#9d6a0cc4" }}
//         >
//           Our Featured Shawls
//         </h2>

//         <div className="row">
          
//           {/* LEFT SIDEBAR FILTERS */}
//           <div className="col-lg-3 mb-4">
//             {/* Mobile Filter Toggle */}
//             <div className="d-block d-lg-none mb-2">
//               <button
//                 className="btn w-100  d-flex justify-content-between align-items-center py-2 text-white"
//                 style={{ backgroundColor: "#06080e" }}
//                 type="button"
//                 onClick={() => setIsFilterOpen(!isFilterOpen)}
//               >
//                 <span>🔍 Filter Products</span>
//                 <span>{isFilterOpen ? "▲" : "▼"}</span>
//               </button>
//             </div>

//             {/* Filters Container */}
//             <div className={`bg-white p-3 rounded shadow-sm border ${!isFilterOpen ? "d-none d-lg-block" : "d-block"}`}>
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h6 className="fw-bold mb-0">Filters</h6>
//                 <span className="text-muted small" style={{ cursor: "pointer" }} onClick={handleClearAllFilters}>Clear All</span>
//               </div>

//               {/* Price Range */}
//               <div className="mb-3 border-bottom pb-3">
//                 <label className="fw-bold small mb-2 d-block">Price Range</label>
//                 <input
//                   type="range"
//                   className="form-range"
//                   min="500"
//                   max="5000"
//                   value={priceFilter}
//                   onChange={(e) => setPriceFilter(e.target.value)}
//                 />
//                 <div className="d-flex justify-content-between text-muted small">
//                   <span>₹500</span>
//                   <span>₹{priceFilter}</span>
//                 </div>
//               </div>

//               {/* Material Filter */}
//               <div>
//                 <label className="fw-bold small mb-2 d-block">Material / Fabric</label>
//                 <div className="d-flex flex-column gap-1 small">
//                   <div className="form-check">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       checked={selectedMaterials.Pashmina}
//                       onChange={() => handleMaterialChange("Pashmina")}
//                     />
//                     <label className="form-check-label">Pashmina</label>
//                   </div>
//                   <div className="form-check">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       checked={selectedMaterials.Wool}
//                       onChange={() => handleMaterialChange("Wool")}
//                     />
//                     <label className="form-check-label">Wool</label>
//                   </div>
//                   <div className="form-check">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       checked={selectedMaterials["Silk Blend"]}
//                       onChange={() => handleMaterialChange("Silk Blend")}
//                     />
//                     <label className="form-check-label">Silk Blend</label>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT PRODUCT GRID SECTION */}
//           <div className="col-lg-9">
//             {/* Sort Bar */}
//             <div className="d-flex justify-content-between align-items-center mb-3 bg-white p-2 px-3 rounded shadow-sm border">
//               <span className="text-muted small">
//                 Showing {activeProductsList.length > 0 ? indexOfFirstProduct + 1 : 0}-
//                 {Math.min(indexOfLastProduct, activeProductsList.length)} of {activeProductsList.length} products
//               </span>
//               <select
//                 className="form-select form-select-sm w-auto"
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//               >
//                 <option value="Newest First">Sort By: Newest First</option>
//                 <option value="Price: Low to High">Price: Low to High</option>
//                 <option value="Price: High to Low">Price: High to Low</option>
//               </select>
//             </div>

//             {/* PRODUCT GRID */}
//             <div className="row g-4">
//               {currentProducts.length > 0 ? (
//                 currentProducts.map((item) => {
//                   const productIdStr = String(item.id);
//                   const isInCart = cartProductIds.includes(productIdStr);
//                   const isWishlisted = wishlistProductIds.includes(productIdStr);

//                   return (
//                     <div className="col-12 col-sm-6 col-md-4" key={productIdStr}>
//                       <div
//                         className="Customer_card h-100 border-0 shadow-sm d-flex flex-column justify-content-between p-2 position-relative"
//                         style={{
//                           backgroundColor: "#e4c893",
//                           borderRadius: "16px",
//                         }}
//                       >
//                         {/* IMAGE */}
//                         <div className="Customer_product-image-box card overflow-hidden position-relative">
//                           {item.discount && (
//                             <span
//                               className="badge bg-danger position-absolute top-0 start-0 m-2 px-2 py-1 shadow-sm fw-bold"
//                               style={{
//                                 zIndex: 2,
//                                 fontSize: "0.75rem",
//                                 borderRadius: "6px",
//                               }}
//                             >
//                               {item.discount}
//                             </span>
//                           )}

//                           <img
//                             src={item.image}
//                             className="card-img-top rounded Customer_product-image"
//                             alt={item.title}
//                           />

//                           <button
//                             className="Customer_share-btn"
//                             onClick={() => handleShare(item)}
//                             title="Share Product"
//                           >
//                             <FaShareAlt />
//                           </button>

//                           <button
//                             className="Customer_wishlist-btn"
//                             onClick={() => handleToggleWishlist(item)}
//                             title="Wishlist Product"
//                             style={{
//                               position: "absolute",
//                               top: "10px",
//                               right: "50px",
//                               background: "white",
//                               border: "none",
//                               borderRadius: "50%",
//                               width: "35px",
//                               height: "35px",
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                               cursor: "pointer",
//                               boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
//                               color: isWishlisted ? "red" : "#ccc",
//                               transition: "color 0.2s ease",
//                               zIndex: 2,
//                             }}
//                           >
//                             <FaHeart />
//                           </button>
//                         </div>

//                         {/* CARD BODY */}
//                         <div className="Customer_card-body px-2 py-3 d-flex flex-column justify-content-between">
//                           <div>
//                             <h6
//                               className="fw-bold mb-1 text-dark"
//                               style={{ fontSize: "0.95rem", lineHeight: "1.3" }}
//                             >
//                               {item.title}
//                             </h6>

//                             <p
//                               className="text-muted small mb-2 Customer_text-truncate-2"
//                               style={{
//                                 fontSize: "0.82rem",
//                                 lineHeight: "1.4",
//                                 minHeight: "2.6em",
//                               }}
//                             >
//                               {item.description}
//                             </p>

//                             <div className="d-flex justify-content-between align-items-center mb-3">
//                               <div className="d-flex align-items-center gap-2">
//                                 <span className="fw-bold fs-6 text-success">
//                                   {item.price}
//                                 </span>
//                                 {item.originalPrice && (
//                                   <span
//                                     className="text-decoration-line-through text-muted"
//                                     style={{ fontSize: "0.8rem" }}
//                                   >
//                                     {item.originalPrice}
//                                   </span>
//                                 )}
//                               </div>

//                               <span
//                                 className="badge bg-white text-secondary border fw-normal"
//                                 style={{ fontSize: "0.7rem" }}
//                               >
//                                 {item.stock}
//                               </span>
//                             </div>
//                           </div>

//                           {/* BUTTONS */}
//                           <div className="d-flex flex-column gap-2 mt-auto">
//                             <div className="d-flex gap-2">
//                               <button
//                                 onClick={() =>
//                                   navigate(`/product/${item.id}`, {
//                                     state: { product: item },
//                                   })
//                                 }
//                                 className="btn btn-outline-dark btn-sm w-50 fw-semibold"
//                                 style={{ borderRadius: "8px" }}
//                               >
//                                 View
//                               </button>

//                               {isInCart ? (
//                                 <button
//                                   onClick={() => navigate("/cart")}
//                                   className="btn btn-sm w-50 fw-semibold text-white"
//                                   style={{
//                                     backgroundColor: "#2b8a3e",
//                                     border: "none",
//                                     borderRadius: "8px",
//                                   }}
//                                 >
//                                   Go to Cart ➔
//                                 </button>
//                               ) : (
//                                 <button
//                                   onClick={() => handleAddToCart(item)}
//                                   className="btn btn-dark btn-sm w-50 fw-semibold text-white"
//                                   style={{
//                                     backgroundColor: "#166228",
//                                     border: "none",
//                                     borderRadius: "8px",
//                                   }}
//                                 >
//                                   Add to Cart
//                                 </button>
//                               )}
//                             </div>

//                             <button
//                               onClick={() => handleBuyNow(item)}
//                               className="btn btn-sm w-100 fw-bold text-white border-0 shadow-sm"
//                               style={{
//                                 background:
//                                   "linear-gradient(135deg, #d6bd69 0%, #dfa00b 100%)",
//                                 borderRadius: "8px",
//                               }}
//                             >
//                               ⚡ Buy Now
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })
//               ) : (
//                 <div className="col-12 text-center py-5">
//                   <p className="text-muted fs-5">No products found matching your search or filters.</p>
//                 </div>
//               )}
//             </div>

//             {/* PAGINATION CONTROLS */}
//             {totalPages > 1 && (
//               <nav className="d-flex justify-content-center mt-4">
//                 <ul className="pagination shadow-sm">
//                   {/* Previous Button */}
//                   <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
//                     <button
//                       className="page-link text-dark"
//                       onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                     >
//                       Previous
//                     </button>
//                   </li>

//                   {/* Page Numbers */}
//                   {Array.from({ length: totalPages }, (_, index) => {
//                     const pageNumber = index + 1;
//                     return (
//                       <li
//                         key={pageNumber}
//                         className={`page-item ${currentPage === pageNumber ? "active" : ""}`}
//                       >
//                         <button
//                           className={`page-link ${
//                             currentPage === pageNumber
//                               ? "bg-dark text-white border-dark"
//                               : "text-dark"
//                           }`}
//                           onClick={() => setCurrentPage(pageNumber)}
//                         >
//                           {pageNumber}
//                         </button>
//                       </li>
//                     );
//                   })}

//                   {/* Next Button */}
//                   <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
//                     <button
//                       className="page-link text-dark"
//                       onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//                     >
//                       Next
//                     </button>
//                   </li>
//                 </ul>
//               </nav>
//             )}

//           </div>
//         </div>

//         {/* VIEW ALL PRODUCTS BUTTON */}
//         <div className="text-center mt-5">
//           {!showAllProducts ? (
//             <button
//               onClick={() => setShowAllProducts(true)}
//               className="btn fw-bold px-5 py-3"
//               style={{
//                 background:
//                   "linear-gradient(135deg, #d6bd69 0%, #dfa00b 100%)",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "10px",
//                 boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
//                 fontSize: "1rem",
//                 cursor: "pointer",
//               }}
//             >
//               View All Products →
//             </button>
//           ) : (
//             <button
//               onClick={() => setShowAllProducts(false)}
//               className="btn btn-outline-dark fw-bold px-5 py-3"
//               style={{
//                 borderRadius: "10px",
//                 fontSize: "1rem",
//                 cursor: "pointer",
//               }}
//             >
//               Show Less ↑
//             </button>
//           )}
//         </div>

//         {/* EXPLORE CATEGORY BUTTONS */}
//         <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
//           <button
//             className="btn btn-outline-dark fw-semibold"
//             onClick={() => navigate("/shop/womens")}
//           >
//             Explore Women Shawls
//           </button>

//           <button
//             className="btn btn-outline-dark fw-semibold"
//             onClick={() => navigate("/shop/mens")}
//           >
//             Explore Men Shawls
//           </button>

//           <button
//             className="btn btn-outline-dark fw-semibold"
//             onClick={() => navigate("/shop/summer")}
//           >
//             Explore Summer Shawls
//           </button>

//           <button
//             className="btn btn-outline-dark fw-semibold"
//             onClick={() => navigate("/shop/featured")}
//           >
//             Explore Featured Shawls
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home; 






// nnnnnnnnnnnnnnn






import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

import image1 from "../../assets/1.png";
import image1111 from "../../assets/h1.png";
import image1112 from "../../assets/h2.png";
import image1113 from "../../assets/h3.png";
import axios from "axios";
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

import { homeShawls, shawls } from "../../data/shawls";

function Home() {
  const navigate = useNavigate();

  // Share Product
  const [shareProduct, setShareProduct] = useState(null);

  // Cart
  const [cartProductIds, setCartProductIds] = useState([]);

  // Wishlist
  const [wishlistProductIds, setWishlistProductIds] = useState([]);

  // Cookie Consent
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  // Carousel
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // VIEW ALL PRODUCTS STATE
  const [showAllProducts, setShowAllProducts] = useState(false);

  // DYNAMIC & STATIC PRODUCTS STATES
  const [dbProducts, setDbProducts] = useState([]);

  // FILTER & SEARCH STATES
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState(5000);
  const [sortBy, setSortBy] = useState("Newest First");

  // PAGINATION STATES
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // 4 columns ke hisab se per page 8 ya 12 products sahi rehte hain

  // Category Filter State
  const [selectedCategories, setSelectedCategories] = useState({
    Pashmina: false,
    Woolen: false,
    Silk: false,
    Cotton: false,
  });

  // Filter Modal / Dropdown Toggle State (Image jaisa popup/toggle filter)
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // BANNER IMAGES
  const bannerImages = [image1, image1111, image1112, image1113];
  const extendedBanners = [...bannerImages, bannerImages[0]];

  // USER ID
  const userId = localStorage.getItem("userId") || "guest_user_id";

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

  // COOKIE CHECK
  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setShowCookieBanner(true);
    }
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

  // FETCH CART + WISHLIST + DB PRODUCTS
  useEffect(() => {
    const fetchCartItems = () => {
      fetch(`http://localhost:5000/api/shawls/cart/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            const ids = data.map((item) => String(item.productId));
            setCartProductIds(ids);
          }
        })
        .catch((err) => console.error("Error fetching cart items:", err));

      fetch(`http://localhost:5000/api/shawls/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            const ids = data.map((item) => String(item.productId));
            setWishlistProductIds(ids);
          }
        })
        .catch((err) => console.error("Error fetching wishlist items:", err));
    };

    fetchCartItems();

    axios
      .get("http://localhost:5000/api/seller/products/public")
      .then((res) => {
        const productList = Array.isArray(res.data)
          ? res.data
          : res.data.products || [];

        if (Array.isArray(productList)) {
          const formattedDbProducts = productList.map((p) => {
            const rawImage = p.productImage || p.image || "";
            const formattedImage = rawImage.startsWith("http")
              ? rawImage
              : rawImage
              ? `http://localhost:5000/${rawImage.replace(/\\/g, "/")}`
              : "https://via.placeholder.com/150";

            return {
              id: p._id,
              title: p.productName || p.title,
              description: p.description,
              priceNum: Number(p.price || 0),
              price: `₹${p.price}`,
              originalPrice: p.discount
                ? `₹${Math.round(p.price * (1 + p.discount / 100))}`
                : "",
              discount: p.discount ? `${p.discount}% OFF` : null,
              image: formattedImage,
              stock: `Stock: ${p.stockQuantity ?? p.stock ?? 0}`,
              category: p.category || "Pashmina",
              fabric: p.fabric || p.category || "Pashmina",
              color: p.color || "N/A",
              size: p.size || "N/A",
              careInstructions: p.washCare || "N/A",
            };
          });
          setDbProducts(formattedDbProducts);
        }
      })
      .catch((err) => console.error("Error fetching live products:", err));
  }, [userId]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, priceFilter, sortBy, selectedCategories, showAllProducts]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleClearAllFilters = () => {
    setPriceFilter(5000);
    setSearchQuery("");
    setSelectedCategories({
      Pashmina: false,
      Woolen: false,
      Silk: false,
      Cotton: false,
    });
  };

  const getProcessedProducts = (list) => {
    let filtered = list.map(item => ({
      ...item,
      priceNum: item.priceNum !== undefined ? item.priceNum : Number(String(item.price || "0").replace(/[^0-9]/g, ""))
    })).filter((item) => {
      const matchesSearch = searchQuery.trim() === "" || 
        item.title?.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        item.category?.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        item.fabric?.toLowerCase().includes(searchQuery.toLowerCase().trim());

      const matchesPrice = item.priceNum <= Number(priceFilter);

      const activeCategories = Object.keys(selectedCategories).filter((cat) => selectedCategories[cat]);
      const matchesCategory = activeCategories.length === 0 || 
        activeCategories.some((cat) => 
          item.category?.toLowerCase().includes(cat.toLowerCase()) || 
          item.fabric?.toLowerCase().includes(cat.toLowerCase())
        );

      return matchesSearch && matchesPrice && matchesCategory;
    });

    filtered.sort((a, b) => {
      if (sortBy === "Price: Low to High") {
        return a.priceNum - b.priceNum;
      } else if (sortBy === "Price: High to Low") {
        return b.priceNum - a.priceNum;
      } else {
        return 0;
      }
    });

    return filtered;
  };

  const allCombinedShawls = [...dbProducts];
  const allFullShawlsList = [...shawls, ...dbProducts];

  const displayedHomeShawls = getProcessedProducts(allCombinedShawls);
  const displayedAllShawls = getProcessedProducts(allFullShawlsList);

  const activeProductsList = showAllProducts ? displayedAllShawls : displayedHomeShawls;

  const totalPages = Math.ceil(activeProductsList.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = activeProductsList.slice(indexOfFirstProduct, indexOfLastProduct);

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

  const handleAddToCart = (product) => {
    checkAuthAndExecute(async () => {
      try {
        const response = await fetch("http://localhost:5000/api/shawls/cart/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: localStorage.getItem("userId"),
            productId: product.id,
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
    checkAuthAndExecute(async () => {
      const isWishlisted = wishlistProductIds.includes(String(product.id));
      const endpoint = isWishlisted ? "remove" : "add";

      try {
        const response = await fetch(
          `http://localhost:5000/api/shawls/${endpoint}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: localStorage.getItem("userId"),
              productId: product.id,
              title: product.title,
              description: product.description,
              price: product.price,
              originalPrice: product.originalPrice,
              discount: product.discount,
              image: product.image,
            }),
          }
        );

        if (response.ok) {
          if (isWishlisted) {
            toast.info(`${product.title} removed from wishlist`, { autoClose: 1000 });
            setWishlistProductIds((prev) => prev.filter((id) => id !== String(product.id)));
          } else {
            toast.success(`${product.title} added to wishlist ❤️`, { autoClose: 1000 });
            setWishlistProductIds((prev) => [...prev, String(product.id)]);
          }
          window.dispatchEvent(new Event("wishlistUpdated"));
        } else {
          toast.error("Failed to update wishlist");
        }
      } catch (err) {
        console.error("Error connecting to backend:", err);
        toast.error("Server connection failed");
      }
    });
  };

  const handleBuyNow = (product) => {
    checkAuthAndExecute(async () => {
      if (!cartProductIds.includes(String(product.id))) {
        try {
          await fetch("http://localhost:5000/api/shawls/cart/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: localStorage.getItem("userId"),
              productId: product.id,
              title: product.title,
              description: product.description,
              price: product.price,
              originalPrice: product.originalPrice,
              discount: product.discount,
              image: product.image,
              quantity: 1,
            }),
          });
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
    <div>
      <ToastContainer />

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
            <button className="btn btn-outline-light btn-sm px-3" onClick={handleDeclineCookies}>
              Decline
            </button>
            <button className="btn btn-warning btn-sm px-3 fw-bold text-dark" onClick={handleAcceptCookies}>
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
            <button className="Customer_close-btn" onClick={() => setShareProduct(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* HERO BANNER CAROUSEL */}
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
              className="Customer_hero-image w-100 flex-shrink-0"
              style={{ minWidth: "100%", objectFit: "cover", objectPosition: "top" }}
            />
          ))}
        </div>

        <div className="Customer_carousel-dots position-absolute bottom-0 start-50 translate-middle-x mb-3 d-flex gap-2">
          {bannerImages.map((_, index) => {
            const activeIndex = currentSlide % bannerImages.length;
            return (
              <button
                key={index}
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentSlide(index);
                }}
                className={`border-0 rounded-circle ${activeIndex === index ? "bg-warning" : "bg-white opacity-50"}`}
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

      <div className="container my-4 text-center">
        <div className="position-relative mx-auto" style={{ maxWidth: "600px" }}>
          <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted" style={{ pointerEvents: "none" }}>
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
        <h2
          className="Customer_luxury-title text-center fw-bold mb-4 fst-italic"
          style={{ color: "#9d6a0cc4" }}
        >
          Our Featured Shawls
        </h2>

        {/* IMAGE JAIRA TOP FILTERS & SORT BAR (Full Width Row) */}
        <div className="bg-white p-3 rounded shadow-sm border mb-4 d-flex flex-wrap justify-content-between align-items-center gap-3 position-relative">
          <span className="text-muted small fw-semibold">
            Showing {activeProductsList.length > 0 ? indexOfFirstProduct + 1 : 0}-
            {Math.min(indexOfLastProduct, activeProductsList.length)} of {activeProductsList.length} products
          </span>

          <div className="d-flex align-items-center gap-3">
            {/* Filter Toggle Button */}
            <div className="position-relative">
              <button
                className="btn btn-outline-dark btn-sm px-3 py-2 d-flex align-items-center gap-2"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                style={{ borderRadius: "8px" }}
              >
                <i className="bi bi-funnel"></i> Filters {Object.values(selectedCategories).some(Boolean) || priceFilter < 5000 ? "●" : ""}
              </button>

              {/* Popup Filter Menu (Image ke style jaisa) */}
              {isFilterOpen && (
                <div
                  className="position-absolute end-0 mt-2 bg-white p-3 rounded shadow border"
                  style={{ width: "260px", zIndex: 1000 }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
                    <span className="fw-bold small">Filter Options</span>
                    <span className="text-muted small" style={{ cursor: "pointer" }} onClick={handleClearAllFilters}>Clear All</span>
                  </div>

                  <div className="mb-3">
                    <label className="fw-bold small mb-1 d-block">Categories</label>
                    <div className="d-flex flex-column gap-1 small">
                      {["Pashmina", "Woolen", "Silk", "Cotton"].map((cat) => (
                        <div className="form-check" key={cat}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`filter-${cat}`}
                            checked={selectedCategories[cat]}
                            onChange={() => handleCategoryChange(cat)}
                          />
                          <label className="form-check-label" htmlFor={`filter-${cat}`}>{cat}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-2">
                    <label className="fw-bold small mb-1 d-block">Price Range: ₹{priceFilter}</label>
                    <input
                      type="range"
                      className="form-range"
                      min="500"
                      max="5000"
                      value={priceFilter}
                      onChange={(e) => setPriceFilter(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Sort Dropdown */}
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

        {/* 4 COLUMNS GRID PER ROW (col-lg-3 for 4 items in a single row) */}
        <div className="row g-4">
          {currentProducts.length > 0 ? (
            currentProducts.map((item) => {
              const productIdStr = String(item.id);
              const isInCart = cartProductIds.includes(productIdStr);
              const isWishlisted = wishlistProductIds.includes(productIdStr);

              return (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={productIdStr}>
                  <div
                    className="Customer_card h-100 border-0 shadow-sm d-flex flex-column justify-content-between p-2 position-relative"
                    style={{
                      backgroundColor: "#e4c893",
                      borderRadius: "16px",
                    }}
                  >
                    {/* IMAGE */}
                    <div className="Customer_product-image-box card overflow-hidden position-relative">
                      {item.discount && (
                        <span
                          className="badge bg-danger position-absolute top-0 start-0 m-2 px-2 py-1 shadow-sm fw-bold"
                          style={{ zIndex: 2, fontSize: "0.75rem", borderRadius: "6px" }}
                        >
                          {item.discount}
                        </span>
                      )}

                      <img
                        src={item.image}
                        className="card-img-top rounded Customer_product-image"
                        alt={item.title}
                      />

                      <button
                        className="Customer_share-btn"
                        onClick={() => handleShare(item)}
                        title="Share Product"
                      >
                        <FaShareAlt />
                      </button>

                      <button
                        className="Customer_wishlist-btn"
                        onClick={() => handleToggleWishlist(item)}
                        title="Wishlist Product"
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "50px",
                          background: "white",
                          border: "none",
                          borderRadius: "50%",
                          width: "35px",
                          height: "35px",
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

                    {/* CARD BODY */}
                    <div className="Customer_card-body px-2 py-3 d-flex flex-column justify-content-between">
                      <div>
                        <h6
                          className="fw-bold mb-1 text-dark"
                          style={{ fontSize: "0.95rem", lineHeight: "1.3" }}
                        >
                          {item.title}
                        </h6>

                        <p
                          className="text-muted small mb-2 Customer_text-truncate-2"
                          style={{ fontSize: "0.82rem", lineHeight: "1.4", minHeight: "2.6em" }}
                        >
                          {item.description}
                        </p>

                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <div className="d-flex align-items-center gap-2">
                            <span className="fw-bold fs-6 text-success">
                              {item.price}
                            </span>
                            {item.originalPrice && (
                              <span
                                className="text-decoration-line-through text-muted"
                                style={{ fontSize: "0.8rem" }}
                              >
                                {item.originalPrice}
                              </span>
                            )}
                          </div>

                          <span
                            className="badge bg-white text-secondary border fw-normal"
                            style={{ fontSize: "0.7rem" }}
                          >
                            {item.stock}
                          </span>
                        </div>
                      </div>

                      {/* BUTTONS */}
                      <div className="d-flex flex-column gap-2 mt-auto">
                        <div className="d-flex gap-2">
                          <button
                            onClick={() =>
                              navigate(`/product/${item.id}`, { state: { product: item } })
                            }
                            className="btn btn-outline-dark btn-sm w-50 fw-semibold"
                            style={{ borderRadius: "8px" }}
                          >
                            View
                          </button>

                          {isInCart ? (
                            <button
                              onClick={() => navigate("/cart")}
                              className="btn btn-sm w-50 fw-semibold text-white"
                              style={{ backgroundColor: "#2b8a3e", border: "none", borderRadius: "8px" }}
                            >
                              Go to Cart ➔
                            </button>
                          ) : (
                            <button
                              onClick={() => handleAddToCart(item)}
                              className="btn btn-dark btn-sm w-50 fw-semibold text-white"
                              style={{ backgroundColor: "#166228", border: "none", borderRadius: "8px" }}
                            >
                              Add to Cart
                            </button>
                          )}
                        </div>

                        <button
                          onClick={() => handleBuyNow(item)}
                          className="btn btn-sm w-100 fw-bold text-white border-0 shadow-sm"
                          style={{
                            background: "linear-gradient(135deg, #d6bd69 0%, #dfa00b 100%)",
                            borderRadius: "8px",
                          }}
                        >
                          ⚡ Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-12 text-center py-5">
              <p className="text-muted fs-5">No products found matching your search or filters.</p>
            </div>
          )}
        </div>

        {/* PAGINATION CONTROLS */}
        {totalPages > 1 && (
          <nav className="d-flex justify-content-center mt-4">
            <ul className="pagination shadow-sm">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                  Previous
                </button>
              </li>

              {[...Array(totalPages)].map((_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(index + 1)}
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

        {/* VIEW ALL PRODUCTS TOGGLE BUTTON */}
        <div className="text-center mt-4">
          <button
            className="btn btn-outline-secondary btn-sm px-4 py-2 fw-semibold"
            onClick={() => setShowAllProducts((prev) => !prev)}
            style={{ borderRadius: "20px" }}
          >
            {showAllProducts ? "Show Featured Shawls Only" : "View All Products ➔"}
          </button>
        </div>
        {/* EXPLORE CATEGORY BUTTONS */}
        <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
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
      </div>
    </div>
  );
}

export default Home;