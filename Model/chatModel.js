const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    receiver: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    message: String,
    timestamp: { type: Date, default: Date.now }
});
messageSchema.index({ sender: 1, receiver: 1 });
const Chat = mongoose.model('Chat' , messageSchema)
module.exports = Chat;