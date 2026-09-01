// const SellerProduct = require('../models/SellerProduct');

// // 1. Get all products function
// const getProducts = async (req, res) => {
//   try {
//     const products = await SellerProduct.find();
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // 2. Add product function
// const addProduct = async (req, res) => {
//   try {
//     const {
//       productName,
//       category,
//       brand,
//       fabric,
//       color,
//       washCare,
//       size,
//       price,
//       discount,
//       description,
//       stockQuantity
//     } = req.body;

//     // req.files use karein kyunki upload.fields lagaya hai
//     const productImage = req.files?.productImage ? req.files.productImage[0].path : "";
//     const brandLogo = req.files?.brandLogo ? req.files.brandLogo[0].path : "";

//     // Validation check
//     if (!productImage) {
//       return res.status(400).json({ message: "Product image is required" });
//     }

//     const newProduct = await SellerProduct.create({
//       productName,
//       category,
//       brand,
//       brandLogo, // Brand logo save ho raha hai
//       fabric,
//       washCare,
//       color,
//       size,
//       price,
//       discount,
//       description,
//       stockQuantity,
//       productImage,
//       sellerId: req.seller.id // JWT token se mili seller ID
//     });

//     res.status(201).json({ message: "Product Added Successfully", product: newProduct });
//   } catch (error) {
//     console.error("Add Product Error:", error); // Terminal mein error dekhne ke liye
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = { addProduct, getProducts };











// const SellerProduct = require('../models/SellerProduct');

// // 1. Get all products function
// const getProducts = async (req, res) => {
//   try {
//     const products = await SellerProduct.find();
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // 2. Add product function
// const addProduct = async (req, res) => {
//   try {
//     const {
//       productName,
//       category,
//       brand,
//       fabric,
//       color,
//       washCare,
//       size,
//       price,
//       discount,
//       description,
//       stockQuantity
//     } = req.body;

//     // req.files use karein kyunki upload.fields lagaya hai
//     const productImage = req.files?.productImage ? req.files.productImage[0].path : "";
//     const brandLogo = req.files?.brandLogo ? req.files.brandLogo[0].path : "";

//     // Validation check
//     if (!productImage) {
//       return res.status(400).json({ message: "Product image is required" });
//     }

//     console.log("Adding Product:", {
//       productName,
//       category,
//       brand,
//       fabric,
//       washCare,
//       color,
//       size,
//       price,
//       discount,
//       description,
//       stockQuantity,
//       productImage,
//       brandLogo
//     });

//     const newProduct = await SellerProduct.create({
//       productName,
//       category,
//       brand,
//       brandLogo, // Brand logo save ho raha hai
//       fabric,
//       washCare,
//       color,
//       size,
//       price,
//       discount,
//       description,
//       stockQuantity,
//       productImage,
//       sellerId: req.seller.id // JWT token se mili seller ID
//     });
// console.log("New Product Added:", newProduct); // Terminal mein product details dekhne ke liye
//     res.status(201).json({ message: "Product Added Successfully", product: newProduct });
//   } catch (error) {
//     console.error("Add Product Error:", error); // Terminal mein error dekhne ke liye
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = { addProduct, getProducts };






// Sahi

// const SellerProduct = require('../models/SellerProduct');

// // 1. Get all products function
// const getProducts = async (req, res) => {
//   try {
//     const products = await SellerProduct.find();
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // 2. Add product function
// const addProduct = async (req, res) => {
//   try {
//     const {
//       productName,
//       category,
//       brand,
//       fabric,
//       color,
//       washCare,
//       size,
//       price,
//       discount,
//       description,
//       stockQuantity
//     } = req.body;

//     const productImage = req.files?.productImage ? req.files.productImage[0].path : "";
//     const brandLogo = req.files?.brandLogo ? req.files.brandLogo[0].path : "";

//     if (!productImage) {
//       return res.status(400).json({ message: "Product image is required" });
//     }

//     const newProduct = await SellerProduct.create({
//       productName,
//       category,
//       brand,
//       brandLogo,
//       fabric,
//       washCare,
//       color,
//       size,
//       price,
//       discount,
//       description,
//       stockQuantity,
//       productImage,
//       sellerId: req.seller.id
//     });

//     res.status(201).json({ message: "Product Added Successfully", product: newProduct });
//   } catch (error) {
//     console.error("Add Product Error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // 3. Update product function
// const updateProduct = async (req, res) => {
//   try {
//     const productId = req.params.id;
    
//     // Agar nayi image upload ki gayi ho toh path update karein
//     const updateData = { ...req.body };
//     if (req.files?.productImage) {
//       updateData.productImage = req.files.productImage[0].path;
//     }
//     if (req.files?.brandLogo) {
//       updateData.brandLogo = req.files.brandLogo[0].path;
//     }

//     const updatedProduct = await SellerProduct.findByIdAndUpdate(
//       productId,
//       updateData,
//       { new: true, runValidators: true }
//     );

//     if (!updatedProduct) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.status(200).json({ message: "Product Updated Successfully", product: updatedProduct });
//   } catch (error) {
//     console.error("Update Product Error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // 4. Delete product function
// const deleteProduct = async (req, res) => {
//   try {
//     const productId = req.params.id;

