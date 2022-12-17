var ceatsModel = require("../models/movieceats");
exports.postceats = async(req,res)=>{
    console.log("postceats")
      try{
         console.log("body",req.body);
         var ceats = new ceatsModel({
            bookingdate:req.body.bookingdate,
            moviename:req.body.moviename,
            ceatnames:req.body.allSeatarray.toString(),
            startTime:req.body.show
         })
         var response = await ceats.save();
         res.send(response);
      }catch(err){
          console.log("err",err);
          res.send(err);
      }
  }