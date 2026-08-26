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









// const express = require("express");
// const router = express.Router();
// const SellerNotification = require("../models/SellerNotification");

// /**
//  * @swagger
//  * tags:
//  *   name: Sellers notifiation 
//  *   description: Seller notification management APIs
//  */

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     SellerNotification:
//  *       type: object
//  *       properties:
//  *         _id:
//  *           type: string
//  *           example: "60d0fe4f5311236168a109ee"
//  *         sellerId:
//  *           type: string
//  *           example: "60d0fe4f5311236168a109cc"
//  *         title:
//  *           type: string
//  *           example: "📦 New Order Received!"
//  *         message:
//  *           type: string
//  *           example: "Customer has placed an order for Kashmiri Shawl."
//  *         type:
//  *           type: string
//  *           example: "success"
//  *         createdAt:
//  *           type: string
//  *           format: date-time
//  */

// /**
//  * @swagger
//  * /api/seller/notifications/{sellerId}:
//  *   get:
//  *     summary: Get notifications for a specific seller
//  *     description: Retrieves all notifications associated with a given seller ID, sorted by latest first.
//  *     tags: [Sellers notifiation]
//  *     parameters:
//  *       - in: path
//  *         name: sellerId
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The unique seller ID
//  *         example: "60d0fe4f5311236168a109cc"
//  *     responses:
//  *       '200':
//  *         description: Notifications fetched successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/SellerNotification'
//  *       '500':
//  *         description: Failed to fetch notifications
//  */
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

// /**
//  * @swagger
//  * /api/seller/notifications/add:
//  *   post:
//  *     summary: Add notification for a seller
//  *     description: Creates and saves a new notification message for a seller.
//  *     tags: [Sellers notifiation]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - sellerId
//  *               - title
//  *               - message
//  *             properties:
//  *               sellerId:
//  *                 type: string
//  *                 example: "60d0fe4f5311236168a109cc"
//  *               title:
//  *                 type: string
//  *                 example: "📦 New Order Received!"
//  *               message:
//  *                 type: string
//  *                 example: "Customer has placed an order for Kashmiri Shawl."
//  *               type:
//  *                 type: string
//  *                 example: "success"
//  *     responses:
//  *       '201':
//  *         description: Seller notification saved successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Seller notification saved!"
//  *                 savedNotification:
//  *                   $ref: '#/components/schemas/SellerNotification'
//  *       '400':
//  *         description: Required fields are missing
//  *       '500':
//  *         description: Failed to save notification
//  */
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




// new



// const express = require("express");
// const router = express.Router();
// const SellerNotification = require("../models/SellerNotification");
// const { protect } = require("../middleware/authMiddleware"); // ✅ Exact folder name matched

// /**
//  * @swagger
//  * tags:
//  *   name: Sellers notification 
//  *   description: Seller notification management APIs
//  */

// /**
//  * @swagger
//  * /api/seller/notifications:
//  *   get:
//  *     summary: Get notifications for the currently logged-in seller
//  *     description: Retrieves all notifications associated with the authenticated seller using JWT token.
//  *     tags: [Sellers notification]
//  *     responses:
//  *       '200':
//  *         description: Notifications fetched successfully
//  *       '401':
//  *         description: Unauthorized seller
//  *       '500':
//  *         description: Failed to fetch notifications
//  */
// router.get("/", protect, async (req, res) => {
//   try {
//     // Middleware ne req.seller me data dala hai, wahan se sellerId nikalenge
//     const sellerId = req.seller?.id || req.seller?._id || req.seller?.sellerId;

//     if (!sellerId) {
//       return res.status(401).json({ error: "Unauthorized seller ID from token" });
//     }

//     const notifications = await SellerNotification.find({ sellerId }).sort({ createdAt: -1 });
//     res.status(200).json(notifications);
//   } catch (err) {
//     console.error("Error fetching seller notifications:", err);
//     res.status(500).json({ error: "Failed to fetch notifications" });
//   }
// });

