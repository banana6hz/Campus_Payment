var mongoose = require('./ds');

//数据
var userSchema = new mongoose.Schema({
    "userId": Number,
    "pwd": String,
    "userType": Number,
    "userName": String,
    "userPhone": String,
    "address": String,
    "waterRecord": [{
        "paymentTime":String,
        "createTime": String,
        "payment": String,
        "paymentMethod": String,
        "paymentBody": String,
        "outTradeId": String
    }],
    "roomId":Number,
    "roomName":String,
    "departmentId":Number,
    "departmentName":String,
    "masterId":Number,
    "masterName":String,
    "message":[{
        "msgHeader":String,
        "msgCount":String,
        "msgTime":String,
        "msgDepartment":String,
        "msgRoom":String,
        "msgRule":Number,
        "isRead":Boolean,
    }],
    "suggest":[{
        "suggestText" : String,
        "suggestTime" : String,
        "author" : String,
        "userId" : Number,
        "isRead" : Boolean,
    }]
});

module.exports = mongoose.model('user',userSchema);
// user对应数据库的users表
