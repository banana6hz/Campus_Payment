let mongoose = require('mongoose');

let Schema = mongoose.Schema;

//数据
let noticeSchema = new Schema({
    "userId": Number,
    "pwd": String,
    "userType": Number
});

module.exports = mongoose.model('user',noticeSchema);
// user对于数据库的users表
