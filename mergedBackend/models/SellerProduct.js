

const mongoose = require("mongoose");


const sellerProductSchema = new mongoose.Schema(
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
    productImages: { type: [String], default: [] },          
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SellerProduct", sellerProductSchema, "sellerproducts");