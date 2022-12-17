var express = require("express");
var router = express.Router();
const adminModule = require("../module/adminModule");
router.post("/validateAdmin",adminModule.validateAdmin);

module.exports = router;