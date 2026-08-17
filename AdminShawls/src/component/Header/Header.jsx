// import React, { useState, useEffect } from "react";
// import { FaSearch, FaHeart, FaShoppingCart, FaUser, FaBell, FaTimes, FaBars } from "react-icons/fa";
// import "./Header.css";
// import { Link, useNavigate } from "react-router-dom";

// function Header() {
//   const [unreadCount] = useState(2);
//   const [cartCount, setCartCount] = useState(0);
//   const [wishlistCount, setWishlistCount] = useState(0); // 👉 Wishlist Count State
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
  
//   // React States for Mobile Menu & Dropdowns
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);

//   const userId = localStorage.getItem("userId") || "guest_user_id";
//   const navigate = useNavigate();
//   const [search, setSearch] = useState("");

//   const handleSearch = () => {
//     if (search.trim()) {
//       navigate(`/search?q=${search}`);
//       setIsSearchOpen(false);
//     }
//   };

//   // --- Fetch Cart Count ---
//   const fetchCartCount = async () => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/shawls/cart/${userId}`);
//       const data = await res.json();
//       if (Array.isArray(data)) {
//         setCartCount(data.length);
//       }
//     } catch (err) {
//       console.error("Error fetching cart count:", err);
//     }
//   };

//   // --- Fetch Wishlist Count ---
//   const fetchWishlistCount = async () => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/shawls/${userId}`);
//       const data = await res.json();
//       if (Array.isArray(data)) {
//         setWishlistCount(data.length);
//       }
//     } catch (err) {
//       console.error("Error fetching wishlist count:", err);
//     }
//   };

//   useEffect(() => {
//     fetchCartCount();
//     fetchWishlistCount();

//     // Event listeners for real-time updates
//     window.addEventListener("cartUpdated", fetchCartCount);
//     window.addEventListener("wishlistUpdated", fetchWishlistCount);

//     return () => {
//       window.removeEventListener("cartUpdated", fetchCartCount);
//       window.removeEventListener("wishlistUpdated", fetchWishlistCount);
//     };
//   }, [userId]);

//   const handleMouseEnter = (name) => setActiveDropdown(name);
//   const handleMouseLeave = () => setActiveDropdown(null);
//   const toggleDropdown = (name) => {
//     setActiveDropdown(activeDropdown === name ? null : name);
//   };

//   return (
//     <div className="customer_header-back border-bottom sticky-top z-3">
//       <nav className="navbar navbar-expand-lg navbar-light customer_custom-navbar shadow-sm py-2">
//         <div className="container-fluid px-4">
//           {/* Logo */}
//           <Link className="navbar-brand d-flex align-items-center customer_navbar-brand" to="/">
//             <span className="customer_logo ms-2 fw-bold">Kavi Shawls</span> 
//           </Link>

//           {/* Mobile Toggler Button */}
//           <button
//             className="navbar-toggler"
//             type="button"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             aria-label="Toggle navigation"
//           >
//             {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
//           </button>

//           {/* Menu Items */}
//           <div className={`collapse navbar-collapse ${isMobileMenuOpen ? "show" : ""}`} id="navbar">
//             <ul className="navbar-nav mx-auto">
//               <li className="nav-item">
//                 <Link className="nav-link customer_nav-link text-dark fw-medium" to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
//               </li>

//               {/* Shop Dropdown */}
//               <li 
//                 className="nav-item dropdown position-relative"
//                 onMouseEnter={() => handleMouseEnter("shop")}
//                 onMouseLeave={handleMouseLeave}
//               >
//                 <span
//                   className="nav-link customer_nav-link dropdown-toggle text-dark fw-medium"
//                   style={{ cursor: "pointer" }}
//                   onClick={() => toggleDropdown("shop")}
//                 >
//                   Shop
//                 </span>
//                 <ul className={`dropdown-menu customer_dropdown-menu ${activeDropdown === "shop" ? "show" : ""}`}>
//                   <li><Link className="dropdown-item customer_dropdown-item" to="/shop/mens" onClick={() => { handleMouseLeave(); setIsMobileMenuOpen(false); }}>Men's</Link></li>
//                   <li><Link className="dropdown-item customer_dropdown-item" to="/shop/womens" onClick={() => { handleMouseLeave(); setIsMobileMenuOpen(false); }}>Women's</Link></li>
//                   <li><Link className="dropdown-item customer_dropdown-item" to="/shop/summer" onClick={() => { handleMouseLeave(); setIsMobileMenuOpen(false); }}>Spring Summer</Link></li>
//                   <li><Link className="dropdown-item customer_dropdown-item" to="/shop/featured" onClick={() => { handleMouseLeave(); setIsMobileMenuOpen(false); }}>Featured Collection</Link></li>
//                 </ul>
//               </li>

