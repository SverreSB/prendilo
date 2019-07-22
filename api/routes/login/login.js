/******************************
 

    Route handler for api/login
    Includes: 
        - Post, to validate passed values to check if it matches with a user.
 

 ******************************/

var bodyParser= require('body-parser');
const express = require('express');
const router = express.Router();
const app = express();

const asyncMiddleware= require('../../../middleware/async');
const {User, validateLogin} = require('../../../models/objects/users/user');
const {compare} = require('../../helpers/cryptography/bcrypt');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/**
 *  Post request for login into a user
        first validating input using joi, then cheing if user exist.
        If user doesn't exist, then the password is validated.
        If password is valid, then a jwt will be created
 */
router.post('/', asyncMiddleware(async(req, res) => {
    //Validating body passed in as post request
    const validateInput = validateLogin(req.body);
    if(validateInput.error) return res.status(400).send(validateInput.error.details[0].message);

    //Validating that email is in db and that PW matches email
    const user = await User.findOne({phone: req.body.phone});
    if(!user) return res.status(400).send('Invalid username or password');

    const validPassword = await compare(req.body.password, user.password);
    if(!validPassword || !user) return res.status(400).send('Invalid username or password');

    //Creating a jwt that is sent back as response. 
    const token = user.generateJwt();

    res.json({token});
}));


module.exports = router;