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

// MongoDB connection URIs
const MONGO_URL_1 = "mongodb://localhost:27017/checkoutDB";
const MONGO_URL_2 = "mongodb://localhost:27017/NewDatabase";

// Connect to checkoutDB
const checkoutDBConnection = mongoose.createConnection(MONGO_URL_1);

checkoutDBConnection.on('connected', () => {
    console.log('Connected to checkoutDB');
});

checkoutDBConnection.on('error', (err) => {
    console.error('Error connecting to checkoutDB:', err);
});

// Connect to NewDatabase
const newDatabaseConnection = mongoose.createConnection(MONGO_URL_2);

newDatabaseConnection.on('connected', () => {
    console.log('Connected to NewDatabase');
});

newDatabaseConnection.on('error', (err) => {
    console.error('Error connecting to NewDatabase:', err);
});

// Models need to be defined on each connection
const UserOrderInfo = checkoutDBConnection.model('UserOrderInfo', userOrderInfo.schema);
const ProductModel = newDatabaseConnection.model('Product', Product.schema);
const ReviewModel = newDatabaseConnection.model('Review', Review.schema);
const ContactInfoModel = newDatabaseConnection.model('ContactInfo', ContactInfo.schema);

const addProducts = async () => {
    try {
        const products = await Product.create([
            {
                OrderId: "p28cs2",
                name: "SOFA",
                Rating: 4,
                NoOfRating: 421,
                Price: 4000,
                Discount: "40%",
                OfferPrice: 2400,
                ProdDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl ac laoreet bibendum, metus felis euismod dolor, ac varius nunc purus sit amet nunc. euismod dolor, ac varius nunc purus sit amet nunc.",
                HeadImg: "/uploads/sofa_img1.jpg",
                Img1: "/uploads/sofa_img2.jpeg",
                Img2: "/uploads/sofa_img3.jpg",
                Img3: "/uploads/sofa_img2.jpeg",
                Img4: "/uploads/sofa_img4.jpg",
            }
        ]);
        console.log(products)
    } catch (error) {
        console.error("Error adding products:", error);
    }
};
addProducts();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Routes
app.post("/checkout", async (req, res) => {
    try {
        const newUser = new UserOrderInfo(req.body);
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
        const reviews = await ReviewModel.find();
        res.json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: "Error fetching reviews" });
    }
});

app.get('/ProductInfo', async (req, res) => {
    try {
        const product = await ProductModel.find();
        res.json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: "Error fetching product" });
    }
});

app.post('/ContactInfo', async (req, res) => {
    const { name, email, PhoneNo, Message } = req.body;
    console.log("info received:");

    try {
        const newContactInfo = await ContactInfoModel.create({
            name: name,
            email: email,
            PhoneNo: PhoneNo,
            Message: Message,
        });
        await newContactInfo.save();
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
        const newReview = await ReviewModel.create({
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
