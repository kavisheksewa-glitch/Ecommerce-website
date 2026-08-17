// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaShareAlt, FaLink, FaHeart, FaStar, FaGift, FaShippingFast, FaUndo, FaCommentAlt } from "react-icons/fa";
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
// //import "./Featuredcol.css";
// import "../Featured/Featuredcol.css";
// import birthdayBgImage from "../../assets/image1.png";
// //import birthdayBgImage from "../assets/image1.png";
// import { BirthdayShawls } from "../../data/shawls"; // Importing the LuxuryShawls array


// function BirthdayGifts() {
//   const navigate = useNavigate();
//   const [shareProduct, setShareProduct] = useState(null);
//   const [cartProductIds, setCartProductIds] = useState([]);
//   const [birthdayGifts, setBirthdayGifts] = useState([...BirthdayShawls]); 
//   const [wishlistProductIds, setWishlistProductIds] = useState([]);
//   const [priceFilter, setPriceFilter] = useState(8000);
  
//   // State for mobile filter dropdown toggle
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

//   const userId = localStorage.getItem("userId") || "guest_user_id";

//   useEffect(() => {
//     // 1. Fetch Database Products and Merge with Static birthdayShawls
//     axios.get("http://localhost:5000/api/seller/products/public")
//       .then((res) => {
//         if (Array.isArray(res.data)) {
//           const dbProducts = res.data
//             .filter((p) => p.category === "BirthdayGift Shawls")
//             .map((p) => ({
//               id: p._id,
//               title: p.productName,
//               description: p.description,
//               price: `₹${p.price}`,
//               originalPrice: p.discount ? `₹${Math.round(p.price * (1 + p.discount / 100))}` : "",
//               discount: p.discount ? `${p.discount}% OFF` : null,
//               image: `http://localhost:5000/${p.productImage}`,
//               stock: `Stock: ${p.stockQuantity}`,
//               fabric: p.fabric || "N/A",
//               color: p.color || "N/A",
//               size: p.size || "N/A",
//               careInstructions: p.washCare || "N/A",
//               rating: 5,
//               reviews: 18,
//             }));

//           setBirthdayGifts([...BirthdayShawls, ...dbProducts]);
//         }
//       })
//       .catch((err) => console.error("Error fetching live birthday products:", err));

//     // 2. Fetch Cart Items
//     fetch(`http://localhost:5000/api/shawls/cart/${userId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (Array.isArray(data)) {
//           const ids = data.map((item) => String(item.productId));
//           setCartProductIds(ids);
//         }
//       })
//       .catch((err) => console.error("Error fetching cart items:", err));

//     // 3. Fetch Wishlist Items
//     const fetchWishlist = () => {
//       fetch(`http://localhost:5000/api/shawls/${userId}`)
//         .then((res) => res.json())
//         .then((data) => {
//           if (Array.isArray(data)) {
//             const ids = data.map((item) => String(item.productId));
//             setWishlistProductIds(ids);
//           }
//         })
//         .catch((err) => console.error("Error fetching wishlist:", err));
//     };

//     fetchWishlist();
//     window.addEventListener("wishlistUpdated", fetchWishlist);
//     return () => window.removeEventListener("wishlistUpdated", fetchWishlist);
//   }, [userId]);

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

//   const handleAddToCart = async (product) => {
//     try {
//       const response = await fetch("http://localhost:5000/api/shawls/cart/add", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: userId,
//           productId: product.id,
//           title: product.title,
//           description: product.description,
//           price: product.price,
//           originalPrice: product.originalPrice || "",
//           discount: product.discount || "",
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

//   const handleToggleWishlist = async (product) => {
//     const isWishlisted = wishlistProductIds.includes(String(product.id));
//     const endpoint = isWishlisted ? "remove" : "add";

//     try {
//       const response = await fetch(`http://localhost:5000/api/shawls/${endpoint}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: userId,
//           productId: product.id,
//           title: product.title,
//           description: product.description,
//           price: product.price,
//           originalPrice: product.originalPrice || "",
//           discount: product.discount || "",
//           image: product.image,
//         }),
//       });

//       if (response.ok) {
//         if (isWishlisted) {
//           toast.info(`${product.title} removed from wishlist`, { autoClose: 1000 });
//           setWishlistProductIds((prev) => prev.filter((id) => id !== String(product.id)));
//         } else {
//           toast.success(`${product.title} added to wishlist ❤️`, { autoClose: 1000 });
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

//   const handleBuyNow = async (product) => {
//     if (!cartProductIds.includes(String(product.id))) {
//       await handleAddToCart(product);
//     }
//     navigate("/checkout", { state: { product } });
//   };

//   return (
//     <div className="Customer_container1 bg-light pb-5">
//       <ToastContainer />

//       {/* Share Modal */}
//       {shareProduct && (
//         <div className="Customer_share-overlay" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", justifyContent: "center", alignItems: "center" }}>
//           <div className="Customer_share-modal bg-white p-4 rounded shadow text-center" style={{ width: "320px" }}>
//             <h4 className="fw-bold mb-1">Share Product</h4>
//             <p className="text-muted small">{shareProduct.title}</p>
//             <div className="Customer_share-icons d-flex justify-content-center gap-3 my-3">
//               <WhatsappShareButton url={`${window.location.origin}/product/${shareProduct.id}`}><WhatsappIcon size={42} round /></WhatsappShareButton>
//               <FacebookShareButton url={`${window.location.origin}/product/${shareProduct.id}`}><FacebookIcon size={42} round /></FacebookShareButton>
//               <TwitterShareButton url={`${window.location.origin}/product/${shareProduct.id}`}><TwitterIcon size={42} round /></TwitterShareButton>
//               <EmailShareButton url={`${window.location.origin}/product/${shareProduct.id}`}><EmailIcon size={42} round /></EmailShareButton>
//             </div>
//             <button className="btn btn-dark mb-2 btn-sm w-100" onClick={copyLink}><FaLink className="me-2" /> Copy Link</button>
//             <button className="btn btn-outline-secondary btn-sm w-100" onClick={() => setShareProduct(null)}>Close</button>
//           </div>
//         </div>
//       )}

//       {/* Top Banner Box */}
//       <div className="mb-4">
//         <div 
//           className="p-4 p-md-5 text-white rounded position-relative overflow-hidden d-flex align-items-center justify-content-between shadow-sm Customer_luxury-banner" 
//           style={{ 
//             backgroundImage: `url(${birthdayBgImage})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             minHeight: "260px"
//           }}
//         >
//           <div style={{ maxWidth: "600px", zIndex: 2 }}>
//             <h1 className="fw-bold display-6 fst-italic" style={{ color: "#f3e5ab" }}>Birthday Gift Sets</h1>
//             <p className="text-light opacity-95 small mb-3">
//               Exclusive gift boxes with premium packaging designed for your special loved ones. Give the ultimate experience of sophistication and warmth.
//             </p>
//             <button className="btn btn-sm px-4 py-2 fw-bold shadow-sm" style={{ backgroundColor: "#f3e5ab", color: "#064e3b", borderRadius: "6px" }}>
//               Explore Collection
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Layout with Custom React State Filter Dropdown */}
//       <div className="container-fluid">
//         <div className="row">
          
//           {/* Left Sidebar Filters */}
//           <div className="col-lg-3 mb-4">
//             {/* Mobile Toggle Button */}
//             <div className="d-block d-lg-none mb-2">
//               <button 
//                 className="btn w-100 d-flex justify-content-between align-items-center py-2 text-white" 
//                 style={{ backgroundColor: "#050e0c" }}
//                 type="button" 
//                 onClick={() => setIsFilterOpen(!isFilterOpen)}
//               >
//                 <span>🔍 Filter Birthday Products</span>
//                 <span>{isFilterOpen ? "▲" : "▼"}</span>
//               </button>
//             </div>

//             {/* Filter Content: Hidden on mobile unless toggled, Always visible on Laptop */}
//             <div className={`bg-white p-3 rounded shadow-sm border ${!isFilterOpen ? "d-none d-lg-block" : "d-block"}`}>
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h6 className="fw-bold mb-0">Filters</h6>
//                 <span className="text-muted small" style={{ cursor: "pointer" }} onClick={() => setPriceFilter(8000)}>Clear All</span>
//               </div>

//               {/* Category */}
//               <div className="mb-3 border-bottom pb-3">
//                 <label className="fw-bold small mb-2 d-block">Category</label>
//                 <div className="form-check small mb-1"><input className="form-check-input" type="checkbox" defaultChecked /><label className="form-check-label">Birthday Hampers</label></div>
//                 <div className="form-check small"><input className="form-check-input" type="checkbox" /><label className="form-check-label">Signature Sets</label></div>
//               </div>

//               {/* Price Range */}
//               <div className="mb-3 border-bottom pb-3">
//                 <label className="fw-bold small mb-2 d-block">Price Range</label>
//                 <input type="range" className="form-range" min="3000" max="8000" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} />
//                 <div className="d-flex justify-content-between text-muted small">
//                   <span>₹3000</span>
//                   <span>₹{priceFilter}</span>
//                 </div>
//               </div>

