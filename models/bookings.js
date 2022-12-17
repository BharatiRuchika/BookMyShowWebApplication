const mongoose = require("mongoose");
const schema = mongoose.Schema;
const bookingSchema = new schema({
    currentdate:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    bookingdate:{
      type:String,
      required:true
    },
    moviename:{
        type:String,
        required:true
    },
    moviewatchers:{
        type:String,
        required:true
    },
    totalceats:{
        type:Number,
        required:true
    },
    ceatnames:{
        type:String,
        required:true
    },
    totalcost:{
        type:Number,
        required:true
    },
    show:{
        type:String,
        required:true
    }
})
const bookingModel = mongoose.model("bookingModel",bookingSchema,"bookings");
module.exports = bookingModel;
