const userData = require("../models/user")
const feedbackModel = require("../models/feedback");
const multer = require("multer");
var nodemailer = require("nodemailer");
var sendgridtransport = require("nodemailer-sendgrid-transport");
var bcrypt = require('bcryptjs');
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const transport = nodemailer.createTransport(sendgridtransport({
    auth:{
    api_key:"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"
    }
}))
const multerConfig = multer.diskStorage({
    destination:(req,file,callback)=>{
      callback(null,'public/')
    },
    filename:(req,file,callback)=>{
        const ext = file.mimetype.split('/')[1];
        callback(null,`image-${Date.now()}.${ext}`)
    }
})
const isImage = (req,file,callback)=>{
    if(file.mimetype.startsWith('image')){
        callback(null,true)
    }else{
        callback(new Error('only image is allowed...'));
    }
}
const upload = multer({
    storage:multerConfig,
    fileFilter:isImage
})

exports.uploadImage = upload.single('photo');
exports.upload =async(req,res)=>{
    try{
        const schema = Joi.object({
           username:Joi.string().required(),
           email:Joi.string().email().required(),
           password:Joi.string().required(),
           mobile:Joi.number().min(10).required()
        })
        const {error} = await schema.validate(req.body);
        console.log("error",error);
        if(error){
            console.log("im here");
            return res.status(400).send({msg:error.details[0].message})
        }
       var user = await userData.find({email:req.body.email})
       console.log("user",user.length);
       console.log("user",user);
        if(user.length !== 0){
            console.log("im here");
            var errmsg = "user already exist";
            return res.send({errmsg:"already registerd"});
        }
        const salt = await bcrypt.genSaltSync();
        req.body.password = await bcrypt.hashSync(req.body.password,salt);
// 
 console.log("password",req.body.password);
 const users = new userData({
    username:req.body.username,
    email:req.body.email,
    password:req.body.password,
    mobile:req.body.mobile,
    image:req.file.filename
 })
 var response = await users.save();
 console.log("response",response);
 res.send({response});
}catch(err){
    console.log("err",err);
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


     

