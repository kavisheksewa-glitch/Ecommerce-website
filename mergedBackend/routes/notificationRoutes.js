// const express = require("express");
// const router = express.Router();
// const Notification = require("../models/Notification");

// // 1. Get all notifications for a specific user
// router.get("/:userId", async (req, res) => {
//   try {
//     const notifications = await Notification.find({ userId: req.params.userId }).sort({ createdAt: -1 });
//     res.json(notifications);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// });

// // 2. Mark notification as read (I Read)
// router.put("/read/:id", async (req, res) => {
//   try {
//     const updated = await Notification.findByIdAndUpdate(
//       req.params.id, 
//       { read: true }, 
//       { new: true }
//     );
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// });

// // 3. Delete single notification
// router.delete("/:id", async (req, res) => {
//   try {
//     await Notification.findByIdAndDelete(req.params.id);
//     res.json({ message: "Notification deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// });

// // 4. Clear all notifications for user
// router.delete("/clear/:userId", async (req, res) => {
//   try {
//     await Notification.deleteMany({ userId: req.params.userId });
//     res.json({ message: "All notifications cleared" });
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// });

// module.exports = router;









// swagger








// const express = require("express");
// const router = express.Router();
// const Notification = require("../models/Notification");

// /**
//  * @swagger
//  * tags:
//  *   name: customer side notification
//  *   description: customer notification management APIs
//  */

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Notification:
//  *       type: object
//  *       properties:
//  *         _id:
//  *           type: string
//  *           example: "60d0fe4f5311236168a109aa"
//  *         userId:
//  *           type: string
//  *           example: "60d0fe4f5311236168a109ca"
//  *         title:
//  *           type: string
//  *           example: "Welcome to Kavi Shawls! 🎉"
//  *         message:
//  *           type: string
//  *           example: "Thank you for registering with us."
//  *         type:
//  *           type: string
//  *           example: "offer"
//  *         read:
//  *           type: boolean
//  *           example: false
//  *         createdAt:
//  *           type: string
//  *           format: date-time
//  */

// /**
//  * @swagger
//  * /api/shawls/notifications/{userId}:
//  *   get:
//  *     summary: Get all notifications for a specific user
//  *     description: Retrieves a list of all notifications for a given user ID, sorted by latest first.
//  *     tags: [customer side notification]
//  *     parameters:
//  *       - in: path
//  *         name: userId
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The ID of the user
//  *         example: "60d0fe4f5311236168a109ca"
//  *     responses:
//  *       '200':
//  *         description: List of notifications successfully fetched
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Notification'
//  *       '500':
//  *         description: Server Error
//  */
// // 1. Get all notifications for a specific user
// router.get("/:userId", async (req, res) => {
//   try {
//     const notifications = await Notification.find({ userId: req.params.userId }).sort({ createdAt: -1 });
//     res.json(notifications);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// });

// /**
//  * @swagger
//  * /api/shawls/notifications/read/{id}:
//  *   put:
//  *     summary: Mark notification as read
//  *     description: Updates the status of a specific notification to read: true
//  *     tags: [customer side notification]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The ID of the notification to update
//  *         example: "60d0fe4f5311236168a109aa"
//  *     responses:
//  *       '200':
//  *         description: Notification successfully marked as read
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Notification'
//  *       '500':
//  *         description: Server Error
//  */
// // 2. Mark notification as read (I Read)
// router.put("/read/:id", async (req, res) => {
//   try {
//     const updated = await Notification.findByIdAndUpdate(
//       req.params.id, 
//       { read: true }, 
//       { new: true }
//     );
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// });

// /**
//  * @swagger
//  * /api/shawls/notifications/{id}:
//  *   delete:
//  *     summary: Delete a single notification
//  *     description: Removes a specific notification from the database by its ID.
//  *     tags: [customer side notification]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The ID of the notification to delete
//  *         example: "60d0fe4f5311236168a109aa"
//  *     responses:
//  *       '200':
//  *         description: Notification deleted successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Notification deleted successfully"
//  *       '500':
//  *         description: Server Error
//  */
// // 3. Delete single notification
// router.delete("/:id", async (req, res) => {
//   try {
//     await Notification.findByIdAndDelete(req.params.id);
//     res.json({ message: "Notification deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// });

