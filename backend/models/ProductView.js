const mongoose = require('mongoose');
const { v4: uuidv4 } = require("uuid")

const ProductSchema = new mongoose.Schema({
    productId: {
        type: String,
        default: () => uuidv4(),
        unique: true,
        required: true,
    },
    name: String,
    Rating: Number,
    NoOfRating: Number,
    Price: Number,
    Discount: String,
    OfferPrice: Number,
    ProdDescription: String,
    HeadImg: String,
    Img1: String,
    Img2: String,
    Img3: String,
    Img4: String
});

const Product = mongoose.model('Product', ProductSchema);



module.exports = Product;