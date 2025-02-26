// models/Cart.js
const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  title: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  items: [cartItemSchema],
  totalQuantity: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);