//               <li className="nav-item">
//                 <Link className="nav-link customer_nav-link text-dark fw-medium" to="/gift-guide" onClick={() => setIsMobileMenuOpen(false)}>Gift Guide</Link>
//               </li>

//               {/* About Dropdown */}
//               <li 
//                 className="nav-item dropdown position-relative"
//                 onMouseEnter={() => handleMouseEnter("about")}
//                 onMouseLeave={handleMouseLeave}
//               >
//                 <span
//                   className="nav-link customer_nav-link dropdown-toggle text-dark fw-medium"
//                   style={{ cursor: "pointer" }}
//                   onClick={() => toggleDropdown("about")}
//                 >
//                   About
//                 </span>
//                 <ul className={`dropdown-menu customer_dropdown-menu ${activeDropdown === "about" ? "show" : ""}`}>
//                   <li><Link className="dropdown-item customer_dropdown-item" to="/about/history" onClick={() => { handleMouseLeave(); setIsMobileMenuOpen(false); }}>Our History</Link></li>
//                   <li><Link className="dropdown-item customer_dropdown-item" to="/about/store-location" onClick={() => { handleMouseLeave(); setIsMobileMenuOpen(false); }}>Store Location</Link></li>
//                 </ul>
//               </li>

//               <li className="nav-item">
//                 <Link className="nav-link customer_nav-link text-dark fw-medium" to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
//               </li>
//             </ul>

//             {/* Header Action Icons */}
//             <div className="customer_icons d-flex justify-content-end align-items-center gap-3 ms-auto mt-2 mt-lg-0">
//               <span 
//                 className="text-dark fs-5 p-1 customer_search-trigger" 
//                 onClick={() => setIsSearchOpen(!isSearchOpen)} 
//                 title="Toggle Search"
//               >
//                 {isSearchOpen ? <FaTimes /> : <FaSearch />}
//               </span>

//               {/* 👉 Wishlist Link with Badge */}
//               <Link to="/wishlist" className="position-relative text-dark fs-5 p-1 text-decoration-none" title="Wishlist">
//                 <FaHeart />
//                 {wishlistCount > 0 && (
//                   <span
//                     className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
//                     style={{ fontSize: "10px", padding: "0.35em 0.5em" }}
//                   >
//                     {wishlistCount}
//                   </span>
//                 )}
//               </Link>
              
//               <Link to="/notifications" className="position-relative text-dark fs-5 p-1 text-decoration-none" title="Notifications">
//                 <FaBell />
//                 {unreadCount > 0 && (
//                   <span 
//                     className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" 
//                     style={{ fontSize: "10px", padding: "0.35em 0.5em" }}
//                   >
//                     {unreadCount}
//                   </span>
//                 )}
//               </Link>

//               {/* Cart Link with Badge */}
//               <Link to="/cart" className="position-relative text-dark fs-5 text-decoration-none p-1" title="Cart">
//                 <FaShoppingCart />
//                 {cartCount > 0 && (
//                   <span
//                     className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
//                     style={{ fontSize: "10px", padding: "0.35em 0.5em" }}
//                   >
//                     {cartCount}
//                   </span>
//                 )}
//               </Link>
                
//               <Link to="/login" className="text-dark fs-5 p-1" title="Account">
//                 <FaUser />
//               </Link>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Collapsible Search Section */}
//       {isSearchOpen && (
//         <div className="bg-light py-2 px-3 border-top customer_search-dropdown-section">
//           <div className="container">
//             <form
//               className="d-flex justify-content-center"
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 handleSearch();
//               }}
//             >
//               <div className="input-group overflow-hidden rounded-pill border bg-white shadow-sm" style={{ maxWidth: "550px" }}>
//                 <input
//                   type="search"
//                   className="form-control bg-transparent border-0 text-dark shadow-none ps-3 py-2"
//                   placeholder="Search Premium Shawls, Pashmina, Woolen..."
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   autoFocus
//                 />
//                 <button
//                   className="btn border-0 px-4 text-white d-flex align-items-center justify-content-center"
//                   type="submit"
//                   style={{
//                     backgroundColor: "#4e3a15",
//                     transition: "0.3s ease",
//                   }}
//                 >
//                   <FaSearch size={16} className="me-1" /> Search
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Header;



