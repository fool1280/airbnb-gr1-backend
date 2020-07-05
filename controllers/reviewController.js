const { AppError, catchAsync } = require("../utils/appError");
const Review = require("../models/review");
const Exp = require("../models/experience");

exports.updateReview = catchAsync(async (req, res, next) => {
    const userId = req.user._id;
    const experienceId = req.params.id;
    const review = await Review.findOneAndUpdate(
        { user: userId, experience: experienceId },
        {
            ...req.body,
            user: userId,
            experience: experienceId,
        },
        {
            new: true,
            runValidators: true,
        }
    );
    res.status(200).json({
        status: "success",
        data: review,
    });
});

exports.createReview = catchAsync(async (req, res, next) => {
    const userId = req.user._id;
    const experienceId = req.params.id;
    const experience = await Exp.findById(req.params.id);
    if (
        !experience ||
        JSON.stringify(experience.host) == JSON.stringify(userId)
    ) {
        return next(new AppError(404, "Experience not found"));
    }
    const check = await Review.exists({
        user: userId,
        experience: experienceId,
    });
    if (check) {
        return next(new AppError(400, "Already review"));
    }
    const review = await Review.create({
        ...req.body,
        user: userId,
        experience: experienceId,
    });
    res.status(201).json({
        status: "ok",
        data: review,
    });
});

exports.getAllReview = catchAsync(async (req, res, next) => {
    const experienceId = req.params.id;
    const experience = await Exp.findById(req.params.id);
    if (!experience) {
        return next(new AppError(404, "Experience not found"));
    }
    const data = await Review.find({ experience: experienceId });
    res.status(200).json({
        status: "success",
        data: data,
    });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
    const review = await Review.findOneAndDelete({
        user: req.user._id,
        experience: req.params.id,
    });
    res.status(200).json({
        status: "success",
        data: review,
    });
});