//               {/* Material Filter */}
//               <div>
//                 <label className="fw-bold small mb-2 d-block">Material</label>
//                 <div className="d-flex flex-column gap-1 small">
//                   <div className="form-check"><input className="form-check-input" type="checkbox" /><label className="form-check-label">Pashmina</label></div>
//                   <div className="form-check"><input className="form-check-input" type="checkbox" /><label className="form-check-label">Wool</label></div>
//                   <div className="form-check"><input className="form-check-input" type="checkbox" /><label className="form-check-label">Silk Blend</label></div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Product Grid */}
//           <div className="col-lg-9">
//             <div className="d-flex justify-content-between align-items-center mb-3 bg-white p-2 px-3 rounded shadow-sm border">
//               <span className="text-muted small">Showing 1–{birthdayGifts.length} products</span>
//               <select className="form-select form-select-sm w-auto">
//                 <option>Sort By: Newest First</option>
//                 <option>Price: Low to High</option>
//                 <option>Price: High to Low</option>
//               </select>
//             </div>

//             <div className="row g-3">
//               {birthdayGifts.map((item) => {
//                 const productIdStr = String(item.id);
//                 const isInCart = cartProductIds.includes(productIdStr);
//                 const isWishlisted = wishlistProductIds.includes(productIdStr);

//                 return (
//                   <div className="col-12 col-sm-6 col-md-4" key={productIdStr}>
//                     <div className="Customer_card card h-100 border-0 shadow-sm d-flex flex-column justify-content-between p-2 position-relative" style={{ backgroundColor: "#fff", borderRadius: "12px" }}>
                      
//                       <div className="Customer_product-image-box overflow-hidden position-relative">
//                         {item.discount && (
//                           <span className="badge bg-danger position-absolute top-0 start-0 m-2 px-2 py-1 shadow-sm fw-bold" style={{ zIndex: 2, fontSize: "0.7rem", borderRadius: "4px" }}>
//                             {item.discount}
//                           </span>
//                         )}

//                         <img src={item.image} className="card-img-top rounded Customer_product-image" alt={item.title} style={{ height: "220px", objectFit: "cover" }} />
                        
//                         {/* Share Button */}
//                         <button className="Customer_share-btn" onClick={() => setShareProduct(item)} title="Share Product">
//                           <FaShareAlt />
//                         </button>

//                         {/* Wishlist Button */}
//                         <button
//                           className="Customer_wishlist-btn"
//                           onClick={() => handleToggleWishlist(item)}
//                           title="Wishlist Product"
//                           style={{
//                             position: "absolute",
//                             top: "10px",
//                             right: "50px",
//                             background: "white",
//                             border: "none",
//                             borderRadius: "50%",
//                             width: "35px",
//                             height: "35px",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             cursor: "pointer",
//                             boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
//                             color: isWishlisted ? "red" : "#ccc",
//                             transition: "color 0.2s ease",
//                             zIndex: 2,
//                           }}
//                         >
//                           <FaHeart />
//                         </button>
//                       </div>

//                       <div className="card-body px-2 py-2 d-flex flex-column justify-content-between">
//                         <div>
//                           <h6 className="fw-bold mb-1 text-dark" style={{ fontSize: "0.9rem" }}>{item.title}</h6>
//                           <div className="text-warning small mb-1" style={{ fontSize: "0.75rem" }}>
//                             {[...Array(item.rating || 5)].map((_, i) => (<FaStar key={i} />))}
//                             <span className="text-muted ms-1">({item.reviews || 16})</span>
//                           </div>
//                           <p className="text-muted small mb-2" style={{ fontSize: "0.78rem", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
//                             {item.description}
//                           </p>
//                           <div className="d-flex align-items-center gap-2 mb-2">
//                             <span className="fw-bold fs-6 text-success">{item.price}</span>
//                             {item.originalPrice && <span className="text-decoration-line-through text-muted small" style={{ fontSize: "0.75rem" }}>{item.originalPrice}</span>}
//                           </div>
//                         </div>

//                         <div className="d-flex flex-column gap-1 mt-auto">
//                           <div className="d-flex gap-1">
//                             <button onClick={() => navigate(`/product/${item.id}`, { state: { product: item } })} className="btn btn-outline-dark btn-sm w-50 fw-semibold" style={{ fontSize: "0.75rem", borderRadius: "6px" }}>
//                               View Details
//                             </button>
//                             {isInCart ? (
//                               <button onClick={() => navigate("/cart")} className="btn btn-sm w-50 fw-semibold text-white" style={{ fontSize: "0.75rem", backgroundColor: "#2b8a3e", border: "none", borderRadius: "6px" }}>
//                                 Go to Cart
//                               </button>
//                             ) : (
//                               <button onClick={() => handleAddToCart(item)} className="btn btn-dark btn-sm w-50 fw-semibold text-white" style={{ fontSize: "0.75rem", backgroundColor: "#064e3b", border: "none", borderRadius: "6px" }}>
//                                 Add to Cart
//                               </button>
//                             )}
//                           </div>
//                           <button onClick={() => handleBuyNow(item)} className="btn btn-sm w-100 fw-bold text-white border-0 shadow-sm" style={{ fontSize: "0.8rem", background: "linear-gradient(135deg, #d6bd69 0%, #dfa00b 100%)", borderRadius: "6px" }}>
//                             ⚡ Buy Now
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* Feature Strip Banner */}
//       <div className="container my-5">
//         <div className="bg-white p-3 rounded shadow-sm border d-flex flex-wrap justify-content-around text-center gap-3">
//           <div className="d-flex align-items-center gap-2">
//             <FaGift className="fs-3" style={{ color: "#064e3b" }} />
//             <div className="text-start">
//               <h6 className="fw-bold mb-0 small">Signature Gift Chest</h6>
//               <small className="text-muted" style={{ fontSize: "0.7rem" }}>Handcrafted rigid gift cases</small>
//             </div>
//           </div>
//           <div className="d-flex align-items-center gap-2">
//             <FaCommentAlt className="fs-3" style={{ color: "#064e3b" }} />
//             <div className="text-start">
//               <h6 className="fw-bold mb-0 small">Personalized Note Card</h6>
//               <small className="text-muted" style={{ fontSize: "0.7rem" }}>Handwritten gold-foil message</small>
//             </div>
//           </div>
//           <div className="d-flex align-items-center gap-2">
//             <FaShippingFast className="fs-3" style={{ color: "#064e3b" }} />
//             <div className="text-start">
//               <h6 className="fw-bold mb-0 small">Insured Priority Shipping</h6>
//               <small className="text-muted" style={{ fontSize: "0.7rem" }}>Safe & secure transit</small>
//             </div>
//           </div>
//           <div className="d-flex align-items-center gap-2">
//             <FaUndo className="fs-3" style={{ color: "#064e3b" }} />
//             <div className="text-start">
//               <h6 className="fw-bold mb-0 small">Easy 7-Day Return</h6>
//               <small className="text-muted" style={{ fontSize: "0.7rem" }}>Hassle-free return policy</small>
//             </div>
//           </div>
//         </div>
//       </div>

      
//     </div>
//   );
// }

// export default BirthdayGifts;



















// neww




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaShareAlt, FaLink, FaHeart, FaStar, FaGift, FaShippingFast, FaUndo, FaCommentAlt } from "react-icons/fa";
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
// import "../Featured/Featuredcol.css";
// import birthdayBgImage from "../../assets/image1.png";
// import { BirthdayShawls } from "../../data/shawls"; 


// function BirthdayGifts() {
//   const navigate = useNavigate();
//   const [shareProduct, setShareProduct] = useState(null);
//   const [cartProductIds, setCartProductIds] = useState([]);
//   const [birthdayGifts, setBirthdayGifts] = useState([...BirthdayShawls]); 
//   const [wishlistProductIds, setWishlistProductIds] = useState([]);
//   const [priceFilter, setPriceFilter] = useState(8000);
//   const [searchQuery, setSearchQuery] = useState("");
  
//   // State for mobile filter dropdown toggle
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

//   const userId = localStorage.getItem("userId") || "guest_user_id";

//   useEffect(() => {
//     // 1. Fetch Database Products and Merge with Static birthdayShawls
//     axios.get("http://localhost:5000/api/seller/products/public")
//       .then((res) => {
//         if (Array.isArray(res.data)) {
//           const dbProducts = res.data
//             .filter((p) => p.category === "BirthdayGift Shawls")
//             .map((p) => ({
//               id: p._id,
//               title: p.productName,
//               description: p.description,
//               price: `₹${p.price}`,
//               originalPrice: p.discount ? `₹${Math.round(p.price * (1 + p.discount / 100))}` : "",
//               discount: p.discount ? `${p.discount}% OFF` : null,
//               image: `http://localhost:5000/${p.productImage}`,
//               stock: `Stock: ${p.stockQuantity}`,
//               fabric: p.fabric || "N/A",
//               color: p.color || "N/A",
//               size: p.size || "N/A",
//               careInstructions: p.washCare || "N/A",
//               rating: 5,
//               reviews: 18,
//             }));

//           setBirthdayGifts([...BirthdayShawls, ...dbProducts]);
//         }
//       })
//       .catch((err) => console.error("Error fetching live birthday products:", err));

