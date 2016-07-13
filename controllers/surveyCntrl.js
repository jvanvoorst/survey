var Surveydb = require('../models/survey');

var surveyController = {
    submitSurvey : function(req, res) {
        console.log(req.body);
        var survey = new Surveydb(req.body);
        survey.save(function(err) {
            if (err) {
                console.log('Error writing to DB');
                console.log(err);
            }
            else {
                console.log('writing to db success');
            }
        });
    },
};

module.exports = surveyController;