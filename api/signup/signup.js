const Joi = require('Joi');
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const express = require('express');
const router = express.Router();
const {User, validate} = require('../../models/objects/users/user');


/**
 *  Creates a user a stores it in database. 
        First validates input using validate function
        Then checks if phonenumber is in use
        If not, then we create a user object and save it to the database
 */
router.post('/', async(req, res) => {
    var validateInput = validate(req.body);

    if(validateInput.error) return res.status(400).send(validateInput.error.details[0].message);
    
    let user = await User.findOne({phone: req.body.phone});
    if(user) return res.status(400).send('User is already registered');

    user = new User({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password
    });

    user.save();
    res.send(user);
});


module.exports = router;