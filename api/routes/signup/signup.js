/******************************
 

    Route handler for api/signup
    Includes: 
        - Post, to create a user and store in database.
 

 ******************************/


const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const {User, validateSignup} = require('../../../models/objects/users/user');


/**
 *  Creates a user a stores it in database. 
        First validates input using validate function
        Then checks if phonenumber is in use
        If not, then a user object is created.
        The password is salted and hashed before being stored in db
 */
router.post('/', async(req, res) => {
    
    var validateInput = validateSignup(req.body);
    
    if(validateInput.error) return res.status(400).send(validateInput.error.details[0].message);
    
    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('User is already registered');
    
    user = new User(_.pick(req.body, ['name', 'phone', 'email', 'password', 'lat', 'long']));
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user.save();
    res.send(_.pick(user, ['_id', 'email']));
});


module.exports = router;