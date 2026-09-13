

// const Customer = require("../models/Customer");
// const Notification = require("../models/Notification");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_here";

// const registerCustomer = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const existingUser = await Customer.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email is already registered!" });
//     }

//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     const newCustomer = new Customer({
//       ...req.body,
//       password: hashedPassword,
//     });

//     const savedCustomer = await newCustomer.save();

//     await Notification.create({
//       userId: savedCustomer._id,
//       title: "Welcome to Kavi Shawls! 🎉",
//       message: "Thank you for registering with us. Enjoy exploring our luxury collection.",
//       type: "offer"
//     });

//     // ✅ role add kiya
//     const token = jwt.sign(
//       { id: savedCustomer._id, email: savedCustomer.email, role: "customer" },
//       JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     // 🔒 Response me ab sirf message + token — customer ka poora data nahi bheja
//     res.status(201).json({
//       message: "Registration successful!",
//       token,
//     });
//   } catch (error) {
//     console.error("Error during registration:", error);
//     res.status(500).json({ message: "Server error, please try again." });
//   }
// };

// const loginCustomer = async (req, res) => {
//   try {
//     const { email: userEmail, password: userPassword } = req.body;

//     const user = await Customer.findOne({ email: userEmail });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid email or password!" });
//     }

//     const isMatch = await bcrypt.compare(userPassword, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid email or password!" });
//     }

//     await Notification.create({
//       userId: user._id,
//       title: "Login Successful! 🔓",
//       message: `Welcome back, ${user.fullName || "Customer"}! You successfully logged into your account.`,
//       type: "login"
//     });

//     // ✅ role add kiya
//     const token = jwt.sign(
//       { id: user._id, email: user.email, role: "customer" },
//       JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     // 🔒 Response me ab sirf message + token
//     res.status(200).json({
//       message: "Login Successfully",
//       token,
//     });
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ message: "Server error during login" });
//   }
// };

// const getAllCustomers = async (req, res) => {
//   try {
//     const users = await Customer.find().select("-password").sort({ createdAt: -1 });
//     res.status(200).json({ success: true, users });
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({ message: "Server error while fetching users." });
//   }
// };

// module.exports = {
//   registerCustomer,
//   loginCustomer,
//   getAllCustomers,
// };

//remove



// const Customer = require("../models/Customer");
// const Notification = require("../models/Notification");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_here";

// const registerCustomer = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const existingUser = await Customer.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email is already registered!" });
//     }

//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     const newCustomer = new Customer({
//       ...req.body,
//       password: hashedPassword,
//     });

//     const savedCustomer = await newCustomer.save();

//     await Notification.create({
//       userId: savedCustomer._id,
//       title: "Welcome to Kavi Shawls! 🎉",
//       message: "Thank you for registering with us. Enjoy exploring our luxury collection.",
//       type: "offer"
//     });

//     const token = jwt.sign(
//       { id: savedCustomer._id, email: savedCustomer.email, role: "customer" },
//       JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.status(201).json({
//       success: true,
//       message: "Registration successful!",
//       token,
//     });
//   } catch (error) {
//     console.error("Error during registration:", error);
//     res.status(500).json({ message: "Server error, please try again." });
//   }
// };

// const loginCustomer = async (req, res) => {
//   try {
//     const { email: userEmail, password: userPassword } = req.body;

//     const user = await Customer.findOne({ email: userEmail });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid email or password!" });
//     }

//     const isMatch = await bcrypt.compare(userPassword, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid email or password!" });
//     }

//     await Notification.create({
//       userId: user._id,
//       title: "Login Successful! 🔓",
//       message: `Welcome back, ${user.fullName || "Customer"}! You successfully logged into your account.`,
//       type: "login"
//     });

//     const token = jwt.sign(
//       { id: user._id, email: user.email, role: "customer" },
//       JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Login Successfully",
//       token,
//     });
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ message: "Server error during login" });
//   }
// };

// const getAllCustomers = async (req, res) => {
//   try {
//     const users = await Customer.find().select("-password").sort({ createdAt: -1 });
//     res.status(200).json({ success: true, users });
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({ message: "Server error while fetching users." });
//   }
// };

// module.exports = {
//   registerCustomer,
//   loginCustomer,
//   getAllCustomers,
// };



//all logic in controller



const Customer = require("../models/Customer");
const SellerProduct = require("../models/SellerProduct");
const Notification = require("../models/Notification");
const Wishlist = require("../models/Wishlist");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const SellerNotification = require("../models/SellerNotification");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_here";

// ==================== AUTH CONTROLLERS ====================

const registerCustomer = async (req, res) => {
  try {
    const {
      fullName,
      email,
      mobile,
      dob,
      password,
      houseNo,
      street,
      city,
      state,
      pincode,
      country,
    } = req.body;

    const existingUser = await Customer.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered!" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newCustomer = new Customer({
      fullName,
      email,
      mobile,
      dob,
      password: hashedPassword,
      houseNo,
      street,
      city,
      state,
      pincode,
      country: country || "India",
    });

    const savedCustomer = await newCustomer.save();

    const token = jwt.sign(
      { id: savedCustomer._id, email: savedCustomer.email, role: "customer" },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "Registration successful!",
      token,
      userId: savedCustomer._id,
    });

    Notification.create({
      userId: savedCustomer._id,
      title: "Welcome to Kavi Shawls! 🎉",
      message: "Thank you for registering with us. Enjoy shopping!",
      type: "offer",
    }).catch((notifyError) => {
      console.error("Notification creation failed (register):", notifyError.message);
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: error.message || "Server error, please try again." });
  }
};

