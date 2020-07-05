const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { AppError, catchAsync } = require("../utils/appError");

exports.loginRequired = catchAsync(async (req, res, next) => {
    const { authorization } = req.headers;
    console.log(req.headers);
    if (!authorization || !authorization.startsWith("Bearer ")) {
        next(new AppError(401, "Unauthorized"));
    }
    const token = authorization.replace("Bearer ", "");
    console.log(token);
    const { _id } = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(_id);
    let check = user.tokens.findIndex((i) => i == token);
    if (!user || check == -1) {
        next(new AppError(401, "Unauthorized"));
    }
    req.user = user;
    next();
});

exports.hostRequired = (req, res, next) => {
    if (req.user.type !== "host") {
        next(new AppError(401, "Unauthorized"));
    }
    next();
};
