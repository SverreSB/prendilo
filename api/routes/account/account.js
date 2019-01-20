const express = require('express');
const asyncMiddleware = require('../../../middleware/async');
const _ = require('lodash');
const router = express.Router();
const auth = require('../../../middleware/auth');
const {User} = require('../../../models/objects/users/user');
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


router.get('/food', auth, )

module.exports = router;