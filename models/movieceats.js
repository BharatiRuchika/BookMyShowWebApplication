const mongoose = require("mongoose");
const schema = mongoose.Schema;
const movieceatsSchema = new schema({
    bookingdate:{
        type:String,
        required:true
    },
    moviename:{
        type:String,
        required:true
    },
    ceatnames:{
        type:String,
        required:true
    },
    startTime:{
        type:String,
        required:true
    }
   
})
const movieceatModel = mongoose.model("movieceatModel",movieceatsSchema,"movieceats");
module.exports = movieceatModel;