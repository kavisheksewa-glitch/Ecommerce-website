const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  register,
  login,
  getSeller,
  getAllSellers,
  updateSeller,
  updateSellerStatus,
} = require("../controllers/sellerAuthController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/register", upload.single("profilePicture"), register);
router.post("/login", login);
router.get("/seller/:id", getSeller);
router.put("/seller/:id", upload.single("profilePicture"), updateSeller); // <-- Yahan upload middleware add kar diya gaya hai
router.get("/admin/sellers", getAllSellers);
router.put("/admin/seller-status/:id", updateSellerStatus); // Yahan apna controller function name dein

module.exports = router;