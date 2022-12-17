var bookingModel = require("../models/bookings");
var feedbackModel = require("../models/feedback");
exports.postbookings = async(req,res)=>{
    console.log("postbookings");
   
    try{
       console.log("body",req.body);
       const bookings = new bookingModel({
           currentdate:req.body.fulldate,
           username:req.body.username,
           email:req.body.email,
           mobile:req.body.mobile,
           bookingdate:req.body.bookingdate,
           moviename:req.body.moviename,
           moviewatchers:req.body.name,
           totalceats:req.body.new_ceat,
           ceatnames:req.body.allSeatarray.toString(),
           totalcost:req.body.totalcost,
           show:req.body.show
       }) 
       var response = await bookings.save();
       console.log("response",response);
       res.send(response);
    }catch(err){
        console.log("err",err);
        res.send(err);
    }
}
exports.getbookings = async(req,res)=>{
  try{
      
    //   console.log(req.query.q);
    console.log("body",req.params);
    // console.log("body",req.body.username);
    // console.log("body",req.body.bookingdate);
      var response = await bookingModel.find({username:req.params.username,bookingdate:req.params.bookingdate});
      res.send(response);
  }catch(err){
      console.log("err",err);
      res.send(err);
  }
}
exports.getUserbookings = async(req,res)=>{
    try{
    const email = req.params.email;
    console.log("email",email);
    var response =  await bookingModel.find({email:email});
    res.send(response);
    }catch(err){
     res.send(err);
    }
}
exports.getBookingsByMovieName = async(req,res)=>{
    try{
    console.log(req.params);
    var movie_name = req.params.moviename;
    var response = await bookingModel.find({moviename:movie_name});
    res.send(response);
    }catch(err){
        res.send(err);
    }
}
exports.getFeedback = async(req,res)=>{
    try{
      console.log("im here");
      var response = await feedbackModel.find({});
      res.send(response);
    }catch(err){
      res.send(err);
    }
  }