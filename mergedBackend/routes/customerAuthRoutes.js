



const express = require("express");
const router = express.Router();
const { protectCustomer } = require("../middleware/customerMiddleware");
const {
  registerCustomer,
  loginCustomer,
  logoutCustomer,
  getAllProductsForCustomer,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  addToCart,
  removeFromCart,
  getCart,
  createOrder,
  getCustomerOrders,
  cancelOrder,
  getCustomerNotifications,
  markNotificationsAsRead,
  clearAllNotifications,
  getCustomerProfile,
  updateCustomerProfile,
} = require("../controllers/customerController");

/**
 * @swagger
 * tags:
 *   name: Customer Authentication & Management
 *   description: Customer APIs for Auth, Cart, Wishlist, Orders, Notifications, and Profile Management
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     CustomerBearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Enter your JWT token in the format (e.g. Bearer <token>)
 */

// ==================== AUTH ====================

/**
 * @swagger
 * /api/customer/register:
 *   post:
 *     summary: Register a new customer
 *     tags: [Customer Authentication & Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [fullName, email, mobile, password]
 *             properties:
 *               fullName: { type: string }
 *               email: { type: string }
 *               mobile: { type: string }
 *               dob: { type: string }
 *               password: { type: string }
 *               houseNo: { type: string }
 *               street: { type: string }
 *               city: { type: string }
 *               state: { type: string }
 *               pincode: { type: string }
 *               country: { type: string }
 *     responses:
 *       201:
 *         description: Registration successful
 *       400:
 *         description: Email is already registered
 */
router.post("/register", registerCustomer);

/**
 * @swagger
 * /api/customer/login:
 *   post:
 *     summary: Customer login
 *     tags: [Customer Authentication & Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: Login Successfully
 *       400:
 *         description: Invalid email or password
 */
router.post("/login", loginCustomer);

/**
 * @swagger
 * /api/customer/logout:
 *   post:
 *     summary: Customer logout
 *     tags: [Customer Authentication & Management]
 *     security:
 *       - CustomerBearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
router.post("/logout", protectCustomer, logoutCustomer);

// ==================== PRODUCTS ====================

/**
 * @swagger
 * /api/customer/products:
 *   get:
 *     summary: Get all products for customer
 *     tags: [Customer Authentication & Management]
 *     security:
 *       - CustomerBearerAuth: []
 *     responses:
 *       200:
 *         description: List of products fetched successfully
 */
router.get("/products", protectCustomer, getAllProductsForCustomer);

// ==================== WISHLIST ====================

/**
 * @swagger
 * /api/customer/wishlist/add:
 *   post:
 *     summary: Add product to wishlist
 *     tags: [Customer Authentication & Management]
 *     security:
 *       - CustomerBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId]
 *             properties:
 *               productId: { type: string }
 *               title: { type: string }
 *               description: { type: string }
 *               price: { type: number }
 *               originalPrice: { type: number }
 *               discount: { type: number }
 *               image: { type: string }
 *               sellerId: { type: string }
 *     responses:
 *       201:
 *         description: Added to wishlist successfully
 *       400:
 *         description: Product already in wishlist
 */
router.post("/wishlist/add", protectCustomer, addToWishlist);

/**
 * @swagger
 * /api/customer/wishlist/remove/{id}:
 *   delete:
 *     summary: Remove item from wishlist
 *     tags: [Customer Authentication & Management]
 *     security:
 *       - CustomerBearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Removed from wishlist successfully
 *       404:
 *         description: Item not found in wishlist
 */
router.delete("/wishlist/remove/:id", protectCustomer, removeFromWishlist);

/**
 * @swagger
 * /api/customer/wishlist:
 *   get:
 *     summary: Get customer wishlist
 *     tags: [Customer Authentication & Management]
 *     security:
 *       - CustomerBearerAuth: []
 *     responses:
 *       200:
 *         description: Wishlist items fetched successfully
 */
router.get("/wishlist", protectCustomer, getWishlist);

// ==================== CART ====================

/**
 * @swagger
 * /api/customer/cart/add:
 *   post:
 *     summary: Add item to cart
 *     tags: [Customer Authentication & Management]
 *     security:
 *       - CustomerBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId]
 *             properties:
 *               productId: { type: string }
 *               title: { type: string }
 *               description: { type: string }
 *               price: { type: number }
 *               image: { type: string }
 *               quantity: { type: number }
 *               sellerId: { type: string }
 *     responses:
 *       201:
 *         description: Added to cart successfully
 *       200:
 *         description: Cart quantity updated
 */
