var express = require('express');
var bodyParser = require('body-parser');

// connect to DB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/survey2016');

// create express app object
var app = express();

// app configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// controller requires
var surveySubmitCntrl = require('./controllers/surveySubmit');

// Routes
app.get('/', function(req, res){
  res.sendFile('/html/index.html', {root : './public'})
});

app.post('api/submitSurvey', surveySubmitCntrl.submitSurvey);

// Creating Server and Listening for Connections \\
var port = 8082
app.listen(port, function(){
  console.log('Server running on port ' + port);

});