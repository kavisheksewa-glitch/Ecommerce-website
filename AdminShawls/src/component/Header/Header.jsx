// import React, { useState, useEffect } from "react";
// import { 
//   FaHeart, 
//   FaShoppingCart, 
//   FaUser, 
//   FaBell, 
//   FaTimes, 
//   FaBars, 
//   FaSignOutAlt, 
//   FaCog, 
//   FaBoxOpen, 
//   FaHeadset 
// } from "react-icons/fa";
// import "./Header.css";
// import { Link, useNavigate } from "react-router-dom";

// function Header() {
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [cartCount, setCartCount] = useState(0);
//   const [wishlistCount, setWishlistCount] = useState(0);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);

//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);

//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
//   const navigate = useNavigate();
//   const [search, setSearch] = useState("");

//   const handleSearch = () => {
//     if (search.trim()) {
//       navigate(`/search?q=${encodeURIComponent(search.trim())}`);
//       setIsSearchOpen(false);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (token) {
//         await fetch("https://ecommerce-website-ggui.onrender.com/api/customer/logout", {
//           method: "POST",
//           headers: { Authorization: `Bearer ${token}` },
//         }).catch(() => {});
//       }
//     } catch (err) {
//       console.error("Logout API error:", err);
//     } finally {
//       localStorage.removeItem("token");
//       localStorage.removeItem("userId");
//       localStorage.removeItem("customerUser");

//       setIsLoggedIn(false);
//       setCartCount(0);
//       setWishlistCount(0);
//       setUnreadCount(0);
//       setActiveDropdown(null);

//       alert("Logged Out Successfully!");
//       navigate("/customer");
//     }
//   };

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

//   useEffect(() => {
//     document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isMobileMenuOpen]);

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
//             className="navbar-toggler customer_toggler"
//             type="button"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             aria-label="Toggle navigation"
//           >
//             {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
//           </button>

//           <div className={`collapse navbar-collapse ${isMobileMenuOpen ? "show" : ""}`} id="navbar">
//             <ul className="navbar-nav mx-auto align-items-lg-center">
//               <li className="nav-item">
//                 <Link className="nav-link customer_nav-link" to="/" onClick={() => setIsMobileMenuOpen(false)}>
//                   Home
//                 </Link>
//               </li>

//               <li
//                 className="nav-item dropdown position-relative"
//                 onMouseEnter={() => handleMouseEnter("shop")}
//                 onMouseLeave={handleMouseLeave}
//               >
//                 <span
//                   className="nav-link customer_nav-link dropdown-toggle"
//                   style={{ cursor: "pointer" }}
//                   onClick={() => toggleDropdown("shop")}
//                 >
//                   Shop
//                 </span>
//                 <ul className={`dropdown-menu customer_dropdown-menu ${activeDropdown === "shop" ? "show" : ""}`}>
//                   <li>
//                     <Link className="dropdown-item customer_dropdown-item" to="/shop/mens" onClick={() => { handleMouseLeave(); setIsMobileMenuOpen(false); }}>
//                       Men's
//                     </Link>
//                   </li>
//                   <li>
//                     <Link className="dropdown-item customer_dropdown-item" to="/shop/womens" onClick={() => { handleMouseLeave(); setIsMobileMenuOpen(false); }}>
//                       Women's
//                     </Link>
//                   </li>
//                   <li>
//                     <Link className="dropdown-item customer_dropdown-item" to="/shop/summer" onClick={() => { handleMouseLeave(); setIsMobileMenuOpen(false); }}>
//                       Spring Summer
//                     </Link>
//                   </li>
//                   <li>
//                     <Link className="dropdown-item customer_dropdown-item" to="/shop/featured" onClick={() => { handleMouseLeave(); setIsMobileMenuOpen(false); }}>
//                       Featured Collection
//                     </Link>
//                   </li>
//                 </ul>
//               </li>

//               <li className="nav-item">
//                 <Link className="nav-link customer_nav-link" to="/gift-guide" onClick={() => setIsMobileMenuOpen(false)}>
//                   Gift Guide
//                 </Link>
//               </li>

//               <li
//                 className="nav-item dropdown position-relative"
//                 onMouseEnter={() => handleMouseEnter("about")}
//                 onMouseLeave={handleMouseLeave}
//               >
//                 <span
//                   className="nav-link customer_nav-link dropdown-toggle"
//                   style={{ cursor: "pointer" }}
//                   onClick={() => toggleDropdown("about")}
//                 >
//                   About
//                 </span>
//                 <ul className={`dropdown-menu customer_dropdown-menu ${activeDropdown === "about" ? "show" : ""}`}>
//                   <li>
//                     <Link className="dropdown-item customer_dropdown-item" to="/about/history" onClick={() => { handleMouseLeave(); setIsMobileMenuOpen(false); }}>
//                       Our History
//                     </Link>
//                   </li>
//                   <li>
//                     <Link className="dropdown-item customer_dropdown-item" to="/about/store-location" onClick={() => { handleMouseLeave(); setIsMobileMenuOpen(false); }}>
//                       Store Location
//                     </Link>
//                   </li>
//                 </ul>
//               </li>

