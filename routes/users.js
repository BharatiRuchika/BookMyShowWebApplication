var express = require('express');
var router = express.Router();

const userModule = require("../module/userModule");
// const moviesModule = require("../module/moviesModule");
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/register', userModule.register);

router.post('/validateUser',userModule.validateUser)


module.exports = router;