//     // 2. Fetch Cart Items
//     fetch(`http://localhost:5000/api/shawls/cart/${userId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (Array.isArray(data)) {
//           const ids = data.map((item) => String(item.productId));
//           setCartProductIds(ids);
//         }
//       })
//       .catch((err) => console.error("Error fetching cart items:", err));

//     // 3. Fetch Wishlist Items
//     const fetchWishlist = () => {
//       fetch(`http://localhost:5000/api/shawls/${userId}`)
//         .then((res) => res.json())
//         .then((data) => {
//           if (Array.isArray(data)) {
//             const ids = data.map((item) => String(item.productId));
//             setWishlistProductIds(ids);
//           }
//         })
//         .catch((err) => console.error("Error fetching wishlist:", err));
//     };

//     fetchWishlist();
//     window.addEventListener("wishlistUpdated", fetchWishlist);
//     return () => window.removeEventListener("wishlistUpdated", fetchWishlist);
//   }, [userId]);

//   // SEARCH FILTER LOGIC
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

//     return sorted.filter((item) =>
//       item.title?.toLowerCase().includes(query)
//     );
//   };

//   const displayedGifts = getProcessedProducts(birthdayGifts);

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

//   const handleAddToCart = async (product) => {
//     try {
//       const response = await fetch("http://localhost:5000/api/shawls/cart/add", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: userId,
//           productId: product.id,
//           title: product.title,
//           description: product.description,
//           price: product.price,
//           originalPrice: product.originalPrice || "",
//           discount: product.discount || "",
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

//   const handleToggleWishlist = async (product) => {
//     const isWishlisted = wishlistProductIds.includes(String(product.id));
//     const endpoint = isWishlisted ? "remove" : "add";

//     try {
//       const response = await fetch(`http://localhost:5000/api/shawls/${endpoint}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: userId,
//           productId: product.id,
//           title: product.title,
//           description: product.description,
//           price: product.price,
//           originalPrice: product.originalPrice || "",
//           discount: product.discount || "",
//           image: product.image,
//         }),
//       });

//       if (response.ok) {
//         if (isWishlisted) {
//           toast.info(`${product.title} removed from wishlist`, { autoClose: 1000 });
//           setWishlistProductIds((prev) => prev.filter((id) => id !== String(product.id)));
//         } else {
//           toast.success(`${product.title} added to wishlist ❤️`, { autoClose: 1000 });
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

//   const handleBuyNow = async (product) => {
//     if (!cartProductIds.includes(String(product.id))) {
//       await handleAddToCart(product);
//     }
//     navigate("/checkout", { state: { product } });
//   };

//   return (
//     <div className="Customer_container1 bg-light pb-5">
//       <ToastContainer />

//       {/* Share Modal */}
//       {shareProduct && (
//         <div className="Customer_share-overlay" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", justifyContent: "center", alignItems: "center" }}>
//           <div className="Customer_share-modal bg-white p-4 rounded shadow text-center" style={{ width: "320px" }}>
//             <h4 className="fw-bold mb-1">Share Product</h4>
//             <p className="text-muted small">{shareProduct.title}</p>
//             <div className="Customer_share-icons d-flex justify-content-center gap-3 my-3">
//               <WhatsappShareButton url={`${window.location.origin}/product/${shareProduct.id}`}><WhatsappIcon size={42} round /></WhatsappShareButton>
//               <FacebookShareButton url={`${window.location.origin}/product/${shareProduct.id}`}><FacebookIcon size={42} round /></FacebookShareButton>
//               <TwitterShareButton url={`${window.location.origin}/product/${shareProduct.id}`}><TwitterIcon size={42} round /></TwitterShareButton>
//               <EmailShareButton url={`${window.location.origin}/product/${shareProduct.id}`}><EmailIcon size={42} round /></EmailShareButton>
//             </div>
//             <button className="btn btn-dark mb-2 btn-sm w-100" onClick={copyLink}><FaLink className="me-2" /> Copy Link</button>
//             <button className="btn btn-outline-secondary btn-sm w-100" onClick={() => setShareProduct(null)}>Close</button>
//           </div>
//         </div>
//       )}


//       <div className="container my-3 text-center">
//         <div className="position-relative mx-auto" style={{ maxWidth: "600px" }}>
//           <span
//             className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted"
//             style={{ pointerEvents: "none" }}
//           >
//             <i className="bi bi-search"></i>
//           </span>

//           <input
//             type="text"
//             placeholder="Search birthday gift shawls..."
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

//       {/* Top Banner Box */}
//       <div className="mb-4">
//         <div 
//           className="p-4 p-md-5 text-white rounded position-relative overflow-hidden d-flex align-items-center justify-content-between shadow-sm Customer_luxury-banner" 
//           style={{ 
//             backgroundImage: `url(${birthdayBgImage})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             minHeight: "260px"
//           }}
//         >
//           <div style={{ maxWidth: "600px", zIndex: 2 }}>
//             <h1 className="fw-bold display-6 fst-italic" style={{ color: "#f3e5ab" }}>Birthday Gift Sets</h1>
//             <p className="text-light opacity-95 small mb-3">
//               Exclusive gift boxes with premium packaging designed for your special loved ones. Give the ultimate experience of sophistication and warmth.
//             </p>
//             <button onClick={() => navigate("/customer")} className="btn btn-sm px-4 py-2 fw-bold shadow-sm" style={{ backgroundColor: "#f3e5ab", color: "#064e3b", borderRadius: "6px" }}>
//               Explore Collection
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* SEARCH BAR SECTION WITH ICON */}
//       {/* <div className="container my-3 text-center">
//         <div className="position-relative mx-auto" style={{ maxWidth: "600px" }}>
//           <span
//             className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted"
//             style={{ pointerEvents: "none" }}
//           >
//             <i className="bi bi-search"></i>
//           </span>

//           <input
//             type="text"
//             placeholder="Search birthday gift shawls..."
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
//       </div> */}

//       {/* Main Layout with Custom React State Filter Dropdown */}
//       <div className="container-fluid">
//         <div className="row">
          
//           {/* Left Sidebar Filters */}
//           <div className="col-lg-3 mb-4">
//             {/* Mobile Toggle Button */}
//             <div className="d-block d-lg-none mb-2">
//               <button 
//                 className="btn w-100 d-flex justify-content-between align-items-center py-2 text-white" 
//                 style={{ backgroundColor: "#050e0c" }}
//                 type="button" 
//                 onClick={() => setIsFilterOpen(!isFilterOpen)}
//               >
//                 <span>🔍 Filter Birthday Products</span>
//                 <span>{isFilterOpen ? "▲" : "▼"}</span>
//               </button>
//             </div>

//             {/* Filter Content: Hidden on mobile unless toggled, Always visible on Laptop */}
//             <div className={`bg-white p-3 rounded shadow-sm border ${!isFilterOpen ? "d-none d-lg-block" : "d-block"}`}>
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h6 className="fw-bold mb-0">Filters</h6>
//                 <span className="text-muted small" style={{ cursor: "pointer" }} onClick={() => setPriceFilter(8000)}>Clear All</span>
//               </div>

//               {/* Category */}
//               <div className="mb-3 border-bottom pb-3">
//                 <label className="fw-bold small mb-2 d-block">Category</label>
//                 <div className="form-check small mb-1"><input className="form-check-input" type="checkbox" defaultChecked /><label className="form-check-label">Birthday Hampers</label></div>
//                 <div className="form-check small"><input className="form-check-input" type="checkbox" /><label className="form-check-label">Signature Sets</label></div>
//               </div>

//               {/* Price Range */}
//               <div className="mb-3 border-bottom pb-3">
//                 <label className="fw-bold small mb-2 d-block">Price Range</label>
//                 <input type="range" className="form-range" min="3000" max="8000" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} />
//                 <div className="d-flex justify-content-between text-muted small">
//                   <span>₹3000</span>
//                   <span>₹{priceFilter}</span>
//                 </div>
//               </div>

//               {/* Material Filter */}
//               <div>
//                 <label className="fw-bold small mb-2 d-block">Material</label>
//                 <div className="d-flex flex-column gap-1 small">
//                   <div className="form-check"><input className="form-check-input" type="checkbox" /><label className="form-check-label">Pashmina</label></div>
//                   <div className="form-check"><input className="form-check-input" type="checkbox" /><label className="form-check-label">Wool</label></div>
//                   <div className="form-check"><input className="form-check-input" type="checkbox" /><label className="form-check-label">Silk Blend</label></div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Product Grid */}
//           <div className="col-lg-9">
//             <div className="d-flex justify-content-between align-items-center mb-3 bg-white p-2 px-3 rounded shadow-sm border">
//               <span className="text-muted small">Showing 1–{displayedGifts.length} products</span>
//               <select className="form-select form-select-sm w-auto">
//                 <option>Sort By: Newest First</option>
//                 <option>Price: Low to High</option>
//                 <option>Price: High to Low</option>
//               </select>
//             </div>

//             <div className="row g-3">
//               {displayedGifts.length > 0 ? (
//                 displayedGifts.map((item) => {
//                   const productIdStr = String(item.id);
//                   const isInCart = cartProductIds.includes(productIdStr);
//                   const isWishlisted = wishlistProductIds.includes(productIdStr);

