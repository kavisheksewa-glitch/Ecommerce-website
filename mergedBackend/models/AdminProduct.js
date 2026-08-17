const mongoose = require("mongoose");

// NOTE: renamed from "Product" -> "AdminProduct" to avoid clashing with
// SellerProduct and ShawlProduct models when merged into one database.
const adminProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String },
});

module.exports = mongoose.model("AdminProduct", adminProductSchema, "adminproducts");