const loginCustomer = async (req, res) => {
  try {
    const { email: userEmail, password: userPassword } = req.body;

    const user = await Customer.findOne({ email: userEmail });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    const isMatch = await bcrypt.compare(userPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: "customer" },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login Successfully",
      token,
    });

    Notification.create({
      userId: user._id,
      title: "Login Successful! 🔓",
      message: `Welcome back, ${user.fullName || "Customer"}! You successfully logged into your account.`,
      type: "order",
    }).catch((notifyError) => {
      console.error("Notification creation failed (login):", notifyError.message);
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: error.message || "Server error during login" });
  }
};

const logoutCustomer = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ success: false, message: "Server error during logout" });
  }
};

// ==================== PRODUCT CONTROLLERS ====================

const getAllProductsForCustomer = async (req, res) => {
  try {
    const products = await SellerProduct.find({});
    res.status(200).json({ success: true, count: products.length, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== WISHLIST CONTROLLERS ====================

const addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, title, description, price, originalPrice, discount, image, sellerId } = req.body;

    const existingWishlist = await Wishlist.findOne({ userId, productId });
    if (existingWishlist) {
      return res.status(400).json({ success: false, message: "Product already in wishlist" });
    }

    const wishlistItem = new Wishlist({
      userId,
      productId,
      title,
      description,
      price,
      originalPrice,
      discount,
      image,
      sellerId,
    });

    await wishlistItem.save();

    res.status(201).json({ success: true, message: "Added to wishlist successfully", wishlistItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const deletedItem = await Wishlist.findOneAndDelete({ _id: id, userId });
    if (!deletedItem) {
      return res.status(404).json({ success: false, message: "Item not found in wishlist" });
    }

    res.status(200).json({ success: true, message: "Removed from wishlist successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const wishlist = await Wishlist.find({ userId });
    res.status(200).json({ success: true, count: wishlist.length, wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== CART CONTROLLERS ====================

const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, title, description, price, image, quantity, sellerId } = req.body;

    let cartItem = await Cart.findOne({ userId, productId });
    if (cartItem) {
      cartItem.quantity += quantity || 1;
      if (sellerId) cartItem.sellerId = sellerId;
      await cartItem.save();
      return res.status(200).json({ success: true, message: "Cart quantity updated", cartItem });
    }

    cartItem = new Cart({
      userId,
      productId,
      title,
      description,
      price,
      image,
      quantity: quantity || 1,
      sellerId,
    });

    await cartItem.save();
    res.status(201).json({ success: true, message: "Added to cart successfully", cartItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const deletedItem = await Cart.findOneAndDelete({ _id: id, userId });
    if (!deletedItem) {
      return res.status(404).json({ success: false, message: "Item not found in cart" });
    }

    res.status(200).json({ success: true, message: "Removed from cart successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.find({ userId });
    res.status(200).json({ success: true, count: cart.length, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== ORDER CONTROLLERS ====================

const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
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

    const finding = await SellerProduct.findById(productId);
    if (!finding) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const actualSellerId = finding.sellerId;

    if (finding.stockQuantity < quantity) {
      return res.status(400).json({ success: false, message: "Insufficient stock" });
    }

    await SellerProduct.findOneAndUpdate(
      { _id: productId, stockQuantity: { $gte: quantity } },
      { $inc: { stockQuantity: -quantity } },
      { new: true }
    );

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
      sellerId: actualSellerId,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: savedOrder,
    });

    if (actualSellerId) {
      SellerNotification.create({
        sellerId: actualSellerId,
        title: "New Order Received! 🛒",
        message: `${fullName || "A customer"} placed an order for "${productTitle}".`,
        type: "success",
      }).catch((err) => console.error("Seller notification failed:", err.message));
    }
  } catch (error) {
    console.error("❌ Error in createOrder:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getCustomerOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const order = await Order.findOne({ _id: id, userId });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (["Delivered", "Cancelled"].includes(order.orderStatus)) {
      return res.status(400).json({
        success: false,
        message: `Order cannot be cancelled as it is already ${order.orderStatus}.`,
      });
    }

    order.orderStatus = "Cancelled";
    await order.save();

    res.status(200).json({ success: true, message: "Order cancelled successfully", order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== NOTIFICATION CONTROLLERS ====================

const getCustomerNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: notifications.length, notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const markNotificationsAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    await Notification.updateMany({ userId, read: false }, { $set: { read: true } });
    res.status(200).json({ success: true, message: "Notifications marked as read" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const clearAllNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    await Notification.deleteMany({ userId });
    res.status(200).json({ success: true, message: "All notifications cleared" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== PROFILE CONTROLLERS ====================

const getCustomerProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const customer = await Customer.findById(userId).select("-password");

    if (!customer) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    }

    res.status(200).json({
      success: true,
      customer: {
        dob: customer.dob,
        name: customer.fullName,
        email: customer.email,
        phone: customer.mobile,
        houseNo: customer.houseNo,
        street: customer.street,
        city: customer.city,
        state: customer.state,
        pincode: customer.pincode,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateCustomerProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phone, houseNo, street, city, state, pincode } = req.body;

    const customer = await Customer.findById(userId);
    if (!customer) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    }

    if (name) customer.fullName = name;
    if (phone) customer.mobile = phone;
    if (houseNo !== undefined) customer.houseNo = houseNo;
    if (street !== undefined) customer.street = street;
    if (city !== undefined) customer.city = city;
    if (state !== undefined) customer.state = state;
    if (pincode !== undefined) customer.pincode = pincode;

    await customer.save();
    res.status(200).json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  registerCustomer,
  loginCustomer,
  logoutCustomer,
  getAllProductsForCustomer,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  addToCart,
  removeFromCart,
  getCart,
  createOrder,
  getCustomerOrders,
  cancelOrder,
  getCustomerNotifications,
  markNotificationsAsRead,
  clearAllNotifications,
  getCustomerProfile,
  updateCustomerProfile,
};