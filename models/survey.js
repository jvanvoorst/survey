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
    sourceName: {
        type: String
    },
    affiliationNonUCB: {
        type: String
    },
    grantName: {
        type: String
    }
});

module.exports = mongoose.model('survey', surveySchema);