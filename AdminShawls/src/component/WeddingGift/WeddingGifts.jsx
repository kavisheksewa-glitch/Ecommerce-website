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
// //import "./Featuredcol.css";
// //import weddingBgImage from "../assets/image.png";
// import { WeddingShawls } from "../../data/shawls";
// import weddingBgImage from "../../assets/image.png";

// function WeddingGifts() {
//   const navigate = useNavigate();
//   const [shareProduct, setShareProduct] = useState(null);
//   const [cartProductIds, setCartProductIds] = useState([]);
//   const [weddingShawls, setWeddingShawls] = useState([...WeddingShawls]);
//   const [wishlistProductIds, setWishlistProductIds] = useState([]);
//   const [priceFilter, setPriceFilter] = useState(5000);
  
//   // State for mobile filter dropdown toggle
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

//   const userId = localStorage.getItem("userId") || "guest_user_id";

//   useEffect(() => {
//     // 1. Fetch Database Products and Merge with Static WeddingShawls
//     axios.get("http://localhost:5000/api/seller/products/public")
//       .then((res) => {
//         if (Array.isArray(res.data)) {
//           const dbProducts = res.data
//             .filter((p) => p.category === "weddingGift Shawls")
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

//           setWeddingShawls([...WeddingShawls, ...dbProducts]);
//         }
//       })
//       .catch((err) => console.error("Error fetching live wedding products:", err));

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
//           className="p-4 p-md-5 text-white rounded position-relative overflow-hidden d-flex align-items-center justify-content-between shadow-sm Customer_wedding-banner" 
//           style={{ 
//             backgroundImage:  `url(${weddingBgImage})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             minHeight: "360px"
//           }}
//         >
//           <div style={{ maxWidth: "600px", zIndex: 2 }}>
//             <h1 className="fw-bold display-6 fst-italic text-white">Wedding Gifts Collection</h1>
//             <p className="text-light opacity-95 small mb-3">
//               Make weddings memorable with our grand and elegant traditional shawls. Specially curated bridal and groom collections with luxury packaging.
//             </p>
//             <button className="btn btn-sm px-4 py-2 fw-bold shadow-sm bg-white text-dark" style={{ borderRadius: "6px" }}>
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
//                 style={{ backgroundColor: "#06080e" }}
//                 type="button" 
//                 onClick={() => setIsFilterOpen(!isFilterOpen)}
//               >
//                 <span>🔍 Filter Wedding Products</span>
//                 <span>{isFilterOpen ? "▲" : "▼"}</span>
//               </button>
//             </div>

//             {/* Filter Content: Hidden on mobile unless toggled, Always visible on Laptop */}
//             <div className={`bg-white p-3 rounded shadow-sm border ${!isFilterOpen ? "d-none d-lg-block" : "d-block"}`}>
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h6 className="fw-bold mb-0">Filters</h6>
//                 <span className="text-muted small" style={{ cursor: "pointer" }} onClick={() => setPriceFilter(5000)}>Clear All</span>
//               </div>

//               {/* Category */}
//               <div className="mb-3 border-bottom pb-3">
//                 <label className="fw-bold small mb-2 d-block">Category</label>
//                 <div className="form-check small mb-1"><input className="form-check-input" type="checkbox" defaultChecked /><label className="form-check-label">Bridal Shawls</label></div>
//                 <div className="form-check small"><input className="form-check-input" type="checkbox" /><label className="form-check-label">Groom Shawls</label></div>
//               </div>

//               {/* Price Range */}
//               <div className="mb-3 border-bottom pb-3">
//                 <label className="fw-bold small mb-2 d-block">Price Range</label>
//                 <input type="range" className="form-range" min="1500" max="5000" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} />
//                 <div className="d-flex justify-content-between text-muted small">
//                   <span>₹1500</span>
//                   <span>₹{priceFilter}</span>
//                 </div>
//               </div>

//               {/* Color Filter */}
//               <div className="mb-3 border-bottom pb-3">
//                 <label className="fw-bold small mb-2 d-block">Color</label>
//                 <div className="d-flex flex-column gap-1 small">
//                   <div className="form-check"><input className="form-check-input" type="checkbox" /><label className="form-check-label">Maroon</label></div>
//                   <div className="form-check"><input className="form-check-input" type="checkbox" /><label className="form-check-label">Gold / Beige</label></div>
//                   <div className="form-check"><input className="form-check-input" type="checkbox" /><label className="form-check-label">Royal Red</label></div>
//                   <div className="form-check"><input className="form-check-input" type="checkbox" /><label className="form-check-label">Black</label></div>
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
//               <span className="text-muted small">Showing 1–{weddingShawls.length} products</span>
//               <select className="form-select form-select-sm w-auto">
//                 <option>Sort By: Newest First</option>
//                 <option>Price: Low to High</option>
//                 <option>Price: High to Low</option>
//               </select>
//             </div>

