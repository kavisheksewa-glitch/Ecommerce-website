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




// const express = require("express");
// const router = express.Router();
// const { adminLogin } = require("../controllers/adminController");
// const User = require("../models/Customer");
// const Seller = require("../models/Seller");
// /**
//  * @swagger
//  * tags:
//  *   name: Admin Login
//  *   description: Admin management APIs
//  */

// /**
//  * @swagger
//  * components:
//  *   securitySchemes:
//  *     BearerAuth:
//  *       type: http
//  *       scheme: bearer
//  *       bearerFormat: JWT
//  *       description: Enter your JWT token in the format (e.g. Bearer <token>)
//  *   schemas:
//  *     Admin:
//  *       type: object
//  *       properties:
//  *         _id:
//  *           type: string
//  *           example: "60d0fe4f5311236168a109ff"
//  *         email:
//  *           type: string
//  *           example: "admin@gmail.com"
//  *         createdAt:
//  *           type: string
//  *           format: date-time
//  */

// /**
//  * @swagger
//  * /api/admin/login:
//  *   post:
//  *     summary: Admin Login
//  *     description: Authenticates the admin using email and password and returns a JWT token.
//  *     tags: [Admin Login]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *               - password
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 example: "admin@gmail.com"
//  *               password:
//  *                 type: string
//  *                 example: "admin123"
//  *     responses:
//  *       '200':
//  *         description: Login Successful with JWT Token
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                   example: true
//  *                 message:
//  *                   type: string
//  *                   example: "Login Successful"
//  *                 token:
//  *                   type: string
//  *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
//  *       '400':
//  *         description: Invalid Email or Password
//  *       '500':
//  *         description: Server Error
//  */

// router.post("/login", adminLogin);

// // ==================== GET ALL USERS ROUTE ====================
// /**
//  * @swagger
//  * /api/admin/users:
//  *   get:
//  *     summary: Get all users for admin
//  *     tags: [Admin Login]
//  *     responses:
//  *       200:
//  *         description: List of all users
//  */
// router.get("/users", async (req, res) => {
//   try {
//     const users = await User.find().select("-password"); // Password chhod kar saare users le aayein
//     res.status(200).json({
//       success: true,
//       count: users.length,
//       users,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// // ==================== GET ALL SELLERS (Admin View) ====================
// /**
//  * @swagger
//  * /api/admin/sellers:
//  *   get:
//  *     summary: Get all registered sellers for admin
//  *     description: Fetches a list of all registered sellers in the system (excluding passwords).
//  *     tags: [Admin Management]
//  *     responses:
//  *       200:
//  *         description: List of all sellers retrieved successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                   example: true
//  *                 count:
//  *                   type: integer
//  *                   example: 2
//  *                 sellers:
//  *                   type: array
//  *                   items:
//  *                     type: object
//  *                     properties:
//  *                       _id:
//  *                         type: string
//  *                         example: "60d0fe4f5311236168a109ff"
//  *                       name:
//  *                         type: string
//  *                         example: "Rahul Sharma"
//  *                       shopName:
//  *                         type: string
//  *                         example: "Kashmir Shawl House"
//  *                       email:
//  *                         type: string
//  *                         example: "rahul@gmail.com"
//  *                       status:
//  *                         type: string
//  *                         example: "Approved"
//  *       500:
//  *         description: Server Error
//  */
// router.get("/sellers", async (req, res) => {
//   try {
//     const sellers = await Seller.find().select("-password");
//     res.status(200).json({
//       success: true,
//       count: sellers.length,
//       sellers,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// module.exports = router;




//new cahngewalal





// const express = require("express");
// const router = express.Router();
// const { adminLogin } = require("../controllers/adminController");
// const { protectAdmin } = require("../middleware/adminMiddleware"); // ✅ Middleware import kiya
// const User = require("../models/Customer");
// const Seller = require("../models/Seller");
// const Order = require("../models/Order");

// /**
//  * @swagger
//  * tags:
//  *   name: Admin Management
//  *   description: Admin management APIs
//  */

// /**
//  * @swagger
//  * components:
//  *   securitySchemes:
//  *     BearerAuth:
//  *       type: http
//  *       scheme: bearer
//  *       bearerFormat: JWT
//  *       description: Enter your JWT token in the format (e.g. Bearer <token>)
//  *   schemas:
//  *     Admin:
//  *       type: object
//  *       properties:
//  *         _id:
//  *           type: string
//  *           example: "60d0fe4f5311236168a109ff"
//  *         email:
//  *           type: string
//  *           example: "admin@gmail.com"
//  *         createdAt:
//  *           type: string
//  *           format: date-time
//  */

// /**
//  * @swagger
//  * /api/admin/login:
//  *   post:
//  *     summary: Admin Login
//  *     description: Authenticates the admin using email and password and returns a JWT token.
//  *     tags: [Admin Management]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *               - password
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 example: "admin@gmail.com"
//  *               password:
//  *                 type: string
//  *                 example: "admin123"
//  *     responses:
//  *       '200':
//  *         description: Login Successful with JWT Token
//  *       '400':
//  *         description: Invalid Email or Password
//  *       '500':
//  *         description: Server Error
//  */
// router.post("/login", adminLogin);

