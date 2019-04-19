var mongoose = require('./ds');

//数据
var userSchema = new mongoose.Schema({
    "userId": Number,
    "pwd": String,
    "userType": Number,
    "userName": String,
    "userPhone": String,
    "address": String
});

module.exports = mongoose.model('test',userSchema);
// user对应数据库的users表
