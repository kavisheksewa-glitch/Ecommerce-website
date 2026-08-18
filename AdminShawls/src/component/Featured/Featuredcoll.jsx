// import React, { useState, useEffect } from "react";
// import axios from "axios";
// //import image112 from "../assets/featured.png"; // Yahan apni featured image ka path check kar lein
// import image112 from "../../assets/featured.png";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaShareAlt, FaLink, FaHeart } from "react-icons/fa";
// import {
//   WhatsappShareButton, FacebookShareButton, TwitterShareButton, EmailShareButton,
//   WhatsappIcon, FacebookIcon, TwitterIcon, EmailIcon,
// } from "react-share";
// import "./Featuredcol.css"; // Apni CSS file ka naam confirm kar lein
// import { featuredShawls } from "../../data/shawls"; // Apni data file confirm kar lein

// function Featuredcoll() {
//   const navigate = useNavigate();
//   const [allProducts, setAllProducts] = useState([...featuredShawls]);
//   const [shareProduct, setShareProduct] = useState(null);
//   const [cartProductIds, setCartProductIds] = useState([]);
//   const [wishlistProductIds, setWishlistProductIds] = useState([]);
//   const userId = localStorage.getItem("userId") || "guest_user_id";

//   useEffect(() => {
//     // 1. Fetch Database Products and Merge
//     axios.get("http://localhost:5000/api/seller/products/public")
//       .then((res) => {
//         if (Array.isArray(res.data)) {
//           const dbProducts = res.data
//             .filter((p) => p.category === "Featured Shawls") // Yahan category match honi chahiye
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
//             }));
//           setAllProducts([...featuredShawls, ...dbProducts]);
//         }
//       })
//       .catch((err) => console.error("Error fetching live products:", err));

//     // 2. Fetch Cart
//     fetch(`http://localhost:5000/api/shawls/cart/${userId}`)
//       .then((res) => res.json())
//       .then((data) => { if (Array.isArray(data)) setCartProductIds(data.map((item) => String(item.productId))); })
//       .catch((err) => console.error("Cart fetch error", err));

//     // 3. Fetch Wishlist
//     fetch(`http://localhost:5000/api/shawls/${userId}`)
//       .then((res) => res.json())
//       .then((data) => { if (Array.isArray(data)) setWishlistProductIds(data.map((item) => String(item.productId))); })
//       .catch((err) => console.error("Wishlist fetch error", err));
//   }, [userId]);

//   const handleAddToCart = async (product) => {
//     try {
//       const response = await fetch("http://localhost:5000/api/shawls/cart/add", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId, productId: product.id, title: product.title, description: product.description,
//           price: product.price, originalPrice: product.originalPrice || "",
//           discount: product.discount || "", image: product.image, quantity: 1,
//         }),
//       });
//       if (response.ok) {
//         toast.success(`${product.title} added to cart! 🛒`, { position: "top-right", autoClose: 1000 });
//         setCartProductIds((prev) => [...prev, String(product.id)]);
//         window.dispatchEvent(new Event("cartUpdated"));
//       } else { toast.error("Failed to add to cart"); }
//     } catch (err) { toast.error("Server connection failed"); }
//   };

//   const handleToggleWishlist = async (product) => {
//     const isWishlisted = wishlistProductIds.includes(String(product.id));
//     const endpoint = isWishlisted ? "remove" : "add";
//     try {
//       const response = await fetch(`http://localhost:5000/api/shawls/${endpoint}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId, productId: product.id, title: product.title, description: product.description, price: product.price, image: product.image }),
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
//       }
//     } catch (err) { toast.error("Error updating wishlist"); }
//   };

//   const handleBuyNow = async (product) => {
//     if (!cartProductIds.includes(String(product.id))) await handleAddToCart(product);
//     navigate("/checkout", { state: { product } });
//   };

//   return (
//     <div className="Customer_container1">
//       <ToastContainer />
//       <h1 className="Customer_luxury-title text-center my-4 fw-bold fst-italic" style={{ color: "#54411d" }}>FEATURED COLLECTION</h1>
//       <img src={image112} alt="Banner" className="Customer_hero-image w-100" />

