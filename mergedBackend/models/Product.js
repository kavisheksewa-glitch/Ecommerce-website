const mongoose = require("mongoose");

// NOTE: renamed from "Product" -> "SellerProduct" to avoid clashing with
// AdminProduct and ShawlProduct models when merged into one database.
const allProductSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String },
    brandLogo: { type: String }, // Brand Logo field added here
    fabric: { type: String },
    washCare: { type: String },
    color: { type: String },
    size: { type: String },
    price: { type: Number, required: true },
    discount: { type: Number },
    description: { type: String },
    stockQuantity: { type: Number, required: true },
    productImage: { type: String, required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("allProduct", allProductSchema, "allproducts");