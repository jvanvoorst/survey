var mongoose = require('mongoose');

// create var for current month
var date = new Date();
var month = date.getMonth();
// create var for collection name using current month variable
var collection = 'survey' + month;

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

module.exports = mongoose.model(collection, surveySchema);