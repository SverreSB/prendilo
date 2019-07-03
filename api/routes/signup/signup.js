/******************************
 

    Route handler for api/signup
    Includes: 
        - Post, to create a user and store in database.
 

 ******************************/

const asyncMiddleware= require('../../../middleware/async');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const {User, validateSignup} = require('../../../models/objects/users/user');
const phoneValidation = require('../../helpers/signup/phoneValidation');
const auth = require('../../../middleware/auth');



/**
 *  Creates a user a stores it in database. 
        First validates input using validate function
        Then checks if phonenumber is in use
        If not, then a user object is created.
        The password is salted and hashed before being stored in db
 */
router.post('/', asyncMiddleware( async(req, res) => {
    var validateInput = validateSignup(req.body);
    if(validateInput.error) return res.status(400).send(validateInput.error.details[0].message);
    
    let user = await User.findOne({phone: req.body.phone});
    if(user) return res.status(400).send('User is already registered');
 
    //Adding fields to body before creating user. 
    req.body.foodStamp = 5;
    req.body.earnedStamps = 0;
    req.body.validated = false;
    req.body.location = [generateLong(), generateLat()];

    user = new User(_.pick(req.body, ['name', 'phone', 'email', 'password', 'location', 'foodStamp', 'earnedStamps', 'validated']));
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    
    user.validated = phoneValidation(user.phone);
    user.save(function(err, result) {
         if(err) { res.status(500).send(err.message) }
         else { res.status(200).send('Sucsesfull signup') }
    });
}));

/**
 *  Validates phonenumber
        Finds user from _id returned by auth middleware
        If found compares users validation with passed in validation code
        Updates 'validated' field to 1
 */
router.post('/validate_phone', auth, asyncMiddleware( async(req, res) => {
    const user = await User.findById(req.user._id);
    if(!user) return res.status(400).send('User not found');

    if(user.validated != req.body.validation_code) return res.status(400).send('Invalid validation code');

    User.updateOne({_id: req.user._id}, {$set: {validated: 1}}, function(err, result) {
        if(err) { return res.status(400).send('Db not updated') }
    });
    
    res.status(200).send('Phonenumber validated');
}));


module.exports = router;

function generateLat() {
    const min = 36.5900000;
    const max = 36.6000000;
    return (Math.random() * (max - min) + min).toFixed(7); 
}

function generateLong() {
    const min = -121.8000000;
    const max = -121.8100000;
    return (Math.random() * (max - min) + min).toFixed(7); 
}

