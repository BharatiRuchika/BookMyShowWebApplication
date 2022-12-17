const mongoose = require("mongoose");
const schema = mongoose.Schema;
const movieSchema = new schema({
    theaterId:{
        type:String,
        required:true
    },
    moviename:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    actorname:{
        type:String,
        required:true
    },
    directorname:{
        type:String,
        required:true
    },
    releasedate:{
      type:String,
      required:true
    },
    outdate:{
       type:String,
       required:true
    },
    ticketcost:{
      type:String,
      required:true
    },
    videourl:{
     type:String,
     required:true
    },
    movieimage:{
     type:String,
     required:true
    }
})
const moviesModel = mongoose.model("moviesModel",movieSchema,"currentmovies");
module.exports = moviesModel;