// /**
//  * @swagger
//  * /api/seller/notifications/add:
//  *   post:
//  *     summary: Add notification for a seller
//  *     description: Creates and saves a new notification message for a seller.
//  *     tags: [Sellers notification]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - sellerId
//  *               - title
//  *               - message
//  *             properties:
//  *               sellerId:
//  *                 type: string
//  *               title:
//  *                 type: string
//  *               message:
//  *                 type: string
//  *               type:
//  *                 type: string
//  *     responses:
//  *       '201':
//  *         description: Seller notification saved successfully
//  *       '400':
//  *         description: Required fields are missing
//  *       '500':
//  *         description: Failed to save notification
//  */
// router.post("/add", async (req, res) => {
//   try {
//     const { sellerId, title, message, type } = req.body;

//     if (!sellerId || !title || !message) {
//       return res.status(400).json({ error: "sellerId, title, and message are required" });
//     }

//     const newNotification = new SellerNotification({
//       sellerId,
//       title,
//       message,
//       type: type || "info",
//     });

//     const savedNotification = await newNotification.save();
//     res.status(201).json({ message: "Seller notification saved!", savedNotification });
//   } catch (err) {
//     console.error("Error saving seller notification:", err);
//     res.status(500).json({ error: "Failed to save notification" });
//   }
// });

// module.exports = router;




// sahi


// const express = require("express");
// const router = express.Router();
// const SellerNotification = require("../models/SellerNotification");
// const { protect } = require("../middleware/authMiddleware"); // ✅ Exact folder name matched

// /**
//  * @swagger
//  * tags:
//  *   name: Sellers notification 
//  *   description: Seller notification management APIs
//  */

// /**
//  * @swagger
//  * /api/seller/notifications:
//  *   get:
//  *     summary: Get notifications for the currently logged-in seller
//  *     description: Retrieves all notifications associated with the authenticated seller using JWT token.
//  *     tags: [Sellers notification]
//  *     responses:
//  *       '200':
//  *         description: Notifications fetched successfully
//  *       '401':
//  *         description: Unauthorized seller
//  *       '500':
//  *         description: Failed to fetch notifications
//  */
// router.get("/", protect, async (req, res) => {
//   try {
//     // Middleware ne req.seller me data dala hai, wahan se sellerId nikalenge
//     const sellerId = req.seller?.id || req.seller?._id || req.seller?.sellerId;

//     if (!sellerId) {
//       return res.status(401).json({ error: "Unauthorized seller ID from token" });
//     }

//     // Sirf woh notifications fetch karein jo read nahi hui hain (is_read: false)
//     const notifications = await SellerNotification.find({ 
//       sellerId, 
//       is_read: { $ne: true } 
//     }).sort({ createdAt: -1 });
    
//     res.status(200).json(notifications);
//   } catch (err) {
//     console.error("Error fetching seller notifications:", err);
//     res.status(500).json({ error: "Failed to fetch notifications" });
//   }
// });

// /**
//  * @swagger
//  * /api/seller/notifications/{id}/read:
//  *   put:
//  *     summary: Mark a seller notification as read
//  *     description: Updates the notification status so it can be removed from active view.
//  *     tags: [Sellers notification]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Notification ID
//  *     responses:
//  *       '200':
//  *         description: Notification marked as read successfully
//  *       '401':
//  *         description: Unauthorized seller
//  *       '404':
//  *         description: Notification not found
//  *       '500':
//  *         description: Failed to update notification
//  */
// router.put("/:id/read", protect, async (req, res) => {
//   try {
//     const sellerId = req.seller?.id || req.seller?._id || req.seller?.sellerId;

//     if (!sellerId) {
//       return res.status(401).json({ error: "Unauthorized seller ID from token" });
//     }

//     const notificationId = req.params.id;

//     // Notification ko find karke is_read ko true update karein
//     const updatedNotification = await SellerNotification.findOneAndUpdate(
//       { _id: notificationId, sellerId: sellerId },
//       { is_read: true },
//       { new: true }
//     );

//     if (!updatedNotification) {
//       return res.status(404).json({ error: "Notification not found or unauthorized" });
//     }

//     res.status(200).json({ message: "Notification marked as read", updatedNotification });
//   } catch (err) {
//     console.error("Error updating notification status:", err);
//     res.status(500).json({ error: "Failed to update notification" });
//   }
// });

