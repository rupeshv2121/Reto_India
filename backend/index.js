const bodyParser=require('body-parser');
const express = require('express');
const cors = require('cors');
const path = require("path");
const mongoose = require('mongoose');
const multer= require("multer");
const Product = require("./models/Product");
const Review = require("./models/Review");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
mongoose.connect('mongodb://127.0.0.1:27017/NewDatabase')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Error connecting to MongoDB:", err));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to store uploaded images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename the file with a timestamp
    }
});
const upload = multer({ storage: storage });


app.get('/Review', async (req, res) => {
    try {
        const reviews = await Review.find(); 
        res.json(reviews); 
    } catch (error) {
        console.error("Error fetching reviews:", error);
        
    }
});
app.get('/ProductInfo', async (req, res) => {
    try {
        const product = await Product.find(); 
        res.json(product); 
    } catch (error) {
        console.error("Error fetching product:", error);
        
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
            image: req.file ? path.posix.join('/uploads', req.file.filename) : null // Save image path if uploaded
        });
        res.json({ message: 'Review added successfully', newReview });
    } catch (error) {
        console.error("Error while adding review:", error);
        res.status(500).json({ error: "Failed to add review" });
    }
});


app.listen(3000,()=>{
    console.log("server is running...");
})