const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const Razorpay = require("razorpay");

const userOrderInfo = require("./models/user");
const ProductView = require("./models/ProductView");
const Review = require("./models/Review");
const ContactInfo = require("./models/ContactInfo");
const userSignUpInfo = require("./models/signup");
const AllProducts = require("./models/AllProduct");

const app = express();

// Configure CORS
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser());

// MongoDB Connection
mongoose.connect("mongodb+srv://amansinghas9140:ASgyi0y6jSJnIJGP@data.hdgwu.mongodb.net/Reto")
    .then(() => console.log("Connected to reto_india DB"))
    .catch(err => console.log("Error in connecting DB:", err));

const UserOrderInfo = mongoose.model('UserOrderInfo', userOrderInfo.schema);
const ProductViewModel = mongoose.model('ProductView', ProductView.schema);
const ReviewModel = mongoose.model('Review', Review.schema);
const ContactInfoModel = mongoose.model('ContactInfo', ContactInfo.schema);
const userSignUpModel = mongoose.model('UserSignUp', userSignUpInfo.schema);
const AllProductsModel = mongoose.model('AllProducts', AllProducts.schema);

// Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Signup Route
app.post("/auth/signup", async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) return res.status(400).json({ message: "All fields are required" });

        const existingUser = await userSignUpModel.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userSignUpModel({ fullName, email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ email }, "rupesh");
        res.cookie("token", token, { httpOnly: true });
        res.status(201).json({ message: "Signup successful!", token });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Login Route
app.post("/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "All fields are required" });

        const user = await userSignUpModel.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: "Invalid email or password" });

        const token = jwt.sign({ email: user.email }, "rupesh");
        res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "strict" });
        res.status(200).json({ message: "Login successful", token, user: { fullName: user.fullName, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

const razorpay = new Razorpay({
    key_id: "rzp_test_xxDux3IIvlBSYN",
    key_secret: "XIxKbKjgBPr6hp8499mq1n50",
});

// Razorpay Checkout
app.post("/create-order", async (req, res) => {
    try {
        const { user, cartItems } = req.body;

        if (!user || cartItems.length === 0) {
            return res.status(400).json({ success: false, message: "Invalid order data" });
        }

        const amount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0) * 100; // INR paisa me hota hai

        const order = await razorpay.orders.create({
            amount,
            currency: "INR",
            receipt: `order_rcptid_${Date.now()}`,
        });

        res.json({ success: true, orderId: order.id, amount: order.amount, currency: order.currency });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ success: false, message: "Failed to create order" });
    }
});

app.post("/verify-payment", async (req, res) => {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

        if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
            return res.status(400).json({ success: false, message: "Invalid payment details" });
        }

        // ✅ **Payment Verification Logic**
        const crypto = require("crypto");
        const secret = "XIxKbKjgBPr6hp8499mq1n50"; // 🔴 Secret key ko .env me store karein
        const expectedSignature = crypto
            .createHmac("sha256", secret)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ success: false, message: "Payment verification failed" });
        }

        console.log("Payment verified successfully!");
        console.log(razorpay_payment_id);


        // ✅ **Redirect on success**
        return res.json({ success: true, orderId: razorpay_order_id });

    } catch (error) {
        console.error("Error verifying payment:", error);
        return res.status(500).json({ success: false, message: "Payment verification failed" });
    }
});


app.get("/order-details/:orderId", async (req, res) => {
    try {
        const { orderId } = req.params;

        // ✅ Step 1: Razorpay se order details fetch karein
        const order = await razorpay.orders.fetch(orderId);

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        console.log("Order Data:", order); // Debugging ke liye

        let paymentId = null;
        let paymentDetails = null;

        try {
            // ✅ Step 2: Razorpay se payments list fetch karein
            const payments = await razorpay.payments.all({ order_id: orderId });

            if (payments.items.length > 0) {
                paymentId = payments.items[0].id; // ✅ First payment ID le raha hai
            } else {
                console.warn("No payments found for order:", orderId);
            }
        } catch (paymentListError) {
            console.error("Error fetching payment list:", paymentListError);
        }

        if (paymentId) {
            try {
                // ✅ Payment ID se Razorpay se payment details fetch karein
                const payment = await razorpay.payments.fetch(paymentId);
                paymentDetails = {
                    paymentId: payment.id.split(),
                    amount: payment.amount / 100, // Convert paise to rupees
                    currency: payment.currency,
                    method: payment.method.toUpperCase(), // ✅ UPI, Card, Netbanking, Wallet, etc.
                    status: payment.status.toUpperCase(), // ✅ "captured", "failed", etc.
                    email: payment.email,
                    contact: payment.contact,
                };
            } catch (paymentError) {
                console.error("Error fetching payment details:", paymentError);
                paymentDetails = { error: "Payment details not found" };
            }
        }

        return res.json({
            success: true,
            data: {
                orderId: order.id,
                amount: order.amount / 100, // Convert paise to rupees
                currency: order.currency,
                created_at: order.created_at,
                paymentDetails, // ✅ Payment ka pura data return karega
            },
        });

    } catch (error) {
        console.error("Error fetching order details:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});





// Fetch Products
app.get("/product", async (req, res) => {
    try {
        const products = await AllProductsModel.find({});
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: "Error fetching products" });
    }
});

app.get("/product/:productId", async (req, res) => {
    try {
        const product = await ProductViewModel.findById(req.params.productId);
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: "Error fetching product" });
    }
});

// Contact Info
app.post("/ContactInfo", async (req, res) => {
    try {
        const newContactInfo = await ContactInfoModel.create(req.body);
        res.json({ message: "Contact info added successfully", newContactInfo });
    } catch (error) {
        res.status(500).json({ error: "Failed to add contact info" });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
