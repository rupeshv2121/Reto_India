const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid")

const AllProductSchema = new mongoose.Schema({
    productId: {
        type: String,
        default: () => uuidv4(),
        unique: true,
        required: true,
    },

    name: {
        type: String,
        unique: true
    },

    Image: {
        type: String,
    },

    price: {
        type: Number,
        required: true
    }

})

module.exports = mongoose.model("AllProducts", AllProductSchema);