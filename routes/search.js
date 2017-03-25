var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Q = require('q');

var SearchPool = mongoose.model('SearchPool');

router.get('/', function(req, res, next) {
    res.render('search');
});

router.post('/', function (req, res, next) {
    Search(req.body.userID, req.body.latitude, req.body.longitude)
        .then(function (result) {
            res.status(200).json({
                data: result
            });
            console.log(result);
        }).fail(function (err) {
        console.log(err);
    });
});

var Search = function (userID, latitude, longitude) {
    var deferred = Q.defer();

    SearchPool.findOne({userID: userID}, function (err, data) {
        if (err){
            deferred.reject('HATA', err);
        }else{
            if (data){
                if (!latitude || !longitude){
                    deferred.reject('Veriler boş olamaz!');
                }else{
                    data.latitude = latitude;
                    data.longitude = longitude;
                    deferred.resolve('Veriler güncellendi!');
                }
            }else {
                var SearchPoolModel = new SearchPool();
                SearchPoolModel.userID = userID;
                SearchPoolModel.latitude = latitude;
                SearchPoolModel.longitude = longitude;

                SearchPoolModel.save(function (err, model) {
                    if (err) {
                        deferred.reject('HATA', err);
                    }else{
                        deferred.resolve(model);
                    }
                });
            }
        }
    });

    return deferred.promise;
};

module.exports = router;