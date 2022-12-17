const adminModel = require("../models/admin");
const feedbackModel = require("../models/feedback");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
exports.validateAdmin = async(req,res)=>{
  try{
     var admin = await adminModel.findOne({email:req.body.email});
      if(admin==null){
          res.send({error:"admin doesnt exist"});
      }
      if(req.body.password==admin.password){
    // const isValid = await bcrypt.compare(req.body.password,admin.password);
    // if(!isValid){
    //     return res.send({error:"Invalid Password"})
    // }
    const authToken = jwt.sign({adminId:admin._id,email:admin.email},"GUvi!jdks")
    res.send({authToken,admin});
      }
  }catch(err){
      console.log("err",err);
  }
}
