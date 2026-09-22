


const SellerProduct = require("../models/SellerProduct");
const Seller = require("../models/Seller");   // ✅ zaroori import

// ✅ NEW: req.files se saari uploaded images ke URLs nikalne ka helper
// - "productImages" (multiple, max 5) aur purana "productImage" (single) dono support
// - Cloudinary me f.path pura https URL hota hai
const getUploadedImages = (files) => {
  if (!files) return [];
  const uploaded = [
    ...(files.productImages || []),
    ...(files.productImage || []),
  ];
  return uploaded.map((f) => f.path);
};

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

    // ✅ NEW: multiple images
    const productImages = getUploadedImages(req.files);

    if (productImages.length === 0) {
      return res.status(400).json({ message: "At least one product image is required" });
    }

    // Main image = pehli image (purane code / cart / wishlist ke liye)
    const productImage = productImages[0];

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
      productImage,    // main image
      productImages,   // ✅ NEW: saari images
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
// const updateProduct = async (req, res) => {
//   try {
//     const productId = req.params.id;

//     const updateData = { ...req.body };

//     // ✅ NEW: naye images aaye hon tabhi images update karo (purani replace ho jayengi)
//     const newImages = getUploadedImages(req.files);
//     if (newImages.length > 0) {
//       updateData.productImages = newImages;
//       updateData.productImage = newImages[0];
//     }

//     delete updateData.brand;
//     delete updateData.brandLogo;

//     const updatedProduct = await SellerProduct.findOneAndUpdate(
//       { _id: productId, sellerId: req.seller.id },
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

const updateProduct = async (req, res) => {
  
  try {
     
    const productId = req.params.id;

    // 1. Pehle database se purana product nikal lo
    const existingProduct = await SellerProduct.findOne({ _id: productId, sellerId: req.seller.id });
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found or unauthorized" });
    }

    const updateData = { ...req.body };

    // 2. Frontend se jo existing/purani images bachi hain unhe parse karo
    let retainedImages = [];
    if (req.body.existingImages) {
      try {
        retainedImages = JSON.parse(req.body.existingImages);
      } catch (e) {
        retainedImages = [];
      }
    }

    // 3. Nayi upload ki hui images nikalo (Aapke function ke mutabiq)
    const newImages = getUploadedImages(req.files);

    // 4. Purani retained images aur nayi images ko aapas mein merge kar do!
    const finalImages = [...retainedImages, ...newImages];

    // 5. Total 5 images limit check
    if (finalImages.length > 5) {
      return res.status(400).json({ message: "Maximum 5 images allowed per product." });
    }

    // 6. Agar images hain toh update data mein set karo
    if (finalImages.length > 0) {
      updateData.productImages = finalImages;
      updateData.productImage = finalImages[0]; // Pehli image ko main image set kar do
    }

    // Extra fields clean karo jo database mein nahi hain
    delete updateData.brand;
    delete updateData.brandLogo;
    delete updateData.existingImages; 

    // 7. Database update karo
    const updatedProduct = await SellerProduct.findOneAndUpdate(
      { _id: productId, sellerId: req.seller.id },
      updateData,
      { returnDocument: 'after', runValidators: true }
    );

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