// newwwwwwwww









// import React, { useState, useEffect } from "react";
// import { FaSearch, FaHeart, FaShoppingCart, FaUser, FaBell, FaTimes, FaBars } from "react-icons/fa";
// import "./Header.css";
// import { Link, useNavigate } from "react-router-dom";

// function Header() {
//   const [unreadCount] = useState(2);
//   const [cartCount, setCartCount] = useState(0);
//   const [wishlistCount, setWishlistCount] = useState(0); 
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
  
//   // React States for Mobile Menu & Dropdowns
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);

//   const userId = localStorage.getItem("userId") || "guest_user_id";
//   const navigate = useNavigate();
//   const [search, setSearch] = useState("");

//   const handleSearch = () => {
//     if (search.trim()) {
//       // Navigates to search page with query parameter and closes search dropdown
//       navigate(`/search?q=${encodeURIComponent(search.trim())}`);
//       setIsSearchOpen(false);
//     }
//   };

//   // --- Fetch Cart Count ---
//   const fetchCartCount = async () => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/shawls/cart/${userId}`);
//       const data = await res.json();
//       if (Array.isArray(data)) {
//         setCartCount(data.length);
//       }
//     } catch (err) {
//       console.error("Error fetching cart count:", err);
//     }
//   };

//   // --- Fetch Wishlist Count ---
//   const fetchWishlistCount = async () => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/shawls/${userId}`);
//       const data = await res.json();
//       if (Array.isArray(data)) {
//         setWishlistCount(data.length);
//       }
//     } catch (err) {
//       console.error("Error fetching wishlist count:", err);
//     }
//   };

//   useEffect(() => {
//     fetchCartCount();
//     fetchWishlistCount();

//     // Event listeners for real-time updates
//     window.addEventListener("cartUpdated", fetchCartCount);
//     window.addEventListener("wishlistUpdated", fetchWishlistCount);

//     return () => {
//       window.removeEventListener("cartUpdated", fetchCartCount);
//       window.removeEventListener("wishlistUpdated", fetchWishlistCount);
//     };
//   }, [userId]);

//   const handleMouseEnter = (name) => setActiveDropdown(name);
//   const handleMouseLeave = () => setActiveDropdown(null);
//   const toggleDropdown = (name) => {
//     setActiveDropdown(activeDropdown === name ? null : name);
//   };

//   return (
//     <div className="customer_header-back border-bottom sticky-top z-3">
//       <nav className="navbar navbar-expand-lg navbar-light customer_custom-navbar shadow-sm py-2">
//         <div className="container-fluid px-4">
//           {/* Logo */}
//           <Link className="navbar-brand d-flex align-items-center customer_navbar-brand" to="/">
//             <span className="customer_logo ms-2 fw-bold">Kavi Shawls</span> 
//           </Link>

//           {/* Mobile Toggler Button */}
//           <button
//             className="navbar-toggler"
//             type="button"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             aria-label="Toggle navigation"
//           >
//             {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
//           </button>

//           {/* Menu Items */}
//           <div className={`collapse navbar-collapse ${isMobileMenuOpen ? "show" : ""}`} id="navbar">
//             <ul className="navbar-nav mx-auto">
//               <li className="nav-item">
//                 <Link className="nav-link customer_nav-link text-dark fw-medium" to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
//               </li>

