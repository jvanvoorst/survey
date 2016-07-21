var Survey = require('../models/survey');

// create var for current month
var date = new Date();
var month = date.getMonth();
// create var for collection name using current month variable
var collection = 'survey' + month;

var defaultUrl = 'http://www.colorado.edu/libraries/'
var surveyActive = true;
var id = '';
var redirectUrl = '';

module.exports = {

    startSurvey: function(req, res) {

        id = Number(req.query.id);
        redirectUrl = req.query.url;
        console.log(redirectUrl);

        if (surveyActive) {
            // check for session id in database
            Survey.collection.findOne({'sessionID': id}, function(err, result) {
                if (result) {
                    // sessionID is already in database so send user to their resource
                    console.log('ID found sending to resource')
                    if (redirectUrl) {res.redirect(redirectUrl);}
                    else {res.redirect(defaultUrl);}
                }
                else {
                    // SessionID is new so send user to survey
                    console.log('Unique ID send to survey')
                    res.sendFile('/html/index.html', {root : './public'});
                }
            });
        }
        else if (redirectUrl) { res.redirect(redirectUrl); }
        else {
            res.redirect(defaultUrl);
        }
    },

    submitSurvey: function(req, res) {

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

        if (redirectUrl) {
            res.send(redirectUrl);
        }
        else {
            console.log('redirecting to default');
            res.send(defaultUrl);
        }
    }

};

