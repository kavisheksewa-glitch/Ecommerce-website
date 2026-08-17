// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import image13 from "../../assets/men.png";
// import { useNavigate } from "react-router-dom";
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
// import "./men.css";
// import { menShawls } from "../../data/shawls";

// function Men() {
//   const navigate = useNavigate();
//   // Static products ko initial state mein rakha hai
//   const [allProducts, setAllProducts] = useState([...menShawls]);
//   const [shareProduct, setShareProduct] = useState(null);
//   const [cartProductIds, setCartProductIds] = useState([]);
//   const [wishlistProductIds, setWishlistProductIds] = useState([]);
//   const userId = localStorage.getItem("userId") || "guest_user_id";

//   useEffect(() => {
//     // 1. Fetch Database Products and Merge with Static Products
//     axios.get("http://localhost:5000/api/seller/products/public")
//       .then((res) => {
//         if (Array.isArray(res.data)) {
//           const dbProducts = res.data
//             .filter((p) => p.category === "Men's Shawls")
//             .map((p) => ({
//               id: p._id,
//               title: p.productName,
//               description: p.description,
//               price: `₹${p.price}`,
//               originalPrice: p.discount ? `₹${Math.round(p.price * (1 + p.discount / 100))}` : "",
//               discount: p.discount ? `${p.discount}% OFF` : null,
//               image: `http://localhost:5000/${p.productImage}`,
//               stock: `Stock: ${p.stockQuantity}`,
//              fabric:  p.fabric || "N/A",
//               color: p.color || "N/A",
//               size:  p.size || "N/A",
//               careInstructions: p.washCare || "N/A",
//             }));

//           // Static products + Database products ko ek sath combine kar diya
//           setAllProducts([...menShawls, ...dbProducts]);
//         }
//       })
//       .catch((err) => console.error("Error fetching live products:", err));

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
//     fetch(`http://localhost:5000/api/shawls/${userId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (Array.isArray(data)) {
//           const ids = data.map((item) => String(item.productId));
//           setWishlistProductIds(ids);
//         }
//       })
//       .catch((err) => console.error("Error fetching wishlist items:", err));
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

//   const handleShare = (product) => {
//     setShareProduct(product);
//   };

//   return (
//     <div className="Customer_container1">
//       <ToastContainer />

//       {shareProduct && (
//         <div className="Customer_share-overlay">
//           <div className="Customer_share-modal">
//             <h4 className="fw-bold mb-1">Share Product</h4>
//             <p className="text-muted small">{shareProduct.title}</p>

//             <div className="Customer_share-icons">
//               <WhatsappShareButton url={`${window.location.origin}/product/${shareProduct.id}`}>
//                 <WhatsappIcon size={46} round />
//               </WhatsappShareButton>

//               <FacebookShareButton url={`${window.location.origin}/product/${shareProduct.id}`}>
//                 <FacebookIcon size={46} round />
//               </FacebookShareButton>

//               <TwitterShareButton url={`${window.location.origin}/product/${shareProduct.id}`}>
//                 <TwitterIcon size={46} round />
//               </TwitterShareButton>

//               <EmailShareButton url={`${window.location.origin}/product/${shareProduct.id}`}>
//                 <EmailIcon size={46} round />
//               </EmailShareButton>
//             </div>

//             <button className="Customer_copy-btn" onClick={copyLink}>
//               <FaLink className="me-2" /> Copy Link
//             </button>

//             <button className="Customer_close-btn" onClick={() => setShareProduct(null)}>
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//         {/* <img src={image13} alt="Kavi Shawls Banner" className="Customer_hero1-image w-100" /> */}
//       <div className="Customer_luxury-title-wrapper">
//         <h1 className="Customer_luxury-title text-center my-4 fw-bold fst-italic" style={{ color: "#54411d" }}>
//           MEN'S SHAWLS
//         </h1>
//       </div>

//       <img src={image13} alt="Kavi Shawls Banner" className="Customer_hero1-image w-100" />

//       {/* Ek hi single container/row ke andar saare products (Static + Live) render honge */}
//       <div className="container my-5">
//         <div className="row g-4">
//           {allProducts.map((item) => {
//             const productIdStr = String(item.id);
//             const isInCart = cartProductIds.includes(productIdStr);
//             const isWishlisted = wishlistProductIds.includes(productIdStr);

