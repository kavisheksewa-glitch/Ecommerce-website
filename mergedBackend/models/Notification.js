const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, default: "order" }, // 'order' ya 'offer'
  read: { type: Boolean, default: false },
  time: { type: String, default: "Just now" }
}, { timestamps: true });

module.exports = mongoose.model("Notification", notificationSchema);