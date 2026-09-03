

//claude logout office



// import React, { useState, useEffect } from "react";
// import { FaSearch, FaHeart, FaShoppingCart, FaUser, FaBell, FaTimes, FaBars, FaSignOutAlt } from "react-icons/fa";
// import "./Header.css";
// import { Link, useNavigate } from "react-router-dom";

// function Header() {
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [cartCount, setCartCount] = useState(0);
//   const [wishlistCount, setWishlistCount] = useState(0);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);

//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);

//   // ✅ Token ke base par login status track karna
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
//   const navigate = useNavigate();
//   const [search, setSearch] = useState("");

//   const handleSearch = () => {
//     if (search.trim()) {
//       navigate(`/search?q=${encodeURIComponent(search.trim())}`);
//       setIsSearchOpen(false);
//     }
//   };

//   // ✅ Method 1: Frontend Logout (Token aur data clear karke state update karna)
//   const handleLogout = async () => {
//     try {
//       // Optional: Agar backend ka logout API hit karna ho toh kar sakte hain
//       const token = localStorage.getItem("token");
//       if (token) {
//         await fetch("https://ecommerce-website-ggui.onrender.com/api/customer/logout", {
//           method: "POST",
//           headers: { Authorization: `Bearer ${token}` },
//         }).catch(() => {}); // Agar backend fail bhi ho toh frontend clear ho jaye
//       }
//     } catch (err) {
//       console.error("Logout API error:", err);
//     } finally {
//       // LocalStorage se credentials hatao
//       localStorage.removeItem("token");
//       localStorage.removeItem("userId");
//       localStorage.removeItem("customerUser");

//       // State update karo taaki UI turant change ho jaye
//       setIsLoggedIn(false);
//       setCartCount(0);
//       setWishlistCount(0);
//       setUnreadCount(0);

//       alert("Logged Out Successfully!");

//       // Customer page ya login page par redirect karo
//       navigate("/customer");
//     }
//   };

//   // ✅ NOTIFICATIONS
//   const fetchUnreadCount = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setUnreadCount(0);
//       return;
//     }

//     try {
//       const res = await fetch("https://ecommerce-website-ggui.onrender.com/api/customer/notifications", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       if (data.success && Array.isArray(data.notifications)) {
//         const unread = data.notifications.filter((n) => !n.read).length;
//         setUnreadCount(unread);
//       }
//     } catch (err) {
//       console.error("Error fetching unread notification count:", err);
//     }
//   };

//   // ✅ CART COUNT
//   const fetchCartCount = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setCartCount(0);
//       return;
//     }
//     try {
//       const res = await fetch("https://ecommerce-website-ggui.onrender.com/api/customer/cart", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       if (data.success && Array.isArray(data.cart)) {
//         setCartCount(data.cart.length);
//       }
//     } catch (err) {
//       console.error("Error fetching cart count:", err);
//     }
//   };

//   // ✅ WISHLIST COUNT
//   const fetchWishlistCount = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setWishlistCount(0);
//       return;
//     }
//     try {
//       const res = await fetch("https://ecommerce-website-ggui.onrender.com/api/customer/wishlist", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       if (data.success && Array.isArray(data.wishlist)) {
//         setWishlistCount(data.wishlist.length);
//       }
//     } catch (err) {
//       console.error("Error fetching wishlist count:", err);
//     }
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token);

//     if (token) {
//       fetchUnreadCount();
//       fetchCartCount();
//       fetchWishlistCount();
//     }

//     window.addEventListener("cartUpdated", fetchCartCount);
//     window.addEventListener("wishlistUpdated", fetchWishlistCount);
//     window.addEventListener("notificationsUpdated", fetchUnreadCount);

//     return () => {
//       window.removeEventListener("cartUpdated", fetchCartCount);
//       window.removeEventListener("wishlistUpdated", fetchWishlistCount);
//       window.removeEventListener("notificationsUpdated", fetchUnreadCount);
//     };
//   }, []);

//   const handleMouseEnter = (name) => setActiveDropdown(name);
//   const handleMouseLeave = () => setActiveDropdown(null);
//   const toggleDropdown = (name) => {
//     setActiveDropdown(activeDropdown === name ? null : name);
//   };

//   return (
//     <div className="customer_header-back border-bottom sticky-top z-3">
//       <nav className="navbar navbar-expand-lg navbar-light customer_custom-navbar shadow-sm py-2">
//         <div className="container-fluid px-4">
//           <Link className="navbar-brand d-flex align-items-center customer_navbar-brand" to="/">
//             <span className="customer_logo ms-2 fw-bold">Kavi Shawls</span>
//           </Link>

//           <button
//             className="navbar-toggler"
//             type="button"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             aria-label="Toggle navigation"
//           >
//             {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
//           </button>

