



const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser"); // ✅ 1. Import cookie-parser
const connectDB = require("./config/db");
const Admin = require("./models/Admin");

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
// const { connectSMTP } = require("./utils/SendEmail");

dotenv.config();
connectDB();
// connectSMTP(); // ❌ Removed because SMTP code is no longer used

const app = express();

// ==================== MIDDLEWARE ====================

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://kavi-shawls.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true, // ✅ Zaroori hai taaki cookies frontend se backend jayein
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // ✅ 2. Use cookie-parser middleware

// uploads folder public
app.use("/uploads", express.static("uploads"));

// ==================== SWAGGER ====================
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Kavi Shawls E-Commerce API",
      version: "1.0.0",
      description: "API documentation for Kavi Shawls MERN E-Commerce Website",
    },
    servers: [
      {
        url: "https://ecommerce-website-ggui.onrender.com",
        description: "Production Server (Render)"
      },
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
        description: "Local Development Server",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/seller/auth", require("./routes/sellerAuthRoutes"));
app.use("/api/seller/products", require("./routes/sellerProductRoutes"));
app.use("/api/customer", require("./routes/customerAuthRoutes"));
app.use("/api/shawls/orders", require("./routes/orderRoutes"));
app.use("/api/seller/notifications", require("./routes/sellerNotificationRoutes"));
app.use("/api/shawls/auth/admin", require("./routes/adminRoutes"));

// ==================== DEFAULT ROUTE ====================
app.get("/", (req, res) => {
  res.send("Merged Backend (Admin + Seller + Shawls) is Running...");
});

// ==================== SERVER START ====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 Swagger running on http://localhost:${PORT}/api-docs`);
});