//       <div className="container my-5">
//         <div className="row g-4">
//           {allProducts.map((item) => {
//             const pid = String(item.id);
//             const isInCart = cartProductIds.includes(pid);
//             const isWishlisted = wishlistProductIds.includes(pid);
//             return (
//               <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={pid}>
//                 <div className="Customer_card card h-100 border-0 shadow-sm p-2" style={{ backgroundColor: "#e4c893", borderRadius: "16px" }}>
//                   <div className="Customer_product-image-box overflow-hidden position-relative">
//                     {item.discount && <span className="badge bg-danger position-absolute top-0 start-0 m-2">{item.discount}</span>}
//                     <img src={item.image} className="card-img-top rounded Customer_product-image" alt={item.title} />
//                     <button className="Customer_share-btn" onClick={() => setShareProduct(item)}><FaShareAlt /></button>
//                     <button className="Customer_wishlist-btn" onClick={() => handleToggleWishlist(item)} style={{ position: "absolute", top: "10px", right: "50px", background: "white", borderRadius: "50%", width: "35px", height: "35px", color: isWishlisted ? "red" : "#ccc", border: "none" }}> <FaHeart /> </button>
//                   </div>
//                   <div className="card-body px-2 py-3 d-flex flex-column justify-content-between">
//                     <h6 className="fw-bold">{item.title}</h6>
//                     <p className="text-muted small mb-2">{item.description}</p>
//                     <div className="d-flex justify-content-between align-items-center mb-3">
//                       <span className="fw-bold fs-6 text-success">{item.price}</span>
//                       <span className="badge bg-white text-secondary border">{item.stock}</span>
//                     </div>
//                     <div className="d-flex flex-column gap-2 mt-auto">
//                       <div className="d-flex gap-2">
//                         <button onClick={() => navigate(`/product/${item.id}`, { state: { product: item } })} className="btn btn-outline-dark btn-sm w-50 fw-semibold" style={{ borderRadius: "8px" }}>View</button>
//                         {isInCart ? (
//                           <button onClick={() => navigate("/cart")} className="btn btn-sm w-50 fw-semibold text-white" style={{ backgroundColor: "#2b8a3e", border: "none", borderRadius: "8px" }}>Go to Cart ➔</button>
//                         ) : (
//                           <button onClick={() => handleAddToCart(item)} className="btn btn-dark btn-sm w-50 fw-semibold text-white" style={{ backgroundColor: "#166228", border: "none", borderRadius: "8px" }}>Add to Cart</button>
//                         )}
//                       </div>
//                       <button onClick={() => handleBuyNow(item)} className="btn btn-sm w-100 fw-bold text-white border-0 shadow-sm" style={{ background: "linear-gradient(135deg, #d6bd69 0%, #dfa00b 100%)", borderRadius: "8px" }}>⚡ Buy Now</button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Featuredcoll;





// new





// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import image112 from "../../assets/featured.png";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaShareAlt, FaLink, FaHeart } from "react-icons/fa";
// import {
//   WhatsappShareButton, FacebookShareButton, TwitterShareButton, EmailShareButton,
//   WhatsappIcon, FacebookIcon, TwitterIcon, EmailIcon,
// } from "react-share";
// import "./Featuredcol.css"; 
// import { featuredShawls } from "../../data/shawls"; 

// function Featuredcoll() {
//   const navigate = useNavigate();
//   const [allProducts, setAllProducts] = useState([...featuredShawls]);
//   const [shareProduct, setShareProduct] = useState(null);
//   const [cartProductIds, setCartProductIds] = useState([]);
//   const [wishlistProductIds, setWishlistProductIds] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const userId = localStorage.getItem("userId") || "guest_user_id";

//   useEffect(() => {
//     // 1. Fetch Database Products and Merge
//     axios.get("http://localhost:5000/api/seller/products/public")
//       .then((res) => {
//         if (Array.isArray(res.data)) {
//           const dbProducts = res.data
//             .filter((p) => p.category === "Featured Shawls") 
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
//             }));
//           setAllProducts([...featuredShawls, ...dbProducts]);
//         }
//       })
//       .catch((err) => console.error("Error fetching live products:", err));

