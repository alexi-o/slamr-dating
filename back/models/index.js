var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/slammerApp");

module.exports.Card = require("./inmates.js");