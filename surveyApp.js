// requires
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connect to DB
mongoose.connect('mongodb://localhost/survey2016');

// create express app object
var app = express();

// app configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// controller requires
var surveyCntrl = require('./controllers/surveyCntrl');

// Routes
app.get('/', function(req, res){
  res.sendFile('/html/index.html', {root : './public'})
});

app.post('/api/submitSurvey', surveyCntrl.submitSurvey);

// Creating Server and Listening for Connections \\
var port = 8082
app.listen(port, function(){
  console.log('Server running on port ' + port);

});