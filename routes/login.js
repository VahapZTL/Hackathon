var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Q = require('q');

var User = mongoose.model('User');

router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/', function (req, res, next) {
    loginUser(req.body.email, req.body.password)
        .then(function (result) {
            req.userID = result;
            console.log(result);
        }).fail(function (err) {
        console.log(err);
    });
});

var loginUser = function (email, password) {
    var deferred = Q.defer();

    User.findOne({email: email}, function (err, user) {
        if (err){
            deferred.reject('HATA', err);
        }else{
            if (!user){
                deferred.reject('Kullanıcı Bilgilerinde Hata Var!');
            }else{
                user.verifyPassword(password, function (err, isMatch) {
                    if (err){
                        deferred.reject('HATA', err);
                    }else{
                        if (!isMatch){
                            deferred.reject('Kullanıcı Bilgilerinde Hata Var!');
                        }else {
                            deferred.resolve(user._id);
                        }
                    }
                });
            }
        }
    });

    return deferred.promise;
};

module.exports = router;