// // /**
// //  * @swagger
// //  * /api/seller/notifications/add:
// //  *   post:
// //  *     summary: Add notification for a seller
// //  *     description: Creates and saves a new notification message for a seller.
// //  *     tags: [Sellers notification]
// //  *     requestBody:
// //  *       required: true
// //  *       content:
// //  *         application/json:
// //  *           schema:
// //  *             type: object
// //  *             required:
// //  *               - sellerId
// //  *               - title
// //  *               - message
// //  *             properties:
// //  *               sellerId:
// //  *                 type: string
// //  *               title:
// //  *                 type: string
// //  *               message:
// //  *                 type: string
// //  *               type:
// //  *                 type: string
// //  *     responses:
// //  *       '201':
// //  *         description: Seller notification saved successfully
// //  *       '400':
// //  *         description: Required fields are missing
// //  *       '500':
// //  *         description: Failed to save notification
// //  */
// // router.post("/add", async (req, res) => {
// //   try {
// //     const { sellerId, title, message, type } = req.body;

// //     if (!sellerId || !title || !message) {
// //       return res.status(400).json({ error: "sellerId, title, and message are required" });
// //     }

// //     const newNotification = new SellerNotification({
// //       sellerId,
// //       title,
// //       message,
// //       type: type || "info",
// //       is_read: false, // Default unread rahegi
// //     });

// //     const savedNotification = await newNotification.save();
// //     res.status(201).json({ message: "Seller notification saved!", savedNotification });
// //   } catch (err) {
// //     console.error("Error saving seller notification:", err);
// //     res.status(500).json({ error: "Failed to save notification" });
// //   }
// // });

// module.exports = router;



//claude office night



// const express = require("express");
// const router = express.Router();
// const SellerNotification = require("../models/SellerNotification");
// const { protect } = require("../middleware/authMiddleware"); // ✅ Exact folder name matched

// /**
//  * @swagger
//  * tags:
//  *   name: Sellers notification 
//  *   description: Seller notification management APIs
//  */

// /**
//  * @swagger
//  * components:
//  *   securitySchemes:
//  *     BearerAuth:
//  *       type: http
//  *       scheme: bearer
//  *       bearerFormat: JWT
//  */

// /**
//  * @swagger
//  * /api/seller/notifications:
//  *   get:
//  *     summary: Get notifications for the currently logged-in seller
//  *     description: Retrieves all notifications associated with the authenticated seller using JWT token.
//  *     tags: [Sellers notification]
//  *     security:
//  *       - BearerAuth: []
//  *     responses:
//  *       '200':
//  *         description: Notifications fetched successfully
//  *       '401':
//  *         description: Unauthorized seller
//  *       '500':
//  *         description: Failed to fetch notifications
//  */
// router.get("/", protect, async (req, res) => {
//   try {
//     const sellerId = req.seller?.id || req.seller?._id || req.seller?.sellerId;

//     if (!sellerId) {
//       return res.status(401).json({ error: "Unauthorized seller ID from token" });
//     }

//     const notifications = await SellerNotification.find({ 
//       sellerId, 
//       is_read: { $ne: true } 
//     }).sort({ createdAt: -1 });
    
//     res.status(200).json(notifications);
//   } catch (err) {
//     console.error("Error fetching seller notifications:", err);
//     res.status(500).json({ error: "Failed to fetch notifications" });
//   }
// });

// /**
//  * @swagger
//  * /api/seller/notifications/{id}/read:
//  *   put:
//  *     summary: Mark a seller notification as read
//  *     description: Updates the notification status so it can be removed from active view.
//  *     tags: [Sellers notification]
//  *     security:
//  *       - BearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Notification ID
//  *     responses:
//  *       '200':
//  *         description: Notification marked as read successfully
//  *       '401':
//  *         description: Unauthorized seller
//  *       '404':
//  *         description: Notification not found
//  *       '500':
//  *         description: Failed to update notification
//  */
// router.put("/:id/read", protect, async (req, res) => {
//   try {
//     const sellerId = req.seller?.id || req.seller?._id || req.seller?.sellerId;

//     if (!sellerId) {
//       return res.status(401).json({ error: "Unauthorized seller ID from token" });
//     }

//     const notificationId = req.params.id;

//     const updatedNotification = await SellerNotification.findOneAndUpdate(
//       { _id: notificationId, sellerId: sellerId },
//       { is_read: true },
//       { new: true }
//     );

//     if (!updatedNotification) {
//       return res.status(404).json({ error: "Notification not found or unauthorized" });
//     }

