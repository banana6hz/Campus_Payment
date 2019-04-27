let mongoose = require('./ds');

let messageSchema = new mongoose.Schema({
        "msgHeader":String,
        "msgCount":String,
        "msgTime":String,
        "msgDepartment":String,
        "msgRoom":String,
        "msgRule":Number,
        "isRead":Boolean
})

module.exports = mongoose.model('message', messageSchema);
