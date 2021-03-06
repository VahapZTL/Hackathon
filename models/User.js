var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

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
    createdDate: {
        type: Date,
        default: Date.now
    },
    rota: {
        planli: {
            baslangic: Array,
            bitis: String,
            tarih: Date
        },
        plansiz: {
            lat: Number,
            lng: Number,
            yaricap: Number
        }
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