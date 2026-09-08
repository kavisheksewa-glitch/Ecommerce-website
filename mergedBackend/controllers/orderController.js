

const Order = require("../models/Order");
const Notification = require("../models/Notification");
const Product = require("../models/Product");

const placeOrder = async (req, res) => {
  try {
    const { 
      userId, productId, productTitle, productImage, 
      price, quantity, totalAmount, fullName, phone, 
      address, paymentMethod, paymentStatus, razorpayPaymentId 
    } = req.body;

    console.log("📦 Incoming order request:", { productId, quantity });

    // ✅ Product exist karta hai ya nahi check karo
    const product = await Product.findById(productId);
    console.log("🔍 Product found:", product);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ✅ Stock available hai ya nahi check karo
    if (product.stockQuantity < quantity) {
      return res.status(400).json({ 
        message: `Insufficient stock. Only ${product.stockQuantity} left.` 
      });
    }

    // ✅ Atomically stock kam karo
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId, stockQuantity: { $gte: quantity } },
      { $inc: { stockQuantity: -quantity } },
      { new: true }
    );

    console.log("✅ Stock updated:", updatedProduct?.stockQuantity);

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
      razorpayPaymentId,
      sellerId: product.sellerId, // ⬅️ ye missing tha, ab Product se le liya
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
    console.error("❌ Order placement error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { placeOrder };