//                   return (
//                     <div className="col-12 col-sm-6 col-md-4" key={productIdStr}>
//                       <div className="Customer_card card h-100 border-0 shadow-sm d-flex flex-column justify-content-between p-2 position-relative" style={{ backgroundColor: "#fff", borderRadius: "12px" }}>
                        
//                         <div className="Customer_product-image-box overflow-hidden position-relative">
//                           {item.discount && (
//                             <span className="badge bg-danger position-absolute top-0 start-0 m-2 px-2 py-1 shadow-sm fw-bold" style={{ zIndex: 2, fontSize: "0.7rem", borderRadius: "4px" }}>
//                               {item.discount}
//                             </span>
//                           )}

//                           <img src={item.image} className="card-img-top rounded Customer_product-image" alt={item.title} style={{ height: "220px", objectFit: "cover" }} />
                          
//                           {/* Share Button */}
//                           <button className="Customer_share-btn" onClick={() => setShareProduct(item)} title="Share Product">
//                             <FaShareAlt />
//                           </button>

//                           {/* Wishlist Button */}
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

//                         <div className="card-body px-2 py-2 d-flex flex-column justify-content-between">
//                           <div>
//                             <h6 className="fw-bold mb-1 text-dark" style={{ fontSize: "0.9rem" }}>{item.title}</h6>
//                             <div className="text-warning small mb-1" style={{ fontSize: "0.75rem" }}>
//                               {[...Array(item.rating || 5)].map((_, i) => (<FaStar key={i} />))}
//                               <span className="text-muted ms-1">({item.reviews || 16})</span>
//                             </div>
//                             <p className="text-muted small mb-2" style={{ fontSize: "0.78rem", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
//                               {item.description}
//                             </p>
//                             <div className="d-flex align-items-center gap-2 mb-2">
//                               <span className="fw-bold fs-6 text-success">{item.price}</span>
//                               {item.originalPrice && <span className="text-decoration-line-through text-muted small" style={{ fontSize: "0.75rem" }}>{item.originalPrice}</span>}
//                             </div>
//                           </div>

//                           <div className="d-flex flex-column gap-1 mt-auto">
//                             <div className="d-flex gap-1">
//                               <button onClick={() => navigate(`/product/${item.id}`, { state: { product: item } })} className="btn btn-outline-dark btn-sm w-50 fw-semibold" style={{ fontSize: "0.75rem", borderRadius: "6px" }}>
//                                 View Details
//                               </button>
//                               {isInCart ? (
//                                 <button onClick={() => navigate("/cart")} className="btn btn-sm w-50 fw-semibold text-white" style={{ fontSize: "0.75rem", backgroundColor: "#2b8a3e", border: "none", borderRadius: "6px" }}>
//                                   Go to Cart
//                                 </button>
//                               ) : (
//                                 <button onClick={() => handleAddToCart(item)} className="btn btn-dark btn-sm w-50 fw-semibold text-white" style={{ fontSize: "0.75rem", backgroundColor: "#064e3b", border: "none", borderRadius: "6px" }}>
//                                   Add to Cart
//                                 </button>
//                               )}
//                             </div>
//                             <button onClick={() => handleBuyNow(item)} className="btn btn-sm w-100 fw-bold text-white border-0 shadow-sm" style={{ fontSize: "0.8rem", background: "linear-gradient(135deg, #d6bd69 0%, #dfa00b 100%)", borderRadius: "6px" }}>
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
//                   <p className="text-muted fs-5">No birthday gift sets found matching your search.</p>
//                 </div>
//               )}
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* Feature Strip Banner */}
//       <div className="container my-5">
//         <div className="bg-white p-3 rounded shadow-sm border d-flex flex-wrap justify-content-around text-center gap-3">
//           <div className="d-flex align-items-center gap-2">
//             <FaGift className="fs-3" style={{ color: "#064e3b" }} />
//             <div className="text-start">
//               <h6 className="fw-bold mb-0 small">Signature Gift Chest</h6>
//               <small className="text-muted" style={{ fontSize: "0.7rem" }}>Handcrafted rigid gift cases</small>
//             </div>
//           </div>
//           <div className="d-flex align-items-center gap-2">
//             <FaCommentAlt className="fs-3" style={{ color: "#064e3b" }} />
//             <div className="text-start">
//               <h6 className="fw-bold mb-0 small">Personalized Note Card</h6>
//               <small className="text-muted" style={{ fontSize: "0.7rem" }}>Handwritten gold-foil message</small>
//             </div>
//           </div>
//           <div className="d-flex align-items-center gap-2">
//             <FaShippingFast className="fs-3" style={{ color: "#064e3b" }} />
//             <div className="text-start">
//               <h6 className="fw-bold mb-0 small">Insured Priority Shipping</h6>
//               <small className="text-muted" style={{ fontSize: "0.7rem" }}>Safe & secure transit</small>
//             </div>
//           </div>
//           <div className="d-flex align-items-center gap-2">
//             <FaUndo className="fs-3" style={{ color: "#064e3b" }} />
//             <div className="text-start">
//               <h6 className="fw-bold mb-0 small">Easy 7-Day Return</h6>
//               <small className="text-muted" style={{ fontSize: "0.7rem" }}>Hassle-free return policy</small>
//             </div>
//           </div>
//         </div>
//       </div>
      
//     </div>
//   );
// }

// export default BirthdayGifts;





// newwwwwwwwwww











// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaShareAlt, FaLink, FaHeart, FaStar, FaGift, FaShippingFast, FaUndo, FaCommentAlt } from "react-icons/fa";
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
// import "../Featured/Featuredcol.css";
// import birthdayBgImage from "../../assets/image1.png";
// import { BirthdayShawls } from "../../data/shawls"; 


// function BirthdayGifts() {
//   const navigate = useNavigate();
//   const [shareProduct, setShareProduct] = useState(null);
//   const [cartProductIds, setCartProductIds] = useState([]);
//   const [birthdayGifts, setBirthdayGifts] = useState([...BirthdayShawls]); 
//   const [wishlistProductIds, setWishlistProductIds] = useState([]);
//   const [priceFilter, setPriceFilter] = useState(8000);
//   const [searchQuery, setSearchQuery] = useState("");
  
//   // State for mobile filter dropdown toggle
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

//   const userId = localStorage.getItem("userId") || "guest_user_id";

//   useEffect(() => {
//     // 1. Fetch Database Products and Merge with Static birthdayShawls
//     axios.get("http://localhost:5000/api/seller/products/public")
//       .then((res) => {
//         if (Array.isArray(res.data)) {
//           const dbProducts = res.data
//             .filter((p) => p.category === "BirthdayGift Shawls")
//             .map((p) => ({
//               id: p._id,
//               title: p.productName,
//               description: p.description,
//               price: `₹${p.price}`,
//               originalPrice: p.discount ? `₹${Math.round(p.price * (1 + p.discount / 100))}` : "",
//               discount: p.discount ? `${p.discount}% OFF` : null,
//               image: `http://localhost:5000/${p.productImage}`,
//               stock: `Stock: ${p.stockQuantity}`,
//               fabric: p.fabric || "N/A",
//               color: p.color || "N/A",
//               size: p.size || "N/A",
//               careInstructions: p.washCare || "N/A",
//               rating: 5,
//               reviews: 18,
//             }));

//           setBirthdayGifts([...BirthdayShawls, ...dbProducts]);
//         }
//       })
//       .catch((err) => console.error("Error fetching live birthday products:", err));

//     // 2. Fetch Cart Items
//     fetch(`http://localhost:5000/api/shawls/cart/${userId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (Array.isArray(data)) {
//           const ids = data.map((item) => String(item.productId));
//           setCartProductIds(ids);
//         }
//       })
//       .catch((err) => console.error("Error fetching cart items:", err));

//     // 3. Fetch Wishlist Items
//     const fetchWishlist = () => {
//       fetch(`http://localhost:5000/api/shawls/${userId}`)
//         .then((res) => res.json())
//         .then((data) => {
//           if (Array.isArray(data)) {
//             const ids = data.map((item) => String(item.productId));
//             setWishlistProductIds(ids);
//           }
//         })
//         .catch((err) => console.error("Error fetching wishlist:", err));
//     };

//     fetchWishlist();
//     window.addEventListener("wishlistUpdated", fetchWishlist);
//     return () => window.removeEventListener("wishlistUpdated", fetchWishlist);
//   }, [userId]);

//   // SEARCH & PRICE FILTER LOGIC
//   const getProcessedProducts = (list) => {
//     return list.filter((item) => {
//       const numericPrice = typeof item.price === "string" 
//         ? parseInt(item.price.replace(/[^\d]/g, ""), 10) 
//         : Number(item.price);

//       const matchesPrice = isNaN(numericPrice) || numericPrice <= Number(priceFilter);
//       const query = searchQuery.toLowerCase().trim();
//       const matchesSearch = !query || item.title?.toLowerCase().includes(query);

//       return matchesPrice && matchesSearch;
//     }).sort((a, b) => {
//       if (!searchQuery.trim()) return 0;
//       const query = searchQuery.toLowerCase().trim();
//       const titleA = a.title?.toLowerCase() || "";
//       const titleB = b.title?.toLowerCase() || "";
//       const matchA = titleA.includes(query) ? 1 : 0;
//       const matchB = titleB.includes(query) ? 1 : 0;
//       return matchB - matchA;
//     });
//   };

