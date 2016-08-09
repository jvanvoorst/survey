// requires
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var sessionID = '';
var redirectUrl = '';

// connect to DB
mongoose.connect('mongodb://localhost/survey2016');

// create express app object
var app = express();

// app configuration

app.use(express.static(__dirname + '/public'));

// create body parsers
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// controller requires
var surveyCntrl = require('./controllers/surveyCntrl.js');

// Routes
app.get('/survey', surveyCntrl.startSurvey);

app.get('/getcsv', surveyCntrl.getCsv);

app.post('/api/submitSurvey', jsonParser, surveyCntrl.submitSurvey);

app.get('/api/downloadCsv', surveyCntrl.downloadCsv);

// Creating Server and Listening for Connections \\
var port = 8082;
app.listen(port, function(){
  console.log('Server running on port ' + port);

});