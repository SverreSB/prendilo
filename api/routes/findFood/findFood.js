/******************************
 

    Route handler for api/findFood
    Includes: 
        - Post, to validate passed values to check if it matches with a user.
 

 ******************************/


const {Food} = require('../../../models/objects/food/food');
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
 */
router.get('/', async(req, res) => {
    const food = await Food.find().select('-_id').select('-__v');
    res.status(200).json(food);
});


module.exports = router;