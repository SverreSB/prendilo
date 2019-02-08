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
 *  Get request for account
        Find user for logged in account
 */
router.get('/', auth, asyncMiddleware( async (req, res) => {
    //Finds user by ID and responed with user object
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
}));


/**
 *  Get request for posted food for given account 
        Finds food by user._id given by auth middleware
 */
router.get('/food', auth, asyncMiddleware( async (req, res) => {
    //Finding all food objects user has posted
    const food = await Food.find({postedBy: req.user._id});
    res.send(food);
}));

/**
 *  Post request for password change
        Fetches user, validates body of request, 
        validating confirm PW, new PW and old PW,
        salt, hash (PW) and update DB.
 */
router.post('/password', auth, asyncMiddleware(async(req,res) => {
    const user = await User.findById(req.user._id);

    //Validating body of request
    const validation = validatePassword(req.body);
    if(validation.error) return res.status(400).send(validation.error.details[0].message);

    //Checking if password and confirm password is identical(should add functionallity to chack if old password match new)
    if((req.body.new_password != req.body.confirm_password))return res.status(400).send('Confirm and new password must match');
    
    //Validating that old password that is passed is correct
    const validOldPw = await bcryptCompare(req.body.old_password, user.password);
    if(!validOldPw) return res.status(400).send('Mismatch password');

    //Salt and hash new PW, updating db with hash and salted pw
    const salt = await bcrypt.genSalt(10);
    req.body.new_password = await bcrypt.hash(req.body.new_password, salt);
    const updateUser = await User.findByIdAndUpdate(req.user._id, {
        password: req.body.new_password
    });
    if(!updateUser) return res.status(400).send('Could not find user');

    res.send(updateUser);
}));


module.exports = router;