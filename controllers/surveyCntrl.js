var Survey = require('../models/survey');

// create var for current month
var date = new Date();
var month = date.getMonth();
// create var for collection name using current month variable
var collection = 'survey' + month;

var defaultUrl = 'http://www.colorado.edu/libraries/'
var surveyActive = true;

module.exports = {

    startSurvey: function(req, res) {
        // check if encoded url had a url in it
        if (req.query.url) {
            var redirectUrl = req.query.url.slice(1, req.query.url.length -1);
        }
        console.log(redirectUrl);
        console.log(collection);

        if (surveyActive) {

            // check if encoded url has a session id in it
            if (req.query.id) {

                var id = Number(req.query.id);
                console.log(id);

                // check for session id in database
                Survey.collection.findOne({'sessionID': id}, function(err, result) {
                    console.log(result);
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

            // if there is no session ID then just send to survey
            else {
                res.sendFile('/html/index.html', {root : './public'});
            }
        }
        // survey is not active
        else if (redirectUrl) { res.redirect(redirectUrl); }
        else {
            res.redirect(defaultUrl);
        }
    },

    submitSurvey: function(req, res) {

        var redirectUrl = req.body.url;
        console.log('redirectURL ' + redirectUrl);

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

