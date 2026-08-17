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














const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Customer = require("../models/Customer");
const Notification = require("../models/Notification"); // ✅ 1. Notification Model Import Karein

// Register -> POST /api/shawls/auth/register
router.post("/register", async (req, res) => {
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

    const savedCustomer = await newCustomer.save(); // ✅ Saved customer ki ID lene ke liye variable me store kiya

    // ✅ 2. Register hone par Welcome Notification create karein
    await Notification.create({
      userId: savedCustomer._id,
      title: "Welcome to Kavi Shawls! 🎉",
      message: "Thank you for registering with us. Enjoy exploring our luxury collection.",
      type: "offer"
    });

    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again." });
  }
});

// Login -> POST /api/shawls/auth/login
router.post("/login", async (req, res) => {
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

    // ✅ 3. Login successful hone par Notification create karein
    await Notification.create({
      userId: user._id,
      title: "Login Successful! 🔓",
      message: `Welcome back, ${user.name || "Customer"}! You successfully logged into your account.`,
      type: "order"
    });

    const userObj = user.toObject();
    delete userObj.password;

    res.status(200).json({ message: "Login Successfully", user: userObj });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during login" });
  }
});

// Get all registered customers -> GET /api/shawls/auth/admin/users
router.get("/admin/users", async (req, res) => {
  try {
    const users = await Customer.find().select("-password").sort({ createdAt: -1 });
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error while fetching users." });
  }
});

module.exports = router;