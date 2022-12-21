require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
const multer = require("multer");
var path = require('path');
var jwt = require("jsonwebtoken")
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var cloudinary = require("cloudinary");
var bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const Razorpay = require('razorpay');
// const fileupload = require("express-fileupload");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var moviesRouter = require('./routes/movies');
var theaterRouter = require('./routes/theater');
var adminRouter = require('./routes/admin');
var showRouter = require('./routes/showTime');
// const path = require("path");
var mongo = require("./connection");
mongo.connect();
var app = express();
app.use(express.json());
app.use(bodyParser.urlencoded())
const razorpay = new Razorpay({
	key_id: 'rzp_test_OUcqumMZN9hmcK',
	key_secret: 'XQZXWrwezMYQASzenfGW1Nu8'
})
app.use(cors({
  origin: "http://localhost:3000",
  credentials:true,
  optionSuccessStatus:200
}));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const corsOptions = {
  Credential: 'true',
};
app.options("*" , cors(corsOptions));
app.use(cors(corsOptions));
console.log("cloudinaryname",process.env.CLOUDINARY_CLOUD_NAME);
// view engine setup
cloudinary.config({
  cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
  api_key : process.env.CLOUDINARY_API_KEY,
  api_secret : process.env.CLOUDINARY_API_SECRET  
})
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));
if(process.env.NODE_ENV==="production"){
  const path = require("path");
  app.use(express.static(path.join(__dirname,"client/build")));
  app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'client','build','index.html'))
})
}
// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/admin",adminRouter);
app.use((req,res,next)=>{
  console.log("im here");
  const token = req.headers["auth-token"];
  // console.log("token",token);
  if(token){
    console.log("im here also");
    try{
    user = jwt.verify(token,"GUvi!jdks");
    console.log("users",user);
    next();
    }catch(err){
      res.sendStatus(401);
    }
  }else{
    res.sendStatus(401);
  }
  
})
app.use('/movies',moviesRouter);
app.use("/theater",theaterRouter);
app.use("/show",showRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log("im in error");
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log("err",err);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// const PORT = 4000;
const PORT = process.env.PORT||3001;
app.listen(PORT,()=>console.log(`server started at ${PORT}`));
module.exports = app;
