const express = require('express');
const router = express.Router();
const app = express();
const _ = require('lodash');

const asyncMiddleware = require('../../../middleware/async');
const {User} = require('../../../models/objects/users/user');
const {Chat, validateChat} = require('../../../models/objects/chat/chat');



router.post('/', asyncMiddleware( async(req, res) =>{
    const giver = await User.findOne({phone: req.body.giver});
    const receiver = await User.findById(req.body.receiver);
    req.body.participants = [giver._id, receiver._id, "aff"]
    req.body.messages = [{"sender": giver.name, "message": req.body.message}];
    const chat = new Chat(_.pick(req.body, ['participants', 'messages']));

    /*const validateInput = validateChat(req.body);
    if(validateInput.error) return res.status(400).send(validateInput.error.details[0].message)*/
    chat.save();
    res.status(200).send('test');
}))

module.exports = router;