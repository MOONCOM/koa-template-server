const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    address:String,
    phone:String,
    password:{
        type:String,
        require:true,
    },
    createdDate:{
        type:Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', User);