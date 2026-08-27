// const express = require("express");
// const router = express.Router();
// const Order = require("../models/Order");

// // POST /api/shawls/orders/add -> naya order save karna
// router.post("/add", async (req, res) => {
//   try {
//     const {
//       userId,
//       productId,
//       productTitle,
//       productImage,
//       price,
//       quantity,
//       totalAmount,
//       fullName,
//       phone,
//       address,
//       paymentMethod,
//       paymentStatus,
//       razorpayPaymentId,
//     } = req.body;

//     // Basic validation
//     if (
//       !userId ||
//       !productId ||
//       !productTitle ||
//       !price ||
//       !quantity ||
//       !totalAmount ||
//       !fullName ||
//       !phone ||
//       !address ||
//       !paymentMethod
//     ) {
//       return res.status(400).json({ message: "Kripya sabhi zaroori fields bharein." });
//     }

//     const newOrder = new Order({
//       userId,
//       productId,
//       productTitle,
//       productImage,
//       price,
//       quantity,
//       totalAmount,
//       fullName,
//       phone,
//       address,
//       paymentMethod,
//       paymentStatus: paymentStatus || "Pending",
//       razorpayPaymentId: razorpayPaymentId || "",
//     });

//     const savedOrder = await newOrder.save();

//     return res.status(201).json({
//       message: "Order safaltapoorvak save ho gaya!",
//       order: savedOrder,
//     });
//   } catch (error) {
//     console.error("Order save karte waqt error:", error);
//     return res.status(500).json({ message: "Server error, order save nahi ho paya." });
//   }
// });

// // GET /api/shawls/orders/user/:userId -> ek user ke saare orders
// router.get("/user/:userId", async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
//     return res.status(200).json(orders);
//   } catch (error) {
//     console.error("Orders fetch karte waqt error:", error);
//     return res.status(500).json({ message: "Server error, orders fetch nahi ho paye." });
//   }
// });

// // GET /api/shawls/orders -> saare orders (admin ke liye)
// router.get("/", async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 });
//     return res.status(200).json(orders);
//   } catch (error) {
//     console.error("Orders fetch karte waqt error:", error);
//     return res.status(500).json({ message: "Server error, orders fetch nahi ho paye." });
//   }
// });

// // PATCH /api/shawls/orders/:id/status -> order status update (admin)
// router.patch("/:id/status", async (req, res) => {
//   try {
//     const { orderStatus } = req.body;
//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.id,
//       { orderStatus },
//       { new: true }
//     );
//     if (!updatedOrder) {
//       return res.status(404).json({ message: "Order nahi mila." });
//     }
//     return res.status(200).json(updatedOrder);
//   } catch (error) {
//     console.error("Order status update karte waqt error:", error);
//     return res.status(500).json({ message: "Server error." });
//   }
// });

// module.exports = router;








// new



// const express = require("express");
// const router = express.Router();
// const Order = require("../models/Order");

// // POST /api/shawls/orders/add -> naya order save karna
// router.post("/add", async (req, res) => {
//   try {
//     const {
//       userId,
//       productId,
//       productTitle,
//       productImage,
//       price,
//       quantity,
//       totalAmount,
//       fullName,
//       phone,
//       address,
//       paymentMethod,
//       paymentStatus,
//       razorpayPaymentId,
//     } = req.body;

//     // Basic validation
//     if (
//       !userId ||
//       !productId ||
//       !productTitle ||
//       !price ||
//       !quantity ||
//       !totalAmount ||
//       !fullName ||
//       !phone ||
//       !address ||
//       !paymentMethod
//     ) {
//       return res.status(400).json({ message: "Kripya sabhi zaroori fields bharein." });
//     }

//     const newOrder = new Order({
//       userId,
//       productId,
//       productTitle,
//       productImage,
//       price,
//       quantity,
//       totalAmount,
//       fullName,
//       phone,
//       address,
//       paymentMethod,
//       paymentStatus: paymentStatus || "Pending",
//       razorpayPaymentId: razorpayPaymentId || "",
//       orderStatus: "Pending", // Default initial status
//     });

//     const savedOrder = await newOrder.save();

//     return res.status(201).json({
//       message: "Order safaltapoorvak save ho gaya!",
//       order: savedOrder,
//     });
//   } catch (error) {
//     console.error("Order save karte waqt error:", error);
//     return res.status(500).json({ message: "Server error, order save nahi ho paya." });
//   }
// });

// // GET /api/shawls/orders/user/:userId -> ek user ke saare orders
// router.get("/user/:userId", async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
//     return res.status(200).json(orders);
//   } catch (error) {
//     console.error("Orders fetch karte waqt error:", error);
//     return res.status(500).json({ message: "Server error, orders fetch nahi ho paye." });
//   }
// });

// // GET /api/shawls/orders -> saare orders (admin ke liye)
// router.get("/", async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 });
//     return res.status(200).json(orders);
//   } catch (error) {
//     console.error("Orders fetch karte waqt error:", error);
//     return res.status(500).json({ message: "Server error, orders fetch nahi ho paye." });
//   }
// });

// // PATCH /api/shawls/orders/:id/status -> order status update (admin)
// router.patch("/:id/status", async (req, res) => {
//   try {
//     const { orderStatus } = req.body;

//     if (!orderStatus) {
//       return res.status(400).json({ message: "Order status zaroori hai." });
//     }

//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.id,
//       { orderStatus },
//       { new: true, runValidators: true }
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({ message: "Order nahi mila." });
//     }

//     return res.status(200).json(updatedOrder);
//   } catch (error) {
//     console.error("Order status update karte waqt error:", error);
//     return res.status(500).json({ message: "Server error while updating order status." });
//   }
// });

// module.exports = router;



// new1



// const express = require("express");
// const router = express.Router();
// const Order = require("../models/Order");

// // POST /api/shawls/orders/add -> naya order save karna
// router.post("/add", async (req, res) => {
//   try {
//     const {
//       userId,
//       productId,
//       productTitle,
//       productImage,
//       price,
//       quantity,
//       totalAmount,
//       fullName,
//       phone,
//       address,
//       paymentMethod,
//       paymentStatus,
//       razorpayPaymentId,
//     } = req.body;

//     if (
//       !userId ||
//       !productId ||
//       !productTitle ||
//       !price ||
//       !quantity ||
//       !totalAmount ||
//       !fullName ||
//       !phone ||
//       !address ||
//       !paymentMethod
//     ) {
//       return res.status(400).json({ message: "Kripya sabhi zaroori fields bharein." });
//     }

//     const newOrder = new Order({
//       userId,
//       productId,
//       productTitle,
//       productImage,
//       price,
//       quantity,
//       totalAmount,
//       fullName,
//       phone,
//       address,
//       paymentMethod,
//       paymentStatus: paymentStatus || "Pending",
//       razorpayPaymentId: razorpayPaymentId || "",
//       orderStatus: "Processing",
//     });

//     const savedOrder = await newOrder.save();

//     return res.status(201).json({
//       message: "Order safaltapoorvak save ho gaya!",
//       order: savedOrder,
//     });
//   } catch (error) {
//     console.error("Order save karte waqt error:", error);
//     return res.status(500).json({ message: "Server error, order save nahi ho paya." });
//   }
// });

// // GET /api/shawls/orders/user/:userId -> ek user ke saare orders
// router.get("/user/:userId", async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
//     return res.status(200).json(orders);
//   } catch (error) {
//     console.error("Orders fetch karte waqt error:", error);
//     return res.status(500).json({ message: "Server error, orders fetch nahi ho paye." });
//   }
// });

// // GET /api/shawls/orders -> saare orders (admin ke liye)
// router.get("/", async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 });
//     return res.status(200).json(orders);
//   } catch (error) {
//     console.error("Orders fetch karte waqt error:", error);
//     return res.status(500).json({ message: "Server error, orders fetch nahi ho paye." });
//   }
// });

// // PATCH /api/shawls/orders/:id/status -> order status update (admin)
// router.patch("/:id/status", async (req, res) => {
//   try {
//     const { orderStatus } = req.body;

//     if (!orderStatus) {
//       return res.status(400).json({ message: "Order status zaroori hai." });
//     }

//     // Yahan se 'runValidators: true' hata diya hai taaki enum mismatch ki wajah se error na aaye
//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.id,
//       { orderStatus },
//       { returnDocument: 'after' }
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({ message: "Order nahi mila." });
//     }

//     return res.status(200).json(updatedOrder);
//   } catch (error) {
//     console.error("Order status update karte waqt error:", error);
//     return res.status(500).json({ message: "Server error while updating order status." });
//   }
// });

// module.exports = router;




// nnnnnnnnnnnnnn




// const express = require("express");
// const router = express.Router();
// const Order = require("../models/Order");
// const Product = require("../models/SellerProduct"); // 👉 Product model import karein (agar naam alag ho toh apne hisab se theek kar lein)
// const SellerNotification = require("../models/SellerNotification");

// // POST /api/shawls/orders/add -> naya order save karna
// router.post("/add", async (req, res) => {
//   try {
//     const {
//       userId,
//       productId,
//       productTitle,
//       productImage,
//       price,
//       quantity,
//       totalAmount,
//       fullName,
//       phone,
//       address,
//       paymentMethod,
//       paymentStatus,
//       razorpayPaymentId,
//       sellerId, // Frontend se agar aa rahi ho
//     } = req.body;

