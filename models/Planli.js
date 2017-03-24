var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlanliScheme = new Schema({
    baslangic: Array,
    bitis: String,
    tarih: Date,
    saat: Date().getHours()
});

module.exports = mongoose.model('Planli', PlanliScheme);