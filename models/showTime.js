const mongoose = require("mongoose");
const schema = mongoose.Schema;
const showSchema = new schema({
    movieId:{
        type:String,
        required:true
    },
    startTime:{
        type:String,
        required:true
    },
    endTime:{
        type:String,
        required:true
    }
})

const showModel = mongoose.model("showSchema",showSchema,"ShowTime");
module.exports = showModel;