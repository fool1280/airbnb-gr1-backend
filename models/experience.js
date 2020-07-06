const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: [true, "Title is required"],
        },
        description: {
            type: String,
            trim: true,
            minlength: 5,
            maxlength: 1000,
            required: true,
        },
        host: {
            type: String,
        },
        country: {
            type: String,
            trim: true,
            required: [true, "Title is required"],
        },
        languages: {
            type: [String],
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        categories: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Category",
                require: true,
            },
        ],
        tags: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Tag",
                required: true,
            },
        ],
        groupSize: {
            type: Number,
            required: true,
        },
        pictureUrl: {
            type: String,
            required: true,
        },
        avgRating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        nRating: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

module.exports = mongoose.model("Exp", experienceSchema);
