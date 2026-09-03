// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcrypt");
// const Customer = require("../models/Customer");

// // Register -> POST /api/shawls/auth/register
// router.post("/register", async (req, res) => {
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

//     await newCustomer.save();
//     res.status(201).json({ message: "Registration successful!" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error, please try again." });
//   }
// });

// // Login -> POST /api/shawls/auth/login
// router.post("/login", async (req, res) => {
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

//     const userObj = user.toObject();
//     delete userObj.password;

//     res.status(200).json({ message: "Login Successfully", user: userObj });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error during login" });
//   }
  
// });

// module.exports = router;




// new


// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcrypt");
// const Customer = require("../models/Customer");

// // Register -> POST /api/shawls/auth/register
// router.post("/register", async (req, res) => {
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

//     await newCustomer.save();
//     res.status(201).json({ message: "Registration successful!" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error, please try again." });
//   }
// });

// // Login -> POST /api/shawls/auth/login
// router.post("/login", async (req, res) => {
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

//     const userObj = user.toObject();
//     delete userObj.password;

//     res.status(200).json({ message: "Login Successfully", user: userObj });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error during login" });
//   }
// });

// // Get all registered customers -> GET /api/shawls/auth/admin/users
// router.get("/admin/users", async (req, res) => {
//   try {
//     const users = await Customer.find().select("-password").sort({ createdAt: -1 });
//     res.status(200).json({ success: true, users });
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({ message: "Server error while fetching users." });
//   }
// });

// module.exports = router;





// newwwwwwwwwwwwwwww














// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcrypt");
// const Customer = require("../models/Customer");
// const Notification = require("../models/Notification"); // ✅ 1. Notification Model Import Karein

// // Register -> POST /api/shawls/auth/register
// router.post("/register", async (req, res) => {
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

//     const savedCustomer = await newCustomer.save(); // ✅ Saved customer ki ID lene ke liye variable me store kiya

//     // ✅ 2. Register hone par Welcome Notification create karein
//     await Notification.create({
//       userId: savedCustomer._id,
//       title: "Welcome to Kavi Shawls! 🎉",
//       message: "Thank you for registering with us. Enjoy exploring our luxury collection.",
//       type: "offer"
//     });

//     res.status(201).json({ message: "Registration successful!" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error, please try again." });
//   }
// });

// // Login -> POST /api/shawls/auth/login
// router.post("/login", async (req, res) => {
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

//     // ✅ 3. Login successful hone par Notification create karein
//     await Notification.create({
//       userId: user._id,
//       title: "Login Successful! 🔓",
//       message: `Welcome back, ${user.name || "Customer"}! You successfully logged into your account.`,
//       type: "order"
//     });

//     const userObj = user.toObject();
//     delete userObj.password;

//     res.status(200).json({ message: "Login Successfully", user: userObj });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error during login" });
//   }
// });

// // Get all registered customers -> GET /api/shawls/auth/admin/users
// router.get("/admin/users", async (req, res) => {
//   try {
//     const users = await Customer.find().select("-password").sort({ createdAt: -1 });
//     res.status(200).json({ success: true, users });
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({ message: "Server error while fetching users." });
//   }
// });

// module.exports = router;






// swagger



// const express = require("express");
// const router = express.Router();
// const {
//   registerCustomer,
//   loginCustomer,
//   getAllCustomers,
// } = require("../controllers/customerController");

// /**
//  * @swagger
//  * tags:
//  *   name: customer login and register
//  *   description: customer login and register management APIs
//  */

// /**
//  * @swagger
//  * components:
//  *   securitySchemes:
//  *     BearerAuth:
//  *       type: http
//  *       scheme: bearer
//  *       bearerFormat: JWT
//  *       description: Enter your JWT token in the format (e.g. Bearer <token>)
//  *   schemas:
//  *     Customer:
//  *       type: object
//  *       properties:
//  *         _id:
//  *           type: string
//  *           example: "60d0fe4f5311236168a109ca"
//  *         fullName:
//  *           type: string
//  *           example: "Rahul Sharma"
//  *         email:
//  *           type: string
//  *           example: "rahul@gmail.com"
//  *         mobile:
//  *           type: string
//  *           example: "9876543210"
//  *         dob:
//  *           type: string
//  *           example: "15-08-1995"
//  *         houseNo:
//  *           type: string
//  *           example: "Flat 402"
//  *         street:
//  *           type: string
//  *           example: "Main Market Road"
//  *         city:
//  *           type: string
//  *           example: "Amritsar"
//  *         state:
//  *           type: string
//  *           example: "Punjab"
//  *         pincode:
//  *           type: string
//  *           example: "143001"
//  *         country:
//  *           type: string
//  *           example: "India"
//  *         createdAt:
//  *           type: string
//  *           format: date-time
//  */

// /**
//  * @swagger
//  * /api/shawls/auth/register:
//  *   post:
//  *     summary: Register a new customer
//  *     description: Registers a new customer account, hashes the password, sends a welcome notification, and returns a JWT token.
//  *     tags: [customer login and register]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - fullName
//  *               - email
//  *               - mobile
//  *               - dob
//  *               - password
//  *               - houseNo
//  *               - street
//  *               - city
//  *               - state
//  *               - pincode
//  *             properties:
//  *               fullName:
//  *                 type: string
//  *                 example: "Rahul Sharma"
//  *               email:
//  *                 type: string
//  *                 example: "rahul@gmail.com"
//  *               mobile:
//  *                 type: string
//  *                 example: "9876543210"
//  *               dob:
//  *                 type: string
//  *                 example: "15-08-1995"
//  *               password:
//  *                 type: string
//  *                 example: "password123"
//  *               houseNo:
//  *                 type: string
//  *                 example: "Flat 402"
//  *               street:
//  *                 type: string
//  *                 example: "Main Market Road"
//  *               city:
//  *                 type: string
//  *                 example: "Amritsar"
//  *               state:
//  *                 type: string
//  *                 example: "Punjab"
//  *               pincode:
//  *                 type: string
//  *                 example: "143001"
//  *     responses:
//  *       '201':
//  *         description: Registration successful with JWT Token
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Registration successful!"
//  *                 token:
//  *                   type: string
//  *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
//  *       '400':
//  *         description: Email is already registered
//  *       '500':
//  *         description: Server error
//  */
// router.post("/register", registerCustomer);

// /**
//  * @swagger
//  * /api/shawls/auth/login:
//  *   post:
//  *     summary: Login customer
//  *     description: Authenticates customer credentials, creates a login notification, and returns a JWT token.
//  *     tags: [customer login and register]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *               - password
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 example: "rahul@gmail.com"
//  *               password:
//  *                 type: string
//  *                 example: "password123"
//  *     responses:
//  *       '200':
//  *         description: Login successful with JWT Token
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Login Successfully"
//  *                 token:
//  *                   type: string
//  *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
//  *                 user:
//  *                   $ref: '#/components/schemas/Customer'
//  *       '400':
//  *         description: Invalid email or password
//  *       '500':
//  *         description: Server error during login
//  */
// router.post("/login", loginCustomer);

// /**
//  * @swagger
//  * /api/shawls/auth/admin/users:
//  *   get:
//  *     summary: Get all registered customers (Admin)
//  *     description: Retrieves a list of all customers excluding their passwords, sorted by latest first.
//  *     tags: [customer login and register]
//  *     responses:
//  *       '200':
//  *         description: List of users fetched successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                   example: true
//  *                 users:
//  *                   type: array
//  *                   items:
//  *                     $ref: '#/components/schemas/Customer'
//  *       '500':
//  *         description: Server error while fetching users
//  */
// router.get("/admin/users", getAllCustomers);

// module.exports = router;




// new sahi




// const express = require("express");
// const router = express.Router();
// const Customer = require("../models/Customer");
// const Notification = require("../models/Notification");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_here";

// // @desc    Register a new customer
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
//       { id: savedCustomer._id, email: savedCustomer.email },
//       JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     const customerResponse = savedCustomer.toObject();
//     delete customerResponse.password;

//     // Set Token in Cookie
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "strict",
//       maxAge: 24 * 60 * 60 * 1000,
//     });

//     res.status(201).json({ 
//       message: "Registration successful!", 
//       user: customerResponse 
//     });
//   } catch (error) {
//     console.error("Error during registration:", error);
//     res.status(500).json({ message: "Server error, please try again." });
//   }
// };

// // @desc    Login customer
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

//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     const userObj = user.toObject();
//     delete userObj.password;

//     // Set Token in Cookie
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "strict",
//       maxAge: 24 * 60 * 60 * 1000,
//     });

//     res.status(200).json({ 
//       message: "Login Successfully", 
//       user: userObj 
//     });
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ message: "Server error during login" });
//   }
// };

// // @desc    Logout customer
// const logoutCustomer = async (req, res) => {
//   try {
//     res.clearCookie("token", {
//       httpOnly: true,
//       sameSite: "strict",
//     });
//     res.status(200).json({ message: "Logged out successfully" });
//   } catch (error) {
//     console.error("Error during logout:", error);
//     res.status(500).json({ message: "Server error during logout" });
//   }
// };

// // @desc    Get all registered customers (Admin)
// const getAllCustomers = async (req, res) => {
//   try {
//     const users = await Customer.find().select("-password").sort({ createdAt: -1 });
//     res.status(200).json({ success: true, users });
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({ message: "Server error while fetching users." });
//   }
// };

// // 👇 Routes define kiye gaye hain taaki server par endpoints chal sakein
// router.post("/register", registerCustomer);
// router.post("/login", loginCustomer);
// router.post("/logout", logoutCustomer);
// router.get("/all", getAllCustomers);

// // 👇 Yahan router export kiya gaya hai jo server.js mein require ho raha hai
// module.exports = router;




////neew saha wala



// const express = require("express");
// const router = express.Router();
// const Customer = require("../models/Customer");
// const Notification = require("../models/Notification");
// const Wishlist = require("../models/Wishlist");
// const Cart = require("../models/Cart");
// const Order = require("../models/Order");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { protectCustomer } = require("../middleware/customerMiddleware");

// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_here";

// /**
//  * @swagger
//  * tags:
//  *   name: Customer Authentication & Management
//  *   description: Customer APIs for Auth, Cart, Wishlist, and Orders
//  */

// /**
//  * @swagger
//  * components:
//  *   securitySchemes:
//  *     BearerAuth:
//  *       type: http
//  *       scheme: bearer
//  *       bearerFormat: JWT
//  *       description: Enter your JWT token in the format (e.g. Bearer <token>)
//  */

// // ==================== AUTH CONTROLLERS ====================

// /**
//  * @swagger
//  * /api/customer/register:
//  *   post:
//  *     summary: Register a new customer
//  *     tags: [Customer Authentication & Management]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *               - password
//  *               - fullName
//  *               - mobile
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 example: "customer@gmail.com"
//  *               password:
//  *                 type: string
//  *                 example: "password123"
//  *               fullName:
//  *                 type: string
//  *                 example: "Rahul Sharma"
//  *               mobile:
//  *                 type: string
//  *                 example: "9876543210"
//  *     responses:
//  *       201:
//  *         description: Registration successful
//  *       400:
//  *         description: Email is already registered
//  */
// const registerCustomer = async (req, res) => {
//   try {
//     const { 
//       fullName, 
//       email, 
//       mobile, 
//       dob, 
//       password, 
//       houseNo, 
//       street, 
//       city, 
//       state, 
//       pincode, 
//       country 
//     } = req.body;

//     const existingUser = await Customer.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email is already registered!" });
//     }

//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     const newCustomer = new Customer({
//       fullName,
//       email,
//       mobile,
//       dob,
//       password: hashedPassword,
//       houseNo,
//       street,
//       city,
//       state,
//       pincode,
//       country: country || "India"
//     });

//     const savedCustomer = await newCustomer.save();

//     await Notification.create({
//       userId: savedCustomer._id,
//       title: "Welcome to Kavi Shawls! 🎉",
//       message: "Thank you for registering with us. Enjoy exploring our luxury collection.",
//       type: "offer"
//     });

//     const token = jwt.sign(
//       { id: savedCustomer._id, email: savedCustomer.email },
//       JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     const customerResponse = savedCustomer.toObject();
//     delete customerResponse.password;

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "strict",
//       maxAge: 24 * 60 * 60 * 1000,
//     });

//     res.status(201).json({ 
//       message: "Registration successful!", 
//       token,
//       user: customerResponse 
//     });
//   } catch (error) {
//     console.error("Error during registration:", error);
//     res.status(500).json({ message: error.message || "Server error, please try again." });
//   }
// };
// /**
//  * @swagger
//  * /api/customer/login:
//  *   post:
//  *     summary: Customer Login
//  *     tags: [Customer Authentication & Management]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *               - password
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 example: "customer@gmail.com"
//  *               password:
//  *                 type: string
//  *                 example: "password123"
//  *     responses:
//  *       200:
//  *         description: Login Successfully with JWT Token
//  *       400:
//  *         description: Invalid email or password
//  */
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

//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     const userObj = user.toObject();
//     delete userObj.password;

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "strict",
//       maxAge: 24 * 60 * 60 * 1000,
//     });

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

// /**
//  * @swagger
//  * /api/customer/logout:
//  *   post:
//  *     summary: Customer Logout
//  *     tags: [Customer Authentication & Management]
//  *     responses:
//  *       200:
//  *         description: Logged out successfully
//  */
// const logoutCustomer = async (req, res) => {
//   try {
//     res.clearCookie("token", {
//       httpOnly: true,
//       sameSite: "strict",
//     });
//     res.status(200).json({ message: "Logged out successfully" });
//   } catch (error) {
//     console.error("Error during logout:", error);
//     res.status(500).json({ message: "Server error during logout" });
//   }
// };

