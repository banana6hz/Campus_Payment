var mongoose = require('./ds');

var feeSchema = new mongoose.Schema({
    "feeId" : Number,
    "feeName" : String,
    "feeNum": Number,
    "feeUnit":String,
    "feeDesc":String,
    "feeList":[{
        "feeId" : Number,
        "feeName" : String,
        "feeNum": Number,
        "feeUnit":String,
        "feeDesc":String,
    }]
})

module.exports = mongoose.model('fee', feeSchema);