// // ==================== GET ALL USERS ROUTE ====================
// /**
//  * @swagger
//  * /api/admin/users:
//  *   get:
//  *     summary: Get all users for admin
//  *     tags: [Admin Management]
//  *     security:
//  *       - BearerAuth: []
//  *     responses:
//  *       200:
//  *         description: List of all users
//  *       401:
//  *         description: Not authorized, no token provided
//  */
// router.get("/users", protectAdmin, async (req, res) => {
//   try {
//     const users = await User.find().select("-password");
//     res.status(200).json({
//       success: true,
//       count: users.length,
//       users,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// // ==================== GET ALL SELLERS ROUTE ====================
// /**
//  * @swagger
//  * /api/admin/sellers:
//  *   get:
//  *     summary: Get all registered sellers for admin
//  *     tags: [Admin Management]
//  *     security:
//  *       - BearerAuth: []
//  *     responses:
//  *       200:
//  *         description: List of all sellers retrieved successfully
//  *       401:
//  *         description: Not authorized
//  */
// router.get("/sellers", protectAdmin, async (req, res) => {
//   try {
//     const sellers = await Seller.find().select("-password");
//     res.status(200).json({
//       success: true,
//       count: sellers.length,
//       sellers,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// // ==================== UPDATE SELLER STATUS (Approve / Reject) ====================
// /**
//  * @swagger
//  * /api/admin/seller/{id}/status:
//  *   put:
//  *     summary: Approve or Reject a Seller
//  *     tags: [Admin Management]
//  *     security:
//  *       - BearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Seller ID
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - status
//  *             properties:
//  *               status:
//  *                 type: string
//  *                 enum: [Approved, Rejected, Pending]
//  *                 example: "Approved"
//  *     responses:
//  *       200:
//  *         description: Seller status updated successfully
//  *       404:
//  *         description: Seller not found
//  */
// router.put("/seller/:id/status", protectAdmin, async (req, res) => {
//   try {
//     const { status } = req.body;
    
//     if (!["Approved", "Rejected", "Pending"].includes(status)) {
//       return res.status(400).json({ success: false, message: "Invalid status value" });
//     }

//     const updatedSeller = await Seller.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     ).select("-password");

//     if (!updatedSeller) {
//       return res.status(404).json({ success: false, message: "Seller not found" });
//     }

//     res.status(200).json({
//       success: true,
//       message: `Seller status updated to ${status}`,
//       seller: updatedSeller,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// // ==================== GET ALL ORDERS ROUTE ====================
// /**
//  * @swagger
//  * /api/admin/orders:
//  *   get:
//  *     summary: Get all system orders for admin
//  *     description: Fetches a list of all orders placed across the platform.
//  *     tags: [Admin Management]
//  *     security:
//  *       - BearerAuth: []
//  *     responses:
//  *       200:
//  *         description: List of all orders retrieved successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                   example: true
//  *                 count:
//  *                   type: integer
//  *                   example: 5
//  *                 orders:
//  *                   type: array
//  *                   items:
//  *                     type: object
//  *       500:
//  *         description: Server Error
//  */
// router.get("/orders", protectAdmin, async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 });
//     res.status(200).json({
//       success: true,
//       count: orders.length,
//       orders,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// // ==================== UPDATE ORDER STATUS & TRACKING ID ====================
// /**
//  * @swagger
//  * /api/admin/order/{id}/status:
//  *   put:
//  *     summary: Update Order Status and Tracking ID
//  *     tags: [Admin Management]
//  *     security:
//  *       - BearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Order ID
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               orderStatus:
//  *                 type: string
//  *                 enum: [Processing, Shipped, Delivered, Cancelled]
//  *                 example: "Shipped"
//  *               trackingId:
//  *                 type: string
//  *                 example: "TRK123456789"
//  *     responses:
//  *       200:
//  *         description: Order updated successfully
//  *       404:
//  *         description: Order not found
//  */
// router.put("/order/:id/status", protectAdmin, async (req, res) => {
//   try {
//     const { orderStatus, trackingId } = req.body;
    
//     const updateData = {};
//     if (orderStatus) updateData.orderStatus = orderStatus;
//     if (trackingId !== undefined) updateData.trackingId = trackingId;

//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.id,
//       updateData,
//       { new: tabOrder => tabOrder } // updated document return karega
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({ success: false, message: "Order not found" });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Order updated successfully",
//       order: updatedOrder,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// module.exports = router;




//claude corrected  office


const express = require("express");
const router = express.Router();
const { adminLogin } = require("../controllers/adminController");
const { protectAdmin } = require("../middleware/adminMiddleware"); // ✅ Middleware import kiya
const User = require("../models/Customer");
const Seller = require("../models/Seller");
const Order = require("../models/Order");

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
router.get("/users", protectAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

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
router.get("/sellers", protectAdmin, async (req, res) => {
  try {
    const sellers = await Seller.find().select("-password");
    res.status(200).json({
      success: true,
      count: sellers.length,
      sellers,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

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
router.put("/seller/:id/status", protectAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Approved", "Rejected", "Pending"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }

    const updatedSeller = await Seller.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).select("-password");

    if (!updatedSeller) {
      return res.status(404).json({ success: false, message: "Seller not found" });
    }

    res.status(200).json({
      success: true,
      message: `Seller status updated to ${status}`,
      seller: updatedSeller,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

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
router.get("/orders", protectAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

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
router.put("/order/:id/status", protectAdmin, async (req, res) => {
  try {
    const { orderStatus, trackingId } = req.body;

    const updateData = {};
    if (orderStatus) updateData.orderStatus = orderStatus;
    if (trackingId !== undefined) updateData.trackingId = trackingId;

    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;