//               {/* Shop Dropdown */}
//               <li 
//                 className="nav-item dropdown position-relative"
//                 onMouseEnter={() => handleMouseEnter("shop")}
//                 onMouseLeave={handleMouseLeave}
//               >
//                 <span
//                   className="nav-link customer_nav-link dropdown-toggle text-dark fw-medium"
//                   style={{ cursor: "pointer" }}
//                   onClick={() => toggleDropdown("shop")}
//                 >
//                   Shop
//                 </span>
//                 <ul className={`dropdown-menu customer_dropdown-menu ${activeDropdown === "shop" ? "show" : ""}`}>
//                   <li><Link className="dropdown-item customer_dropdown-item" to="/shop/mens" onClick={() => { handleMouseLeave(); setIsMobileMenuOpen(false); }}>Men's</Link></li>
//                   <li><Link className="dropdown-item customer_dropdown-item" to="/shop/womens" onClick={() => { handleMouseLeave(); setIsMobileMenuOpen(false); }}>Women's</Link></li>
//                   <li><Link className="dropdown-item customer_dropdown-item" to="/shop/summer" onClick={() => { handleMouseLeave(); setIsMobileMenuOpen(false); }}>Spring Summer</Link></li>
//                   <li><Link className="dropdown-item customer_dropdown-item" to="/shop/featured" onClick={() => { handleMouseLeave(); setIsMobileMenuOpen(false); }}>Featured Collection</Link></li>
//                 </ul>
//               </li>

//               <li className="nav-item">
//                 <Link className="nav-link customer_nav-link text-dark fw-medium" to="/gift-guide" onClick={() => setIsMobileMenuOpen(false)}>Gift Guide</Link>
//               </li>

//               {/* About Dropdown */}
//               <li 
//                 className="nav-item dropdown position-relative"
//                 onMouseEnter={() => handleMouseEnter("about")}
//                 onMouseLeave={handleMouseLeave}
//               >
//                 <span
//                   className="nav-link customer_nav-link dropdown-toggle text-dark fw-medium"
//                   style={{ cursor: "pointer" }}
//                   onClick={() => toggleDropdown("about")}
//                 >
//                   About
//                 </span>
//                 <ul className={`dropdown-menu customer_dropdown-menu ${activeDropdown === "about" ? "show" : ""}`}>
//                   <li><Link className="dropdown-item customer_dropdown-item" to="/about/history" onClick={() => { handleMouseLeave(); setIsMobileMenuOpen(false); }}>Our History</Link></li>
//                   <li><Link className="dropdown-item customer_dropdown-item" to="/about/store-location" onClick={() => { handleMouseLeave(); setIsMobileMenuOpen(false); }}>Store Location</Link></li>
//                 </ul>
//               </li>

//               <li className="nav-item">
//                 <Link className="nav-link customer_nav-link text-dark fw-medium" to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
//               </li>
//             </ul>

//             {/* Header Action Icons */}
//             <div className="customer_icons d-flex justify-content-end align-items-center gap-3 ms-auto mt-2 mt-lg-0">
//               {/* <span 
//                 className="text-dark fs-5 p-1 customer_search-trigger" 
//                 onClick={() => setIsSearchOpen(!isSearchOpen)} 
//                 style={{ cursor: "pointer" }}
//                 title="Toggle Search"
//               >
//                 {isSearchOpen ? <FaTimes /> : <FaSearch />}
//               </span> */}

//               {/* Wishlist Link with Badge */}
//               <Link to="/wishlist" className="position-relative text-dark fs-5 p-1 text-decoration-none" title="Wishlist">
//                 <FaHeart />
//                 {wishlistCount > 0 && (
//                   <span
//                     className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
//                     style={{ fontSize: "10px", padding: "0.35em 0.5em" }}
//                   >
//                     {wishlistCount}
//                   </span>
//                 )}
//               </Link>
              
//               <Link to="/notifications" className="position-relative text-dark fs-5 p-1 text-decoration-none" title="Notifications">
//                 <FaBell />
//                 {unreadCount > 0 && (
//                   <span 
//                     className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" 
//                     style={{ fontSize: "10px", padding: "0.35em 0.5em" }}
//                   >
//                     {unreadCount}
//                   </span>
//                 )}
//               </Link>

//               {/* Cart Link with Badge */}
//               <Link to="/cart" className="position-relative text-dark fs-5 text-decoration-none p-1" title="Cart">
//                 <FaShoppingCart />
//                 {cartCount > 0 && (
//                   <span
//                     className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
//                     style={{ fontSize: "10px", padding: "0.35em 0.5em" }}
//                   >
//                     {cartCount}
//                   </span>
//                 )}
//               </Link>
                