//     res.status(200).json({ message: "Notification marked as read", updatedNotification });
//   } catch (err) {
//     console.error("Error updating notification status:", err);
//     res.status(500).json({ error: "Failed to update notification" });
//   }
// });

// // /**
// //  * @swagger
// //  * /api/seller/notifications/add:
// //  *   post:
// //  *     summary: Add notification for a seller
// //  *     description: Creates and saves a new notification message for a seller.
// //  *     tags: [Sellers notification]
// //  *     requestBody:
// //  *       required: true
// //  *       content:
// //  *         application/json:
// //  *           schema:
// //  *             type: object
// //  *             required:
// //  *               - sellerId
// //  *               - title
// //  *               - message
// //  *             properties:
// //  *               sellerId:
// //  *                 type: string
// //  *               title:
// //  *                 type: string
// //  *               message:
// //  *                 type: string
// //  *               type:
// //  *                 type: string
// //  *     responses:
// //  *       '201':
// //  *         description: Seller notification saved successfully
// //  *       '400':
// //  *         description: Required fields are missing
// //  *       '500':
// //  *         description: Failed to save notification
// //  */
// // router.post("/add", async (req, res) => {
// //   try {
// //     const { sellerId, title, message, type } = req.body;

// //     if (!sellerId || !title || !message) {
// //       return res.status(400).json({ error: "sellerId, title, and message are required" });
// //     }

// //     const newNotification = new SellerNotification({
// //       sellerId,
// //       title,
// //       message,
// //       type: type || "info",
// //       is_read: false,
// //     });

// //     const savedNotification = await newNotification.save();
// //     res.status(201).json({ message: "Seller notification saved!", savedNotification });
// //   } catch (err) {
// //     console.error("Error saving seller notification:", err);
// //     res.status(500).json({ error: "Failed to save notification" });
// //   }
// // });

// module.exports = router;




//kavish  Claude



const express = require("express");
const router = express.Router();
const SellerNotification = require("../models/SellerNotification");
const { protect } = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Sellers notification
 *   description: Seller notification management APIs
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     SellerBearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Enter your Seller JWT token (Bearer <token>)
 */

/**
 * @swagger
 * /api/seller/notifications:
 *   get:
 *     summary: Get notifications for the currently logged-in seller
 *     description: Retrieves all notifications associated with the authenticated seller using JWT token.
 *     tags: [Sellers notification]
 *     security:
 *       - SellerBearerAuth: []
 *     responses:
 *       '200':
 *         description: Notifications fetched successfully
 *       '401':
 *         description: Unauthorized seller
 *       '500':
 *         description: Failed to fetch notifications
 */
router.get("/", protect, async (req, res) => {
  try {
    const sellerId = req.seller?.id || req.seller?._id || req.seller?.sellerId;

    if (!sellerId) {
      return res.status(401).json({ error: "Unauthorized seller ID from token" });
    }

    const notifications = await SellerNotification.find({
      sellerId,
      is_read: { $ne: true }
    }).sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (err) {
    console.error("Error fetching seller notifications:", err);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

/**
 * @swagger
 * /api/seller/notifications/{id}/read:
 *   put:
 *     summary: Mark a seller notification as read
 *     description: Updates the notification status so it can be removed from active view.
 *     tags: [Sellers notification]
 *     security:
 *       - SellerBearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID
 *     responses:
 *       '200':
 *         description: Notification marked as read successfully
 *       '401':
 *         description: Unauthorized seller
 *       '404':
 *         description: Notification not found
 *       '500':
 *         description: Failed to update notification
 */
router.put("/:id/read", protect, async (req, res) => {
  try {
    const sellerId = req.seller?.id || req.seller?._id || req.seller?.sellerId;

    if (!sellerId) {
      return res.status(401).json({ error: "Unauthorized seller ID from token" });
    }

    const notificationId = req.params.id;

    const updatedNotification = await SellerNotification.findOneAndUpdate(
      { _id: notificationId, sellerId: sellerId },
      { is_read: true },
      { new: true }
    );

    if (!updatedNotification) {
      return res.status(404).json({ error: "Notification not found or unauthorized" });
    }

    res.status(200).json({ message: "Notification marked as read", updatedNotification });
  } catch (err) {
    console.error("Error updating notification status:", err);
    res.status(500).json({ error: "Failed to update notification" });
  }
});

module.exports = router;