//             return (
//               <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={productIdStr}>
//                 <div
//                   className="Customer_card card h-100 border-0 shadow-sm d-flex flex-column justify-content-between p-2 position-relative"
//                   style={{ backgroundColor: "#e4c893", borderRadius: "16px" }}
//                 >
//                   <div className="Customer_product-image-box overflow-hidden position-relative">
//                     {item.discount && (
//                       <span
//                         className="badge bg-danger position-absolute top-0 start-0 m-2 px-2 py-1 shadow-sm fw-bold"
//                         style={{ zIndex: 2, fontSize: "0.75rem", borderRadius: "6px" }}
//                       >
//                         {item.discount}
//                       </span>
//                     )}

//                     <img src={item.image} className="card-img-top rounded Customer_product-image" alt={item.title} />
                    
//                     <button className="Customer_share-btn" onClick={() => handleShare(item)} title="Share Product">
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

//                   <div className="card-body px-2 py-3 d-flex flex-column justify-content-between">
//                     <div>
//                       <h6 className="fw-bold mb-1 text-dark" style={{ fontSize: "0.95rem", lineHeight: "1.3" }}>
//                         {item.title}
//                       </h6>

//                       <p
//                         className="text-muted small mb-2"
//                         style={{
//                           fontSize: "0.82rem",
//                           lineHeight: "1.4",
//                           minHeight: "2.6em",
//                           display: "-webkit-box",
//                           WebkitLineClamp: "2",
//                           WebkitBoxOrient: "vertical",
//                           overflow: "hidden",
//                         }}
//                       >
//                         {item.description}
//                       </p>

//                       <div className="d-flex justify-content-between align-items-center mb-3">
//                         <div className="d-flex align-items-center gap-2">
//                           <span className="fw-bold fs-6 text-success">{item.price}</span>

//                           {item.originalPrice && (
//                             <span className="text-decoration-line-through text-muted" style={{ fontSize: "0.8rem" }}>
//                               {item.originalPrice}
//                             </span>
//                           )}
//                         </div>

//                         <span className="badge bg-white text-secondary border fw-normal" style={{ fontSize: "0.7rem" }}>
//                           {item.stock}
//                         </span>
//                       </div>
//                     </div>

//                     <div className="d-flex flex-column gap-2 mt-auto">
//                       <div className="d-flex gap-2">
//                         <button
//                           onClick={() => navigate(`/product/${item.id}`, { state: { product: item } })}
//                           className="btn btn-outline-dark btn-sm w-50 fw-semibold"
//                           style={{ borderRadius: "8px" }}
//                         >
//                           View
//                         </button>

//                         {isInCart ? (
//                           <button
//                             onClick={() => navigate("/cart")}
//                             className="btn btn-sm w-50 fw-semibold text-white"
//                             style={{ backgroundColor: "#2b8a3e", border: "none", borderRadius: "8px" }}
//                           >
//                             Go to Cart ➔
//                           </button>
//                         ) : (
//                           <button
//                             onClick={() => handleAddToCart(item)}
//                             className="btn btn-dark btn-sm w-50 fw-semibold text-white"
//                             style={{ backgroundColor: "#166228", border: "none", borderRadius: "8px" }}
//                           >
//                             Add to Cart
//                           </button>
//                         )}
//                       </div>

//                       <button
//                         onClick={() => handleBuyNow(item)}
//                         className="btn btn-sm w-100 fw-bold text-white border-0 shadow-sm"
//                         style={{
//                           background: "linear-gradient(135deg, #d6bd69 0%, #dfa00b 100%)",
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
//       </div>
//     </div>
//   );
// }

// export default Men;



// new









// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import image13 from "../../assets/men.png";
// import { useNavigate } from "react-router-dom";
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
// import "./men.css";
// import { menShawls } from "../../data/shawls";

// function Men() {
//   const navigate = useNavigate();
//   const [allProducts, setAllProducts] = useState([...menShawls]);
//   const [shareProduct, setShareProduct] = useState(null);
//   const [cartProductIds, setCartProductIds] = useState([]);
//   const [wishlistProductIds, setWishlistProductIds] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const userId = localStorage.getItem("userId") || "guest_user_id";