//               <li className="nav-item">
//                 <Link className="nav-link customer_nav-link" to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
//                   Contact
//                 </Link>
//               </li>

//               <li className="nav-item">
//                 <Link className="nav-link customer_nav-link" to="/track-order" onClick={() => setIsMobileMenuOpen(false)}>
//                    Track Order
//                 </Link>
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

//               {/* ✅ SETTINGS & USER DROPDOWN SECTION */}
//               {isLoggedIn ? (
//                 <div 
//                   className="position-relative dropdown"
//                   onMouseEnter={() => handleMouseEnter("userSettings")}
//                   onMouseLeave={handleMouseLeave}
//                 >
//                   <button 
//                     className="btn btn-link text-dark fs-5 p-1 border-0 shadow-none" 
//                     onClick={() => toggleDropdown("userSettings")}
//                     title="Account Settings"
//                   >
//                     <FaCog />
//                   </button>

//                   <ul 
//                     className={`dropdown-menu customer_dropdown-menu shadow ${activeDropdown === "userSettings" ? "show" : ""}`}
//                     style={{ 
//                       right: 0, 
//                       left: "auto", 
//                       minWidth: "180px",
//                       position: "absolute" 
//                     }}
//                   >
//                     <li>
//                       <Link 
//                         className="dropdown-item customer_dropdown-item d-flex align-items-center gap-2" 
//                         to="/profile" 
//                         onClick={() => { handleMouseLeave(); setIsMobileMenuOpen(false); }}
//                       >
//                         <FaUser size={14} /> Profile
//                       </Link>
//                     </li>
//                     <li>
//                       <Link 
//                         className="dropdown-item customer_dropdown-item d-flex align-items-center gap-2" 
//                         to="/orders" 
//                         onClick={() => { handleMouseLeave(); setIsMobileMenuOpen(false); }}
//                       >
//                         <FaBoxOpen size={14} /> Order History
//                       </Link>
//                     </li>
//                     <li>
//                       <Link 
//                         className="dropdown-item customer_dropdown-item d-flex align-items-center gap-2" 
//                         to="/support" 
//                         onClick={() => { handleMouseLeave(); setIsMobileMenuOpen(false); }}
//                       >
//                         <FaHeadset size={14} /> Support Desk
//                       </Link>
//                     </li>
//                     <li><hr className="dropdown-divider my-1" /></li>
//                     <li>
//                       <button 
//                         className="dropdown-item customer_dropdown-item text-danger d-flex align-items-center gap-2 fw-semibold" 
//                         onClick={handleLogout}
//                       >
//                         <FaSignOutAlt size={14} /> Logout
//                       </button>
//                     </li>
//                   </ul>
//                 </div>
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



