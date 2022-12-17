const mongoose = require("mongoose");
const schema = mongoose.Schema;
const adminSchema = new schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    }
})
const adminModel = mongoose.model("adminModel",adminSchema,"admin");
module.exports = adminModel;