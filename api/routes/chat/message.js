const express = require('express');
const router = express.Router();
const Joi = require('joi');

const asyncMiddleware = require('../../../middleware/async');
const auth = require('../../../middleware/auth');
const {Chat} = require('../../../models/objects/chat/chat');
const {validateMessage} = require('../../../models/schema/message');
const {encrypt, decrypt} = require('../../../models/helpers/cryptography');
const {ID_LENGTH, MESSAGE_LENGTH_MAX, MESSAGE_LENGTH_MIN} = require('../../../constants/constants');


/**
 *  Send a message router handler
        Finds chat object in db, returns if not
        checks if sender is a participant of chat
        creates message object and validates it
        saves message the messages array in chat object
 */
router.post('/send', auth, asyncMiddleware( async(req, res) => {
    const inputValidation = validateInput(req.body);
    if(inputValidation.error) return res.status(400).send(inputValidation.error.details[0].message);

    const chat = await Chat.findById(req.body.chat_id,
        (err) => {
            if(err) return res.status(400).send(err.message)
    });

    if(!chat) return res.status(400).send('Chat not found.');

    if(chat.participants.indexOf(req.user._id) < 0 ) return res.status(400).send('Can\'t send message');

    const message = { "sender": req.user._id, "message": encrypt(req.body.message)}
    const messageValidation = validateMessage(message);
    if(messageValidation.error) return res.status(400).send(messageValidation.error.details[0].message);

    chat.messages.push(message);
    chat.save();
    res.send('done');
}))

router.get('/get', asyncMiddleware( async(req, res) => {
    const chat = await Chat.findById(req.body.chat_id);
    const messages = chat.messages;
    messages.forEach(messageObject => {
        const message = decrypt(messageObject.message);
        console.log(message);
    });
    res.send('wuuut wut wut wut wut wuut wut')
}))


function validateInput(body) {
    const schema = Joi.object({
        chat_id: Joi.string().length(ID_LENGTH).required(),
        message: Joi.string().min(MESSAGE_LENGTH_MIN).max(MESSAGE_LENGTH_MAX).required()
    });
    return schema.validate(body);
} 
module.exports = router;