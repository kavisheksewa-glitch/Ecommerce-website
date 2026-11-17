


const mongoose = require("mongoose");

const sellerNotificationSchema = new mongoose.Schema(
  {
    sellerId: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, default: "info" }, 
    is_read: { type: Boolean, default: false }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("sellersnotification", sellerNotificationSchema);