//   useEffect(() => {
//     // 1. Fetch Database Products and Merge with Static Products
//     axios
//       .get("http://localhost:5000/api/seller/products/public")
//       .then((res) => {
//         if (Array.isArray(res.data)) {
//           const dbProducts = res.data
//             .filter((p) => p.category === "Men's Shawls")
//             .map((p) => ({
//               id: p._id,
//               title: p.productName,
//               description: p.description,
//               price: `₹${p.price}`,
//               originalPrice: p.discount
//                 ? `₹${Math.round(p.price * (1 + p.discount / 100))}`
//                 : "",
//               discount: p.discount ? `${p.discount}% OFF` : null,
//               image: `http://localhost:5000/${p.productImage}`,
//               stock: `Stock: ${p.stockQuantity}`,
//               fabric: p.fabric || "N/A",
//               color: p.color || "N/A",
//               size: p.size || "N/A",
//               careInstructions: p.washCare || "N/A",
//             }));

//           setAllProducts([...menShawls, ...dbProducts]);
//         }
//       })
//       .catch((err) => console.error("Error fetching live products:", err));

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
//     fetch(`http://localhost:5000/api/shawls/${userId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (Array.isArray(data)) {
//           const ids = data.map((item) => String(item.productId));
//           setWishlistProductIds(ids);
//         }
//       })
//       .catch((err) => console.error("Error fetching wishlist items:", err));
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
//       const response = await fetch(
//         `http://localhost:5000/api/shawls/${endpoint}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             userId: userId,
//             productId: product.id,
//             title: product.title,
//             description: product.description,
//             price: product.price,
//             originalPrice: product.originalPrice || "",
//             discount: product.discount || "",
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

//   const handleBuyNow = async (product) => {
//     if (!cartProductIds.includes(String(product.id))) {
//       await handleAddToCart(product);
//     }
//     navigate("/checkout", { state: { product } });
//   };

//   const handleShare = (product) => {
//     setShareProduct(product);
//   };

//   return (
//     <div className="Customer_container1">
//       <ToastContainer />

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
//               <FaLink className="me-2" /> Copy Link
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
// {/* 
//       <div className="Customer_luxury-title-wrapper">
//         <h1
//           className="Customer_luxury-title text-center my-4 fw-bold fst-italic"
//           style={{ color: "#54411d" }}
//         >
//           MEN'S SHAWLS
//         </h1>
//       </div>

//       <img
//         src={image13}
//         alt="Kavi Shawls Banner"
//         className="Customer_hero1-image w-100 mb-4"
//       /> */}

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
//             placeholder="Search men's shawls..."
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


//       <div className="Customer_luxury-title-wrapper">
//         <h1
//           className="Customer_luxury-title text-center my-4 fw-bold fst-italic"
//           style={{ color: "#54411d" }}
//         >
//           MEN'S SHAWLS
//         </h1>
//       </div>

//       <img
//         src={image13}
//         alt="Kavi Shawls Banner"
//         className="Customer_hero1-image w-100 mb-4"
//       />

//       <div className="container my-5">
//         <div className="row g-4">
//           {displayedProducts.length > 0 ? (
//             displayedProducts.map((item) => {
//               const productIdStr = String(item.id);
//               const isInCart = cartProductIds.includes(productIdStr);
//               const isWishlisted = wishlistProductIds.includes(productIdStr);

//               return (
//                 <div
//                   className="col-12 col-sm-6 col-md-4 col-lg-3"
//                   key={productIdStr}
//                 >
//                   <div
//                     className="Customer_card card h-100 border-0 shadow-sm d-flex flex-column justify-content-between p-2 position-relative"
//                     style={{ backgroundColor: "#e4c893", borderRadius: "16px" }}
//                   >
//                     <div className="Customer_product-image-box overflow-hidden position-relative">
//                       {item.discount && (
//                         <span
//                           className="badge bg-danger position-absolute top-0 start-0 m-2 px-2 py-1 shadow-sm fw-bold"
//                           style={{
//                             zIndex: 2,
//                             fontSize: "0.75rem",
//                             borderRadius: "6px",
//                           }}
//                         >
//                           {item.discount}
//                         </span>
//                       )}

//                       <img
//                         src={item.image}
//                         className="card-img-top rounded Customer_product-image"
//                         alt={item.title}
//                       />

