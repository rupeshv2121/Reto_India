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
})

const userOrderInfo = mongoose.model("User_Order_Info", userOrderSchema);
module.exports = userOrderInfo;