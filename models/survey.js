var mongoose = require('mongoose');

var surveySchema = mongoose.Schema( {
    user: {
        type: String,
        required: true,
    },
    userOther: {
        type: String,
    },
    affiliation: {
        type: String,
        required: true
    },
    affiliationOtherUCB: {
        type: String
    },
    affiliationNonUCB: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    usage: {
        type: String,
        required: true
    },
    sponsor: {
        type: String
    },
    researcher: {
        type: String
    },
    grant: {
        type: String
    },
    timeStamp: {
        type: String,
        required: true
    },
    sessionID: {
        type: String,
    },
    url: {
        type: String,
    }
});

module.exports = surveySchema;