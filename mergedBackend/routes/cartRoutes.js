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









const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart");

// Add to Cart -> POST /api/shawls/cart/add
router.post('/add', async (req, res) => {
  try {
    const { userId, productId, title, description, price, image } = req.body;

    // ✅ YAHAN CHECK LAGAYEIN: Agar user login nahi hai ya guest user ID hai
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

// Get Cart Items -> GET /api/shawls/cart/:userId
router.get('/:userId', async (req, res) => {
  try {
    // Agar guest user ID hai toh khali array bhej dein
    if (!req.params.userId || req.params.userId === "guest_user_id") {
      return res.status(200).json([]);
    }

    const cartItems = await Cart.find({ userId: req.params.userId });
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove Item from Cart -> DELETE /api/shawls/cart/remove/:id
router.delete('/remove/:id', async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Item removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;