// // ==================== WISHLIST CONTROLLERS ====================

// /**
//  * @swagger
//  * /api/customer/wishlist/add:
//  *   post:
//  *     summary: Add product to wishlist
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - BearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - productId
//  *               - title
//  *               - price
//  *               - image
//  *             properties:
//  *               productId:
//  *                 type: string
//  *               title:
//  *                 type: string
//  *               description:
//  *                 type: string
//  *               price:
//  *                 type: string
//  *               originalPrice:
//  *                 type: string
//  *               discount:
//  *                 type: string
//  *               image:
//  *                 type: string
//  *     responses:
//  *       201:
//  *         description: Added to wishlist successfully
//  *       401:
//  *         description: Not authorized
//  */
// const addToWishlist = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { productId, title, description, price, originalPrice, discount, image } = req.body;

//     const existingWishlist = await Wishlist.findOne({ userId, productId });
//     if (existingWishlist) {
//       return res.status(400).json({ success: false, message: "Product already in wishlist" });
//     }

//     const wishlistItem = new Wishlist({
//       userId,
//       productId,
//       title,
//       description,
//       price,
//       originalPrice,
//       discount,
//       image,
//     });

//     await wishlistItem.save();
//     res.status(201).json({ success: true, message: "Added to wishlist successfully", wishlistItem });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/wishlist/remove/{id}:
//  *   delete:
//  *     summary: Remove item from wishlist
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - BearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Wishlist item ID
//  *     responses:
//  *       200:
//  *         description: Removed from wishlist successfully
//  *       404:
//  *         description: Item not found
//  */
// const removeFromWishlist = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { id } = req.params;

//     const deletedItem = await Wishlist.findOneAndDelete({ _id: id, userId });
//     if (!deletedItem) {
//       return res.status(404).json({ success: false, message: "Item not found in wishlist" });
//     }

//     res.status(200).json({ success: true, message: "Removed from wishlist successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/wishlist:
//  *   get:
//  *     summary: Get customer wishlist items
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - BearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Wishlist fetched successfully
//  */
// const getWishlist = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const wishlist = await Wishlist.find({ userId });
//     res.status(200).json({ success: true, count: wishlist.length, wishlist });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ==================== CART CONTROLLERS ====================

// /**
//  * @swagger
//  * /api/customer/cart/add:
//  *   post:
//  *     summary: Add product to cart
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - BearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - productId
//  *               - title
//  *               - price
//  *             properties:
//  *               productId:
//  *                 type: string
//  *               title:
//  *                 type: string
//  *               description:
//  *                 type: string
//  *               price:
//  *                 type: string
//  *               image:
//  *                 type: string
//  *               quantity:
//  *                 type: number
//  *     responses:
//  *       201:
//  *         description: Added to cart successfully
//  */
// const addToCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { productId, title, description, price, image, quantity } = req.body;

//     let cartItem = await Cart.findOne({ userId, productId });
//     if (cartItem) {
//       cartItem.quantity += quantity || 1;
//       await cartItem.save();
//       return res.status(200).json({ success: true, message: "Cart quantity updated", cartItem });
//     }

//     cartItem = new Cart({
//       userId,
//       productId,
//       title,
//       description,
//       price,
//       image,
//       quantity: quantity || 1,
//     });

//     await cartItem.save();
//     res.status(201).json({ success: true, message: "Added to cart successfully", cartItem });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/cart/remove/{id}:
//  *   delete:
//  *     summary: Remove item from cart
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - BearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Cart item ID
//  *     responses:
//  *       200:
//  *         description: Removed from cart successfully
//  */
// const removeFromCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { id } = req.params;

//     const deletedItem = await Cart.findOneAndDelete({ _id: id, userId });
//     if (!deletedItem) {
//       return res.status(404).json({ success: false, message: "Item not found in cart" });
//     }

//     res.status(200).json({ success: true, message: "Removed from cart successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/cart:
//  *   get:
//  *     summary: Get customer cart items
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - BearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Cart items fetched successfully
//  */
// const getCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const cart = await Cart.find({ userId });
//     res.status(200).json({ success: true, count: cart.length, cart });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ==================== ORDER CONTROLLERS ====================

// /**
//  * @swagger
//  * /api/customer/order/create:
//  *   post:
//  *     summary: Create a new order
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - BearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - productId
//  *               - productTitle
//  *               - price
//  *               - quantity
//  *               - totalAmount
//  *               - fullName
//  *               - phone
//  *               - address
//  *               - paymentMethod
//  *               - sellerId
//  *             properties:
//  *               productId:
//  *                 type: string
//  *               productTitle:
//  *                 type: string
//  *               productImage:
//  *                 type: string
//  *               price:
//  *                 type: number
//  *               quantity:
//  *                 type: number
//  *               totalAmount:
//  *                 type: number
//  *               fullName:
//  *                 type: string
//  *               phone:
//  *                 type: string
//  *               address:
//  *                 type: string
//  *               paymentMethod:
//  *                 type: string
//  *                 enum: ["Cash on Delivery", "Online Payment (Razorpay)"]
//  *               paymentStatus:
//  *                 type: string
//  *               razorpayPaymentId:
//  *                 type: string
//  *               sellerId:
//  *                 type: string
//  *     responses:
//  *       201:
//  *         description: Order created successfully
//  */
// const createOrder = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const {
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
//       sellerId
//     } = req.body;

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
//       sellerId,
//     });

//     const savedOrder = await newOrder.save();

//     await Notification.create({
//       userId,
//       title: "Order Placed Successfully! 📦",
//       message: `Your order for ${productTitle} has been placed successfully.`,
//       type: "order"
//     });

//     res.status(201).json({ success: true, message: "Order created successfully", order: savedOrder });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/orders:
//  *   get:
//  *     summary: Get all orders of logged-in customer
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - BearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Orders fetched successfully
//  */
// const getCustomerOrders = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const orders = await Order.find({ userId }).sort({ createdAt: -1 });
//     res.status(200).json({ success: true, count: orders.length, orders });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ==================== ROUTES CONFIGURATION ====================
// // Public Routes
// router.post("/register", registerCustomer);
// router.post("/login", loginCustomer);
// router.post("/logout", logoutCustomer);

// // Protected Routes (Uses protectCustomer middleware)
// router.post("/wishlist/add", protectCustomer, addToWishlist);
// router.delete("/wishlist/remove/:id", protectCustomer, removeFromWishlist);
// router.get("/wishlist", protectCustomer, getWishlist);

// router.post("/cart/add", protectCustomer, addToCart);
// router.delete("/cart/remove/:id", protectCustomer, removeFromCart);
// router.get("/cart", protectCustomer, getCart);

// router.post("/order/create", protectCustomer, createOrder);
// router.get("/orders", protectCustomer, getCustomerOrders);

// module.exports = router;








//morning




// const express = require("express");
// const router = express.Router();
// const Customer = require("../models/Customer");
// const SellerProduct = require("../models/SellerProduct");
// const Notification = require("../models/Notification");
// const Wishlist = require("../models/Wishlist");
// const Cart = require("../models/Cart");
// const Order = require("../models/Order");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { protectCustomer } = require("../middleware/customerMiddleware");

// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_here";

// /**
//  * @swagger
//  * tags:
//  *   name: Customer Authentication & Management
//  *   description: Customer APIs for Auth, Cart, Wishlist, Orders, and Notifications
//  */

// /**
//  * @swagger
//  * components:
//  *   securitySchemes:
//  *     BearerAuth:
//  *       type: http
//  *       scheme: bearer
//  *       bearerFormat: JWT
//  *       description: Enter your JWT token in the format (e.g. Bearer <token>)
//  */

// // ==================== AUTH CONTROLLERS ====================

// /**
//  * @swagger
//  * /api/customer/register:
//  *   post:
//  *     summary: Register a new customer
//  *     tags: [Customer Authentication & Management]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *               - password
//  *               - fullName
//  *               - mobile
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 example: "customer1@gmail.com"
//  *               password:
//  *                 type: string
//  *                 example: "password1123"
//  *               fullName:
//  *                 type: string
//  *                 example: "Rahull Sharma"
//  *               mobile:
//  *                 type: string
//  *                 example: "9876533210"
//  *     responses:
//  *       201:
//  *         description: Registration successful
//  *       400:
//  *         description: Email is already registered
//  */
// const registerCustomer = async (req, res) => {
//   try {
//     const { 
//       fullName, 
//       email, 
//       mobile, 
//       dob, 
//       password, 
//       houseNo, 
//       street, 
//       city, 
//       state, 
//       pincode, 
//       country 
//     } = req.body;

//     const existingUser = await Customer.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email is already registered!" });
//     }

//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     const newCustomer = new Customer({
//       fullName,
//       email,
//       mobile,
//       dob,
//       password: hashedPassword,
//       houseNo,
//       street,
//       city,
//       state,
//       pincode,
//       country: country || "India"
//     });

//     const savedCustomer = await newCustomer.save();

//     await Notification.create({
//       userId: savedCustomer._id,
//       title: "Welcome to Kavi Shawls! 🎉",
//       message: "Thank you for registering with us. Enjoy exploring our luxury collection.",
//       type: "offer"
//     });

//     const token = jwt.sign(
//       { id: savedCustomer._id, email: savedCustomer.email },
//       JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     const customerResponse = savedCustomer.toObject();
//     delete customerResponse.password;

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "strict",
//       maxAge: 24 * 60 * 60 * 1000,
//     });

//     res.status(201).json({ 
//       message: "Registration successful!", 
//       token,
//       user: customerResponse 
//     });
//   } catch (error) {
//     console.error("Error during registration:", error);
//     res.status(500).json({ message: error.message || "Server error, please try again." });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/login:
//  *   post:
//  *     summary: Customer Login
//  *     tags: [Customer Authentication & Management]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *               - password
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 example: "customer1@gmail.com"
//  *               password:
//  *                 type: string
//  *                 example: "password1123"
//  *     responses:
//  *       200:
//  *         description: Login Successfully with JWT Token
//  *       400:
//  *         description: Invalid email or password
//  */
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

//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     const userObj = user.toObject();
//     delete userObj.password;

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "strict",
//       maxAge: 24 * 60 * 60 * 1000,
//     });

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

// /**
//  * @swagger
//  * /api/customer/logout:
//  *   post:
//  *     summary: Customer Logout
//  *     tags: [Customer Authentication & Management]
//  *     responses:
//  *       200:
//  *         description: Logged out successfully
//  */
// const logoutCustomer = async (req, res) => {
//   try {
//     res.clearCookie("token", {
//       httpOnly: true,
//       sameSite: "strict",
//     });
//     res.status(200).json({ message: "Logged out successfully" });
//   } catch (error) {
//     console.error("Error during logout:", error);
//     res.status(500).json({ message: "Server error during logout" });
//   }
// };

// // ==================== PRODUCT CONTROLLERS ====================

// /**
//  * @swagger
//  * /api/customer/products:
//  *   get:
//  *     summary: Get all products for customers
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - BearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Products fetched successfully
//  *       401:
//  *         description: Unauthorized / Token missing or invalid
//  */
// const getAllProductsForCustomer = async (req, res) => {
//   try {
//     const products = await SellerProduct.find({});
//     res.status(200).json({ success: true, count: products.length, products });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ==================== WISHLIST CONTROLLERS ====================

// /**
//  * @swagger
//  * /api/customer/wishlist/add:
//  *   post:
//  *     summary: Add product to wishlist
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - BearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - productId
//  *               - title
//  *               - price
//  *               - image
//  *             properties:
//  *               productId:
//  *                 type: string
//  *               title:
//  *                 type: string
//  *               description:
//  *                 type: string
//  *               price:
//  *                 type: string
//  *               discount:
//  *                 type: string
//  *               image:
//  *                 type: string
//  *     responses:
//  *       201:
//  *         description: Added to wishlist successfully
//  *       401:
//  *         description: Not authorized
//  */
// const addToWishlist = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { productId, title, description, price, originalPrice, discount, image } = req.body;

//     const existingWishlist = await Wishlist.findOne({ userId, productId });
//     if (existingWishlist) {
//       return res.status(400).json({ success: false, message: "Product already in wishlist" });
//     }

//     const wishlistItem = new Wishlist({
//       userId,
//       productId,
//       title,
//       description,
//       price,
//       originalPrice,
//       discount,
//       image,
//     });

//     await wishlistItem.save();

//     await Notification.create({
//       userId,
//       productId,
//       title: "Added to Wishlist ❤️",
//       message: `"${title || 'Product'}" has been added to your wishlist.`,
//       type: "offer"
//     });

//     res.status(201).json({ success: true, message: "Added to wishlist successfully", wishlistItem });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/wishlist/remove/{id}:
//  *   delete:
//  *     summary: Remove item from wishlist
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - BearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Wishlist item ID
//  *     responses:
//  *       200:
//  *         description: Removed from wishlist successfully
//  *       404:
//  *         description: Item not found
//  */
// const removeFromWishlist = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { id } = req.params;

//     const deletedItem = await Wishlist.findOneAndDelete({ _id: id, userId });
//     if (!deletedItem) {
//       return res.status(404).json({ success: false, message: "Item not found in wishlist" });
//     }

//     await Notification.create({
//       userId,
//       productId: deletedItem.productId,
//       title: "Removed from Wishlist ❌",
//       message: `"${deletedItem.title || 'Product'}" was removed from your wishlist.`,
//       type: "offer"
//     });

