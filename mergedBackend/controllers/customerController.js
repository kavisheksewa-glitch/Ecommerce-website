const Customer = require("../models/Customer");
const Notification = require("../models/Notification");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_here";

// @desc    Register a new customer
// @route   POST /api/shawls/auth/register
// @access  Public
const registerCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await Customer.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered!" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newCustomer = new Customer({
      ...req.body,
      password: hashedPassword,
    });

    const savedCustomer = await newCustomer.save();

    // Welcome Notification create karein
    await Notification.create({
      userId: savedCustomer._id,
      title: "Welcome to Kavi Shawls! 🎉",
      message: "Thank you for registering with us. Enjoy exploring our luxury collection.",
      type: "offer"
    });

    // Generate JWT Token
    const token = jwt.sign(
      { id: savedCustomer._id, email: savedCustomer.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    const customerResponse = savedCustomer.toObject();
    delete customerResponse.password;

    res.status(201).json({ 
      message: "Registration successful!", 
      token, 
      
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error, please try again." });
  }
};

// @desc    Login customer
// @route   POST /api/shawls/auth/login
// @access  Public
const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Customer.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    // Login successful hone par Notification create karein
    await Notification.create({
      userId: user._id,
      title: "Login Successful! 🔓",
      message: `Welcome back, ${user.fullName || "Customer"}! You successfully logged into your account.`,
      type: "order"
    });

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    const userObj = user.toObject();
    delete userObj.password;

    res.status(200).json({ message: "Login Successfully", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// @desc    Get all registered customers (Admin)
// @route   GET /api/shawls/auth/admin/users
// @access  Private/Admin
const getAllCustomers = async (req, res) => {
  try {
    const users = await Customer.find().select("-password").sort({ createdAt: -1 });
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error while fetching users." });
  }
};

module.exports = {
  registerCustomer,
  loginCustomer,
  getAllCustomers,
};
