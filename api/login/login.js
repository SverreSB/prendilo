const Joi = require('joi');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const {User} = require('../../models/objects/users/user');


router.post('/', async(req, res) => {
    const validateInput = validate(req.body);

    if(validateInput.error) return res.status(400).send(validateInput.error.details[0].message);

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid username or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if(!validPassword) return res.status(400).send('Invalid username or password');

    res.send('Login successful');

});


function validate(body){
    const schema = {
        email: Joi.string().min(6).max(64).required(),
        password: Joi.string().min(8).required()
    };

    const validation = Joi.validate(body, schema);

    return validation;

}


module.exports = router;