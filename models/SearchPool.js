var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SearchPoolSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('SearchPool', SearchPoolSchema);