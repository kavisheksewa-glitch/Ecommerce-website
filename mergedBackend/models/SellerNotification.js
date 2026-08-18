const mongoose = require("mongoose");

const sellerNotificationSchema = new mongoose.Schema(
  {
    sellerId: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, default: "info" }, // success, warning, primary, info
  },
  { timestamps: true }
);

module.exports = mongoose.model("sellersnotification", sellerNotificationSchema);