//     res.status(200).json({ success: true, message: "Removed from wishlist successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/wishlist:
//  *   get:
//  *     summary: Get customer wishlist items
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - BearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Wishlist fetched successfully
//  */
// const getWishlist = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const wishlist = await Wishlist.find({ userId });
//     res.status(200).json({ success: true, count: wishlist.length, wishlist });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ==================== CART CONTROLLERS ====================

// /**
//  * @swagger
//  * /api/customer/cart/add:
//  *   post:
//  *     summary: Add product to cart
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - BearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - productId
//  *               - title
//  *               - price
//  *             properties:
//  *               productId:
//  *                 type: string
//  *               title:
//  *                 type: string
//  *               description:
//  *                 type: string
//  *               price:
//  *                 type: string
//  *               image:
//  *                 type: string
//  *               quantity:
//  *                 type: number
//  *               sellerId:
//  *                 type: string
//  *     responses:
//  *       201:
//  *         description: Added to cart successfully
//  */
// const addToCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     // 👇 Yahan req.body se sellerId bhi extract kar li hai
//     const { productId, title, description, price, image, quantity, sellerId } = req.body;

//     let cartItem = await Cart.findOne({ userId, productId });
//     if (cartItem) {
//       cartItem.quantity += quantity || 1;
//       // Agar update karte waqt bhi sellerId update karni ho
//       if (sellerId) cartItem.sellerId = sellerId;
//       await cartItem.save();

//       await Notification.create({
//         userId,
//         productId,
//         title: "Cart Updated 🛒",
//         message: `Quantity for "${title || 'Product'}" was updated in your cart.`,
//         type: "order"
//       });

//       return res.status(200).json({ success: true, message: "Cart quantity updated", cartItem });
//     }

//     cartItem = new Cart({
//       userId,
//       productId,
//       title,
//       description,
//       price,
//       image,
//       quantity: quantity || 1,
//       sellerId, // 👈 Yahan sellerId database me save ho rahi hai
//     });

//     await cartItem.save();

//     await Notification.create({
//       userId,
//       productId,
//       title: "Added to Cart 🛍️",
//       message: `"${title || 'Product'}" has been successfully added to your shopping cart.`,
//       type: "order"
//     });

//     res.status(201).json({ success: true, message: "Added to cart successfully", cartItem });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// /**
//  * @swagger
//  * /api/customer/cart/remove/{id}:
//  *   delete:
//  *     summary: Remove item from cart
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - BearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Cart item ID
//  *     responses:
//  *       200:
//  *         description: Removed from cart successfully
//  */
// const removeFromCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { id } = req.params;

//     const deletedItem = await Cart.findOneAndDelete({ _id: id, userId });
//     if (!deletedItem) {
//       return res.status(404).json({ success: false, message: "Item not found in cart" });
//     }

//     await Notification.create({
//       userId,
//       productId: deletedItem.productId,
//       title: "Removed from Cart 🗑️",
//       message: `"${deletedItem.title || 'Product'}" has been removed from your cart.`,
//       type: "order"
//     });

//     res.status(200).json({ success: true, message: "Removed from cart successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/cart:
//  *   get:
//  *     summary: Get customer cart items
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - BearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Cart items fetched successfully
//  */
// const getCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const cart = await Cart.find({ userId });
//     res.status(200).json({ success: true, count: cart.length, cart });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ==================== ORDER CONTROLLERS ====================

// /**
//  * @swagger
//  * /api/customer/order/create:
//  *   post:
//  *     summary: Create a new order
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - BearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - productId
//  *               - productTitle
//  *               - price
//  *               - quantity
//  *               - totalAmount
//  *               - fullName
//  *               - phone
//  *               - address
//  *               - paymentMethod
//  *               - sellerId
//  *             properties:
//  *               productId:
//  *                 type: string
//  *               productTitle:
//  *                 type: string
//  *               productImage:
//  *                 type: string
//  *               price:
//  *                 type: number
//  *               quantity:
//  *                 type: number
//  *               totalAmount:
//  *                 type: number
//  *               fullName:
//  *                 type: string
//  *               phone:
//  *                 type: string
//  *               address:
//  *                 type: string
//  *               paymentMethod:
//  *                 type: string
//  *                 enum: ["Cash on Delivery", "Online Payment (Razorpay)"]
//  *               paymentStatus:
//  *                 type: string
//  *               razorpayPaymentId:
//  *                 type: string
//  *               sellerId:
//  *                 type: string
//  *     responses:
//  *       201:
//  *         description: Order created successfully
//  */
// const createOrder = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const {
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
//       sellerId
//     } = req.body;

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
//       sellerId,
//     });

//     const savedOrder = await newOrder.save();

//     await Notification.create({
//       userId,
//       productId,
//       title: "Order Placed Successfully! 📦",
//       message: `Your order for ${productTitle} has been placed successfully.`,
//       type: "order"
//     });

//     res.status(201).json({ success: true, message: "Order created successfully", order: savedOrder });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/orders:
//  *   get:
//  *     summary: Get all orders of logged-in customer
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - BearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Orders fetched successfully
//  */
// const getCustomerOrders = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const orders = await Order.find({ userId }).sort({ createdAt: -1 });
//     res.status(200).json({ success: true, count: orders.length, orders });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ==================== NOTIFICATION CONTROLLERS ====================

// /**
//  * @swagger
//  * /api/customer/notifications:
//  *   get:
//  *     summary: Get all notifications for logged-in customer
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - BearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Notifications fetched successfully
//  */
// const getCustomerNotifications = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
//     res.status(200).json({ success: true, count: notifications.length, notifications });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/notifications/read:
//  *   put:
//  *     summary: Mark all notifications as read
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - BearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Notifications marked as read
//  */
// const markNotificationsAsRead = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     await Notification.updateMany({ userId, read: false }, { $set: { read: true } });
//     res.status(200).json({ success: true, message: "Notifications marked as read" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ==================== ROUTES CONFIGURATION ====================
// // Public Routes
// router.post("/register", registerCustomer);
// router.post("/login", loginCustomer);
// router.post("/logout", logoutCustomer);

// // Protected Routes (Secured with Bearer Token & protectCustomer middleware)
// router.get("/products", protectCustomer, getAllProductsForCustomer);

// router.post("/wishlist/add", protectCustomer, addToWishlist);
// router.delete("/wishlist/remove/:id", protectCustomer, removeFromWishlist);
// router.get("/wishlist", protectCustomer, getWishlist);

// router.post("/cart/add", protectCustomer, addToCart);
// router.delete("/cart/remove/:id", protectCustomer, removeFromCart);
// router.get("/cart", protectCustomer, getCart);

// router.post("/order/create", protectCustomer, createOrder);
// router.get("/orders", protectCustomer, getCustomerOrders);

// router.get("/notifications", protectCustomer, getCustomerNotifications);
// router.put("/notifications/read", protectCustomer, markNotificationsAsRead);

// module.exports = router;



//claude corrected office



// const express = require("express");
// const router = express.Router();
// const Customer = require("../models/Customer");
// const SellerProduct = require("../models/SellerProduct");
// const Notification = require("../models/Notification");
// const Wishlist = require("../models/Wishlist");
// const Cart = require("../models/Cart");
// const Order = require("../models/Order");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { protectCustomer } = require("../middleware/customerMiddleware");

// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_here";

// /**
//  * @swagger
//  * tags:
//  *   name: Customer Authentication & Management
//  *   description: Customer APIs for Auth, Cart, Wishlist, Orders, and Notifications
//  */

// /**
//  * @swagger
//  * components:
//  *   securitySchemes:
//  *     CustomerBearerAuth:
//  *       type: http
//  *       scheme: bearer
//  *       bearerFormat: JWT
//  *       description: Enter your JWT token in the format (e.g. Bearer <token>)
//  */

// // ==================== AUTH CONTROLLERS ====================

// /**
//  * @swagger
//  * /api/customer/register:
//  *   post:
//  *     summary: Register a new customer
//  *     tags: [Customer Authentication & Management]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *               - password
//  *               - fullName
//  *               - mobile
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 example: "customer1@gmail.com"
//  *               password:
//  *                 type: string
//  *                 example: "password1123"
//  *               fullName:
//  *                 type: string
//  *                 example: "Rahull Sharma"
//  *               mobile:
//  *                 type: string
//  *                 example: "9876533210"
//  *     responses:
//  *       201:
//  *         description: Registration successful
//  *       400:
//  *         description: Email is already registered
//  */
// const registerCustomer = async (req, res) => {
//   try {
//     const {
//       fullName,
//       email,
//       mobile,
//       dob,
//       password,
//       houseNo,
//       street,
//       city,
//       state,
//       pincode,
//       country,
//     } = req.body;

//     const existingUser = await Customer.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email is already registered!" });
//     }

//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     const newCustomer = new Customer({
//       fullName,
//       email,
//       mobile,
//       dob,
//       password: hashedPassword,
//       houseNo,
//       street,
//       city,
//       state,
//       pincode,
//       country: country || "India",
//     });

//     const savedCustomer = await newCustomer.save();

//     await Notification.create({
//       userId: savedCustomer._id,
//       title: "Welcome to Kavi Shawls! 🎉",
//       message: "Thank you for registering with us. Enjoy exploring our luxury collection.",
//       type: "regist",
//     });

//     // ✅ role add kiya
//     const token = jwt.sign(
//       { id: savedCustomer._id, email: savedCustomer.email, role: "customer" },
//       JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     const customerResponse = savedCustomer.toObject();
//     delete customerResponse.password;

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "strict",
//       maxAge: 24 * 60 * 60 * 1000,
//     });

//     res.status(201).json({
//       message: "Registration successful!",
//       token,
//       user: customerResponse,
//     });
//   } catch (error) {
//     console.error("Error during registration:", error);
//     res.status(500).json({ message: error.message || "Server error, please try again." });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/login:
//  *   post:
//  *     summary: Customer Login
//  *     tags: [Customer Authentication & Management]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *               - password
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 example: "customer1@gmail.com"
//  *               password:
//  *                 type: string
//  *                 example: "password1123"
//  *     responses:
//  *       200:
//  *         description: Login Successfully with JWT Token
//  *       400:
//  *         description: Invalid email or password
//  */
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
//       type: "order",
//     });

//     // ✅ role add kiya
//     const token = jwt.sign(
//       { id: user._id, email: user.email, role: "customer" },
//       JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     const userObj = user.toObject();
//     delete userObj.password;

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "strict",
//       maxAge: 24 * 60 * 60 * 1000,
//     });

//     res.status(200).json({
//       message: "Login Successfully",
//       token,
//       user: userObj,
//     });
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ message: "Server error during login" });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/logout:
//  *   post:
//  *     summary: Customer Logout
//  *     tags: [Customer Authentication & Management]
//  *     responses:
//  *       200:
//  *         description: Logged out successfully
//  */
// const logoutCustomer = async (req, res) => {
//   try {
//     res.clearCookie("token", {
//       httpOnly: true,
//       sameSite: "strict",
//     });
//     res.status(200).json({ message: "Logged out successfully" });
//   } catch (error) {
//     console.error("Error during logout:", error);
//     res.status(500).json({ message: "Server error during logout" });
//   }
// };

// // ==================== PRODUCT CONTROLLERS ====================

// /**
//  * @swagger
//  * /api/customer/products:
//  *   get:
//  *     summary: Get all products for customers
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - CustomerBearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Products fetched successfully
//  *       401:
//  *         description: Unauthorized / Token missing or invalid
//  */
// const getAllProductsForCustomer = async (req, res) => {
//   try {
//     const products = await SellerProduct.find({});
//     res.status(200).json({ success: true, count: products.length, products });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ==================== WISHLIST CONTROLLERS ====================

// /**
//  * @swagger
//  * /api/customer/wishlist/add:
//  *   post:
//  *     summary: Add product to wishlist
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - CustomerBearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - productId
//  *               - title
//  *               - price
//  *               - image
//  *             properties:
//  *               productId:
//  *                 type: string
//  *               title:
//  *                 type: string
//  *               description:
//  *                 type: string
//  *               price:
//  *                 type: string
//  *               discount:
//  *                 type: string
//  *               image:
//  *                 type: string
//  *     responses:
//  *       201:
//  *         description: Added to wishlist successfully
//  *       401:
//  *         description: Not authorized
//  */
// const addToWishlist = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { productId, title, description, price, originalPrice, discount, image } = req.body;

//     const existingWishlist = await Wishlist.findOne({ userId, productId });
//     if (existingWishlist) {
//       return res.status(400).json({ success: false, message: "Product already in wishlist" });
//     }

//     const wishlistItem = new Wishlist({
//       userId,
//       productId,
//       title,
//       description,
//       price,
//       originalPrice,
//       discount,
//       image,
//     });

//     await wishlistItem.save();

//     await Notification.create({
//       userId,
//       productId,
//       title: "Added to Wishlist ❤️",
//       message: `"${title || "Product"}" has been added to your wishlist.`,
//       type: "offer",
//     });

//     res.status(201).json({ success: true, message: "Added to wishlist successfully", wishlistItem });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/wishlist/remove/{id}:
//  *   delete:
//  *     summary: Remove item from wishlist
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - CustomerBearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Wishlist item ID
//  *     responses:
//  *       200:
//  *         description: Removed from wishlist successfully
//  *       404:
//  *         description: Item not found
//  */
// const removeFromWishlist = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { id } = req.params;

//     const deletedItem = await Wishlist.findOneAndDelete({ _id: id, userId });
//     if (!deletedItem) {
//       return res.status(404).json({ success: false, message: "Item not found in wishlist" });
//     }

