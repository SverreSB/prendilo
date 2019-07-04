const express = require('express');
const router = express.Router();
const app = express();
const _ = require('lodash');

const asyncMiddleware = require('../../../middleware/async');
const {User} = require('../../../models/objects/users/user');
const {Chat} = require('../../../models/objects/chat/chat');



router.post('/', asyncMiddleware( async(req, res) =>{
    const giver = await User.findOne({phone: req.body.giver});
    const receiver = await User.findById(req.body.receiver);
    req.body.participants = [giver._id, receiver._id]
    req.body.messages = [{"sender": giver.name, "message": req.body.message}]
    const chat = new Chat(_.pick(req.body, ['participants', 'messages']))
    chat.save();
    res.status(200).send('test');
}))

module.exports = router;