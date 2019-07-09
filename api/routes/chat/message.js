const express = require('express');
const router = express.Router();

const asyncMiddleware = require('../../../middleware/async');
const {Chat} = require('../../../models/objects/chat/chat');
const {validateMessage} = require('../../../models/schema/message');


/**
 *  Send a message router handler
        Finds chat object in db, returns if not
        checks if sender is a participant of chat
        creates message object and validates it
        saves message the messages array in chat object
 */
router.post('/send', asyncMiddleware( async(req, res) => {
    const chat = await Chat.findById(req.body.chat_id,
        (err) => {
            if(err) return res.status(400).send(err.message)
    });

    if(!chat) return res.status(400).send('Chat not found.');

    if(chat.participants.indexOf(req.body.sender) < 0 ) return res.status(400).send('Can\'t send message');

    const message = { "sender": req.body.sender, "message": req.body.message}
    const validateInput = validateMessage(message);
    if(validateInput.error) return res.status(400).send(validateInput.error.details[0].message);

    chat.messages.push(message);
    chat.save();
    res.send('done');
}))

module.exports = router;