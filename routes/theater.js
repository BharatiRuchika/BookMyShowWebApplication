var express = require("express");
var router = express.Router();
const theaterModule = require("../module/theaterModule");
router.post("/addtheater",theaterModule.addTheater);
router.get("/getTheaters",theaterModule.getTheaters);
router.delete("/deletetheater/:id",theaterModule.deleteTheater);
router.get("/getTheater/:id",theaterModule.getTheater);
router.put("/edittheater/:id",theaterModule.editTheater);
router.post('/sendmail',theaterModule.sendMail);
router.post("/feedback",theaterModule.postFeedback);
router.get("/searchtheaters/:search",theaterModule.searchTheater)
module.exports = router;