// /**
//  * @swagger
//  * /api/shawls/notifications/clear/{userId}:
//  *   delete:
//  *     summary: Clear all notifications for user
//  *     description: Deletes all notifications associated with a specific user ID.
//  *     tags: [customer side notification]
//  *     parameters:
//  *       - in: path
//  *         name: userId
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The ID of the user whose notifications will be cleared
//  *         example: "60d0fe4f5311236168a109ca"
//  *     responses:
//  *       '200':
//  *         description: All notifications cleared successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "All notifications cleared"
//  *       '500':
//  *         description: Server Error
//  */
// // 4. Clear all notifications for user
// router.delete("/clear/:userId", async (req, res) => {
//   try {
//     await Notification.deleteMany({ userId: req.params.userId });
//     res.json({ message: "All notifications cleared" });
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// });

// module.exports = router;


//new shai



// const express = require("express");
// const router = express.Router();
// const Notification = require("../models/Notification");

// /**
//  * @swagger
//  * tags:
//  *   name: customer side notification
//  *   description: customer notification management APIs
//  */

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Notification:
//  *       type: object
//  *       properties:
//  *         _id:
//  *           type: string
//  *           example: "60d0fe4f5311236168a109aa"
//  *         userId:
//  *           type: string
//  *           example: "60d0fe4f5311236168a109ca"
//  *         title:
//  *           type: string
//  *           example: "Welcome to Kavi Shawls! 🎉"
//  *         message:
//  *           type: string
//  *           example: "Thank you for registering with us."
//  *         type:
//  *           type: string
//  *           example: "offer"
//  *         read:
//  *           type: boolean
//  *           example: false
//  *         createdAt:
//  *           type: string
//  *           format: date-time
//  */

// /**
//  * @swagger
//  * /api/shawls/notifications/{userId}:
//  *   get:
//  *     summary: Get all notifications for a specific user
//  *     description: Retrieves a list of all notifications for a given user ID, sorted by latest first.
//  *     tags: [customer side notification]
//  *     parameters:
//  *       - in: path
//  *         name: userId
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The ID of the user
//  *         example: "60d0fe4f5311236168a109ca"
//  *     responses:
//  *       '200':
//  *         description: List of notifications successfully fetched
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Notification'
//  *       '500':
//  *         description: Server Error
//  */
// router.get("/:userId", async (req, res) => {
//   try {
//     const notifications = await Notification.find({ userId: req.params.userId }).sort({ createdAt: -1 });
//     res.json(notifications);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// });

// /**
//  * @swagger
//  * /api/shawls/notifications/read/{id}:
//  *   put:
//  *     summary: Mark notification as read
//  *     description: Updates the status of a specific notification to read true
//  *     tags: [customer side notification]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The ID of the notification to update
//  *         example: "60d0fe4f5311236168a109aa"
//  *     responses:
//  *       '200':
//  *         description: Notification successfully marked as read
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Notification'
//  *       '500':
//  *         description: Server Error
//  */
// router.put("/read/:id", async (req, res) => {
//   try {
//     const updated = await Notification.findByIdAndUpdate(
//       req.params.id, 
//       { read: true }, 
//       { new: true }
//     );
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// });

// /**
//  * @swagger
//  * /api/shawls/notifications/{id}:
//  *   delete:
//  *     summary: Delete a single notification
//  *     description: Removes a specific notification from the database by its ID.
//  *     tags: [customer side notification]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The ID of the notification to delete
//  *         example: "60d0fe4f5311236168a109aa"
//  *     responses:
//  *       '200':
//  *         description: Notification deleted successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Notification deleted successfully"
//  *       '500':
//  *         description: Server Error
//  */
// router.delete("/:id", async (req, res) => {
//   try {
//     await Notification.findByIdAndDelete(req.params.id);
//     res.json({ message: "Notification deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// });

// /**
//  * @swagger
//  * /api/shawls/notifications/clear/{userId}:
//  *   delete:
//  *     summary: Clear all notifications for user
//  *     description: Deletes all notifications associated with a specific user ID.
//  *     tags: [customer side notification]
//  *     parameters:
//  *       - in: path
//  *         name: userId
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The ID of the user whose notifications will be cleared
//  *         example: "60d0fe4f5311236168a109ca"
//  *     responses:
//  *       '200':
//  *         description: All notifications cleared successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *               message:
//  *                 type: string
//  *                 example: "All notifications cleared"
//  *       '500':
//  *         description: Server Error
//  */
// router.delete("/clear/:userId", async (req, res) => {
//   try {
//     await Notification.deleteMany({ userId: req.params.userId });
//     res.json({ message: "All notifications cleared" });
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// });

// module.exports = router;



 





