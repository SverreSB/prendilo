/******************************
 

    Route handler for api/login
    Includes: 
        - Post, to validate passed values to check if it matches with a user.
 

 ******************************/


const asyncMiddleware= require('../../../middleware/async');
const {User, validateLogin} = require('../../../models/objects/users/user');
const {bcryptCompare} = require('../../../models/helpers/comparePw');
const _ = require('lodash');
var bodyParser= require('body-parser');
const express = require('express');
const router = express.Router();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/**
 *  Post request for login into a user
        first validating input using joi, then cheing if user exist.
        If user doesn't exist, then the password is validated.
        If password is valid, then a jwt will be created
 */
router.post('/', asyncMiddleware(async(req, res) => {
    const validateInput = validateLogin(req.body);

    if(validateInput.error) return res.status(400).send(validateInput.error.details[0].message);

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid username or password');
    
    const validPassword = await bcryptCompare(req.body.password, user.password);
    console.log(validPassword);
    if(!validPassword || !user) return res.status(400).send('Invalid username or password');

    const token = user.generateJwt();

    res.json({token});
}));


module.exports = router;