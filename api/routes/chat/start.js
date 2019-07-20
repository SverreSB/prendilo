const express = require('express');
const router = express.Router();
const _ = require('lodash');
const Joi = require('joi');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const assert = require('assert');

const asyncMiddleware = require('../../../middleware/async');
const auth = require('../../../middleware/auth');
const {User} = require('../../../models/objects/users/user');
const {Chat, validateStartChat} = require('../../../models/objects/chat/chat');
const {validateMessage} = require('../../../models/schema/message');
const {encrypt} = require('../../../models/helpers/cryptography');
const {PHONE_NUMBER_MIN, PHONE_NUMBER_MAX, MESSAGE_LENGTH_MAX, MESSAGE_LENGTH_MIN} = require('../../../constants/constants');
const {saltAndHash} = require('../../../models/helpers/saltAndHash')
const {generateSecret} = require('../../helpers/keys/generateKey');


/**
 *  Start a chat
        Firstly validating the input
        creates encrypted message objects and validates it
        finds giver and reciver users, check if found
        create array of message object and array of participants and validates if it is a valid chat
        Creates chat, store the id in giver and receiver user and saves chat, giver and receiver update, to db
 */
router.post('/', auth, asyncMiddleware( async(req, res) => {
    const validateInput = validateInputForm(req.body);
    if(validateInput.error) return res.status(400).send(validateInput.error.details[0].message);

    const secret = generateSecret();
    let key = crypto.createHash('sha256').update(String(secret)).digest('base64').substr(0, 24);
    const message = { "sender": req.user._id, "message": encrypt(req.body.message, key) };
    const validateChatMessage = validateMessage(message);
    if(validateChatMessage.error) return res.status(400).send(validateChatMessage.error.details[0].message);

    const giver = await User.findOne({phone: req.body.giver});
    const receiver = await User.findById(req.user._id);

    if(!(giver && receiver)) return res.status(400).send('Chat not created, invalid giver or receiver');

    req.body.messages = [message];
    req.body.participants = [giver._id, receiver._id];
    req.body.key = await saltAndHash(key);

    const validateChat = validateStartChat(_.pick(req.body, ['participants', 'messages', 'key']));
    if(validateChat.error) return res.status(400).send(validateChat.error.details[0].message);

    const chat = new Chat(_.pick(req.body, ['participants', 'messages', 'key']));
    receiver.chats.push(chat._id);
    giver.chats.push(chat._id);
    receiver.save();
    giver.save();
    chat.save();
    res.status(200).send({"chat": chat, "secret": secret});
}))

function validateInputForm(body) {
    const schema = Joi.object({
        giver: Joi.number().min(PHONE_NUMBER_MIN).max(PHONE_NUMBER_MAX).required(),//phone number, check user schema
        message: Joi.string().min(MESSAGE_LENGTH_MIN).max(MESSAGE_LENGTH_MAX).required()//message length is max 256
    });

    return schema.validate(body);
}

module.exports = router;    