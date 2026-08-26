// const Customer = require("../models/Customer");
// const Notification = require("../models/Notification");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// // Secret key for JWT
// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_here";

// // @desc    Register a new customer
// // @route   POST /api/shawls/auth/register
// // @access  Public
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

//     // Welcome Notification create karein
//     await Notification.create({
//       userId: savedCustomer._id,
//       title: "Welcome to Kavi Shawls! 🎉",
//       message: "Thank you for registering with us. Enjoy exploring our luxury collection.",
//       type: "offer"
//     });

//     // Generate JWT Token
//     const token = jwt.sign(
//       { id: savedCustomer._id, email: savedCustomer.email },
//       JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     const customerResponse = savedCustomer.toObject();
//     delete customerResponse.password;

//     res.status(201).json({ 
//       message: "Registration successful!", 
//       token, 
      
//     });
//   } catch (error) {
//     console.error("Error during registration:", error);
//     res.status(500).json({ message: "Server error, please try again." });
//   }
// };

// // @desc    Login customer
// // @route   POST /api/shawls/auth/login
// // @access  Public
// const loginCustomer = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await Customer.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid email or password!" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid email or password!" });
//     }

//     // Login successful hone par Notification create karein
//     await Notification.create({
//       userId: user._id,
//       title: "Login Successful! 🔓",
//       message: `Welcome back, ${user.fullName || "Customer"}! You successfully logged into your account.`,
//       type: "order"
//     });

//     // Generate JWT Token
//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     const userObj = user.toObject();
//     delete userObj.password;

//     res.status(200).json({ message: "Login Successfully", token });
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ message: "Server error during login" });
//   }
// };

// // @desc    Get all registered customers (Admin)
// // @route   GET /api/shawls/auth/admin/users
// // @access  Private/Admin
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




// neww



// const Customer = require("../models/Customer");
// const Notification = require("../models/Notification");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// // Secret key for JWT
// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_here";

// // @desc    Register a new customer
// // @route   POST /api/shawls/auth/register
// // @access  Public
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

//     // Welcome Notification create karein
//     await Notification.create({
//       userId: savedCustomer._id,
//       title: "Welcome to Kavi Shawls! 🎉",
//       message: "Thank you for registering with us. Enjoy exploring our luxury collection.",
//       type: "offer"
//     });

//     // Generate JWT Token
//     const token = jwt.sign(
//       { id: savedCustomer._id, email: savedCustomer.email },
//       JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     const customerResponse = savedCustomer.toObject();
//     delete customerResponse.password;

//     res.status(201).json({ 
//       message: "Registration successful!", 
//       token, 
//       user: customerResponse 
//     });
//   } catch (error) {
//     console.error("Error during registration:", error);
//     res.status(500).json({ message: "Server error, please try again." });
//   }
// };

// // @desc    Login customer
// // @route   POST /api/shawls/auth/login
// // @access  Public
// const loginCustomer = async (req, res) => {
//   try {
//     const { email, password } = req.body; // standard extraction below
//     const { email: userEmail, password: userPassword } = req.body;

//     const user = await Customer.findOne({ email: userEmail });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid email or password!" });
//     }

//     const isMatch = await bcrypt.compare(userPassword, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid email or password!" });
//     }

//     // Login successful hone par Notification create karein
//     await Notification.create({
//       userId: user._id,
//       title: "Login Successful! 🔓",
//       message: `Welcome back, ${user.fullName || "Customer"}! You successfully logged into your account.`,
//       type: "order"
//     });

//     // Generate JWT Token
//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     const userObj = user.toObject();
//     delete userObj.password;

//     // ✅ Yahan "user: userObj" bhejna zaroori hai taaki frontend `data.user._id` read kar sake
//     res.status(200).json({ 
//       message: "Login Successfully", 
//       token, 
//       user: userObj 
//     });
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ message: "Server error during login" });
//   }
// };

// // @desc    Get all registered customers (Admin)
// // @route   GET /api/shawls/auth/admin/users
// // @access  Private/Admin
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



//claude corrected office



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

//     const customerResponse = savedCustomer.toObject();
//     delete customerResponse.password;

//     res.status(201).json({ 
//       message: "Registration successful!", 
//       token, 
//       user: customerResponse 
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
//       type: "order"
//     });

//     // ✅ role add kiya
//     const token = jwt.sign(
//       { id: user._id, email: user.email, role: "customer" },
//       JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     const userObj = user.toObject();
//     delete userObj.password;

//     res.status(200).json({ 
//       message: "Login Successfully", 
//       token, 
//       // user: userObj 
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



//claude corrected corrected  office 




const Customer = require("../models/Customer");
const Notification = require("../models/Notification");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_here";

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

    await Notification.create({
      userId: savedCustomer._id,
      title: "Welcome to Kavi Shawls! 🎉",
      message: "Thank you for registering with us. Enjoy exploring our luxury collection.",
      type: "offer"
    });

    // ✅ role add kiya
    const token = jwt.sign(
      { id: savedCustomer._id, email: savedCustomer.email, role: "customer" },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 🔒 Response me ab sirf message + token — customer ka poora data nahi bheja
    res.status(201).json({
      message: "Registration successful!",
      token,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error, please try again." });
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

    await Notification.create({
      userId: user._id,
      title: "Login Successful! 🔓",
      message: `Welcome back, ${user.fullName || "Customer"}! You successfully logged into your account.`,
      type: "login"
    });

    // ✅ role add kiya
    const token = jwt.sign(
      { id: user._id, email: user.email, role: "customer" },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 🔒 Response me ab sirf message + token
    res.status(200).json({
      message: "Login Successfully",
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

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