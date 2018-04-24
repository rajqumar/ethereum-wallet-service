var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function(req, res){
	res.sendFile(__dirname+"/public/html/index.html");
});

app.listen(7000, function(){
	console.log('Listening to the port 7000');
});