//   const displayedGifts = getProcessedProducts(birthdayGifts);

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

//   const handleAddToCart = async (product) => {
//     try {
//       const response = await fetch("http://localhost:5000/api/shawls/cart/add", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: userId,
//           productId: product.id,
//           title: product.title,
//           description: product.description,
//           price: product.price,
//           originalPrice: product.originalPrice || "",
//           discount: product.discount || "",
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

//   const handleToggleWishlist = async (product) => {
//     const isWishlisted = wishlistProductIds.includes(String(product.id));
//     const endpoint = isWishlisted ? "remove" : "add";

//     try {
//       const response = await fetch(`http://localhost:5000/api/shawls/${endpoint}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: userId,
//           productId: product.id,
//           title: product.title,
//           description: product.description,
//           price: product.price,
//           originalPrice: product.originalPrice || "",
//           discount: product.discount || "",
//           image: product.image,
//         }),
//       });

//       if (response.ok) {
//         if (isWishlisted) {
//           toast.info(`${product.title} removed from wishlist`, { autoClose: 1000 });
//           setWishlistProductIds((prev) => prev.filter((id) => id !== String(product.id)));
//         } else {
//           toast.success(`${product.title} added to wishlist ❤️`, { autoClose: 1000 });
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

//   const handleBuyNow = async (product) => {
//     if (!cartProductIds.includes(String(product.id))) {
//       await handleAddToCart(product);
//     }
//     navigate("/checkout", { state: { product } });
//   };

//   return (
//     <div className="Customer_container1 bg-light pb-5">
//       <ToastContainer />

//       {/* Share Modal */}
//       {shareProduct && (
//         <div className="Customer_share-overlay" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", justifyContent: "center", alignItems: "center" }}>
//           <div className="Customer_share-modal bg-white p-4 rounded shadow text-center" style={{ width: "320px" }}>
//             <h4 className="fw-bold mb-1">Share Product</h4>
//             <p className="text-muted small">{shareProduct.title}</p>
//             <div className="Customer_share-icons d-flex justify-content-center gap-3 my-3">
//               <WhatsappShareButton url={`${window.location.origin}/product/${shareProduct.id}`}><WhatsappIcon size={42} round /></WhatsappShareButton>
//               <FacebookShareButton url={`${window.location.origin}/product/${shareProduct.id}`}><FacebookIcon size={42} round /></FacebookShareButton>
//               <TwitterShareButton url={`${window.location.origin}/product/${shareProduct.id}`}><TwitterIcon size={42} round /></TwitterShareButton>
//               <EmailShareButton url={`${window.location.origin}/product/${shareProduct.id}`}><EmailIcon size={42} round /></EmailShareButton>
//             </div>
//             <button className="btn btn-dark mb-2 btn-sm w-100" onClick={copyLink}><FaLink className="me-2" /> Copy Link</button>
//             <button className="btn btn-outline-secondary btn-sm w-100" onClick={() => setShareProduct(null)}>Close</button>
//           </div>
//         </div>
//       )}

//       <div className="container my-3 text-center">
//         <div className="position-relative mx-auto" style={{ maxWidth: "600px" }}>
//           <span
//             className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted"
//             style={{ pointerEvents: "none" }}
//           >
//             <i className="bi bi-search"></i>
//           </span>

//           <input
//             type="text"
//             placeholder="Search birthday gift shawls..."
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

//       {/* Top Banner Box */}
//       <div className="mb-4">
//         <div 
//           className="p-4 p-md-5 text-white rounded position-relative overflow-hidden d-flex align-items-center justify-content-between shadow-sm Customer_luxury-banner" 
//           style={{ 
//             backgroundImage: `url(${birthdayBgImage})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             minHeight: "260px"
//           }}
//         >
//           <div style={{ maxWidth: "600px", zIndex: 2 }}>
//             <h1 className="fw-bold display-6 fst-italic" style={{ color: "#f3e5ab" }}>Birthday Gift Sets</h1>
//             <p className="text-light opacity-95 small mb-3">
//               Exclusive gift boxes with premium packaging designed for your special loved ones. Give the ultimate experience of sophistication and warmth.
//             </p>
//             <button onClick={() => navigate("/customer")} className="btn btn-sm px-4 py-2 fw-bold shadow-sm" style={{ backgroundColor: "#f3e5ab", color: "#064e3b", borderRadius: "6px" }}>
//               Explore Collection
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Layout with Custom React State Filter Dropdown */}
//       <div className="container-fluid">
//         <div className="row">
          
//           {/* Left Sidebar Filters */}
//           <div className="col-lg-3 mb-4">
//             {/* Mobile Toggle Button */}
//             <div className="d-block d-lg-none mb-2">
//               <button 
//                 className="btn w-100 d-flex justify-content-between align-items-center py-2 text-white" 
//                 style={{ backgroundColor: "#050e0c" }}
//                 type="button" 
//                 onClick={() => setIsFilterOpen(!isFilterOpen)}
//               >
//                 <span>🔍 Filter Birthday Products</span>
//                 <span>{isFilterOpen ? "▲" : "▼"}</span>
//               </button>
//             </div>

//             {/* Filter Content: Hidden on mobile unless toggled, Always visible on Laptop */}
//             <div className={`bg-white p-3 rounded shadow-sm border ${!isFilterOpen ? "d-none d-lg-block" : "d-block"}`}>
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h6 className="fw-bold mb-0">Filters</h6>
//                 <span className="text-muted small" style={{ cursor: "pointer" }} onClick={() => setPriceFilter(8000)}>Clear All</span>
//               </div>

//               {/* Category */}
//               <div className="mb-3 border-bottom pb-3">
//                 <label className="fw-bold small mb-2 d-block">Category</label>
//                 <div className="form-check small mb-1"><input className="form-check-input" type="checkbox" defaultChecked /><label className="form-check-label">Birthday Hampers</label></div>
//                 <div className="form-check small"><input className="form-check-input" type="checkbox" /><label className="form-check-label">Signature Sets</label></div>
//               </div>

//               {/* Price Range */}
//               <div className="mb-3 border-bottom pb-3">
//                 <label className="fw-bold small mb-2 d-block">Price Range</label>
//                 <input type="range" className="form-range" min="3000" max="8000" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} />
//                 <div className="d-flex justify-content-between text-muted small">
//                   <span>₹3000</span>
//                   <span>₹{priceFilter}</span>
//                 </div>
//               </div>

//               {/* Material Filter */}
//               <div>
//                 <label className="fw-bold small mb-2 d-block">Material</label>
//                 <div className="d-flex flex-column gap-1 small">
//                   <div className="form-check"><input className="form-check-input" type="checkbox" /><label className="form-check-label">Pashmina</label></div>
//                   <div className="form-check"><input className="form-check-input" type="checkbox" /><label className="form-check-label">Wool</label></div>
//                   <div className="form-check"><input className="form-check-input" type="checkbox" /><label className="form-check-label">Silk Blend</label></div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Product Grid */}
//           <div className="col-lg-9">
//             <div className="d-flex justify-content-between align-items-center mb-3 bg-white p-2 px-3 rounded shadow-sm border">
//               <span className="text-muted small">Showing 1–{displayedGifts.length} products</span>
//               <select className="form-select form-select-sm w-auto">
//                 <option>Sort By: Newest First</option>
//                 <option>Price: Low to High</option>
//                 <option>Price: High to Low</option>
//               </select>
//             </div>

//             <div className="row g-3">
//               {displayedGifts.length > 0 ? (
//                 displayedGifts.map((item) => {
//                   const productIdStr = String(item.id);
//                   const isInCart = cartProductIds.includes(productIdStr);
//                   const isWishlisted = wishlistProductIds.includes(productIdStr);

//                   return (
//                     <div className="col-12 col-sm-6 col-md-4" key={productIdStr}>
//                       <div className="Customer_card card h-100 border-0 shadow-sm d-flex flex-column justify-content-between p-2 position-relative" style={{ backgroundColor: "#fff", borderRadius: "12px" }}>
                        
//                         <div className="Customer_product-image-box overflow-hidden position-relative">
//                           {item.discount && (
//                             <span className="badge bg-danger position-absolute top-0 start-0 m-2 px-2 py-1 shadow-sm fw-bold" style={{ zIndex: 2, fontSize: "0.7rem", borderRadius: "4px" }}>
//                               {item.discount}
//                             </span>
//                           )}

//                           <img src={item.image} className="card-img-top rounded Customer_product-image" alt={item.title} style={{ height: "220px", objectFit: "cover" }} />
                          
//                           {/* Share Button */}
//                           <button className="Customer_share-btn" onClick={() => setShareProduct(item)} title="Share Product">
//                             <FaShareAlt />
//                           </button>

//                           {/* Wishlist Button */}
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

