var express = require("express");
var router = express.Router();
const { loginWithEmail, logoutUser } = require("../controllers/authController");
const { loginRequired } = require("../middleware/auth.js");

router.route("/login").post(loginWithEmail);

router.route("/logout").post(loginRequired, logoutUser);

module.exports = router;
