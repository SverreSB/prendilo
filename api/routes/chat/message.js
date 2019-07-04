const express = require('express');
const router = express.Router();
const app = express();

const asyncMiddleware = require('../../../middleware/async');
const {Chat} = require('../../../models/objects/chat/chat');



router.post('/send', asyncMiddleware( async(req, res) => {
    const message = { "sender": req.body.sender, "message": req.body.message}
    await Chat.findOneAndUpdate(
        { participants: { $in: [req.body.sender] } },
        { $push: {messages: message} },
        { new: true },
        (err, doc) => {
            console.log(err)
            if(err) res.send(err)
            else res.send(doc.messages)
        }
    )
}))

module.exports = router;