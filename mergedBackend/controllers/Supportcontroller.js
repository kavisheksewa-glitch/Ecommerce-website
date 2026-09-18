const SupportTicket = require("../models/Supportticket");

// @desc  Create a new support ticket
// @route POST /api/customer/support/create
const createTicket = async (req, res) => {
  try {
    const { subject, category, message } = req.body;

    if (!subject || !message) {
      return res
        .status(400)
        .json({ message: "Subject and message are required" });
    }

    const ticket = await SupportTicket.create({
      customer: req.user.id, // change to req.user._id if your middleware sets req.user
      subject,
      category: category || "General",
      message,
    });

    res.status(201).json({
      message: "Support ticket submitted successfully",
      ticket,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create ticket", error: error.message });
  }
};

// @desc  Get all tickets for the logged-in customer
// @route GET /api/customer/support/my-tickets
const getMyTickets = async (req, res) => {
  try {
    const tickets = await SupportTicket.find({
      customer: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({ tickets });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch tickets", error: error.message });
  }
};

// @desc  Get a single ticket (must belong to the logged-in customer)
// @route GET /api/customer/support/:id
const getTicketById = async (req, res) => {
  try {
    const ticket = await SupportTicket.findOne({
      _id: req.params.id,
      customer: req.user.id,
    });

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json({ ticket });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch ticket", error: error.message });
  }
};

// @desc  Customer adds a reply/follow-up message to their own ticket
// @route POST /api/customer/support/:id/reply
const replyToTicket = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Reply message is required" });
    }

    const ticket = await SupportTicket.findOne({
      _id: req.params.id,
      customer: req.user.id,
    });

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.replies.push({ from: "customer", message });

    // Reopen the ticket if the customer follows up after it was closed
    if (ticket.status === "Resolved" || ticket.status === "Closed") {
      ticket.status = "Open";
    }

    await ticket.save();

    res.status(200).json({ message: "Reply added successfully", ticket });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add reply", error: error.message });
  }
};

module.exports = {
  createTicket,
  getMyTickets,
  getTicketById,
  replyToTicket,
};