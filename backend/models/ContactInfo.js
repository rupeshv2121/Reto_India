const mongoose = require('mongoose');

const ContactInfoSchema = new mongoose.Schema({  
        name: String,  
        email:String, 
        PhoneNo: Number,
        Message: String, 
});
const ContactInfo = mongoose.model('ContactInfo', ContactInfoSchema);

module.exports=ContactInfo;