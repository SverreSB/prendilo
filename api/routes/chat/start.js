const express = require('express');
const router = express.Router();
const app = express();
const _ = require('lodash');

const asyncMiddleware = require('../../../middleware/async');
const {User} = require('../../../models/objects/users/user');
const {Chat, validateStartChat} = require('../../../models/objects/chat/chat');
const {validateMessage} = require('../../../models/schema/message');



router.post('/', asyncMiddleware( async(req, res) =>{
    const giver = await User.findOne({phone: req.body.giver});
    const receiver = await User.findById(req.body.receiver);

    if(!(giver && receiver)) return res.status(400).send('Chat not created, invalid giver or receiver');

    req.body.messages = [{"sender": req.body.receiver, "message": req.body.message}];
    req.body.participants = [giver._id, receiver._id];

    const validateInput = validateStartChat(_.pick(req.body, ['participants', 'messages']));
    if(validateInput.error) return res.status(400).send(validateInput.error.details[0].message);

    const chat = new Chat(_.pick(req.body, ['participants', 'messages']));

    chat.save();
    res.status(200).send(chat);
}))

module.exports = router;