



const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");
const SellerProduct = require("../models/SellerProduct");
const Notification = require("../models/Notification");
const Wishlist = require("../models/Wishlist");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const SellerNotification = require("../models/SellerNotification");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { protectCustomer } = require("../middleware/customerMiddleware");
const sendOtpEmail = require("../utils/SendEmail");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_here";

/**
 * @swagger
 * tags:
 *   name: Customer Authentication & Management
 *   description: Customer APIs for Auth, Cart, Wishlist, Orders, Notifications, Email Verification, and Password Reset
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     CustomerBearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Enter your JWT token in the format (e.g. Bearer <token>)
 */

// ==================== AUTH CONTROLLERS ====================

/**
 * @swagger
 * /api/customer/register:
 *   post:
 *     summary: Register a new customer
 *     tags: [Customer Authentication & Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - fullName
 *             properties:
 *               email:
 *                 type: string
 *                 example: "customer1@gmail.com"
 *               password:
 *                 type: string
 *                 example: "password1123"
 *               fullName:
 *                 type: string
 *                 example: "Rahul Sharma"
 *               mobile:
 *                 type: string
 *                 example: "9876543210"
 *     responses:
 *       201:
 *         description: Registration successful
 *       400:
 *         description: Email is already registered
 */
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

    const verifyOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedVerifyOtp = await bcrypt.hash(verifyOtp, saltRounds);
    const verifyOtpExpiry = new Date(Date.now() + 15 * 60 * 1000);

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
      isEmailVerified: false,
      emailVerifyOtp: hashedVerifyOtp,
      emailVerifyOtpExpiry: verifyOtpExpiry,
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

    // ✅ FIX: Response turant bhej do — email/notification ka wait mat karo.
    // Pehle yahan `await sendOtpEmail(...)` tha jo poora request block kar
    // deta tha jab tak SMTP connect/timeout na ho jaaye (Gmail SMTP + Render
    // pe yeh 30-120 second tak la sakta hai). Isi wajah se user ko "Register"
    // button multiple baar click karna padta tha.
    res.status(201).json({
      message: "Registration successful! Please check your email for a verification OTP.",
      token,
      userId: savedCustomer._id,
      isEmailVerified: false,
    });

    // ✅ Email background mein bhejo (response ke baad, fire-and-forget)
    sendOtpEmail(savedCustomer.email, verifyOtp, savedCustomer.fullName, "verify")
      .then(() => {
        console.log(`✅ Verification OTP email sent successfully to ${savedCustomer.email}`);
      })
      .catch((emailError) => {
        // ✅ Poora error object log karo, sirf .message nahi — taaki asli
        // wajah pata chal sake (auth fail, connection timeout, DNS, etc.)
        console.error(`❌ Verification email failed to send to ${savedCustomer.email}:`, emailError);
      });

    // ✅ Notification bhi background mein
    Notification.create({
      userId: savedCustomer._id,
      title: "Welcome to Kavi Shawls! 🎉",
      message: "Thank you for registering with us. Please verify your email to unlock full access.",
      type: "offer",
    }).catch((notifyError) => {
      console.error("Notification creation failed (register):", notifyError.message);
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: error.message || "Server error, please try again." });
  }
};

