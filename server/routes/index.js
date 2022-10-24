var express = require("express");
const controllers = require("../controllers");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// GET locations
router.get("/locations", controllers.getAllLocations());

module.exports = router;
