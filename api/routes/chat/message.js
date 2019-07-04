const express = require('express');
const router = express.Router();
const app = express();

const asyncMiddleware = require('../../../middleware/async');
const {Chat} = require('../../../models/objects/chat/chat');



router.post('/send', asyncMiddleware( async(req, res) => {
    const message = { "sender": req.body.sender, "message": req.body.message}
    const chat = await Chat.findOneAndUpdate(
        { participants: { $in: [req.body.sender] } },
        { $push: {messages: message} }
    )

    res.send(chat.messages)
}))

module.exports = router;