//     // 2. Fetch Cart
//     fetch(`http://localhost:5000/api/shawls/cart/${userId}`)
//       .then((res) => res.json())
//       .then((data) => { if (Array.isArray(data)) setCartProductIds(data.map((item) => String(item.productId))); })
//       .catch((err) => console.error("Cart fetch error", err));

//     // 3. Fetch Wishlist
//     fetch(`http://localhost:5000/api/shawls/${userId}`)
//       .then((res) => res.json())
//       .then((data) => { if (Array.isArray(data)) setWishlistProductIds(data.map((item) => String(item.productId))); })
//       .catch((err) => console.error("Wishlist fetch error", err));
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

//   const displayedProducts = getProcessedProducts(allProducts);

//   const handleAddToCart = async (product) => {
//     try {
//       const response = await fetch("http://localhost:5000/api/shawls/cart/add", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId, productId: product.id, title: product.title, description: product.description,
//           price: product.price, originalPrice: product.originalPrice || "",
//           discount: product.discount || "", image: product.image, quantity: 1,
//         }),
//       });
//       if (response.ok) {
//         toast.success(`${product.title} added to cart! 🛒`, { position: "top-right", autoClose: 1000 });
//         setCartProductIds((prev) => [...prev, String(product.id)]);
//         window.dispatchEvent(new Event("cartUpdated"));
//       } else { toast.error("Failed to add to cart"); }
//     } catch (err) { toast.error("Server connection failed"); }
//   };

//   const handleToggleWishlist = async (product) => {
//     const isWishlisted = wishlistProductIds.includes(String(product.id));
//     const endpoint = isWishlisted ? "remove" : "add";
//     try {
//       const response = await fetch(`http://localhost:5000/api/shawls/${endpoint}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId, productId: product.id, title: product.title, description: product.description, price: product.price, image: product.image }),
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
//       }
//     } catch (err) { toast.error("Error updating wishlist"); }
//   };

//   const handleBuyNow = async (product) => {
//     if (!cartProductIds.includes(String(product.id))) await handleAddToCart(product);
//     navigate("/checkout", { state: { product } });
//   };

//   return (
//     <div className="Customer_container1">
//       <ToastContainer />
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
//             placeholder="Search featured shawls..."
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
//       <h1 className="Customer_luxury-title text-center my-4 fw-bold fst-italic" style={{ color: "#54411d" }}>FEATURED COLLECTION</h1>
//       <img src={image112} alt="Banner" className="Customer_hero-image w-100 mb-4" />

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
//             placeholder="Search featured shawls..."
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