import React, { useState, useEffect } from "react";
import { 
  FaHeart, 
  FaShoppingCart, 
  FaUser, 
  FaBell, 
  FaTimes, 
  FaBars, 
  FaSignOutAlt, 
  FaCog, 
  FaBoxOpen, 
  FaHeadset 
} from "react-icons/fa";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await fetch("https://ecommerce-website-ggui.onrender.com/api/customer/logout", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }).catch(() => {});
      }
    } catch (err) {
      console.error("Logout API error:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("customerUser");

      setIsLoggedIn(false);
      setCartCount(0);
      setWishlistCount(0);
      setUnreadCount(0);
      setActiveDropdown(null);

      alert("Logged Out Successfully!");
      navigate("/customer");
    }
  };

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

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleMouseEnter = (name) => setActiveDropdown(name);
  const handleMouseLeave = () => setActiveDropdown(null);
  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <div className="customer_header-back border-bottom sticky-top z-3">

      {/* ✅ Corrected Colors: Using original #eac35fe4 to match Header.css Gold Theme */}
      <style>{`
        @media (max-width: 991.98px) {
          .customer_mobile_collapse.show {
            background-color: #eac35fe4 !important;
            opacity: 1 !important;
          }
        }

        .customer_user-settings-wrap {
          position: relative !important;
        }

        .customer_user-settings-wrap .customer_dropdown-menu {
          position: absolute !important;
          top: calc(100% + 8px) !important;
          right: 0 !important;
          left: auto !important;
          transform: none !important;
          margin: 0 !important;
          z-index: 2000 !important;
          display: none;
        }

        .customer_user-settings-wrap .customer_dropdown-menu.show {
          display: block !important;
        }
      `}</style>

      <nav className="navbar navbar-expand-lg navbar-light customer_custom-navbar shadow-sm py-2">
        <div className="container-fluid px-4">
          <Link className="navbar-brand d-flex align-items-center customer_navbar-brand" to="/" onClick={closeMobileMenu}>
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

          <div className={`collapse navbar-collapse customer_mobile_collapse ${isMobileMenuOpen ? "show" : ""}`} id="navbar">
            <ul className="navbar-nav mx-auto align-items-lg-center">
              <li className="nav-item">
                <Link className="nav-link customer_nav-link" to="/" onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>

              <li
                className="nav-item dropdown position-relative"
                onMouseEnter={() => handleMouseEnter("shop")}
                onMouseLeave={handleMouseLeave}
              >
                <span
                  className="nav-link customer_nav-link dropdown-toggle"
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleDropdown("shop")}
                >
                  Shop
                </span>
                <ul className={`dropdown-menu customer_dropdown-menu ${activeDropdown === "shop" ? "show" : ""}`}>
                  <li>
                    <Link className="dropdown-item customer_dropdown-item" to="/shop/mens" onClick={closeMobileMenu}>
                      Men's
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item customer_dropdown-item" to="/shop/womens" onClick={closeMobileMenu}>
                      Women's
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item customer_dropdown-item" to="/shop/summer" onClick={closeMobileMenu}>
                      Spring Summer
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item customer_dropdown-item" to="/shop/featured" onClick={closeMobileMenu}>
                      Featured Collection
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link customer_nav-link" to="/gift-guide" onClick={closeMobileMenu}>
                  Gift Guide
                </Link>
              </li>

              <li
                className="nav-item dropdown position-relative"
                onMouseEnter={() => handleMouseEnter("about")}
                onMouseLeave={handleMouseLeave}
              >
                <span
                  className="nav-link customer_nav-link dropdown-toggle"
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleDropdown("about")}
                >
                  About
                </span>
                <ul className={`dropdown-menu customer_dropdown-menu ${activeDropdown === "about" ? "show" : ""}`}>
                  <li>
                    <Link className="dropdown-item customer_dropdown-item" to="/about/history" onClick={closeMobileMenu}>
                      Our History
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item customer_dropdown-item" to="/about/store-location" onClick={closeMobileMenu}>
                      Store Location
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link customer_nav-link" to="/contact" onClick={closeMobileMenu}>
                  Contact
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link customer_nav-link" to="/track-order" onClick={closeMobileMenu}>
                   Track Order
                </Link>
              </li>
            </ul>

            <div className="customer_icons d-flex justify-content-end align-items-center gap-3 ms-auto mt-2 mt-lg-0">
              <Link
                to="/wishlist"
                className="position-relative text-dark fs-5 p-1 text-decoration-none"
                title="Wishlist"
                onClick={closeMobileMenu}
              >
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

              <Link
                to="/notifications"
                className="position-relative text-dark fs-5 p-1 text-decoration-none"
                title="Notifications"
                onClick={closeMobileMenu}
              >
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

              <Link
                to="/cart"
                className="position-relative text-dark fs-5 text-decoration-none p-1"
                title="Cart"
                onClick={closeMobileMenu}
              >
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

              {/* ✅ SETTINGS & USER DROPDOWN SECTION */}
              {isLoggedIn ? (
                <div 
                  className="position-relative dropdown customer_user-settings-wrap"
                  onMouseEnter={() => handleMouseEnter("userSettings")}
                  onMouseLeave={handleMouseLeave}
                >
                  <button 
                    className="btn btn-link text-dark fs-5 p-1 border-0 shadow-none" 
                    onClick={() => toggleDropdown("userSettings")}
                    title="Account Settings"
                  >
                    <FaCog />
                  </button>

                  <ul 
                    className={`dropdown-menu customer_dropdown-menu shadow ${activeDropdown === "userSettings" ? "show" : ""}`}
                    style={{ minWidth: "180px" }}
                  >
                    <li>
                      <Link 
                        className="dropdown-item customer_dropdown-item d-flex align-items-center gap-2" 
                        to="/profile" 
                        onClick={closeMobileMenu}
                      >
                        <FaUser size={14} /> Profile
                      </Link>
                    </li>
                    <li>
                      <Link 
                        className="dropdown-item customer_dropdown-item d-flex align-items-center gap-2" 
                        to="/orders" 
                        onClick={closeMobileMenu}
                      >
                        <FaBoxOpen size={14} /> Order History
                      </Link>
                    </li>
                    <li>
                      <Link 
                        className="dropdown-item customer_dropdown-item d-flex align-items-center gap-2" 
                        to="/support" 
                        onClick={closeMobileMenu}
                      >
                        <FaHeadset size={14} /> Support Desk
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider my-1" /></li>
                    <li>
                      <button 
                        className="dropdown-item customer_dropdown-item text-danger d-flex align-items-center gap-2 fw-semibold" 
                        onClick={() => {
                          closeMobileMenu();
                          handleLogout();
                        }}
                      >
                        <FaSignOutAlt size={14} /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/login" className="text-dark fs-5 p-1" title="Login" onClick={closeMobileMenu}>
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