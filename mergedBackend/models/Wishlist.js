const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  price: { type: String, required: true },
  originalPrice: { type: String },
  discount: { type: String },
  image: { type: String, required: true },
});

module.exports = mongoose.model("Wishlist", wishlistSchema);