//                         <div className="card-body px-2 py-2 d-flex flex-column justify-content-between">
//                           <div>
//                             <h6 className="fw-bold mb-1 text-dark" style={{ fontSize: "0.9rem" }}>{item.title}</h6>
//                             <div className="text-warning small mb-1" style={{ fontSize: "0.75rem" }}>
//                               {[...Array(item.rating || 5)].map((_, i) => (<FaStar key={i} />))}
//                               <span className="text-muted ms-1">({item.reviews || 16})</span>
//                             </div>
//                             <p className="text-muted small mb-2" style={{ fontSize: "0.78rem", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
//                               {item.description}
//                             </p>
//                             <div className="d-flex align-items-center gap-2 mb-2">
//                               <span className="fw-bold fs-6 text-success">{item.price}</span>
//                               {item.originalPrice && <span className="text-decoration-line-through text-muted small" style={{ fontSize: "0.75rem" }}>{item.originalPrice}</span>}
//                             </div>
//                           </div>

//                           <div className="d-flex flex-column gap-1 mt-auto">
//                             <div className="d-flex gap-1">
//                               <button onClick={() => navigate(`/product/${item.id}`, { state: { product: item } })} className="btn btn-outline-dark btn-sm w-50 fw-semibold" style={{ fontSize: "0.75rem", borderRadius: "6px" }}>
//                                 View Details
//                               </button>
//                               {isInCart ? (
//                                 <button onClick={() => navigate("/cart")} className="btn btn-sm w-50 fw-semibold text-white" style={{ fontSize: "0.75rem", backgroundColor: "#2b8a3e", border: "none", borderRadius: "6px" }}>
//                                   Go to Cart
//                                 </button>
//                               ) : (
//                                 <button onClick={() => handleAddToCart(item)} className="btn btn-dark btn-sm w-50 fw-semibold text-white" style={{ fontSize: "0.75rem", backgroundColor: "#064e3b", border: "none", borderRadius: "6px" }}>
//                                   Add to Cart
//                                 </button>
//                               )}
//                             </div>
//                             <button onClick={() => handleBuyNow(item)} className="btn btn-sm w-100 fw-bold text-white border-0 shadow-sm" style={{ fontSize: "0.8rem", background: "linear-gradient(135deg, #d6bd69 0%, #dfa00b 100%)", borderRadius: "6px" }}>
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
//                   <p className="text-muted fs-5">No birthday gift sets found matching your search or price range.</p>
//                 </div>
//               )}
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* Feature Strip Banner */}
//       <div className="container my-5">
//         <div className="bg-white p-3 rounded shadow-sm border d-flex flex-wrap justify-content-around text-center gap-3">
//           <div className="d-flex align-items-center gap-2">
//             <FaGift className="fs-3" style={{ color: "#064e3b" }} />
//             <div className="text-start">
//               <h6 className="fw-bold mb-0 small">Signature Gift Chest</h6>
//               <small className="text-muted" style={{ fontSize: "0.7rem" }}>Handcrafted rigid gift cases</small>
//             </div>
//           </div>
//           <div className="d-flex align-items-center gap-2">
//             <FaCommentAlt className="fs-3" style={{ color: "#064e3b" }} />
//             <div className="text-start">
//               <h6 className="fw-bold mb-0 small">Personalized Note Card</h6>
//               <small className="text-muted" style={{ fontSize: "0.7rem" }}>Handwritten gold-foil message</small>
//             </div>
//           </div>
//           <div className="d-flex align-items-center gap-2">
//             <FaShippingFast className="fs-3" style={{ color: "#064e3b" }} />
//             <div className="text-start">
//               <h6 className="fw-bold mb-0 small">Insured Priority Shipping</h6>
//               <small className="text-muted" style={{ fontSize: "0.7rem" }}>Safe & secure transit</small>
//             </div>
//           </div>
//           <div className="d-flex align-items-center gap-2">
//             <FaUndo className="fs-3" style={{ color: "#064e3b" }} />
//             <div className="text-start">
//               <h6 className="fw-bold mb-0 small">Easy 7-Day Return</h6>
//               <small className="text-muted" style={{ fontSize: "0.7rem" }}>Hassle-free return policy</small>
//             </div>
//           </div>
//         </div>
//       </div>
      
//     </div>
//   );
// }

// export default BirthdayGifts;





// sahi




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaShareAlt, FaLink, FaHeart, FaStar, FaGift, FaShippingFast, FaUndo, FaCommentAlt } from "react-icons/fa";
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
// import "../Featured/Featuredcol.css";
// import birthdayBgImage from "../../assets/image1.png";
// import { BirthdayShawls } from "../../data/shawls"; 

// function BirthdayGifts() {
//   const navigate = useNavigate();
//   const [shareProduct, setShareProduct] = useState(null);
//   const [cartProductIds, setCartProductIds] = useState([]);
//   const [birthdayGifts, setBirthdayGifts] = useState([...BirthdayShawls]); 
//   const [wishlistProductIds, setWishlistProductIds] = useState([]);
//   const [priceFilter, setPriceFilter] = useState(8000);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortBy, setSortBy] = useState("Newest First");
  
//   // State for mobile filter dropdown toggle
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

//   const userId = localStorage.getItem("userId") || "guest_user_id";

//   useEffect(() => {
//     // 1. Fetch Database Products and Merge with Static birthdayShawls
//     axios.get("http://localhost:5000/api/seller/products/public")
//       .then((res) => {
//         if (Array.isArray(res.data)) {
//           const dbProducts = res.data
//             .filter((p) => p.category === "BirthdayGift Shawls")
//             .map((p) => ({
//               id: p._id,
//               title: p.productName,
//               description: p.description,
//               price: `₹${p.price}`,
//               originalPrice: p.discount ? `₹${Math.round(p.price * (1 + p.discount / 100))}` : "",
//               discount: p.discount ? `${p.discount}% OFF` : null,
//               image: `http://localhost:5000/${p.productImage}`,
//               stock: `Stock: ${p.stockQuantity}`,
//               fabric: p.fabric || "N/A",
//               color: p.color || "N/A",
//               size: p.size || "N/A",
//               careInstructions: p.washCare || "N/A",
//               rating: 5,
//               reviews: 18,
//             }));

//           setBirthdayGifts([...BirthdayShawls, ...dbProducts]);
//         }
//       })
//       .catch((err) => console.error("Error fetching live birthday products:", err));

//     // 2. Fetch Cart Items
//     fetch(`http://localhost:5000/api/shawls/cart/${userId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (Array.isArray(data)) {
//           const ids = data.map((item) => String(item.productId));
//           setCartProductIds(ids);
//         }
//       })
//       .catch((err) => console.error("Error fetching cart items:", err));

//     // 3. Fetch Wishlist Items
//     const fetchWishlist = () => {
//       fetch(`http://localhost:5000/api/shawls/${userId}`)
//         .then((res) => res.json())
//         .then((data) => {
//           if (Array.isArray(data)) {
//             const ids = data.map((item) => String(item.productId));
//             setWishlistProductIds(ids);
//           }
//         })
//         .catch((err) => console.error("Error fetching wishlist:", err));
//     };

//     fetchWishlist();
//     window.addEventListener("wishlistUpdated", fetchWishlist);
//     return () => window.removeEventListener("wishlistUpdated", fetchWishlist);
//   }, [userId]);

//   // SEARCH, PRICE FILTER & SORTING LOGIC
//   const getProcessedProducts = (list) => {
//     return list.filter((item) => {
//       const numericPrice = typeof item.price === "string" 
//         ? parseInt(item.price.replace(/[^\d]/g, ""), 10) 
//         : Number(item.price);

//       const matchesPrice = isNaN(numericPrice) || numericPrice <= Number(priceFilter);
//       const query = searchQuery.toLowerCase().trim();
//       const matchesSearch = !query || item.title?.toLowerCase().includes(query);

//       return matchesPrice && matchesSearch;
//     }).sort((a, b) => {
//       const priceA = typeof a.price === "string" ? parseInt(a.price.replace(/[^\d]/g, ""), 10) : Number(a.price);
//       const priceB = typeof b.price === "string" ? parseInt(b.price.replace(/[^\d]/g, ""), 10) : Number(b.price);

//       if (sortBy === "Price: Low to High") {
//         return priceA - priceB;
//       } else if (sortBy === "Price: High to Low") {
//         return priceB - priceA;
//       } else {
//         return 0; // Newest First / Default
//       }
//     });
//   };

//   const displayedGifts = getProcessedProducts(birthdayGifts);

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

//   const handleAddToCart = async (product) => {
//     try {
//       const response = await fetch("http://localhost:5000/api/shawls/cart/add", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: userId,
//           productId: product.id,
//           title: product.title,
//           description: product.description,
//           price: product.price,
//           originalPrice: product.originalPrice || "",
//           discount: product.discount || "",
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

//   const handleToggleWishlist = async (product) => {
//     const isWishlisted = wishlistProductIds.includes(String(product.id));
//     const endpoint = isWishlisted ? "remove" : "add";

//     try {
//       const response = await fetch(`http://localhost:5000/api/shawls/${endpoint}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: userId,
//           productId: product.id,
//           title: product.title,
//           description: product.description,
//           price: product.price,
//           originalPrice: product.originalPrice || "",
//           discount: product.discount || "",
//           image: product.image,
//         }),
//       });

//       if (response.ok) {
//         if (isWishlisted) {
//           toast.info(`${product.title} removed from wishlist`, { autoClose: 1000 });
//           setWishlistProductIds((prev) => prev.filter((id) => id !== String(product.id)));
//         } else {
//           toast.success(`${product.title} added to wishlist ❤️`, { autoClose: 1000 });
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

