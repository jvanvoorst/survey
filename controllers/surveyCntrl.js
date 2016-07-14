var surveySchema = require('../models/survey');
var mongoose = require('mongoose');

// create var for current month
var date = new Date();
var month = date.getMonth();
// create var for collection name using current month variable
var collection = 'survey' + month;

// connect to collection and use surveySchema
var Survey = mongoose.model(collection, surveySchema);

var surveyController = {
    submitSurvey : function(req, res) {
        console.log(req.body);
        var survey = new Survey(req.body);
        survey.save(function(err) {
            if (err) {
                console.log('error writing to DB');
                console.log(err);
            }
            else {
                console.log('writing to db success');
            }
        });
    },
};

module.exports = surveyController;