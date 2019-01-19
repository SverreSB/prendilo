/******************************
 

    Route handler for api/redirectAccount. 
    Redirects user to /myAccount.
 

 ******************************/


const express = require('express');
const auth = require('../../../middleware/auth');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/**
 *  Fetching user data for given ID if given token is correct for user asked after
 */
router.post('/', auth, async (req, res) => {
    res.redirect('/myAccount');
});

module.exports = router;