//                       <button
//                         className="Customer_share-btn"
//                         onClick={() => handleShare(item)}
//                         title="Share Product"
//                       >
//                         <FaShareAlt />
//                       </button>

//                       <button
//                         className="Customer_wishlist-btn"
//                         onClick={() => handleToggleWishlist(item)}
//                         title="Wishlist Product"
//                         style={{
//                           position: "absolute",
//                           top: "10px",
//                           right: "50px",
//                           background: "white",
//                           border: "none",
//                           borderRadius: "50%",
//                           width: "35px",
//                           height: "35px",
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           cursor: "pointer",
//                           boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
//                           color: isWishlisted ? "red" : "#ccc",
//                           transition: "color 0.2s ease",
//                           zIndex: 2,
//                         }}
//                       >
//                         <FaHeart />
//                       </button>
//                     </div>

//                     <div className="card-body px-2 py-3 d-flex flex-column justify-content-between">
//                       <div>
//                         <h6
//                           className="fw-bold mb-1 text-dark"
//                           style={{ fontSize: "0.95rem", lineHeight: "1.3" }}
//                         >
//                           {item.title}
//                         </h6>

//                         <p
//                           className="text-muted small mb-2"
//                           style={{
//                             fontSize: "0.82rem",
//                             lineHeight: "1.4",
//                             minHeight: "2.6em",
//                             display: "-webkit-box",
//                             WebkitLineClamp: "2",
//                             WebkitBoxOrient: "vertical",
//                             overflow: "hidden",
//                           }}
//                         >
//                           {item.description}
//                         </p>

//                         <div className="d-flex justify-content-between align-items-center mb-3">
//                           <div className="d-flex align-items-center gap-2">
//                             <span className="fw-bold fs-6 text-success">
//                               {item.price}
//                             </span>

//                             {item.originalPrice && (
//                               <span
//                                 className="text-decoration-line-through text-muted"
//                                 style={{ fontSize: "0.8rem" }}
//                               >
//                                 {item.originalPrice}
//                               </span>
//                             )}
//                           </div>

//                           <span
//                             className="badge bg-white text-secondary border fw-normal"
//                             style={{ fontSize: "0.7rem" }}
//                           >
//                             {item.stock}
//                           </span>
//                         </div>
//                       </div>

//                       <div className="d-flex flex-column gap-2 mt-auto">
//                         <div className="d-flex gap-2">
//                           <button
//                             onClick={() =>
//                               navigate(`/product/${item.id}`, {
//                                 state: { product: item },
//                               })
//                             }
//                             className="btn btn-outline-dark btn-sm w-50 fw-semibold"
//                             style={{ borderRadius: "8px" }}
//                           >
//                             View
//                           </button>

//                           {isInCart ? (
//                             <button
//                               onClick={() => navigate("/cart")}
//                               className="btn btn-sm w-50 fw-semibold text-white"
//                               style={{
//                                 backgroundColor: "#2b8a3e",
//                                 border: "none",
//                                 borderRadius: "8px",
//                               }}
//                             >
//                               Go to Cart ➔
//                             </button>
//                           ) : (
//                             <button
//                               onClick={() => handleAddToCart(item)}
//                               className="btn btn-dark btn-sm w-50 fw-semibold text-white"
//                               style={{
//                                 backgroundColor: "#166228",
//                                 border: "none",
//                                 borderRadius: "8px",
//                               }}
//                             >
//                               Add to Cart
//                             </button>
//                           )}
//                         </div>

//                         <button
//                           onClick={() => handleBuyNow(item)}
//                           className="btn btn-sm w-100 fw-bold text-white border-0 shadow-sm"
//                           style={{
//                             background:
//                               "linear-gradient(135deg, #d6bd69 0%, #dfa00b 100%)",
//                             borderRadius: "8px",
//                           }}
//                         >
//                           ⚡ Buy Now
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <div className="text-center py-5">
//               <p className="text-muted fs-5">No men's shawls found matching your search.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Men;







// newwwwwwww






// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import image13 from "../../assets/men.png";
// import { useNavigate } from "react-router-dom";
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
// import "./men.css";
// import { menShawls } from "../../data/shawls";

