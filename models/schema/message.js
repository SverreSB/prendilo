const mongoose = require('mongoose');
const Joi = require('joi');

const {EncryptedMessageSchema} = require('./encryptedMessage');

const MessageSchema = mongoose.Schema({
    _id: false,
    sender: {
        type: String,
        required: true
    },
    message: EncryptedMessageSchema
}, {timestamps: true});

function validateMessage(body) {
    const schema = {
        sender: Joi.string().length(24).required(),
        message: Joi.object().required()
    }
    
    const validation = Joi.validate(body, schema);

    return validation;
}

exports.MessageSchema = MessageSchema;
exports.validateMessage = validateMessage;