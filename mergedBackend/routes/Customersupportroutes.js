const express = require("express");
const router = express.Router();
const { protectCustomer } = require("../middleware/customerMiddleware");
const {
  createTicket,
  getMyTickets,
  getTicketById,
  replyToTicket,
} = require("../controllers/Supportcontroller.js");
/**
 * @swagger
 * tags:
 *   name: Customer Support
 *   description: Customer support ticket APIs
 */

/**
 * @swagger
 * /api/customer/support/create:
 *   post:
 *     summary: Submit a new support ticket
 *     tags: [Customer Support]
 *     security:
 *       - CustomerBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [subject, message]
 *             properties:
 *               subject: { type: string }
 *               category: { type: string, enum: [General, Order Issues, Payments, Returns] }
 *               message: { type: string }
 *     responses:
 *       201:
 *         description: Support ticket submitted successfully
 *       400:
 *         description: Subject and message are required
 */
router.post("/create", protectCustomer, createTicket);

/**
 * @swagger
 * /api/customer/support/my-tickets:
 *   get:
 *     summary: Get all tickets for the logged-in customer
 *     tags: [Customer Support]
 *     security:
 *       - CustomerBearerAuth: []
 *     responses:
 *       200:
 *         description: Tickets fetched successfully
 */
router.get("/my-tickets", protectCustomer, getMyTickets);

/**
 * @swagger
 * /api/customer/support/{id}:
 *   get:
 *     summary: Get a single ticket by ID
 *     tags: [Customer Support]
 *     security:
 *       - CustomerBearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Ticket fetched successfully
 *       404:
 *         description: Ticket not found
 */
router.get("/:id", protectCustomer, getTicketById);

/**
 * @swagger
 * /api/customer/support/{id}/reply:
 *   post:
 *     summary: Add a reply/follow-up message to an existing ticket
 *     tags: [Customer Support]
 *     security:
 *       - CustomerBearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [message]
 *             properties:
 *               message: { type: string }
 *     responses:
 *       200:
 *         description: Reply added successfully
 *       404:
 *         description: Ticket not found
 */
router.post("/:id/reply", protectCustomer, replyToTicket);

module.exports = router;