// function Men() {
//   const navigate = useNavigate();
//   const [allProducts, setAllProducts] = useState([...menShawls]);
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
//     // 1. Fetch Database Products and Merge with Static Products
//     axios
//       .get("http://localhost:5000/api/seller/products/public")
//       .then((res) => {
//         if (Array.isArray(res.data)) {
//           const dbProducts = res.data
//             .filter((p) => p.category === "Men's Shawls")
//             .map((p) => ({
//               id: p._id,
//               title: p.productName,
//               description: p.description,
//               price: `₹${p.price}`,
//               originalPrice: p.discount
//                 ? `₹${Math.round(p.price * (1 + p.discount / 100))}`
//                 : "",
//               discount: p.discount ? `${p.discount}% OFF` : null,
//               image: `http://localhost:5000/${p.productImage}`,
//               stock: `Stock: ${p.stockQuantity}`,
//               fabric: p.fabric || "N/A",
//               color: p.color || "N/A",
//               size: p.size || "N/A",
//               careInstructions: p.washCare || "N/A",
//             }));

//           setAllProducts([...menShawls, ...dbProducts]);
//         }
//       })
//       .catch((err) => console.error("Error fetching live products:", err));

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
//     fetch(`http://localhost:5000/api/shawls/${userId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (Array.isArray(data)) {
//           const ids = data.map((item) => String(item.productId));
//           setWishlistProductIds(ids);
//         }
//       })
//       .catch((err) => console.error("Error fetching wishlist items:", err));
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

//   const handleShare = (product) => {
//     setShareProduct(product);
//   };

//   return (
//     <div className="Customer_container1">
//       <ToastContainer />

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
//               <FaLink className="me-2" /> Copy Link
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
//             placeholder="Search men's shawls..."
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

//       <div className="Customer_luxury-title-wrapper">
//         <h1
//           className="Customer_luxury-title text-center my-4 fw-bold fst-italic"
//           style={{ color: "#54411d" }}
//         >
//           MEN'S SHAWLS
//         </h1>
//       </div>

//       <img
//         src={image13}
//         alt="Kavi Shawls Banner"
//         className="Customer_hero1-image w-100 mb-4"
//       />

//       <div className="container my-5">
//         <div className="row g-4">
//           {displayedProducts.length > 0 ? (
//             displayedProducts.map((item) => {
//               const productIdStr = String(item.id);
//               const isInCart = cartProductIds.includes(productIdStr);
//               const isWishlisted = wishlistProductIds.includes(productIdStr);

//               return (
//                 <div
//                   className="col-12 col-sm-6 col-md-4 col-lg-3"
//                   key={productIdStr}
//                 >
//                   <div
//                     className="Customer_card card h-100 border-0 shadow-sm d-flex flex-column justify-content-between p-2 position-relative"
//                     style={{ backgroundColor: "#e4c893", borderRadius: "16px" }}
//                   >
//                     <div className="Customer_product-image-box overflow-hidden position-relative">
//                       {item.discount && (
//                         <span
//                           className="badge bg-danger position-absolute top-0 start-0 m-2 px-2 py-1 shadow-sm fw-bold"
//                           style={{
//                             zIndex: 2,
//                             fontSize: "0.75rem",
//                             borderRadius: "6px",
//                           }}
//                         >
//                           {item.discount}
//                         </span>
//                       )}

//                       <img
//                         src={item.image}
//                         className="card-img-top rounded Customer_product-image"
//                         alt={item.title}
//                       />

//                       <button
//                         className="Customer_share-btn"
//                         onClick={() => handleShare(item)}
//                         title="Share Product"
//                       >
//                         <FaShareAlt />
//                       </button>

//                       <button
//                         className="Customer_wishlist-btn"
//                         onClick={() => handleToggleWishlist(item)}
//                         title="Wishlist Product"
//                         style={{
//                           position: "absolute",
//                           top: "10px",
//                           right: "50px",
//                           background: "white",
//                           border: "none",
//                           borderRadius: "50%",
//                           width: "35px",
//                           height: "35px",
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           cursor: "pointer",
//                           boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
//                           color: isWishlisted ? "red" : "#ccc",
//                           transition: "color 0.2s ease",
//                           zIndex: 2,
//                         }}
//                       >
//                         <FaHeart />
//                       </button>
//                     </div>

//                     <div className="card-body px-2 py-3 d-flex flex-column justify-content-between">
//                       <div>
//                         <h6
//                           className="fw-bold mb-1 text-dark"
//                           style={{ fontSize: "0.95rem", lineHeight: "1.3" }}
//                         >
//                           {item.title}
//                         </h6>

