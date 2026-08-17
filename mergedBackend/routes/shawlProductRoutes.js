const express = require("express");
const router = express.Router();

const ShawlProduct = require("../models/ShawlProduct");

// Add Product -> POST /api/shawls/products/add
router.post("/add", async (req, res) => {
  try {
    const product = new ShawlProduct(req.body);

    await product.save();

    res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get All Products -> GET /api/shawls/products/products
router.get("/products", async (req, res) => {
  try {
    const products = await ShawlProduct.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
