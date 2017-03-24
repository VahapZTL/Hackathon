var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Planli = require('./Planli');
var Plansiz = require('./Plansiz');

var UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type:String,
        required: true
    },
    adSoyad: {
        type:String,
        required: true
    },
    token: String,
    createdDate: Date.now(),
    rota: {
        planli: Planli,
        plansiz: Plansiz
    }
});