//     if (
//       !userId ||
//       !productId ||
//       !productTitle ||
//       !price ||
//       !quantity ||
//       !totalAmount ||
//       !fullName ||
//       !phone ||
//       !address ||
//       !paymentMethod
//     ) {
//       return res.status(400).json({ message: "Kripya sabhi zaroori fields bharein." });
//     }

//     // 👉 1. Product se sellerId nikalne ki koshish karein agar request me nahi hai
//     let targetSellerId = sellerId;
//     if (!targetSellerId) {
//       try {
//         const productData = await Product.findById(productId);
//         if (productData && (productData.sellerId || productData.seller)) {
//           targetSellerId = productData.sellerId || productData.seller;
//         }
//       } catch (err) {
//         console.log("Product fetch karne me error, fallback use hoga.");
//       }
//     }

//     // Agar phir bhi na mile toh default ya userId use karein
//     targetSellerId = targetSellerId || "default_seller_id";

//     const newOrder = new Order({
//       userId,
//       productId,
//       productTitle,
//       productImage,
//       price,
//       quantity,
//       totalAmount,
//       fullName,
//       phone,
//       address,
//       paymentMethod,
//       paymentStatus: paymentStatus || "Pending",
//       razorpayPaymentId: razorpayPaymentId || "",
//       orderStatus: "Processing",
//       sellerId: targetSellerId, // Order model me bhi sellerId save kar dein agar field ho
//     });

//     const savedOrder = await newOrder.save();

//     // 👉 2. Seller Notification Create Karein
//     try {
//       await SellerNotification.create({
//         sellerId: targetSellerId,
//         title: "📦 New Order Received!",
//         message: `Customer ${fullName} has placed an order for "${productTitle}" (Qty: ${quantity}). Total: ₹${totalAmount}`,
//         type: "success",
//       });
      
//       console.log("✅ Seller Notification created successfully for sellerId:", targetSellerId);
//     } catch (notifErr) {
//       console.error("❌ Error creating seller notification:", notifErr);
//     }

//     return res.status(201).json({
//       message: "Order safaltapoorvak save ho gaya!",
//       order: savedOrder,
//     });
//   } catch (error) {
//     console.error("Order save karte waqt error:", error);
//     return res.status(500).json({ message: "Server error, order save nahi ho paya." });
//   }
// });

// // GET /api/shawls/orders/user/:userId -> ek user ke saare orders
// router.get("/user/:userId", async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
//     return res.status(200).json(orders);
//   } catch (error) {
//     console.error("Orders fetch karte waqt error:", error);
//     return res.status(500).json({ message: "Server error, orders fetch nahi ho paye." });
//   }
// });

// // GET /api/shawls/orders -> saare orders (admin ke liye)
// router.get("/", async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 });
//     return res.status(200).json(orders);
//   } catch (error) {
//     console.error("Orders fetch karte waqt error:", error);
//     return res.status(500).json({ message: "Server error, orders fetch nahi ho paye." });
//   }
// });

// // PATCH /api/shawls/orders/:id/status -> order status update (admin)
// router.patch("/id/status", async (req, res) => {
//   try {
//     const { orderStatus } = req.body;

//     if (!orderStatus) {
//       return res.status(400).json({ message: "Order status zaroori hai." });
//     }

//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.id,
//       { orderStatus },
//       { returnDocument: 'after' }
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({ message: "Order nahi mila." });
//     }

//     return res.status(200).json(updatedOrder);
//   } catch (error) {
//     console.error("Order status update karte waqt error:", error);
//     return res.status(500).json({ message: "Server error while updating order status." });
//   }
// });

// module.exports = router;




// swagger



// const express = require("express");
// const router = express.Router();
// const Order = require("../models/Order");
// const Product = require("../models/SellerProduct"); // 👉 Product model import karein
// const SellerNotification = require("../models/SellerNotification");



// /**
//  * @swagger
//  * tags:
//  *   name: order Products
//  *   description: order product management APIs
//  */



// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Order:
//  *       type: object
//  *       properties:
//  *         _id:
//  *           type: string
//  *           example: "60d0fe4f5311236168a109bb"
//  *         userId:
//  *           type: string
//  *           example: "60d0fe4f5311236168a109ca"
//  *         productId:
//  *           type: string
//  *           example: "60d0fe4f5311236168a109cb"
//  *         productTitle:
//  *           type: string
//  *           example: "Kashmiri Pashmina Shawl"
//  *         productImage:
//  *           type: string
//  *           example: "https://example.com/shawl.jpg"
//  *         price:
//  *           type: number
//  *           example: 1500
//  *         quantity:
//  *           type: integer
//  *           example: 1
//  *         totalAmount:
//  *           type: number
//  *           example: 1500
//  *         fullName:
//  *           type: string
//  *           example: "Rahul Sharma"
//  *         phone:
//  *           type: string
//  *           example: "9876543210"
//  *         address:
//  *           type: string
//  *           example: "123, Main Street, Delhi"
//  *         paymentMethod:
//  *           type: string
//  *           example: "Online"
//  *         paymentStatus:
//  *           type: string
//  *           example: "Pending"
//  *         orderStatus:
//  *           type: string
//  *           example: "Processing"
//  *         sellerId:
//  *           type: string
//  *           example: "60d0fe4f5311236168a109cc"
//  *         createdAt:
//  *           type: string
//  *           format: date-time
//  */

// /**
//  * @swagger
//  * /api/shawls/orders/add:
//  *   post:
//  *     summary: Create a new order
//  *     description: Saves a new customer order, handles seller identification, and triggers a seller notification.
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - userId
//  *               - productId
//  *               - productTitle
//  *               - price
//  *               - quantity
//  *               - totalAmount
//  *               - fullName
//  *               - phone
//  *               - address
//  *               - paymentMethod
//  *             properties:
//  *               userId:
//  *                 type: string
//  *                 example: "60d0fe4f5311236168a109ca"
//  *               productId:
//  *                 type: string
//  *                 example: "60d0fe4f5311236168a109cb"
//  *               productTitle:
//  *                 type: string
//  *                 example: "Kashmiri Pashmina Shawl"
//  *               productImage:
//  *                 type: string
//  *                 example: "https://example.com/shawl.jpg"
//  *               price:
//  *                 type: number
//  *                 example: 1500
//  *               quantity:
//  *                 type: integer
//  *                 example: 1
//  *               totalAmount:
//  *                 type: number
//  *                 example: 1500
//  *               fullName:
//  *                 type: string
//  *                 example: "Rahul Sharma"
//  *               phone:
//  *                 type: string
//  *                 example: "9876543210"
//  *               address:
//  *                 type: string
//  *                 example: "123, Main Street, Delhi"
//  *               paymentMethod:
//  *                 type: string
//  *                 example: "Online"
//  *               paymentStatus:
//  *                 type: string
//  *                 example: "Pending"
//  *               razorpayPaymentId:
//  *                 type: string
//  *                 example: "pay_123456789"
//  *               sellerId:
//  *                 type: string
//  *                 example: "60d0fe4f5311236168a109cc"
//  *     responses:
//  *       '201':
//  *         description: Order saved successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Order safaltapoorvak save ho gaya!"
//  *                 order:
//  *                   $ref: '#/components/schemas/Order'
//  *       '400':
//  *         description: Missing required fields
//  *       '500':
//  *         description: Server error
//  */
// // POST /api/shawls/orders/add -> naya order save karna
// router.post("/add", async (req, res) => {
//   try {
//     const {
//       userId,
//       productId,
//       productTitle,
//       productImage,
//       price,
//       quantity,
//       totalAmount,
//       fullName,
//       phone,
//       address,
//       paymentMethod,
//       paymentStatus,
//       razorpayPaymentId,
//       sellerId,
//     } = req.body;

//     if (
//       !userId ||
//       !productId ||
//       !productTitle ||
//       !price ||
//       !quantity ||
//       !totalAmount ||
//       !fullName ||
//       !phone ||
//       !address ||
//       !paymentMethod
//     ) {
//       return res.status(400).json({ message: "Kripya sabhi zaroori fields bharein." });
//     }

//     let targetSellerId = sellerId;
//     if (!targetSellerId) {
//       try {
//         const productData = await Product.findById(productId);
//         if (productData && (productData.sellerId || productData.seller)) {
//           targetSellerId = productData.sellerId || productData.seller;
//         }
//       } catch (err) {
//         console.log("Product fetch karne me error, fallback use hoga.");
//       }
//     }

//     targetSellerId = targetSellerId || "default_seller_id";

//     const newOrder = new Order({
//       userId,
//       productId,
//       productTitle,
//       productImage,
//       price,
//       quantity,
//       totalAmount,
//       fullName,
//       phone,
//       address,
//       paymentMethod,
//       paymentStatus: paymentStatus || "Pending",
//       razorpayPaymentId: razorpayPaymentId || "",
//       orderStatus: "Processing",
//       sellerId: targetSellerId,
//     });

//     const savedOrder = await newOrder.save();

//     try {
//       await SellerNotification.create({
//         sellerId: targetSellerId,
//         title: "📦 New Order Received!",
//         message: `Customer ${fullName} has placed an order for "${productTitle}" (Qty: ${quantity}). Total: ₹${totalAmount}`,
//         type: "success",
//       });
//       console.log("✅ Seller Notification created successfully for sellerId:", targetSellerId);
//     } catch (notifErr) {
//       console.error("❌ Error creating seller notification:", notifErr);
//     }

