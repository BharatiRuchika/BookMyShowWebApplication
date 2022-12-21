exports.connect=async()=>{
    try{
        const mongoose = require("mongoose");
        var con = await mongoose.connect(`${process.env.DB_LOCAL_URI}`,{useNewUrlParser:true,useUnifiedTopology:true})
    }catch(err){
        console.log(err);
        process.exit();
     
    }
}