/**
 * @swagger
 * /api/customer/login:
 *   post:
 *     summary: Customer Login
 *     tags: [Customer Authentication & Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "customer1@gmail.com"
 *               password:
 *                 type: string
 *                 example: "password1123"
 *     responses:
 *       200:
 *         description: Login Successfully
 *       400:
 *         description: Invalid email or password
 */
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

    // ✅ Agar email verify nahi hai to login block karo
    if (!user.isEmailVerified) {
      return res.status(403).json({
        message: "Your email is not verified. Please verify your email to login.",
        needsVerification: true,
        userId: user._id,
        email: user.email,
      });
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

    // ✅ Response pehle bhejo
    res.status(200).json({
      message: "Login Successfully",
      token,
      isEmailVerified: user.isEmailVerified,
    });

    // ✅ Notification background mein
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

/**
 * @swagger
 * /api/customer/logout:
 *   post:
 *     summary: Customer Logout
 *     tags: [Customer Authentication & Management]
 *     security:
 *       - CustomerBearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       401:
 *         description: Not authorized
 */
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

// ==================== EMAIL VERIFICATION CONTROLLERS ====================

/**
 * @swagger
 * /api/customer/verify-email:
 *   post:
 *     summary: Verify email using OTP
 *     tags: [Customer Authentication & Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - otp
 *             properties:
 *               userId:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid or expired OTP
 */
const verifyEmail = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      return res.status(400).json({ success: false, message: "userId and otp are required" });
    }

    const customer = await Customer.findById(userId);
    if (!customer) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    }

    if (customer.isEmailVerified) {
      return res.status(200).json({ success: true, message: "Email already verified" });
    }

    if (!customer.emailVerifyOtp || !customer.emailVerifyOtpExpiry) {
      return res.status(400).json({ success: false, message: "No OTP requested. Please resend OTP" });
    }

    if (customer.emailVerifyOtpExpiry < new Date()) {
      return res.status(400).json({ success: false, message: "OTP has expired. Please request a new one" });
    }

    const isMatch = await bcrypt.compare(otp, customer.emailVerifyOtp);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    customer.isEmailVerified = true;
    customer.emailVerifyOtp = null;
    customer.emailVerifyOtpExpiry = null;
    await customer.save();

    res.status(200).json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.error("Error in verifyEmail:", error);
    res.status(500).json({ success: false, message: "Server error, please try again." });
  }
};

/**
 * @swagger
 * /api/customer/resend-verification-otp:
 *   post:
 *     summary: Resend email verification OTP
 *     tags: [Customer Authentication & Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Verification OTP resent
 */
const resendVerificationOtp = async (req, res) => {
  try {
    const { userId, email } = req.body;

    if (!userId && !email) {
      return res.status(400).json({ success: false, message: "userId or email is required" });
    }

    const customer = await Customer.findOne({_id: userId,email});
    if(!customer){
       res.status(404).json({ success: false, message: "Customer not found" });
      return 
    }
    



    const verifyOtp = Math.floor(100000 + Math.random() * 900000).toString();
    customer.emailVerifyOtp = await bcrypt.hash(verifyOtp, 10);
    customer.emailVerifyOtpExpiry = new Date(Date.now() + 15 * 60 * 1000);
    await customer.save();

    // ✅ FIX: Yahan pehle `await sendOtpEmail(...)` tha aur agar yeh fail hota
    // (Gmail SMTP down/blocked) to poora request 500 error ke saath crash ho
    // jaata (kyunki koi try/catch nahi tha is line ke around), aur user ko
    // "resend otp" button bhi kaam nahi karta lagta. Ab hum turant success
    // response bhejte hain aur email background mein try karte hain, poora
    // error log karte hain taaki debug ho sake.
    res.status(200).json({ success: true, message: "Verification OTP resent to your email" });

    sendOtpEmail(customer.email, verifyOtp, customer.fullName, "verify")
      .then(() => {
        console.log(`✅ Resend OTP email sent successfully to ${customer.email}`);
      })
      .catch((emailError) => {
        console.error(`❌ Resend verification email failed to send to ${customer.email}:`, emailError);
      });
  } catch (error) {
    console.error("Error in resendVerificationOtp:", error);
    res.status(500).json({ success: false, message: "Server error, please try again." });
  }
};

// ==================== FORGOT PASSWORD CONTROLLERS ====================

/**
 * @swagger
 * /api/customer/forgot-password:
 *   post:
 *     summary: Request password reset OTP
 *     tags: [Customer Authentication & Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent to email
 */
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(404).json({ success: false, message: "No account found with this email" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    customer.resetOtp = hashedOtp;
    customer.resetOtpExpiry = otpExpiry;
    customer.resetOtpVerified = false;
    await customer.save();

    // ✅ FIX: response pehle, email background mein
    res.status(200).json({
      success: true,
      message: "OTP has been sent to your registered email",
      userId: customer._id,
    });

    sendOtpEmail(customer.email, otp, customer.fullName, "reset")
      .then(() => {
        console.log(`✅ Reset OTP email sent successfully to ${customer.email}`);
      })
      .catch((emailError) => {
        console.error(`❌ Reset password email failed to send to ${customer.email}:`, emailError);
      });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ success: false, message: error.message || "Server error, please try again." });
  }
};

