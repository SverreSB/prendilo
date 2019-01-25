const express = require('express');
const bcrypt = require('bcrypt');
const asyncMiddleware = require('../../../middleware/async');
const _ = require('lodash');
const router = express.Router();
const auth = require('../../../middleware/auth');
const {User, validatePassword} = require('../../../models/objects/users/user');
const {Food} = require('../../../models/objects/food/food');
const {bcryptCompare} = require('../../../models/helpers/comparePw');


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
    const user = await User.findById(req.user._id);

    const validation = validatePassword(req.body);
    if(validation.error) return res.status(400).send(validation.error.details[0].message);

    if((req.body.new_password != req.body.confirm_password) || req.body.new_password === req.body.old_password){
        return res.status(400).send('Passwords cannot match old password. Confirm and new password must match');
    }

    const validOldPw = await bcryptCompare(req.body.old_password, user.password);
    if(!validOldPw) return res.status(400).send('Mismatch password');

    const salt = await bcrypt.genSalt(10);
    req.body.new_password = await bcrypt.hash(req.body.new_password, salt);
    
    const updateUser = await User.findByIdAndUpdate(req.user._id, {
        password: req.body.new_password
    });
    if(!updateUser) return res.status(400).send('Could not find user');

    res.send(updateUser);
}));


router.get('/food', auth, )

module.exports = router;