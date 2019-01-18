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
 */
router.get('/', auth, async(req, res) => {
    const food = await Food.find().select('-_id').select('-__v');

    const user = await User.findById(req.user)
                        .select('-_id')
                        .select('-name')
                        .select('-email')
                        .select('-phone')
                        .select('-password')
                        .select('-__v');
	
	/*food.forEach(food => {
		const distance = getDistanceFromLatLonInKm(user.lat, user.long, food.lat, food.long);
		console.log(distance);
    });*/
    const data = [food, user];

    res.status(200).json(data);
});


module.exports = router;