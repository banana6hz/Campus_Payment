var mongoose = require('./ds');

var workerSchema = new mongoose.Schema({
    "userId" : Number,
    "pwd" : String,
    "userType" : Number
})

module.exports = mongoose.model('worker', workerSchema);