//       <div className="container my-5">
//         <div className="row g-4">
//           {displayedProducts.length > 0 ? (
//             displayedProducts.map((item) => {
//               const pid = String(item.id);
//               const isInCart = cartProductIds.includes(pid);
//               const isWishlisted = wishlistProductIds.includes(pid);
//               return (
//                 <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={pid}>
//                   <div className="Customer_card card h-100 border-0 shadow-sm p-2" style={{ backgroundColor: "#e4c893", borderRadius: "16px" }}>
//                     <div className="Customer_product-image-box overflow-hidden position-relative">
//                       {item.discount && <span className="badge bg-danger position-absolute top-0 start-0 m-2">{item.discount}</span>}
//                       <img src={item.image} className="card-img-top rounded Customer_product-image" alt={item.title} />
//                       <button className="Customer_share-btn" onClick={() => setShareProduct(item)}><FaShareAlt /></button>
//                       <button className="Customer_wishlist-btn" onClick={() => handleToggleWishlist(item)} style={{ position: "absolute", top: "10px", right: "50px", background: "white", borderRadius: "50%", width: "35px", height: "35px", color: isWishlisted ? "red" : "#ccc", border: "none" }}> <FaHeart /> </button>
//                     </div>
//                     <div className="card-body px-2 py-3 d-flex flex-column justify-content-between">
//                       <h6 className="fw-bold">{item.title}</h6>
//                       <p className="text-muted small mb-2">{item.description}</p>
//                       <div className="d-flex justify-content-between align-items-center mb-3">
//                         <span className="fw-bold fs-6 text-success">{item.price}</span>
//                         <span className="badge bg-white text-secondary border">{item.stock}</span>
//                       </div>
//                       <div className="d-flex flex-column gap-2 mt-auto">
//                         <div className="d-flex gap-2">
//                           <button onClick={() => navigate(`/product/${item.id}`, { state: { product: item } })} className="btn btn-outline-dark btn-sm w-50 fw-semibold" style={{ borderRadius: "8px" }}>View</button>
//                           {isInCart ? (
//                             <button onClick={() => navigate("/cart")} className="btn btn-sm w-50 fw-semibold text-white" style={{ backgroundColor: "#2b8a3e", border: "none", borderRadius: "8px" }}>Go to Cart ➔</button>
//                           ) : (
//                             <button onClick={() => handleAddToCart(item)} className="btn btn-dark btn-sm w-50 fw-semibold text-white" style={{ backgroundColor: "#166228", border: "none", borderRadius: "8px" }}>Add to Cart</button>
//                           )}
//                         </div>
//                         <button onClick={() => handleBuyNow(item)} className="btn btn-sm w-100 fw-bold text-white border-0 shadow-sm" style={{ background: "linear-gradient(135deg, #d6bd69 0%, #dfa00b 100%)", borderRadius: "8px" }}>⚡ Buy Now</button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <div className="text-center py-5">
//               <p className="text-muted fs-5">No featured shawls found matching your search.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Featuredcoll;










// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import image112 from "../../assets/featured.png";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaShareAlt, FaLink, FaHeart } from "react-icons/fa";
// import {
//   WhatsappShareButton, FacebookShareButton, TwitterShareButton, EmailShareButton,
//   WhatsappIcon, FacebookIcon, TwitterIcon, EmailIcon,
// } from "react-share";
// import "./Featuredcol.css"; 
// import { featuredShawls } from "../../data/shawls"; 

// function Featuredcoll() {
//   const navigate = useNavigate();
//   const [allProducts, setAllProducts] = useState([...featuredShawls]);
//   const [shareProduct, setShareProduct] = useState(null);
//   const [cartProductIds, setCartProductIds] = useState([]);
//   const [wishlistProductIds, setWishlistProductIds] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
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

//   useEffect(() => {
//     // 1. Fetch Database Products and Merge
//     axios.get("http://localhost:5000/api/seller/products/public")
//       .then((res) => {
//         if (Array.isArray(res.data)) {
//           const dbProducts = res.data
//             .filter((p) => p.category === "Featured Shawls") 
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
//             }));
//           setAllProducts([...featuredShawls, ...dbProducts]);
//         }
//       })
//       .catch((err) => console.error("Error fetching live products:", err));

//     // 2. Fetch Cart
//     fetch(`http://localhost:5000/api/shawls/cart/${userId}`)
//       .then((res) => res.json())
//       .then((data) => { if (Array.isArray(data)) setCartProductIds(data.map((item) => String(item.productId))); })
//       .catch((err) => console.error("Cart fetch error", err));

//     // 3. Fetch Wishlist
//     fetch(`http://localhost:5000/api/shawls/${userId}`)
//       .then((res) => res.json())
//       .then((data) => { if (Array.isArray(data)) setWishlistProductIds(data.map((item) => String(item.productId))); })
//       .catch((err) => console.error("Wishlist fetch error", err));
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

//   const displayedProducts = getProcessedProducts(allProducts);

//   // ADD TO CART (With Auth Check)
//   const handleAddToCart = (product) => {
//     checkAuthAndExecute(async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/shawls/cart/add", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             userId: localStorage.getItem("userId"), 
//             productId: product.id, 
//             title: product.title, 
//             description: product.description,
//             price: product.price, 
//             originalPrice: product.originalPrice || "",
//             discount: product.discount || "", 
//             image: product.image, 
//             quantity: 1,
//           }),
//         });
//         if (response.ok) {
//           toast.success(`${product.title} added to cart! 🛒`, { position: "top-right", autoClose: 1000 });
//           setCartProductIds((prev) => [...prev, String(product.id)]);
//           window.dispatchEvent(new Event("cartUpdated"));
//         } else { toast.error("Failed to add to cart"); }
//       } catch (err) { toast.error("Server connection failed"); }
//     });
//   };