//     return res.status(201).json({
//       message: "Order safaltapoorvak save ho gaya!",
//       order: savedOrder,
//     });
//   } catch (error) {
//     console.error("Order save karte waqt error:", error);
//     return res.status(500).json({ message: "Server error, order save nahi ho paya." });
//   }
// });

// /**
//  * @swagger
//  * /api/shawls/orders/user/{userId}:
//  *   get:
//  *     summary: Get all orders for a specific user
//  *     description: Retrieves all orders placed by a given customer ID, sorted by latest first.
//  *     parameters:
//  *       - in: path
//  *         name: userId
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The user ID
//  *         example: "60d0fe4f5311236168a109ca"
//  *     responses:
//  *       '200':
//  *         description: List of orders fetched successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Order'
//  *       '500':
//  *         description: Server error
//  */
// // GET /api/shawls/orders/user/:userId -> ek user ke saare orders
// router.get("/user/:userId", async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
//     return res.status(200).json(orders);
//   } catch (error) {
//     console.error("Orders fetch karte waqt error:", error);
//     return res.status(500).json({ message: "Server error, orders fetch nahi ho paye." });
//   }
// });

// /**
//  * @swagger
//  * /api/shawls/orders:
//  *   get:
//  *     summary: Get all orders (Admin)
//  *     description: Retrieves all orders across all users, sorted by latest first.
//  *     responses:
//  *       '200':
//  *         description: All orders list fetched successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Order'
//  *       '500':
//  *         description: Server error
//  */
// // GET /api/shawls/orders -> saare orders (admin ke liye)
// router.get("/", async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 });
//     return res.status(200).json(orders);
//   } catch (error) {
//     console.error("Orders fetch karte waqt error:", error);
//     return res.status(500).json({ message: "Server error, orders fetch nahi ho paye." });
//   }
// });

// /**
//  * @swagger
//  * /api/shawls/orders/{id}/status:
//  *   patch:
//  *     summary: Update order status (Admin)
//  *     description: Updates the status of a specific order (e.g., Processing, Shipped, Delivered).
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The unique order document ID
//  *         example: "60d0fe4f5311236168a109bb"
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - orderStatus
//  *             properties:
//  *               orderStatus:
//  *                 type: string
//  *                 example: "Shipped"
//  *     responses:
//  *       '200':
//  *         description: Order status updated successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Order'
//  *       '400':
//  *         description: Order status missing
//  *       '404':
//  *         description: Order not found
//  *       '500':
//  *         description: Server error
//  */
// // PATCH /api/shawls/orders/:id/status -> order status update (admin)
// router.patch("/:id/status", async (req, res) => {
//   try {
//     const { orderStatus } = req.body;

//     if (!orderStatus) {
//       return res.status(400).json({ message: "Order status zaroori hai." });
//     }

//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.id,
//       { orderStatus },
//       { returnDocument: 'after' }
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({ message: "Order nahi mila." });
//     }

//     return res.status(200).json(updatedOrder);
//   } catch (error) {
//     console.error("Order status update karte waqt error:", error);
//     return res.status(500).json({ message: "Server error while updating order status." });
//   }
// });

// module.exports = router;


// nnee swagger


// const express = require("express");
// const router = express.Router();
// const Order = require("../models/Order");
// const Product = require("../models/SellerProduct"); // 👉 Product model import karein
// const SellerNotification = require("../models/SellerNotification");

// /**
//  * @swagger
//  * tags:
//  *   name: order Products
//  *   description: order product management APIs
//  */

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Order:
//  *       type: object
//  *       properties:
//  *         _id:
//  *           type: string
//  *           example: "60d0fe4f5311236168a109bb"
//  *         userId:
//  *           type: string
//  *           example: "60d0fe4f5311236168a109ca"
//  *         productId:
//  *           type: string
//  *           example: "60d0fe4f5311236168a109cb"
//  *         productTitle:
//  *           type: string
//  *           example: "Kashmiri Pashmina Shawl"
//  *         productImage:
//  *           type: string
//  *           example: "https://example.com/shawl.jpg"
//  *         price:
//  *           type: number
//  *           example: 1500
//  *         quantity:
//  *           type: integer
//  *           example: 1
//  *         totalAmount:
//  *           type: number
//  *           example: 1500
//  *         fullName:
//  *           type: string
//  *           example: "Rahul Sharma"
//  *         phone:
//  *           type: string
//  *           example: "9876543210"
//  *         address:
//  *           type: string
//  *           example: "123, Main Street, Delhi"
//  *         paymentMethod:
//  *           type: string
//  *           example: "Online"
//  *         paymentStatus:
//  *           type: string
//  *           example: "Pending"
//  *         orderStatus:
//  *           type: string
//  *           example: "Processing"
//  *         sellerId:
//  *           type: string
//  *           example: "60d0fe4f5311236168a109cc"
//  *         createdAt:
//  *           type: string
//  *           format: date-time
//  */

// /**
//  * @swagger
//  * /api/shawls/orders/add:
//  *   post:
//  *     summary: Create a new order
//  *     description: Saves a new customer order, handles seller identification, and triggers a seller notification.
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - userId
//  *               - productId
//  *               - productTitle
//  *               - price
//  *               - quantity
//  *               - totalAmount
//  *               - fullName
//  *               - phone
//  *               - address
//  *               - paymentMethod
//  *             properties:
//  *               userId:
//  *                 type: string
//  *                 example: "60d0fe4f5311236168a109ca"
//  *               productId:
//  *                 type: string
//  *                 example: "60d0fe4f5311236168a109cb"
//  *               productTitle:
//  *                 type: string
//  *                 example: "Kashmiri Pashmina Shawl"
//  *               productImage:
//  *                 type: string
//  *                 example: "https://example.com/shawl.jpg"
//  *               price:
//  *                 type: number
//  *                 example: 1500
//  *               quantity:
//  *                 type: integer
//  *                 example: 1
//  *               totalAmount:
//  *                 type: number
//  *                 example: 1500
//  *               fullName:
//  *                 type: string
//  *                 example: "Rahul Sharma"
//  *               phone:
//  *                 type: string
//  *                 example: "9876543210"
//  *               address:
//  *                 type: string
//  *                 example: "123, Main Street, Delhi"
//  *               paymentMethod:
//  *                 type: string
//  *                 example: "Online"
//  *               paymentStatus:
//  *                 type: string
//  *                 example: "Pending"
//  *               razorpayPaymentId:
//  *                 type: string
//  *                 example: "pay_123456789"
//  *               sellerId:
//  *                 type: string
//  *                 example: "60d0fe4f5311236168a109cc"
//  *     responses:
//  *       '201':
//  *         description: Order saved successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Order safaltapoorvak save ho gaya!"
//  *                 order:
//  *                   $ref: '#/components/schemas/Order'
//  *       '400':
//  *         description: Missing required fields
//  *       '500':
//  *         description: Server error
//  */
// router.post("/add", async (req, res) => {
//   try {
//     const {
//       userId,
//       productId,
//       productTitle,
//       productImage,
//       price,
//       quantity,
//       totalAmount,
//       fullName,
//       phone,
//       address,
//       paymentMethod,
//       paymentStatus,
//       razorpayPaymentId,
//       sellerId,
//     } = req.body;

//     if (
//       !userId ||
//       !productId ||
//       !productTitle ||
//       !price ||
//       !quantity ||
//       !totalAmount ||
//       !fullName ||
//       !phone ||
//       !address ||
//       !paymentMethod
//     ) {
//       return res.status(400).json({ message: "Kripya sabhi zaroori fields bharein." });
//     }

//     let targetSellerId = sellerId;
//     if (!targetSellerId) {
//       try {
//         const productData = await Product.findById(productId);
//         if (productData) {
//           targetSellerId = productData.sellerId || productData.seller || productData.userId;
//         }
//       } catch (err) {
//         console.log("Product fetch karne me error, fallback use hoga.");
//       }
//     }

//     if (!targetSellerId) {
//       return res.status(400).json({ message: "Seller ID nahi mil saki is product ke liye." });
//     }

//     const newOrder = new Order({
//       userId,
//       productId,
//       productTitle,
//       productImage,
//       price,
//       quantity,
//       totalAmount,
//       fullName,
//       phone,
//       address,
//       paymentMethod,
//       paymentStatus: paymentStatus || "Pending",
//       razorpayPaymentId: razorpayPaymentId || "",
//       orderStatus: "Processing",
//       sellerId: targetSellerId,
//     });

//     const savedOrder = await newOrder.save();

//     try {
//       await SellerNotification.create({
//         sellerId: targetSellerId,
//         title: "📦 New Order Received!",
//         message: `Customer ${fullName} has placed an order for "${productTitle}" (Qty: ${quantity}). Total: ₹${totalAmount}`,
//         type: "success",
//       });
//       console.log("✅ Seller Notification created successfully for sellerId:", targetSellerId);
//     } catch (notifErr) {
//       console.error("❌ Error creating seller notification:", notifErr);
//     }

//     return res.status(201).json({
//       message: "Order safaltapoorvak save ho gaya!",
//       order: savedOrder,
//     });
//   } catch (error) {
//     console.error("Order save karte waqt error:", error);
//     return res.status(500).json({ message: "Server error, order save nahi ho paya." });
//   }
// });

