var mongoose = require('./ds');

var departmentSchema = new mongoose.Schema({
    "departmentId" : Number,
    "departmentName" : String,
})

module.exports = mongoose.model('department', departmentSchema);
