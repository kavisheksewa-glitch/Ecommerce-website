// const express = require("express");
// const router = express.Router();

// const Cart = require("../models/Cart");

// // Add to Cart -> POST /api/shawls/cart/add
// router.post('/add', async (req, res) => {
//   try {
//     const { userId, productId, title, description, price, image } = req.body;

//     let existingItem = await Cart.findOne({ userId, productId });

//     if (existingItem) {
//       existingItem.quantity += 1;
//       await existingItem.save();
//       return res.status(200).json({ message: "Cart updated", item: existingItem });
//     }

//     const newItem = new Cart({
//       userId,
//       productId,
//       title,
//       description,
//       price,
//       image,
//     });

//     const saved = await newItem.save();
//     res.status(201).json(saved);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Get Cart Items -> GET /api/shawls/cart/:userId
// router.get('/:userId', async (req, res) => {
//   try {
//     const cartItems = await Cart.find({ userId: req.params.userId });
//     res.status(200).json(cartItems);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Remove Item from Cart -> DELETE /api/shawls/cart/remove/:id
// router.delete('/remove/:id', async (req, res) => {
//   try {
//     await Cart.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Item removed" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;












// new









// const express = require("express");
// const router = express.Router();

// const Cart = require("../models/Cart");

// // Add to Cart -> POST /api/shawls/cart/add
// router.post('/add', async (req, res) => {
//   try {
//     const { userId, productId, title, description, price, image } = req.body;

//     // ✅ YAHAN CHECK LAGAYEIN: Agar user login nahi hai ya guest user ID hai
//     if (!userId || userId === "guest_user_id" || userId === "null" || userId === "undefined") {
//       return res.status(401).json({ message: "Unauthorized: Please login first!" });
//     }

//     let existingItem = await Cart.findOne({ userId, productId });

//     if (existingItem) {
//       existingItem.quantity += 1;
//       await existingItem.save();
//       return res.status(200).json({ message: "Cart updated", item: existingItem });
//     }

//     const newItem = new Cart({
//       userId,
//       productId,
//       title,
//       description,
//       price,
//       image,
//     });

//     const saved = await newItem.save();
//     res.status(201).json(saved);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Get Cart Items -> GET /api/shawls/cart/:userId
// router.get('/:userId', async (req, res) => {
//   try {
//     // Agar guest user ID hai toh khali array bhej dein
//     if (!req.params.userId || req.params.userId === "guest_user_id") {
//       return res.status(200).json([]);
//     }

//     const cartItems = await Cart.find({ userId: req.params.userId });
//     res.status(200).json(cartItems);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Remove Item from Cart -> DELETE /api/shawls/cart/remove/:id
// router.delete('/remove/:id', async (req, res) => {
//   try {
//     await Cart.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Item removed" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;




// swagger





const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

/**
 * @swagger
 * tags:
 *   name: carts Product
 *   description: carts product management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "60d0fe4f5311236168a109cc"
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
 *         image:
 *           type: string
 *           example: "https://example.com/shawl.jpg"
 *         quantity:
 *           type: integer
 *           example: 1
 */

/**
 * @swagger
 * /api/shawls/cart/add:
 *   post:
 *     summary: Add an item to the cart
 *     description: Adds a product to the user's cart or increments quantity if it already exists. Requires authentication.
 *     tags: [carts Product]
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
 *               image:
 *                 type: string
 *                 example: "https://example.com/shawl.jpg"
 *     responses:
 *       '200':
 *         description: Cart updated with incremented quantity
 *       '201':
 *         description: New item successfully added to cart
 *       '401':
 *         description: Unauthorized (User is guest or not logged in)
 *       '500':
 *         description: Internal server error
 */
router.post('/add', async (req, res) => {
  try {
    const { userId, productId, title, description, price, image } = req.body;

    if (!userId || userId === "guest_user_id" || userId === "null" || userId === "undefined") {
      return res.status(401).json({ message: "Unauthorized: Please login first!" });
    }

    let existingItem = await Cart.findOne({ userId, productId });

    if (existingItem) {
      existingItem.quantity += 1;
      await existingItem.save();
      return res.status(200).json({ message: "Cart updated", item: existingItem });
    }

    const newItem = new Cart({
      userId,
      productId,
      title,
      description,
      price,
      image,
    });

    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/shawls/cart/{userId}:
 *   get:
 *     summary: Get cart items for a user
 *     description: Retrieves all items in the cart for a specific user ID. Returns an empty array if guest user.
 *     tags: [carts Product]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *         example: "60d0fe4f5311236168a109ca"
 *     responses:
 *       '200':
 *         description: List of cart items or empty array
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CartItem'
 *       '500':
 *         description: Internal server error
 */
router.get('/:userId', async (req, res) => {
  try {
    if (!req.params.userId || req.params.userId === "guest_user_id") {
      return res.status(200).json([]);
    }

    const cartItems = await Cart.find({ userId: req.params.userId });
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/shawls/cart/remove/{id}:
 *   delete:
 *     summary: Remove an item from the cart
 *     description: Deletes a specific cart item by its unique cart item document ID.
 *     tags: [carts Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Cart Item unique document ID
 *         example: "60d0fe4f5311236168a109cc"
 *     responses:
 *       '200':
 *         description: Item successfully removed
 *       '500':
 *         description: Internal server error
 */
router.delete('/remove/:id', async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Item removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;