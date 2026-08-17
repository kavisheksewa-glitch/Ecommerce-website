// const express = require("express");
// const router = express.Router();
// const Order = require("../models/Order");

// // POST /api/shawls/orders/add -> naya order save karna
// router.post("/add", async (req, res) => {
//   try {
//     const {
//       userId,
//       productId,
//       productTitle,
//       productImage,
//       price,
//       quantity,
//       totalAmount,
//       fullName,
//       phone,
//       address,
//       paymentMethod,
//       paymentStatus,
//       razorpayPaymentId,
//     } = req.body;

//     // Basic validation
//     if (
//       !userId ||
//       !productId ||
//       !productTitle ||
//       !price ||
//       !quantity ||
//       !totalAmount ||
//       !fullName ||
//       !phone ||
//       !address ||
//       !paymentMethod
//     ) {
//       return res.status(400).json({ message: "Kripya sabhi zaroori fields bharein." });
//     }

//     const newOrder = new Order({
//       userId,
//       productId,
//       productTitle,
//       productImage,
//       price,
//       quantity,
//       totalAmount,
//       fullName,
//       phone,
//       address,
//       paymentMethod,
//       paymentStatus: paymentStatus || "Pending",
//       razorpayPaymentId: razorpayPaymentId || "",
//     });

//     const savedOrder = await newOrder.save();

//     return res.status(201).json({
//       message: "Order safaltapoorvak save ho gaya!",
//       order: savedOrder,
//     });
//   } catch (error) {
//     console.error("Order save karte waqt error:", error);
//     return res.status(500).json({ message: "Server error, order save nahi ho paya." });
//   }
// });

// // GET /api/shawls/orders/user/:userId -> ek user ke saare orders
// router.get("/user/:userId", async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
//     return res.status(200).json(orders);
//   } catch (error) {
//     console.error("Orders fetch karte waqt error:", error);
//     return res.status(500).json({ message: "Server error, orders fetch nahi ho paye." });
//   }
// });

// // GET /api/shawls/orders -> saare orders (admin ke liye)
// router.get("/", async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 });
//     return res.status(200).json(orders);
//   } catch (error) {
//     console.error("Orders fetch karte waqt error:", error);
//     return res.status(500).json({ message: "Server error, orders fetch nahi ho paye." });
//   }
// });

// // PATCH /api/shawls/orders/:id/status -> order status update (admin)
// router.patch("/:id/status", async (req, res) => {
//   try {
//     const { orderStatus } = req.body;
//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.id,
//       { orderStatus },
//       { new: true }
//     );
//     if (!updatedOrder) {
//       return res.status(404).json({ message: "Order nahi mila." });
//     }
//     return res.status(200).json(updatedOrder);
//   } catch (error) {
//     console.error("Order status update karte waqt error:", error);
//     return res.status(500).json({ message: "Server error." });
//   }
// });

// module.exports = router;








// new



// const express = require("express");
// const router = express.Router();
// const Order = require("../models/Order");

// // POST /api/shawls/orders/add -> naya order save karna
// router.post("/add", async (req, res) => {
//   try {
//     const {
//       userId,
//       productId,
//       productTitle,
//       productImage,
//       price,
//       quantity,
//       totalAmount,
//       fullName,
//       phone,
//       address,
//       paymentMethod,
//       paymentStatus,
//       razorpayPaymentId,
//     } = req.body;

//     // Basic validation
//     if (
//       !userId ||
//       !productId ||
//       !productTitle ||
//       !price ||
//       !quantity ||
//       !totalAmount ||
//       !fullName ||
//       !phone ||
//       !address ||
//       !paymentMethod
//     ) {
//       return res.status(400).json({ message: "Kripya sabhi zaroori fields bharein." });
//     }

//     const newOrder = new Order({
//       userId,
//       productId,
//       productTitle,
//       productImage,
//       price,
//       quantity,
//       totalAmount,
//       fullName,
//       phone,
//       address,
//       paymentMethod,
//       paymentStatus: paymentStatus || "Pending",
//       razorpayPaymentId: razorpayPaymentId || "",
//       orderStatus: "Pending", // Default initial status
//     });

