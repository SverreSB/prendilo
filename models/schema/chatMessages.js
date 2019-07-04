const mongoose = require('mongoose');
const Joi = require('joi');

const ChatMessageSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    message: {
        type: String,
        minlength: 1,
        maxlength: 256
    }
}, {timestamps: true});

function validateMessage(body) {
    const schema = {
        sender: Joi.string().length(24).required(),
        message: Joi.string().min(1).max(256)
    }
    
    const validation = Joi.validate(body, schema);

    return validation;
}

exports.ChatMessageSchema = ChatMessageSchema;
exports.validateMessage = validateMessage;