//   const handleBuyNow = async (product) => {
//     if (!cartProductIds.includes(String(product.id))) {
//       await handleAddToCart(product);
//     }
//     navigate("/checkout", { state: { product } });
//   };

//   return (
//     <div className="Customer_container1 bg-light pb-5">
//       <ToastContainer />

//       {/* Share Modal */}
//       {shareProduct && (
//         <div className="Customer_share-overlay" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", justifyContent: "center", alignItems: "center" }}>
//           <div className="Customer_share-modal bg-white p-4 rounded shadow text-center" style={{ width: "320px" }}>
//             <h4 className="fw-bold mb-1">Share Product</h4>
//             <p className="text-muted small">{shareProduct.title}</p>
//             <div className="Customer_share-icons d-flex justify-content-center gap-3 my-3">
//               <WhatsappShareButton url={`${window.location.origin}/product/${shareProduct.id}`}><WhatsappIcon size={42} round /></WhatsappShareButton>
//               <FacebookShareButton url={`${window.location.origin}/product/${shareProduct.id}`}><FacebookIcon size={42} round /></FacebookShareButton>
//               <TwitterShareButton url={`${window.location.origin}/product/${shareProduct.id}`}><TwitterIcon size={42} round /></TwitterShareButton>
//               <EmailShareButton url={`${window.location.origin}/product/${shareProduct.id}`}><EmailIcon size={42} round /></EmailShareButton>
//             </div>
//             <button className="btn btn-dark mb-2 btn-sm w-100" onClick={copyLink}><FaLink className="me-2" /> Copy Link</button>
//             <button className="btn btn-outline-secondary btn-sm w-100" onClick={() => setShareProduct(null)}>Close</button>
//           </div>
//         </div>
//       )}

//       <div className="container my-3 text-center">
//         <div className="position-relative mx-auto" style={{ maxWidth: "600px" }}>
//           <span
//             className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted"
//             style={{ pointerEvents: "none" }}
//           >
//             <i className="bi bi-search"></i>
//           </span>

//           <input
//             type="text"
//             placeholder="Search birthday gift shawls..."
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

//       {/* Top Banner Box */}
//       <div className="mb-4">
//         <div 
//           className="p-4 p-md-5 text-white rounded position-relative overflow-hidden d-flex align-items-center justify-content-between shadow-sm Customer_luxury-banner" 
//           style={{ 
//             backgroundImage: `url(${birthdayBgImage})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             minHeight: "260px"
//           }}
//         >
//           <div style={{ maxWidth: "600px", zIndex: 2 }}>
//             <h1 className="fw-bold display-6 fst-italic" style={{ color: "#f3e5ab" }}>Birthday Gift Sets</h1>
//             <p className="text-light opacity-95 small mb-3">
//               Exclusive gift boxes with premium packaging designed for your special loved ones. Give the ultimate experience of sophistication and warmth.
//             </p>
//             <button onClick={() => navigate("/customer")} className="btn btn-sm px-4 py-2 fw-bold shadow-sm" style={{ backgroundColor: "#f3e5ab", color: "#064e3b", borderRadius: "6px" }}>
//               Explore Collection
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Layout */}
//       <div className="container-fluid">
//         <div className="row">
          
//           {/* Left Sidebar Filters */}
//           <div className="col-lg-3 mb-4">
//             <div className="d-block d-lg-none mb-2">
//               <button 
//                 className="btn w-100 d-flex justify-content-between align-items-center py-2 text-white" 
//                 style={{ backgroundColor: "#050e0c" }}
//                 type="button" 
//                 onClick={() => setIsFilterOpen(!isFilterOpen)}
//               >
//                 <span>🔍 Filter Birthday Products</span>
//                 <span>{isFilterOpen ? "▲" : "▼"}</span>
//               </button>
//             </div>

//             <div className={`bg-white p-3 rounded shadow-sm border ${!isFilterOpen ? "d-none d-lg-block" : "d-block"}`}>
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h6 className="fw-bold mb-0">Filters</h6>
//                 <span className="text-muted small" style={{ cursor: "pointer" }} onClick={() => setPriceFilter(8000)}>Clear All</span>
//               </div>

//               <div className="mb-3 border-bottom pb-3">
//                 <label className="fw-bold small mb-2 d-block">Category</label>
//                 <div className="form-check small mb-1"><input className="form-check-input" type="checkbox" defaultChecked /><label className="form-check-label">Birthday Hampers</label></div>
//                 <div className="form-check small"><input className="form-check-input" type="checkbox" /><label className="form-check-label">Signature Sets</label></div>
//               </div>

//               <div className="mb-3 border-bottom pb-3">
//                 <label className="fw-bold small mb-2 d-block">Price Range</label>
//                 <input type="range" className="form-range" min="3000" max="8000" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} />
//                 <div className="d-flex justify-content-between text-muted small">
//                   <span>₹3000</span>
//                   <span>₹{priceFilter}</span>
//                 </div>
//               </div>

//               <div>
//                 <label className="fw-bold small mb-2 d-block">Material</label>
//                 <div className="d-flex flex-column gap-1 small">
//                   <div className="form-check"><input className="form-check-input" type="checkbox" /><label className="form-check-label">Pashmina</label></div>
//                   <div className="form-check"><input className="form-check-input" type="checkbox" /><label className="form-check-label">Wool</label></div>
//                   <div className="form-check"><input className="form-check-input" type="checkbox" /><label className="form-check-label">Silk Blend</label></div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Product Grid */}
//           <div className="col-lg-9">
//             <div className="d-flex justify-content-between align-items-center mb-3 bg-white p-2 px-3 rounded shadow-sm border">
//               <span className="text-muted small">Showing 1–{displayedGifts.length} products</span>
              
//               {/* Connected Sort Dropdown */}
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

//             <div className="row g-3">
//               {displayedGifts.length > 0 ? (
//                 displayedGifts.map((item) => {
//                   const productIdStr = String(item.id);
//                   const isInCart = cartProductIds.includes(productIdStr);
//                   const isWishlisted = wishlistProductIds.includes(productIdStr);

//                   return (
//                     <div className="col-12 col-sm-6 col-md-4" key={productIdStr}>
//                       <div className="Customer_card card h-100 border-0 shadow-sm d-flex flex-column justify-content-between p-2 position-relative" style={{ backgroundColor: "#fff", borderRadius: "12px" }}>
                        
//                         <div className="Customer_product-image-box overflow-hidden position-relative">
//                           {item.discount && (
//                             <span className="badge bg-danger position-absolute top-0 start-0 m-2 px-2 py-1 shadow-sm fw-bold" style={{ zIndex: 2, fontSize: "0.7rem", borderRadius: "4px" }}>
//                               {item.discount}
//                             </span>
//                           )}

//                           <img src={item.image} className="card-img-top rounded Customer_product-image" alt={item.title} style={{ height: "220px", objectFit: "cover" }} />
                          
//                           <button className="Customer_share-btn" onClick={() => setShareProduct(item)} title="Share Product">
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

//                         <div className="card-body px-2 py-2 d-flex flex-column justify-content-between">
//                           <div>
//                             <h6 className="fw-bold mb-1 text-dark" style={{ fontSize: "0.9rem" }}>{item.title}</h6>
//                             <div className="text-warning small mb-1" style={{ fontSize: "0.75rem" }}>
//                               {[...Array(item.rating || 5)].map((_, i) => (<FaStar key={i} />))}
//                               <span className="text-muted ms-1">({item.reviews || 16})</span>
//                             </div>
//                             <p className="text-muted small mb-2" style={{ fontSize: "0.78rem", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
//                               {item.description}
//                             </p>
//                             <div className="d-flex align-items-center gap-2 mb-2">
//                               <span className="fw-bold fs-6 text-success">{item.price}</span>
//                               {item.originalPrice && <span className="text-decoration-line-through text-muted small" style={{ fontSize: "0.75rem" }}>{item.originalPrice}</span>}
//                             </div>
//                           </div>

