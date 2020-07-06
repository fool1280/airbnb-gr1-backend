const Tag = require("../models/tag");
const Category = require("../models/category");
const Exp = require("../models/experience");
const { catchAsync, AppError } = require("../utils/appError");

exports.getExperiences = catchAsync(async (req, res, next) => {
    const filters = { ...req.query };
    const paginationKeys = ["limit", "page", "sort"];
    paginationKeys.map((el) => delete filters[el]);
    console.log(filters);
    if (Array.isArray(filters["tags"])) {
        let temp = filters["tags"];
        filters["tags"] = {
            $in: temp,
        };
    }
    let query = Exp.find(filters);
    if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        console.log(sortBy);
        query.sort(sortBy);
    } else {
        query.sort("-createdAt");
    }
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 25;
    const skip = (page - 1) * limit;
    const countExperiences = await Exp.find(filters).countDocuments();
    if (req.query.page && skip > countExperiences)
        return next(new AppError(400, "Page number out of range"));
    query = query.skip(skip).limit(limit);
    const exps = await query;
    if (!exps.length) {
        return next(new AppError(404, "Experience not found"));
    }
    res.json({ status: "success", data: exps, count: countExperiences });
});

exports.createExperience = catchAsync(async (req, res, next) => {
    const {
        title,
        description,
        country,
        languages,
        price,
        duration,
        categories,
        tags,
        groupSize,
        pictureUrl,
    } = req.body;
    if (
        !title ||
        !description ||
        !country ||
        !languages ||
        !price ||
        !duration ||
        !categories ||
        !tags ||
        !groupSize ||
        !pictureUrl
    ) {
        return next(new AppError(400, "Missing fields of information"));
    }
    const newTags = await Tag.convertToObject(tags);
    const newCategories = await Category.convertToObject(categories);
    const exp = await Exp.create({
        title,
        description,
        host: req.user._id,
        country,
        languages,
        price,
        duration,
        categories: newCategories,
        tags: newTags,
        groupSize,
        pictureUrl,
    });
    res.status(201).json({
        status: "ok",
        data: exp,
    });
});

exports.updateExperience = catchAsync(async (req, res, next) => {
    const _id = req.params.id;

    res.status(200).json({
        status: "ok",
        newExp: exp,
    });
});
