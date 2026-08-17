// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { addProduct, getProducts } = require("../controllers/sellerProductController");
// const { protect } = require("../middleware/authMiddleware");

// const storage = multer.diskStorage({
//   destination: "./uploads/",
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// const upload = multer({ storage });

// // Multiple files ke liye upload.fields use karein
// const uploadFields = upload.fields([
//   { name: "productImage", maxCount: 1 },
//   { name: "brandLogo", maxCount: 1 }
// ]);

// // POST /api/seller/products/add
// router.post("/add", protect, uploadFields, addProduct);

// // GET /api/seller/products
// router.get("/", getProducts);

// module.exports = router;










// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { 
//   addProduct, 
//   getProducts, 
//   updateProduct, 
//   deleteProduct 
// } = require("../controllers/sellerProductController");
// const { protect } = require("../middleware/authMiddleware");

// const storage = multer.diskStorage({
//   destination: "./uploads/",
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// const upload = multer({ storage });

// // Multiple files ke liye upload.fields use karein
// const uploadFields = upload.fields([
//   { name: "productImage", maxCount: 1 },
//   { name: "brandLogo", maxCount: 1 }
// ]);

// // POST /api/seller/products/add (Create)
// router.post("/add", protect, uploadFields, addProduct);

// // GET /api/seller/products (Read)
// router.get("/", protect, getProducts);

// // PUT /api/seller/products/update/:id (Update)
// router.put("/update/:id", protect, updateProduct);

// // DELETE /api/seller/products/delete/:id (Delete)
// router.delete("/delete/:id", protect, deleteProduct);

// module.exports = router;








const express = require("express");
const router = express.Router();
const multer = require("multer");
const { 
  addProduct, 
  getProducts, 
  updateProduct, 
  deleteProduct 
} = require("../controllers/sellerProductController");
const { protect } = require("../middleware/authMiddleware");

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Multiple files ke liye upload.fields use karein
const uploadFields = upload.fields([
  { name: "productImage", maxCount: 1 },
  { name: "brandLogo", maxCount: 1 }
]);
router.get("/public", getProducts);
// POST /api/seller/products/add (Create product)
router.post("/add", protect, uploadFields, addProduct);

// GET /api/seller/products (Get all products for seller)
router.get("/", protect, getProducts);

// PUT /api/seller/products/update/:id (Update product)
router.put("/update/:id", protect, uploadFields, updateProduct);

// DELETE /api/seller/products/delete/:id (Delete product)
router.delete("/delete/:id", protect, deleteProduct);

module.exports = router;