//     const savedOrder = await newOrder.save();

//     return res.status(201).json({
//       message: "Order safaltapoorvak save ho gaya!",
//       order: savedOrder,
//     });
//   } catch (error) {
//     console.error("Order save karte waqt error:", error);
//     return res.status(500).json({ message: "Server error, order save nahi ho paya." });
//   }
// });

// // GET /api/shawls/orders/user/:userId -> ek user ke saare orders
// router.get("/user/:userId", async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
//     return res.status(200).json(orders);
//   } catch (error) {
//     console.error("Orders fetch karte waqt error:", error);
//     return res.status(500).json({ message: "Server error, orders fetch nahi ho paye." });
//   }
// });

// // GET /api/shawls/orders -> saare orders (admin ke liye)
// router.get("/", async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 });
//     return res.status(200).json(orders);
//   } catch (error) {
//     console.error("Orders fetch karte waqt error:", error);
//     return res.status(500).json({ message: "Server error, orders fetch nahi ho paye." });
//   }
// });

// // PATCH /api/shawls/orders/:id/status -> order status update (admin)
// router.patch("/:id/status", async (req, res) => {
//   try {
//     const { orderStatus } = req.body;

//     if (!orderStatus) {
//       return res.status(400).json({ message: "Order status zaroori hai." });
//     }

//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.id,
//       { orderStatus },
//       { new: true, runValidators: true }
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({ message: "Order nahi mila." });
//     }

//     return res.status(200).json(updatedOrder);
//   } catch (error) {
//     console.error("Order status update karte waqt error:", error);
//     return res.status(500).json({ message: "Server error while updating order status." });
//   }
// });

// module.exports = router;



// new1



const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// POST /api/shawls/orders/add -> naya order save karna
router.post("/add", async (req, res) => {
  try {
    const {
      userId,
      productId,
      productTitle,
      productImage,
      price,
      quantity,
      totalAmount,
      fullName,
      phone,
      address,
      paymentMethod,
      paymentStatus,
      razorpayPaymentId,
    } = req.body;

    if (
      !userId ||
      !productId ||
      !productTitle ||
      !price ||
      !quantity ||
      !totalAmount ||
      !fullName ||
      !phone ||
      !address ||
      !paymentMethod
    ) {
      return res.status(400).json({ message: "Kripya sabhi zaroori fields bharein." });
    }

    const newOrder = new Order({
      userId,
      productId,
      productTitle,
      productImage,
      price,
      quantity,
      totalAmount,
      fullName,
      phone,
      address,
      paymentMethod,
      paymentStatus: paymentStatus || "Pending",
      razorpayPaymentId: razorpayPaymentId || "",
      orderStatus: "Processing",
    });

    const savedOrder = await newOrder.save();

    return res.status(201).json({
      message: "Order safaltapoorvak save ho gaya!",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Order save karte waqt error:", error);
    return res.status(500).json({ message: "Server error, order save nahi ho paya." });
  }
});

// GET /api/shawls/orders/user/:userId -> ek user ke saare orders
router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Orders fetch karte waqt error:", error);
    return res.status(500).json({ message: "Server error, orders fetch nahi ho paye." });
  }
});

// GET /api/shawls/orders -> saare orders (admin ke liye)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Orders fetch karte waqt error:", error);
    return res.status(500).json({ message: "Server error, orders fetch nahi ho paye." });
  }
});

// PATCH /api/shawls/orders/:id/status -> order status update (admin)
router.patch("/:id/status", async (req, res) => {
  try {
    const { orderStatus } = req.body;

    if (!orderStatus) {
      return res.status(400).json({ message: "Order status zaroori hai." });
    }

    // Yahan se 'runValidators: true' hata diya hai taaki enum mismatch ki wajah se error na aaye
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { returnDocument: 'after' }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order nahi mila." });
    }

    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Order status update karte waqt error:", error);
    return res.status(500).json({ message: "Server error while updating order status." });
  }
});

module.exports = router;