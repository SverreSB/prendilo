const auth = require('../../middleware/auth');
//const {isLoggedIn} = require('../../models/helpers/verifyToken');
const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/**
 *  Fetching user data for given ID if given token is correct for user asked after
 */
router.post('/', auth, async (req, res) => {
    jwt.verify(req.token, config.get('jwtPrivateKey'), (err, authData) => {
        if(err){
            res.sendStatus(403);
        }
        else{
            res.redirect('/postfood');
        }
    });
});

module.exports = router;