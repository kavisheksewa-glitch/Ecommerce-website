


const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const Notification = require("../models/Notification");

const addToCart = async (req, res) => {
  try {
    const {
      userId,
      productId,
      title,
      price,
      description,
      image,
      images,     // ✅ NEW: saari product images
      quantity,
      sellerId,   // ✅ NEW: Cart schema me required hai
    } = req.body;

    // ✅ NEW: images array safe banao (na aaye to main image se fallback)
    const cartImages =
      Array.isArray(images) && images.length > 0 ? images : image ? [image] : [];

    // 🛒 Cart mein save karein
    await Cart.create({
      userId,
      productId,
      title,
      price,
      description,
      image: image || cartImages[0] || "",
      images: cartImages,
      quantity: quantity || 1,
      sellerId,
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