//             <div className="row g-3">
//               {weddingShawls.map((item) => {
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
//                             <span className="fw-bold fs-6 text-danger">{item.price}</span>
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
//                               <button onClick={() => handleAddToCart(item)} className="btn btn-dark btn-sm w-50 fw-semibold text-white" style={{ fontSize: "0.75rem", backgroundColor: "#2b8323", border: "none", borderRadius: "6px" }}>
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
//             <FaGift className="fs-3 text-success" />
//             <div className="text-start">
//               <h6 className="fw-bold mb-0 small">Bridal Gift Packaging</h6>
//               <small className="text-muted" style={{ fontSize: "0.7rem" }}>Special grand royal boxes</small>
//             </div>
//           </div>
//           <div className="d-flex align-items-center gap-2">
//             <FaCommentAlt className="fs-3 text-success" />
//             <div className="text-start">
//               <h6 className="fw-bold mb-0 small">Custom Wedding Note</h6>
//               <small className="text-muted" style={{ fontSize: "0.7rem" }}>Personalized wishes included</small>
//             </div>
//           </div>
//           <div className="d-flex align-items-center gap-2">
//             <FaShippingFast className="fs-3 text-success" />
//             <div className="text-start">
//               <h6 className="fw-bold mb-0 small">Express Delivery</h6>
//               <small className="text-muted" style={{ fontSize: "0.7rem" }}>Timely delivery for events</small>
//             </div>
//           </div>
//           <div className="d-flex align-items-center gap-2">
//             <FaUndo className="fs-3 text-success" />
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

// export default WeddingGifts;




// new





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
// import { WeddingShawls } from "../../data/shawls";
// import weddingBgImage from "../../assets/image.png";

// function WeddingGifts() {
//   const navigate = useNavigate();
//   const [shareProduct, setShareProduct] = useState(null);
//   const [cartProductIds, setCartProductIds] = useState([]);
//   const [weddingShawls, setWeddingShawls] = useState([...WeddingShawls]);
//   const [wishlistProductIds, setWishlistProductIds] = useState([]);
//   const [priceFilter, setPriceFilter] = useState(5000);
//   const [searchQuery, setSearchQuery] = useState("");
  
//   // State for mobile filter dropdown toggle
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

//   const userId = localStorage.getItem("userId") || "guest_user_id";

//   useEffect(() => {
//     // 1. Fetch Database Products and Merge with Static WeddingShawls
//     axios.get("http://localhost:5000/api/seller/products/public")
//       .then((res) => {
//         if (Array.isArray(res.data)) {
//           const dbProducts = res.data
//             .filter((p) => p.category === "weddingGift Shawls")
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

//           setWeddingShawls([...WeddingShawls, ...dbProducts]);
//         }
//       })
//       .catch((err) => console.error("Error fetching live wedding products:", err));

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

//   const displayedWeddingShawls = getProcessedProducts(weddingShawls);

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

//       {/* SEARCH BAR SECTION WITH ICON */}
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
//             placeholder="Search wedding gifts..."
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
//           className="p-4 p-md-5 text-white rounded position-relative overflow-hidden d-flex align-items-center justify-content-between shadow-sm Customer_wedding-banner" 
//           style={{ 
//             backgroundImage: `url(${weddingBgImage})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             minHeight: "360px"
//           }}
//         >
//           <div style={{ maxWidth: "600px", zIndex: 2 }}>
//             <h1 className="fw-bold display-6 fst-italic text-white">Wedding Gifts Collection</h1>
//             <p className="text-light opacity-95 small mb-3">
//               Make weddings memorable with our grand and elegant traditional shawls. Specially curated bridal and groom collections with luxury packaging.
//             </p>
//             <button onClick={() => navigate("/customer")}  className="btn btn-sm px-4 py-2 fw-bold shadow-sm bg-white text-dark" style={{ borderRadius: "6px" }}>
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
//             placeholder="Search wedding gifts..."
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
//                 style={{ backgroundColor: "#06080e" }}
//                 type="button" 
//                 onClick={() => setIsFilterOpen(!isFilterOpen)}
//               >
//                 <span>🔍 Filter Wedding Products</span>
//                 <span>{isFilterOpen ? "▲" : "▼"}</span>
//               </button>
//             </div>

//             {/* Filter Content */}
//             <div className={`bg-white p-3 rounded shadow-sm border ${!isFilterOpen ? "d-none d-lg-block" : "d-block"}`}>
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h6 className="fw-bold mb-0">Filters</h6>
//                 <span className="text-muted small" style={{ cursor: "pointer" }} onClick={() => setPriceFilter(5000)}>Clear All</span>
//               </div>

//               {/* Category */}
//               <div className="mb-3 border-bottom pb-3">
//                 <label className="fw-bold small mb-2 d-block">Category</label>
//                 <div className="form-check small mb-1"><input className="form-check-input" type="checkbox" defaultChecked /><label className="form-check-label">Bridal Shawls</label></div>
//                 <div className="form-check small"><input className="form-check-input" type="checkbox" /><label className="form-check-label">Groom Shawls</label></div>
//               </div>

//               {/* Price Range */}
//               <div className="mb-3 border-bottom pb-3">
//                 <label className="fw-bold small mb-2 d-block">Price Range</label>
//                 <input type="range" className="form-range" min="1500" max="5000" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} />
//                 <div className="d-flex justify-content-between text-muted small">
//                   <span>₹1500</span>
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
//               <span className="text-muted small">Showing 1–{displayedWeddingShawls.length} products</span>
//               <select className="form-select form-select-sm w-auto">
//                 <option>Sort By: Newest First</option>
//                 <option>Price: Low to High</option>
//                 <option>Price: High to Low</option>
//               </select>
//             </div>