//               <Link to="/login" className="text-dark fs-5 p-1" title="Account">
//                 <FaUser />
//               </Link>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Collapsible Search Section */}
//       {/* {isSearchOpen && (
//         <div className="bg-light py-2 px-3 border-top customer_search-dropdown-section">
//           <div className="container">
//             <form
//               className="d-flex justify-content-center"
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 handleSearch();
//               }}
//             >
//               <div className="input-group overflow-hidden rounded-pill border bg-white shadow-sm" style={{ maxWidth: "550px" }}>
//                 <input
//                   type="search"
//                   className="form-control bg-transparent border-0 text-dark shadow-none ps-3 py-2"
//                   placeholder="Search Premium Shawls, Pashmina, Woolen..."
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   autoFocus
//                 />
//                 <button
//                   className="btn border-0 px-4 text-white d-flex align-items-center justify-content-center"
//                   type="submit"
//                   style={{
//                     backgroundColor: "#4e3a15",
//                     transition: "0.3s ease",
//                   }}
//                 >
//                   <FaSearch size={16} className="me-1" /> Search
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )} */}
//     </div>
//   );
// }

// export default Header;












// newwwwww





// import React, { useState, useEffect } from "react";
// import { FaSearch, FaHeart, FaShoppingCart, FaUser, FaBell, FaTimes, FaBars } from "react-icons/fa";
// import "./Header.css";
// import { Link, useNavigate } from "react-router-dom";

// function Header() {
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [cartCount, setCartCount] = useState(0);
//   const [wishlistCount, setWishlistCount] = useState(0); 
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
  
//   // React States for Mobile Menu & Dropdowns
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);

//   // ✅ Fix: Guest user ki jagah null rakhein agar login nahi hai
//   const userId = localStorage.getItem("userId");
//   const navigate = useNavigate();
//   const [search, setSearch] = useState("");

//   const handleSearch = () => {
//     if (search.trim()) {
//       navigate(`/search?q=${encodeURIComponent(search.trim())}`);
//       setIsSearchOpen(false);
//     }
//   };

//   // --- Fetch Unread Notifications Count from Backend ---
//   const fetchUnreadCount = async () => {
//     if (!userId) {
//       setUnreadCount(0); // Agar user login nahi hai toh count 0 rahega
//       return;
//     }

//     try {
//       const res = await fetch(`http://localhost:5000/api/shawls/notifications/${userId}`);
//       const data = await res.json();
//       if (Array.isArray(data)) {
//         const unread = data.filter((n) => !n.read).length;
//         setUnreadCount(unread);
//       }
//     } catch (err) {
//       console.error("Error fetching unread notification count:", err);
//     }
//   };

//   // --- Fetch Cart Count ---
//   const fetchCartCount = async () => {
//     if (!userId) return;
//     try {
//       const res = await fetch(`http://localhost:5000/api/shawls/cart/${userId}`);
//       const data = await res.json();
//       if (Array.isArray(data)) {
//         setCartCount(data.length);
//       }
//     } catch (err) {
//       console.error("Error fetching cart count:", err);
//     }
//   };

//   // --- Fetch Wishlist Count ---
//   const fetchWishlistCount = async () => {
//     if (!userId) return;
//     try {
//       const res = await fetch(`http://localhost:5000/api/shawls/${userId}`);
//       const data = await res.json();
//       if (Array.isArray(data)) {
//         setWishlistCount(data.length);
//       }
//     } catch (err) {
//       console.error("Error fetching wishlist count:", err);
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       fetchUnreadCount();
//       fetchCartCount();
//       fetchWishlistCount();
//     }

//     // Event listeners for real-time updates
//     window.addEventListener("cartUpdated", fetchCartCount);
//     window.addEventListener("wishlistUpdated", fetchWishlistCount);
//     window.addEventListener("notificationsUpdated", fetchUnreadCount);

//     return () => {
//       window.removeEventListener("cartUpdated", fetchCartCount);
//       window.removeEventListener("wishlistUpdated", fetchWishlistCount);
//       window.removeEventListener("notificationsUpdated", fetchUnreadCount);
//     };
//   }, [userId]);

