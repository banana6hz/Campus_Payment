var mongoose = require('./ds');

var waterSchema = new mongoose.Schema({
    "roomId" : Number,
    "roomName" : String,
    "departmentId" : Number,
    "departmentName" : String,
    "waterTime":String,
    'paymentTime':String,
    'createTime': String,
    'payment': String,
    'paymentMethod': String,
    'paymentBody': String,
    'outTradeId': String,
    'userId': Number
})

module.exports = mongoose.model('water', waterSchema);
