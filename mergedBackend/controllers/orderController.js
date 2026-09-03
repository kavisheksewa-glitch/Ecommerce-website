// const Order = require("../models/Order");
// const Notification = require("../models/Notification");

// const placeOrder = async (req, res) => {
//   try {
//     const { 
//       userId, productId, productTitle, productImage, 
//       price, quantity, totalAmount, fullName, phone, 
//       address, paymentMethod, paymentStatus, razorpayPaymentId 
//     } = req.body;
    
//     // 📦 Order save karne ka logic
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
//       paymentStatus,
//       razorpayPaymentId
//     });

//     const savedOrder = await newOrder.save();

//     // 🔔 Notification Create Karein
//     await Notification.create({
//       userId,
//       title: "Order Placed Successfully 📦",
//       message: `Your order for "${productTitle || 'Shawl'}" amounting to ₹${totalAmount || ''} has been placed successfully!`,
//       type: "order"
//     });

//     res.status(200).json({ message: "Order placed successfully", order: savedOrder });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// module.exports = { placeOrder };




//nnnnnnnnnnnnnnnnnnn sahi wala 





// const Order = require("../models/Order");
// const Notification = require("../models/Notification");

// /**
//  * @swagger
//  * tags:
//  *   name: Orders
//  *   description: Order management and placement APIs
//  */

// /**
//  * @swagger
//  * /api/orders/place:
//  *   post:
//  *     summary: Place a new order
//  *     description: Creates a new order for a customer, saves it to the database, and sends a confirmation notification.
//  *     tags: [Orders]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - userId
//  *               - productId
//  *               - price
//  *               - quantity
//  *               - totalAmount
//  *               - fullName
//  *               - phone
//  *               - address
//  *               - paymentMethod
//  *             properties:
//  *               userId:
//  *                 type: string
//  *                 example: "60d0fe4f5311236168a109ff"
//  *               productId:
//  *                 type: string
//  *                 example: "60d0fe4f5311236168a109ee"
//  *               productTitle:
//  *                 type: string
//  *                 example: "Kashmiri Pashmina Shawl"
//  *               productImage:
//  *                 type: string
//  *                 example: "https://example.com/images/shawl.jpg"
//  *               price:
//  *                 type: number
//  *                 example: 2500
//  *               quantity:
//  *                 type: integer
//  *                 example: 1
//  *               totalAmount:
//  *                 type: number
//  *                 example: 2500
//  *               fullName:
//  *                 type: string
//  *                 example: "Aarav Sharma"
//  *               phone:
//  *                 type: string
//  *                 example: "9876543210"
//  *               address:
//  *                 type: string
//  *                 example: "12écoulement St, Srinagar, J&K"
//  *               paymentMethod:
//  *                 type: string
//  *                 example: "Online"
//  *               paymentStatus:
//  *                 type: string
//  *                 example: "Completed"
//  *               razorpayPaymentId:
//  *                 type: string
//  *                 example: "pay_123456789"
//  *     responses:
//  *       200:
//  *         description: Order placed successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Order placed successfully"
//  *                 order:
//  *                   type: object
//  *       500:
//  *         description: Server error
//  */
// const placeOrder = async (req, res) => {
//   try {
//     const { 
//       userId, productId, productTitle, productImage, 
//       price, quantity, totalAmount, fullName, phone, 
//       address, paymentMethod, paymentStatus, razorpayPaymentId 
//     } = req.body;
    
//     // 📦 Order save karne ka logic
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
//       paymentStatus,
//       razorpayPaymentId
//     });

//     const savedOrder = await newOrder.save();

//     // 🔔 Notification Create Karein
//     await Notification.create({
//       userId,
//       title: "Order Placed Successfully 📦",
//       message: `Your order for "${productTitle || 'Shawl'}" amounting to ₹${totalAmount || ''} has been placed successfully!`,
//       type: "order"
//     });

//     res.status(200).json({ message: "Order placed successfully", order: savedOrder });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// module.exports = { placeOrder };


//3 sept 2026 morning




const Order = require("../models/Order");
const Notification = require("../models/Notification");
const Product = require("../models/Product"); // ⬅️ naya import

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management and placement APIs
 */

/**
 * @swagger
 * /api/orders/place:
 *   post:
 *     summary: Place a new order
 *     description: Creates a new order for a customer, saves it to the database, and sends a confirmation notification.
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - productId
 *               - price
 *               - quantity
 *               - totalAmount
 *               - fullName
 *               - phone
 *               - address
 *               - paymentMethod
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "60d0fe4f5311236168a109ff"
 *               productId:
 *                 type: string
 *                 example: "60d0fe4f5311236168a109ee"
 *               productTitle:
 *                 type: string
 *                 example: "Kashmiri Pashmina Shawl"
 *               productImage:
 *                 type: string
 *                 example: "https://example.com/images/shawl.jpg"
 *               price:
 *                 type: number
 *                 example: 2500
 *               quantity:
 *                 type: integer
 *                 example: 1
 *               totalAmount:
 *                 type: number
 *                 example: 2500
 *               fullName:
 *                 type: string
 *                 example: "Aarav Sharma"
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               address:
 *                 type: string
 *                 example: "12écoulement St, Srinagar, J&K"
 *               paymentMethod:
 *                 type: string
 *                 example: "Online"
 *               paymentStatus:
 *                 type: string
 *                 example: "Completed"
 *               razorpayPaymentId:
 *                 type: string
 *                 example: "pay_123456789"
 *     responses:
 *       200:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order placed successfully"
 *                 order:
 *                   type: object
 *       400:
 *         description: Insufficient stock
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
const placeOrder = async (req, res) => {
  try {
    const { 
      userId, productId, productTitle, productImage, 
      price, quantity, totalAmount, fullName, phone, 
      address, paymentMethod, paymentStatus, razorpayPaymentId 
    } = req.body;

    // ✅ Product exist karta hai ya nahi check karo
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ✅ Stock available hai ya nahi check karo
    if (product.stockQuantity < quantity) {
      return res.status(400).json({ 
        message: `Insufficient stock. Only ${product.stockQuantity} left.` 
      });
    }

    // ✅ Atomically stock kam karo (race condition-safe)
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId, stockQuantity: { $gte: quantity } },
      { $inc: { stockQuantity: -quantity } },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(400).json({ message: "Stock just ran out, please try again." });
    }

    // 📦 Order save karne ka logic
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
      paymentStatus,
      razorpayPaymentId
    });

    const savedOrder = await newOrder.save();

    // 🔔 Notification Create Karein
    await Notification.create({
      userId,
      title: "Order Placed Successfully 📦",
      message: `Your order for "${productTitle || 'Shawl'}" amounting to ₹${totalAmount || ''} has been placed successfully!`,
      type: "order"
    });

    res.status(200).json({ 
      message: "Order placed successfully", 
      order: savedOrder,
      remainingStock: updatedProduct.stockQuantity
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { placeOrder };