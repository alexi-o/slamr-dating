var express = require('express');

var app = express();
var port = process.env.PORT || 3000;

//public views
app.use(express.static(__dirname + '/front/'));

app.get('/', function index(req, res){
	res.sendFile(__dirname + '/front/index.html');
});

app.listen(port, function() {
  console.log('Server started on', port); 
});