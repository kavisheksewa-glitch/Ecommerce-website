// const express = require("express");
// const router = express.Router();
// const Wishlist = require("../models/Wishlist");

// // 1. Get Wishlist Items by User ID
// router.get("/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const wishlistItems = await Wishlist.find({ userId });
//     res.status(200).json(wishlistItems);
//   } catch (err) {
//     console.error("Fetch Wishlist Error:", err.message);
//     res.status(500).json({ error: "Failed to fetch wishlist items" });
//   }
// });

// // 2. Add Item to Wishlist
// router.post("/add", async (req, res) => {
//   try {
//     const { userId, productId, title, description, price, originalPrice, discount, image } = req.body;
    
//     // Check karein ki product pehle se wishlist mein hai ya nahi
//     const existingItem = await Wishlist.findOne({ userId, productId });
//     if (existingItem) {
//       return res.status(400).json({ message: "Product already in wishlist" });
//     }

//     const newItem = new Wishlist({
//       userId,
//       productId,
//       title,
//       description,
//       price,
//       originalPrice,
//       discount,
//       image,
//     });

//     await newItem.save();
//     res.status(201).json({ message: "Added to wishlist successfully", newItem });
//   } catch (err) {
//     console.error("Add Wishlist Error:", err.message);
//     res.status(500).json({ error: "Failed to add to wishlist" });
//   }
// });

// // 3. Remove Item from Wishlist
// router.post("/remove", async (req, res) => {
//   try {
//     const { userId, productId } = req.body;
//     await Wishlist.findOneAndDelete({ userId, productId });
//     res.status(200).json({ message: "Removed from wishlist successfully" });
//   } catch (err) {
//     console.error("Remove Wishlist Error:", err.message);
//     res.status(500).json({ error: "Failed to remove from wishlist" });
//   }
// });

// module.exports = router;









// swagger






const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist");

/**
 * @swagger
 * tags:
 *   name: Customer whislist Products
 *   description: customer whislist product management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     WishlistItem:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "60d0fe4f5311236168a109dd"
 *         userId:
 *           type: string
 *           example: "60d0fe4f5311236168a109ca"
 *         productId:
 *           type: string
 *           example: "60d0fe4f5311236168a109cb"
 *         title:
 *           type: string
 *           example: "Kashmiri Pashmina Shawl"
 *         description:
 *           type: string
 *           example: "Pure wool handmade shawl"
 *         price:
 *           type: number
 *           example: 1500
 *         originalPrice:
 *           type: number
 *           example: 2000
 *         discount:
 *           type: string
 *           example: "25% OFF"
 *         image:
 *           type: string
 *           example: "https://example.com/shawl.jpg"
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/shawls/{userId}:
 *   get:
 *     summary: Get Wishlist Items by User ID
 *     description: Retrieves all wishlist items associated with a specific user ID.
 *     tags: [Customer whislist Products]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique user ID
 *         example: "60d0fe4f5311236168a109ca"
 *     responses:
 *       '200':
 *         description: Wishlist items fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WishlistItem'
 *       '500':
 *         description: Failed to fetch wishlist items
 */
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

/**
 * @swagger
 * /api/shawls/add:
 *   post:
 *     summary: Add Item to Wishlist
 *     description: Adds a product to the user's wishlist if it doesn't already exist.
 *     tags: [Customer whislist Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - productId
 *               - title
 *               - price
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "60d0fe4f5311236168a109ca"
 *               productId:
 *                 type: string
 *                 example: "60d0fe4f5311236168a109cb"
 *               title:
 *                 type: string
 *                 example: "Kashmiri Pashmina Shawl"
 *               description:
 *                 type: string
 *                 example: "Pure wool handmade shawl"
 *               price:
 *                 type: number
 *                 example: 1500
 *               originalPrice:
 *                 type: number
 *                 example: 2000
 *               discount:
 *                 type: string
 *                 example: "25% OFF"
 *               image:
 *                 type: string
 *                 example: "https://example.com/shawl.jpg"
 *     responses:
 *       '201':
 *         description: Added to wishlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Added to wishlist successfully"
 *                 newItem:
 *                   $ref: '#/components/schemas/WishlistItem'
 *       '400':
 *         description: Product already in wishlist
 *       '500':
 *         description: Failed to add to wishlist
 */
// 2. Add Item to Wishlist
router.post("/add", async (req, res) => {
  try {
    const { userId, productId, title, description, price, originalPrice, discount, image } = req.body;
    
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

/**
 * @swagger
 * /api/shawls/remove:
 *   post:
 *     summary: Remove Item from Wishlist
 *     description: Removes a specific product from the user's wishlist using userId and productId.
 *     tags: [Customer whislist Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - productId
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "60d0fe4f5311236168a109ca"
 *               productId:
 *                 type: string
 *                 example: "60d0fe4f5311236168a109cb"
 *     responses:
 *       '200':
 *         description: Removed from wishlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Removed from wishlist successfully"
 *       '500':
 *         description: Failed to remove from wishlist
 */
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