//           <div className={`collapse navbar-collapse ${isMobileMenuOpen ? "show" : ""}`} id="navbar">
//             <ul className="navbar-nav mx-auto">
//               <li className="nav-item">
//                 <Link className="nav-link customer_nav-link text-dark fw-medium" to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
//               </li>

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

//             <div className="customer_icons d-flex justify-content-end align-items-center gap-3 ms-auto mt-2 mt-lg-0">
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

//               {isLoggedIn ? (
//                 <button
//                   onClick={handleLogout}
//                   className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
//                   title="Logout"
//                   style={{ fontSize: "14px", fontWeight: "500" }}
//                 >
//                   <FaSignOutAlt /> Logout
//                 </button>
//               ) : (
//                 <Link to="/login" className="text-dark fs-5 p-1" title="Login">
//                   <FaUser />
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// }

// export default Header;



//3 sept ui




import React, { useState, useEffect } from "react";
import { FaSearch, FaHeart, FaShoppingCart, FaUser, FaBell, FaTimes, FaBars, FaSignOutAlt } from "react-icons/fa";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // ✅ Token ke base par login status track karna
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
      setIsSearchOpen(false);
    }
  };

  // ✅ Method 1: Frontend Logout (Token aur data clear karke state update karna)
  const handleLogout = async () => {
    try {
      // Optional: Agar backend ka logout API hit karna ho toh kar sakte hain
      const token = localStorage.getItem("token");
      if (token) {
        await fetch("https://ecommerce-website-ggui.onrender.com/api/customer/logout", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }).catch(() => {}); // Agar backend fail bhi ho toh frontend clear ho jaye
      }
    } catch (err) {
      console.error("Logout API error:", err);
    } finally {
      // LocalStorage se credentials hatao
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("customerUser");

      // State update karo taaki UI turant change ho jaye
      setIsLoggedIn(false);
      setCartCount(0);
      setWishlistCount(0);
      setUnreadCount(0);

      alert("Logged Out Successfully!");

      // Customer page ya login page par redirect karo
      navigate("/customer");
    }
  };

  // ✅ NOTIFICATIONS
  const fetchUnreadCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUnreadCount(0);
      return;
    }

    try {
      const res = await fetch("https://ecommerce-website-ggui.onrender.com/api/customer/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.notifications)) {
        const unread = data.notifications.filter((n) => !n.read).length;
        setUnreadCount(unread);
      }
    } catch (err) {
      console.error("Error fetching unread notification count:", err);
    }
  };

  // ✅ CART COUNT
  const fetchCartCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCartCount(0);
      return;
    }
    try {
      const res = await fetch("https://ecommerce-website-ggui.onrender.com/api/customer/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.cart)) {
        setCartCount(data.cart.length);
      }
    } catch (err) {
      console.error("Error fetching cart count:", err);
    }
  };

  // ✅ WISHLIST COUNT
  const fetchWishlistCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setWishlistCount(0);
      return;
    }
    try {
      const res = await fetch("https://ecommerce-website-ggui.onrender.com/api/customer/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.wishlist)) {
        setWishlistCount(data.wishlist.length);
      }
    } catch (err) {
      console.error("Error fetching wishlist count:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    if (token) {
      fetchUnreadCount();
      fetchCartCount();
      fetchWishlistCount();
    }

    window.addEventListener("cartUpdated", fetchCartCount);
    window.addEventListener("wishlistUpdated", fetchWishlistCount);
    window.addEventListener("notificationsUpdated", fetchUnreadCount);

    return () => {
      window.removeEventListener("cartUpdated", fetchCartCount);
      window.removeEventListener("wishlistUpdated", fetchWishlistCount);
      window.removeEventListener("notificationsUpdated", fetchUnreadCount);
    };
  }, []);

  // ✅ Mobile menu khulne par background scroll lock ho jaye (professional UX)
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  const handleMouseEnter = (name) => setActiveDropdown(name);
  const handleMouseLeave = () => setActiveDropdown(null);
  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <div className="customer_header-back border-bottom sticky-top z-3">
      <nav className="navbar navbar-expand-lg navbar-light customer_custom-navbar shadow-sm py-2">
        <div className="container-fluid px-4">
          <Link className="navbar-brand d-flex align-items-center customer_navbar-brand" to="/">
            <span className="customer_logo ms-2 fw-bold">Kavi Shawls</span>
          </Link>

          <button
            className="navbar-toggler customer_toggler"
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <div className={`collapse navbar-collapse ${isMobileMenuOpen ? "show" : ""}`} id="navbar">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link customer_nav-link text-dark fw-medium" to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              </li>

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

            <div className="customer_icons d-flex justify-content-end align-items-center gap-3 ms-auto mt-2 mt-lg-0">
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

              {isLoggedIn ? (
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