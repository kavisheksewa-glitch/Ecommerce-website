

const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../config/cloudinary");
const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/sellerProductController");
const { protect } = require("../middleware/authMiddleware");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "seller-products",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});
const upload = multer({ storage });

// ✅ ab sirf productImage — brandLogo ab seller profile se aata hai
const uploadFields = upload.fields([
  { name: "productImage", maxCount: 1 },
]);

/**
 * @swagger
 * tags:
 *   name: Seller Products
 *   description: Seller product management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "60d0fe4f5311236168a109cb"
 *         productName:
 *           type: string
 *           example: "Kashmiri Pashmina Shawl"
 *         description:
 *           type: string
 *           example: "Pure wool handmade shawl"
 *         price:
 *           type: number
 *           example: 1500
 *         productImage:
 *           type: string
 *           example: "uploads/1624356789-shawl.jpg"
 *         brand:
 *           type: string
 *           example: "Kavi Shawls Premium"
 *         brandLogo:
 *           type: string
 *           example: "uploads/1624356789-logo.jpg"
 *           description: "Seller ke profile se auto-copy hota hai, product form se nahi bheja jata"
 *         sellerId:
 *           type: string
 *           example: "60d0fe4f5311236168a109cc"
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
 * /api/seller/products/public:
 *   get:
 *     summary: Get public products
 *     tags: [Seller Products]
 *     responses:
 *       '200':
 *         description: List of products fetched successfully
 *       '500':
 *         description: Server error
 */
router.get("/public", getProducts);

/**
 * @swagger
 * /api/seller/products/add:
 *   post:
 *     summary: Add a new product (Seller)
 *     description: Brand name/logo auto-filled from the seller's profile.
 *     tags: [Seller Products]
 *     security:
 *       - SellerBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - productName
 *               - category
 *               - price
 *               - discount
 *               - stockQuantity
 *               - fabric
 *               - color
 *               - size
 *               - washCare
 *             properties:
 *               productName:
 *                 type: string
 *                 example: "Kashmiri Pashmina Shawl"
 *               category:
 *                 type: string
 *                 example: "Women's Shawls"
 *               price:
 *                 type: number
 *                 example: 1500
 *               discount:
 *                 type: number
 *                 example: 10
 *               stockQuantity:
 *                 type: number
 *                 example: 50
 *               description:
 *                 type: string
 *                 example: "Pure wool handmade shawl with intricate embroidery."
 *               fabric:
 *                 type: string
 *                 example: "Pure Cashmere Wool"
 *               color:
 *                 type: string
 *                 example: "Beige"
 *               size:
 *                 type: string
 *                 example: "200cm x 100cm"
 *               washCare:
 *                 type: string
 *                 example: "Dry clean only"
 *               productImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '201':
 *         description: Product added successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Server error
 */
router.post("/add", protect, uploadFields, addProduct);

/**
 * @swagger
 * /api/seller/products:
 *   get:
 *     summary: Get all products for logged-in seller
 *     tags: [Seller Products]
 *     security:
 *       - SellerBearerAuth: []
 *     responses:
 *       '200':
 *         description: List of seller products fetched successfully
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Server error
 */
router.get("/", protect, getProducts);

/**
 * @swagger
 * /api/seller/products/update/{id}:
 *   put:
 *     summary: Update product by ID
 *     tags: [Seller Products]
 *     security:
 *       - SellerBearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "60d0fe4f5311236168a109cb"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *                 example: "Updated Pashmina Shawl"
 *               category:
 *                 type: string
 *                 example: "Women's Shawls"
 *               price:
 *                 type: number
 *                 example: 1800
 *               discount:
 *                 type: number
 *                 example: 10
 *               stockQuantity:
 *                 type: number
 *                 example: 40
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *               fabric:
 *                 type: string
 *                 example: "Pure Cashmere Wool"
 *               color:
 *                 type: string
 *                 example: "Beige"
 *               size:
 *                 type: string
 *                 example: "200cm x 100cm"
 *               washCare:
 *                 type: string
 *                 example: "Dry clean only"
 *               productImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Product updated successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Server error
 */
router.put("/update/:id", protect, uploadFields, updateProduct);

/**
 * @swagger
 * /api/seller/products/delete/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Seller Products]
 *     security:
 *       - SellerBearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "60d0fe4f5311236168a109cb"
 *     responses:
 *       '200':
 *         description: Product deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Server error
 */
router.delete("/delete/:id", protect, deleteProduct);

module.exports = router;