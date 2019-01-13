const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const {User, validateLogin} = require('../../models/objects/users/user');


/**
 *  Post request for login into a user
        first validating input using joi, then cheing if user exist.
        If user doesn't exist, then the password is validated.
        If password is valid, then a jwt will be created
 */
router.post('/', async(req, res) => {
    const validateInput = validateLogin(req.body);

    if(validateInput.error) return res.status(400).send(validateInput.error.details[0].message);

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid username or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if(!validPassword || !user) return res.status(400).send('Invalid username or password');

    const token = user.generateJwt();
    res
        .header('x-auth-token', token)
        .send(_.pick(user, ['_id', 'email']));
});


module.exports = router;