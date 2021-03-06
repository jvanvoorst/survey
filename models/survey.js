var mongoose = require('mongoose');

var surveySchema = mongoose.Schema( {
    user: {
        type: String,
        required: true,
    },
    affiliation: {
        type: String,
        required: true
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

module.exports = mongoose.model('UCBsurvey', surveySchema);