//   const handleMouseEnter = (name) => setActiveDropdown(name);
//   const handleMouseLeave = () => setActiveDropdown(null);
//   const toggleDropdown = (name) => {
//     setActiveDropdown(activeDropdown === name ? null : name);
//   };

//   return (
//     <div className="customer_header-back border-bottom sticky-top z-3">
//       <nav className="navbar navbar-expand-lg navbar-light customer_custom-navbar shadow-sm py-2">
//         <div className="container-fluid px-4">
//           {/* Logo */}
//           <Link className="navbar-brand d-flex align-items-center customer_navbar-brand" to="/">
//             <span className="customer_logo ms-2 fw-bold">Kavi Shawls</span> 
//           </Link>

//           {/* Mobile Toggler Button */}
//           <button
//             className="navbar-toggler"
//             type="button"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             aria-label="Toggle navigation"
//           >
//             {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
//           </button>

//           {/* Menu Items */}
//           <div className={`collapse navbar-collapse ${isMobileMenuOpen ? "show" : ""}`} id="navbar">
//             <ul className="navbar-nav mx-auto">
//               <li className="nav-item">
//                 <Link className="nav-link customer_nav-link text-dark fw-medium" to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
//               </li>

//               {/* Shop Dropdown */}
//               <li 
//                 className="nav-item dropdown position-relative"
//                 onMouseEnter={() => handleMouseEnter("shop")}
//                 onMouseLeave={handleMouseLeave}
//               >
//                 <span
//                   className="nav-link customer_nav-link dropdown-toggle text-dark fw-medium"
//                   style={{ cursor: "pointer" }}
//                   onClick={() => toggleDropdown("shop")}
//                 >
//                   Shop
//                 </span>
//                 <ul className={`dropdown-menu customer_dropdown-menu ${activeDropdown === "shop" ? "show" : ""}`}>
//                   <li><Link className="dropdown-item customer_dropdown-item" to="/shop/mens" onClick={() => { handleMouseLeave(); setIsMobileMenuOpen(false); }}>Men's</Link></li>
//                   <li><Link className="dropdown-item customer_dropdown-item" to="/shop/womens" onClick={() => { handleMouseLeave(); setIsMobileMenuOpen(false); }}>Women's</Link></li>
//                   <li><Link className="dropdown-item customer_dropdown-item" to="/shop/summer" onClick={() => { handleMouseLeave(); setIsMobileMenuOpen(false); }}>Spring Summer</Link></li>
//                   <li><Link className="dropdown-item customer_dropdown-item" to="/shop/featured" onClick={() => { handleMouseLeave(); setIsMobileMenuOpen(false); }}>Featured Collection</Link></li>
//                 </ul>
//               </li>

//               <li className="nav-item">
//                 <Link className="nav-link customer_nav-link text-dark fw-medium" to="/gift-guide" onClick={() => setIsMobileMenuOpen(false)}>Gift Guide</Link>
//               </li>

//               {/* About Dropdown */}
//               <li 
//                 className="nav-item dropdown position-relative"
//                 onMouseEnter={() => handleMouseEnter("about")}
//                 onMouseLeave={handleMouseLeave}
//               >
//                 <span
//                   className="nav-link customer_nav-link dropdown-toggle text-dark fw-medium"
//                   style={{ cursor: "pointer" }}
//                   onClick={() => toggleDropdown("about")}
//                 >
//                   About
//                 </span>
//                 <ul className={`dropdown-menu customer_dropdown-menu ${activeDropdown === "about" ? "show" : ""}`}>
//                   <li><Link className="dropdown-item customer_dropdown-item" to="/about/history" onClick={() => { handleMouseLeave(); setIsMobileMenuOpen(false); }}>Our History</Link></li>
//                   <li><Link className="dropdown-item customer_dropdown-item" to="/about/store-location" onClick={() => { handleMouseLeave(); setIsMobileMenuOpen(false); }}>Store Location</Link></li>
//                 </ul>
//               </li>

//               <li className="nav-item">
//                 <Link className="nav-link customer_nav-link text-dark fw-medium" to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
//               </li>
//             </ul>