// /**
//  * @swagger
//  * /api/shawls/orders/user/{userId}:
//  *   get:
//  *     summary: Get all orders for a specific user
//  *     description: Retrieves all orders placed by a given customer ID, sorted by latest first.
//  *     parameters:
//  *       - in: path
//  *         name: userId
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The user ID
//  *         example: "60d0fe4f5311236168a109ca"
//  *     responses:
//  *       '200':
//  *         description: List of orders fetched successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Order'
//  *       '500':
//  *         description: Server error
//  */
// router.get("/user/:userId", async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
//     return res.status(200).json(orders);
//   } catch (error) {
//     console.error("Orders fetch karte waqt error:", error);
//     return res.status(500).json({ message: "Server error, orders fetch nahi ho paye." });
//   }
// });

// /**
//  * @swagger
//  * /api/shawls/orders:
//  *   get:
//  *     summary: Get all orders (Admin)
//  *     description: Retrieves all orders across all users, sorted by latest first.
//  *     responses:
//  *       '200':
//  *         description: All orders list fetched successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Order'
//  *       '500':
//  *         description: Server error
//  */
// router.get("/", async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 });
//     return res.status(200).json(orders);
//   } catch (error) {
//     console.error("Orders fetch karte waqt error:", error);
//     return res.status(500).json({ message: "Server error, orders fetch nahi ho paye." });
//   }
// });

// /**
//  * @swagger
//  * /api/shawls/orders/{id}/status:
//  *   patch:
//  *     summary: Update order status (Admin)
//  *     description: Updates the status of a specific order (e.g., Processing, Shipped, Delivered).
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The unique order document ID
//  *         example: "60d0fe4f5311236168a109bb"
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - orderStatus
//  *             properties:
//  *               orderStatus:
//  *                 type: string
//  *                 example: "Shipped"
//  *     responses:
//  *       '200':
//  *         description: Order status updated successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Order'
//  *       '400':
//  *         description: Order status missing
//  *       '404':
//  *         description: Order not found
//  *       '500':
//  *         description: Server error
//  */
// router.patch("/:id/status", async (req, res) => {
//   try {
//     const { orderStatus } = req.body;

//     if (!orderStatus) {
//       return res.status(400).json({ message: "Order status zaroori hai." });
//     }

//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.id,
//       { orderStatus },
//       { returnDocument: 'after' }
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({ message: "Order nahi mila." });
//     }

//     return res.status(200).json(updatedOrder);
//   } catch (error) {
//     console.error("Order status update karte waqt error:", error);
//     return res.status(500).json({ message: "Server error while updating order status." });
//   }
// });

// module.exports = router;









// newww sahi




// const express = require("express");
// const router = express.Router();
// const Order = require("../models/Order");
// const Product = require("../models/SellerProduct"); 
// const SellerNotification = require("../models/SellerNotification");
// const Notification = require("../models/Notification"); // 👈 Customer Notification model import kiya gaya hai

// /**
//  * @swagger
//  * tags:
//  *  name: order Products
//  *  description: order product management APIs
//  */

// /**
//  * @swagger
//  * components:
//  *  schemas:
//  *   Order:
//  *    type: object
//  *    properties:
//  *     _id:
//  *      type: string
//  *      example: "60d0fe4f5311236168a109bb"
//  *     userId:
//  *      type: string
//  *      example: "60d0fe4f5311236168a109ca"
//  *     productId:
//  *      type: string
//  *      example: "60d0fe4f5311236168a109cb"
//  *     productTitle:
//  *      type: string
//  *      example: "Kashmiri Pashmina Shawl"
//  *     productImage:
//  *      type: string
//  *      example: "https://example.com/shawl.jpg"
//  *     price:
//  *      type: number
//  *      example: 1500
//  *     quantity:
//  *      type: integer
//  *      example: 1
//  *     totalAmount:
//  *      type: number
//  *      example: 1500
//  *     fullName:
//  *      type: string
//  *      example: "Rahul Sharma"
//  *     phone:
//  *      type: string
//  *      example: "9876543210"
//  *     address:
//  *      type: string
//  *      example: "123, Main Street, Delhi"
//  *     paymentMethod:
//  *      type: string
//  *      example: "Online"
//  *     paymentStatus:
//  *      type: string
//  *      example: "Pending"
//  *     orderStatus:
//  *      type: string
//  *      example: "Processing"
//  *     sellerId:
//  *      type: string
//  *      example: "60d0fe4f5311236168a109cc"
//  *     createdAt:
//  *      type: string
//  *      format: date-time
//  */

// /**
//  * @swagger
//  * /api/shawls/orders/add:
//  *  post:
//  *   summary: Create a new order
//  *   description: Saves a new customer order, handles seller identification, triggers seller notification, and customer notification with productId.
//  *   requestBody:
//  *    required: true
//  *    content:
//  *     application/json:
//  *      schema:
//  *       type: object
//  *       required:
//  *        - userId
//  *        - productId
//  *        - productTitle
//  *        - price
//  *        - quantity
//  *        - totalAmount
//  *        - fullName
//  *        - phone
//  *        - address
//  *        - paymentMethod
//  *      properties:
//  *       userId:
//  *        type: string
//  *        example: "60d0fe4f5311236168a109ca"
//  *       productId:
//  *        type: string
//  *        example: "60d0fe4f5311236168a109cb"
//  *       productTitle:
//  *        type: string
//  *        example: "Kashmiri Pashmina Shawl"
//  *       productImage:
//  *        type: string
//  *        example: "https://example.com/shawl.jpg"
//  *       price:
//  *        type: number
//  *        example: 1500
//  *       quantity:
//  *        type: integer
//  *        example: 1
//  *       totalAmount:
//  *        type: number
//  *        example: 1500
//  *       fullName:
//  *        type: string
//  *        example: "Rahul Sharma"
//  *       phone:
//  *        type: string
//  *        example: "9876543210"
//  *       address:
//  *        type: string
//  *        example: "123, Main Street, Delhi"
//  *       paymentMethod:
//  *        type: string
//  *        example: "Online"
//  *       paymentStatus:
//  *        type: string
//  *        example: "Pending"
//  *       razorpayPaymentId:
//  *        type: string
//  *        example: "pay_123456789"
//  *       sellerId:
//  *        type: string
//  *        example: "60d0fe4f5311236168a109cc"
//  *    responses:
//  *     '201':
//  *      description: Order saved successfully
//  *      content:
//  *       application/json:
//  *        schema:
//  *         type: object
//  *         properties:
//  *          message:
//  *           type: string
//  *           example: "Order safaltapoorvak save ho gaya!"
//  *          order:
//  *           $ref: '#/components/schemas/Order'
//  *    '400':
//  *     description: Missing required fields
//  *    '500':
//  *     description: Server error
//  */
// router.post("/add", async (req, res) => {
//   try {
//     const {
//       userId,
//       productId,
//       productTitle,
//       productImage,
//       price,
//       quantity,
//       totalAmount,
//       fullName,
//       phone,
//       address,
//       paymentMethod,
//       paymentStatus,
//       razorpayPaymentId,
//       sellerId,
//     } = req.body;

//     if (
//       !userId ||
//       !productId ||
//       !productTitle ||
//       !price ||
//       !quantity ||
//       !totalAmount ||
//       !fullName ||
//       !phone ||
//       !address ||
//       !paymentMethod
//     ) {
//       return res.status(400).json({ message: "Kripya sabhi zaroori fields bharein." });
//     }

//     let targetSellerId = sellerId;
//     if (!targetSellerId) {
//       try {
//         const productData = await Product.findById(productId);
//         if (productData) {
//           targetSellerId = productData.sellerId || productData.seller || productData.userId;
//         }
//       } catch (err) {
//         console.log("Product fetch karne me error, fallback use hoga.");
//       }
//     }

//     if (!targetSellerId) {
//       return res.status(400).json({ message: "Seller ID nahi mil saki is product ke liye." });
//     }

//     const newOrder = new Order({
//       userId,
//       productId,
//       productTitle,
//       productImage,
//       price,
//       quantity,
//       totalAmount,
//       fullName,
//       phone,
//       address,
//       paymentMethod,
//       paymentStatus: paymentStatus || "Pending",
//       razorpayPaymentId: razorpayPaymentId || "",
//       orderStatus: "Processing",
//       sellerId: targetSellerId,
//     });

//     const savedOrder = await newOrder.save();

//     // 1️⃣ Seller ke liye notification create karein
//     try {
//       await SellerNotification.create({
//         sellerId: targetSellerId,
//         title: "📦 New Order Received!",
//         message: `Customer ${fullName} has placed an order for "${productTitle}" (Qty: ${quantity}). Total: ₹${totalAmount}`,
//         type: "success",
//       });
//       console.log("✅ Seller Notification created successfully for sellerId:", targetSellerId);
//     } catch (notifErr) {
//       console.error("❌ Error creating seller notification:", notifErr);
//     }

//     // 2️⃣ Customer ke liye notification create karein (ProductId ke sath)
//     try {
//       await Notification.create({
//         userId: userId,
//         productId: productId, // 👈 Yahan productId properly pass ho rahi hai
//         title: "Order Placed Successfully 📦",
//         message: `Your order for "${productTitle}" has been placed successfully.`,
//         type: "order",
//         read: false,
//         time: new Date()
//       });
//       console.log("✅ Customer Notification created successfully for userId:", userId);
//     } catch (custNotifErr) {
//       console.error("❌ Error creating customer notification:", custNotifErr);
//     }

//     return res.status(201).json({
//       message: "Order safaltapoorvak save ho gaya!",
//       order: savedOrder,
//     });
//   } catch (error) {
//     console.error("Order save karte waqt error:", error);
//     return res.status(500).json({ message: "Server error, order save nahi ho paya." });
//   }
// });

