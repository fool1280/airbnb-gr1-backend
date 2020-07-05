var express = require("express");
var router = express.Router();
const {
    createUser,
    getAllUser,
    getMyProfile,
    updateUser,
} = require("../controllers/userController");
const { loginRequired } = require("../middleware/auth.js");
const User = require("../models/user");

/* GET users listing. */
//localhost:5000/users/me => all current user information

router.route("/").get(getAllUser).post(createUser);

router.route("/me").get(loginRequired, getMyProfile);
router.route("/edit").patch(loginRequired, updateUser);

module.exports = router;
