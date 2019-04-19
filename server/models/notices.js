var mongoose = require('./ds');

//数据
var noticeSchema = new mongoose.Schema({
    "userId": Number,
    "pwd": String,
    "userType": Number,
    "userName": String,
    "userPhone": String,
    "address": String
});

module.exports = mongoose.model('user',noticeSchema);
// user对于数据库的users表
