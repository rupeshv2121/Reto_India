const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser")

const userOrderInfo = require("./models/user");
const ProductView = require("./models/ProductView");
const Review = require("./models/Review");
const ContactInfo = require("./models/ContactInfo");
const userSignUpInfo = require("./models/signup");
const AllProducts = require("./models/AllProduct");
const AddProduct = require('./models/AddProduct');
const app = express();

// Configure CORS
const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser());

// MongoDB connection URIs
const MONGO_URL = "mongodb://localhost:27017/reto_india";
mongoose
    .connect(MONGO_URL)
    .then(() => { console.log("connected to reto_india DB") })
    .catch((err) => { console.log("Error in connecting DB : ", err) });

// Models need to be defined on each connection
const UserOrderInfo = mongoose.model('UserOrderInfo', userOrderInfo.schema);
const ProductViewModel = mongoose.model('ProductView', ProductView.schema);
const ReviewModel = mongoose.model('Review', Review.schema);
const ContactInfoModel = mongoose.model('ContactInfo', ContactInfo.schema);
const userSignUpModel = mongoose.model('UserSignUp', userSignUpInfo.schema);
const AllProductsModel = mongoose.model('AllProducts', AllProducts.schema);


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });


app.get('/Product', async (req, res) => {
    try {
        const product = await AddProduct.find();
        res.json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
    }
});

// Routes
// Signup Route
app.post("/auth/signup", async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // Validate input
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await userSignUpModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save the new user
        const newUser = new userSignUpModel({ fullName, email, password: hashedPassword });
        let token = jwt.sign({ email }, "rupesh");
        res.cookie("token", token);
        console.log("Cookie sent:", token);
        await newUser.save();

        // Respond with success
        res.status(201).json({ message: "Signup successful!" });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Login Route
app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;
    // console.log(email, password)

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await userSignUpModel.findOne({ email });
        // console.log(user);
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(isPasswordValid);
        if (isPasswordValid) {
            let token = jwt.sign({ email: user.email }, "rupesh");
            res.cookie("token", token, {
                httpOnly: true, // Prevent client-side JavaScript access for security
                secure: false, // Set to `true` if using HTTPS
                sameSite: "strict", // Ensures the cookie is sent only with same-site requests
            });
            console.log("Cookie sent:", token);
            return res.status(200).json({
                message: "Login successful",
                token,
                user: { fullName: user.fullName, email: user.email },
            });
            return res.status(200).json({ message: "Login successful", token });
        } else {
            return res.status(401).json({ message: "Invalid email or password" });

        }

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal Server Error" });
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

app.get("/product", async (req, res) => {
    try {
        const products = await AllProductsModel.find({});
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: "Error fetching products" });
    }
})

app.get('/product/:productId', async (req, res) => {
    try {
        const product = await ProductViewModel.findById({ productId: req.params.productId });
        console.log(req.params);
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
