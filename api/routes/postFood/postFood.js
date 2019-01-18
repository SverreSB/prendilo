/******************************
 

    Route handler for api/postFood
    Includes: 
        - Post, to store the food the user wants to post in database. 
 

 ******************************/


const {Food} = require('../../../models/objects/food/food');
const {User} = require('../../../models/objects/users/user');
const auth = require('../../../middleware/auth');
const asyncMiddleware = require('../../../middleware/async');
const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/**
 *  Route handler for api/postFood
        Takes the data that is passed in the request
        and creates a food object that is being stored in the database.     
 */
router.post('/', auth, asyncMiddleware(async(req, res) => {
    //const userId = await User.findById(req.user._id);
    const food = new Food(_.pick(req.body, ['name', 'type']));
    food.save();
    res.send(_.pick(food, ['_id']));
}));


module.exports = router;