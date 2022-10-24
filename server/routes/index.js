var express = require("express");
const controllers = require("../controllers");
var router = express.Router();

const cors = require('cors');
app.use(cors({
    origin: 'http://ec2-3-83-108-89.compute-1.amazonaws.com:3000/'
}));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// GET locations
router.get("/locations", controllers.getAllLocations);

module.exports = router;
