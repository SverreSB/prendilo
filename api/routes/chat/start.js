const express = require('express');
const router = express.Router();
const _ = require('lodash');

const crypto = require('crypto');
const assert = require('assert');

const asyncMiddleware = require('../../../middleware/async');
const auth = require('../../../middleware/auth');
const {User} = require('../../../models/objects/users/user');
const {Chat, validateStartChat} = require('../../../models/objects/chat/chat');
const {validateMessage} = require('../../../models/schema/message');
const {encrypt} = require('../../../models/helpers/cryptography');


/**
 *  Start a chat
        creates message objects and validates it
        finds giver and reciver users, check if found
        create array of message object and array of participants and validates if it is a valid chat
        Creates chat, store the id in giver and receiver user and saves chat, giver and receiver update, to db
 */
router.post('/', auth, asyncMiddleware( async(req, res) => {
    console.log(encrypt(req.body.message))
    let message = { "sender": req.user._id, "message": req.body.message };
    const validateChatMessage = validateMessage(message);
    if(validateChatMessage.error) return res.status(400).send(validateChatMessage.error.details[0].message);

    const giver = await User.findOne({phone: req.body.giver});
    const receiver = await User.findById(req.user._id);

    if(!(giver && receiver)) return res.status(400).send('Chat not created, invalid giver or receiver');

    req.body.messages = [message];
    req.body.participants = [giver._id, receiver._id];

    const validateInput = validateStartChat(_.pick(req.body, ['participants', 'messages']));
    if(validateInput.error) return res.status(400).send(validateInput.error.details[0].message);

    const chat = new Chat(_.pick(req.body, ['participants', 'messages']));
    receiver.chats.push(chat._id);
    giver.chats.push(chat._id);
    receiver.save();
    giver.save();
    chat.save();
    res.status(200).send(chat);
}))

function generatePublicKey() {

    // Generate Alice's keys...
    const alice = crypto.createDiffieHellman(2048);
    const aliceKey = alice.generateKeys();

    // Generate Bob's keys...
    const bob = crypto.createDiffieHellman(alice.getPrime(), alice.getGenerator());
    const bobKey = bob.generateKeys();

    // Exchange and generate the secret...
    const aliceSecret = alice.computeSecret(bobKey);
    const bobSecret = bob.computeSecret(aliceKey);
    
    // OK
    assert.strictEqual(aliceSecret.toString('hex'), bobSecret.toString('hex'));
    
    return bobSecret;
}

module.exports = router;    