//             <div className="row g-3">
//               {displayedWeddingShawls.length > 0 ? (
//                 displayedWeddingShawls.map((item) => {
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
//                               <span className="fw-bold fs-6 text-danger">{item.price}</span>
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
//                                 <button onClick={() => handleAddToCart(item)} className="btn btn-dark btn-sm w-50 fw-semibold text-white" style={{ fontSize: "0.75rem", backgroundColor: "#2b8323", border: "none", borderRadius: "6px" }}>
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
//                   <p className="text-muted fs-5">No wedding products found matching your search.</p>
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
//             <FaGift className="fs-3 text-success" />
//             <div className="text-start">
//               <h6 className="fw-bold mb-0 small">Bridal Gift Packaging</h6>
//               <small className="text-muted" style={{ fontSize: "0.7rem" }}>Special grand royal boxes</small>
//             </div>
//           </div>
//           <div className="d-flex align-items-center gap-2">
//             <FaCommentAlt className="fs-3 text-success" />
//             <div className="text-start">
//               <h6 className="fw-bold mb-0 small">Custom Wedding Note</h6>
//               <small className="text-muted" style={{ fontSize: "0.7rem" }}>Personalized wishes included</small>
//             </div>
//           </div>
//           <div className="d-flex align-items-center gap-2">
//             <FaShippingFast className="fs-3 text-success" />
//             <div className="text-start">
//               <h6 className="fw-bold mb-0 small">Express Delivery</h6>
//               <small className="text-muted" style={{ fontSize: "0.7rem" }}>Timely delivery for events</small>
//             </div>
//           </div>
//           <div className="d-flex align-items-center gap-2">
//             <FaUndo className="fs-3 text-success" />
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

// export default WeddingGifts;





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
// import { WeddingShawls } from "../../data/shawls";
// import weddingBgImage from "../../assets/image.png";

// function WeddingGifts() {
//   const navigate = useNavigate();
//   const [shareProduct, setShareProduct] = useState(null);
//   const [cartProductIds, setCartProductIds] = useState([]);
//   const [weddingShawls, setWeddingShawls] = useState([...WeddingShawls]);
//   const [wishlistProductIds, setWishlistProductIds] = useState([]);
//   const [priceFilter, setPriceFilter] = useState(5000);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortBy, setSortBy] = useState("Newest First"); // Added Sort State
  
//   // State for mobile filter dropdown toggle
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

//   const userId = localStorage.getItem("userId") || "guest_user_id";

//   useEffect(() => {
//     // 1. Fetch Database Products and Merge with Static WeddingShawls
//     axios.get("http://localhost:5000/api/seller/products/public")
//       .then((res) => {
//         if (Array.isArray(res.data)) {
//           const dbProducts = res.data
//             .filter((p) => p.category === "weddingGift Shawls")
//             .map((p) => ({
//               id: p._id,
//               title: p.productName,
//               description: p.description,
//               priceNum: Number(p.price), // Numeric price for sorting & filtering
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

//           // Add numeric price to static shawls as well for uniform filtering
//           const staticWithPrice = WeddingShawls.map(item => ({
//             ...item,
//             priceNum: Number(item.price.replace(/[^0-9]/g, ""))
//           }));

//           setWeddingShawls([...staticWithPrice, ...dbProducts]);
//         }
//       })
//       .catch((err) => console.error("Error fetching live wedding products:", err));

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

//   // FILTER & SORT LOGIC
//   const getProcessedProducts = (list) => {
//     // 1. Filter by Search Query
//     let filtered = list.filter((item) => {
//       const matchesSearch = searchQuery.trim() === "" || item.title?.toLowerCase().includes(searchQuery.toLowerCase().trim());
//       const matchesPrice = item.priceNum <= Number(priceFilter);
//       return matchesSearch && matchesPrice;
//     });

//     // 2. Sort Products
//     filtered.sort((a, b) => {
//       if (sortBy === "Price: Low to High") {
//         return a.priceNum - b.priceNum;
//       } else if (sortBy === "Price: High to Low") {
//         return b.priceNum - a.priceNum;
//       } else {
//         // Default / Newest First sorting preference
//         return 0;
//       }
//     });

//     return filtered;
//   };

//   const displayedWeddingShawls = getProcessedProducts(weddingShawls);

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

//       {/* SEARCH BAR SECTION WITH ICON */}
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
//             placeholder="Search wedding gifts..."
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
//           className="p-4 p-md-5 text-white rounded position-relative overflow-hidden d-flex align-items-center justify-content-between shadow-sm Customer_wedding-banner" 
//           style={{ 
//             backgroundImage: `url(${weddingBgImage})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             minHeight: "360px"
//           }}
//         >
//           <div style={{ maxWidth: "600px", zIndex: 2 }}>
//             <h1 className="fw-bold display-6 fst-italic text-white">Wedding Gifts Collection</h1>
//             <p className="text-light opacity-95 small mb-3">
//               Make weddings memorable with our grand and elegant traditional shawls. Specially curated bridal and groom collections with luxury packaging.
//             </p>
//             <button onClick={() => navigate("/customer")}  className="btn btn-sm px-4 py-2 fw-bold shadow-sm bg-white text-dark" style={{ borderRadius: "6px" }}>
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
//                 style={{ backgroundColor: "#06080e" }}
//                 type="button" 
//                 onClick={() => setIsFilterOpen(!isFilterOpen)}
//               >
//                 <span>🔍 Filter Wedding Products</span>
//                 <span>{isFilterOpen ? "▲" : "▼"}</span>
//               </button>
//             </div>

