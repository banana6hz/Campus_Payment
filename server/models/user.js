let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let testSchema = new Schema({
  "userId": String,
  "pwd": String,
  "userType": String
});

module.exports = mongoose.model("test",testSchema);
//创建模块并导出  会在mongodb产生映射 User 会映射为 users  复数 而且都是小写
