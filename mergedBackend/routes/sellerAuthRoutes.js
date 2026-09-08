
const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getSeller,
  getAllSellers,
  updateSeller,
  updateSellerStatus,
} = require("../controllers/sellerAuthController");
const { protect } = require("../middleware/authMiddleware");
const { protectAdmin } = require("../middleware/adminMiddleware");
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
const { upload } = require("../config/cloudinary");
// ✅ register ke liye: profile pic + brand logo dono
const registerUpload = upload.fields([
  { name: "profilePicture", maxCount: 1 },
  { name: "brandLogo", maxCount: 1 },
]);

// ✅ update ke liye: profile image + brand logo dono
const updateUpload = upload.fields([
  { name: "profileImage", maxCount: 1 },
  { name: "brandLogo", maxCount: 1 },
]);

/**
 * @swagger
 * tags:
 *   name: Seller Auth
 *   description: Seller authentication and profile management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Seller:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "60d0fe4f5311236168a109aa"
 *         name:
 *           type: string
 *           example: "Rahul Sharma"
 *         email:
 *           type: string
 *           example: "seller@example.com"
 *         phone:
 *           type: string
 *           example: "9876543210"
 *         shopName:
 *           type: string
 *           example: "Sharma Shawls"
 *         brandName:
 *           type: string
 *           example: "Sharma Shawls Premium"
 *         address:
 *           type: string
 *           example: "Main Market"
 *         city:
 *           type: string
 *           example: "Amritsar"
 *         state:
 *           type: string
 *           example: "Punjab"
 *         pincode:
 *           type: string
 *           example: "143001"
 *         status:
 *           type: string
 *           example: "Approved"
 *         profileImage:
 *           type: string
 *           example: "uploads/image.jpg"
 *         brandLogo:
 *           type: string
 *           example: "uploads/logo.jpg"
 *         createdAt:
 *           type: string
 *           format: date-time
 *   securitySchemes:
 *     SellerBearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/seller/auth:
 *   get:
 *     summary: Get all sellers (Admin Panel)
 *     tags: [Seller Auth]
 *     security:
 *       - SellerBearerAuth: []
 *     responses:
 *       '200':
 *         description: List of all sellers fetched successfully
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Server Error
 */
router.get("/", protectAdmin, getAllSellers);

/**
 * @swagger
 * /api/seller/auth/register:
 *   post:
 *     summary: Register a new seller
 *     tags: [Seller Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - shopName
 *               - address
 *               - city
 *               - state
 *               - pincode
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               shopName:
 *                 type: string
 *               brandName:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               pincode:
 *                 type: string
 *               password:
 *                 type: string
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *               brandLogo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '201':
 *         description: Seller Registered Successfully
 *       '400':
 *         description: Seller already exists
 *       '500':
 *         description: Server Error
 */
router.post("/register", registerUpload, register);

/**
 * @swagger
 * /api/seller/auth/login:
 *   post:
 *     summary: Seller login
 *     tags: [Seller Auth]
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
 *                 example: "seller@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       '200':
 *         description: Login Successful
 *       '400':
 *         description: Seller not found or Invalid Password
 *       '403':
 *         description: Seller not approved / rejected by admin
 *       '500':
 *         description: Server Error
 */
router.post("/login", login);

/**
 * @swagger
 * /api/seller/auth/update/{id}:
 *   put:
 *     summary: Update seller details
 *     tags: [Seller Auth]
 *     security:
 *       - SellerBearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               shopName:
 *                 type: string
 *               brandName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               pincode:
 *                 type: string
 *               password:
 *                 type: string
 *               profileImage:
 *                 type: string
 *                 format: binary
 *               brandLogo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Profile Updated Successfully
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Seller not found
 *       '500':
 *         description: Server Error
 */
router.put("/update/:id", protect, updateUpload, updateSeller);

/**
 * @swagger
 * /api/seller/auth/status/{id}:
 *   put:
 *     summary: Update seller approval status (Admin Panel)
 *     tags: [Seller Auth]
 *     security:
 *       - SellerBearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *                 enum: [Pending, Approved, Rejected]
 *                 example: "Approved"
 *     responses:
 *       '200':
 *         description: Seller status updated successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Seller not found
 *       '500':
 *         description: Server Error
 */
router.put("/status/:id", protectAdmin, updateSellerStatus);

/**
 * @swagger
 * /api/seller/auth/{id}:
 *   get:
 *     summary: Get seller details by ID (Logged-in seller only)
 *     tags: [Seller Auth]
 *     security:
 *       - SellerBearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "60d0fe4f5311236168a109aa"
 *     responses:
 *       '200':
 *         description: Seller details fetched successfully
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Seller not found
 *       '500':
 *         description: Server Error
 */
router.get("/:id", protect, getSeller);

module.exports = router;