var mongoose = require('./ds');

var roomSchema = new mongoose.Schema({
    "roomId" : Number,
    "roomName" : String,
})

module.exports = mongoose.model('room', roomSchema);