//             {/* Filter Content */}
//             <div className={`bg-white p-3 rounded shadow-sm border ${!isFilterOpen ? "d-none d-lg-block" : "d-block"}`}>
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h6 className="fw-bold mb-0">Filters</h6>
//                 <span className="text-muted small" style={{ cursor: "pointer" }} onClick={() => setPriceFilter(5000)}>Clear All</span>
//               </div>

//               {/* Category */}
//               <div className="mb-3 border-bottom pb-3">
//                 <label className="fw-bold small mb-2 d-block">Category</label>
//                 <div className="form-check small mb-1"><input className="form-check-input" type="checkbox" defaultChecked /><label className="form-check-label">Bridal Shawls</label></div>
//                 <div className="form-check small"><input className="form-check-input" type="checkbox" /><label className="form-check-label">Groom Shawls</label></div>
//               </div>

//               {/* Price Range */}
//               <div className="mb-3 border-bottom pb-3">
//                 <label className="fw-bold small mb-2 d-block">Price Range</label>
//                 <input type="range" className="form-range" min="1500" max="5000" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} />
//                 <div className="d-flex justify-content-between text-muted small">
//                   <span>₹1500</span>
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
//               <span className="text-muted small">Showing 1–{displayedWeddingShawls.length} products</span>
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
//               {displayedWeddingShawls.length > 0 ? (
//                 displayedWeddingShawls.map((item) => {
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
//                               <span className="fw-bold fs-6 text-danger">{item.price}</span>
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
//                                 <button onClick={() => handleAddToCart(item)} className="btn btn-dark btn-sm w-50 fw-semibold text-white" style={{ fontSize: "0.75rem", backgroundColor: "#2b8323", border: "none", borderRadius: "6px" }}>
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
//                   <p className="text-muted fs-5">No wedding products found matching your search or price range.</p>
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
//             <FaGift className="fs-3 text-success" />
//             <div className="text-start">
//               <h6 className="fw-bold mb-0 small">Bridal Gift Packaging</h6>
//               <small className="text-muted" style={{ fontSize: "0.7rem" }}>Special grand royal boxes</small>
//             </div>
//           </div>
//           <div className="d-flex align-items-center gap-2">
//             <FaCommentAlt className="fs-3 text-success" />
//             <div className="text-start">
//               <h6 className="fw-bold mb-0 small">Custom Wedding Note</h6>
//               <small className="text-muted" style={{ fontSize: "0.7rem" }}>Personalized wishes included</small>
//             </div>
//           </div>
//           <div className="d-flex align-items-center gap-2">
//             <FaShippingFast className="fs-3 text-success" />
//             <div className="text-start">
//               <h6 className="fw-bold mb-0 small">Express Delivery</h6>
//               <small className="text-muted" style={{ fontSize: "0.7rem" }}>Timely delivery for events</small>
//             </div>
//           </div>
//           <div className="d-flex align-items-center gap-2">
//             <FaUndo className="fs-3 text-success" />
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

// export default WeddingGifts;










// nnnnnnnnnnnnnnnnn









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
// import { WeddingShawls } from "../../data/shawls";
// import weddingBgImage from "../../assets/image.png";

// function WeddingGifts() {
//   const navigate = useNavigate();
//   const [shareProduct, setShareProduct] = useState(null);
//   const [cartProductIds, setCartProductIds] = useState([]);
//   const [weddingShawls, setWeddingShawls] = useState([...WeddingShawls]);
//   const [wishlistProductIds, setWishlistProductIds] = useState([]);
//   const [priceFilter, setPriceFilter] = useState(5000);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortBy, setSortBy] = useState("Newest First");
  
//   // Filter States
//   const [selectedCategory, setSelectedCategory] = useState({
//     bridal: true,
//     groom: true,
//   });
  
//   const [selectedMaterials, setSelectedMaterials] = useState({
//     Pashmina: false,
//     Wool: false,
//     "Silk Blend": false,
//   });
  
//   // State for mobile filter dropdown toggle
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

//   const userId = localStorage.getItem("userId") || "guest_user_id";

//   useEffect(() => {
//     // 1. Fetch Database Products and Merge with Static WeddingShawls
//     axios.get("http://localhost:5000/api/seller/products/public")
//       .then((res) => {
//         if (Array.isArray(res.data)) {
//           const dbProducts = res.data
//             .filter((p) => p.category === "weddingGift Shawls")
//             .map((p) => ({
//               id: p._id,
//               title: p.productName,
//               description: p.description,
//               priceNum: Number(p.price),
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

//           const staticWithPrice = WeddingShawls.map(item => ({
//             ...item,
//             priceNum: Number(item.price.replace(/[^0-9]/g, ""))
//           }));

//           setWeddingShawls([...staticWithPrice, ...dbProducts]);
//         }
//       })
//       .catch((err) => console.error("Error fetching live wedding products:", err));

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

//   // AUTH CHECK FUNCTION
//   const checkAuthAndExecute = () => {
//     const token = localStorage.getItem("token") || localStorage.getItem("userId");
//     if (!token || token === "guest_user_id") {
//       toast.error("Please login to proceed!");
//       navigate("/login");
//       return false;
//     }
//     return true;
//   };

//   // HANDLE MATERIAL CHECKBOX TOGGLE
//   const handleMaterialChange = (material) => {
//     setSelectedMaterials(prev => ({
//       ...prev,
//       [material]: !prev[material]
//     }));
//   };

//   // HANDLE CATEGORY CHECKBOX TOGGLE
//   const handleCategoryChange = (categoryKey) => {
//     setSelectedCategory(prev => ({
//       ...prev,
//       [categoryKey]: !prev[categoryKey]
//     }));
//   };

