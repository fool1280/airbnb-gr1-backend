const User = require("../models/user");
const { AppError, catchAsync } = require("../utils/appError");

exports.createUser = catchAsync(async (req, res, next) => {
    const { email, name, password, type, intro } = req.body;
    if (!email || !name || !password) {
        next(new AppError(400, "Email, name, and password are required"));
    }
    const user = await User.create({
        email: email,
        name: name,
        password: password,
        type: type || "normal",
        intro: intro || "",
    });
    res.status(201).json({
        status: "ok",
        data: user,
    });
});

exports.getAllUser = catchAsync(async (req, res, next) => {
    const data = await User.find();
    res.status(200).json({
        status: "ok",
        data,
    });
});

exports.getMyProfile = catchAsync(async (req, res) => {
    res.status(200).json({
        status: "ok",
        data: req.user,
    });
});

exports.updateUser = catchAsync(async (req, res) => {
    const user = await User.findById(req.user._id);
    const fields = Object.keys(req.body);
    fields.map((field) => {
        return (user[field] = req.body[field]);
    });
    await user.save();
    res.status(200).json({
        status: "success",
        data: user,
    });
});
