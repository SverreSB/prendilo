const mongoose = require('mongoose');
const {ChatMessageSchema} = require('../../schema/chatMessages');

const schema = new mongoose.Schema({
    participants: {
        type: Array,
        required: true
    },
    messages: {
        type: [ChatMessageSchema]
    }
});

const Chat = mongoose.model('Chat', schema);

exports.Chat = Chat