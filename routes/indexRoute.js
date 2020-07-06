var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.send("Airbnb Group 1");
});

module.exports = router;
