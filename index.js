var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function(req, res){
	res.sendFile(__dirname+'/public/html/index.html');
});

var port = 7000;

app.listen(port, function(){
	console.log('Listening to port ' + port);
});