//                           <div className="d-flex flex-column gap-1 mt-auto">
//                             <div className="d-flex gap-1">
//                               <button onClick={() => navigate(`/product/${item.id}`, { state: { product: item } })} className="btn btn-outline-dark btn-sm w-50 fw-semibold" style={{ fontSize: "0.75rem", borderRadius: "6px" }}>
//                                 View Details
//                               </button>
//                               {isInCart ? (
//                                 <button onClick={() => navigate("/cart")} className="btn btn-sm w-50 fw-semibold text-white" style={{ fontSize: "0.75rem", backgroundColor: "#2b8a3e", border: "none", borderRadius: "6px" }}>
//                                   Go to Cart
//                                 </button>
//                               ) : (
//                                 <button onClick={() => handleAddToCart(item)} className="btn btn-dark btn-sm w-50 fw-semibold text-white" style={{ fontSize: "0.75rem", backgroundColor: "#064e3b", border: "none", borderRadius: "6px" }}>
//                                   Add to Cart
//                                 </button>
//                               )}
//                             </div>
//                             <button onClick={() => handleBuyNow(item)} className="btn btn-sm w-100 fw-bold text-white border-0 shadow-sm" style={{ fontSize: "0.8rem", background: "linear-gradient(135deg, #d6bd69 0%, #dfa00b 100%)", borderRadius: "6px" }}>
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
//                   <p className="text-muted fs-5">No birthday gift sets found matching your search or price range.</p>
//                 </div>
//               )}
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* Feature Strip Banner */}
//       <div className="container my-5">
//         <div className="bg-white p-3 rounded shadow-sm border d-flex flex-wrap justify-content-around text-center gap-3">
//           <div className="d-flex align-items-center gap-2">
//             <FaGift className="fs-3" style={{ color: "#064e3b" }} />
//             <div className="text-start">
//               <h6 className="fw-bold mb-0 small">Signature Gift Chest</h6>
//               <small className="text-muted" style={{ fontSize: "0.7rem" }}>Handcrafted rigid gift cases</small>
//             </div>
//           </div>
//           <div className="d-flex align-items-center gap-2">
//             <FaCommentAlt className="fs-3" style={{ color: "#064e3b" }} />
//             <div className="text-start">
//               <h6 className="fw-bold mb-0 small">Personalized Note Card</h6>
//               <small className="text-muted" style={{ fontSize: "0.7rem" }}>Handwritten gold-foil message</small>
//             </div>
//           </div>
//           <div className="d-flex align-items-center gap-2">
//             <FaShippingFast className="fs-3" style={{ color: "#064e3b" }} />
//             <div className="text-start">
//               <h6 className="fw-bold mb-0 small">Insured Priority Shipping</h6>
//               <small className="text-muted" style={{ fontSize: "0.7rem" }}>Safe & secure transit</small>
//             </div>
//           </div>
//           <div className="d-flex align-items-center gap-2">
//             <FaUndo className="fs-3" style={{ color: "#064e3b" }} />
//             <div className="text-start">
//               <h6 className="fw-bold mb-0 small">Easy 7-Day Return</h6>
//               <small className="text-muted" style={{ fontSize: "0.7rem" }}>Hassle-free return policy</small>
//             </div>
//           </div>
//         </div>
//       </div>
      
//     </div>
//   );
// }

// export default BirthdayGifts;




// nnnnnnnnnnn









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
import "../Featured/Featuredcol.css";
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
  
  // State for mobile filter dropdown toggle
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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

  useEffect(() => {
    // 1. Fetch Database Products and Merge with Static birthdayShawls
    axios.get("http://localhost:5000/api/seller/products/public")
      .then((res) => {
        if (Array.isArray(res.data)) {
          const dbProducts = res.data
            .filter((p) => p.category === "BirthdayGift Shawls")
            .map((p) => ({
              id: p._id,
              title: p.productName,
              description: p.description,
              price: `₹${p.price}`,
              originalPrice: p.discount ? `₹${Math.round(p.price * (1 + p.discount / 100))}` : "",
              discount: p.discount ? `${p.discount}% OFF` : null,
              image: `http://localhost:5000/${p.productImage}`,
              stock: `Stock: ${p.stockQuantity}`,
              fabric: p.fabric || "N/A",
              color: p.color || "N/A",
              size: p.size || "N/A",
              careInstructions: p.washCare || "N/A",
              rating: 5,
              reviews: 18,
            }));

          setBirthdayGifts([...BirthdayShawls, ...dbProducts]);
        }
      })
      .catch((err) => console.error("Error fetching live birthday products:", err));

    // 2. Fetch Cart Items
    fetch(`http://localhost:5000/api/shawls/cart/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const ids = data.map((item) => String(item.productId));
          setCartProductIds(ids);
        }
      })
      .catch((err) => console.error("Error fetching cart items:", err));

    // 3. Fetch Wishlist Items
    const fetchWishlist = () => {
      fetch(`http://localhost:5000/api/shawls/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            const ids = data.map((item) => String(item.productId));
            setWishlistProductIds(ids);
          }
        })
        .catch((err) => console.error("Error fetching wishlist:", err));
    };

    fetchWishlist();
    window.addEventListener("wishlistUpdated", fetchWishlist);
    return () => window.removeEventListener("wishlistUpdated", fetchWishlist);
  }, [userId]);

  // SEARCH, PRICE FILTER & SORTING LOGIC
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
        return 0; // Newest First / Default
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

  // ADD TO CART (With Auth Check)
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
            originalPrice: product.originalPrice || "",
            discount: product.discount || "",
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

  // WISHLIST (With Auth Check)
  const handleToggleWishlist = (product) => {
    checkAuthAndExecute(async () => {
      const isWishlisted = wishlistProductIds.includes(String(product.id));
      const endpoint = isWishlisted ? "remove" : "add";

      try {
        const response = await fetch(`http://localhost:5000/api/shawls/${endpoint}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: localStorage.getItem("userId"),
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

  // BUY NOW (With Auth Check)
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
              originalPrice: product.originalPrice || "",
              discount: product.discount || "",
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

  return (
    <div className="Customer_container1 bg-light pb-5">
      <ToastContainer />

      {/* Share Modal */}
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

      {/* Top Banner Box */}
      <div className="mb-4">
        <div 
          className="p-4 p-md-5 text-white rounded position-relative overflow-hidden d-flex align-items-center justify-content-between shadow-sm Customer_luxury-banner" 
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

      {/* Main Layout */}
      <div className="container-fluid">
        <div className="row">
          
          {/* Left Sidebar Filters */}
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

          {/* Right Product Grid */}
          <div className="col-lg-9">
            <div className="d-flex justify-content-between align-items-center mb-3 bg-white p-2 px-3 rounded shadow-sm border">
              <span className="text-muted small">Showing 1–{displayedGifts.length} products</span>
              
              {/* Connected Sort Dropdown */}
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
              {displayedGifts.length > 0 ? (
                displayedGifts.map((item) => {
                  const productIdStr = String(item.id);
                  const isInCart = cartProductIds.includes(productIdStr);
                  const isWishlisted = wishlistProductIds.includes(productIdStr);

                  return (
                    <div className="col-12 col-sm-6 col-md-4" key={productIdStr}>
                      <div className="Customer_card card h-100 border-0 shadow-sm d-flex flex-column justify-content-between p-2 position-relative" style={{ backgroundColor: "#fff", borderRadius: "12px" }}>
                        
                        <div className="Customer_product-image-box overflow-hidden position-relative">
                          {item.discount && (
                            <span className="badge bg-danger position-absolute top-0 start-0 m-2 px-2 py-1 shadow-sm fw-bold" style={{ zIndex: 2, fontSize: "0.7rem", borderRadius: "4px" }}>
                              {item.discount}
                            </span>
                          )}

                          <img src={item.image} className="card-img-top rounded Customer_product-image" alt={item.title} style={{ height: "220px", objectFit: "cover" }} />
                          
                          <button className="Customer_share-btn" onClick={() => setShareProduct(item)} title="Share Product">
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

                        <div className="card-body px-2 py-2 d-flex flex-column justify-content-between">
                          <div>
                            <h6 className="fw-bold mb-1 text-dark" style={{ fontSize: "0.9rem" }}>{item.title}</h6>
                            <div className="text-warning small mb-1" style={{ fontSize: "0.75rem" }}>
                              {[...Array(item.rating || 5)].map((_, i) => (<FaStar key={i} />))}
                              <span className="text-muted ms-1">({item.reviews || 16})</span>
                            </div>
                            <p className="text-muted small mb-2" style={{ fontSize: "0.78rem", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                              {item.description}
                            </p>
                            <div className="d-flex align-items-center gap-2 mb-2">
                              <span className="fw-bold fs-6 text-success">{item.price}</span>
                              {item.originalPrice && <span className="text-decoration-line-through text-muted small" style={{ fontSize: "0.75rem" }}>{item.originalPrice}</span>}
                            </div>
                          </div>

                          <div className="d-flex flex-column gap-1 mt-auto">
                            <div className="d-flex gap-1">
                              <button onClick={() => navigate(`/product/${item.id}`, { state: { product: item } })} className="btn btn-outline-dark btn-sm w-50 fw-semibold" style={{ fontSize: "0.75rem", borderRadius: "6px" }}>
                                View Details
                              </button>
                              {isInCart ? (
                                <button onClick={() => navigate("/cart")} className="btn btn-sm w-50 fw-semibold text-white" style={{ fontSize: "0.75rem", backgroundColor: "#2b8a3e", border: "none", borderRadius: "6px" }}>
                                  Go to Cart
                                </button>
                              ) : (
                                <button onClick={() => handleAddToCart(item)} className="btn btn-dark btn-sm w-50 fw-semibold text-white" style={{ fontSize: "0.75rem", backgroundColor: "#064e3b", border: "none", borderRadius: "6px" }}>
                                  Add to Cart
                                </button>
                              )}
                            </div>
                            <button onClick={() => handleBuyNow(item)} className="btn btn-sm w-100 fw-bold text-white border-0 shadow-sm" style={{ fontSize: "0.8rem", background: "linear-gradient(135deg, #d6bd69 0%, #dfa00b 100%)", borderRadius: "6px" }}>
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
                  <p className="text-muted fs-5">No birthday gift sets found matching your search or price range.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Feature Strip Banner */}
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