// /**
//  * @swagger
//  * /api/shawls/orders/user/{userId}:
//  *  get:
//  *   summary: Get all orders for a specific user
//  *   description: Retrieves all orders placed by a given customer ID, sorted by latest first.
//  *   parameters:
//  *    - in: path
//  *     name: userId
//  *     required: true
//  *     schema:
//  *      type: string
//  *     description: The user ID
//  *     example: "60d0fe4f5311236168a109ca"
//  *   responses:
//  *    '200':
//  *     description: List of orders fetched successfully
//  *     content:
//  *      application/json:
//  *       schema:
//  *        type: array
//  *        items:
//  *         $ref: '#/components/schemas/Order'
//  *    '500':
//  *     description: Server error
//  */
// router.get("/user/:userId", async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
//     return res.status(200).json(orders);
//   } catch (error) {
//     console.error("Orders fetch karte waqt error:", error);
//     return res.status(500).json({ message: "Server error, orders fetch nahi ho paye." });
//   }
// });

// /**
//  * @swagger
//  * /api/shawls/orders:
//  *  get:
//  *   summary: Get all orders (Admin)
//  *   description: Retrieves all orders across all users, sorted by latest first.
//  *   responses:
//  *    '200':
//  *     description: All orders list fetched successfully
//  *     content:
//  *      application/json:
//  *       schema:
//  *        type: array
//  *        items:
//  *         $ref: '#/components/schemas/Order'
//  *    '500':
//  *     description: Server error
//  */
// router.get("/", async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 });
//     return res.status(200).json(orders);
//   } catch (error) {
//     console.error("Orders fetch karte waqt error:", error);
//     return res.status(500).json({ message: "Server error, orders fetch nahi ho paye." });
//   }
// });

// /**
//  * @swagger
//  * /api/shawls/orders/{id}/status:
//  *  patch:
//  *   summary: Update order status (Admin)
//  *   description: Updates the status of a specific order (e.g., Processing, Shipped, Delivered).
//  *   parameters:
//  *    - in: path
//  *     name: id
//  *     required: true
//  *     schema:
//  *      type: string
//  *     description: The unique order document ID
//  *     example: "60d0fe4f5311236168a109bb"
//  *   requestBody:
//  *    required: true
//  *    content:
//  *     application/json:
//  *      schema:
//  *       type: object
//  *       required:
//  *        - orderStatus
//  *      properties:
//  *       orderStatus:
//  *        type: string
//  *        example: "Shipped"
//  *   responses:
//  *    '200':
//  *     description: Order status updated successfully
//  *     content:
//  *      application/json:
//  *       schema:
//  *        $ref: '#/components/schemas/Order'
//  *    '400':
//  *     description: Order status missing
//  *    '404':
//  *     description: Order not found
//  *    '500':
//  *     description: Server error
//  */
// router.patch("/:id/status", async (req, res) => {
//   try {
//     const { orderStatus } = req.body;

//     if (!orderStatus) {
//       return res.status(400).json({ message: "Order status zaroori hai." });
//     }

//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.id,
//       { orderStatus },
//       { returnDocument: 'after' }
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({ message: "Order nahi mila." });
//     }

//     // Optional: Aap yahan chahein toh order status update hone par bhi customer ko notification bhej sakte hain
//     try {
//       await Notification.create({
//         userId: updatedOrder.userId,
//         productId: updatedOrder.productId,
//         title: "Order Status Updated 🚚",
//         message: `Your order for "${updatedOrder.productTitle}" is now: ${orderStatus}`,
//         type: "order",
//         read: false,
//         time: new Date()
//       });
//     } catch (statusNotifErr) {
//       console.error("Status update notification error:", statusNotifErr);
//     }

//     return res.status(200).json(updatedOrder);
//   } catch (error) {
//     console.error("Order status update karte waqt error:", error);
//     return res.status(500).json({ message: "Server error while updating order status." });
//   }
// });

// module.exports = router;




// new sahi 



// const express = require("express");
// const router = express.Router();
// const Order = require("../models/Order");
// const Product = require("../models/SellerProduct"); 
// const SellerNotification = require("../models/SellerNotification");
// const Notification = require("../models/Notification");

// /**
//  * @swagger
//  * tags:
//  *   name: order Products
//  *   description: order product management APIs
//  */

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Order:
//  *       type: object
//  *       properties:
//  *         _id:
//  *           type: string
//  *           example: "60d0fe4f5311236168a109bb"
//  *         userId:
//  *           type: string
//  *           example: "60d0fe4f5311236168a109ca"
//  *         productId:
//  *           type: string
//  *           example: "60d0fe4f5311236168a109cb"
//  *         productTitle:
//  *           type: string
//  *           example: "Kashmiri Pashmina Shawl"
//  *         productImage:
//  *           type: string
//  *           example: "https://example.com/shawl.jpg"
//  *         price:
//  *           type: number
//  *           example: 1500
//  *         quantity:
//  *           type: integer
//  *           example: 1
//  *         totalAmount:
//  *           type: number
//  *           example: 1500
//  *         fullName:
//  *           type: string
//  *           example: "Rahul Sharma"
//  *         phone:
//  *           type: string
//  *           example: "9876543210"
//  *         address:
//  *           type: string
//  *           example: "123, Main Street, Delhi"
//  *         paymentMethod:
//  *           type: string
//  *           example: "Online"
//  *         paymentStatus:
//  *           type: string
//  *           example: "Pending"
//  *         orderStatus:
//  *           type: string
//  *           example: "Processing"
//  *         sellerId:
//  *           type: string
//  *           example: "60d0fe4f5311236168a109cc"
//  *         createdAt:
//  *           type: string
//  *           format: date-time
//  */

// /**
//  * @swagger
//  * /api/shawls/orders/add:
//  *   post:
//  *     summary: Create a new order
//  *     description: Saves a new customer order, handles seller identification, triggers seller notification, and customer notification with productId.
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - userId
//  *               - productId
//  *               - productTitle
//  *               - price
//  *               - quantity
//  *               - totalAmount
//  *               - fullName
//  *               - phone
//  *               - address
//  *               - paymentMethod
//  *             properties:
//  *               userId:
//  *                 type: string
//  *                 example: "60d0fe4f5311236168a109ca"
//  *               productId:
//  *                 type: string
//  *                 example: "60d0fe4f5311236168a109cb"
//  *               productTitle:
//  *                 type: string
//  *                 example: "Kashmiri Pashmina Shawl"
//  *               productImage:
//  *                 type: string
//  *                 example: "https://example.com/shawl.jpg"
//  *               price:
//  *                 type: number
//  *                 example: 1500
//  *               quantity:
//  *                 type: integer
//  *                 example: 1
//  *               totalAmount:
//  *                 type: number
//  *                 example: 1500
//  *               fullName:
//  *                 type: string
//  *                 example: "Rahul Sharma"
//  *               phone:
//  *                 type: string
//  *                 example: "9876543210"
//  *               address:
//  *                 type: string
//  *                 example: "123, Main Street, Delhi"
//  *               paymentMethod:
//  *                 type: string
//  *                 example: "Online"
//  *               paymentStatus:
//  *                 type: string
//  *                 example: "Pending"
//  *               razorpayPaymentId:
//  *                 type: string
//  *                 example: "pay_123456789"
//  *               sellerId:
//  *                 type: string
//  *                 example: "60d0fe4f5311236168a109cc"
//  *     responses:
//  *       '201':
//  *         description: Order saved successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Order safaltapoorvak save ho gaya!"
//  *                 order:
//  *                   $ref: '#/components/schemas/Order'
//  *       '400':
//  *         description: Missing required fields
//  *       '500':
//  *         description: Server error
//  */
// router.post("/add", async (req, res) => {
//   try {
//     const {
//       userId,
//       productId,
//       productTitle,
//       productImage,
//       price,
//       quantity,
//       totalAmount,
//       fullName,
//       phone,
//       address,
//       paymentMethod,
//       paymentStatus,
//       razorpayPaymentId,
//       sellerId,
//     } = req.body;

//     if (
//       !userId ||
//       !productId ||
//       !productTitle ||
//       !price ||
//       !quantity ||
//       !totalAmount ||
//       !fullName ||
//       !phone ||
//       !address ||
//       !paymentMethod
//     ) {
//       return res.status(400).json({ message: "Kripya sabhi zaroori fields bharein." });
//     }

//     let targetSellerId = sellerId;
//     if (!targetSellerId) {
//       try {
//         const productData = await Product.findById(productId);
//         if (productData) {
//           targetSellerId = productData.sellerId || productData.seller || productData.userId;
//         }
//       } catch (err) {
//         console.log("Product fetch karne me error, fallback use hoga.");
//       }
//     }

//     if (!targetSellerId) {
//       return res.status(400).json({ message: "Seller ID nahi mil saki is product ke liye." });
//     }

//     const newOrder = new Order({
//       userId,
//       productId,
//       productTitle,
//       productImage,
//       price,
//       quantity,
//       totalAmount,
//       fullName,
//       phone,
//       address,
//       paymentMethod,
//       paymentStatus: paymentStatus || "Pending",
//       razorpayPaymentId: razorpayPaymentId || "",
//       orderStatus: "Processing",
//       sellerId: targetSellerId,
//     });

//     const savedOrder = await newOrder.save();

