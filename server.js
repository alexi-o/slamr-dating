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
	db.Inmate.findById({id: req.params.id}, function(err, inmate){
		res.json(inmate);
	});
});

app.listen(port, function() {
  console.log('Server started on', port); 
});



