const mongoose = require("mongoose");


const allProductSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String },
    brandLogo: { type: String }, 
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