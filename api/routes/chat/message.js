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
        saves encrypted message to the messages array in chat object
 */
router.post('/send', auth, asyncMiddleware( async(req, res) => {
    const inputValidation = validateInput(req.body);
    if(inputValidation.error) return res.status(400).send(inputValidation.error.details[0].message);

    const chat = await Chat.findById(req.body.chat_id,
        (err) => {
            if(err) return res.status(400).send(err.message)
    });

    if(!chat) return res.status(400).send('Chat not found.');

    if(chat.participants.indexOf(req.user._id) < 0) return res.status(400).send('Can\'t send message');

    const key = req.body.key;

    const message = { "sender": req.user._id, "message": encrypt(req.body.message, key)}
    const messageValidation = validateMessage(message);
    if(messageValidation.error) return res.status(400).send(messageValidation.error.details[0].message);

    chat.messages.push(message);
    chat.save();
    res.send('done');
}))

/**
 *  Get chat messages router handler
        finds chat from input
        checks if user from auth is participant of chat to validate
        iterates over messages in chat and adds it to array containing decrypted message, sender and timestamp
        returns array containing object({message, sender, times})

 */
router.get('/get', auth, asyncMiddleware( async(req, res) => {
    const chat = await Chat.findById(req.body.chat_id,
        (err) => {
            if(err) return res.status(400).send(err.message)
    });

    if(chat.participants.indexOf(req.user._id) < 0) return res.status(400).send("Can't access getting message when not a participant");

    const messages = chat.messages;
    let content = []
    messages.forEach(messageObject => {
        const message = decrypt(messageObject.message, req.body.key); 
        content.push({"message": message, "sender": messageObject.sender, timestamp: messageObject.createdAt});
    });
    res.status(200).send(content);
}))


function validateInput(body) {
    const schema = Joi.object({
        chat_id: Joi.string().length(ID_LENGTH).required(),
        message: Joi.string().min(MESSAGE_LENGTH_MIN).max(MESSAGE_LENGTH_MAX).required(),
        key: Joi.string().length(24).required()
    });
    return schema.validate(body);
} 
module.exports = router;