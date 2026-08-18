// const express = require("express");
// const router = express.Router();
// const multer = require("multer");

// const {
//   register,
//   login,
//   getSeller,
//   getAllSellers,
//   updateSeller,
//   updateSellerStatus,
// } = require("../controllers/sellerAuthController");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// router.post("/register", upload.single("profilePicture"), register);
// router.post("/login", login);
// router.get("/seller/:id", getSeller);
// router.put("/seller/:id", upload.single("profilePicture"), updateSeller); // <-- Yahan upload middleware add kar diya gaya hai
// router.get("/admin/sellers", getAllSellers);
// router.put("/admin/seller-status/:id", updateSellerStatus); // Yahan apna controller function name dein

// module.exports = router;



// swagger








const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  register,
  login,
  getSeller,
  getAllSellers,
  updateSeller,
  updateSellerStatus,
} = require("../controllers/sellerAuthController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/**
 * @swagger
 * tags:
 *   name: Seller login and register 
 *   description: Seller login and register management APIs
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
 *           example: "60d0fe4f5311236168a109cc"
 *         name:
 *           type: string
 *           example: "Ahmad Shawls"
 *         email:
 *           type: string
 *           example: "seller@gmail.com"
 *         status:
 *           type: string
 *           example: "Approved"
 *         profilePicture:
 *           type: string
 *           example: "uploads/1624356789-profile.jpg"
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/seller/auth/register:
 *   post:
 *     summary: Register a new seller
 *     description: Registers a new seller with an optional profile picture upload via multipart/form-data.
 *     tags: [Seller login and register]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Ahmad Shawls"
 *               email:
 *                 type: string
 *                 example: "seller@gmail.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '201':
 *         description: Seller registered successfully
 *       '400':
 *         description: Bad request or email already exists
 *       '500':
 *         description: Server error
 */
router.post("/register", upload.single("profilePicture"), register);

/**
 * @swagger
 * /api/seller/auth/login:
 *   post:
 *     summary: Login seller
 *     description: Authenticates a seller using email and password.
 *     tags: [Seller login and register]
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
 *                 example: "seller@gmail.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       '200':
 *         description: Login successful
 *       '400':
 *         description: Invalid credentials
 *       '500':
 *         description: Server error
 */
router.post("/login", login);

/**
 * @swagger
 * /api/seller/auth/seller/{id}:
 *   get:
 *     summary: Get seller profile by ID
 *     description: Retrieves details of a specific seller.
 *     tags: [Seller login and register]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique seller ID
 *         example: "60d0fe4f5311236168a109cc"
 *     responses:
 *       '200':
 *         description: Seller details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Seller'
 *       '404':
 *         description: Seller not found
 *       '500':
 *         description: Server error
 */
router.get("/seller/:id", getSeller);

/**
 * @swagger
 * /api/seller/auth/seller/{id}:
 *   put:
 *     summary: Update seller profile
 *     description: Updates seller information along with an optional new profile picture upload.
 *     tags: [Seller login and register]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique seller ID
 *         example: "60d0fe4f5311236168a109cc"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Ahmad Shawls"
 *               email:
 *                 type: string
 *                 example: "seller@gmail.com"
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Seller updated successfully
 *       '404':
 *         description: Seller not found
 *       '500':
 *         description: Server error
 */
router.put("/seller/:id", upload.single("profilePicture"), updateSeller);

/**
 * @swagger
 * /api/seller/auth/admin/sellers:
 *   get:
 *     summary: Get all sellers (Admin)
 *     description: Retrieves a list of all registered sellers.
 *     tags: [Seller login and register]
 *     responses:
 *       '200':
 *         description: List of sellers fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Seller'
 *       '500':
 *         description: Server error
 */
router.get("/admin/sellers", getAllSellers);

/**
 * @swagger
 * /api/seller/auth/admin/seller-status/{id}:
 *   put:
 *     summary: Update seller status (Admin)
 *     description: Approves or rejects a seller account status.
 *     tags: [Seller login and register]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique seller ID
 *         example: "60d0fe4f5311236168a109cc"
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
 *                 example: "Approved"
 *     responses:
 *       '200':
 *         description: Seller status updated successfully
 *       '404':
 *         description: Seller not found
 *       '500':
 *         description: Server error
 */
router.put("/admin/seller-status/:id", updateSellerStatus);

module.exports = router;