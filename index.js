require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
const multer = require("multer");
var path = require('path');
var jwt = require("jsonwebtoken")
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
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
app.use(cors({ credentials: true }));
const razorpay = new Razorpay({
	key_id: 'rzp_test_OUcqumMZN9hmcK',
	key_secret: 'XQZXWrwezMYQASzenfGW1Nu8'
})
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'https://book-my-show-web-application.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
if(process.env.NODE_ENV==="production"){
  const path = require("path");
  app.use(express.static(path.join(__dirname,"client/build")));
  app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'client','build','index.html'))
})
}
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/admin",adminRouter);
app.use((req,res,next)=>{
  console.log("im here");
  const token = req.headers["auth-token"];
  console.log("token",token);
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
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// const PORT = 4000;
const PORT = process.env.PORT||3001;
app.listen(PORT,()=>console.log(`server started at ${PORT}`));
module.exports = app;
