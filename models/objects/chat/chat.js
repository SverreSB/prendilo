const mongoose = require('mongoose');
const Joi = require('joi');
const {ChatMessageSchema} = require('../../schema/chatMessages');

const schema = new mongoose.Schema({
    participants: {
        type: [String],
        required: true,
        validate: [arrayLimit, '{PATH} must contain 2 items(latitude and longitude)']
    },
    messages: {
        type: [ChatMessageSchema]
    }
});

function arrayLimit(val){ 
    return val.length == 2;
}

const Chat = mongoose.model('Chat', schema);

function validateChat(body) {
    const schema = {
        participants: Joi.array().required(),
        messages: Joi.array().required()
    }

    const validation = Joi.validate(body, schema);

    return validation;
}

exports.Chat = Chat
exports.validateChat = validateChat