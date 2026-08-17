const mongoose = require("mongoose");

// NOTE: renamed from "Product" -> "ShawlProduct" to avoid clashing with
// AdminProduct and SellerProduct models when merged into one database.
const shawlProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "Men",
    },
    stock: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ShawlProduct", shawlProductSchema, "shawlproducts");
