const Wishlist = require("../models/Wishlist");
const Notification = require("../models/Notification");

const addToWishlist = async (req, res) => {
  try {
    const { userId, productId, title, price, description, image } = req.body;
    
    // ❤️ Wishlist mein save karne ka logic
    await Wishlist.create({
      userId,
      productId,
      title,
      price,
      description,
      image
    });

    // 🔔 Notification Create Karein
    await Notification.create({
      userId,
      title: "Added to Wishlist ❤️",
      message: `You added "${title || 'a product'}" to your wishlist.`,
      type: "offer"
    });

    res.status(200).json({ message: "Added to wishlist successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { addToWishlist };