// const express = require("express");
// const router = express.Router();
// const Admin = require("../models/Admin");
// const AdminProduct = require("../models/AdminProduct");

// // Login
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const admin = await Admin.findOne({ email });

//     if (!admin) {
//       return res.status(400).json({ success: false, message: "Invalid Email!" });
//     }

//     if (admin.password !== password) {
//       return res.status(400).json({ success: false, message: "Invalid Password!" });
//     }

//     res.status(200).json({ success: true, message: "Login Successful" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error", error: error.message });
//   }
// });

// // Register
// router.post("/register", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const newAdmin = new Admin({ email, password });
//     await newAdmin.save();
//     res.status(201).json({ success: true, message: "Admin registered successfully!" });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// });

// // Get All Products (admin's own products)
// router.get("/products", async (req, res) => {
//   try {
//     const products = await AdminProduct.find();
//     res.status(200).json({ success: true, products });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error", error: error.message });
//   }
// });

// // Add New Product (+ n8n Integration, kept from original)
// router.post("/products", async (req, res) => {
//   try {
//     const { title, category, price, image } = req.body;

//     const newProduct = new AdminProduct({
//       title,
//       category,
//       price,
//       image
//     });

//     await newProduct.save();

//     // === n8n Webhook Trigger (non-blocking) ===
//     try {
//       await fetch("http://localhost:5678/webhook-test/0ec00539-adda-42fd-be5d-70916c0e0e86", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           action: "NEW_PRODUCT_ADDED",
//           title: newProduct.title,
//           category: newProduct.category,
//           price: newProduct.price,
//         }),
//       });
//     } catch (n8nErr) {
//       console.log("n8n webhook error (Non-blocking):", n8nErr.message);
//     }

//     res.status(201).json({ success: true, message: "Product added successfully!", newProduct });
//   } catch (error) {
//     res.status(400).json({ success: false, message: "Failed to add product", error: error.message });
//   }
// });

// // Delete Product
// router.delete("/products/:id", async (req, res) => {
//   try {
//     await AdminProduct.findByIdAndDelete(req.params.id);
//     res.status(200).json({ success: true, message: "Product deleted successfully!" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Error deleting product", error: error.message });
//   }
// });

// module.exports = router;








// swagger




const express = require("express");
const router = express.Router();
const { adminLogin } = require("../controllers/adminController");

/**
 * @swagger
 * tags:
 *   name: Admin Login
 *   description: Admin management APIs
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
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
 *     tags: [Admin Login]
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Login Successful"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '400':
 *         description: Invalid Email or Password
 *       '500':
 *         description: Server Error
 */
router.post("/login", adminLogin);

module.exports = router;