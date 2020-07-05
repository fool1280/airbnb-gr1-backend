const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const round = 10;
const jwt = require("jsonwebtoken");

const schema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Email is invalid");
                }
            },
        },
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        password: {
            type: String,
        },
        tokens: [String],
        type: {
            type: String,
            enum: ["normal", "host"],
            required: [true, "Type is required"],
            default: "normal",
        },
        intro: {
            type: String,
            required: [
                function () {
                    return this.type == "host" ? true : false;
                },
                "Introduction is required for host!",
            ],
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

//const obj = new Person({name: "Khoa", age: 32})
//obj => {name: "Khoa", age: 32} => instance of Person class

//const user = new User...
//user.toJSON()

schema.methods.toJSON = function () {
    //inside methods, this will refer to instance
    const obj = this.toObject();
    //delete obj.password;
    //delete obj.tokens;
    return obj;
};

schema.methods.generateToken = async function () {
    //this will refer to instance of user
    //this is user, INSTANCE of class User
    const token = jwt.sign(
        {
            _id: this._id,
        },
        process.env.SECRET,
        { expiresIn: "1d" }
    );
    this.tokens.push(token);
    await this.save();
    return token;
};

//User.loginWithEmail
schema.statics.loginWithEmail = async function (email, password) {
    //inside static, this will refer to class
    const user = await this.findOne({ email: email });
    if (!user) {
        return null;
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
        return user;
    }
    return null;
};

schema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, round);
    }
    next();
});

module.exports = mongoose.model("User", schema);
