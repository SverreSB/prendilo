const Joi = require('Joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


const {Userdata, validate} = require('../../models/objects/users/userdata');


/**
 * Creates a user a stores it in database. 
 */
router.post('/', async (req, res) => {
    var validateInput = validate(req.body);

    if(validateInput.error) return res.status(400).send(validateInput.error.details[0].message);
    
    const userdata = new Userdata({
        name: req.body.name,
        surname: req.body.surname,
        phone: req.body.phone,
        user: {
            name: req.body.username,
            password: req.body.password
        }
    });

    userdata.save();
    res.send(userdata);
});


module.exports = router;