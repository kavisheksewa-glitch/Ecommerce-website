const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist");

// 1. Get Wishlist Items by User ID
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const wishlistItems = await Wishlist.find({ userId });
    res.status(200).json(wishlistItems);
  } catch (err) {
    console.error("Fetch Wishlist Error:", err.message);
    res.status(500).json({ error: "Failed to fetch wishlist items" });
  }
});

// 2. Add Item to Wishlist
router.post("/add", async (req, res) => {
  try {
    const { userId, productId, title, description, price, originalPrice, discount, image } = req.body;
    
    // Check karein ki product pehle se wishlist mein hai ya nahi
    const existingItem = await Wishlist.findOne({ userId, productId });
    if (existingItem) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    const newItem = new Wishlist({
      userId,
      productId,
      title,
      description,
      price,
      originalPrice,
      discount,
      image,
    });

    await newItem.save();
    res.status(201).json({ message: "Added to wishlist successfully", newItem });
  } catch (err) {
    console.error("Add Wishlist Error:", err.message);
    res.status(500).json({ error: "Failed to add to wishlist" });
  }
});

// 3. Remove Item from Wishlist
router.post("/remove", async (req, res) => {
  try {
    const { userId, productId } = req.body;
    await Wishlist.findOneAndDelete({ userId, productId });
    res.status(200).json({ message: "Removed from wishlist successfully" });
  } catch (err) {
    console.error("Remove Wishlist Error:", err.message);
    res.status(500).json({ error: "Failed to remove from wishlist" });
  }
});

module.exports = router;