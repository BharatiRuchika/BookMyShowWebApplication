const showModel = require("../models/showTime");
const movieModel = require("../models/currentmovies");
exports.addShows = async(req,res)=>{
    try{
    console.log(req.body);
    req.body.inputList.map(async(time)=>{
       console.log("starttime:",time.starttime)
       console.log("endtime",time.endtime);
       const shows = new showModel({
        movieId:req.body.movieId,
        startTime:time.starttime,
        endTime:time.endtime
       })
      await shows.save();
    })
    res.send("success");
}catch(err){
  res.send(err);
}
}
exports.getShows = async(req,res)=>{
  try{
    var id = req.params.id;
    console.log("id",id);
    var response = await showModel.find({movieId:id});
    res.send(response);
  }catch(err){
   res.send(err);
  }
}
exports.editShows = async(req,res)=>{
    console.log("body",req.body);
    console.log("inputLength",req.body.inputList.length);
    console.log("previousList",req.body.previousinputList.length)
    var movieId= req.body.movieId;
   if(req.body.inputList.length<req.body.previousinputList.length){
     console.log("im in deleted");
    req.body.previousinputList.map(async(datas)=>{
      var flag = 0;
      req.body.inputList.map(async(data)=>{
        if(datas._id==data._id){
          flag=1;
          console.log("im in update")
          await showModel.findByIdAndUpdate(datas._id,{
            movieId:data.movieId,
            startTime:data.startTime,
            endTime:data.endTime
           })
         }
      })
    if(flag==0){
      console.log("im here in delete");
      var response = await showModel.deleteOne({_id:datas._id})
        console.log("response",response);
      }
    })
    res.send("success");
  }else
    if(req.body.inputList.length>req.body.previousinputList.length){
      console.log("im in adding");
      try{
      req.body.inputList.map(async(datas)=>{
       console.log(datas._id==undefined);
       if(datas._id==undefined){
         console.log("im here");
         console.log(datas.startTime);
         console.log(datas.endTime);
          const shows = new showModel({
            movieId:movieId,
            startTime:datas.startTime,
            endTime:datas.endTime
          })
          var response =  await shows.save();
          console.log("resposne",response);
          // res.send(response);
        }else{
          console.log("im in else part");
    var response =  await showModel.findByIdAndUpdate(datas._id,{
    movieId:movieId,
    startTime:datas.startTime,
    endTime:datas.endTime
      })
     
        }
      })
      res.send("success");
  }catch(err){
    console.log(err)
  }
  
}else{
  try{
    req.body.inputList.map(async(data)=>{
      var id = data._id;
       await showModel.findByIdAndUpdate(id,{
        movieId:data.movieId,
        startTime:data.startTime,
        endTime:data.endTime
       })
    })
    res.send("success");
  }catch(err){
    console.log(err);
  }
}
}
exports.getShowsByMovie = async(req,res)=>{
  try{
    console.log(req.params.moviename);
    var response1 = await movieModel.find({moviename:req.params.moviename});
    console.log("response1",response1);
    var movieId = response1[0]._id.toString();
    var response2 = await showModel.find({movieId:movieId});
    console.log("response2",response2);
    res.send(response2);
  }catch(err){
    console.log(err);
  }
}
exports.getShowsByTheater = async(req,res)=>{
  console.log(req.params.id);
  try{
    var theaterId = req.params.id;
    var movies = await movieModel.find({theaterId:theaterId})
    console.log("movies",movies);
    // console.log(movies.length);
    var showArr = [];
    var i=0;
    movies.map(async(movie)=>{
      console.log("i",i);
     

       var shows = await showModel.find({movieId:movie._id.toString()})
       console.log("Shows",shows);
      //  showArr = shows;
       shows.map((show)=>{
         console.log("show",show);
         showArr.push(show.startTime);
       })
       i = i+1;
       console.log("length",movies.length);
       if(i==movies.length){
        console.log("showArr",showArr);
        res.send(showArr);
       
       }
       
    })
   
  }catch(err){
    console.log(err);
  }
}