//   // WISHLIST (With Auth Check)
//   const handleToggleWishlist = (product) => {
//     checkAuthAndExecute(async () => {
//       const isWishlisted = wishlistProductIds.includes(String(product.id));
//       const endpoint = isWishlisted ? "remove" : "add";
//       try {
//         const response = await fetch(`http://localhost:5000/api/shawls/${endpoint}`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ 
//             userId: localStorage.getItem("userId"), 
//             productId: product.id, 
//             title: product.title, 
//             description: product.description, 
//             price: product.price, 
//             image: product.image 
//           }),
//         });
//         if (response.ok) {
//           if (isWishlisted) {
//             toast.info(`${product.title} removed from wishlist`, { autoClose: 1000 });
//             setWishlistProductIds((prev) => prev.filter((id) => id !== String(product.id)));
//           } else {
//             toast.success(`${product.title} added to wishlist ❤️`, { autoClose: 1000 });
//             setWishlistProductIds((prev) => [...prev, String(product.id)]);
//           }
//           window.dispatchEvent(new Event("wishlistUpdated"));
//         }
//       } catch (err) { toast.error("Error updating wishlist"); }
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
//               originalPrice: product.originalPrice || "",
//               discount: product.discount || "",
//               image: product.image,
//               quantity: 1,
//             }),
//           });
//         } catch (err) {
//           console.error(err);
//         }
//       }
//       navigate("/checkout", { state: { product } });
//     });
//   };

//   return (
//     <div className="Customer_container1">
//       <ToastContainer />
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
//             placeholder="Search featured shawls..."
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
//       <h1 className="Customer_luxury-title text-center my-4 fw-bold fst-italic" style={{ color: "#54411d" }}>FEATURED COLLECTION</h1>
//       <img src={image112} alt="Banner" className="Customer_hero-image w-100 mb-4" />

//       <div className="container my-5">
//         <div className="row g-4">
//           {displayedProducts.length > 0 ? (
//             displayedProducts.map((item) => {
//               const pid = String(item.id);
//               const isInCart = cartProductIds.includes(pid);
//               const isWishlisted = wishlistProductIds.includes(pid);
//               return (
//                 <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={pid}>
//                   <div className="Customer_card card h-100 border-0 shadow-sm p-2" style={{ backgroundColor: "#e4c893", borderRadius: "16px" }}>
//                     <div className="Customer_product-image-box overflow-hidden position-relative">
//                       {item.discount && <span className="badge bg-danger position-absolute top-0 start-0 m-2">{item.discount}</span>}
//                       <img src={item.image} className="card-img-top rounded Customer_product-image" alt={item.title} />
//                       <button className="Customer_share-btn" onClick={() => setShareProduct(item)}><FaShareAlt /></button>
//                       <button className="Customer_wishlist-btn" onClick={() => handleToggleWishlist(item)} style={{ position: "absolute", top: "10px", right: "50px", background: "white", borderRadius: "50%", width: "35px", height: "35px", color: isWishlisted ? "red" : "#ccc", border: "none" }}> <FaHeart /> </button>
//                     </div>
//                     <div className="card-body px-2 py-3 d-flex flex-column justify-content-between">
//                       <h6 className="fw-bold">{item.title}</h6>
//                       <p className="text-muted small mb-2">{item.description}</p>
//                       <div className="d-flex justify-content-between align-items-center mb-3">
//                         <span className="fw-bold fs-6 text-success">{item.price}</span>
//                         <span className="badge bg-white text-secondary border">{item.stock}</span>
//                       </div>
//                       <div className="d-flex flex-column gap-2 mt-auto">
//                         <div className="d-flex gap-2">
//                           <button onClick={() => navigate(`/product/${item.id}`, { state: { product: item } })} className="btn btn-outline-dark btn-sm w-50 fw-semibold" style={{ borderRadius: "8px" }}>View</button>
//                           {isInCart ? (
//                             <button onClick={() => navigate("/cart")} className="btn btn-sm w-50 fw-semibold text-white" style={{ backgroundColor: "#2b8a3e", border: "none", borderRadius: "8px" }}>Go to Cart ➔</button>
//                           ) : (
//                             <button onClick={() => handleAddToCart(item)} className="btn btn-dark btn-sm w-50 fw-semibold text-white" style={{ backgroundColor: "#166228", border: "none", borderRadius: "8px" }}>Add to Cart</button>
//                           )}
//                         </div>
//                         <button onClick={() => handleBuyNow(item)} className="btn btn-sm w-100 fw-bold text-white border-0 shadow-sm" style={{ background: "linear-gradient(135deg, #d6bd69 0%, #dfa00b 100%)", borderRadius: "8px" }}>⚡ Buy Now</button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <div className="text-center py-5">
//               <p className="text-muted fs-5">No featured shawls found matching your search.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Featuredcoll;






