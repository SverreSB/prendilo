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
const asyncMiddleware = require('../../../middleware/async');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/**
 *  Route handler for get request.
    	Finds food within 5km of user requesting food
 */
router.get('/', auth, asyncMiddleware(async(req, res) => {
    const user = await User.findById(req.user._id);
    if((user.foodStamp + user.earnedStamps) < 1) return res.status(400).send('Can\'t find food without foodstamps');
    Food.aggregate([{
        $geoNear: {
			near: {
				type: "Point",
				coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
			},
			spherical: true,
			maxDistance: 5000,
			distanceField: 'distance'
        }
    }])
    .then(foods => res.json(foods))
    .catch(err => console.log(err))
   
}));

module.exports = router;