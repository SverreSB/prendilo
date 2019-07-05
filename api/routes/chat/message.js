const express = require('express');
const router = express.Router();
const app = express();

const asyncMiddleware = require('../../../middleware/async');
const {Chat} = require('../../../models/objects/chat/chat');
const {validateMessage} = require('../../../models/schema/chatMessages');



router.post('/send', asyncMiddleware( async(req, res) => {
    const message = { "sender": req.body.sender, "message": req.body.message}
    const validateInput = validateMessage(message);
    if(validateInput.error) return res.status(400).send(validateInput.error.details[0].message);
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