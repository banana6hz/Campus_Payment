var mongoose = require('./ds');

var workerSchema = new mongoose.Schema({
    "userId" : Number,
    "pwd" : String,
    "userType" : Number,
    "userPhone" : String,
    "userName" : String,
})

module.exports = mongoose.model('worker', workerSchema);
