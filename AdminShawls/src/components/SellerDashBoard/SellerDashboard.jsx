

//claude office 




// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./SellerDashboard.css";
// import SellerHeader from "../SellerHeader/SellerHeader";
// import logo from "../../assets/logooo.png";

// function SellerDashboard() {
//   const navigate = useNavigate();

//   const [stats, setStats] = useState({
//     totalProducts: 0,
//     pendingOrders: 0,
//     deliveredOrders: 0,
//     todaysSales: 0,
//     monthlyRevenue: 0,
//     lowStock: 0,
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDashboardStats = async () => {
//       const sellerToken = localStorage.getItem("sellerToken");

//       if (!sellerToken) {
//         navigate("/seller/login");
//         return;
//       }

//       try {
//         // ✅ PRODUCTS — sirf isi seller ke products
//         const productsRes = await fetch("https://ecommerce-website-ggui.onrender.com/api/seller/products", {
//           headers: { Authorization: `Bearer ${sellerToken}` },
//         });
//         const productsData = await productsRes.json();
//         const products = Array.isArray(productsData)
//           ? productsData
//           : productsData.products || [];

//         const totalProducts = products.length;
//         const lowStock = products.filter(
//           (p) => Number(p.stockQuantity ?? p.stock ?? 0) < 5
//         ).length;

//         // ✅ ORDERS — ab naya secure route use ho raha hai jo server-side hi
//         // JWT se seller ki id nikaal ke sirf uske orders return karta hai.
//         // (Pehle client-side token decode karke filter karna padta tha.)
//         const ordersRes = await fetch("https://ecommerce-website-ggui.onrender.com/api/shawls/orders/seller/my-orders", {
//           headers: { Authorization: `Bearer ${sellerToken}` },
//         });
//         const ordersData = await ordersRes.json();
//         const myOrders = ordersData.success && Array.isArray(ordersData.orders)
//           ? ordersData.orders
//           : [];

//         const pending = myOrders.filter(
//           (o) =>
//             !o.orderStatus ||
//             o.orderStatus === "Processing" ||
//             o.orderStatus === "Pending"
//         ).length;

//         const delivered = myOrders.filter(
//           (o) => o.orderStatus === "Delivered"
//         ).length;

//         const totalRevenue = myOrders.reduce(
//           (sum, order) => sum + (Number(order.totalAmount) || 0),
//           0
//         );

//         setStats({
//           totalProducts,
//           pendingOrders: pending,
//           deliveredOrders: delivered,
//           todaysSales: totalRevenue,
//           monthlyRevenue: totalRevenue,
//           lowStock,
//         });
//       } catch (err) {
//         console.error("Error fetching real dashboard stats:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardStats();
//   }, [navigate]);

//   return (
//     <div className="Seller_dashboard-page">
//       <SellerHeader />

//       <div className="container py-5 mt-5">
//         <h2 className="text-center fw-bold mb-5 Seller_dashboard-title">
//           <img
//             src={logo}
//             alt="Kavi Shawls Logo"
//             className="Seller_dashboard-logo"
//           />
//           Kavi Shawls Seller Dashboard
//         </h2>

//         {loading ? (
//           <p className="text-center">Loading your dashboard...</p>
//         ) : (
//           <>
//             <div className="row g-4">
//               <div className="col-lg-4 col-md-6">
//                 <div className="card shadow border-0 text-center p-4 Seller_card">
//                   <h5>Total Products</h5>
//                   <h2 className="text-primary">{stats.totalProducts}</h2>
//                 </div>
//               </div>

//               <div className="col-lg-4 col-md-6">
//                 <div className="card shadow border-0 text-center p-4 Seller_card">
//                   <h5>Pending Orders</h5>
//                   <h2 className="text-warning">{stats.pendingOrders}</h2>
//                 </div>
//               </div>

//               <div className="col-lg-4 col-md-6">
//                 <div className="card shadow border-0 text-center p-4 Seller_card">
//                   <h5>Delivered Orders</h5>
//                   <h2 className="text-success">{stats.deliveredOrders}</h2>
//                 </div>
//               </div>

//               <div className="col-lg-4 col-md-6">
//                 <div className="card shadow border-0 text-center p-4 Seller_card">
//                   <h5>Today's Sales</h5>
//                   <h2 className="text-danger">₹{stats.todaysSales.toLocaleString()}</h2>
//                 </div>
//               </div>

//               <div className="col-lg-4 col-md-6">
//                 <div className="card shadow border-0 text-center p-4 Seller_card">
//                   <h5>Monthly Revenue</h5>
//                   <h2 className="text-info">₹{stats.monthlyRevenue.toLocaleString()}</h2>
//                 </div>
//               </div>

//               <div className="col-lg-4 col-md-6">
//                 <div className="card shadow border-0 text-center p-4 Seller_card">
//                   <h5>Low Stock Products</h5>
//                   <h2 className="text-danger">{stats.lowStock}</h2>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}

//         <div className="row g-4 mt-4">
//           <div className="col-lg-4 col-md-6">
//             <button
//               className="Seller_dashboard-menu-btn"
//               onClick={() => navigate("/add-product")}
//             >
//               <span className="Seller_menu-icon">➕</span>
//               <span>
//                 <strong>Add Product</strong>
//                 <small>Add new products to your shop</small>
//               </span>
//               <span className="Seller_arrow">→</span>
//             </button>
//           </div>

//           <div className="col-lg-4 col-md-6">
//             <button
//               className="Seller_dashboard-menu-btn"
//               onClick={() => navigate("/product-categories")}
//             >
//               <span className="Seller_menu-icon">📂</span>
//               <span>
//                 <strong>Product Categories</strong>
//                 <small>Manage your product categories</small>
//               </span>
//               <span className="Seller_arrow">→</span>
//             </button>
//           </div>

//           <div className="col-lg-4 col-md-6">
//             <button
//               className="Seller_dashboard-menu-btn"
//               onClick={() => navigate("/manage-products")}
//             >
//               <span className="Seller_menu-icon">📋</span>
//               <span>
//                 <strong>Manage Products</strong>
//                 <small>View and edit your products</small>
//               </span>
//               <span className="Seller_arrow">→</span>
//             </button>
//           </div>

//           <div className="col-lg-4 col-md-6">
//             <button
//               className="Seller_dashboard-menu-btn"
//               onClick={() => navigate("/shipping")}
//             >
//               <span className="Seller_menu-icon">🚚</span>
//               <span>
//                 <strong>Shipping</strong>
//                 <small>Manage your shipments</small>
//               </span>
//               <span className="Seller_arrow">→</span>
//             </button>
//           </div>

//           <div className="col-lg-4 col-md-6">
//             <button
//               className="Seller_dashboard-menu-btn"
//               onClick={() => navigate("/payment-gateway")}
//             >
//               <span className="Seller_menu-icon">💳</span>
//               <span>
//                 <strong>Payment Details</strong>
//                 <small>Manage payment settings</small>
//               </span>
//               <span className="Seller_arrow">→</span>
//             </button>
//           </div>

//           <div className="col-lg-4 col-md-6">
//             <button
//               className="Seller_dashboard-menu-btn"
//               onClick={() => navigate("/analytics")}
//             >
//               <span className="Seller_menu-icon">📈</span>
//               <span>
//                 <strong>Analytics</strong>
//                 <small>View sales and performance</small>
//               </span>
//               <span className="Seller_arrow">→</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SellerDashboard;




//000003 sept 2026 evening

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SellerDashboard.css";
import SellerHeader from "../SellerHeader/SellerHeader";
import logo from "../../assets/logooo.png";

function SellerDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalProducts: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    todaysSales: 0,
    monthlyRevenue: 0,
    lowStock: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      const sellerToken = localStorage.getItem("sellerToken");

      if (!sellerToken) {
        navigate("/seller/login");
        return;
      }

      try {
        // ✅ PRODUCTS — sirf isi seller ke products
        const productsRes = await fetch("https://ecommerce-website-ggui.onrender.com/api/seller/products", {
          headers: { Authorization: `Bearer ${sellerToken}` },
        });
        const productsData = await productsRes.json();
        const products = Array.isArray(productsData)
          ? productsData
          : productsData.products || [];

        const totalProducts = products.length;
        const lowStock = products.filter(
          (p) => Number(p.stockQuantity ?? p.stock ?? 0) < 5
        ).length;

        // ✅ ORDERS — ab naya secure route use ho raha hai jo server-side hi
        // JWT se seller ki id nikaal ke sirf uske orders return karta hai.
        // (Pehle client-side token decode karke filter karna padta tha.)
        const ordersRes = await fetch("https://ecommerce-website-ggui.onrender.com/api/shawls/orders/seller/my-orders", {
          headers: { Authorization: `Bearer ${sellerToken}` },
        });
        const ordersData = await ordersRes.json();
        const myOrders = ordersData.success && Array.isArray(ordersData.orders)
          ? ordersData.orders
          : [];

        const pending = myOrders.filter(
          (o) =>
            !o.orderStatus ||
            o.orderStatus === "Processing" ||
            o.orderStatus === "Pending"
        ).length;

        const delivered = myOrders.filter(
          (o) => o.orderStatus === "Delivered"
        ).length;

        const totalRevenue = myOrders.reduce(
          (sum, order) => sum + (Number(order.totalAmount) || 0),
          0
        );

        setStats({
          totalProducts,
          pendingOrders: pending,
          deliveredOrders: delivered,
          todaysSales: totalRevenue,
          monthlyRevenue: totalRevenue,
          lowStock,
        });
      } catch (err) {
        console.error("Error fetching real dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, [navigate]);

  return (
    <div className="Seller_dashboard-page">
      <SellerHeader />

      <div className="container py-5 Seller_dashboard-content">
        <h1 className="text-center fw-bold mb-5 Seller_dashboard-title">
          <img
            src={logo}
            alt="Kavi Shawls Logo"
            className="Seller_dashboard-logo"
          />
          Kavi Shawls Seller Dashboard
        </h1>

        {loading ? (
          <p className="text-center">Loading your dashboard...</p>
        ) : (
          <>
            <div className="row g-4">
              <div className="col-6 col-lg-4 col-md-6">
                <div className="card shadow border-0 text-center p-4 Seller_card">
                  <h5>Total Products</h5>
                  <h1 className="text-primary">{stats.totalProducts}</h1>
                </div>
              </div>

              <div className="col-6 col-lg-4 col-md-6">
                <div className="card shadow border-0 text-center p-4 Seller_card">
                  <h5>Pending Orders</h5>
                  <h1 className="text-warning">{stats.pendingOrders}</h1>
                </div>
              </div>

              <div className="col-6 col-lg-4 col-md-6">
                <div className="card shadow border-0 text-center p-4 Seller_card">
                  <h5>Delivered Orders</h5>
                  <h2 className="text-success">{stats.deliveredOrders}</h2>
                </div>
              </div>

              <div className="col-6 col-lg-4 col-md-6">
                <div className="card shadow border-0 text-center p-4 Seller_card">
                  <h5>Today's Sales</h5>
                  <h1 className="text-danger">₹{stats.todaysSales.toLocaleString()}</h1>
                </div>
              </div>

              <div className="col-6 col-lg-4 col-md-6">
                <div className="card shadow border-0 text-center p-4 Seller_card">
                  <h5>Monthly Revenue</h5>
                  <h1 className="text-info">₹{stats.monthlyRevenue.toLocaleString()}</h1>
                </div>
              </div>

              <div className="col-6 col-lg-4 col-md-6">
                <div className="card shadow border-0 text-center p-4 Seller_card">
                  <h5>Low Stock Products</h5>
                  <h1 className="text-danger">{stats.lowStock}</h1>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="row g-4 mt-4">
          <div className="col-lg-4 col-md-6">
            <button
              className="Seller_dashboard-menu-btn"
              onClick={() => navigate("/add-product")}
            >
              <span className="Seller_menu-icon">➕</span>
              <span>
                <strong>Add Product</strong>
                <small>Add new products to your shop</small>
              </span>
              <span className="Seller_arrow">→</span>
            </button>
          </div>

          <div className="col-lg-4 col-md-6">
            <button
              className="Seller_dashboard-menu-btn"
              onClick={() => navigate("/product-categories")}
            >
              <span className="Seller_menu-icon">📂</span>
              <span>
                <strong>Product Categories</strong>
                <small>Manage your product categories</small>
              </span>
              <span className="Seller_arrow">→</span>
            </button>
          </div>

          <div className="col-lg-4 col-md-6">
            <button
              className="Seller_dashboard-menu-btn"
              onClick={() => navigate("/manage-products")}
            >
              <span className="Seller_menu-icon">📋</span>
              <span>
                <strong>Manage Products</strong>
                <small>View and edit your products</small>
              </span>
              <span className="Seller_arrow">→</span>
            </button>
          </div>

          <div className="col-lg-4 col-md-6">
            <button
              className="Seller_dashboard-menu-btn"
              onClick={() => navigate("/shipping")}
            >
              <span className="Seller_menu-icon">🚚</span>
              <span>
                <strong>Shipping</strong>
                <small>Manage your shipments</small>
              </span>
              <span className="Seller_arrow">→</span>
            </button>
          </div>

          <div className="col-lg-4 col-md-6">
            <button
              className="Seller_dashboard-menu-btn"
              onClick={() => navigate("/payment-gateway")}
            >
              <span className="Seller_menu-icon">💳</span>
              <span>
                <strong>Payment Details</strong>
                <small>Manage payment settings</small>
              </span>
              <span className="Seller_arrow">→</span>
            </button>
          </div>

          <div className="col-lg-4 col-md-6">
            <button
              className="Seller_dashboard-menu-btn"
              onClick={() => navigate("/analytics")}
            >
              <span className="Seller_menu-icon">📈</span>
              <span>
                <strong>Analytics</strong>
                <small>View sales and performance</small>
              </span>
              <span className="Seller_arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;