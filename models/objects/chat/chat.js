const mongoose = require('mongoose');
const Joi = require('joi');
const {MessageSchema} = require('../../schema/message');

const schema = new mongoose.Schema({
    participants: {
        type: [String],
        required: true,
        validate: [arrayLimit, '{PATH} must contain 2 items(latitude and longitude)']
    },
    messages: {
        type: [MessageSchema],
        required: true
    },
    key: {
        type: String, 
        required: true
    }
});

function arrayLimit(val){ 
    return val.length == 2;
}

const Chat = mongoose.model('Chat', schema);

function validateStartChat(body) {
    const schema = {
        participants: Joi.array().required(),
        messages: Joi.array().required(),
        key: Joi.string().required()
    }

    const validation = Joi.validate(body, schema);

    return validation;
}

exports.Chat = Chat
exports.validateStartChat = validateStartChat