const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const Notification = require("../models/Notification");

const addToCart = async (req, res) => {
  try {
    const { userId, productId, title, price, description, image, quantity } = req.body;
    
    // 🛒 Cart mein save karein
    await Cart.create({
      userId,
      productId,
      title,
      price,
      description,
      image,
      quantity: quantity || 1
    });

    // 🔔 Notification Create Karein (ObjectId conversion added)
    await Notification.create({
      userId: new mongoose.Types.ObjectId(userId), // Yahan fix kiya hai
      title: "Added to Cart 🛒",
      message: `"${title || 'A product'}" has been added to your shopping cart.`,
      type: "order"
    });

    res.status(200).json({ message: "Added to cart successfully" });
  } catch (error) {
    console.error("Notification/Cart Error:", error.message); // Console par error dekhne ke liye
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { addToCart };