var mongoose = require('./ds');

var feeSchema = new mongoose.Schema({
    "feeID" : Number,
    "feeName" : String,
    "feeNum": Number,
    "feeUnit":String
})

module.exports = mongoose.model('fee', feeSchema);