//   // FILTER & SORT LOGIC
//   const getProcessedProducts = (list) => {
//     let filtered = list.filter((item) => {
//       const matchesSearch = searchQuery.trim() === "" || item.title?.toLowerCase().includes(searchQuery.toLowerCase().trim());
//       const matchesPrice = item.priceNum <= Number(priceFilter);

//       // Material Filter check
//       const activeMaterials = Object.keys(selectedMaterials).filter(m => selectedMaterials[m]);
//       const matchesMaterial = activeMaterials.length === 0 || activeMaterials.some(mat => item.fabric?.toLowerCase().includes(mat.toLowerCase()));

//       return matchesSearch && matchesPrice && matchesMaterial;
//     });

//     // 2. Sort Products
//     filtered.sort((a, b) => {
//       if (sortBy === "Price: Low to High") {
//         return a.priceNum - b.priceNum;
//       } else if (sortBy === "Price: High to Low") {
//         return b.priceNum - a.priceNum;
//       } else {
//         return 0;
//       }
//     });

//     return filtered;
//   };

//   const displayedWeddingShawls = getProcessedProducts(weddingShawls);

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
//     if (!checkAuthAndExecute()) return false;

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
//         return true;
//       } else {
//         toast.error("Failed to add to cart");
//         return false;
//       }
//     } catch (err) {
//       console.error("Error connecting to backend:", err);
//       toast.error("Server connection failed");
//       return false;
//     }
//   };

//   // BUY NOW FUNCTIONALITY WITH AUTH CHECK
//   const handleBuyNow = async (product) => {
//     if (!checkAuthAndExecute()) return;

//     const productIdStr = String(product.id);
//     if (!cartProductIds.includes(productIdStr)) {
//       const success = await handleAddToCart(product);
//       if (!success) return; 
//     }
//     navigate("/checkout", { state: { product } });
//   };

//   const handleToggleWishlist = async (product) => {
//     if (!checkAuthAndExecute()) return;

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

//   const handleClearAllFilters = () => {
//     setPriceFilter(5000);
//     setSearchQuery("");
//     setSelectedCategory({ bridal: true, groom: true });
//     setSelectedMaterials({ Pashmina: false, Wool: false, "Silk Blend": false });
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

//       {/* SEARCH BAR SECTION WITH ICON */}
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
//             placeholder="Search wedding gifts..."
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
//           className="p-4 p-md-5 text-white rounded position-relative overflow-hidden d-flex align-items-center justify-content-between shadow-sm Customer_wedding-banner" 
//           style={{ 
//             backgroundImage: `url(${weddingBgImage})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             minHeight: "360px"
//           }}
//         >
//           <div style={{ maxWidth: "600px", zIndex: 2 }}>
//             <h1 className="fw-bold display-6 fst-italic text-white">Wedding Gifts Collection</h1>
//             <p className="text-light opacity-95 small mb-3">
//               Make weddings memorable with our grand and elegant traditional shawls. Specially curated bridal and groom collections with luxury packaging.
//             </p>
//             <button onClick={() => navigate("/customer")} className="btn btn-sm px-4 py-2 fw-bold shadow-sm bg-white text-dark" style={{ borderRadius: "6px" }}>
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
//                 style={{ backgroundColor: "#06080e" }}
//                 type="button" 
//                 onClick={() => setIsFilterOpen(!isFilterOpen)}
//               >
//                 <span>🔍 Filter Wedding Products</span>
//                 <span>{isFilterOpen ? "▲" : "▼"}</span>
//               </button>
//             </div>

//             {/* Filter Content */}
//             <div className={`bg-white p-3 rounded shadow-sm border ${!isFilterOpen ? "d-none d-lg-block" : "d-block"}`}>
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h6 className="fw-bold mb-0">Filters</h6>
//                 <span className="text-muted small" style={{ cursor: "pointer" }} onClick={handleClearAllFilters}>Clear All</span>
//               </div>

//               {/* Category */}
//               <div className="mb-3 border-bottom pb-3">
//                 <label className="fw-bold small mb-2 d-block">Category</label>
//                 <div className="form-check small mb-1">
//                   <input 
//                     className="form-check-input" 
//                     type="checkbox" 
//                     checked={selectedCategory.bridal}
//                     onChange={() => handleCategoryChange('bridal')}
//                   />
//                   <label className="form-check-label">Bridal Shawls</label>
//                 </div>
//                 <div className="form-check small">
//                   <input 
//                     className="form-check-input" 
//                     type="checkbox" 
//                     checked={selectedCategory.groom}
//                     onChange={() => handleCategoryChange('groom')}
//                   />
//                   <label className="form-check-label">Groom Shawls</label>
//                 </div>
//               </div>

//               {/* Price Range */}
//               <div className="mb-3 border-bottom pb-3">
//                 <label className="fw-bold small mb-2 d-block">Price Range</label>
//                 <input type="range" className="form-range" min="1500" max="5000" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} />
//                 <div className="d-flex justify-content-between text-muted small">
//                   <span>₹1500</span>
//                   <span>₹{priceFilter}</span>
//                 </div>
//               </div>

