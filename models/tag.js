const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    tag: {
        type: String,
        required: [true, "Tag is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },
});

schema.statics.convertToObject = async function (arr) {
    let foo = arr.map(async (e) => {
        let bar = await this.findOne({ tag: e.toLowerCase().trim() });
        if (bar) {
            return bar;
        }
        bar = await this.create({ tag: e.toLowerCase().trim() });
        return bar;
    });
    let result = await Promise.all(foo);
    return result;
};

module.exports = mongoose.model("Tag", schema);
