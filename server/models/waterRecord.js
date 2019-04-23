var mongoose = require('./ds');

var waterSchema = new mongoose.Schema({
    "roomId" : Number,
    "roomName" : String,
    "departmentId" : Number,
    "departmentName" : String,
    "waterTime":String
})

module.exports = mongoose.model('water', waterSchema);
