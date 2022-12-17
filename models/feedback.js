const mongoose = require("mongoose");
const schema = mongoose.Schema;
const feedbackSchema = new schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    feedback:{
        type:String,
        required:true
    }
})
const feedbackModel = mongoose.model("feedbackModel",feedbackSchema,"feedback");
module.exports = feedbackModel;