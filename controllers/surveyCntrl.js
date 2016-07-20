var Survey = require('../models/survey');

// create var for current month
var date = new Date();
var month = date.getMonth();
// create var for collection name using current month variable
var collection = 'survey' + month;

module.exports = {
    submitSurvey: function(req, res) {
        console.log('hitting submit')
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
    surveyFind: function(req, res) {

        var id = Number(req.query.id);
        var redirectUrl = req.query.url;
        console.log(typeof id);

        console.log(id);
        Survey.collection.findOne({'sessionID': id}, function(err, result) {
            console.log(result);
        });

        // Survey.collection.find({sessionID: id}, function(err, results) {
        //     console.log('working');
        //     console.log('from callback ' + results);
        // });

        // console.log('executing search');
        // console.log(Survey.collection.find({sessionID: id}).count() > 0);

        // if (Survey.collection.findOne({sessionID: id})) {
        //     console.log('found');
        // }
        // else {
        //     console.log('not found');
        // }

    }
};

