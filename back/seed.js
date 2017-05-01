var db = require('./models');



db.Inmate.remove({}, function(err,inmates){
	db.Inmate.create(questionsList, function(err,inmates){
		if (err) { return console.log('ERROR', err); }
		console.log('create', inmates);
		process.exit();
	});
});