const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const userOrderInfo = require("./models/user");
const Product = require("./models/Product");
const Review = require("./models/Review");
const ContactInfo = require("./models/ContactInfo");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connections
const MONGO_URL_1 = "mongodb://localhost:27017/checkoutDB";
const MONGO_URL_2 = "mongodb://127.0.0.1:27017/NewDatabase";

// Connect to both databases
(async () => {
    try {
        await mongoose.connect(MONGO_URL_1);
        console.log("Connected to checkoutDB");
    } catch (err) {
        console.error("Error connecting to checkoutDB:", err);
    }
    
    try {
        await mongoose.connect(MONGO_URL_2);
        console.log("Connected to NewDatabase");
    } catch (err) {
        console.error("Error connecting to NewDatabase:", err);
    }
})();

// Multer storage setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to store uploaded images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename the file with a timestamp
    }
});
const upload = multer({ storage: storage });

// Routes
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

app.get('/Review', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: "Error fetching reviews" });
    }
});

app.get('/ProductInfo', async (req, res) => {
    try {
        const product = await Product.find();
        res.json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: "Error fetching product" });
    }
});

app.post('/ContactInfo', async (req, res) => {
    const contactInfo = req.body;
    console.log("info received:", contactInfo);

    try {
        const newContactInfo = await ContactInfo.create({
            name: contactInfo.name,
            email: contactInfo.email,
            PhoneNo: contactInfo.PhoneNo,
            Message: contactInfo.Message
        });
        res.json({ message: "Contact info added successfully", newContactInfo });
    } catch (error) {
        console.error("Error while adding contactInfo:", error);
        res.status(500).json({ error: "Failed to add contactInfo" });
    }
});

app.post('/ReviewText', upload.single('image'), async (req, res) => {
    const reviewData = req.body;
    console.log('Received the review data:', reviewData);

    try {
        const newReview = await Review.create({
            name: reviewData.name,
            Rating: reviewData.Rating,
            Reviews: reviewData.Reviews,
            image: req.file ? path.posix.join('/uploads', req.file.filename) : null
        });
        res.json({ message: 'Review added successfully', newReview });
    } catch (error) {
        console.error("Error while adding review:", error);
        res.status(500).json({ error: "Failed to add review" });
    }
});

// Server listen
const PORT = 5000; // Use one port for simplicity
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