//               {/* Material Filter */}
//               <div>
//                 <label className="fw-bold small mb-2 d-block">Material</label>
//                 <div className="d-flex flex-column gap-1 small">
//                   <div className="form-check">
//                     <input 
//                       className="form-check-input" 
//                       type="checkbox" 
//                       checked={selectedMaterials.Pashmina}
//                       onChange={() => handleMaterialChange('Pashmina')}
//                     />
//                     <label className="form-check-label">Pashmina</label>
//                   </div>
//                   <div className="form-check">
//                     <input 
//                       className="form-check-input" 
//                       type="checkbox" 
//                       checked={selectedMaterials.Wool}
//                       onChange={() => handleMaterialChange('Wool')}
//                     />
//                     <label className="form-check-label">Wool</label>
//                   </div>
//                   <div className="form-check">
//                     <input 
//                       className="form-check-input" 
//                       type="checkbox" 
//                       checked={selectedMaterials["Silk Blend"]}
//                       onChange={() => handleMaterialChange('Silk Blend')}
//                     />
//                     <label className="form-check-label">Silk Blend</label>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Product Grid */}
//           <div className="col-lg-9">
//             <div className="d-flex justify-content-between align-items-center mb-3 bg-white p-2 px-3 rounded shadow-sm border">
//               <span className="text-muted small">Showing 1–{displayedWeddingShawls.length} products</span>
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
//               {displayedWeddingShawls.length > 0 ? (
//                 displayedWeddingShawls.map((item) => {
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
//                               <span className="fw-bold fs-6 text-danger">{item.price}</span>
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
//                                 <button onClick={() => handleAddToCart(item)} className="btn btn-dark btn-sm w-50 fw-semibold text-white" style={{ fontSize: "0.75rem", backgroundColor: "#2b8323", border: "none", borderRadius: "6px" }}>
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
//                   <p className="text-muted fs-5">No wedding products found matching your search or filters.</p>
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
//             <FaGift className="fs-3 text-success" />
//             <div className="text-start">
//               <h6 className="fw-bold mb-0 small">Bridal Gift Packaging</h6>
//               <small className="text-muted" style={{ fontSize: "0.7rem" }}>Special grand royal boxes</small>
//             </div>
//           </div>
//           <div className="d-flex align-items-center gap-2">
//             <FaCommentAlt className="fs-3 text-success" />
//             <div className="text-start">
//               <h6 className="fw-bold mb-0 small">Custom Wedding Note</h6>
//               <small className="text-muted" style={{ fontSize: "0.7rem" }}>Personalized wishes included</small>
//             </div>
//           </div>
//           <div className="d-flex align-items-center gap-2">
//             <FaShippingFast className="fs-3 text-success" />
//             <div className="text-start">
//               <h6 className="fw-bold mb-0 small">Express Delivery</h6>
//               <small className="text-muted" style={{ fontSize: "0.7rem" }}>Timely delivery for events</small>
//             </div>
//           </div>
//           <div className="d-flex align-items-center gap-2">
//             <FaUndo className="fs-3 text-success" />
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

// export default WeddingGifts;




//claude evening





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
import { WeddingShawls } from "../../data/shawls";
import weddingBgImage from "../../assets/image.png";

