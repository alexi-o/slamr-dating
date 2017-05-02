var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var InmateSchema = new Schema({
	"book_date_formatted": String,
	"name": String,
	"mugshot": String,
	"book_date": String,
	"charges": [ String ],
	"more_info_url": String
});

var Inmate = mongoose.model('Inmate', InmateSchema);
module.exports = Inmate;