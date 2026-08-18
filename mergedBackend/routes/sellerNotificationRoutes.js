// const express = require("express");
// const router = express.Router();
// const SellerNotification = require("../models/SellerNotification");

// // Get notifications for a specific seller
// router.get("/:sellerId", async (routerReq, routerRes) => {
//   try {
//     const { sellerId } = routerReq.params;
//     const notifications = await SellerNotification.find({ sellerId }).sort({ createdAt: -1 });
//     routerRes.status(200).json(notifications);
//   } catch (err) {
//     console.error("Error fetching seller notifications:", err);
//     routerRes.status(500).json({ error: "Failed to fetch notifications" });
//   }
// });

// // Add notification for a seller
// router.post("/add", async (routerReq, routerRes) => {
//   try {
//     const { sellerId, title, message, type } = routerReq.body;

//     if (!sellerId || !title || !message) {
//       return routerRes.status(400).json({ error: "sellerId, title, and message are required" });
//     }

//     const newNotification = new SellerNotification({
//       sellerId,
//       title,
//       message,
//       type: type || "info",
//     });

//     const savedNotification = await newNotification.save();
//     routerRes.status(201).json({ message: "Seller notification saved!", savedNotification });
//   } catch (err) {
//     console.error("Error saving seller notification:", err);
//     routerRes.status(500).json({ error: "Failed to save notification" });
//   }
// });

// module.exports = router;











// swagger









const express = require("express");
const router = express.Router();
const SellerNotification = require("../models/SellerNotification");

/**
 * @swagger
 * tags:
 *   name: Sellers notifiation 
 *   description: Seller notification management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SellerNotification:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "60d0fe4f5311236168a109ee"
 *         sellerId:
 *           type: string
 *           example: "60d0fe4f5311236168a109cc"
 *         title:
 *           type: string
 *           example: "📦 New Order Received!"
 *         message:
 *           type: string
 *           example: "Customer has placed an order for Kashmiri Shawl."
 *         type:
 *           type: string
 *           example: "success"
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/seller/notifications/{sellerId}:
 *   get:
 *     summary: Get notifications for a specific seller
 *     description: Retrieves all notifications associated with a given seller ID, sorted by latest first.
 *     tags: [Sellers notifiation]
 *     parameters:
 *       - in: path
 *         name: sellerId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique seller ID
 *         example: "60d0fe4f5311236168a109cc"
 *     responses:
 *       '200':
 *         description: Notifications fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SellerNotification'
 *       '500':
 *         description: Failed to fetch notifications
 */
// Get notifications for a specific seller
router.get("/:sellerId", async (routerReq, routerRes) => {
  try {
    const { sellerId } = routerReq.params;
    const notifications = await SellerNotification.find({ sellerId }).sort({ createdAt: -1 });
    routerRes.status(200).json(notifications);
  } catch (err) {
    console.error("Error fetching seller notifications:", err);
    routerRes.status(500).json({ error: "Failed to fetch notifications" });
  }
});

/**
 * @swagger
 * /api/seller/notifications/add:
 *   post:
 *     summary: Add notification for a seller
 *     description: Creates and saves a new notification message for a seller.
 *     tags: [Sellers notifiation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sellerId
 *               - title
 *               - message
 *             properties:
 *               sellerId:
 *                 type: string
 *                 example: "60d0fe4f5311236168a109cc"
 *               title:
 *                 type: string
 *                 example: "📦 New Order Received!"
 *               message:
 *                 type: string
 *                 example: "Customer has placed an order for Kashmiri Shawl."
 *               type:
 *                 type: string
 *                 example: "success"
 *     responses:
 *       '201':
 *         description: Seller notification saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Seller notification saved!"
 *                 savedNotification:
 *                   $ref: '#/components/schemas/SellerNotification'
 *       '400':
 *         description: Required fields are missing
 *       '500':
 *         description: Failed to save notification
 */
// Add notification for a seller
router.post("/add", async (routerReq, routerRes) => {
  try {
    const { sellerId, title, message, type } = routerReq.body;

    if (!sellerId || !title || !message) {
      return routerRes.status(400).json({ error: "sellerId, title, and message are required" });
    }

    const newNotification = new SellerNotification({
      sellerId,
      title,
      message,
      type: type || "info",
    });

    const savedNotification = await newNotification.save();
    routerRes.status(201).json({ message: "Seller notification saved!", savedNotification });
  } catch (err) {
    console.error("Error saving seller notification:", err);
    routerRes.status(500).json({ error: "Failed to save notification" });
  }
});

module.exports = router;