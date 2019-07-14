const mongoose = require('mongoose');
const Joi = require('joi');

const EncryptedMessageSchema = new mongoose.Schema({
    _id:false,
    iv: {
        type: String,
        required: true
    },
    encryptedData: {
        type: String,
        required: true
    }
});

function validateEncryptedMessage() {
    const schema = {
        iv: Joi.string().required(),
        encryptedData: Joi.string().required()
    }

    const validation = Joi.validate(body, schema);

    return validation;
}

exports.EncryptedMessageSchema = EncryptedMessageSchema
exports.validateEncryptedMessage = validateEncryptedMessage