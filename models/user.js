const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        // minLength:5,
        // maxLength:10,
        // required:true
    },
    mobile:{
        maxLength:10,
        minLength:10,
        type:Number
    },
    image:{
        type:String,
        required:true
    }
})
const userModel = mongoose.model('User',userSchema,'user');
module.exports = userModel;