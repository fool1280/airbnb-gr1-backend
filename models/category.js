const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, "Category is required"],
        unique: true,
        trim: true,
        lowercase: true,
    },
});

schema.statics.convertToObject = async function (arr) {
    let foo = arr.map(async (e) => {
        let bar = await this.findOne({ category: e.toLowerCase().trim() });
        if (bar) {
            return bar;
        }
        bar = await this.create({ category: e.toLowerCase().trim() });
        return bar;
    });
    let result = await Promise.all(foo);
    return result;
};

module.exports = mongoose.model("Category", schema);
