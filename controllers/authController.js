const User = require("../models/user");
const { AppError, catchAsync } = require("../utils/appError");

exports.loginWithEmail = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError(400, "Email and password are required"));
    }
    const user = await User.loginWithEmail(email, password);
    if (!user) {
        return next(new AppError(403, "Wrong email or password"));
    }
    const token = await user.generateToken();
    res.status(200).json({
        status: "ok",
        data: {
            user: user,
            token: token,
        },
    });
});

exports.logoutUser = catchAsync(async (req, res) => {
    const token = req.headers.authorization.replace("Bearer ", "");
    req.user.tokens = req.user.tokens.filter((e) => e !== token);
    await req.user.save();
    res.status(200).json({
        status: "success",
        data: {
            user: req.user,
            token: "",
        },
    });
});
