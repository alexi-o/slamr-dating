var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/slammerApp");

module.exports.Inmate = require("./inmates.js");