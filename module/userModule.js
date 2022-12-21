const userData = require("../models/user")
const feedbackModel = require("../models/feedback");
const multer = require("multer");
var nodemailer = require("nodemailer");
var sendgridtransport = require("nodemailer-sendgrid-transport");
var bcrypt = require('bcryptjs');
const Joi = require("joi");
const jwt = require("jsonwebtoken");

var cloudinary = require("cloudinary");
const { ObjectId } = require("mongodb");
const transport = nodemailer.createTransport(sendgridtransport({
    auth:{
    api_key:"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"
    }
}))

exports.register =async(req,res)=>{
    console.log("body",req.body);
    try{
        // const schema = Joi.object({
        //    username:Joi.string().required(),
        //    email:Joi.string().email().required(),
        //    password:Joi.string().required(),
        //    mobile:Joi.number().min(10).required()
        // })
        // const {error} = await schema.validate(req.body);
        // console.log("error",error);
        // if(error){
        //     console.log("im here");
        //     return res.status(400).send({msg:error.details[0].message})
        // }

        const { username, email, password,mobile } = req.body;

       var user = await userData.find({email:req.body.email})
       console.log("user",user.length);
       console.log("user",user);
        if(user.length !== 0){
            console.log("im here");
            var errmsg = "user already exist";
            return res.send({errmsg:"already registerd"});
        }
        

//  const users = new userData({
//     username:req.body.username,
//     email:req.body.email,
//     password:req.body.password,
//     mobile:req.body.mobile,
//     image:req.file.filename
//  })
//  var response = await users.save();
//  console.log("response",response);
//  res.send({response});
const salt = await bcrypt.genSaltSync();
req.body.password = await bcrypt.hashSync(req.body.password,salt);

if (req.body.avatar == "/images/default_avatar.jpg") {
    
    const users = new userData({
        username,
        email,
        password:req.body.password,
        mobile,
        avatar: {
            public_id: "avatars/default_avatar_zvlo1q",
            url: "https://res.cloudinary.com/daeuzh0zl/image/upload/v1641879724/default_avatar_wzezlf.jpg"
        }
     })
     var response = await users.save();
    // var user = await userData.create({
    //     username,
    //     email,
    //     password,
    //     mobile,
    //     avatar: {
    //         public_id: "avatars/default_avatar_zvlo1q",
    //         url: "https://res.cloudinary.com/daeuzh0zl/image/upload/v1641879724/default_avatar_wzezlf.jpg"
    //     }
    // })
} else {
    console.log("im in else part");
    console.log("password",password);
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale"
    })
    // var user = await userData.create({
    //     username,
    //     email,
    //     password,
    //     mobile,
    //     avatar: {
    //         public_id: result.public_id,
    //         url: result.secure_url
    //     }
    // })
    const users = new userData({
        username,
        email,
        password:req.body.password,
        mobile,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
            }
     })
     var response = await users.save(); 
}
res.send({response});
}catch(err){
    console.log("err",err);
    res.send(err);
}
}
exports.validateUser = async(req,res)=>{
    console.log("body",req.body);
    try{
        const schema = Joi.object({
            email:Joi.string().email().required(),
            password:Joi.required()
        })
        var {error} = schema.validate(req.body);
        if(error){
            console.log("error",error.details[0].message)
            return res.status(400).send({msg:error.details[0].message})
        }
        const user = await userData.findOne({email:req.body.email});
        console.log("user",user);
        if(user==null){
            return res.send({error:"user doesnt exist"})
        }
        const isValid = await bcrypt.compareSync(req.body.password,user.password)
        if(!isValid){
            return res.send({error:"Invalid Password"})
        }
        const authToken = jwt.sign({userId:user._id,email:user.email},"GUvi!jdks")
        res.send({authToken,user});
    }catch(err){
        console.log("err",err);
    }
}


     