//     await Notification.create({
//       userId,
//       productId: deletedItem.productId,
//       title: "Removed from Wishlist ❌",
//       message: `"${deletedItem.title || "Product"}" was removed from your wishlist.`,
//       type: "offer",
//     });

//     res.status(200).json({ success: true, message: "Removed from wishlist successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/wishlist:
//  *   get:
//  *     summary: Get customer wishlist items
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - CustomerBearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Wishlist fetched successfully
//  */
// const getWishlist = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const wishlist = await Wishlist.find({ userId });
//     res.status(200).json({ success: true, count: wishlist.length, wishlist });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ==================== CART CONTROLLERS ====================

// /**
//  * @swagger
//  * /api/customer/cart/add:
//  *   post:
//  *     summary: Add product to cart
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - CustomerBearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - productId
//  *               - title
//  *               - price
//  *             properties:
//  *               productId:
//  *                 type: string
//  *               title:
//  *                 type: string
//  *               description:
//  *                 type: string
//  *               price:
//  *                 type: string
//  *               image:
//  *                 type: string
//  *               quantity:
//  *                 type: number
//  *               sellerId:
//  *                 type: string
//  *     responses:
//  *       201:
//  *         description: Added to cart successfully
//  */
// const addToCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { productId, title, description, price, image, quantity, sellerId } = req.body;

//     let cartItem = await Cart.findOne({ userId, productId });
//     if (cartItem) {
//       cartItem.quantity += quantity || 1;
//       if (sellerId) cartItem.sellerId = sellerId;
//       await cartItem.save();

//       await Notification.create({
//         userId,
//         productId,
//         title: "Cart Updated 🛒",
//         message: `Quantity for "${title || "Product"}" was updated in your cart.`,
//         type: "order",
//       });

//       return res.status(200).json({ success: true, message: "Cart quantity updated", cartItem });
//     }

//     cartItem = new Cart({
//       userId,
//       productId,
//       title,
//       description,
//       price,
//       image,
//       quantity: quantity || 1,
//       sellerId,
//     });

//     await cartItem.save();

//     await Notification.create({
//       userId,
//       productId,
//       title: "Added to Cart 🛍️",
//       message: `"${title || "Product"}" has been successfully added to your shopping cart.`,
//       type: "order",
//     });

//     res.status(201).json({ success: true, message: "Added to cart successfully", cartItem });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/cart/remove/{id}:
//  *   delete:
//  *     summary: Remove item from cart
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - CustomerBearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Cart item ID
//  *     responses:
//  *       200:
//  *         description: Removed from cart successfully
//  */
// const removeFromCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { id } = req.params;

//     const deletedItem = await Cart.findOneAndDelete({ _id: id, userId });
//     if (!deletedItem) {
//       return res.status(404).json({ success: false, message: "Item not found in cart" });
//     }

//     await Notification.create({
//       userId,
//       productId: deletedItem.productId,
//       title: "Removed from Cart 🗑️",
//       message: `"${deletedItem.title || "Product"}" has been removed from your cart.`,
//       type: "order",
//     });

//     res.status(200).json({ success: true, message: "Removed from cart successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/cart:
//  *   get:
//  *     summary: Get customer cart items
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - CustomerBearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Cart items fetched successfully
//  */
// const getCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const cart = await Cart.find({ userId });
//     res.status(200).json({ success: true, count: cart.length, cart });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ==================== ORDER CONTROLLERS ====================

// /**
//  * @swagger
//  * /api/customer/order/create:
//  *   post:
//  *     summary: Create a new order
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - CustomerBearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - productId
//  *               - productTitle
//  *               - price
//  *               - quantity
//  *               - totalAmount
//  *               - fullName
//  *               - phone
//  *               - address
//  *               - paymentMethod
//  *               - sellerId
//  *             properties:
//  *               productId:
//  *                 type: string
//  *               productTitle:
//  *                 type: string
//  *               productImage:
//  *                 type: string
//  *               price:
//  *                 type: number
//  *               quantity:
//  *                 type: number
//  *               totalAmount:
//  *                 type: number
//  *               fullName:
//  *                 type: string
//  *               phone:
//  *                 type: string
//  *               address:
//  *                 type: string
//  *               paymentMethod:
//  *                 type: string
//  *                 enum: ["Cash on Delivery", "Online Payment (Razorpay)"]
//  *               paymentStatus:
//  *                 type: string
//  *               razorpayPaymentId:
//  *                 type: string
//  *               sellerId:
//  *                 type: string
//  *     responses:
//  *       201:
//  *         description: Order created successfully
//  */
// const createOrder = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const {
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
//       sellerId,
//     } = req.body;

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
//       sellerId,
//     });

//     const savedOrder = await newOrder.save();

//     await Notification.create({
//       userId,
//       productId,
//       title: "Order Placed Successfully! 📦",
//       message: `Your order for ${productTitle} has been placed successfully.`,
//       type: "order",
//     });

//     res.status(201).json({ success: true, message: "Order created successfully", order: savedOrder });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/orders:
//  *   get:
//  *     summary: Get all orders of logged-in customer
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - CustomerBearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Orders fetched successfully
//  */
// const getCustomerOrders = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const orders = await Order.find({ userId }).sort({ createdAt: -1 });
//     res.status(200).json({ success: true, count: orders.length, orders });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ==================== NOTIFICATION CONTROLLERS ====================

// /**
//  * @swagger
//  * /api/customer/notifications:
//  *   get:
//  *     summary: Get all notifications for logged-in customer
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - CustomerBearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Notifications fetched successfully
//  */
// const getCustomerNotifications = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
//     res.status(200).json({ success: true, count: notifications.length, notifications });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/notifications/read:
//  *   put:
//  *     summary: Mark all notifications as read
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - CustomerBearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Notifications marked as read
//  */
// const markNotificationsAsRead = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     await Notification.updateMany({ userId, read: false }, { $set: { read: true } });
//     res.status(200).json({ success: true, message: "Notifications marked as read" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ==================== ROUTES CONFIGURATION ====================
// // Public Routes
// router.post("/register", registerCustomer);
// router.post("/login", loginCustomer);
// router.post("/logout", logoutCustomer);

// // Protected Routes (Secured with Bearer Token & protectCustomer middleware)
// router.get("/products", protectCustomer, getAllProductsForCustomer);

// router.post("/wishlist/add", protectCustomer, addToWishlist);
// router.delete("/wishlist/remove/:id", protectCustomer, removeFromWishlist);
// router.get("/wishlist", protectCustomer, getWishlist);

// router.post("/cart/add", protectCustomer, addToCart);
// router.delete("/cart/remove/:id", protectCustomer, removeFromCart);
// router.get("/cart", protectCustomer, getCart);

// router.post("/order/create", protectCustomer, createOrder);
// router.get("/orders", protectCustomer, getCustomerOrders);

// router.get("/notifications", protectCustomer, getCustomerNotifications);
// router.put("/notifications/read", protectCustomer, markNotificationsAsRead);

// module.exports = router;



//claude corrected corrected coffice



// const express = require("express");
// const router = express.Router();
// const Customer = require("../models/Customer");
// const SellerProduct = require("../models/SellerProduct");
// const Notification = require("../models/Notification");
// const Wishlist = require("../models/Wishlist");
// const Cart = require("../models/Cart");
// const Order = require("../models/Order");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { protectCustomer } = require("../middleware/customerMiddleware");

// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_here";

// /**
//  * @swagger
//  * tags:
//  *   name: Customer Authentication & Management
//  *   description: Customer APIs for Auth, Cart, Wishlist, Orders, and Notifications
//  */

// /**
//  * @swagger
//  * components:
//  *   securitySchemes:
//  *     CustomerBearerAuth:
//  *       type: http
//  *       scheme: bearer
//  *       bearerFormat: JWT
//  *       description: Enter your JWT token in the format (e.g. Bearer <token>)
//  */

// // ==================== AUTH CONTROLLERS ====================

// /**
//  * @swagger
//  * /api/customer/register:
//  *   post:
//  *     summary: Register a new customer
//  *     tags: [Customer Authentication & Management]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *               - password
//  *               - fullName
//  *               - mobile
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 example: "customer1@gmail.com"
//  *               password:
//  *                 type: string
//  *                 example: "password1123"
//  *               fullName:
//  *                 type: string
//  *                 example: "Rahull Sharma"
//  *               mobile:
//  *                 type: string
//  *                 example: "9876533210"
//  *     responses:
//  *       201:
//  *         description: Registration successful
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Registration successful!"
//  *                 token:
//  *                   type: string
//  *                   example: "eyJhbGciOiJIUzI1Ni..."
//  *       400:
//  *         description: Email is already registered
//  */
// const registerCustomer = async (req, res) => {
//   try {
//     const {
//       fullName,
//       email,
//       mobile,
//       dob,
//       password,
//       houseNo,
//       street,
//       city,
//       state,
//       pincode,
//       country,
//     } = req.body;

//     const existingUser = await Customer.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email is already registered!" });
//     }

//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     const newCustomer = new Customer({
//       fullName,
//       email,
//       mobile,
//       dob,
//       password: hashedPassword,
//       houseNo,
//       street,
//       city,
//       state,
//       pincode,
//       country: country || "India",
//     });

//     const savedCustomer = await newCustomer.save();

//     // ⚠️ Notification banane me agar koi error aaye (e.g. schema me koi
//     // required field missing ho) to poora registration fail NAHI hona
//     // chahiye — isliye alag try/catch me isolate kiya.
//     try {
//       await Notification.create({
//         userId: savedCustomer._id,
//         title: "Welcome to Kavi Shawls! 🎉",
//         message: "Thank you for registering with us. Enjoy exploring our luxury collection.",
//         type: "offer",
//       });
//     } catch (notifyError) {
//       console.error("Notification creation failed (register):", notifyError.message);
//     }

//     // ✅ role add kiya
//     const token = jwt.sign(
//       { id: savedCustomer._id, email: savedCustomer.email, role: "customer" },
//       JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "strict",
//       maxAge: 24 * 60 * 60 * 1000,
//     });

//     // 🔒 Response me ab sirf message + token — poora customer object nahi bheja
//     res.status(201).json({
//       message: "Registration successful!",
//       token,
//     });
//   } catch (error) {
//     console.error("Error during registration:", error);
//     res.status(500).json({ message: error.message || "Server error, please try again." });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/login:
//  *   post:
//  *     summary: Customer Login
//  *     tags: [Customer Authentication & Management]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *               - password
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 example: "customer1@gmail.com"
//  *               password:
//  *                 type: string
//  *                 example: "password1123"
//  *     responses:
//  *       200:
//  *         description: Login Successfully with JWT Token
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Login Successfully"
//  *                 token:
//  *                   type: string
//  *                   example: "eyJhbGciOiJIUzI1Ni..."
//  *       400:
//  *         description: Invalid email or password
//  */
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

//     // ⚠️ Isolate kiya taaki Notification schema me koi validation error
//     // aane par pura login crash na ho (500 error ki sabse common wajah).
//     try {
//       await Notification.create({
//         userId: user._id,
//         title: "Login Successful! 🔓",
//         message: `Welcome back, ${user.fullName || "Customer"}! You successfully logged into your account.`,
//         type: "order",
//       });
//     } catch (notifyError) {
//       console.error("Notification creation failed (login):", notifyError.message);
//     }

//     // ✅ role add kiya
//     const token = jwt.sign(
//       { id: user._id, email: user.email, role: "customer" },
//       JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "strict",
//       maxAge: 24 * 60 * 60 * 1000,
//     });

//     // 🔒 Response me ab sirf message + token — poora customer object nahi bheja
//     res.status(200).json({
//       message: "Login Successfully",
//       token,
//     });
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ message: error.message || "Server error during login" });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/logout:
//  *   post:
//  *     summary: Customer Logout
//  *     tags: [Customer Authentication & Management]
//  *     responses:
//  *       200:
//  *         description: Logged out successfully
//  */
// const logoutCustomer = async (req, res) => {
//   try {
//     res.clearCookie("token", {
//       httpOnly: true,
//       sameSite: "strict",
//     });
//     res.status(200).json({ message: "Logged out successfully" });
//   } catch (error) {
//     console.error("Error during logout:", error);
//     res.status(500).json({ message: "Server error during logout" });
//   }
// };

// // ==================== PRODUCT CONTROLLERS ====================

// /**
//  * @swagger
//  * /api/customer/products:
//  *   get:
//  *     summary: Get all products for customers
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - CustomerBearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Products fetched successfully
//  *       401:
//  *         description: Unauthorized / Token missing or invalid
//  */
// const getAllProductsForCustomer = async (req, res) => {
//   try {
//     const products = await SellerProduct.find({});
//     res.status(200).json({ success: true, count: products.length, products });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ==================== WISHLIST CONTROLLERS ====================

// /**
//  * @swagger
//  * /api/customer/wishlist/add:
//  *   post:
//  *     summary: Add product to wishlist
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - CustomerBearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - productId
//  *               - title
//  *               - price
//  *               - image
//  *             properties:
//  *               productId:
//  *                 type: string
//  *               title:
//  *                 type: string
//  *               description:
//  *                 type: string
//  *               price:
//  *                 type: string
//  *               discount:
//  *                 type: string
//  *               image:
//  *                 type: string
//  *     responses:
//  *       201:
//  *         description: Added to wishlist successfully
//  *       401:
//  *         description: Not authorized
//  */
// const addToWishlist = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { productId, title, description, price, originalPrice, discount, image } = req.body;

//     const existingWishlist = await Wishlist.findOne({ userId, productId });
//     if (existingWishlist) {
//       return res.status(400).json({ success: false, message: "Product already in wishlist" });
//     }

