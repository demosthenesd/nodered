var express = require("express");
const controllers = require("../controllers");
var router = express.Router();
const cors = require('cors');

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// GET locations
router.get("/locations", controllers.getAllLocations);

router.get("/patients", controllers.getAllPatients);


module.exports = router;
