const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({  
        name: String,  
        Rating: Number, 
        Reviews: String,
        image: String, // Field to store image path
});
const Review = mongoose.model('Review', ReviewSchema);

module.exports=Review;