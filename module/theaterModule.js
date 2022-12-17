const theaterData  = require("../models/Theater");
const feedbackModel = require("../models/feedback");
exports.addTheater = async(req,res)=>{
   try{
    const theaters = new theaterData({
        theater_name:req.body.theatername,
        theater_owner:req.body.theaterowner,
        theater_state:req.body.theaterstate,
        theater_city:req.body.theatercity,
       
     })
       var response = await theaters.save();
       res.send(response);
   }catch(error){
       console.log(error);
       res.send(error);
   }
}
exports.getTheaters = async(req,res)=>{
    try{
        var response = await theaterData.find({});
        res.send(response);
    }catch(err){
        console.log("err",err);
        res.send(err);
    }
}
exports.deleteTheater = async(req,res)=>{
    try{
        const id = req.params.id;
         var response = await theaterData.findByIdAndRemove(id);
        res.send(response);
    }catch(err){
        res.send(err);
    }
}
exports.getTheater = async(req,res)=>{
  try{
      const id = req.params.id;
      var response = await theaterData.find({_id:id});
      res.send(response);
  }catch(err){
      res.send(err);
  }
}
exports.editTheater = async(req,res)=>{
    const id = req.params.id;
    try{
    var response = await theaterData.findByIdAndUpdate(id,{
        theater_name:req.body.theatername,
        theater_owner:req.body.theaterowner,
        theater_state:req.body.theaterstate,
        theater_city:req.body.theatercity
      })
      res.send(response);
    }catch(err){
        res.send(err);
    }
}
exports.sendMail = (req,res)=>{
    try{
    console.log(req.body);
    var Booking_Date = req.body.bookingdate;
    var totalceats = req.body.totalceats;
    var ceatnames = req.body.ceatnames;
    var name = req.body.name;
    var email = req.body.email; 
    var moviename = req.body.moviename;
    var ticketcost = req.body.ticketcost;
    try{
    transport.sendMail({
                to:email,
                from:"savitabharati30@gmail.com",
                subject:"Movie Ticket Information",
                html:`
                <p>Please see the followng ticket details</p>
                <h5>Booking Date:${Booking_Date}/h5>
                <h5>totalceats:${totalceats}</h5>
                <h5>ceatnames:${ceatnames}</h5>
                <h5>movie watchers:${name}</h5>
                <h5>moviename:${moviename}</h5>
                <h5>ticketcost:${ticketcost}</h5>
                `
              }) 
            }catch(err){
                console.log(err);
            }
              res.send({msg:"check your email"});
          }catch(err){
              console.log(err);
          }
}
exports.postFeedback = async(req,res)=>{
    try{
        console.log(req.body);
       const feedback = new feedbackModel({
           name:req.body.name1,
           email:req.body.email,
           feedback:req.body.feedback
       })
       var response = await feedback.save();
       console.log("response",response);
       res.send(response);
    }catch(err){
        res.send(err);
    }
}
exports.searchTheater = async(req,res)=>{
    try{
    console.log(req.params.search);
    var response = await theaterData.find({theater_city:`${req.params.search}`});
    res.send(response);
    }catch(err){
        console.log(err);
    }
}
       
