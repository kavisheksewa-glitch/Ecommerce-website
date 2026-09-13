


// const Admin = require("../models/Admin");
// const jwt = require("jsonwebtoken");

// // Secret key for JWT
// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_here";

// // @desc    Admin Login
// // @route   POST /api/admin/login
// // @access  Public
// const adminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const admin = await Admin.findOne({ email });

//     if (!admin) {
//       return res.status(400).json({ success: false, message: "Invalid Email!" });
//     }

//     if (admin.password !== password) {
//       return res.status(400).json({ success: false, message: "Invalid Password!" });
//     }

//     // ✅ role add kiya — Generate JWT Token (valid for 1 day)
//     const token = jwt.sign(
//       { id: admin._id, email: admin.email, role: "admin" },
//       JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Login Successful",
//       token: token,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error", error: error.message });
//   }
// };

// module.exports = {
//   adminLogin,
// };



//transfer logic



const Admin = require("../models/Admin");
const User = require("../models/Customer");
const Seller = require("../models/Seller");
const Order = require("../models/Order");
const jwt = require("jsonwebtoken");

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_here";

// @desc    Admin Login
// @route   POST /api/admin/login
// @access  Public
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ success: false, message: "Invalid Email!" });
    }

    if (admin.password !== password) {
      return res.status(400).json({ success: false, message: "Invalid Password!" });
    }

    // ✅ role add kiya — Generate JWT Token (valid for 1 day)
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: "admin" },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all sellers
// @route   GET /api/admin/sellers
// @access  Private (Admin)
const getAllSellers = async (req, res) => {
  try {
    const sellers = await Seller.find().select("-password");
    res.status(200).json({
      success: true,
      count: sellers.length,
      sellers,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Approve or Reject a seller
// @route   PUT /api/admin/seller/:id/status
// @access  Private (Admin)
const updateSellerStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Approved", "Rejected", "Pending"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }

    const updatedSeller = await Seller.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).select("-password");

    if (!updatedSeller) {
      return res.status(404).json({ success: false, message: "Seller not found" });
    }

    res.status(200).json({
      success: true,
      message: `Seller status updated to ${status}`,
      seller: updatedSeller,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all system orders
// @route   GET /api/admin/orders
// @access  Private (Admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update order status and tracking ID
// @route   PUT /api/admin/order/:id/status
// @access  Private (Admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, trackingId } = req.body;

    const updateData = {};
    if (orderStatus) updateData.orderStatus = orderStatus;
    if (trackingId !== undefined) updateData.trackingId = trackingId;

    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  adminLogin,
  getAllUsers,
  getAllSellers,
  updateSellerStatus,
  getAllOrders,
  updateOrderStatus,
};