function WeddingGifts() {
  const navigate = useNavigate();
  const [shareProduct, setShareProduct] = useState(null);
  const [cartProductIds, setCartProductIds] = useState([]);
  const [weddingShawls, setWeddingShawls] = useState([...WeddingShawls]);
  const [wishlistProductIds, setWishlistProductIds] = useState([]);
  const [priceFilter, setPriceFilter] = useState(5000);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Newest First");

  const [selectedCategory, setSelectedCategory] = useState({
    bridal: true,
    groom: true,
  });

  const [selectedMaterials, setSelectedMaterials] = useState({
    Pashmina: false,
    Wool: false,
    "Silk Blend": false,
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // ✅ Sirf JWT "token" ke basis pe auth check hota hai
  const checkAuthAndExecute = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to proceed!");
      navigate("/login");
      return false;
    }
    return true;
  };

  const fetchCartAndWishlist = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCartProductIds([]);
      setWishlistProductIds([]);
      return;
    }

    fetch("http://localhost:5000/api/customer/cart", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.cart)) {
          setCartProductIds(data.cart.map((item) => String(item.productId)));
        }
      })
      .catch((err) => console.error("Error fetching cart items:", err));

    fetch("http://localhost:5000/api/customer/wishlist", {
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
    axios.get("http://localhost:5000/api/seller/products/public")
      .then((res) => {
        if (Array.isArray(res.data)) {
          const dbProducts = res.data
            .filter((p) => p.category === "weddingGift Shawls")
            .map((p) => {
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
              priceNum: finalPrice,
              price: `₹${finalPrice}`,
              originalPrice: discountPercent > 0 ? `₹${basePrice}` : "",
              discount: discountPercent > 0 ? `${discountPercent}% OFF` : null,
             // image: `http://localhost:5000/${p.productImage}`,
             image: p.productImage?.startsWith("http") ? p.productImage : `http://localhost:5000/${p.productImage}`, // ✅ SAHI CODE 
              //brandLogo: p.brandLogo ? (p.brandLogo.startsWith("http") ? p.brandLogo : `http://localhost:5000/${p.brandLogo}`) : "",
             brandLogo: p.sellerId?.brandLogo ? (p.sellerId.brandLogo.startsWith("http") ? p.sellerId.brandLogo : `http://localhost:5000/${p.sellerId.brandLogo}`): "",stock: `Stock: ${p.stockQuantity}`,
              stock: `Stock: ${p.stockQuantity}`,
              fabric: p.fabric || "N/A",
              color: p.color || "N/A",
              size: p.size || "N/A",
              careInstructions: p.washCare || "N/A",
              rating: 5,
              reviews: 18,
               //sellerId: p.sellerId || "",
              sellerId: p.sellerId?._id || p.sellerId || "",
              };
            });
          const staticWithPrice = WeddingShawls.map(item => ({
            ...item,
            priceNum: Number(item.price.replace(/[^0-9]/g, ""))
          }));

          setWeddingShawls([...staticWithPrice, ...dbProducts]);
        }
      })
      .catch((err) => console.error("Error fetching live wedding products:", err));

    fetchCartAndWishlist();
    window.addEventListener("cartUpdated", fetchCartAndWishlist);
    window.addEventListener("wishlistUpdated", fetchCartAndWishlist);
    return () => {
      window.removeEventListener("cartUpdated", fetchCartAndWishlist);
      window.removeEventListener("wishlistUpdated", fetchCartAndWishlist);
    };
  }, []);

  const handleMaterialChange = (material) => {
    setSelectedMaterials(prev => ({
      ...prev,
      [material]: !prev[material]
    }));
  };

  const handleCategoryChange = (categoryKey) => {
    setSelectedCategory(prev => ({
      ...prev,
      [categoryKey]: !prev[categoryKey]
    }));
  };

  const getProcessedProducts = (list) => {
    let filtered = list.filter((item) => {
      const matchesSearch = searchQuery.trim() === "" || item.title?.toLowerCase().includes(searchQuery.toLowerCase().trim());
      const matchesPrice = item.priceNum <= Number(priceFilter);

      const activeMaterials = Object.keys(selectedMaterials).filter(m => selectedMaterials[m]);
      const matchesMaterial = activeMaterials.length === 0 || activeMaterials.some(mat => item.fabric?.toLowerCase().includes(mat.toLowerCase()));

      return matchesSearch && matchesPrice && matchesMaterial;
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

  const displayedWeddingShawls = getProcessedProducts(weddingShawls);

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
      const response = await fetch("http://localhost:5000/api/customer/cart/add", {
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
          sellerId: product.sellerId, // ✅ FIX: this was missing, causing the add-to-cart failure
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

  // // ✅ BUY NOW
  // const handleBuyNow = async (product) => {
  //   if (!checkAuthAndExecute()) return;

  //   const productIdStr = String(product.id);
  //   if (!cartProductIds.includes(productIdStr)) {
  //     const success = await handleAddToCart(product);
  //     if (!success) return;
  //   }
  //   navigate("/checkout", { state: { product } });
  // };


  
  // ✅ BUY NOW
  const handleBuyNow = (product) => {
    checkAuthAndExecute(async (token) => {
      if (!cartProductIds.includes(String(product.id))) {
        try {
          await fetch("http://localhost:5000/api/customer/cart/add", {
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

  // ✅ WISHLIST
  const handleToggleWishlist = async (product) => {
    if (!checkAuthAndExecute()) return;
    const token = localStorage.getItem("token");
    const isWishlisted = wishlistProductIds.includes(String(product.id));

    try {
      if (isWishlisted) {
        const res = await fetch("http://localhost:5000/api/customer/wishlist", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const wishlistItem = data.wishlist?.find(
          (w) => String(w.productId) === String(product.id)
        );

        if (wishlistItem) {
          const delRes = await fetch(
            `http://localhost:5000/api/customer/wishlist/remove/${wishlistItem._id}`,
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
        const response = await fetch("http://localhost:5000/api/customer/wishlist/add", {
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
  };

  const handleClearAllFilters = () => {
    setPriceFilter(5000);
    setSearchQuery("");
    setSelectedCategory({ bridal: true, groom: true });
    setSelectedMaterials({ Pashmina: false, Wool: false, "Silk Blend": false });
  };

  return (
    <div className="Customer_container1 bg-light pb-5">
      <ToastContainer />

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
            placeholder="Search wedding gifts..."
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

      <div className="mb-4">
        <div
          className="p-4 p-md-5 text-white rounded position-relative overflow-hidden d-flex align-items-center justify-content-between shadow-sm Customer_wedding-banner"
          style={{
            backgroundImage: `url(${weddingBgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "360px"
          }}
        >
          <div style={{ maxWidth: "600px", zIndex: 2 }}>
            <h1 className="fw-bold display-6 fst-italic text-white">Wedding Gifts Collection</h1>
            <p className="text-light opacity-95 small mb-3">
              Make weddings memorable with our grand and elegant traditional shawls. Specially curated bridal and groom collections with luxury packaging.
            </p>
            <button onClick={() => navigate("/customer")} className="btn btn-sm px-4 py-2 fw-bold shadow-sm bg-white text-dark" style={{ borderRadius: "6px" }}>
              Explore Collection
            </button>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">

          <div className="col-lg-3 mb-4">
            <div className="d-block d-lg-none mb-2">
              <button
                className="btn w-100 d-flex justify-content-between align-items-center py-2 text-white"
                style={{ backgroundColor: "#06080e" }}
                type="button"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <span>🔍 Filter Wedding Products</span>
                <span>{isFilterOpen ? "▲" : "▼"}</span>
              </button>
            </div>

            <div className={`bg-white p-3 rounded shadow-sm border ${!isFilterOpen ? "d-none d-lg-block" : "d-block"}`}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold mb-0">Filters</h6>
                <span className="text-muted small" style={{ cursor: "pointer" }} onClick={handleClearAllFilters}>Clear All</span>
              </div>

              <div className="mb-3 border-bottom pb-3">
                <label className="fw-bold small mb-2 d-block">Category</label>
                <div className="form-check small mb-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={selectedCategory.bridal}
                    onChange={() => handleCategoryChange('bridal')}
                  />
                  <label className="form-check-label">Bridal Shawls</label>
                </div>
                <div className="form-check small">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={selectedCategory.groom}
                    onChange={() => handleCategoryChange('groom')}
                  />
                  <label className="form-check-label">Groom Shawls</label>
                </div>
              </div>

              <div className="mb-3 border-bottom pb-3">
                <label className="fw-bold small mb-2 d-block">Price Range</label>
                <input type="range" className="form-range" min="1500" max="5000" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} />
                <div className="d-flex justify-content-between text-muted small">
                  <span>₹1500</span>
                  <span>₹{priceFilter}</span>
                </div>
              </div>

              <div>
                <label className="fw-bold small mb-2 d-block">Material</label>
                <div className="d-flex flex-column gap-1 small">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={selectedMaterials.Pashmina}
                      onChange={() => handleMaterialChange('Pashmina')}
                    />
                    <label className="form-check-label">Pashmina</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={selectedMaterials.Wool}
                      onChange={() => handleMaterialChange('Wool')}
                    />
                    <label className="form-check-label">Wool</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={selectedMaterials["Silk Blend"]}
                      onChange={() => handleMaterialChange('Silk Blend')}
                    />
                    <label className="form-check-label">Silk Blend</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-9">
            <div className="d-flex justify-content-between align-items-center mb-3 bg-white p-2 px-3 rounded shadow-sm border">
              <span className="text-muted small">Showing 1–{displayedWeddingShawls.length} products</span>
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
              {displayedWeddingShawls.length > 0 ? (
                displayedWeddingShawls.map((item) => {
                  const productIdStr = String(item.id);
                  const isInCart = cartProductIds.includes(productIdStr);
                  const isWishlisted = wishlistProductIds.includes(productIdStr);

                  return (
                    <div className="col-12 col-sm-6 col-md-4" key={productIdStr}>
                      <div className="Customer_card card h-100 border-0 shadow-sm d-flex flex-column justify-content-between p-2 position-relative" style={{ backgroundColor: "#fff", borderRadius: "12px" }}>

                        {/* <div className="Customer_product-image-box overflow-hidden position-relative">
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
                        </div> */}


                        <div className="Customer_product-image-box card overflow-hidden position-relative">
                                                                          
                                                                          {/* ✅ Brand Logo Display */}
                                                                          {item.brandLogo && (
                                                                            <div 
                                                                              className="position-absolute shadow-sm rounded-circle overflow-hidden bg-white d-flex align-items-center justify-content-center"
                                                                              style={{
                                                                                top: "10px",
                                                                                left: "10px",
                                                                                width: "50px",
                                                                                height: "50px",
                                                                                zIndex: 3,
                                                                                border: "1.5px solid #fff"
                                                                              }}
                                                                              title="Brand Logo"
                                                                            >
                                                                              <img
                                                                                src={
                                                                                  item.brandLogo.startsWith("http") 
                                                                                    ? item.brandLogo 
                                                                                    : `http://localhost:5000/${item.brandLogo}`
                                                                                }
                                                                                alt="Brand Logo"
                                                                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                                              />
                                                                            </div>
                                                                          )}
                                                                        
                                                                          {/* Discount Badge */}
                                                                          {item.discount && (
                                                                            <span
                                                                              className="badge bg-danger position-absolute start-0 m-2 px-2 py-1 shadow-sm fw-bold"
                                                                              style={{
                                                                                top: item.brandLogo ? "54px" : "0px", // Agar brand logo hoga toh badge thoda niche shift ho jayega
                                                                                zIndex: 2,
                                                                                fontSize: "0.75rem",
                                                                                borderRadius: "6px",
                                                                              }}
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
                                                                            onClick={() => setShareProduct(item)}
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
                              <span className="fw-bold fs-6 text-danger">{item.price}</span>
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
                                <button onClick={() => handleAddToCart(item)} className="btn btn-dark btn-sm w-50 fw-semibold text-white" style={{ fontSize: "0.75rem", backgroundColor: "#2b8323", border: "none", borderRadius: "6px" }}>
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
                  <p className="text-muted fs-5">No wedding products found matching your search or filters.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      <div className="container my-5">
        <div className="bg-white p-3 rounded shadow-sm border d-flex flex-wrap justify-content-around text-center gap-3">
          <div className="d-flex align-items-center gap-2">
            <FaGift className="fs-3 text-success" />
            <div className="text-start">
              <h6 className="fw-bold mb-0 small">Bridal Gift Packaging</h6>
              <small className="text-muted" style={{ fontSize: "0.7rem" }}>Special grand royal boxes</small>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <FaCommentAlt className="fs-3 text-success" />
            <div className="text-start">
              <h6 className="fw-bold mb-0 small">Custom Wedding Note</h6>
              <small className="text-muted" style={{ fontSize: "0.7rem" }}>Personalized wishes included</small>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <FaShippingFast className="fs-3 text-success" />
            <div className="text-start">
              <h6 className="fw-bold mb-0 small">Express Delivery</h6>
              <small className="text-muted" style={{ fontSize: "0.7rem" }}>Timely delivery for events</small>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <FaUndo className="fs-3 text-success" />
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

export default WeddingGifts;