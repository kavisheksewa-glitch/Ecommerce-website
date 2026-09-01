


//claude evening




import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation, Outlet } from "react-router-dom";
import ScrollToTop from "./component/ScrollTop/ScrollToTop";
import ScrollToTop2 from "./components/SellerScrollTop/ScrollToTop2";
import ScrollToTop3 from "./pages/AdminScrollTop/ScrollToTop3";
// Components (Customer & Admin)
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import Home from "./component/Home/Home";
import Men from "./component/Men/men";
import Women from "./component/Women/women";
import Spring from "./component/SpringSummer/Springsummer";
import Featured from "./component/Featured/Featuredcoll";
import GiftGuide from "./component/GiftGuide/GiftGuide";
import BirthdayGifts from "./component/BirthdayGifts/BirthdayGifts";
import WeddingGifts from "./component/WeddingGift/WeddingGifts";
import FestiveGifts from "./component/FestiveGifts/FestiveGifts";
import LuxuryGiftSets from "./component/LuxuryGift/LuxuryGiftSets";
import History from "./component/History1/History"; 
import StoreLocation from "./component/StoreLocation1/Storelocation";
import Login from "./component/Login/Login";
import ForgotPassword from "./component/ForgetPassword/ForgotPassword";
import CustomerRegister from "./component/CustomerRegister/CustomerRegister"; 
//import Search from "./component/Search/Search";
import Wishlist from "./component/Whislist/Wishlist";
import Cart from "./component/Cart/cart";
import ShippingReturns from "./component/Shipping/ShippingReturns";
import TrackOrder from "./component/Trackord/TrackOrder";
import PrivacyPolicy from "./component/Privacy/PrivacyPolicy";
import Contact from "./component/Contact/Contact";
import Notifications from "./component/Notifications/Notifications";
import Checkout from "./component/CheckOut/Checkout";
import ProductDetail from "./component/ProductDetails/ProductDetail";

// Admin Pages
import AdminLogin from "./pages/AdminLoginPage/AdminLogin";
import AdminDashboard from "./pages/AdminDashBoard/AdminDashboard";
import AdminProducts from "./pages/AdminProducts/AdminProducts";
import AdminAddProduct from "./pages/AdminAddProduct/AdminAddProduct";
import AdminOrders from "./pages/AdminOrderhandle/AdminOrders";
import AdminUsers from "./pages/AdminUser/AdminUsers";
import AdminSellers from "./pages/AdminSeller/AdminSeller";
// Components (Seller Dashboard)
import SellerHeader from "./components/SellerHeader/SellerHeader";
import SellerLogin from "./components/SellerLogin1cor/SellerLogin";
import SellerSignup from "./components/SellerSignup/SellerSignup";
import SellerDashboard from "./components/SellerDashBoard/SellerDashboard";
import AddProduct from "./components/SellerAddProduct/AddProduct";
import ProductCategories from "./components/SellerProductCategories/ProductCategories";
import ProductsList from "./components/SellerProductList/ProductsList";
import InventoryStock from "./components/SellerInventory/InventoryStock";
import ManageProducts from "./components/SellerManageProduct/ManageProducts";
import Shipping from "./components/SellerShipping/Shipping";
import PaymentGateway from "./components/SellerPaymentDetails/PaymentGateway";
import Analytics from "./components/SellerAnalytics/Analytics";
import Notification from "./components/SellerNotification/Notification";
import Settings from "./components/SellerSettings/Settings";
import SellerDetails from "./components/SellerDetails/SellerDetails";
import SellerForgetPassword from "./components/SellerForgetPassword/SellerForgetPassword";
import FrontPage from './FrontPage';
import VerifyEmail from "./component/Verifyemail";
// Customer Layout (Includes Header and Footer)
const CustomerLayout = () => (
  <div>
    <Header />
    <Outlet />
    <Footer />
  </div>
);

