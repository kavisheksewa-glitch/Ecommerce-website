// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { addProduct, getProducts } = require("../controllers/sellerProductController");
// const { protect } = require("../middleware/authMiddleware");

// const storage = multer.diskStorage({
//   destination: "./uploads/",
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// const upload = multer({ storage });

// // Multiple files ke liye upload.fields use karein
// const uploadFields = upload.fields([
//   { name: "productImage", maxCount: 1 },
//   { name: "brandLogo", maxCount: 1 }
// ]);

// // POST /api/seller/products/add
// router.post("/add", protect, uploadFields, addProduct);

// // GET /api/seller/products
// router.get("/", getProducts);

// module.exports = router;










// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { 
//   addProduct, 
//   getProducts, 
//   updateProduct, 
//   deleteProduct 
// } = require("../controllers/sellerProductController");
// const { protect } = require("../middleware/authMiddleware");

// const storage = multer.diskStorage({
//   destination: "./uploads/",
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// const upload = multer({ storage });

// // Multiple files ke liye upload.fields use karein
// const uploadFields = upload.fields([
//   { name: "productImage", maxCount: 1 },
//   { name: "brandLogo", maxCount: 1 }
// ]);

// // POST /api/seller/products/add (Create)
// router.post("/add", protect, uploadFields, addProduct);

// // GET /api/seller/products (Read)
// router.get("/", protect, getProducts);

// // PUT /api/seller/products/update/:id (Update)
// router.put("/update/:id", protect, updateProduct);

// // DELETE /api/seller/products/delete/:id (Delete)
// router.delete("/delete/:id", protect, deleteProduct);

// module.exports = router;








// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { 
//   addProduct, 
//   getProducts, 
//   updateProduct, 
//   deleteProduct 
// } = require("../controllers/sellerProductController");
// const { protect } = require("../middleware/authMiddleware");

// const storage = multer.diskStorage({
//   destination: "./uploads/",
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// const upload = multer({ storage });

// // Multiple files ke liye upload.fields use karein
// const uploadFields = upload.fields([
//   { name: "productImage", maxCount: 1 },
//   { name: "brandLogo", maxCount: 1 }
// ]);
// router.get("/public", getProducts);
// // POST /api/seller/products/add (Create product)
// router.post("/add", protect, uploadFields, addProduct);

// // GET /api/seller/products (Get all products for seller)
// router.get("/", protect, getProducts);

// // PUT /api/seller/products/update/:id (Update product)
// router.put("/update/:id", protect, uploadFields, updateProduct);

// // DELETE /api/seller/products/delete/:id (Delete product)
// router.delete("/delete/:id", protect, deleteProduct);

// module.exports = router;



// swagger




const express = require("express");
const router = express.Router();
const multer = require("multer");
const { 
  addProduct, 
  getProducts, 
  updateProduct, 
  deleteProduct 
} = require("../controllers/sellerProductController");
const { protect } = require("../middleware/authMiddleware");

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Multiple files ke liye upload.fields use karein
const uploadFields = upload.fields([
  { name: "productImage", maxCount: 1 },
  { name: "brandLogo", maxCount: 1 }
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
 *         title:
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
 *         brandLogo:
 *           type: string
 *           example: "uploads/1624356789-logo.jpg"
 *         seller:
 *           type: string
 *           example: "60d0fe4f5311236168a109cc"
 *         createdAt:
 *           type: string
 *           format: date-time
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/seller/products/public:
 *   get:
 *     summary: Get public products
 *     description: Retrieves a list of public products without authentication.
 *     tags: [Seller Products]
 *     responses:
 *       '200':
 *         description: List of products fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       '500':
 *         description: Server error
 */
router.get("/public", getProducts);

/**
 * @swagger
 * /api/seller/products/add:
 *   post:
 *     summary: Add a new product (Seller)
 *     description: Creates a new product with image and brand logo uploads. Requires authentication.
 *     tags: [Seller Products]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - price
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Kashmiri Pashmina Shawl"
 *               description:
 *                 type: string
 *                 example: "Pure wool handmade shawl"
 *               price:
 *                 type: number
 *                 example: 1500
 *               productImage:
 *                 type: string
 *                 format: binary
 *               brandLogo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '201':
 *         description: Product added successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized (Token missing or invalid)
 *       '500':
 *         description: Server error
 */
// POST /api/seller/products/add (Create product)
router.post("/add", protect, uploadFields, addProduct);

/**
 * @swagger
 * /api/seller/products:
 *   get:
 *     summary: Get all products for logged-in seller
 *     description: Retrieves products belonging to the authenticated seller. Requires authentication.
 *     tags: [Seller Products]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: List of seller products fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Server error
 */
// GET /api/seller/products (Get all products for seller)
router.get("/", protect, getProducts);

/**
 * @swagger
 * /api/seller/products/update/{id}:
 *   put:
 *     summary: Update product by ID
 *     description: Updates product information along with optional file re-uploads. Requires authentication.
 *     tags: [Seller Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique product ID
 *         example: "60d0fe4f5311236168a109cb"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Pashmina Shawl"
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *               price:
 *                 type: number
 *                 example: 1800
 *               productImage:
 *                 type: string
 *                 format: binary
 *               brandLogo:
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
// PUT /api/seller/products/update/:id (Update product)
router.put("/update/:id", protect, uploadFields, updateProduct);

/**
 * @swagger
 * /api/seller/products/delete/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     description: Removes a specific product from the database. Requires authentication.
 *     tags: [Seller Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique product ID
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
// DELETE /api/seller/products/delete/:id (Delete product)
router.delete("/delete/:id", protect, deleteProduct);

module.exports = router;