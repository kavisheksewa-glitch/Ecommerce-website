


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
      images,    
      quantity,
      sellerId,   
    } = req.body;

    
    const cartImages =
      Array.isArray(images) && images.length > 0 ? images : image ? [image] : [];

    
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

    
    await Notification.create({
      userId: new mongoose.Types.ObjectId(userId), 
      title: "Added to Cart 🛒",
      message: `"${title || 'A product'}" has been added to your shopping cart.`,
      type: "order"
    });

    res.status(200).json({ message: "Added to cart successfully" });
  } catch (error) {
    console.error("Notification/Cart Error:", error.message); 
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { addToCart };