//     const wishlistItem = new Wishlist({
//       userId,
//       productId,
//       title,
//       description,
//       price,
//       originalPrice,
//       discount,
//       image,
//     });

//     await wishlistItem.save();

//     try {
//       await Notification.create({
//         userId,
//         productId,
//         title: "Added to Wishlist ❤️",
//         message: `"${title || "Product"}" has been added to your wishlist.`,
//         type: "offer",
//       });
//     } catch (notifyError) {
//       console.error("Notification creation failed (wishlist add):", notifyError.message);
//     }

//     res.status(201).json({ success: true, message: "Added to wishlist successfully", wishlistItem });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/wishlist/remove/{id}:
//  *   delete:
//  *     summary: Remove item from wishlist
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - CustomerBearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Wishlist item ID
//  *     responses:
//  *       200:
//  *         description: Removed from wishlist successfully
//  *       404:
//  *         description: Item not found
//  */
// const removeFromWishlist = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { id } = req.params;

//     const deletedItem = await Wishlist.findOneAndDelete({ _id: id, userId });
//     if (!deletedItem) {
//       return res.status(404).json({ success: false, message: "Item not found in wishlist" });
//     }

//     try {
//       await Notification.create({
//         userId,
//         productId: deletedItem.productId,
//         title: "Removed from Wishlist ❌",
//         message: `"${deletedItem.title || "Product"}" was removed from your wishlist.`,
//         type: "offer",
//       });
//     } catch (notifyError) {
//       console.error("Notification creation failed (wishlist remove):", notifyError.message);
//     }

//     res.status(200).json({ success: true, message: "Removed from wishlist successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/wishlist:
//  *   get:
//  *     summary: Get customer wishlist items
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - CustomerBearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Wishlist fetched successfully
//  */
// const getWishlist = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const wishlist = await Wishlist.find({ userId });
//     res.status(200).json({ success: true, count: wishlist.length, wishlist });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ==================== CART CONTROLLERS ====================

// /**
//  * @swagger
//  * /api/customer/cart/add:
//  *   post:
//  *     summary: Add product to cart
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - CustomerBearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - productId
//  *               - title
//  *               - price
//  *             properties:
//  *               productId:
//  *                 type: string
//  *               title:
//  *                 type: string
//  *               description:
//  *                 type: string
//  *               price:
//  *                 type: string
//  *               image:
//  *                 type: string
//  *               quantity:
//  *                 type: number
//  *               sellerId:
//  *                 type: string
//  *     responses:
//  *       201:
//  *         description: Added to cart successfully
//  */
// const addToCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { productId, title, description, price, image, quantity, sellerId } = req.body;

//     let cartItem = await Cart.findOne({ userId, productId });
//     if (cartItem) {
//       cartItem.quantity += quantity || 1;
//       if (sellerId) cartItem.sellerId = sellerId;
//       await cartItem.save();

//       try {
//         await Notification.create({
//           userId,
//           productId,
//           title: "Cart Updated 🛒",
//           message: `Quantity for "${title || "Product"}" was updated in your cart.`,
//           type: "order",
//         });
//       } catch (notifyError) {
//         console.error("Notification creation failed (cart update):", notifyError.message);
//       }

//       return res.status(200).json({ success: true, message: "Cart quantity updated", cartItem });
//     }

//     cartItem = new Cart({
//       userId,
//       productId,
//       title,
//       description,
//       price,
//       image,
//       quantity: quantity || 1,
//       sellerId,
//     });

//     await cartItem.save();

//     try {
//       await Notification.create({
//         userId,
//         productId,
//         title: "Added to Cart 🛍️",
//         message: `"${title || "Product"}" has been successfully added to your shopping cart.`,
//         type: "order",
//       });
//     } catch (notifyError) {
//       console.error("Notification creation failed (cart add):", notifyError.message);
//     }

//     res.status(201).json({ success: true, message: "Added to cart successfully", cartItem });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/cart/remove/{id}:
//  *   delete:
//  *     summary: Remove item from cart
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - CustomerBearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Cart item ID
//  *     responses:
//  *       200:
//  *         description: Removed from cart successfully
//  */
// const removeFromCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { id } = req.params;

//     const deletedItem = await Cart.findOneAndDelete({ _id: id, userId });
//     if (!deletedItem) {
//       return res.status(404).json({ success: false, message: "Item not found in cart" });
//     }

//     try {
//       await Notification.create({
//         userId,
//         productId: deletedItem.productId,
//         title: "Removed from Cart 🗑️",
//         message: `"${deletedItem.title || "Product"}" has been removed from your cart.`,
//         type: "order",
//       });
//     } catch (notifyError) {
//       console.error("Notification creation failed (cart remove):", notifyError.message);
//     }

//     res.status(200).json({ success: true, message: "Removed from cart successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/cart:
//  *   get:
//  *     summary: Get customer cart items
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - CustomerBearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Cart items fetched successfully
//  */
// const getCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const cart = await Cart.find({ userId });
//     res.status(200).json({ success: true, count: cart.length, cart });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ==================== ORDER CONTROLLERS ====================

// /**
//  * @swagger
//  * /api/customer/order/create:
//  *   post:
//  *     summary: Create a new order
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - CustomerBearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - productId
//  *               - productTitle
//  *               - price
//  *               - quantity
//  *               - totalAmount
//  *               - fullName
//  *               - phone
//  *               - address
//  *               - paymentMethod
//  *               - sellerId
//  *             properties:
//  *               productId:
//  *                 type: string
//  *               productTitle:
//  *                 type: string
//  *               productImage:
//  *                 type: string
//  *               price:
//  *                 type: number
//  *               quantity:
//  *                 type: number
//  *               totalAmount:
//  *                 type: number
//  *               fullName:
//  *                 type: string
//  *               phone:
//  *                 type: string
//  *               address:
//  *                 type: string
//  *               paymentMethod:
//  *                 type: string
//  *                 enum: ["Cash on Delivery", "Online Payment (Razorpay)"]
//  *               paymentStatus:
//  *                 type: string
//  *               razorpayPaymentId:
//  *                 type: string
//  *               sellerId:
//  *                 type: string
//  *     responses:
//  *       201:
//  *         description: Order created successfully
//  */
// const createOrder = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const {
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
//       sellerId,
//     } = req.body;

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
//       sellerId,
//     });

//     const savedOrder = await newOrder.save();

//     try {
//       await Notification.create({
//         userId,
//         productId,
//         title: "Order Placed Successfully! 📦",
//         message: `Your order for ${productTitle} has been placed successfully.`,
//         type: "order",
//       });
//     } catch (notifyError) {
//       console.error("Notification creation failed (order create):", notifyError.message);
//     }

//     res.status(201).json({ success: true, message: "Order created successfully", order: savedOrder });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/orders:
//  *   get:
//  *     summary: Get all orders of logged-in customer
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - CustomerBearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Orders fetched successfully
//  */
// const getCustomerOrders = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const orders = await Order.find({ userId }).sort({ createdAt: -1 });
//     res.status(200).json({ success: true, count: orders.length, orders });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ==================== NOTIFICATION CONTROLLERS ====================

// /**
//  * @swagger
//  * /api/customer/notifications:
//  *   get:
//  *     summary: Get all notifications for logged-in customer
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - CustomerBearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Notifications fetched successfully
//  */
// const getCustomerNotifications = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
//     res.status(200).json({ success: true, count: notifications.length, notifications });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/notifications/read:
//  *   put:
//  *     summary: Mark all notifications as read
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - CustomerBearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Notifications marked as read
//  */
// const markNotificationsAsRead = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     await Notification.updateMany({ userId, read: false }, { $set: { read: true } });
//     res.status(200).json({ success: true, message: "Notifications marked as read" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ==================== ROUTES CONFIGURATION ====================
// // Public Routes
// router.post("/register", registerCustomer);
// router.post("/login", loginCustomer);
// router.post("/logout", logoutCustomer);

// // Protected Routes (Secured with Bearer Token & protectCustomer middleware)
// router.get("/products", protectCustomer, getAllProductsForCustomer);

// router.post("/wishlist/add", protectCustomer, addToWishlist);
// router.delete("/wishlist/remove/:id", protectCustomer, removeFromWishlist);
// router.get("/wishlist", protectCustomer, getWishlist);

// router.post("/cart/add", protectCustomer, addToCart);
// router.delete("/cart/remove/:id", protectCustomer, removeFromCart);
// router.get("/cart", protectCustomer, getCart);

// router.post("/order/create", protectCustomer, createOrder);
// router.get("/orders", protectCustomer, getCustomerOrders);

// router.get("/notifications", protectCustomer, getCustomerNotifications);
// router.put("/notifications/read", protectCustomer, markNotificationsAsRead);

// module.exports = router;




//kavish claude





// const express = require("express");
// const router = express.Router();
// const Customer = require("../models/Customer");
// const SellerProduct = require("../models/SellerProduct");
// const Notification = require("../models/Notification");
// const Wishlist = require("../models/Wishlist");
// const Cart = require("../models/Cart");
// const Order = require("../models/Order");
// const SellerNotification = require("../models/SellerNotification"); // ✅ seller ko order notify karne ke liye
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { protectCustomer } = require("../middleware/customerMiddleware");

// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_here";

// /**
//  * @swagger
//  * tags:
//  *   name: Customer Authentication & Management
//  *   description: Customer APIs for Auth, Cart, Wishlist, Orders, and Notifications
//  */

// /**
//  * @swagger
//  * components:
//  *   securitySchemes:
//  *     CustomerBearerAuth:
//  *       type: http
//  *       scheme: bearer
//  *       bearerFormat: JWT
//  *       description: Enter your JWT token in the format (e.g. Bearer <token>)
//  */

// // ==================== AUTH CONTROLLERS ====================

// /**
//  * @swagger
//  * /api/customer/register:
//  *   post:
//  *     summary: Register a new customer
//  *     tags: [Customer Authentication & Management]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *               - password
//  *               - fullName
//  *               - mobile
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 example: "customer1@gmail.com"
//  *               password:
//  *                 type: string
//  *                 example: "password1123"
//  *               fullName:
//  *                 type: string
//  *                 example: "Rahull Sharma"
//  *               mobile:
//  *                 type: string
//  *                 example: "9876533210"
//  *     responses:
//  *       201:
//  *         description: Registration successful
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Registration successful!"
//  *                 token:
//  *                   type: string
//  *                   example: "eyJhbGciOiJIUzI1Ni..."
//  *       400:
//  *         description: Email is already registered
//  */
// const registerCustomer = async (req, res) => {
//   try {
//     const {
//       fullName,
//       email,
//       mobile,
//       dob,
//       password,
//       houseNo,
//       street,
//       city,
//       state,
//       pincode,
//       country,
//     } = req.body;

//     const existingUser = await Customer.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email is already registered!" });
//     }

//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     const newCustomer = new Customer({
//       fullName,
//       email,
//       mobile,
//       dob,
//       password: hashedPassword,
//       houseNo,
//       street,
//       city,
//       state,
//       pincode,
//       country: country || "India",
//     });

//     const savedCustomer = await newCustomer.save();

//     // ⚠️ Notification banane me agar koi error aaye (e.g. schema me koi
//     // required field missing ho) to poora registration fail NAHI hona
//     // chahiye — isliye alag try/catch me isolate kiya.
//     try {
//       await Notification.create({
//         userId: savedCustomer._id,
//         title: "Welcome to Kavi Shawls! 🎉",
//         message: "Thank you for registering with us. Enjoy exploring our luxury collection.",
//         type: "offer",
//       });
//     } catch (notifyError) {
//       console.error("Notification creation failed (register):", notifyError.message);
//     }

//     // ✅ role add kiya
//     const token = jwt.sign(
//       { id: savedCustomer._id, email: savedCustomer.email, role: "customer" },
//       JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "strict",
//       maxAge: 24 * 60 * 60 * 1000,
//     });

//     // 🔒 Response me ab sirf message + token — poora customer object nahi bheja
//     res.status(201).json({
//       message: "Registration successful!",
//       token,
//     });
//   } catch (error) {
//     console.error("Error during registration:", error);
//     res.status(500).json({ message: error.message || "Server error, please try again." });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/login:
//  *   post:
//  *     summary: Customer Login
//  *     tags: [Customer Authentication & Management]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *               - password
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 example: "customer1@gmail.com"
//  *               password:
//  *                 type: string
//  *                 example: "password1123"
//  *     responses:
//  *       200:
//  *         description: Login Successfully with JWT Token
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Login Successfully"
//  *                 token:
//  *                   type: string
//  *                   example: "eyJhbGciOiJIUzI1Ni..."
//  *       400:
//  *         description: Invalid email or password
//  */
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

//     // ⚠️ Isolate kiya taaki Notification schema me koi validation error
//     // aane par pura login crash na ho (500 error ki sabse common wajah).
//     try {
//       await Notification.create({
//         userId: user._id,
//         title: "Login Successful! 🔓",
//         message: `Welcome back, ${user.fullName || "Customer"}! You successfully logged into your account.`,
//         type: "order",
//       });
//     } catch (notifyError) {
//       console.error("Notification creation failed (login):", notifyError.message);
//     }

//     // ✅ role add kiya
//     const token = jwt.sign(
//       { id: user._id, email: user.email, role: "customer" },
//       JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "strict",
//       maxAge: 24 * 60 * 60 * 1000,
//     });

