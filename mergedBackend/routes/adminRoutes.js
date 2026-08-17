const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const AdminProduct = require("../models/AdminProduct");

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ success: false, message: "Invalid Email!" });
    }

    if (admin.password !== password) {
      return res.status(400).json({ success: false, message: "Invalid Password!" });
    }

    res.status(200).json({ success: true, message: "Login Successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
});

// Register
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const newAdmin = new Admin({ email, password });
    await newAdmin.save();
    res.status(201).json({ success: true, message: "Admin registered successfully!" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Get All Products (admin's own products)
router.get("/products", async (req, res) => {
  try {
    const products = await AdminProduct.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
});

// Add New Product (+ n8n Integration, kept from original)
router.post("/products", async (req, res) => {
  try {
    const { title, category, price, image } = req.body;

    const newProduct = new AdminProduct({
      title,
      category,
      price,
      image
    });

    await newProduct.save();

    // === n8n Webhook Trigger (non-blocking) ===
    try {
      await fetch("http://localhost:5678/webhook-test/0ec00539-adda-42fd-be5d-70916c0e0e86", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "NEW_PRODUCT_ADDED",
          title: newProduct.title,
          category: newProduct.category,
          price: newProduct.price,
        }),
      });
    } catch (n8nErr) {
      console.log("n8n webhook error (Non-blocking):", n8nErr.message);
    }

    res.status(201).json({ success: true, message: "Product added successfully!", newProduct });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to add product", error: error.message });
  }
});

// Delete Product
router.delete("/products/:id", async (req, res) => {
  try {
    await AdminProduct.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Product deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting product", error: error.message });
  }
});

module.exports = router;
