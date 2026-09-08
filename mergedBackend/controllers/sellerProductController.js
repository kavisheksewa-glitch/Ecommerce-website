

const SellerProduct = require("../models/SellerProduct");
const Seller = require("../models/Seller");   // ✅ zaroori import

// 1. Get products function
const getProducts = async (req, res) => {
  try {
    if (req.seller && req.seller.id) {
      const products = await SellerProduct.find({ sellerId: req.seller.id })
        .populate("sellerId", "brandName brandLogo shopName") // ✅ live seller brand data
        .sort({ createdAt: -1 });
      return res.status(200).json(products);
    } else {
      const products = await SellerProduct.find()
        .populate("sellerId", "brandName brandLogo shopName") // ✅ live seller brand data
        .sort({ createdAt: -1 });
      return res.status(200).json(products);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Add product function
const addProduct = async (req, res) => {
  try {
    const {
      productName,
      category,
      fabric,
      color,
      washCare,
      size,
      price,
      discount,
      description,
      stockQuantity
    } = req.body;

    const productImage = req.files?.productImage ? req.files.productImage[0].path : "";

    if (!productImage) {
      return res.status(400).json({ message: "Product image is required" });
    }

    // Seller check (brandName/brandLogo ab product mein copy NAHI hoga —
    // hamesha getProducts ke populate se live fetch hoga)
    const seller = await Seller.findById(req.seller.id).select("brandName brandLogo shopName");
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    const newProduct = await SellerProduct.create({
      productName,
      category,
      fabric,
      washCare,
      color,
      size,
      price,
      discount,
      description,
      stockQuantity,
      productImage,
      sellerId: req.seller.id
      // ❌ brand aur brandLogo ab yahan save nahi karte — stale ho jaate the
    });

    res.status(201).json({ message: "Product Added Successfully", product: newProduct });
  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// 3. Update product function
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const updateData = { ...req.body };
    if (req.files?.productImage) {
      updateData.productImage = req.files.productImage[0].path;
    }

    delete updateData.brand;
    delete updateData.brandLogo;

    const updatedProduct = await SellerProduct.findOneAndUpdate(
      { _id: productId, sellerId: req.seller.id },
      updateData,
      { returnDocument: 'after', runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found or unauthorized" });
    }

    res.status(200).json({ message: "Product Updated Successfully", product: updatedProduct });
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// 4. Delete product function
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await SellerProduct.findOneAndDelete({
      _id: productId,
      sellerId: req.seller.id
    });

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found or unauthorized" });
    }

    res.status(200).json({ message: "Product Deleted Successfully" });
  } catch (error) {
    console.log("Delete Product Error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct
};