function AppContent() {
  const [cartProductIds, setCartProductIds] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const isSellerRoute =
    location.pathname.startsWith("/seller") ||
    ["/add-product", "/product-categories", "/inventory-stock", "/manage-products", "/shipping", "/payment-gateway", "/analytics", "/notification", "/settings", "/seller-details"].includes(location.pathname);

  const showSellerHeader = isSellerRoute && !location.pathname.includes("/seller/login") && !location.pathname.includes("/seller/signup");

  // ✅ Global Cart IDs Fetching — /api/customer/cart, JWT token ke sath
  // (Purana "/api/cart/:userId" route exist hi nahi karta tha, isiliye 404 aa raha tha)
  const fetchCartIds = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCartProductIds([]);
      return;
    }

    fetch("http://localhost:5000/api/customer/cart", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`Server returned status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.success && Array.isArray(data.cart)) {
          const ids = data.cart.map((item) => item.productId);
          setCartProductIds(ids);
        }
      })
      .catch((err) => console.error("Error fetching cart items:", err.message));
  };

  useEffect(() => {
    fetchCartIds();

    // Kisi bhi page se cart update hone par yahan bhi turant refresh ho jaye
    window.addEventListener("cartUpdated", fetchCartIds);
    return () => window.removeEventListener("cartUpdated", fetchCartIds);
  }, []);

  // ✅ Global Add To Cart Function — /api/customer/cart/add, JWT token ke sath
  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
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
          productId: product.id || product._id,
          title: product.title || product.productName,
          description: product.description || "No description",
          price: product.price,
          image: product.image || product.productImage,
          quantity: 1,
          sellerId: product.sellerId || product.seller || "default_seller_id",
        }),
      });

      if (response.ok) {
        setCartProductIds((prev) => [...prev, product.id || product._id]);
        window.dispatchEvent(new Event("cartUpdated"));
      } else {
        const errData = await response.json();
        console.error("Failed to add to cart:", errData.message);
      }
    } catch (err) {
      console.error("Error connecting to backend:", err);
    }
  };

  const handleBuyNow = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    if (!cartProductIds.includes(product.id)) {
      await handleAddToCart(product);
    }
    navigate("/checkout", { state: { product } });
  };

  return (
    <>
    <ScrollToTop />
    <ScrollToTop2 />
    <ScrollToTop3/>
      {showSellerHeader && <SellerHeader />}
      <Routes>
        <Route path="/" element={<FrontPage />} />
        {/* --- ADMIN ROUTES --- */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/products/add" element={<AdminAddProduct />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/sellers" element={<AdminSellers />} />
        {/* --- SELLER ROUTES --- */}
        <Route path="/seller/login" element={<SellerLogin />} />
        <Route path="/seller/signup" element={<SellerSignup />} />
        <Route path="/seller/forget" element={<SellerForgetPassword />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/product-categories" element={<ProductCategories />} />
        <Route path="/seller/products" element={<ProductsList />} />
        <Route path="/inventory-stock" element={<InventoryStock />} />
        <Route path="/manage-products" element={<ManageProducts />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment-gateway" element={<PaymentGateway />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/seller-details" element={<SellerDetails />} />

        {/* --- CUSTOMER ROUTES (Wrapped in Header & Footer Layout) --- */}
        <Route element={<CustomerLayout />}>


          <Route
            path="/customer"
            element={
              <Home
                cartProductIds={cartProductIds}
                handleAddToCart={handleAddToCart}
              />
            }
          />
          <Route path="/shop/mens" element={<Men />} />
          <Route path="/shop/womens" element={<Women />} />
          <Route path="/shop/summer" element={<Spring />} />
          <Route path="/shop/featured" element={<Featured />} />
          <Route path="/gift-guide" element={<GiftGuide />} />
          <Route path="/gifts/birthday" element={<BirthdayGifts />} />
          <Route path="/gifts/wedding" element={<WeddingGifts />} />
          <Route path="/gifts/festive" element={<FestiveGifts />} />
          <Route path="/gifts/luxury-sets" element={<LuxuryGiftSets />} />
          <Route path="/about/store-location" element={<StoreLocation />} />
          <Route path="/about/History" element={<History />} />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path="/search" element={<Search />} /> */}
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/signup" element={<CustomerRegister />} />
          <Route path="/shipping-returns" element={<ShippingReturns />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route
            path="/product/:id"
            element={
              <ProductDetail
                cartProductIds={cartProductIds}
                handleAddToCart={handleAddToCart}
                handleBuyNow={handleBuyNow}
              />
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default function App() {
  return <AppContent />;
}