//                         <p
//                           className="text-muted small mb-2"
//                           style={{
//                             fontSize: "0.82rem",
//                             lineHeight: "1.4",
//                             minHeight: "2.6em",
//                             display: "-webkit-box",
//                             WebkitLineClamp: "2",
//                             WebkitBoxOrient: "vertical",
//                             overflow: "hidden",
//                           }}
//                         >
//                           {item.description}
//                         </p>

//                         <div className="d-flex justify-content-between align-items-center mb-3">
//                           <div className="d-flex align-items-center gap-2">
//                             <span className="fw-bold fs-6 text-success">
//                               {item.price}
//                             </span>

//                             {item.originalPrice && (
//                               <span
//                                 className="text-decoration-line-through text-muted"
//                                 style={{ fontSize: "0.8rem" }}
//                               >
//                                 {item.originalPrice}
//                               </span>
//                             )}
//                           </div>

//                           <span
//                             className="badge bg-white text-secondary border fw-normal"
//                             style={{ fontSize: "0.7rem" }}
//                           >
//                             {item.stock}
//                           </span>
//                         </div>
//                       </div>

//                       <div className="d-flex flex-column gap-2 mt-auto">
//                         <div className="d-flex gap-2">
//                           <button
//                             onClick={() =>
//                               navigate(`/product/${item.id}`, {
//                                 state: { product: item },
//                               })
//                             }
//                             className="btn btn-outline-dark btn-sm w-50 fw-semibold"
//                             style={{ borderRadius: "8px" }}
//                           >
//                             View
//                           </button>

//                           {isInCart ? (
//                             <button
//                               onClick={() => navigate("/cart")}
//                               className="btn btn-sm w-50 fw-semibold text-white"
//                               style={{
//                                 backgroundColor: "#2b8a3e",
//                                 border: "none",
//                                 borderRadius: "8px",
//                               }}
//                             >
//                               Go to Cart ➔
//                             </button>
//                           ) : (
//                             <button
//                               onClick={() => handleAddToCart(item)}
//                               className="btn btn-dark btn-sm w-50 fw-semibold text-white"
//                               style={{
//                                 backgroundColor: "#166228",
//                                 border: "none",
//                                 borderRadius: "8px",
//                               }}
//                             >
//                               Add to Cart
//                             </button>
//                           )}
//                         </div>

//                         <button
//                           onClick={() => handleBuyNow(item)}
//                           className="btn btn-sm w-100 fw-bold text-white border-0 shadow-sm"
//                           style={{
//                             background:
//                               "linear-gradient(135deg, #d6bd69 0%, #dfa00b 100%)",
//                             borderRadius: "8px",
//                           }}
//                         >
//                           ⚡ Buy Now
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <div className="text-center py-5">
//               <p className="text-muted fs-5">No men's shawls found matching your search.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Men;







// nnnnnnnnnnnnnnn









import React, { useState, useEffect } from "react";
import axios from "axios";
import image13 from "../../assets/men.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaShareAlt, FaLink, FaHeart, FaFilter, FaTimes } from "react-icons/fa";
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
import "./men.css";
import { menShawls } from "../../data/shawls";

