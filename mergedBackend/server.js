// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");
// const Admin = require("./models/Admin");

// dotenv.config();
// connectDB();

// const app = express();

// // ==================== MIDDLEWARE ====================
// app.use(cors({
//   origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
//   methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
//   credentials: true,
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // uploads folder public (seller product images, profile pictures)
// app.use("/uploads", express.static("uploads"));

// // ==================== DEFAULT ADMIN SEED ====================
// const createDefaultAdmin = async () => {
//   try {
//     const existingAdmin = await Admin.findOne({ email: "admin@gmail.com" });
//     if (!existingAdmin) {
//       await Admin.create({ email: "admin@gmail.com", password: "admin123" });
//       console.log("✅ Default Admin created (admin@gmail.com / admin123)");
//     } else {
//       console.log("Admin already exists in MongoDB.");
//     }
//   } catch (error) {
//     console.log("Error creating default admin:", error.message);
//   }
// };
// createDefaultAdmin();

// // ==================== ROUTES ====================
// // 1. Admin backend
// app.use("/api/admin", require("./routes/adminRoutes"));

// // 2. Seller backend
// app.use("/api/seller/auth", require("./routes/sellerAuthRoutes"));
// app.use("/api/seller/products", require("./routes/sellerProductRoutes"));

// // 3. Shawls backend
// app.use("/api/shawls/products", require("./routes/shawlProductRoutes"));
// app.use("/api/shawls/cart", require("./routes/cartRoutes"));
// app.use("/api/shawls/auth", require("./routes/customerAuthRoutes"));
// app.use("/api/shawls/orders", require("./routes/orderRoutes"));

// // 👉 Wishlist route yahan main server mein add kar diya hai
// app.use("/api/shawls", require("./routes/wishlistRoutes"));

// app.get("/", (req, res) => {
//   res.send("Merged Backend (Admin + Seller + Shawls) is Running...");
// });

// // ==================== SERVER START ====================
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });












// new












const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Admin = require("./models/Admin");

dotenv.config();
connectDB();

const app = express();

// ==================== MIDDLEWARE ====================
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
  methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// uploads folder public (seller product images, profile pictures)
app.use("/uploads", express.static("uploads"));

// ==================== DEFAULT ADMIN SEED ====================
const createDefaultAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ email: "admin@gmail.com" });
    if (!existingAdmin) {
      await Admin.create({ email: "admin@gmail.com", password: "admin123" });
      console.log("✅ Default Admin created (admin@gmail.com / admin123)");
    } else {
      console.log("Admin already exists in MongoDB.");
    }
  } catch (error) {
    console.log("Error creating default admin:", error.message);
  }
};
createDefaultAdmin();

// ==================== ROUTES ====================
// 1. Admin backend
app.use("/api/admin", require("./routes/adminRoutes"));

// 2. Seller backend
app.use("/api/seller/auth", require("./routes/sellerAuthRoutes"));
app.use("/api/seller/products", require("./routes/sellerProductRoutes"));

// 3. Shawls backend
app.use("/api/shawls/products", require("./routes/shawlProductRoutes"));
app.use("/api/shawls/cart", require("./routes/cartRoutes"));
app.use("/api/shawls/auth", require("./routes/customerAuthRoutes"));
app.use("/api/shawls/orders", require("./routes/orderRoutes"));

// Wishlist route
app.use("/api/shawls", require("./routes/wishlistRoutes"));

// ✅ 4. Notifications Route (Registered here properly)
app.use("/api/shawls/notifications", require("./routes/notificationRoutes"));


app.get("/", (req, res) => {
  res.send("Merged Backend (Admin + Seller + Shawls) is Running...");
});

// ==================== SERVER START ====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});