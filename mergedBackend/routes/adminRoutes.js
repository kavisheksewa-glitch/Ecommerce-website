
const express = require("express");
const router = express.Router();
const {
  adminLogin,
  getAllUsers,
  getAllSellers,
  updateSellerStatus,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/AdminController");
const { protectAdmin } = require("../middleware/adminMiddleware");

/**
 * @swagger
 * tags:
 *   name: Admin Management
 *   description: Admin management APIs
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     AdminBearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Enter your JWT token in the format (e.g. Bearer <token>)
 *   schemas:
 *     Admin:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "60d0fe4f5311236168a109ff"
 *         email:
 *           type: string
 *           example: "admin@gmail.com"
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Admin Login
 *     description: Authenticates the admin using email and password and returns a JWT token.
 *     tags: [Admin Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "admin@gmail.com"
 *               password:
 *                 type: string
 *                 example: "admin123"
 *     responses:
 *       '200':
 *         description: Login Successful with JWT Token
 *       '400':
 *         description: Invalid Email or Password
 *       '500':
 *         description: Server Error
 */
router.post("/login", adminLogin);

// ==================== GET ALL USERS ROUTE ====================
/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users for admin
 *     tags: [Admin Management]
 *     security:
 *       - AdminBearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *       401:
 *         description: Not authorized, no token provided
 */
router.get("/users", protectAdmin, getAllUsers);

// ==================== GET ALL SELLERS ROUTE ====================
/**
 * @swagger
 * /api/admin/sellers:
 *   get:
 *     summary: Get all registered sellers for admin
 *     tags: [Admin Management]
 *     security:
 *       - AdminBearerAuth: []
 *     responses:
 *       200:
 *         description: List of all sellers retrieved successfully
 *       401:
 *         description: Not authorized
 */
router.get("/sellers", protectAdmin, getAllSellers);

// ==================== UPDATE SELLER STATUS (Approve / Reject) ====================
/**
 * @swagger
 * /api/admin/seller/{id}/status:
 *   put:
 *     summary: Approve or Reject a Seller
 *     tags: [Admin Management]
 *     security:
 *       - AdminBearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Seller ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Approved, Rejected, Pending]
 *                 example: "Approved"
 *     responses:
 *       200:
 *         description: Seller status updated successfully
 *       404:
 *         description: Seller not found
 */
router.put("/seller/:id/status", protectAdmin, updateSellerStatus);

// ==================== GET ALL ORDERS ROUTE ====================
/**
 * @swagger
 * /api/admin/orders:
 *   get:
 *     summary: Get all system orders for admin
 *     description: Fetches a list of all orders placed across the platform.
 *     tags: [Admin Management]
 *     security:
 *       - AdminBearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 5
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Server Error
 */
router.get("/orders", protectAdmin, getAllOrders);

// ==================== UPDATE ORDER STATUS & TRACKING ID ====================
/**
 * @swagger
 * /api/admin/order/{id}/status:
 *   put:
 *     summary: Update Order Status and Tracking ID
 *     tags: [Admin Management]
 *     security:
 *       - AdminBearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderStatus:
 *                 type: string
 *                 enum: [Processing, Shipped, Delivered, Cancelled]
 *                 example: "Shipped"
 *               trackingId:
 *                 type: string
 *                 example: "TRK123456789"
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       404:
 *         description: Order not found
 */
router.put("/order/:id/status", protectAdmin, updateOrderStatus);

module.exports = router;