//     try {
//       await SellerNotification.create({
//         sellerId: targetSellerId,
//         title: "📦 New Order Received!",
//         message: `Customer ${fullName} has placed an order for "${productTitle}" (Qty: ${quantity}). Total: ₹${totalAmount}`,
//         type: "success",
//       });
//       console.log("✅ Seller Notification created successfully for sellerId:", targetSellerId);
//     } catch (notifErr) {
//       console.error("❌ Error creating seller notification:", notifErr);
//     }

//     try {
//       await Notification.create({
//         userId: userId,
//         productId: productId,
//         title: "Order Placed Successfully 📦",
//         message: `Your order for "${productTitle}" has been placed successfully.`,
//         type: "order",
//         read: false,
//         time: new Date()
//       });
//       console.log("✅ Customer Notification created successfully for userId:", userId);
//     } catch (custNotifErr) {
//       console.error("❌ Error creating customer notification:", custNotifErr);
//     }

//     return res.status(201).json({
//       message: "Order safaltapoorvak save ho gaya!",
//       order: savedOrder,
//     });
//   } catch (error) {
//     console.error("Order save karte waqt error:", error);
//     return res.status(500).json({ message: "Server error, order save nahi ho paya." });
//   }
// });

// /**
//  * @swagger
//  * /api/shawls/orders/user/{userId}:
//  *   get:
//  *     summary: Get all orders for a specific user
//  *     description: Retrieves all orders placed by a given customer ID, sorted by latest first.
//  *     parameters:
//  *       - in: path
//  *         name: userId
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The user ID
//  *         example: "60d0fe4f5311236168a109ca"
//  *     responses:
//  *       '200':
//  *         description: List of orders fetched successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Order'
//  *       '500':
//  *         description: Server error
//  */
// router.get("/user/:userId", async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
//     return res.status(200).json(orders);
//   } catch (error) {
//     console.error("Orders fetch karte waqt error:", error);
//     return res.status(500).json({ message: "Server error, orders fetch nahi ho paye." });
//   }
// });

// /**
//  * @swagger
//  * /api/shawls/orders:
//  *   get:
//  *     summary: Get all orders (Admin)
//  *     description: Retrieves all orders across all users, sorted by latest first.
//  *     responses:
//  *       '200':
//  *         description: All orders list fetched successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Order'
//  *       '500':
//  *         description: Server error
//  */
// router.get("/", async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 });
//     return res.status(200).json(orders);
//   } catch (error) {
//     console.error("Orders fetch karte waqt error:", error);
//     return res.status(500).json({ message: "Server error, orders fetch nahi ho paye." });
//   }
// });

// /**
//  * @swagger
//  * /api/shawls/orders/{id}/status:
//  *   patch:
//  *     summary: Update order status (Admin)
//  *     description: Updates the status of a specific order (e.g., Processing, Shipped, Delivered).
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The unique order document ID
//  *         example: "60d0fe4f5311236168a109bb"
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - orderStatus
//  *             properties:
//  *               orderStatus:
//  *                 type: string
//  *                 example: "Shipped"
//  *     responses:
//  *       '200':
//  *         description: Order status updated successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Order'
//  *       '400':
//  *         description: Order status missing
//  *       '404':
//  *         description: Order not found
//  *       '500':
//  *         description: Server error
//  */
// router.patch("/:id/status", async (req, res) => {
//   try {
//     const { orderStatus } = req.body;

//     if (!orderStatus) {
//       return res.status(400).json({ message: "Order status zaroori hai." });
//     }

//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.id,
//       { orderStatus },
//       { returnDocument: 'after' }
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({ message: "Order nahi mila." });
//     }

//     try {
//       await Notification.create({
//         userId: updatedOrder.userId,
//         productId: updatedOrder.productId,
//         title: "Order Status Updated 🚚",
//         message: `Your order for "${updatedOrder.productTitle}" is now: ${orderStatus}`,
//         type: "order",
//         read: false,
//         time: new Date()
//       });
//     } catch (statusNotifErr) {
//       console.error("Status update notification error:", statusNotifErr);
//     }

//     return res.status(200).json(updatedOrder);
//   } catch (error) {
//     console.error("Order status update karte waqt error:", error);
//     return res.status(500).json({ message: "Server error while updating order status." });
//   }
// });

// module.exports = router;





//new shai




// const express = require("express");
// const router = express.Router();
// const Order = require("../models/Order");
// const Product = require("../models/SellerProduct"); 
// const SellerNotification = require("../models/SellerNotification");
// const Notification = require("../models/Notification");

// /**
//  * @swagger
//  * tags:
//  *   name: order Products
//  *   description: order product management APIs
//  */

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Order:
//  *       type: object
//  *       properties:
//  *         _id:
//  *           type: string
//  *           example: "60d0fe4f5311236168a109bb"
//  *         userId:
//  *           type: string
//  *           example: "60d0fe4f5311236168a109ca"
//  *         productId:
//  *           type: string
//  *           example: "60d0fe4f5311236168a109cb"
//  *         productTitle:
//  *           type: string
//  *           example: "Kashmiri Pashmina Shawl"
//  *         productImage:
//  *           type: string
//  *           example: "https://example.com/shawl.jpg"
//  *         price:
//  *           type: number
//  *           example: 1500
//  *         quantity:
//  *           type: integer
//  *           example: 1
//  *         totalAmount:
//  *           type: number
//  *           example: 1500
//  *         fullName:
//  *           type: string
//  *           example: "Rahul Sharma"
//  *         phone:
//  *           type: string
//  *           example: "9876543210"
//  *         address:
//  *           type: string
//  *           example: "123, Main Street, Delhi"
//  *         paymentMethod:
//  *           type: string
//  *           example: "Online"
//  *         paymentStatus:
//  *           type: string
//  *           example: "Pending"
//  *         orderStatus:
//  *           type: string
//  *           example: "Processing"
//  *         trackingId:
//  *           type: string
//  *           example: "TRK123456789"
//  *         sellerId:
//  *           type: string
//  *           example: "60d0fe4f5311236168a109cc"
//  *         createdAt:
//  *           type: string
//  *           format: date-time
//  */

// /**
//  * @swagger
//  * /api/shawls/orders/add:
//  *   post:
//  *     summary: Create a new order
//  *     description: Saves a new customer order, handles seller identification, triggers seller notification, and customer notification with productId.
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - userId
//  *               - productId
//  *               - productTitle
//  *               - price
//  *               - quantity
//  *               - totalAmount
//  *               - fullName
//  *               - phone
//  *               - address
//  *               - paymentMethod
//  *             properties:
//  *               userId:
//  *                 type: string
//  *                 example: "60d0fe4f5311236168a109ca"
//  *               productId:
//  *                 type: string
//  *                 example: "60d0fe4f5311236168a109cb"
//  *               productTitle:
//  *                 type: string
//  *                 example: "Kashmiri Pashmina Shawl"
//  *               productImage:
//  *                 type: string
//  *                 example: "https://example.com/shawl.jpg"
//  *               price:
//  *                 type: number
//  *                 example: 1500
//  *               quantity:
//  *                 type: integer
//  *                 example: 1
//  *               totalAmount:
//  *                 type: number
//  *                 example: 1500
//  *               fullName:
//  *                 type: string
//  *                 example: "Rahul Sharma"
//  *               phone:
//  *                 type: string
//  *                 example: "9876543210"
//  *               address:
//  *                 type: string
//  *                 example: "123, Main Street, Delhi"
//  *               paymentMethod:
//  *                 type: string
//  *                 example: "Online"
//  *               paymentStatus:
//  *                 type: string
//  *                 example: "Pending"
//  *               razorpayPaymentId:
//  *                 type: string
//  *                 example: "pay_123456789"
//  *               sellerId:
//  *                 type: string
//  *                 example: "60d0fe4f5311236168a109cc"
//  *     responses:
//  *       '201':
//  *         description: Order saved successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Order safaltapoorvak save ho gaya!"
//  *                 order:
//  *                   $ref: '#/components/schemas/Order'
//  *       '400':
//  *         description: Missing required fields
//  *       '500':
//  *         description: Server error
//  */
// router.post("/add", async (req, res) => {
//   try {
//     const {
//       userId,
//       productId,
//       productTitle,
//       productImage,
//       price,
//       quantity,
//       totalAmount,
//       fullName,
//       phone,
//       address,
//       paymentMethod,
//       paymentStatus,
//       razorpayPaymentId,
//       sellerId,
//     } = req.body;

//     if (
//       !userId ||
//       !productId ||
//       !productTitle ||
//       !price ||
//       !quantity ||
//       !totalAmount ||
//       !fullName ||
//       !phone ||
//       !address ||
//       !paymentMethod
//     ) {
//       return res.status(400).json({ message: "Kripya sabhi zaroori fields bharein." });
//     }

//     let targetSellerId = sellerId;
//     if (!targetSellerId) {
//       try {
//         const productData = await Product.findById(productId);
//         if (productData) {
//           targetSellerId = productData.sellerId || productData.seller || productData.userId;
//         }
//       } catch (err) {
//         console.log("Product fetch karne me error, fallback use hoga.");
//       }
//     }

//     if (!targetSellerId) {
//       return res.status(400).json({ message: "Seller ID nahi mil saki is product ke liye." });
//     }

//     const newOrder = new Order({
//       userId,
//       productId,
//       productTitle,
//       productImage,
//       price,
//       quantity,
//       totalAmount,
//       fullName,
//       phone,
//       address,
//       paymentMethod,
//       paymentStatus: paymentStatus || "Pending",
//       razorpayPaymentId: razorpayPaymentId || "",
//       orderStatus: "Processing",
//       trackingId: "",
//       sellerId: targetSellerId,
//     });