//     // 🔒 Response me ab sirf message + token — poora customer object nahi bheja
//     res.status(200).json({
//       message: "Login Successfully",
//       token,
//     });
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ message: error.message || "Server error during login" });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/logout:
//  *   post:
//  *     summary: Customer Logout
//  *     tags: [Customer Authentication & Management]
//  *     responses:
//  *       200:
//  *         description: Logged out successfully
//  */
// const logoutCustomer = async (req, res) => {
//   try {
//     res.clearCookie("token", {
//       httpOnly: true,
//       sameSite: "strict",
//     });
//     res.status(200).json({ message: "Logged out successfully" });
//   } catch (error) {
//     console.error("Error during logout:", error);
//     res.status(500).json({ message: "Server error during logout" });
//   }
// };

// // ==================== PRODUCT CONTROLLERS ====================

// /**
//  * @swagger
//  * /api/customer/products:
//  *   get:
//  *     summary: Get all products for customers
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - CustomerBearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Products fetched successfully
//  *       401:
//  *         description: Unauthorized / Token missing or invalid
//  */
// const getAllProductsForCustomer = async (req, res) => {
//   try {
//     const products = await SellerProduct.find({});
//     res.status(200).json({ success: true, count: products.length, products });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ==================== WISHLIST CONTROLLERS ====================

// /**
//  * @swagger
//  * /api/customer/wishlist/add:
//  *   post:
//  *     summary: Add product to wishlist
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - CustomerBearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - productId
//  *               - title
//  *               - price
//  *               - image
//  *             properties:
//  *               productId:
//  *                 type: string
//  *               title:
//  *                 type: string
//  *               description:
//  *                 type: string
//  *               price:
//  *                 type: string
//  *               discount:
//  *                 type: string
//  *               image:
//  *                 type: string
//  *     responses:
//  *       201:
//  *         description: Added to wishlist successfully
//  *       401:
//  *         description: Not authorized
//  */
// const addToWishlist = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { productId, title, description, price, originalPrice, discount, image } = req.body;

//     const existingWishlist = await Wishlist.findOne({ userId, productId });
//     if (existingWishlist) {
//       return res.status(400).json({ success: false, message: "Product already in wishlist" });
//     }

//     const wishlistItem = new Wishlist({
//       userId,
//       productId,
//       title,
//       description,
//       price,
//       originalPrice,
//       discount,
//       image,
//     });

//     await wishlistItem.save();

//     try {
//       await Notification.create({
//         userId,
//         productId,
//         title: "Added to Wishlist ❤️",
//         message: `"${title || "Product"}" has been added to your wishlist.`,
//         type: "offer",
//       });
//     } catch (notifyError) {
//       console.error("Notification creation failed (wishlist add):", notifyError.message);
//     }

//     res.status(201).json({ success: true, message: "Added to wishlist successfully", wishlistItem });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/wishlist/remove/{id}:
//  *   delete:
//  *     summary: Remove item from wishlist
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - CustomerBearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Wishlist item ID
//  *     responses:
//  *       200:
//  *         description: Removed from wishlist successfully
//  *       404:
//  *         description: Item not found
//  */
// const removeFromWishlist = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { id } = req.params;

//     const deletedItem = await Wishlist.findOneAndDelete({ _id: id, userId });
//     if (!deletedItem) {
//       return res.status(404).json({ success: false, message: "Item not found in wishlist" });
//     }

//     try {
//       await Notification.create({
//         userId,
//         productId: deletedItem.productId,
//         title: "Removed from Wishlist ❌",
//         message: `"${deletedItem.title || "Product"}" was removed from your wishlist.`,
//         type: "offer",
//       });
//     } catch (notifyError) {
//       console.error("Notification creation failed (wishlist remove):", notifyError.message);
//     }

//     res.status(200).json({ success: true, message: "Removed from wishlist successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/wishlist:
//  *   get:
//  *     summary: Get customer wishlist items
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - CustomerBearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Wishlist fetched successfully
//  */
// const getWishlist = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const wishlist = await Wishlist.find({ userId });
//     res.status(200).json({ success: true, count: wishlist.length, wishlist });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ==================== CART CONTROLLERS ====================

// /**
//  * @swagger
//  * /api/customer/cart/add:
//  *   post:
//  *     summary: Add product to cart
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - CustomerBearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - productId
//  *               - title
//  *               - price
//  *             properties:
//  *               productId:
//  *                 type: string
//  *               title:
//  *                 type: string
//  *               description:
//  *                 type: string
//  *               price:
//  *                 type: string
//  *               image:
//  *                 type: string
//  *               quantity:
//  *                 type: number
//  *               sellerId:
//  *                 type: string
//  *     responses:
//  *       201:
//  *         description: Added to cart successfully
//  */
// const addToCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { productId, title, description, price, image, quantity, sellerId } = req.body;

//     let cartItem = await Cart.findOne({ userId, productId });
//     if (cartItem) {
//       cartItem.quantity += quantity || 1;
//       if (sellerId) cartItem.sellerId = sellerId;
//       await cartItem.save();

//       try {
//         await Notification.create({
//           userId,
//           productId,
//           title: "Cart Updated 🛒",
//           message: `Quantity for "${title || "Product"}" was updated in your cart.`,
//           type: "order",
//         });
//       } catch (notifyError) {
//         console.error("Notification creation failed (cart update):", notifyError.message);
//       }

//       return res.status(200).json({ success: true, message: "Cart quantity updated", cartItem });
//     }

//     cartItem = new Cart({
//       userId,
//       productId,
//       title,
//       description,
//       price,
//       image,
//       quantity: quantity || 1,
//       sellerId,
//     });

//     await cartItem.save();

//     try {
//       await Notification.create({
//         userId,
//         productId,
//         title: "Added to Cart 🛍️",
//         message: `"${title || "Product"}" has been successfully added to your shopping cart.`,
//         type: "order",
//       });
//     } catch (notifyError) {
//       console.error("Notification creation failed (cart add):", notifyError.message);
//     }

//     res.status(201).json({ success: true, message: "Added to cart successfully", cartItem });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/cart/remove/{id}:
//  *   delete:
//  *     summary: Remove item from cart
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - CustomerBearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Cart item ID
//  *     responses:
//  *       200:
//  *         description: Removed from cart successfully
//  */
// const removeFromCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { id } = req.params;

//     const deletedItem = await Cart.findOneAndDelete({ _id: id, userId });
//     if (!deletedItem) {
//       return res.status(404).json({ success: false, message: "Item not found in cart" });
//     }

//     try {
//       await Notification.create({
//         userId,
//         productId: deletedItem.productId,
//         title: "Removed from Cart 🗑️",
//         message: `"${deletedItem.title || "Product"}" has been removed from your cart.`,
//         type: "order",
//       });
//     } catch (notifyError) {
//       console.error("Notification creation failed (cart remove):", notifyError.message);
//     }

//     res.status(200).json({ success: true, message: "Removed from cart successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/cart:
//  *   get:
//  *     summary: Get customer cart items
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - CustomerBearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Cart items fetched successfully
//  */
// const getCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const cart = await Cart.find({ userId });
//     res.status(200).json({ success: true, count: cart.length, cart });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ==================== ORDER CONTROLLERS ====================

// /**
//  * @swagger
//  * /api/customer/order/create:
//  *   post:
//  *     summary: Create a new order
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - CustomerBearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - productId
//  *               - productTitle
//  *               - price
//  *               - quantity
//  *               - totalAmount
//  *               - fullName
//  *               - phone
//  *               - address
//  *               - paymentMethod
//  *               - sellerId
//  *             properties:
//  *               productId:
//  *                 type: string
//  *               productTitle:
//  *                 type: string
//  *               productImage:
//  *                 type: string
//  *               price:
//  *                 type: number
//  *               quantity:
//  *                 type: number
//  *               totalAmount:
//  *                 type: number
//  *               fullName:
//  *                 type: string
//  *               phone:
//  *                 type: string
//  *               address:
//  *                 type: string
//  *               paymentMethod:
//  *                 type: string
//  *                 enum: ["Cash on Delivery", "Online Payment (Razorpay)"]
//  *               paymentStatus:
//  *                 type: string
//  *               razorpayPaymentId:
//  *                 type: string
//  *               sellerId:
//  *                 type: string
//  *     responses:
//  *       201:
//  *         description: Order created successfully
//  */
// const createOrder = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const {
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
//       sellerId,
//     } = req.body;

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
//       sellerId,
//     });

//     const savedOrder = await newOrder.save();

//     // 🔔 Customer ko notification
//     try {
//       await Notification.create({
//         userId,
//         productId,
//         title: "Order Placed Successfully! 📦",
//         message: `Your order for ${productTitle} has been placed successfully.`,
//         type: "order",
//       });
//     } catch (notifyError) {
//       console.error("Notification creation failed (order create - customer):", notifyError.message);
//     }

//     // 🔔 Seller ko bhi notification — pehle yahan sirf customer ko ja raha tha
//     if (sellerId) {
//       try {
//         await SellerNotification.create({
//           sellerId,
//           title: "New Order Received! 🛒",
//           message: `${fullName || "A customer"} ne "${productTitle}" ka order place kiya hai. Quantity: ${quantity || 1}.`,
//           type: "success",
//         });
//       } catch (notifyError) {
//         console.error("Notification creation failed (order create - seller):", notifyError.message);
//       }
//     } else {
//       console.warn("Order create: sellerId missing, seller notification skip ho gayi.");
//     }

//     res.status(201).json({ success: true, message: "Order created successfully", order: savedOrder });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/orders:
//  *   get:
//  *     summary: Get all orders of logged-in customer
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - CustomerBearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Orders fetched successfully
//  */
// const getCustomerOrders = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const orders = await Order.find({ userId }).sort({ createdAt: -1 });
//     res.status(200).json({ success: true, count: orders.length, orders });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ==================== NOTIFICATION CONTROLLERS ====================

// /**
//  * @swagger
//  * /api/customer/notifications:
//  *   get:
//  *     summary: Get all notifications for logged-in customer
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - CustomerBearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Notifications fetched successfully
//  */
// const getCustomerNotifications = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
//     res.status(200).json({ success: true, count: notifications.length, notifications });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/notifications/read:
//  *   put:
//  *     summary: Mark all notifications as read
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - CustomerBearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Notifications marked as read
//  */
// const markNotificationsAsRead = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     await Notification.updateMany({ userId, read: false }, { $set: { read: true } });
//     res.status(200).json({ success: true, message: "Notifications marked as read" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/notifications/read/{id}:
//  *   put:
//  *     summary: Mark a single notification as read
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - CustomerBearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Notification ID
//  *     responses:
//  *       200:
//  *         description: Notification marked as read
//  *       404:
//  *         description: Notification not found
//  */
// const markSingleNotificationAsRead = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { id } = req.params;

//     const updated = await Notification.findOneAndUpdate(
//       { _id: id, userId },
//       { $set: { read: true } },
//       { new: true }
//     );

//     if (!updated) {
//       return res.status(404).json({ success: false, message: "Notification not found" });
//     }

//     res.status(200).json({ success: true, message: "Notification marked as read", notification: updated });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/notifications/clear:
//  *   delete:
//  *     summary: Clear (delete) all notifications for the logged-in customer
//  *     tags: [Customer Authentication & Management]
//  *     security:
//  *       - CustomerBearerAuth: []
//  *     responses:
//  *       200:
//  *         description: All notifications cleared
//  */
// const clearAllNotifications = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     await Notification.deleteMany({ userId });
//     res.status(200).json({ success: true, message: "All notifications cleared" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ==================== ROUTES CONFIGURATION ====================
// // Public Routes
// router.post("/register", registerCustomer);
// router.post("/login", loginCustomer);
// router.post("/logout", logoutCustomer);

// // Protected Routes (Secured with Bearer Token & protectCustomer middleware)
// router.get("/products", protectCustomer, getAllProductsForCustomer);

// router.post("/wishlist/add", protectCustomer, addToWishlist);
// router.delete("/wishlist/remove/:id", protectCustomer, removeFromWishlist);
// router.get("/wishlist", protectCustomer, getWishlist);

// router.post("/cart/add", protectCustomer, addToCart);
// router.delete("/cart/remove/:id", protectCustomer, removeFromCart);
// router.get("/cart", protectCustomer, getCart);

// router.post("/order/create", protectCustomer, createOrder);
// router.get("/orders", protectCustomer, getCustomerOrders);

// router.get("/notifications", protectCustomer, getCustomerNotifications);
// router.put("/notifications/read", protectCustomer, markNotificationsAsRead);
// router.put("/notifications/read/:id", protectCustomer, markSingleNotificationAsRead); // ✅ naya
// router.delete("/notifications/clear", protectCustomer, clearAllNotifications); // ✅ naya

// module.exports = router;




//claude forget password




// const express = require("express");
// const router = express.Router();
// const Customer = require("../models/Customer");
// const SellerProduct = require("../models/SellerProduct");
// const Notification = require("../models/Notification");
// const Wishlist = require("../models/Wishlist");
// const Cart = require("../models/Cart");
// const Order = require("../models/Order");
// const SellerNotification = require("../models/SellerNotification"); // ✅ seller ko order notify karne ke liye
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { protectCustomer } = require("../middleware/customerMiddleware");
// const sendOtpEmail = require("../utils/SendEmail"); // ✅ OTP email ke liye (forgot-password + email verify dono)

// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key_here";

// /**
//  * @swagger
//  * tags:
//  *   name: Customer Authentication & Management
//  *   description: Customer APIs for Auth, Cart, Wishlist, Orders, and Notifications
//  */

// /**
//  * @swagger
//  * components:
//  *   securitySchemes:
//  *     CustomerBearerAuth:
//  *       type: http
//  *       scheme: bearer
//  *       bearerFormat: JWT
//  *       description: Enter your JWT token in the format (e.g. Bearer <token>)
//  */

