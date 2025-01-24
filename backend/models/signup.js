const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSignupSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
},
    { timestamps: true }
)

const userSignUpInfo = mongoose.model("UserSignUpInfo", userSignupSchema);
module.exports = userSignUpInfo;