//     const deletedProduct = await SellerProduct.findByIdAndDelete(productId);

//     if (!deletedProduct) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.status(200).json({ message: "Product Deleted Successfully" });
//   } catch (error) {
//     console.log("Delete Product Error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = { 
//   addProduct, 
//   getProducts, 
//   updateProduct, 
//   deleteProduct 
// };










// new





//const SellerProduct = require('../models/SellerProduct');

// 1. Get products function (Updated: ab yeh sirf logged-in seller ke products dikhayega)
// const getProducts = async (req, res) => {
//   try {
//     // Check karein ki request ke sath seller ki ID aa rahi hai ya nahi (protect middleware se)
//     if (req.seller && req.seller.id) {
//       const products = await SellerProduct.find({ sellerId: req.seller.id });
//       return res.status(200).json(products);
//     } else {
//       // Agar public route ya bina login ke call hua ho toh sabhi products dikhayein
//       const products = await SellerProduct.find();
//       return res.status(200).json(products);
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


// const getProducts = async (req, res) => {
//   try {
//     // Agar logged-in seller hai toh sirf uske products, warna sabhi ke products
//     if (req.seller && req.seller.id) {
//       const products = await SellerProduct.find({ sellerId: req.seller.id }).sort({ createdAt: -1 });
//       return res.status(200).json(products);
//     } else {
//       const products = await SellerProduct.find().sort({ createdAt: -1 });
//       return res.status(200).json(products);
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // 2. Add product function
// const addProduct = async (req, res) => {
//   try {
//     const {
//       productName,
//       category,
//       brand,
//       fabric,
//       color,
//       washCare,
//       size,
//       price,
//       discount,
//       description,
//       stockQuantity
//     } = req.body;

//     const productImage = req.files?.productImage ? req.files.productImage[0].path : "";
//     const brandLogo = req.files?.brandLogo ? req.files.brandLogo[0].path : "";

//     if (!productImage) {
//       return res.status(400).json({ message: "Product image is required" });
//     }

//     const newProduct = await SellerProduct.create({
//       productName,
//       category,
//       brand,
//       brandLogo,
//       fabric,
//       washCare,
//       color,
//       size,
//       price,
//       discount,
//       description,
//       stockQuantity,
//       productImage,
//       sellerId: req.seller.id
//     });

//     res.status(201).json({ message: "Product Added Successfully", product: newProduct });
//   } catch (error) {
//     console.error("Add Product Error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // 3. Update product function
// const updateProduct = async (req, res) => {
//   try {
//     const productId = req.params.id;
    
//     const updateData = { ...req.body };
//     if (req.files?.productImage) {
//       updateData.productImage = req.files.productImage[0].path;
//     }
//     if (req.files?.brandLogo) {
//       updateData.brandLogo = req.files.brandLogo[0].path;
//     }

//     const updatedProduct = await SellerProduct.findOneAndUpdate(
//       { _id: productId, sellerId: req.seller.id }, // Security check: taaki seller sirf apna hi product update kare
//       updateData,
//       { returnDocument: 'after', runValidators: true }
//     );

//     if (!updatedProduct) {
//       return res.status(404).json({ message: "Product not found or unauthorized" });
//     }

//     res.status(200).json({ message: "Product Updated Successfully", product: updatedProduct });
//   } catch (error) {
//     console.error("Update Product Error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // 4. Delete product function
// const deleteProduct = async (req, res) => {
//   try {
//     const productId = req.params.id;

//     const deletedProduct = await SellerProduct.findOneAndDelete({ 
//       _id: productId, 
//       sellerId: req.seller.id // Security check: taaki seller sirf apna hi product delete kare
//     });

//     if (!deletedProduct) {
//       return res.status(404).json({ message: "Product not found or unauthorized" });
//     }

//     res.status(200).json({ message: "Product Deleted Successfully" });
//   } catch (error) {
//     console.log("Delete Product Error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = { 
//   addProduct, 
//   getProducts, 
//   updateProduct, 
//   deleteProduct 
// };




//1 sept 2026 morning



const SellerProduct = require("../models/SellerProduct");
const Seller = require("../models/Seller");   // ✅ zaroori import

// 1. Get products function
const getProducts = async (req, res) => {
  try {
    if (req.seller && req.seller.id) {
      const products = await SellerProduct.find({ sellerId: req.seller.id }).sort({ createdAt: -1 });
      return res.status(200).json(products);
    } else {
      const products = await SellerProduct.find().sort({ createdAt: -1 });
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
    // ❌ 'brand' ab req.body se nahi liya jaata

    const productImage = req.files?.productImage ? req.files.productImage[0].path : "";
    // ❌ brandLogo ab req.files se nahi liya jaata

    if (!productImage) {
      return res.status(400).json({ message: "Product image is required" });
    }

    // ✅ Seller ke profile se brand data fetch karo
    const seller = await Seller.findById(req.seller.id).select("brandName brandLogo shopName");
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    const newProduct = await SellerProduct.create({
      productName,
      category,
      brand: seller.brandName || seller.shopName,   // ✅ seller se aaya
      brandLogo: seller.brandLogo,                    // ✅ seller se aaya
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

    // ✅ brand fields ab product form se update nahi honge, seller Settings se update hote hain
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