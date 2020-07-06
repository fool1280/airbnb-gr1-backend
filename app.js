var express = require("express");
var logger = require("morgan");
var cors = require("cors");
var mongoose = require("mongoose");

var indexRouter = require("./routes/indexRoute");
var usersRouter = require("./routes/userRoute");
var authRouter = require("./routes/authRoute");
var expRouter = require("./routes/expRoute");

const { errorController } = require("./controllers/errorController");
require("dotenv").config();

var app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json()); //send data as json object

mongoose
    .connect(process.env.DB, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => console.log("connected to database"));

app.use("/", indexRouter);

app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/experiences", expRouter);

app.use(errorController);

module.exports = app;
