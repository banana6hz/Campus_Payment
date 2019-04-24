let mongoose = require('./ds');

let workerSchema = new mongoose.Schema({
    "userId" : Number,
    "pwd" : String,
    "userType" : Number,
    "userPhone" : String,
    "userName" : String,
    "message":[{
        "msgHeader":String,
        "msgCount":String,
        "msgTime":String,
        "msgDepartment":String,
        "msgRoom":String,
        "msgRule":Number,
        "isRead":Boolean,
    }]
})

module.exports = mongoose.model('worker', workerSchema);
