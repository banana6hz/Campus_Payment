var mongoose = require('./ds');

var messageSchema = new mongoose.Schema({
    "suggestText" : String,
    "suggestTime" : String,
    'author':String,
    'isRead':Boolean,
    'userId':Number
})

module.exports = mongoose.model('message', messageSchema);
