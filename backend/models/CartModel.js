// models/Cart.js
const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  title: { type: String },
  quantity: { type: Number, default: 1 },
  price: { type: Number },
  image: { type: String },
});

const cartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    items: [cartItemSchema],
    totalQuantity: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