// // ==================== AUTH CONTROLLERS ====================

// /**
//  * @swagger
//  * /api/customer/register:
//  *   post:
//  *     summary: Register a new customer (email verification OTP sent automatically)
//  *     tags: [Customer Authentication & Management]
//  */
// const registerCustomer = async (req, res) => {
//   try {
//     const {
//       fullName,
//       email,
//       mobile,
//       dob,
//       password,
//       houseNo,
//       street,
//       city,
//       state,
//       pincode,
//       country,
//     } = req.body;

//     const existingUser = await Customer.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email is already registered!" });
//     }

//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     // Email verification OTP generate karo (fake/typo email pakadne ke liye)
//     const verifyOtp = Math.floor(100000 + Math.random() * 900000).toString();
//     const hashedVerifyOtp = await bcrypt.hash(verifyOtp, saltRounds);
//     const verifyOtpExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 min valid

//     const newCustomer = new Customer({
//       fullName,
//       email,
//       mobile,
//       dob,
//       password: hashedPassword,
//       houseNo,
//       street,
//       city,
//       state,
//       pincode,
//       country: country || "India",
//       isEmailVerified: false,
//       emailVerifyOtp: hashedVerifyOtp,
//       emailVerifyOtpExpiry: verifyOtpExpiry,
//     });

//     const savedCustomer = await newCustomer.save();

//     // Verification OTP email par bhejo
//     // ⚠️ Agar email hi galat/fake hai, to yahi step fail hoga (invalid domain etc.)
//     try {
//       await sendOtpEmail(savedCustomer.email, verifyOtp, savedCustomer.fullName, "verify");
//     } catch (emailError) {
//       // Email bhejna fail hua — customer ko bata do, account bana to gaya hai
//       // par verify OTP nahi pahuncha, resend-verification-otp use karna hoga.
//       console.error("Verification email failed to send:", emailError.message);
//     }

//     try {
//       await Notification.create({
//         userId: savedCustomer._id,
//         title: "Welcome to Kavi Shawls! 🎉",
//         message: "Thank you for registering with us. Please verify your email to unlock full access.",
//         type: "offer",
//       });
//     } catch (notifyError) {
//       console.error("Notification creation failed (register):", notifyError.message);
//     }

//     const token = jwt.sign(
//       { id: savedCustomer._id, email: savedCustomer.email, role: "customer" },
//       JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "strict",
//       maxAge: 24 * 60 * 60 * 1000,
//     });

//     res.status(201).json({
//       message: "Registration successful! Please check your email for a verification OTP.",
//       token,
//       userId: savedCustomer._id,
//       isEmailVerified: false,
//     });
//   } catch (error) {
//     console.error("Error during registration:", error);
//     res.status(500).json({ message: error.message || "Server error, please try again." });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/login:
//  *   post:
//  *     summary: Customer Login
//  *     tags: [Customer Authentication & Management]
//  */
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

//     // Note: login yahan block nahi kiya gaya even if email unverified hai —
//     // taaki genuine users lock out na ho jayein. Frontend par isEmailVerified
//     // dekh kar ek banner/reminder dikha sakte ho "please verify your email".
//     // Agar aap chahte ho login hi block ho jaye, neeche wala block uncomment karo:
//     //
//     // if (!user.isEmailVerified) {
//     //   return res.status(403).json({
//     //     message: "Please verify your email before logging in.",
//     //     isEmailVerified: false,
//     //   });
//     // }

//     try {
//       await Notification.create({
//         userId: user._id,
//         title: "Login Successful! 🔓",
//         message: `Welcome back, ${user.fullName || "Customer"}! You successfully logged into your account.`,
//         type: "order",
//       });
//     } catch (notifyError) {
//       console.error("Notification creation failed (login):", notifyError.message);
//     }

//     const token = jwt.sign(
//       { id: user._id, email: user.email, role: "customer" },
//       JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "strict",
//       maxAge: 24 * 60 * 60 * 1000,
//     });

//     res.status(200).json({
//       message: "Login Successfully",
//       token,
//       isEmailVerified: user.isEmailVerified,
//     });
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ message: error.message || "Server error during login" });
//   }
// };

// /**
//  * @swagger
//  * /api/customer/logout:
//  *   post:
//  *     summary: Customer Logout
//  *     tags: [Customer Authentication & Management]
//  */
// const logoutCustomer = async (req, res) => {
//   try {
//     res.clearCookie("token", {
//       httpOnly: true,
//       sameSite: "strict",
//     });
//     res.status(200).json({ message: "Logged out successfully" });
//   } catch (error) {
//     console.error("Error during logout:", error);
//     res.status(500).json({ message: "Server error during logout" });
//   }
// };

// // ==================== EMAIL VERIFICATION CONTROLLERS (fake email rokne ke liye) ====================

// /**
//  * POST /api/customer/verify-email
//  * Body: { userId, otp }
//  */
// const verifyEmail = async (req, res) => {
//   try {
//     const { userId, otp } = req.body;

//     if (!userId || !otp) {
//       return res.status(400).json({ success: false, message: "userId and otp are required" });
//     }

//     const customer = await Customer.findById(userId);
//     if (!customer) {
//       return res.status(404).json({ success: false, message: "Customer not found" });
//     }

//     if (customer.isEmailVerified) {
//       return res.status(200).json({ success: true, message: "Email already verified" });
//     }

//     if (!customer.emailVerifyOtp || !customer.emailVerifyOtpExpiry) {
//       return res.status(400).json({ success: false, message: "No OTP requested. Please resend OTP" });
//     }

//     if (customer.emailVerifyOtpExpiry < new Date()) {
//       return res.status(400).json({ success: false, message: "OTP has expired. Please request a new one" });
//     }

//     const isMatch = await bcrypt.compare(otp, customer.emailVerifyOtp);
//     if (!isMatch) {
//       return res.status(400).json({ success: false, message: "Invalid OTP" });
//     }

//     customer.isEmailVerified = true;
//     customer.emailVerifyOtp = null;
//     customer.emailVerifyOtpExpiry = null;
//     await customer.save();

//     res.status(200).json({ success: true, message: "Email verified successfully" });
//   } catch (error) {
//     console.error("Error in verifyEmail:", error);
//     res.status(500).json({ success: false, message: "Server error, please try again." });
//   }
// };

// /**
//  * POST /api/customer/resend-verification-otp
//  * Body: { userId }  ya  { email }
//  */
// const resendVerificationOtp = async (req, res) => {
//   try {
//     const { userId, email } = req.body;

//     if (!userId && !email) {
//       return res.status(400).json({ success: false, message: "userId or email is required" });
//     }

//     const customer = userId
//       ? await Customer.findById(userId)
//       : await Customer.findOne({ email });

//     if (!customer) {
//       return res.status(404).json({ success: false, message: "Customer not found" });
//     }

//     if (customer.isEmailVerified) {
//       return res.status(200).json({ success: true, message: "Email already verified" });
//     }

//     const verifyOtp = Math.floor(100000 + Math.random() * 900000).toString();
//     customer.emailVerifyOtp = await bcrypt.hash(verifyOtp, 10);
//     customer.emailVerifyOtpExpiry = new Date(Date.now() + 15 * 60 * 1000);
//     await customer.save();

//     await sendOtpEmail(customer.email, verifyOtp, customer.fullName, "verify");

//     res.status(200).json({ success: true, message: "Verification OTP resent to your email" });
//   } catch (error) {
//     console.error("Error in resendVerificationOtp:", error);
//     res.status(500).json({ success: false, message: "Server error, please try again." });
//   }
// };

// // ==================== FORGET PASSWORD CONTROLLERS ====================

// /**
//  * POST /api/customer/forgot-password
//  * Body: { email }
//  */
// const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ success: false, message: "Email is required" });
//     }

//     const customer = await Customer.findOne({ email });
//     if (!customer) {
//       return res.status(404).json({ success: false, message: "No account found with this email" });
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const hashedOtp = await bcrypt.hash(otp, 10);
//     const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

//     customer.resetOtp = hashedOtp;
//     customer.resetOtpExpiry = otpExpiry;
//     customer.resetOtpVerified = false;
//     await customer.save();

//     await sendOtpEmail(customer.email, otp, customer.fullName, "reset");

//     res.status(200).json({
//       success: true,
//       message: "OTP has been sent to your registered email",
//       userId: customer._id,
//     });
//   } catch (error) {
//     console.error("Error in forgotPassword:", error);
//     res.status(500).json({ success: false, message: error.message || "Server error, please try again." });
//   }
// };

// /**
//  * POST /api/customer/verify-otp
//  * Body: { userId, otp }
//  */
// const verifyOtp = async (req, res) => {
//   try {
//     const { userId, otp } = req.body;

//     if (!userId || !otp) {
//       return res.status(400).json({ success: false, message: "userId and otp are required" });
//     }

//     const customer = await Customer.findById(userId);
//     if (!customer || !customer.resetOtp || !customer.resetOtpExpiry) {
//       return res.status(400).json({ success: false, message: "OTP not requested or invalid" });
//     }

//     if (customer.resetOtpExpiry < new Date()) {
//       return res.status(400).json({ success: false, message: "OTP has expired. Please request a new one" });
//     }

//     const isMatch = await bcrypt.compare(otp, customer.resetOtp);
//     if (!isMatch) {
//       return res.status(400).json({ success: false, message: "Invalid OTP" });
//     }

//     customer.resetOtpVerified = true;
//     await customer.save();

//     res.status(200).json({ success: true, message: "OTP verified successfully" });
//   } catch (error) {
//     console.error("Error in verifyOtp:", error);
//     res.status(500).json({ success: false, message: error.message || "Server error, please try again." });
//   }
// };

// /**
//  * POST /api/customer/reset-password
//  * Body: { userId, newPassword }
//  */
// const resetPassword = async (req, res) => {
//   try {
//     const { userId, newPassword } = req.body;

//     if (!userId || !newPassword) {
//       return res.status(400).json({ success: false, message: "userId and newPassword are required" });
//     }

//     if (newPassword.length < 6) {
//       return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
//     }

//     const customer = await Customer.findById(userId);
//     if (!customer) {
//       return res.status(404).json({ success: false, message: "Customer not found" });
//     }

//     if (!customer.resetOtpVerified) {
//       return res.status(400).json({ success: false, message: "Please verify OTP before resetting password" });
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     customer.password = hashedPassword;

//     customer.resetOtp = null;
//     customer.resetOtpExpiry = null;
//     customer.resetOtpVerified = false;

//     await customer.save();

//     try {
//       await Notification.create({
//         userId: customer._id,
//         title: "Password Changed 🔑",
//         message: "Your password was reset successfully. If this wasn't you, please contact support immediately.",
//         type: "offer",
//       });
//     } catch (notifyError) {
//       console.error("Notification creation failed (reset-password):", notifyError.message);
//     }

//     res.status(200).json({ success: true, message: "Password reset successful" });
//   } catch (error) {
//     console.error("Error in resetPassword:", error);
//     res.status(500).json({ success: false, message: error.message || "Server error, please try again." });
//   }
// };

// // ==================== PRODUCT CONTROLLERS ====================

// const getAllProductsForCustomer = async (req, res) => {
//   try {
//     const products = await SellerProduct.find({});
//     res.status(200).json({ success: true, count: products.length, products });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ==================== WISHLIST CONTROLLERS ====================

// const addToWishlist = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { productId, title, description, price, originalPrice, discount, image } = req.body;

//     const existingWishlist = await Wishlist.findOne({ userId, productId });
//     if (existingWishlist) {
//       return res.status(400).json({ success: false, message: "Product already in wishlist" });
//     }

//     const wishlistItem = new Wishlist({
//       userId,
//       productId,
//       title,
//       description,
//       price,
//       originalPrice,
//       discount,
//       image,
//     });

//     await wishlistItem.save();

//     try {
//       await Notification.create({
//         userId,
//         productId,
//         title: "Added to Wishlist ❤️",
//         message: `"${title || "Product"}" has been added to your wishlist.`,
//         type: "offer",
//       });
//     } catch (notifyError) {
//       console.error("Notification creation failed (wishlist add):", notifyError.message);
//     }

//     res.status(201).json({ success: true, message: "Added to wishlist successfully", wishlistItem });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// const removeFromWishlist = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { id } = req.params;

//     const deletedItem = await Wishlist.findOneAndDelete({ _id: id, userId });
//     if (!deletedItem) {
//       return res.status(404).json({ success: false, message: "Item not found in wishlist" });
//     }

//     try {
//       await Notification.create({
//         userId,
//         productId: deletedItem.productId,
//         title: "Removed from Wishlist ❌",
//         message: `"${deletedItem.title || "Product"}" was removed from your wishlist.`,
//         type: "offer",
//       });
//     } catch (notifyError) {
//       console.error("Notification creation failed (wishlist remove):", notifyError.message);
//     }

//     res.status(200).json({ success: true, message: "Removed from wishlist successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// const getWishlist = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const wishlist = await Wishlist.find({ userId });
//     res.status(200).json({ success: true, count: wishlist.length, wishlist });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ==================== CART CONTROLLERS ====================

// const addToCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { productId, title, description, price, image, quantity, sellerId } = req.body;

//     let cartItem = await Cart.findOne({ userId, productId });
//     if (cartItem) {
//       cartItem.quantity += quantity || 1;
//       if (sellerId) cartItem.sellerId = sellerId;
//       await cartItem.save();

//       try {
//         await Notification.create({
//           userId,
//           productId,
//           title: "Cart Updated 🛒",
//           message: `Quantity for "${title || "Product"}" was updated in your cart.`,
//           type: "order",
//         });
//       } catch (notifyError) {
//         console.error("Notification creation failed (cart update):", notifyError.message);
//       }

