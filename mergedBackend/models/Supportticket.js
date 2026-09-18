const mongoose = require("mongoose");

const supportTicketSchema = new mongoose.Schema(
  {
    ticketId: {
      type: String,
      unique: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["General", "Order Issues", "Payments", "Returns"],
      default: "General",
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Resolved", "Closed"],
      default: "Open",
    },
    replies: [
      {
        from: {
          type: String,
          enum: ["customer", "admin"],
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

// Auto-generate a human-readable ticket ID before first save
supportTicketSchema.pre("save", function () {
  if (!this.ticketId) {
    const random = Math.floor(100000 + Math.random() * 900000);
    this.ticketId = `TCK-${random}`;
  }
});

module.exports = mongoose.model("SupportTicket", supportTicketSchema);