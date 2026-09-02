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

// // Wishlist route
// app.use("/api/shawls", require("./routes/wishlistRoutes"));

// // ✅ 4. Notifications Route (Registered here properly)
// app.use("/api/shawls/notifications", require("./routes/notificationRoutes"));


// //Seller Notifications Route (New)
// app.use("/api/seller/notifications", require("./routes/sellerNotificationRoutes"));

// app.get("/", (req, res) => {
//   res.send("Merged Backend (Admin + Seller + Shawls) is Running...");
// });

// // ==================== SERVER START ====================
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });










// swagger



// const session = require("express-session");
// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");
// const Admin = require("./models/Admin");

// const swaggerUi = require("swagger-ui-express");
// const swaggerJsdoc = require("swagger-jsdoc");

// dotenv.config();
// connectDB();

// const app = express();

// // ==================== MIDDLEWARE ====================


// app.use(
//   session({
//     secret: "kavi_shawls_secret_key", // Kuch bhi secret string
//     resave: false,
//     saveUninitialized: false,
//     // Yahan humne koi database store nahi diya, toh yeh by default RAM (Memory) mein save hoga.
//     // Jab server restart hoga, RAM clear ho jayegi aur sabhi login sessions gayab ho jayenge!
//   })
// );


// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "http://localhost:5174",
//     "http://localhost:5175"
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//   credentials: true,
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // uploads folder public
// app.use("/uploads", express.static("uploads"));


// // ==================== SWAGGER ====================

// const swaggerOptions = {
//   definition: {
//     openapi: "3.0.0",

//     info: {
//       title: "Kavi Shawls E-Commerce API",
//       version: "1.0.0",
//       description:
//         "API documentation for Kavi Shawls MERN E-Commerce Website",
//     },

//     servers: [
//       {
//         url: `http://localhost:${process.env.PORT || 5000}`,
//         description: "Local Development Server",
//       },
//     ],
//   },

//   apis: ["./routes/*.js"],
// };

// const swaggerSpec = swaggerJsdoc(swaggerOptions);

// app.use(
//   "/api-docs",
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerSpec)
// );


// // ==================== DEFAULT ADMIN SEED ====================

// const createDefaultAdmin = async () => {
//   try {
//     const existingAdmin = await Admin.findOne({
//       email: "admin@gmail.com"
//     });

//     if (!existingAdmin) {

//       await Admin.create({
//         email: "admin@gmail.com",
//         password: "admin123"
//       });

//       console.log(
//         "✅ Default Admin created (admin@gmail.com / admin123)"
//       );

//     } else {

//       console.log(
//         "Admin already exists in MongoDB."
//       );

//     }

//   } catch (error) {

//     console.log(
//       "Error creating default admin:",
//       error.message
//     );

//   }
// };

// createDefaultAdmin();


// // ==================== ROUTES ====================

// // 1. Admin backend
// app.use(
//   "/api/admin",
//   require("./routes/adminRoutes")
// );


// // 2. Seller backend
// app.use(
//   "/api/seller/auth",
//   require("./routes/sellerAuthRoutes")
// );

// app.use(
//   "/api/seller/products",
//   require("./routes/sellerProductRoutes")
// );


// // 3. Shawls backend
// // app.use(
// //   "/api/shawls/products",
// //   require("./routes/shawlProductRoutes")
// // );

// app.use(
//   "/api/shawls/cart",
//   require("./routes/cartRoutes")
// );

// app.use(
//   "/api/shawls/auth",
//   require("./routes/customerAuthRoutes")
// );

// app.use(
//   "/api/shawls/orders",
//   require("./routes/orderRoutes")
// );


// // Wishlist route
// app.use(
//   "/api/shawls",
//   require("./routes/wishlistRoutes")
// );


// // Notifications Route
// app.use(
//   "/api/shawls/notifications",
//   require("./routes/notificationRoutes")
// );


// // Seller Notifications Route
// app.use(
//   "/api/seller/notifications",
//   require("./routes/sellerNotificationRoutes")
// );


// // ==================== DEFAULT ROUTE ====================

// app.get("/", (req, res) => {
//   res.send(
//     "Merged Backend (Admin + Seller + Shawls) is Running..."
//   );
// });


// // ==================== SERVER START ====================

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {

//   console.log(
//     `🚀 Server running on http://localhost:${PORT}`
//   );

//   console.log(
//     `📚 Swagger running on http://localhost:${PORT}/api-docs`
//   );

// });





// new sahi



const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser"); // ✅ 1. Import cookie-parser
const connectDB = require("./config/db");
const Admin = require("./models/Admin");

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

dotenv.config();
connectDB();

const app = express();

// ==================== MIDDLEWARE ====================

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://kavi-shawls.vercel.app/"
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
// app.use("/api/shawls/cart", require("./routes/cartRoutes"));
app.use("/api/customer", require("./routes/customerAuthRoutes"));
app.use("/api/shawls/orders", require("./routes/orderRoutes"));
//app.use("/api/shawls", require("./routes/wishlistRoutes"));
//app.use("/api/shawls/notifications", require("./routes/notificationRoutes"));
app.use("/api/seller/notifications", require("./routes/sellerNotificationRoutes"));
// server.js mein ye routes bhi jod dein agar zaroorat ho:
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