// nnnnnnnnnn









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

  // FILTER, SORT & PAGINATION STATES
  const [selectedFabric, setSelectedFabric] = useState("All");
  const [selectedColor, setSelectedColor] = useState("All");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

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
    // 1. Fetch Database Products and Merge with Static Products
    axios.get("http://localhost:5000/api/seller/products/public")
      .then((res) => {
        if (Array.isArray(res.data)) {
          const dbProducts = res.data
            .filter((p) => p.category === "Featured Shawls") 
            .map((p, index) => ({
              id: p._id,
              title: p.productName,
              description: p.description,
              price: `₹${p.price}`,
              rawPrice: Number(p.price) || 0,
              originalPrice: p.discount ? `₹${Math.round(p.price * (1 + p.discount / 100))}` : "",
              discount: p.discount ? `${p.discount}% OFF` : null,
              image: `http://localhost:5000/${p.productImage}`,
              stock: `Stock: ${p.stockQuantity}`,
              fabric: p.fabric || "N/A",
              color: p.color || "N/A",
              size: p.size || "N/A",
              careInstructions: p.washCare || "N/A",
              createdAt: p.createdAt ? new Date(p.createdAt).getTime() : index,
            }));

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

    // 2. Fetch Cart Items
    fetch(`http://localhost:5000/api/shawls/cart/${userId}`)
      .then((res) => res.json())
      .then((data) => { 
        if (Array.isArray(data)) {
          setCartProductIds(data.map((item) => String(item.productId))); 
        }
      })
      .catch((err) => console.error("Cart fetch error", err));

    // 3. Fetch Wishlist Items
    fetch(`http://localhost:5000/api/shawls/${userId}`)
      .then((res) => res.json())
      .then((data) => { 
        if (Array.isArray(data)) {
          setWishlistProductIds(data.map((item) => String(item.productId))); 
        }
      })
      .catch((err) => console.error("Wishlist fetch error", err));
  }, [userId]);

  // EXTRACT UNIQUE FABRICS & COLORS
  const fabrics = [...new Set(allProducts.map((p) => p.fabric).filter((f) => f && f !== "N/A"))];
  const colors = ["All", ...new Set(allProducts.map((p) => p.color).filter((c) => c && c !== "N/A"))];

  // SEARCH, FILTER & SORT LOGIC
  const getProcessedProducts = () => {
    let list = [...allProducts];

    // Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      list = list.filter((item) => item.title?.toLowerCase().includes(query));
    }

    // Fabric Filter
    if (selectedFabric !== "All") {
      list = list.filter((item) => item.fabric === selectedFabric);
    }

    // Color Filter
    if (selectedColor !== "All") {
      list = list.filter((item) => item.color === selectedColor);
    }

    // Price Range Filter
    list = list.filter((item) => item.rawPrice <= maxPrice);

    // Sorting
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

  // PAGINATION LOGIC
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Reset to page 1 if filter/search changes
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
          toast.success(`${product.title} added to cart! 🛒`, { position: "top-right", autoClose: 1000 });
          setCartProductIds((prev) => [...prev, String(product.id)]);
          window.dispatchEvent(new Event("cartUpdated"));
        } else { toast.error("Failed to add to cart"); }
      } catch (err) { toast.error("Server connection failed"); }
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
            image: product.image 
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
        }
      } catch (err) { toast.error("Error updating wishlist"); }
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

      {/* SEARCH BAR SECTION */}
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

      <h1 className="Customer_luxury-title text-center my-4 fw-bold fst-italic" style={{ color: "#54411d" }}>FEATURED COLLECTION</h1>
      <img src={image112} alt="Banner" className="Customer_hero-image w-100 mb-4" />

      {/* TOP BAR: SHOWING PRODUCTS & FILTERS/SORTING */}
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

        {/* Collapsible Filter Panel */}
        {showFilters && (
          <div className="row g-3 mt-2 p-4 bg-white border rounded-4 shadow-sm position-relative">
            <button
              type="button"
              className="btn-close position-absolute top-0 end-0 m-3"
              aria-label="Close"
              onClick={() => setShowFilters(false)}
            ></button>

            <h5 className="fw-bold mb-3">Filter Options</h5>

            {/* Price Range Slider */}
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

            {/* Material / Fabric Radios */}
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

      {/* PRODUCTS GRID */}
      <div className="container my-5">
        <div className="row g-4">
          {currentProducts.length > 0 ? (
            currentProducts.map((item) => {
              const pid = String(item.id);
              const isInCart = cartProductIds.includes(pid);
              const isWishlisted = wishlistProductIds.includes(pid);

              return (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={pid}>
                  <div className="Customer_card card h-100 border-0 shadow-sm p-2" style={{ backgroundColor: "#e4c893", borderRadius: "16px" }}>
                    <div className="Customer_product-image-box overflow-hidden position-relative">
                      {item.discount && (
                        <span
                          className="badge bg-danger position-absolute top-0 start-0 m-2 px-2 py-1 shadow-sm fw-bold"
                          style={{ zIndex: 2, fontSize: "0.75rem", borderRadius: "6px" }}
                        >
                          {item.discount}
                        </span>
                      )}

                      <img src={item.image} className="card-img-top rounded Customer_product-image" alt={item.title} />

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
                          borderRadius: "50%",
                          width: "35px",
                          height: "35px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                          color: isWishlisted ? "red" : "#ccc",
                          border: "none",
                          zIndex: 2,
                        }}
                      >
                        <FaHeart />
                      </button>
                    </div>

                    <div className="card-body px-2 py-3 d-flex flex-column justify-content-between">
                      <div>
                        <h6 className="fw-bold mb-1 text-dark" style={{ fontSize: "0.95rem", lineHeight: "1.3" }}>
                          {item.title}
                        </h6>

                        <p
                          className="text-muted small mb-2"
                          style={{
                            fontSize: "0.82rem",
                            lineHeight: "1.4",
                            minHeight: "2.6em",
                            display: "-webkit-box",
                            WebkitLineClamp: "2",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {item.description}
                        </p>

                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <div className="d-flex align-items-center gap-2">
                            <span className="fw-bold fs-6 text-success">{item.price}</span>
                            {item.originalPrice && (
                              <span className="text-decoration-line-through text-muted" style={{ fontSize: "0.8rem" }}>
                                {item.originalPrice}
                              </span>
                            )}
                          </div>
                          <span className="badge bg-white text-secondary border fw-normal" style={{ fontSize: "0.7rem" }}>
                            {item.stock}
                          </span>
                        </div>
                      </div>

                      <div className="d-flex flex-column gap-2 mt-auto">
                        <div className="d-flex gap-2">
                          <button
                            onClick={() => navigate(`/product/${item.id}`, { state: { product: item } })}
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
                          style={{ background: "linear-gradient(135deg, #d6bd69 0%, #dfa00b 100%)", borderRadius: "8px" }}
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
            <div className="text-center py-5">
              <p className="text-muted fs-5">No featured shawls found matching your filters.</p>
              <button className="btn btn-outline-dark btn-sm mt-2" onClick={resetFilters}>
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* PAGINATION CONTROLS */}
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