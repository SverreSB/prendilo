/******************************
 

    Route handler for api/findFood
    Includes: 
        - Post, to validate passed values to check if it matches with a user.
 

 ******************************/

const auth = require('../../../middleware/auth');
const {Food} = require('../../../models/objects/food/food');
const {User} = require('../../../models/objects/users/user');
const express = require('express');
const _ = require('lodash');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/**
 *  Route handler for get request.
        Finds all foods and post all attributes that is not id og version key.
 *  This api is not good enough, I should be able to find food in db that
        are max 7km away from user(5-7 km will be invisable on front end, but have it ready if movement)
        I do not know how to pass in the parameters for distance and find the food in db yet. 
 */
router.get('/', auth, async(req, res) => {

    const food = await Food.find().select('-_id').select('-__v');

    res.status(200).json(food);
});


module.exports = router;