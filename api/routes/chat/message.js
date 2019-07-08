const express = require('express');
const router = express.Router();
const app = express();

const asyncMiddleware = require('../../../middleware/async');
const {Chat} = require('../../../models/objects/chat/chat');
const {validateMessage} = require('../../../models/schema/message');



router.post('/send', asyncMiddleware( async(req, res) => {
    const chat = await Chat.findById(req.body.chat_id,
        (err) => {
            if(err) return res.status(400).send(err.message)
    });

    if(!chat) return res.status(400).send('Chat not found.')

    const message = { "sender": req.body.sender, "message": req.body.message}
    const validateInput = validateMessage(message);
    if(validateInput.error) return res.status(400).send(validateInput.error.details[0].message);

    res.send('done')
}))

module.exports = router;