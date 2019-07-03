const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    message: {
        type: String,
        maxlength: 256
    }
});

exports.ChatMessageSchema = ChatMessageSchema