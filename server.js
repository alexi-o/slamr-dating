var express = require('express');

var app = express();
var port = process.env.PORT || 3000;

var db = require('./models');

//public views
app.use(express.static(__dirname + '/front/'));

app.get('/', function index(req, res){
	res.sendFile(__dirname + '/front/index.html');
});

app.get('/inmates', function show(req,res){
	db.Inmate.find({}, function(err, inmates){
		res.json(inmates);
	});
});

app.get('/inmates/:id', function show(req, res){
	console.log(req.params);
	db.Inmate.findById({_id: req.params.id}, function(err, inmates){
		res.json(inmates);
	});
});

app.delete('/inmates/:id', function remove(req, res){
	console.log(req.params);
	db.Inmate.remove({_id :req.params.id}, function(err, inmates){
		res.json({message: 'Criminal successfully deleted ' + req.params.id});
	});
});

app.listen(port, function() {
  console.log('Server started on', port); 
});



