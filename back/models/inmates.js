var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var InmateSchema = new Schema({
	name: String,
});

var Inmate = mongoose.model('Inmate', InmateSchema);
module.exports = Inmate;