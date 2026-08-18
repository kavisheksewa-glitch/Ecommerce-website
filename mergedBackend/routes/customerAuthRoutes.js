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



const express = require("express");
const router = express.Router();
const {
  registerCustomer,
  loginCustomer,
  getAllCustomers,
} = require("../controllers/customerController");

/**
 * @swagger
 * tags:
 *   name: customer login and register
 *   description: customer login and register management APIs
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Enter your JWT token in the format (e.g. Bearer <token>)
 *   schemas:
 *     Customer:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "60d0fe4f5311236168a109ca"
 *         fullName:
 *           type: string
 *           example: "Rahul Sharma"
 *         email:
 *           type: string
 *           example: "rahul@gmail.com"
 *         mobile:
 *           type: string
 *           example: "9876543210"
 *         dob:
 *           type: string
 *           example: "15-08-1995"
 *         houseNo:
 *           type: string
 *           example: "Flat 402"
 *         street:
 *           type: string
 *           example: "Main Market Road"
 *         city:
 *           type: string
 *           example: "Amritsar"
 *         state:
 *           type: string
 *           example: "Punjab"
 *         pincode:
 *           type: string
 *           example: "143001"
 *         country:
 *           type: string
 *           example: "India"
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/shawls/auth/register:
 *   post:
 *     summary: Register a new customer
 *     description: Registers a new customer account, hashes the password, sends a welcome notification, and returns a JWT token.
 *     tags: [customer login and register]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - mobile
 *               - dob
 *               - password
 *               - houseNo
 *               - street
 *               - city
 *               - state
 *               - pincode
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "Rahul Sharma"
 *               email:
 *                 type: string
 *                 example: "rahul@gmail.com"
 *               mobile:
 *                 type: string
 *                 example: "9876543210"
 *               dob:
 *                 type: string
 *                 example: "15-08-1995"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               houseNo:
 *                 type: string
 *                 example: "Flat 402"
 *               street:
 *                 type: string
 *                 example: "Main Market Road"
 *               city:
 *                 type: string
 *                 example: "Amritsar"
 *               state:
 *                 type: string
 *                 example: "Punjab"
 *               pincode:
 *                 type: string
 *                 example: "143001"
 *     responses:
 *       '201':
 *         description: Registration successful with JWT Token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Registration successful!"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '400':
 *         description: Email is already registered
 *       '500':
 *         description: Server error
 */
router.post("/register", registerCustomer);

/**
 * @swagger
 * /api/shawls/auth/login:
 *   post:
 *     summary: Login customer
 *     description: Authenticates customer credentials, creates a login notification, and returns a JWT token.
 *     tags: [customer login and register]
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
 *                 example: "rahul@gmail.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       '200':
 *         description: Login successful with JWT Token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login Successfully"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   $ref: '#/components/schemas/Customer'
 *       '400':
 *         description: Invalid email or password
 *       '500':
 *         description: Server error during login
 */
router.post("/login", loginCustomer);

/**
 * @swagger
 * /api/shawls/auth/admin/users:
 *   get:
 *     summary: Get all registered customers (Admin)
 *     description: Retrieves a list of all customers excluding their passwords, sorted by latest first.
 *     tags: [customer login and register]
 *     responses:
 *       '200':
 *         description: List of users fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Customer'
 *       '500':
 *         description: Server error while fetching users
 */
router.get("/admin/users", getAllCustomers);

module.exports = router;