//       return res.status(200).json({ success: true, message: "Cart quantity updated", cartItem });
//     }

//     cartItem = new Cart({
//       userId,
//       productId,
//       title,
//       description,
//       price,
//       image,
//       quantity: quantity || 1,
//       sellerId,
//     });

//     await cartItem.save();

//     try {
//       await Notification.create({
//         userId,
//         productId,
//         title: "Added to Cart 🛍️",
//         message: `"${title || "Product"}" has been successfully added to your shopping cart.`,
//         type: "order",
//       });
//     } catch (notifyError) {
//       console.error("Notification creation failed (cart add):", notifyError.message);
//     }

//     res.status(201).json({ success: true, message: "Added to cart successfully", cartItem });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// const removeFromCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { id } = req.params;

//     const deletedItem = await Cart.findOneAndDelete({ _id: id, userId });
//     if (!deletedItem) {
//       return res.status(404).json({ success: false, message: "Item not found in cart" });
//     }

//     try {
//       await Notification.create({
//         userId,
//         productId: deletedItem.productId,
//         title: "Removed from Cart 🗑️",
//         message: `"${deletedItem.title || "Product"}" has been removed from your cart.`,
//         type: "order",
//       });
//     } catch (notifyError) {
//       console.error("Notification creation failed (cart remove):", notifyError.message);
//     }

//     res.status(200).json({ success: true, message: "Removed from cart successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// const getCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const cart = await Cart.find({ userId });
//     res.status(200).json({ success: true, count: cart.length, cart });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ==================== ORDER CONTROLLERS ====================

// const createOrder = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const {
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
//       sellerId,
//     } = req.body;

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
//       sellerId,
//     });

//     const savedOrder = await newOrder.save();

//     try {
//       await Notification.create({
//         userId,
//         productId,
//         title: "Order Placed Successfully! 📦",
//         message: `Your order for ${productTitle} has been placed successfully.`,
//         type: "order",
//       });
//     } catch (notifyError) {
//       console.error("Notification creation failed (order create - customer):", notifyError.message);
//     }

//     if (sellerId) {
//       try {
//         await SellerNotification.create({
//           sellerId,
//           title: "New Order Received! 🛒",
//           message: `${fullName || "A customer"} ne "${productTitle}" ka order place kiya hai. Quantity: ${quantity || 1}.`,
//           type: "success",
//         });
//       } catch (notifyError) {
//         console.error("Notification creation failed (order create - seller):", notifyError.message);
//       }
//     } else {
//       console.warn("Order create: sellerId missing, seller notification skip ho gayi.");
//     }

//     res.status(201).json({ success: true, message: "Order created successfully", order: savedOrder });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// const getCustomerOrders = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const orders = await Order.find({ userId }).sort({ createdAt: -1 });
//     res.status(200).json({ success: true, count: orders.length, orders });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ==================== NOTIFICATION CONTROLLERS ====================

// const getCustomerNotifications = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
//     res.status(200).json({ success: true, count: notifications.length, notifications });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// const markNotificationsAsRead = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     await Notification.updateMany({ userId, read: false }, { $set: { read: true } });
//     res.status(200).json({ success: true, message: "Notifications marked as read" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// const markSingleNotificationAsRead = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { id } = req.params;

//     const updated = await Notification.findOneAndUpdate(
//       { _id: id, userId },
//       { $set: { read: true } },
//       { new: true }
//     );

//     if (!updated) {
//       return res.status(404).json({ success: false, message: "Notification not found" });
//     }

//     res.status(200).json({ success: true, message: "Notification marked as read", notification: updated });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// const clearAllNotifications = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     await Notification.deleteMany({ userId });
//     res.status(200).json({ success: true, message: "All notifications cleared" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ==================== ROUTES CONFIGURATION ====================
// // Public Routes
// router.post("/register", registerCustomer);
// router.post("/login", loginCustomer);
// router.post("/logout", logoutCustomer);

// // Email Verification Routes (fake email rokne ke liye)
// router.post("/verify-email", verifyEmail);
// router.post("/resend-verification-otp", resendVerificationOtp);

// // Forget Password Routes
// router.post("/forgot-password", forgotPassword);
// router.post("/verify-otp", verifyOtp);
// router.post("/reset-password", resetPassword);

// // Protected Routes (Secured with Bearer Token & protectCustomer middleware)
// router.get("/products", protectCustomer, getAllProductsForCustomer);

// router.post("/wishlist/add", protectCustomer, addToWishlist);
// router.delete("/wishlist/remove/:id", protectCustomer, removeFromWishlist);
// router.get("/wishlist", protectCustomer, getWishlist);

// router.post("/cart/add", protectCustomer, addToCart);
// router.delete("/cart/remove/:id", protectCustomer, removeFromCart);
// router.get("/cart", protectCustomer, getCart);

// router.post("/order/create", protectCustomer, createOrder);
// router.get("/orders", protectCustomer, getCustomerOrders);

// router.get("/notifications", protectCustomer, getCustomerNotifications);
// router.put("/notifications/read", protectCustomer, markNotificationsAsRead);
// router.put("/notifications/read/:id", protectCustomer, markSingleNotificationAsRead);
// router.delete("/notifications/clear", protectCustomer, clearAllNotifications);

// module.exports = router;





//claude new forget password




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

    try {
      await sendOtpEmail(savedCustomer.email, verifyOtp, savedCustomer.fullName, "verify");
    } catch (emailError) {
      console.error("Verification email failed to send:", emailError.message);
    }

    try {
      await Notification.create({
        userId: savedCustomer._id,
        title: "Welcome to Kavi Shawls! 🎉",
        message: "Thank you for registering with us. Please verify your email to unlock full access.",
        type: "offer",
      });
    } catch (notifyError) {
      console.error("Notification creation failed (register):", notifyError.message);
    }

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
      message: "Registration successful! Please check your email for a verification OTP.",
      token,
      userId: savedCustomer._id,
      isEmailVerified: false,
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

//     try {
//       await Notification.create({
//         userId: user._id,
//         title: "Login Successful! 🔓",
//         message: `Welcome back, ${user.fullName || "Customer"}! You successfully logged into your account.`,
//         type: "order",
//       });
//     } catch (notifyError) {
//       console.error("Notification creation failed (login):", notifyError.message);
//     }

//     const token = jwt.sign(
//       { id: user._id, email: user.email, role: "customer" },
//       JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "strict",
//       maxAge: 24 * 60 * 60 * 1000,
//     });

//     res.status(200).json({
//       message: "Login Successfully",
//       token,
//       isEmailVerified: user.isEmailVerified,
//     });
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ message: error.message || "Server error during login" });
//   }
// };
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

    try {
      await Notification.create({
        userId: user._id,
        title: "Login Successful! 🔓",
        message: `Welcome back, ${user.fullName || "Customer"}! You successfully logged into your account.`,
        type: "order",
      });
    } catch (notifyError) {
      console.error("Notification creation failed (login):", notifyError.message);
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
      isEmailVerified: user.isEmailVerified,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: error.message || "Server error during login" });
  }
};

// /**
//  * @swagger
//  * /api/customer/logout:
//  *   post:
//  *     summary: Customer Logout
//  *     tags: [Customer Authentication & Management]
//  *     responses:
//  *       200:
//  *         description: Logged out successfully
//  */
// const logoutCustomer = async (req, res) => {
//   try {
//     res.clearCookie("token", {
//       httpOnly: true,
//       sameSite: "strict",
//     });
//     res.status(200).json({ message: "Logged out successfully" });
//   } catch (error) {
//     console.error("Error during logout:", error);
//     res.status(500).json({ message: "Server error during logout" });
//   }
// };


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
    // Aap chahein toh yahan optional notification ya token blacklist logic likh sakte hain
    return res.status(200).json({ 
      success: true, 
      message: "Logged out successfully" 
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

    const customer = userId
      ? await Customer.findById(userId)
      : await Customer.findOne({ email });

    if (!customer) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    }

    if (customer.isEmailVerified) {
      return res.status(200).json({ success: true, message: "Email already verified" });
    }

    const verifyOtp = Math.floor(100000 + Math.random() * 900000).toString();
    customer.emailVerifyOtp = await bcrypt.hash(verifyOtp, 10);
    customer.emailVerifyOtpExpiry = new Date(Date.now() + 15 * 60 * 1000);
    await customer.save();

    await sendOtpEmail(customer.email, verifyOtp, customer.fullName, "verify");

    res.status(200).json({ success: true, message: "Verification OTP resent to your email" });
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

    await sendOtpEmail(customer.email, otp, customer.fullName, "reset");

    res.status(200).json({
      success: true,
      message: "OTP has been sent to your registered email",
      userId: customer._id,
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

    try {
      await Notification.create({
        userId: customer._id,
        title: "Password Changed 🔑",
        message: "Your password was reset successfully. If this wasn't you, please contact support immediately.",
        type: "offer",
      });
    } catch (notifyError) {
      console.error("Notification creation failed (reset-password):", notifyError.message);
    }

    res.status(200).json({ success: true, message: "Password reset successful" });
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
    const { productId, title, description, price, originalPrice, discount, image,sellerId } = req.body;

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

    try {
      await Notification.create({
        userId,
        productId,
        title: "Added to Wishlist ❤️",
        message: `"${title || "Product"}" has been added to your wishlist.`,
        type: "offer",
      });
    } catch (notifyError) {
      console.error("Notification creation failed (wishlist add):", notifyError.message);
    }

    res.status(201).json({ success: true, message: "Added to wishlist successfully", wishlistItem });
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

    try {
      await Notification.create({
        userId,
        productId: deletedItem.productId,
        title: "Removed from Wishlist ❌",
        message: `"${deletedItem.title || "Product"}" was removed from your wishlist.`,
        type: "offer",
      });
    } catch (notifyError) {
      console.error("Notification creation failed (wishlist remove):", notifyError.message);
    }

    res.status(200).json({ success: true, message: "Removed from wishlist successfully" });
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

      try {
        await Notification.create({
          userId,
          productId,
          title: "Cart Updated 🛒",
          message: `Quantity for "${title || "Product"}" was updated in your cart.`,
          type: "order",
        });
      } catch (notifyError) {
        console.error("Notification creation failed (cart update):", notifyError.message);
      }

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

    try {
      await Notification.create({
        userId,
        productId,
        title: "Added to Cart 🛍️",
        message: `"${title || "Product"}" has been successfully added to your shopping cart.`,
        type: "order",
      });
    } catch (notifyError) {
      console.error("Notification creation failed (cart add):", notifyError.message);
    }

    res.status(201).json({ success: true, message: "Added to cart successfully", cartItem });
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

    try {
      await Notification.create({
        userId,
        productId: deletedItem.productId,
        title: "Removed from Cart 🗑️",
        message: `"${deletedItem.title || "Product"}" has been removed from your cart.`,
        type: "order",
      });
    } catch (notifyError) {
      console.error("Notification creation failed (cart remove):", notifyError.message);
    }

    res.status(200).json({ success: true, message: "Removed from cart successfully" });
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
 *               productTitle:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: number
 *               totalAmount:
 *                 type: number
 *               fullName:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order created successfully
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
      sellerId,
    });

    const savedOrder = await newOrder.save();

    try {
      await Notification.create({
        userId,
        productId,
        title: "Order Placed Successfully! 📦",
        message: `Your order for ${productTitle} has been placed successfully.`,
        type: "order",
      });
    } catch (notifyError) {
      console.error("Notification creation failed (order create - customer):", notifyError.message);
    }

    if (sellerId) {
      try {
        await SellerNotification.create({
          sellerId,
          title: "New Order Received! 🛒",
          message: `${fullName || "A customer"} ne "${productTitle}" ka order place kiya hai. Quantity: ${quantity || 1}.`,
          type: "success",
        });
      } catch (notifyError) {
        console.error("Notification creation failed (order create - seller):", notifyError.message);
      }
    } else {
      console.warn("Order create: sellerId missing, seller notification skip ho gayi.");
    }

    res.status(201).json({ success: true, message: "Order created successfully", order: savedOrder });
  } catch (error) {
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

    try {
      await Notification.create({
        userId,
        productId: order.productId,
        title: "Order Cancelled ❌",
        message: `Your order for "${order.productTitle}" has been cancelled successfully.`,
        type: "order",
      });
    } catch (notifyError) {
      console.error("Notification creation failed (order cancel - customer):", notifyError.message);
    }

    if (order.sellerId) {
      try {
        await SellerNotification.create({
          sellerId: order.sellerId,
          title: "Order Cancelled by Customer ⚠️",
          message: `${order.fullName || "A customer"} ne "${order.productTitle}" ka order cancel kar diya hai.`,
          type: "warning",
        });
      } catch (notifyError) {
        console.error("Notification creation failed (order cancel - seller):", notifyError.message);
      }
    }

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
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

// ==================== ROUTES CONFIGURATION ====================
// Public Auth Routes
router.post("/register", registerCustomer);
router.post("/login", loginCustomer);
router.post("/logout",protectCustomer,logoutCustomer);

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

router.post("/order/create", protectCustomer, createOrder);
router.get("/orders", protectCustomer, getCustomerOrders);
router.put("/order/cancel/:id", protectCustomer, cancelOrder);   // ✅ NEW

router.get("/notifications", protectCustomer, getCustomerNotifications);
router.put("/notifications/read", protectCustomer, markNotificationsAsRead);
router.put("/notifications/read/:id", protectCustomer, markSingleNotificationAsRead);
router.delete("/notifications/clear", protectCustomer, clearAllNotifications);

module.exports = router;