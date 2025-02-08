const mongoose = require('mongoose');

const AddProductSchema = new mongoose.Schema({
    image1: String,
    image2: String,
    image3: String,
    image4: String,
    image5: String,
    title: String,
    price: String,
    discounted_price: String,
    discount_percentage: String,
    material: String,
    quantity: Number,
    description: String
});

const AddProduct = mongoose.model('AddProduct', AddProductSchema);

module.exports = AddProduct;
