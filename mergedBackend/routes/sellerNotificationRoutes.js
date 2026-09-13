


const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getSellerNotifications,
  markSellerNotificationAsRead,
} = require("../controllers/sellerNotificationController");

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
router.get("/", protect, getSellerNotifications);

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
router.put("/:id/read", protect, markSellerNotificationAsRead);

module.exports = router;