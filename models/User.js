var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
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

UserSchema.pre('save', function(callback) {
    var user = this;

    if (!user.isModified('password')) return callback();

    bcrypt.genSalt(5, function(err, salt) {
        if (err) return callback(err);

        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return callback(err);
            user.password = hash;
            callback();
        });
    });
});

UserSchema.methods.verifyPassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);