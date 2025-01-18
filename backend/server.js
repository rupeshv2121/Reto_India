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
const userSignUpInfo = require("./models/signup");

const app = express();

// Configure CORS
const corsOptions = {
    origin: "http://localhost:5173", // Allow requests from your React app
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection URIs
const MONGO_URL = "mongodb://localhost:27017/reto_india";
mongoose
    .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("connected to reto_india DB") })
    .catch((err) => { console.log("Error in connecting DB : ", err) });

// Models need to be defined on each connection
const UserOrderInfo = mongoose.model('UserOrderInfo', userOrderInfo.schema);
const ProductModel = mongoose.model('Product', Product.schema);
const ReviewModel = mongoose.model('Review', Review.schema);
const ContactInfoModel = mongoose.model('ContactInfo', ContactInfo.schema);
const userSignUpModel = mongoose.model('UserSignUp', userSignUpInfo.schema);


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
// Signup Route
app.post("/auth/signup", async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newUser = new userSignUpModel({ fullName, email, password });
        await newUser.save();
        console.log("Signup info:", req.body);
        res.status(201).json({ message: `${fullName} signed up successfully` });
    } catch (error) {
        console.error("Error saving signup info:", error);
        res.status(500).json({ error: "Error saving signup details" });
    }
});
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
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
