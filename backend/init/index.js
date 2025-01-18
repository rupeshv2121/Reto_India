const mongoose = require("mongoose");
const sampleProduct = require("./data");
const product = require("../models/Product");
const mongoURL = "mongodb://localhost:27017/reto_india";

main().then(() => {
    console.log("Sample Product initialised");
})
    .catch((err) => {
        console.log(err);
    })

async function main() {
    await mongoose.connect(mongoURL);
}

const initProduct = async () => {
    await product.insertMany(sampleProduct.data);
    console.log("Sample Product listed");
}

initProduct();