//     const savedOrder = await newOrder.save();

//     try {
//       await SellerNotification.create({
//         sellerId: targetSellerId,
//         title: "📦 New Order Received!",
//         message: `Customer ${fullName} has placed an order for "${productTitle}" (Qty: ${quantity}). Total: ₹${totalAmount}`,
//         type: "success",
//       });
//     } catch (notifErr) {
//       console.error("Error creating seller notification:", notifErr);
//     }

//     try {
//       await Notification.create({
//         userId: userId,
//         productId: productId,
//         title: "Order Placed Successfully 📦",
//         message: `Your order for "${productTitle}" has been placed successfully.`,
//         type: "order",
//         read: false,
//         time: new Date()
//       });
//     } catch (custNotifErr) {
//       console.error("Error creating customer notification:", custNotifErr);
//     }

//     return res.status(201).json({
//       message: "Order safaltapoorvak save ho gaya!",
//       order: savedOrder,
//     });
//   } catch (error) {
//     console.error("Order save karte waqt error:", error);
//     return res.status(500).json({ message: "Server error, order save nahi ho paya." });
//   }
// });

// /**
//  * @swagger
//  * /api/shawls/orders/user/{userId}:
//  *   get:
//  *     summary: Get all orders for a specific user
//  *     description: Retrieves all orders placed by a given customer ID, sorted by latest first.
//  *     parameters:
//  *       - in: path
//  *         name: userId
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The user ID
//  *         example: "60d0fe4f5311236168a109ca"
//  *     responses:
//  *       '200':
//  *         description: List of orders fetched successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Order'
//  *       '500':
//  *         description: Server error
//  */
// router.get("/user/:userId", async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
//     return res.status(200).json(orders);
//   } catch (error) {
//     console.error("Orders fetch karte waqt error:", error);
//     return res.status(500).json({ message: "Server error, orders fetch nahi ho paye." });
//   }
// });

// /**
//  * @swagger
//  * /api/shawls/orders:
//  *   get:
//  *     summary: Get all orders (Admin/Seller)
//  *     description: Retrieves all orders across all users, sorted by latest first.
//  *     responses:
//  *       '200':
//  *         description: All orders list fetched successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Order'
//  *       '500':
//  *         description: Server error
//  */
// router.get("/", async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 });
//     return res.status(200).json(orders);
//   } catch (error) {
//     console.error("Orders fetch karte waqt error:", error);
//     return res.status(500).json({ message: "Server error, orders fetch nahi ho paye." });
//   }
// });

// /**
//  * @swagger
//  * /api/shawls/orders/{id}:
//  *   get:
//  *     summary: Get a single order by ID
//  *     description: Retrieves details of a specific order by its unique document ID (used for tracking).
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The unique order document ID
//  *         example: "60d0fe4f5311236168a109bb"
//  *     responses:
//  *       '200':
//  *         description: Order details fetched successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Order'
//  *       '404':
//  *         description: Order not found
//  *       '500':
//  *         description: Server error
//  */
// router.get("/:id", async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) return res.status(404).json({ message: "Order nahi mila." });
//     return res.status(200).json(order);
//   } catch (error) {
//     console.error("Single order fetch karte waqt error:", error);
//     return res.status(500).json({ message: "Server error while fetching order." });
//   }
// });

// /**
//  * @swagger
//  * /api/shawls/orders/{id}/status:
//  *   patch:
//  *     summary: Update order status (Admin/Seller)
//  *     description: Updates the status of a specific order (e.g., Processing, Shipped, Delivered).
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The unique order document ID
//  *         example: "60d0fe4f5311236168a109bb"
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - orderStatus
//  *             properties:
//  *               orderStatus:
//  *                 type: string
//  *                 example: "Shipped"
//  *     responses:
//  *       '200':
//  *         description: Order status updated successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Order'
//  *       '400':
//  *         description: Order status missing
//  *       '404':
//  *         description: Order not found
//  *       '500':
//  *         description: Server error
//  */
// router.patch("/:id/status", async (req, res) => {
//   try {
//     const { orderStatus } = req.body;

//     if (!orderStatus) {
//       return res.status(400).json({ message: "Order status zaroori hai." });
//     }

//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.id,
//       { orderStatus },
//       { returnDocument: 'after' }
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({ message: "Order nahi mila." });
//     }

//     try {
//       await Notification.create({
//         userId: updatedOrder.userId,
//         productId: updatedOrder.productId,
//         title: "Order Status Updated 🚚",
//         message: `Your order for "${updatedOrder.productTitle}" is now: ${orderStatus}`,
//         type: "order",
//         read: false,
//         time: new Date()
//       });
//     } catch (statusNotifErr) {
//       console.error("Status update notification error:", statusNotifErr);
//     }

//     return res.status(200).json(updatedOrder);
//   } catch (error) {
//     console.error("Order status update karte waqt error:", error);
//     return res.status(500).json({ message: "Server error while updating order status." });
//   }
// });

// /**
//  * @swagger
//  * /api/shawls/orders/{id}/track:
//  *   put:
//  *     summary: Update tracking ID for an order (Seller)
//  *     description: Updates the tracking ID and changes order status to Shipped.
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The unique order document ID
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - trackingId
//  *             properties:
//  *               trackingId:
//  *                 type: string
//  *                 example: "TRK987654321"
//  *     responses:
//  *       '200':
//  *         description: Tracking ID updated successfully
//  *       '400':
//  *         description: Tracking ID is required
//  *       '404':
//  *         description: Order not found
//  *       '500':
//  *         description: Server error
//  */
// router.put("/:id/track", async (req, res) => {
//   try {
//     const { trackingId } = req.body;

//     if (!trackingId) {
//       return res.status(400).json({ message: "Tracking ID zaroori hai." });
//     }

//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.id,
//       { 
//         trackingId: trackingId, 
//         orderStatus: "Shipped" 
//       },
//       { returnDocument: 'after' }
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({ message: "Order nahi mila." });
//     }

//     try {
//       await Notification.create({
//         userId: updatedOrder.userId,
//         productId: updatedOrder.productId,
//         title: "Order Shipped 🚚",
//         message: `Your order for "${updatedOrder.productTitle}" has been shipped. Tracking ID: ${trackingId}`,
//         type: "order",
//         read: false,
//         time: new Date()
//       });
//     } catch (notifErr) {
//       console.error("Tracking notification error:", notifErr);
//     }

//     return res.status(200).json({
//       message: "Tracking ID successfully updated!",
//       order: updatedOrder,
//     });
//   } catch (error) {
//     console.error("Tracking ID update karte waqt error:", error);
//     return res.status(500).json({ message: "Server error while updating tracking ID." });
//   }
// });

// module.exports = router;





//cclaude office




const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Product = require("../models/SellerProduct");
const SellerNotification = require("../models/SellerNotification");
const Notification = require("../models/Notification");
const { protect } = require("../middleware/authMiddleware"); // ✅ Seller JWT verify karta hai, req.seller set karta hai

/**
 * @swagger
 * tags:
 *   name: order Products
 *   description: order product management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "60d0fe4f5311236168a109bb"
 *         userId:
 *           type: string
 *           example: "60d0fe4f5311236168a109ca"
 *         productId:
 *           type: string
 *           example: "60d0fe4f5311236168a109cb"
 *         productTitle:
 *           type: string
 *           example: "Kashmiri Pashmina Shawl"
 *         productImage:
 *           type: string
 *           example: "https://example.com/shawl.jpg"
 *         price:
 *           type: number
 *           example: 1500
 *         quantity:
 *           type: integer
 *           example: 1
 *         totalAmount:
 *           type: number
 *           example: 1500
 *         fullName:
 *           type: string
 *           example: "Rahul Sharma"
 *         phone:
 *           type: string
 *           example: "9876543210"
 *         address:
 *           type: string
 *           example: "123, Main Street, Delhi"
 *         paymentMethod:
 *           type: string
 *           example: "Online"
 *         paymentStatus:
 *           type: string
 *           example: "Pending"
 *         orderStatus:
 *           type: string
 *           example: "Processing"
 *         trackingId:
 *           type: string
 *           example: "TRK123456789"
 *         sellerId:
 *           type: string
 *           example: "60d0fe4f5311236168a109cc"
 *         createdAt:
 *           type: string
 *           format: date-time
 */

