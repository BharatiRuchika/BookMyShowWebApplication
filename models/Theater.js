const mongoose = require("mongoose");
const schema = mongoose.Schema;
const theaterSchema = new schema({
    theater_name:{
        type:String,
        required:true
    },
    theater_owner:{
        type:String,
        required:true
    },
    theater_state:{
        type:String,
        required:true
    },
    theater_city:{
        type:String,
        required:true
    }
})
const theaterModel = mongoose.model("theaterSchema",theaterSchema,"Theater");
module.exports = theaterModel;