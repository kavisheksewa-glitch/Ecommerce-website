// import React from 'react';
// import './Footer.css'; // Styling file ko import karein

// const Footer = () => {
//   return (
//     <footer className="luxury-footer">
//       <div className="footer-container">
        
//         {/* Column 1: Brand Info */}
//         <div className="footer-col">
//           <h3 className="brand-title">KAVI SHAWLS</h3>
//           <p className="brand-desc">
//             Experience the pure elegance of premium luxury shawls crafted with tradition and royal heritage.
//           </p>
//         </div>
        
//         {/* Column 2: Shop Links */}
//         <div className="footer-col">
//           <h4>Shop</h4>
//           <ul>
//             <li><a href="/shop/mens">Men's Collection</a></li>
//             <li><a href="/shop/womens">Women's Collection</a></li>
//             <li><a href="/shop/summer">Springsummer</a></li>
//             <li><a href="/shop/featured">Featured collection</a></li>
//           </ul>
//         </div>

//         {/* Column 3: Customer Support */}
//         <div className="footer-col">
//           <h4>Support</h4>
//           <ul>
//             <li><a href="/contact">Contact Us</a></li>
//             <li><a href="/shipping-returns">Shipping & Returns</a></li>
//             <li><a href="/track-order">Track Order</a></li>
//             <li><a href="/privacy-policy">Privacy Policy</a></li>
//           </ul>
//         </div>

//         {/* Column 4: Newsletter */}
//         <div className="footer-col">
//           <h4>Newsletter</h4>
//           <p className="newsletter-text">Subscribe for exclusive luxury updates and offers.</p>
//           <div className="newsletter-form">
//             <input type="email" placeholder="Your Email Address" />
//             <button type="button">Subscribe</button>
//           </div>
//         </div>

//       </div>
      
//       {/* Bottom Copyright Bar */}
//       <div className="footer-bottom">
//         <p>&copy; {new Date().getFullYear()} Kavi Shawls. All Rights Reserved.</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


//import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import React, { useState } from "react";
const Footer = () => {
  // new

  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleToggleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
    // Yahan aap apna backend API call bhi laga sakte hain subscribe/unsubscribe ke liye
  };
  return (
    <footer className="customer_luxury-footer">
      <div className="customer_footer-container">
        {/* Column 1: Brand Info */}
        <div className="customer_footer-col">
          <h3 className="customer_brand-title">KAVI SHAWLS</h3>
          <p className="customer_brand-desc">
            Experience the pure elegance of premium luxury shawls crafted with tradition and royal heritage.
          </p>
        </div>

        {/* Column 2: Shop Links */}
        <div className="customer_footer-col">
          <h4>Shop</h4>
          <ul>
            {/* ✅ fixed: <a> ki jagah <Link> use kiya, isse SPA navigation smooth rahega (no full reload) */}
            <li><Link to="/shop/mens">Men's Collection</Link></li>
            <li><Link to="/shop/womens">Women's Collection</Link></li>
            <li><Link to="/shop/summer">Springsummer</Link></li>
            <li><Link to="/shop/featured">Featured collection</Link></li>
          </ul>
        </div>

        {/* Column 3: Customer Support */}
        <div className="customer_footer-col">
          <h4>Support</h4>
          <ul>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/shipping-returns">Shipping & Returns</Link></li>
            <li><Link to="/track-order">Track Order</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        {/* <div className="customer_footer-col">
          <h4>Newsletter</h4>
          <p className="customer_newsletter-text">Subscribe for exclusive luxury updates and offers.</p>
          <div className="customer_newsletter-form">
            <input type="email" placeholder="KaviShawls30@ggmail.com" />
            <button type="button">Subscribe</button>
          </div>
        </div> */}

        <div className="customer_footer-col">
      <h4>Newsletter</h4>
      <p className="customer_newsletter-text">Subscribe for exclusive luxury updates and offers.</p>
      <div className="customer_newsletter-form">
        <input 
          type="email" 
          value="KaviShawls30@gmail.com" 
          readOnly 
        />
        <button type="button" onClick={handleToggleSubscribe}>
          {isSubscribed ? "Unsubscribe" : "Subscribe"}
        </button>
      </div>
    </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="customer_footer-bottom">
        <p>&copy; {new Date().getFullYear()} Kavi Shawls. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
