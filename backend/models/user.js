const mongoose = require("mongoose");

const userOrderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    phone: {
        type: Number,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    pinCode: {
        type: Number,
        required: true
    },

    cartItems: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
        },
    ],
}, { timestamps: true })

const userOrderInfo = mongoose.model("User_Order_Info", userOrderSchema);
module.exports = userOrderInfo;