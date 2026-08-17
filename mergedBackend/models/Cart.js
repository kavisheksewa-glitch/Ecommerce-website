const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  price: { type: String, required: true },
  image: { type: String },
  quantity: { type: Number, default: 1 }
});

module.exports = mongoose.model('Cart', cartSchema);
