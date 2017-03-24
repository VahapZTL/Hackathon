var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlansizScheme = new Schema({
    lat: Number,
    lng: Number,
    yaricap: Number
});

module.exports = mongoose.model('Plansiz', PlansizScheme);