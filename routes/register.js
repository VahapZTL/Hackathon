var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Q = require('q');

var User = mongoose.model('User');

router.get('/', function(req, res, next) {
    res.render('register');
});

router.post('/', function (req, res, next) {
    registerUser(req.body.email, req.body.password, req.body.name)
        .then(function (result) {
            res.redirect('/login');
            console.log(result);
        }).fail(function (err) {
        console.log(err);
    });
});

var registerUser = function (email, password, name) {
    var deferred = Q.defer();

    User.findOne({email: email}, function (err, user) {
        if (err){
            deferred.reject('HATA', err);
        }else{
            if(user){
                deferred.reject('Kullanıcı Zaten Mevcut!');
            }else{
                var UserModel = new User();

                UserModel.email = email;
                UserModel.password = password;
                UserModel.name = name;

                UserModel.save(function (err, user) {
                    if(err){
                        deferred.reject('HATA', err);
                    }else{
                        deferred.resolve('Kullanıcı Başarıyla Eklendi: ', user);
                    }
                });
            }
        }
    });

    return deferred.promise;
};

module.exports = router;