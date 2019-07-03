const express = require('express');
const router = express.Router();
const app = express();
const _ = require('lodash');

const asyncMiddleware = require('../../../middleware/async');
const {User} = require('../../../models/objects/users/user');
const {Chat} = require('../../../models/objects/chat/chat');



router.post('/', asyncMiddleware( async(req, res) =>{
    const receiver= await User.findOne({phone: req.body.receiver});
    const giver = await User.findById(req.body.user_id);
    req.body.participants = [giver._id, receiver._id]
    req.body.messages = [{"sender": giver.name, "message": "test"}]
    const chat = new Chat(_.pick(req.body, ['participants', 'messages']))
    chat.save();
    res.status(200).send('test');
}))

module.exports = router;