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










import React, { useState, useEffect } from "react";
import axios from "axios";
import image112 from "../../assets/featured.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaShareAlt, FaLink, FaHeart } from "react-icons/fa";
import {
  WhatsappShareButton, FacebookShareButton, TwitterShareButton, EmailShareButton,
  WhatsappIcon, FacebookIcon, TwitterIcon, EmailIcon,
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
    // 1. Fetch Database Products and Merge
    axios.get("http://localhost:5000/api/seller/products/public")
      .then((res) => {
        if (Array.isArray(res.data)) {
          const dbProducts = res.data
            .filter((p) => p.category === "Featured Shawls") 
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
            }));
          setAllProducts([...featuredShawls, ...dbProducts]);
        }
      })
      .catch((err) => console.error("Error fetching live products:", err));

    // 2. Fetch Cart
    fetch(`http://localhost:5000/api/shawls/cart/${userId}`)
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setCartProductIds(data.map((item) => String(item.productId))); })
      .catch((err) => console.error("Cart fetch error", err));

    // 3. Fetch Wishlist
    fetch(`http://localhost:5000/api/shawls/${userId}`)
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setWishlistProductIds(data.map((item) => String(item.productId))); })
      .catch((err) => console.error("Wishlist fetch error", err));
  }, [userId]);

  // SEARCH FILTER LOGIC
  const getProcessedProducts = (list) => {
    if (!searchQuery.trim()) {
      return list;
    }
    const query = searchQuery.toLowerCase().trim();

    const sorted = [...list].sort((a, b) => {
      const titleA = a.title?.toLowerCase() || "";
      const titleB = b.title?.toLowerCase() || "";
      const matchA = titleA.includes(query) ? 1 : 0;
      const matchB = titleB.includes(query) ? 1 : 0;
      return matchB - matchA;
    });

    return sorted.filter((item) =>
      item.title?.toLowerCase().includes(query)
    );
  };

  const displayedProducts = getProcessedProducts(allProducts);

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

  return (
    <div className="Customer_container1">
      <ToastContainer />
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

      <div className="container my-5">
        <div className="row g-4">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((item) => {
              const pid = String(item.id);
              const isInCart = cartProductIds.includes(pid);
              const isWishlisted = wishlistProductIds.includes(pid);
              return (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={pid}>
                  <div className="Customer_card card h-100 border-0 shadow-sm p-2" style={{ backgroundColor: "#e4c893", borderRadius: "16px" }}>
                    <div className="Customer_product-image-box overflow-hidden position-relative">
                      {item.discount && <span className="badge bg-danger position-absolute top-0 start-0 m-2">{item.discount}</span>}
                      <img src={item.image} className="card-img-top rounded Customer_product-image" alt={item.title} />
                      <button className="Customer_share-btn" onClick={() => setShareProduct(item)}><FaShareAlt /></button>
                      <button className="Customer_wishlist-btn" onClick={() => handleToggleWishlist(item)} style={{ position: "absolute", top: "10px", right: "50px", background: "white", borderRadius: "50%", width: "35px", height: "35px", color: isWishlisted ? "red" : "#ccc", border: "none" }}> <FaHeart /> </button>
                    </div>
                    <div className="card-body px-2 py-3 d-flex flex-column justify-content-between">
                      <h6 className="fw-bold">{item.title}</h6>
                      <p className="text-muted small mb-2">{item.description}</p>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="fw-bold fs-6 text-success">{item.price}</span>
                        <span className="badge bg-white text-secondary border">{item.stock}</span>
                      </div>
                      <div className="d-flex flex-column gap-2 mt-auto">
                        <div className="d-flex gap-2">
                          <button onClick={() => navigate(`/product/${item.id}`, { state: { product: item } })} className="btn btn-outline-dark btn-sm w-50 fw-semibold" style={{ borderRadius: "8px" }}>View</button>
                          {isInCart ? (
                            <button onClick={() => navigate("/cart")} className="btn btn-sm w-50 fw-semibold text-white" style={{ backgroundColor: "#2b8a3e", border: "none", borderRadius: "8px" }}>Go to Cart ➔</button>
                          ) : (
                            <button onClick={() => handleAddToCart(item)} className="btn btn-dark btn-sm w-50 fw-semibold text-white" style={{ backgroundColor: "#166228", border: "none", borderRadius: "8px" }}>Add to Cart</button>
                          )}
                        </div>
                        <button onClick={() => handleBuyNow(item)} className="btn btn-sm w-100 fw-bold text-white border-0 shadow-sm" style={{ background: "linear-gradient(135deg, #d6bd69 0%, #dfa00b 100%)", borderRadius: "8px" }}>⚡ Buy Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-5">
              <p className="text-muted fs-5">No featured shawls found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Featuredcoll;