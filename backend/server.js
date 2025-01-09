const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userOrderInfo = require("./models/user")
const app = express();
app.use(bodyParser.json());
app.use(cors());


const MONGO_URL = "mongodb://localhost:27017/checkoutDB";
main().then(() => {
    console.log("Connected TO Reto_India DB");
})
    .catch(err => {
        console.log(err);
    })
async function main() {
    await mongoose.connect(MONGO_URL);
}

app.post("/checkout", async (req, res) => {
    try {
        const newUser = new userOrderInfo(req.body);
        await newUser.save();
        console.log('Received order data:', req.body);
        res.status(200).send("User details saved.");
    } catch (e) {
        console.error(e);
        res.status(500).send("Error saving user details.");
    }
});
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
