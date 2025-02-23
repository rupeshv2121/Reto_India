const mongoose = require("mongoose");
const crypto = require("crypto");

const generateShortId = () => crypto.randomBytes(4).toString("hex"); // 8-char unique ID

const UserOrdersSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    ref: "UserSignUpInfo", // Reference to the UserSignUpInfo model
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pinCode: {
    type: Number,
    required: true,
  },
  cartItems: [
    {
      itemId: { type: String, default: generateShortId, unique: true },
      title: { type: String, required: true },
      image1: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      Status: { type: String, default: "Placed" }, // Corrected typo: "status" instead of "Status"
      trackLocations: [
        {
          location: { type: String, required: true }, // e.g., "Mumbai", "Delhi"
          timestamp: { type: Date, default: Date.now }, // Timestamp of the update
        },
      ],
    },
  ],
}, { timestamps: true });

const UserOrdersInfo = mongoose.model("UserOrdersInfo", UserOrdersSchema);
module.exports = UserOrdersInfo;