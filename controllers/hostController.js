const { AppError, catchAsync } = require("../utils/appError");
const Exp = require("../models/experience");

exports.hostExperience = catchAsync(async (req, res, next) => {
    const data = await Exp.find({ host: req.user._id });
    if (!data) {
        return next(new AppError(404, "Experience not found"));
    }
    res.status(200).json({
        status: "succes",
        data: data,
    });
});

exports.hostUpdate = catchAsync(async (req, res, next) => {
    const exp = await Exp.findById(req.params.id);
    if (!exp) {
        return next(new AppError(404, "Experience not found"));
    }
    if (JSON.stringify(exp.host) !== JSON.stringify(req.user._id)) {
        return next(new AppError(401, "Experience not found"));
    }
    const fields = Object.keys(req.body);
    fields.map((field) => {
        exp[field] = req.body[field];
    });
    await exp.save();
    res.status(200).json({
        status: "success",
        data: exp,
    });
});

exports.hostDelete = catchAsync(async (req, res, next) => {
    const exp = await Exp.findById(req.params.id);
    if (!exp) {
        return next(new AppError(404, "Experience not found"));
    }
    if (JSON.stringify(exp.host) !== JSON.stringify(req.user._id)) {
        return next(new AppError(401, "Experience not found"));
    }
    await exp.remove();
    res.status(202).json({
        status: "success",
        data: exp,
    });
});