function Men() {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([...menShawls]);
  const [shareProduct, setShareProduct] = useState(null);
  const [cartProductIds, setCartProductIds] = useState([]);
  const [wishlistProductIds, setWishlistProductIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // --- Filter States ---
  const [priceRange, setPriceRange] = useState(5000);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterModal, setShowFilterModal] = useState(false); 
  const itemsPerPage = 12; // Cards ki width ko chhota rakhte hue per page products 12 kar diye gaye hain

  const userId = localStorage.getItem("userId") || "guest_user_id";

  const checkAuthAndExecute = (actionCallback) => {
    const currentUserId = localStorage.getItem("userId");
    if (!currentUserId || currentUserId === "guest_user_id" || currentUserId === "null" || currentUserId === "undefined") {
      toast.warning("🔒 Please login first to perform this action!", { autoClose: 2000 });
      setTimeout(() => navigate("/login"), 1000);
      return;
    }
    actionCallback();
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/seller/products/public")
      .then((res) => {
        if (Array.isArray(res.data)) {
          const dbProducts = res.data
            .filter((p) => p.category === "Men's Shawls")
            .map((p) => ({
              id: p._id,
              title: p.productName,
              description: p.description,
              price: `₹${p.price}`,
              numericPrice: Number(p.price) || 0,
              originalPrice: p.discount ? `₹${Math.round(p.price * (1 + p.discount / 100))}` : "",
              discount: p.discount ? `${p.discount}% OFF` : null,
              image: `http://localhost:5000/${p.productImage}`,
              stock: `Stock: ${p.stockQuantity}`,
              fabric: p.fabric || "Pashmina",
              color: p.color || "N/A",
            }));

          const staticFormatted = menShawls.map((item) => ({
            ...item,
            numericPrice: Number(item.price.replace(/[^0-9]/g, "")) || 0,
            fabric: item.fabric || "Wool",
          }));

          setAllProducts([...staticFormatted, ...dbProducts]);
        }
      })
      .catch((err) => console.error("Error fetching live products:", err));

    fetch(`http://localhost:5000/api/shawls/cart/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCartProductIds(data.map((item) => String(item.productId)));
      })
      .catch((err) => console.error(err));

    fetch(`http://localhost:5000/api/shawls/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setWishlistProductIds(data.map((item) => String(item.productId)));
      })
      .catch((err) => console.error(err));
  }, [userId]);

  const handleMaterialChange = (material) => {
    if (selectedMaterials.includes(material)) {
      setSelectedMaterials(selectedMaterials.filter((m) => m !== material));
    } else {
      setSelectedMaterials([...selectedMaterials, material]);
    }
  };

  const filteredProducts = allProducts.filter((item) => {
    const matchesSearch =
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = item.numericPrice <= priceRange;
    const matchesMaterial =
      selectedMaterials.length === 0 ||
      selectedMaterials.some((mat) => item.fabric?.toLowerCase().includes(mat.toLowerCase()));
    return matchesSearch && matchesPrice && matchesMaterial;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "low-high") return a.numericPrice - b.numericPrice;
    if (sortOrder === "high-low") return b.numericPrice - a.numericPrice;
    if (sortOrder === "a-z") return a.title.localeCompare(b.title);
    if (sortOrder === "z-a") return b.title.localeCompare(a.title);
    return 0;
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, priceRange, selectedMaterials, sortOrder]);

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
            originalPrice: product.originalPrice || "",
            discount: product.discount || "",
            image: product.image,
            quantity: 1,
          }),
        });

        if (response.ok) {
          toast.success(`${product.title} added to cart! 🛒`, { autoClose: 1000 });
          setCartProductIds((prev) => [...prev, String(product.id)]);
          window.dispatchEvent(new Event("cartUpdated"));
        }
      } catch (err) {
        toast.error("Server connection failed");
      }
    });
  };

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
            toast.info("Removed from wishlist", { autoClose: 1000 });
            setWishlistProductIds((prev) => prev.filter((id) => id !== String(product.id)));
          } else {
            toast.success("Added to wishlist ❤️", { autoClose: 1000 });
            setWishlistProductIds((prev) => [...prev, String(product.id)]);
          }
          window.dispatchEvent(new Event("wishlistUpdated"));
        }
      } catch (err) {
        toast.error("Server connection failed");
      }
    });
  };

  const handleBuyNow = (product) => {
    checkAuthAndExecute(async () => {
      navigate("/checkout", { state: { product } });
    });
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

      {/* SEARCH BAR */}
      <div className="container my-3 text-center">
        <div className="position-relative mx-auto" style={{ maxWidth: "600px" }}>
          <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            placeholder="Search products by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control w-100 shadow-sm"
            style={{
              padding: "10px 15px 10px 45px",
              borderRadius: "25px",
              border: "1px solid #ddd",
              backgroundColor: "#fcfbfa",
            }}
          />
        </div>
      </div>

      <div className="Customer_luxury-title-wrapper">
        <h1 className="Customer_luxury-title text-center my-3 fw-bold fst-italic" style={{ color: "#54411d" }}>
          MEN'S SHAWLS
        </h1>
      </div>

      <img src={image13} alt="Kavi Shawls Banner" className="Customer_hero1-image w-100 mb-4" />

      {/* --- TOP CONTROLS & FILTER BAR --- */}
      <div className="container my-3">
        <div
          className="p-3 bg-white shadow-sm d-flex flex-wrap justify-content-between align-items-center gap-3"
          style={{ borderRadius: "8px", border: "1px solid #eee" }}
        >
          <div className="d-flex align-items-center gap-3">
            <span className="text-muted small fw-medium">
              Showing {filteredProducts.length > 0 ? indexOfFirstItem + 1 : 0}-{Math.min(indexOfLastItem, filteredProducts.length)} of {filteredProducts.length} products
            </span>
          </div>

          <div className="d-flex align-items-center gap-3 flex-wrap">
            {/* Filter Toggle Button */}
            <button
              className="btn btn-outline-dark btn-sm d-flex align-items-center gap-2 px-3"
              onClick={() => setShowFilterModal(!showFilterModal)}
              style={{ borderRadius: "6px" }}
            >
              <FaFilter /> Filters {selectedMaterials.length > 0 && `(${selectedMaterials.length})`}
            </button>

            {/* Sort By Dropdown */}
            <div className="d-flex align-items-center gap-2">
              <span className="text-muted small">Sort By:</span>
              <select
                className="form-select form-select-sm shadow-none"
                style={{ width: "160px", borderRadius: "6px", fontSize: "0.85rem" }}
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
                <option value="a-z">Name: A to Z</option>
                <option value="z-a">Name: Z to A</option>
              </select>
            </div>
          </div>
        </div>

        {/* EXPANDABLE TOP FILTER PANEL */}
        {showFilterModal && (
          <div className="p-4 bg-white shadow-sm mt-3 border rounded-3 position-relative">
            <button
              className="btn-close position-absolute top-0 end-0 m-3"
              onClick={() => setShowFilterModal(false)}
            ></button>
            <h5 className="fw-bold mb-3" style={{ color: "#333", fontSize: "1.05rem" }}>Filter Options</h5>
            
            <div className="row g-4">
              <div className="col-md-6">
                <label className="fw-semibold text-dark small mb-2 d-block">Price Range: ₹{priceRange}</label>
                <input
                  type="range"
                  min="500"
                  max="5000"
                  step="100"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="form-range"
                />
                <div className="d-flex justify-content-between text-muted small mt-1">
                  <span>₹500</span>
                  <span>₹5000</span>
                </div>
              </div>

              <div className="col-md-6">
                <label className="fw-semibold text-dark small mb-2 d-block">Material / Fabric</label>
                <div className="d-flex flex-wrap gap-3">
                  {["Pashmina", "Wool", "Silk Blend"].map((material) => (
                    <div className="form-check" key={material}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`top-mat-${material}`}
                        checked={selectedMaterials.includes(material)}
                        onChange={() => handleMaterialChange(material)}
                      />
                      <label className="form-check-label text-secondary small" htmlFor={`top-mat-${material}`} style={{ cursor: "pointer" }}>
                        {material}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- PRODUCTS GRID --- */}
      <div className="container my-3">
        <div className="row g-4">
          {currentProducts.length > 0 ? (
            currentProducts.map((item) => {
              const productIdStr = String(item.id);
              const isInCart = cartProductIds.includes(productIdStr);
              const isWishlisted = wishlistProductIds.includes(productIdStr);

              return (
                <div className="col-12 col-sm-6 col-md-4" key={productIdStr}>
                  <div
                    className="Customer_card card h-100 border-0 shadow-sm d-flex flex-column justify-content-between p-2 position-relative"
                    style={{ backgroundColor: "#e4c893", borderRadius: "16px" }}
                  >
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
                        title="Wishlist"
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
            <div className="col-12 text-center py-5 bg-white shadow-sm" style={{ borderRadius: "12px" }}>
              <p className="text-muted fs-5 mb-0">No men's shawls found matching your search or filters.</p>
            </div>
          )}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <nav className="d-flex justify-content-center my-4">
            <ul className="pagination shadow-sm">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                return (
                  <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? "active" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(pageNumber)}
                      style={
                        currentPage === pageNumber
                          ? { backgroundColor: "#54411d", borderColor: "#54411d", color: "#fff" }
                          : { color: "#54411d" }
                      }
                    >
                      {pageNumber}
                    </button>
                  </li>
                );
              })}
              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>
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

export default Men;