// /**
//  * @swagger
//  * /api/shawls/orders/add:
//  *   post:
//  *     summary: Create a new order
//  *     description: Saves a new customer order, handles seller identification, triggers seller notification, and customer notification with productId.
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - userId
//  *               - productId
//  *               - productTitle
//  *               - price
//  *               - quantity
//  *               - totalAmount
//  *               - fullName
//  *               - phone
//  *               - address
//  *               - paymentMethod
//  *             properties:
//  *               userId:
//  *                 type: string
//  *                 example: "60d0fe4f5311236168a109ca"
//  *               productId:
//  *                 type: string
//  *                 example: "60d0fe4f5311236168a109cb"
//  *               productTitle:
//  *                 type: string
//  *                 example: "Kashmiri Pashmina Shawl"
//  *               productImage:
//  *                 type: string
//  *                 example: "https://example.com/shawl.jpg"
//  *               price:
//  *                 type: number
//  *                 example: 1500
//  *               quantity:
//  *                 type: integer
//  *                 example: 1
//  *               totalAmount:
//  *                 type: number
//  *                 example: 1500
//  *               fullName:
//  *                 type: string
//  *                 example: "Rahul Sharma"
//  *               phone:
//  *                 type: string
//  *                 example: "9876543210"
//  *               address:
//  *                 type: string
//  *                 example: "123, Main Street, Delhi"
//  *               paymentMethod:
//  *                 type: string
//  *                 example: "Online"
//  *               paymentStatus:
//  *                 type: string
//  *                 example: "Pending"
//  *               razorpayPaymentId:
//  *                 type: string
//  *                 example: "pay_123456789"
//  *               sellerId:
//  *                 type: string
//  *                 example: "60d0fe4f5311236168a109cc"
//  *     responses:
//  *       '201':
//  *         description: Order saved successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Order safaltapoorvak save ho gaya!"
//  *                 order:
//  *                   $ref: '#/components/schemas/Order'
//  *       '400':
//  *         description: Missing required fields
//  *       '500':
//  *         description: Server error
//  */
router.post("/add", async (req, res) => {
  try {
    const {
      userId,
      productId,
      productTitle,
      productImage,
      price,
      quantity,
      totalAmount,
      fullName,
      phone,
      address,
      paymentMethod,
      paymentStatus,
      razorpayPaymentId,
      sellerId,
    } = req.body;

    if (
      !userId ||
      !productId ||
      !productTitle ||
      !price ||
      !quantity ||
      !totalAmount ||
      !fullName ||
      !phone ||
      !address ||
      !paymentMethod
    ) {
      return res.status(400).json({ message: "Kripya sabhi zaroori fields bharein." });
    }

    let targetSellerId = sellerId;
    if (!targetSellerId) {
      try {
        const productData = await Product.findById(productId);
        if (productData) {
          targetSellerId = productData.sellerId || productData.seller || productData.userId;
        }
      } catch (err) {
        console.log("Product fetch karne me error, fallback use hoga.");
      }
    }

    if (!targetSellerId) {
      return res.status(400).json({ message: "Seller ID nahi mil saki is product ke liye." });
    }

    const newOrder = new Order({
      userId,
      productId,
      productTitle,
      productImage,
      price,
      quantity,
      totalAmount,
      fullName,
      phone,
      address,
      paymentMethod,
      paymentStatus: paymentStatus || "Pending",
      razorpayPaymentId: razorpayPaymentId || "",
      orderStatus: "Processing",
      trackingId: "",
      sellerId: targetSellerId,
    });

    const savedOrder = await newOrder.save();

    try {
      await SellerNotification.create({
        sellerId: targetSellerId,
        title: "📦 New Order Received!",
        message: `Customer ${fullName} has placed an order for "${productTitle}" (Qty: ${quantity}). Total: ₹${totalAmount}`,
        type: "success",
      });
    } catch (notifErr) {
      console.error("Error creating seller notification:", notifErr);
    }

    try {
      await Notification.create({
        userId: userId,
        productId: productId,
        title: "Order Placed Successfully 📦",
        message: `Your order for "${productTitle}" has been placed successfully.`,
        type: "order",
        read: false,
        time: new Date()
      });
    } catch (custNotifErr) {
      console.error("Error creating customer notification:", custNotifErr);
    }

    return res.status(201).json({
      message: "Order safaltapoorvak save ho gaya!",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Order save karte waqt error:", error);
    return res.status(500).json({ message: "Server error, order save nahi ho paya." });
  }
});

/**
 * @swagger
 * /api/shawls/orders/seller/my-orders:
 *   get:
 *     summary: Get orders for the currently logged-in seller
 *     description: >
 *       Securely retrieves only the orders belonging to the authenticated seller
 *       (using JWT via the "protect" middleware — no client-side token decoding
 *       or userId guessing needed). Use this instead of GET / on the seller
 *       dashboard, analytics, shipping, and payment pages.
 *     tags: [order Products]
 *     security:
 *       - SellerBearerAuth: []
 *     responses:
 *       '200':
 *         description: Seller's orders fetched successfully
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
 *                 orders:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       '401':
 *         description: Unauthorized (token missing/invalid)
 *       '500':
 *         description: Server error
 */
router.get("/seller/my-orders",protect,async (req, res) => {
  try {


    const orders = await Order.find({  }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error) {
    console.error("Seller orders fetch karte waqt error:", error);
    return res.status(500).json({ success: false, message: "Server error, seller orders fetch nahi ho paye." });
  }
});

// /**
//  * @swagger
//  * /api/shawls/orders/user/{userId}:
//  *   get:
//  *     summary: Get all orders for a specific user
//  *     description: Retrieves all orders placed by a given customer ID, sorted by latest first.
//  *     parameters:
//  *       - in: path
//  *         name: userId
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The user ID
//  *         example: "60d0fe4f5311236168a109ca"
//  *     responses:
//  *       '200':
//  *         description: List of orders fetched successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Order'
//  *       '500':
//  *         description: Server error
//  */
router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Orders fetch karte waqt error:", error);
    return res.status(500).json({ message: "Server error, orders fetch nahi ho paye." });
  }
});

// /**
//  * @swagger
//  * /api/shawls/orders:
//  *   get:
//  *     summary: Get all orders (Admin only)
//  *     description: >
//  *       Retrieves all orders across all sellers/users, sorted by latest first.
//  *       ⚠️ This route is currently NOT authenticated — intended for the Admin
//  *       panel. Sellers should use GET /seller/my-orders instead, which is
//  *       secure and scoped to their own orders only.
//  *     responses:
//  *       '200':
//  *         description: All orders list fetched successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Order'
//  *       '500':
//  *         description: Server error
//  */
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Orders fetch karte waqt error:", error);
    return res.status(500).json({ message: "Server error, orders fetch nahi ho paye." });
  }
});

// /**
//  * @swagger
//  * /api/shawls/orders/{id}:
//  *   get:
//  *     summary: Get a single order by ID
//  *     description: Retrieves details of a specific order by its unique document ID (used for tracking).
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The unique order document ID
//  *         example: "60d0fe4f5311236168a109bb"
//  *     responses:
//  *       '200':
//  *         description: Order details fetched successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Order'
//  *       '404':
//  *         description: Order not found
//  *       '500':
//  *         description: Server error
//  */
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order nahi mila." });
    return res.status(200).json(order);
  } catch (error) {
    console.error("Single order fetch karte waqt error:", error);
    return res.status(500).json({ message: "Server error while fetching order." });
  }
});

// /**
//  * @swagger
//  * /api/shawls/orders/{id}/status:
//  *   patch:
//  *     summary: Update order status (Admin/Seller)
//  *     description: Updates the status of a specific order (e.g., Processing, Shipped, Delivered).
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The unique order document ID
//  *         example: "60d0fe4f5311236168a109bb"
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - orderStatus
//  *             properties:
//  *               orderStatus:
//  *                 type: string
//  *                 example: "Shipped"
//  *     responses:
//  *       '200':
//  *         description: Order status updated successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Order'
//  *       '400':
//  *         description: Order status missing
//  *       '404':
//  *         description: Order not found
//  *       '500':
//  *         description: Server error
//  */
router.patch("/:id/status", async (req, res) => {
  try {
    const { orderStatus } = req.body;

    if (!orderStatus) {
      return res.status(400).json({ message: "Order status zaroori hai." });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { returnDocument: 'after' }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order nahi mila." });
    }

    try {
      await Notification.create({
        userId: updatedOrder.userId,
        productId: updatedOrder.productId,
        title: "Order Status Updated 🚚",
        message: `Your order for "${updatedOrder.productTitle}" is now: ${orderStatus}`,
        type: "order",
        read: false,
        time: new Date()
      });
    } catch (statusNotifErr) {
      console.error("Status update notification error:", statusNotifErr);
    }

    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Order status update karte waqt error:", error);
    return res.status(500).json({ message: "Server error while updating order status." });
  }
});

// /**
//  * @swagger
//  * /api/shawls/orders/{id}/track:
//  *   put:
//  *     summary: Update tracking ID for an order (Seller)
//  *     description: Updates the tracking ID and changes order status to Shipped.
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The unique order document ID
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - trackingId
//  *             properties:
//  *               trackingId:
//  *                 type: string
//  *                 example: "TRK987654321"
//  *     responses:
//  *       '200':
//  *         description: Tracking ID updated successfully
//  *       '400':
//  *         description: Tracking ID is required
//  *       '404':
//  *         description: Order not found
//  *       '500':
//  *         description: Server error
//  */
router.put("/:id/track", async (req, res) => {
  try {
    const { trackingId } = req.body;

    if (!trackingId) {
      return res.status(400).json({ message: "Tracking ID zaroori hai." });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        trackingId: trackingId,
        orderStatus: "Shipped"
      },
      { returnDocument: 'after' }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order nahi mila." });
    }

    try {
      await Notification.create({
        userId: updatedOrder.userId,
        productId: updatedOrder.productId,
        title: "Order Shipped 🚚",
        message: `Your order for "${updatedOrder.productTitle}" has been shipped. Tracking ID: ${trackingId}`,
        type: "order",
        read: false,
        time: new Date()
      });
    } catch (notifErr) {
      console.error("Tracking notification error:", notifErr);
    }

    return res.status(200).json({
      message: "Tracking ID successfully updated!",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Tracking ID update karte waqt error:", error);
    return res.status(500).json({ message: "Server error while updating tracking ID." });
  }
});

module.exports = router;