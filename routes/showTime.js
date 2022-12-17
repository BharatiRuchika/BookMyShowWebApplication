var express = require("express");
var router = express.Router();
const showModule = require("../module/showModule");
router.post("/postshows",showModule.addShows);
router.put("/editshows",showModule.editShows);
router.get("/getshows/:id",showModule.getShows);
router.get("/getshow/:moviename",showModule.getShowsByMovie)
router.get("/getallshows/:id",showModule.getShowsByTheater);
module.exports = router;