//             {/* Header Action Icons */}
//             <div className="customer_icons d-flex justify-content-end align-items-center gap-3 ms-auto mt-2 mt-lg-0">
//               {/* Wishlist Link with Badge */}
//               <Link to="/wishlist" className="position-relative text-dark fs-5 p-1 text-decoration-none" title="Wishlist">
//                 <FaHeart />
//                 {wishlistCount > 0 && (
//                   <span
//                     className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
//                     style={{ fontSize: "10px", padding: "0.35em 0.5em" }}
//                   >
//                     {wishlistCount}
//                   </span>
//                 )}
//               </Link>
              
//               <Link to="/notifications" className="position-relative text-dark fs-5 p-1 text-decoration-none" title="Notifications">
//                 <FaBell />
//                 {unreadCount > 0 && (
//                   <span 
//                     className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" 
//                     style={{ fontSize: "10px", padding: "0.35em 0.5em" }}
//                   >
//                     {unreadCount}
//                   </span>
//                 )}
//               </Link>

//               {/* Cart Link with Badge */}
//               <Link to="/cart" className="position-relative text-dark fs-5 text-decoration-none p-1" title="Cart">
//                 <FaShoppingCart />
//                 {cartCount > 0 && (
//                   <span
//                     className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
//                     style={{ fontSize: "10px", padding: "0.35em 0.5em" }}
//                   >
//                     {cartCount}
//                   </span>
//                 )}
//               </Link>
                
//               <Link to="/login" className="text-dark fs-5 p-1" title="Account">
//                 <FaUser />
//               </Link>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// }

// export default Header;










// nnnnnnnnnnnnnnnnnnnnnnnnnee