router.post("/cart/add", protectCustomer, addToCart);

/**
 * @swagger
 * /api/customer/cart/remove/{id}:
 *   delete:
 *     summary: Remove item from cart
 *     tags: [Customer Authentication & Management]
 *     security:
 *       - CustomerBearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Removed from cart successfully
 *       404:
 *         description: Item not found in cart
 */
router.delete("/cart/remove/:id", protectCustomer, removeFromCart);

/**
 * @swagger
 * /api/customer/cart:
 *   get:
 *     summary: Get customer cart items
 *     tags: [Customer Authentication & Management]
 *     security:
 *       - CustomerBearerAuth: []
 *     responses:
 *       200:
 *         description: Cart items fetched successfully
 */
router.get("/cart", protectCustomer, getCart);

// ==================== ORDERS ====================

/**
 * @swagger
 * /api/customer/order/create:
 *   post:
 *     summary: Create a new order
 *     tags: [Customer Authentication & Management]
 *     security:
 *       - CustomerBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId, productTitle, price, quantity, totalAmount, fullName, phone, address, paymentMethod]
 *             properties:
 *               productId: { type: string }
 *               productTitle: { type: string }
 *               productImage: { type: string }
 *               price: { type: number }
 *               quantity: { type: number }
 *               totalAmount: { type: number }
 *               fullName: { type: string }
 *               phone: { type: string }
 *               address: { type: string }
 *               paymentMethod: { type: string }
 *               paymentStatus: { type: string }
 *               razorpayPaymentId: { type: string }
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Insufficient stock
 *       404:
 *         description: Product not found
 */
router.post("/order/create", protectCustomer, createOrder);

/**
 * @swagger
 * /api/customer/orders:
 *   get:
 *     summary: Get customer orders list
 *     tags: [Customer Authentication & Management]
 *     security:
 *       - CustomerBearerAuth: []
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 */
router.get("/orders", protectCustomer, getCustomerOrders);

/**
 * @swagger
 * /api/customer/order/cancel/{id}:
 *   put:
 *     summary: Cancel an order
 *     tags: [Customer Authentication & Management]
 *     security:
 *       - CustomerBearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Order cancelled successfully
 *       400:
 *         description: Order cannot be cancelled
 *       404:
 *         description: Order not found
 */
router.put("/order/cancel/:id", protectCustomer, cancelOrder);

// ==================== NOTIFICATIONS ====================

/**
 * @swagger
 * /api/customer/notifications:
 *   get:
 *     summary: Get customer notifications
 *     tags: [Customer Authentication & Management]
 *     security:
 *       - CustomerBearerAuth: []
 *     responses:
 *       200:
 *         description: Notifications fetched successfully
 */
router.get("/notifications", protectCustomer, getCustomerNotifications);

/**
 * @swagger
 * /api/customer/notifications/read:
 *   put:
 *     summary: Mark all notifications as read
 *     tags: [Customer Authentication & Management]
 *     security:
 *       - CustomerBearerAuth: []
 *     responses:
 *       200:
 *         description: Notifications marked as read
 */
router.put("/notifications/read", protectCustomer, markNotificationsAsRead);

/**
 * @swagger
 * /api/customer/notifications/clear:
 *   delete:
 *     summary: Clear all notifications
 *     tags: [Customer Authentication & Management]
 *     security:
 *       - CustomerBearerAuth: []
 *     responses:
 *       200:
 *         description: All notifications cleared
 */
router.delete("/notifications/clear", protectCustomer, clearAllNotifications);

// ==================== PROFILE ====================

/**
 * @swagger
 * /api/customer/profile:
 *   get:
 *     summary: Get customer profile details
 *     tags: [Customer Authentication & Management]
 *     security:
 *       - CustomerBearerAuth: []
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 *       404:
 *         description: Customer not found
 */
router.get("/profile", protectCustomer, getCustomerProfile);

/**
 * @swagger
 * /api/customer/profile/update:
 *   put:
 *     summary: Update customer profile information
 *     tags: [Customer Authentication & Management]
 *     security:
 *       - CustomerBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               phone: { type: string }
 *               houseNo: { type: string }
 *               street: { type: string }
 *               city: { type: string }
 *               state: { type: string }
 *               pincode: { type: string }
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       404:
 *         description: Customer not found
 */
router.put("/profile/update", protectCustomer, updateCustomerProfile);

module.exports = router;
