const express = require('express');
const bcrypt = require('bcrypt');
const asyncMiddleware = require('../../../middleware/async');
const _ = require('lodash');
const router = express.Router();
const auth = require('../../../middleware/auth');
const {User, validatePassword} = require('../../../models/objects/users/user');
const {Food} = require('../../../models/objects/food/food');


/**
 *  Fetching user data for logged in user if token is correct. 
 */
router.get('/', auth, asyncMiddleware( async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
}));


router.get('/food', auth, asyncMiddleware( async (req, res) => {
    const food = await Food.find({postedBy: req.user._id});
    res.send(food);
}));


router.post('/password', auth, asyncMiddleware(async(req,res) => {
    const validation = validatePassword(req.body);
    if(validation.error) return res.status(400).send('Input invalid. Please try and chenge the password again');

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    
    const user = await User.findByIdAndUpdate(req.user._id, {
        password: req.body.password
    });
    if(!user) return res.status(400).send('Could not find user');

    res.send(user);
}));


router.get('/food', auth, )

module.exports = router;