import React, { useState, useEffect } from "react";
import { FaSearch, FaHeart, FaShoppingCart, FaUser, FaBell, FaTimes, FaBars, FaSignOutAlt } from "react-icons/fa";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0); 
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // React States for Mobile Menu & Dropdowns
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
      setIsSearchOpen(false);
    }
  };

  // --- Logout Handler ---
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("customerUser");
    
    // Toast message / Alert show karein
    alert("Logout Successfully!");
    
    // Home page par redirect karein aur page refresh kar dein taaki states clear ho jayein
    navigate("/customer");
    window.location.reload();
  };

  // --- Fetch Unread Notifications Count from Backend ---
  const fetchUnreadCount = async () => {
    if (!userId) {
      setUnreadCount(0);
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/shawls/notifications/${userId}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        const unread = data.filter((n) => !n.read).length;
        setUnreadCount(unread);
      }
    } catch (err) {
      console.error("Error fetching unread notification count:", err);
    }
  };

  // --- Fetch Cart Count ---
  const fetchCartCount = async () => {
    if (!userId) return;
    try {
      const res = await fetch(`http://localhost:5000/api/shawls/cart/${userId}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setCartCount(data.length);
      }
    } catch (err) {
      console.error("Error fetching cart count:", err);
    }
  };

  // --- Fetch Wishlist Count ---
  const fetchWishlistCount = async () => {
    if (!userId) return;
    try {
      const res = await fetch(`http://localhost:5000/api/shawls/${userId}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setWishlistCount(data.length);
      }
    } catch (err) {
      console.error("Error fetching wishlist count:", err);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUnreadCount();
      fetchCartCount();
      fetchWishlistCount();
    }

    // Event listeners for real-time updates
    window.addEventListener("cartUpdated", fetchCartCount);
    window.addEventListener("wishlistUpdated", fetchWishlistCount);
    window.addEventListener("notificationsUpdated", fetchUnreadCount);

    return () => {
      window.removeEventListener("cartUpdated", fetchCartCount);
      window.removeEventListener("wishlistUpdated", fetchWishlistCount);
      window.removeEventListener("notificationsUpdated", fetchUnreadCount);
    };
  }, [userId]);

  const handleMouseEnter = (name) => setActiveDropdown(name);
  const handleMouseLeave = () => setActiveDropdown(null);
  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <div className="customer_header-back border-bottom sticky-top z-3">
      <nav className="navbar navbar-expand-lg navbar-light customer_custom-navbar shadow-sm py-2">
        <div className="container-fluid px-4">
          {/* Logo */}
          <Link className="navbar-brand d-flex align-items-center customer_navbar-brand" to="/">
            <span className="customer_logo ms-2 fw-bold">Kavi Shawls</span> 
          </Link>

          {/* Mobile Toggler Button */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Menu Items */}
          <div className={`collapse navbar-collapse ${isMobileMenuOpen ? "show" : ""}`} id="navbar">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link customer_nav-link text-dark fw-medium" to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              </li>

              {/* Shop Dropdown */}
              <li 
                className="nav-item dropdown position-relative"
                onMouseEnter={() => handleMouseEnter("shop")}
                onMouseLeave={handleMouseLeave}
              >
                <span
                  className="nav-link customer_nav-link dropdown-toggle text-dark fw-medium"
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleDropdown("shop")}
                >
                  Shop
                </span>
                <ul className={`dropdown-menu customer_dropdown-menu ${activeDropdown === "shop" ? "show" : ""}`}>
                  <li><Link className="dropdown-item customer_dropdown-item" to="/shop/mens" onClick={() => { handleMouseLeave(); setIsMobileMenuOpen(false); }}>Men's</Link></li>
                  <li><Link className="dropdown-item customer_dropdown-item" to="/shop/womens" onClick={() => { handleMouseLeave(); setIsMobileMenuOpen(false); }}>Women's</Link></li>
                  <li><Link className="dropdown-item customer_dropdown-item" to="/shop/summer" onClick={() => { handleMouseLeave(); setIsMobileMenuOpen(false); }}>Spring Summer</Link></li>
                  <li><Link className="dropdown-item customer_dropdown-item" to="/shop/featured" onClick={() => { handleMouseLeave(); setIsMobileMenuOpen(false); }}>Featured Collection</Link></li>
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link customer_nav-link text-dark fw-medium" to="/gift-guide" onClick={() => setIsMobileMenuOpen(false)}>Gift Guide</Link>
              </li>

              {/* About Dropdown */}
              <li 
                className="nav-item dropdown position-relative"
                onMouseEnter={() => handleMouseEnter("about")}
                onMouseLeave={handleMouseLeave}
              >
                <span
                  className="nav-link customer_nav-link dropdown-toggle text-dark fw-medium"
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleDropdown("about")}
                >
                  About
                </span>
                <ul className={`dropdown-menu customer_dropdown-menu ${activeDropdown === "about" ? "show" : ""}`}>
                  <li><Link className="dropdown-item customer_dropdown-item" to="/about/history" onClick={() => { handleMouseLeave(); setIsMobileMenuOpen(false); }}>Our History</Link></li>
                  <li><Link className="dropdown-item customer_dropdown-item" to="/about/store-location" onClick={() => { handleMouseLeave(); setIsMobileMenuOpen(false); }}>Store Location</Link></li>
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link customer_nav-link text-dark fw-medium" to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
              </li>
            </ul>

            {/* Header Action Icons */}
            <div className="customer_icons d-flex justify-content-end align-items-center gap-3 ms-auto mt-2 mt-lg-0">
              {/* Wishlist Link with Badge */}
              <Link to="/wishlist" className="position-relative text-dark fs-5 p-1 text-decoration-none" title="Wishlist">
                <FaHeart />
                {wishlistCount > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "10px", padding: "0.35em 0.5em" }}
                  >
                    {wishlistCount}
                  </span>
                )}
              </Link>
              
              <Link to="/notifications" className="position-relative text-dark fs-5 p-1 text-decoration-none" title="Notifications">
                <FaBell />
                {unreadCount > 0 && (
                  <span 
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" 
                    style={{ fontSize: "10px", padding: "0.35em 0.5em" }}
                  >
                    {unreadCount}
                  </span>
                )}
              </Link>

              {/* Cart Link with Badge */}
              <Link to="/cart" className="position-relative text-dark fs-5 text-decoration-none p-1" title="Cart">
                <FaShoppingCart />
                {cartCount > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "10px", padding: "0.35em 0.5em" }}
                  >
                    {cartCount}
                  </span>
                )}
              </Link>
                
              {/* ✅ Conditional Rendering: Agar user login hai toh Logout button/icon, warna Login icon */}
              {userId ? (
                <button 
                  onClick={handleLogout} 
                  className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
                  title="Logout"
                  style={{ fontSize: "14px", fontWeight: "500" }}
                >
                  <FaSignOutAlt /> Logout
                </button>
              ) : (
                <Link to="/login" className="text-dark fs-5 p-1" title="Login">
                  <FaUser />
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;