/**
 * @swagger
 * /api/customer/verify-otp:
 *   post:
 *     summary: Verify password reset OTP
 *     tags: [Customer Authentication & Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - otp
 *             properties:
 *               userId:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP verified successfully
 */
const verifyOtp = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      return res.status(400).json({ success: false, message: "userId and otp are required" });
    }

    const customer = await Customer.findById(userId);
    if (!customer || !customer.resetOtp || !customer.resetOtpExpiry) {
      return res.status(400).json({ success: false, message: "OTP not requested or invalid" });
    }

    if (customer.resetOtpExpiry < new Date()) {
      return res.status(400).json({ success: false, message: "OTP has expired. Please request a new one" });
    }

    const isMatch = await bcrypt.compare(otp, customer.resetOtp);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    customer.resetOtpVerified = true;
    await customer.save();

    res.status(200).json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error in verifyOtp:", error);
    res.status(500).json({ success: false, message: error.message || "Server error, please try again." });
  }
};

/**
 * @swagger
 * /api/customer/reset-password:
 *   post:
 *     summary: Reset password after OTP verification
 *     tags: [Customer Authentication & Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - newPassword
 *             properties:
 *               userId:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successful
 */
const resetPassword = async (req, res) => {
  try {
    const { userId, newPassword } = req.body;

    if (!userId || !newPassword) {
      return res.status(400).json({ success: false, message: "userId and newPassword are required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }

    const customer = await Customer.findById(userId);
    if (!customer) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    }

    if (!customer.resetOtpVerified) {
      return res.status(400).json({ success: false, message: "Please verify OTP before resetting password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    customer.password = hashedPassword;

    customer.resetOtp = null;
    customer.resetOtpExpiry = null;
    customer.resetOtpVerified = false;

    await customer.save();

    res.status(200).json({ success: true, message: "Password reset successful" });

    Notification.create({
      userId: customer._id,
      title: "Password Changed 🔑",
      message: "Your password was reset successfully. If this wasn't you, please contact support immediately.",
      type: "offer",
    }).catch((notifyError) => {
      console.error("Notification creation failed (reset-password):", notifyError.message);
    });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ success: false, message: error.message || "Server error, please try again." });
  }
};

// ==================== PRODUCT CONTROLLERS ====================

/**
 * @swagger
 * /api/customer/products:
 *   get:
 *     summary: Get all products for customers
 *     tags: [Customer Authentication & Management]
 *     security:
 *       - CustomerBearerAuth: []
 *     responses:
 *       200:
 *         description: Products fetched successfully
 */
const getAllProductsForCustomer = async (req, res) => {
  try {
    const products = await SellerProduct.find({});
    res.status(200).json({ success: true, count: products.length, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== WISHLIST CONTROLLERS ====================

/**
 * @swagger
 * /api/customer/wishlist/add:
 *   post:
 *     summary: Add product to wishlist
 *     tags: [Customer Authentication & Management]
 *     security:
 *       - CustomerBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - title
 *               - price
 *             properties:
 *               productId:
 *                 type: string
 *               title:
 *                 type: string
 *               price:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Added to wishlist successfully
 */
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

    Notification.create({
      userId,
      productId,
      title: "Added to Wishlist ❤️",
      message: `"${title || "Product"}" has been added to your wishlist.`,
      type: "offer",
    }).catch((notifyError) => {
      console.error("Notification creation failed (wishlist add):", notifyError.message);
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @swagger
 * /api/customer/wishlist/remove/{id}:
 *   delete:
 *     summary: Remove item from wishlist
 *     tags: [Customer Authentication & Management]
 *     security:
 *       - CustomerBearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Removed from wishlist successfully
 */
const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const deletedItem = await Wishlist.findOneAndDelete({ _id: id, userId });
    if (!deletedItem) {
      return res.status(404).json({ success: false, message: "Item not found in wishlist" });
    }

    res.status(200).json({ success: true, message: "Removed from wishlist successfully" });

    Notification.create({
      userId,
      productId: deletedItem.productId,
      title: "Removed from Wishlist ❌",
      message: `"${deletedItem.title || "Product"}" was removed from your wishlist.`,
      type: "offer",
    }).catch((notifyError) => {
      console.error("Notification creation failed (wishlist remove):", notifyError.message);
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @swagger
 * /api/customer/wishlist:
 *   get:
 *     summary: Get customer wishlist items
 *     tags: [Customer Authentication & Management]
 *     security:
 *       - CustomerBearerAuth: []
 *     responses:
 *       200:
 *         description: Wishlist fetched successfully
 */
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

/**
 * @swagger
 * /api/customer/cart/add:
 *   post:
 *     summary: Add product to cart
 *     tags: [Customer Authentication & Management]
 *     security:
 *       - CustomerBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - title
 *               - price
 *             properties:
 *               productId:
 *                 type: string
 *               title:
 *                 type: string
 *               price:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Added to cart successfully
 */
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, title, description, price, image, quantity, sellerId } = req.body;

    let cartItem = await Cart.findOne({ userId, productId });
    if (cartItem) {
      cartItem.quantity += quantity || 1;
      if (sellerId) cartItem.sellerId = sellerId;
      await cartItem.save();

      res.status(200).json({ success: true, message: "Cart quantity updated", cartItem });

      Notification.create({
        userId,
        productId,
        title: "Cart Updated 🛒",
        message: `Quantity for "${title || "Product"}" was updated in your cart.`,
        type: "order",
      }).catch((notifyError) => {
        console.error("Notification creation failed (cart update):", notifyError.message);
      });
      return;
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

    Notification.create({
      userId,
      productId,
      title: "Added to Cart 🛍️",
      message: `"${title || "Product"}" has been successfully added to your shopping cart.`,
      type: "order",
    }).catch((notifyError) => {
      console.error("Notification creation failed (cart add):", notifyError.message);
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @swagger
 * /api/customer/cart/remove/{id}:
 *   delete:
 *     summary: Remove item from cart
 *     tags: [Customer Authentication & Management]
 *     security:
 *       - CustomerBearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Removed from cart successfully
 */
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const deletedItem = await Cart.findOneAndDelete({ _id: id, userId });
    if (!deletedItem) {
      return res.status(404).json({ success: false, message: "Item not found in cart" });
    }

    res.status(200).json({ success: true, message: "Removed from cart successfully" });

    Notification.create({
      userId,
      productId: deletedItem.productId,
      title: "Removed from Cart 🗑️",
      message: `"${deletedItem.title || "Product"}" has been removed from your cart.`,
      type: "order",
    }).catch((notifyError) => {
      console.error("Notification creation failed (cart remove):", notifyError.message);
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @swagger
 * /api/customer/cart:
 *   get:
 *     summary: Get customer cart items
 *     tags: [Customer Authentication & Management]
 *     security:
 *       - CustomerBearerAuth: []
 *     responses:
 *       200:
 *         description: Cart items fetched successfully
 */
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

/**
 * @swagger
 * /api/customer/order/create:
 *   post:
 *     summary: Create a new order
 *     description: Creates a new order for the logged-in customer, saves it to the database, and sends notifications to both the customer and the seller.
 *     tags: [Customer Authentication & Management]
 *     security:
 *       - CustomerBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - productTitle
 *               - price
 *               - quantity
 *               - totalAmount
 *               - fullName
 *               - phone
 *               - address
 *               - paymentMethod
 *             properties:
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
 *                 example: "12 Residency Road, Srinagar, J&K"
 *               paymentMethod:
 *                 type: string
 *                 example: "Cash on Delivery"
 *               paymentStatus:
 *                 type: string
 *                 example: "Pending"
 *               razorpayPaymentId:
 *                 type: string
 *                 example: "pay_123456789"
 *               sellerId:
 *                 type: string
 *                 example: "60d0fe4f5311236168a109aa"
 *     responses:
 *       201:
 *         description: Order created successfully
 *       401:
 *         description: Not authorized (missing or invalid token)
 *       500:
 *         description: Server error
 */
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
      sellerId,
    } = req.body;

    // ✅ sirf productId se dhoondo. sellerId ko query filter mein mat
    // lagao — frontend se aaya sellerId agar mismatch ho (purana cart item,
    // empty string, type mismatch) to poora query fail ho jaata tha, chahe
    // product actually exist karta ho, aur "Product not found for this
    // seller" error aata tha.
    const finding = await SellerProduct.findById(productId);

    if (!finding) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // ✅ Asli sellerId hamesha DB record se lo, frontend ke bharose mat raho
    const actualSellerId = finding.sellerId;

    if (finding.stockQuantity < quantity) {
      return res.status(400).json({ success: false, message: "Insufficient stock for the requested quantity" });
    }

    // ✅ Atomic decrement (race-condition safe) — direct save() ki jagah
    // findOneAndUpdate + $inc use karo, taaki 2 customers same time pe order
    // karein to bhi stock negative ya galat na ho
    const updatedProduct = await SellerProduct.findOneAndUpdate(
      { _id: productId, stockQuantity: { $gte: quantity } },
      { $inc: { stockQuantity: -quantity } },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(400).json({ success: false, message: "Stock just ran out, please try again." });
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
      sellerId: actualSellerId,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: savedOrder,
      remainingStock: updatedProduct.stockQuantity,
    });

    Notification.create({
      userId,
      productId,
      title: "Order Placed Successfully! 📦",
      message: `Your order for ${productTitle} has been placed successfully.`,
      type: "order",
    }).catch((notifyError) => {
      console.error("Notification creation failed (order create - customer):", notifyError.message);
    });

    if (actualSellerId) {
      SellerNotification.create({
        sellerId: actualSellerId,
        title: "New Order Received! 🛒",
        message: `${fullName || "A customer"} ne "${productTitle}" ka order place kiya hai. Quantity: ${quantity || 1}.`,
        type: "success",
      }).catch((notifyError) => {
        console.error("Notification creation failed (order create - seller):", notifyError.message);
      });
    } else {
      console.warn("Order create: sellerId missing, seller notification skip ho gayi.");
    }
  } catch (error) {
    console.error("❌ Error in createOrder:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @swagger
 * /api/customer/orders:
 *   get:
 *     summary: Get all orders of logged-in customer
 *     tags: [Customer Authentication & Management]
 *     security:
 *       - CustomerBearerAuth: []
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 */
const getCustomerOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @swagger
 * /api/customer/order/cancel/{id}:
 *   put:
 *     summary: Cancel an order (only if not already Delivered/Cancelled)
 *     tags: [Customer Authentication & Management]
 *     security:
 *       - CustomerBearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID to cancel
 *     responses:
 *       200:
 *         description: Order cancelled successfully
 *       400:
 *         description: Order cannot be cancelled (already delivered or already cancelled)
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Order not found or does not belong to this customer
 */
const cancelOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    // ✅ Ownership check: sirf apna khud ka order cancel kar sake, koi dusre ka nahi
    const order = await Order.findOne({ _id: id, userId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found or does not belong to this customer",
      });
    }

    // ✅ Delivered/already-Cancelled order dobara cancel nahi ho sakta
    if (["Delivered", "Cancelled"].includes(order.orderStatus)) {
      return res.status(400).json({
        success: false,
        message: `This order cannot be cancelled because it is already ${order.orderStatus}.`,
      });
    }

    order.orderStatus = "Cancelled";
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });

    Notification.create({
      userId,
      productId: order.productId,
      title: "Order Cancelled ❌",
      message: `Your order for "${order.productTitle}" has been cancelled successfully.`,
      type: "order",
    }).catch((notifyError) => {
      console.error("Notification creation failed (order cancel - customer):", notifyError.message);
    });

    if (order.sellerId) {
      SellerNotification.create({
        sellerId: order.sellerId,
        title: "Order Cancelled by Customer ⚠️",
        message: `${order.fullName || "A customer"} ne "${order.productTitle}" ka order cancel kar diya hai.`,
        type: "warning",
      }).catch((notifyError) => {
        console.error("Notification creation failed (order cancel - seller):", notifyError.message);
      });
    }
  } catch (error) {
    console.error("Error in cancelOrder:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== NOTIFICATION CONTROLLERS ====================

/**
 * @swagger
 * /api/customer/notifications:
 *   get:
 *     summary: Get all notifications for logged-in customer
 *     tags: [Customer Authentication & Management]
 *     security:
 *       - CustomerBearerAuth: []
 *     responses:
 *       200:
 *         description: Notifications fetched successfully
 */
const getCustomerNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: notifications.length, notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @swagger
 * /api/customer/notifications/read:
 *   put:
 *     summary: Mark all notifications as read
 *     tags: [Customer Authentication & Management]
 *     security:
 *       - CustomerBearerAuth: []
 *     responses:
 *       200:
 *         description: Notifications marked as read
 */
const markNotificationsAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    await Notification.updateMany({ userId, read: false }, { $set: { read: true } });
    res.status(200).json({ success: true, message: "Notifications marked as read" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @swagger
 * /api/customer/notifications/read/{id}:
 *   put:
 *     summary: Mark a single notification as read
 *     tags: [Customer Authentication & Management]
 *     security:
 *       - CustomerBearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification marked as read
 */
const markSingleNotificationAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const updated = await Notification.findOneAndUpdate(
      { _id: id, userId },
      { $set: { read: true } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    res.status(200).json({ success: true, message: "Notification marked as read", notification: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @swagger
 * /api/customer/notifications/clear:
 *   delete:
 *     summary: Clear all notifications for logged-in customer
 *     tags: [Customer Authentication & Management]
 *     security:
 *       - CustomerBearerAuth: []
 *     responses:
 *       200:
 *         description: All notifications cleared
 */
const clearAllNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    await Notification.deleteMany({ userId });
    res.status(200).json({ success: true, message: "All notifications cleared" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @swagger
 * /api/customer/profile:
 *   get:
 *     summary: Get logged-in customer's profile
 *     tags: [Customer Authentication & Management]
 *     security:
 *       - CustomerBearerAuth: []
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 *       404:
 *         description: Customer not found
 */
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
    console.error("Error in getCustomerProfile:", error);
    res.status(500).json({ success: false, message: error.message || "Server error, please try again." });
  }
};

/**
 * @swagger
 * /api/customer/profile/update:
 *   put:
 *     summary: Update logged-in customer's profile
 *     tags: [Customer Authentication & Management]
 *     security:
 *       - CustomerBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               houseNo:
 *                 type: string
 *               street:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               pincode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       404:
 *         description: Customer not found
 */
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
    console.error("Error in updateCustomerProfile:", error);
    res.status(500).json({ success: false, message: error.message || "Server error, please try again." });
  }
};

// ==================== ROUTES CONFIGURATION ====================
// Public Auth Routes
router.post("/register", registerCustomer);
router.post("/login", loginCustomer);
router.post("/logout", protectCustomer, logoutCustomer);

// Email Verification Routes
router.post("/verify-email", verifyEmail);
router.post("/resend-verification-otp", resendVerificationOtp);

// Forget Password Routes
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

// Protected Routes (Secured with Bearer Token & protectCustomer middleware)
router.get("/products", protectCustomer, getAllProductsForCustomer);

router.post("/wishlist/add", protectCustomer, addToWishlist);
router.delete("/wishlist/remove/:id", protectCustomer, removeFromWishlist);
router.get("/wishlist", protectCustomer, getWishlist);

router.post("/cart/add", protectCustomer, addToCart);
router.delete("/cart/remove/:id", protectCustomer, removeFromCart);
router.get("/cart", protectCustomer, getCart);

router.post("/order/create", protectCustomer, createOrder);
router.get("/orders", protectCustomer, getCustomerOrders);
router.put("/order/cancel/:id", protectCustomer, cancelOrder);

router.get("/notifications", protectCustomer, getCustomerNotifications);
router.put("/notifications/read", protectCustomer, markNotificationsAsRead);
router.put("/notifications/read/:id", protectCustomer, markSingleNotificationAsRead);
router.delete("/notifications/clear", protectCustomer, clearAllNotifications);

// Profile Routes
router.get("/profile", protectCustomer, getCustomerProfile);
router.put("/profile/update", protectCustomer, updateCustomerProfile);

module.exports = router;