var Survey = require('../models/survey');
var json2csv = require('json2csv');

var defaultUrl = 'http://www.colorado.edu/libraries/';
var surveyActive = true;

module.exports = {

    startSurvey: function(req, res) {

        var redirectUrl = '';

        console.log('start survey');

        // check if url has a url parameter in it
        if (req.query.url) {
            redirectUrl = req.query.url ;
            console.log('found url setting redirectUrl to ' + redirectUrl);
        }

        if (surveyActive) {

            console.log('survey active');
            // check if url has a session id parameter in it
            if (req.query.id) {

                var id = req.query.id;
                console.log('sessionID found setting id to ' + id);

                // check for session id in database
                Survey.findOne({'sessionID': id}, function(err, result) {
                    if (result) {
                        // sessionID is already in database so send user to their resource
                        console.log('ID found in database sending to resource');
                        if (redirectUrl) {res.redirect(redirectUrl);}
                        else {res.redirect(defaultUrl);}
                    }
                    else {
                        // SessionID is new so send user to survey
                        console.log('Unique ID send to survey');
                        res.sendFile('/html/index.html', {root : './public'});
                    }
                });
            }

            // if there is no session ID then just send to survey
            else {
                console.log('no session id sending to survey');
                res.sendFile('/html/index.html', {root : './public'});
            }
        }
        // survey is not active send to requested resource else default url
        else if (redirectUrl) {
            console.log('survey not active sending to requested resource');
            res.redirect(redirectUrl);
        }
        else {
            console.log('survey not active no url, sending to default');
            res.redirect(defaultUrl);
        }
    },

    submitSurvey: function(req, res) {

        var redirectUrl = req.body.url;
        console.log('redirectURL ' + redirectUrl);

        var surveyData = req.body;

        surveyData.timeStamp = new Date();

        var survey = new Survey(surveyData);
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
    },

    getCsv: function(req, res) {
        res.sendFile('/html/getcsv.html', {root: './public'});
    },

    downloadCsv: function(req, res) {

        console.log(req.query);

        var fields = ['timeStamp', 'user', 'affiliation', 'location', 'usage', 'sponsor', 'researcher', 'grant', 'sessionID', 'url'];

        if (req.query.get === 'all') {
            Survey.find({}, function(err, result) {
                if (!err) {
                    json2csv({data: result, fields: fields}, function(err, csv) {
                        if (!err) {
                            res.setHeader('Content-disposition', 'attachment; filename=data.csv');
                            res.set('Content-Type', 'text/csv');
                            res.status(200).send(csv);
                        }
                        else {
                            console.log('ERROR in csv conversion: ');
                            console.log(err);
                        }
                    });
                }
                else {
                    console.log('ERROR in database query: ');
                    console.log(err);
                }
            });
        }
    }

};

