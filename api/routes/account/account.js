const express = require('express');
const _ = require('lodash');
const router = express.Router();
const auth = require('../../../middleware/auth');
const {User} = require('../../../models/objects/users/user');


/**
 *  Fetching user data for logged in user if token is correct. 
 */

router.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user._id)
                .select('-password')
                .select('-_id')
                .select('-phone')
                .select('-__v');
    res.send(user);
});


router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

module.exports = router;