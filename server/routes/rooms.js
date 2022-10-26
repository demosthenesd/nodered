var express = require("express");
const controllers = require("../controllers/rooms");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("rooms", { title: "rooms" });
});

router.get("/status", controllers.getStatus);
router.get("/availability", controllers.getAvailability);
router.get("/usage", controllers.getUsage);

module.exports = router;
