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
        Finds all foods and post all attributes that is not id og version key.
 *  This api is not good enough, I should be able to find food in db that
        are max 7km away from user(5-7 km will be invisable on front end, but have it ready if movement)
        I do not know how to pass in the parameters for distance and find the food in db yet. 
 */
router.get('/', auth, asyncMiddleware(async(req, res) => {
    
    const user = await User.findById(req.user._id);
    //const query = "{$where: function() {return 5 > "+getDistance(user.lat, user.long, this.lat, this.long)+"}}"
    //const food = await Food.find().select('-_id').select('-__v');
    const food = await Food.find({$where: function(user){
        return getDistance(user.lat, user.long, this.lat, this.long) < 5;
    }});
    
    res.status(200).json(food);
}));

global.getDistance = function(lat1,lon1,lat2,lon2) {
	const R = 6371; //Radius of earth in km
	
    const dLat = deg2rad(lat2-lat1);  
	const dLon = deg2rad(lon2-lon1); 
	
    const a = 
      	Math.sin(dLat/2) * Math.sin(dLat/2) +
      	Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
		Math.sin(dLon/2) * Math.sin(dLon/2); 

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    d = Math.ceil(d);
    return d;
}


/**
 *  Helper function for getDistance
        Calculates the radian from degrees given.
 *  @param {number} deg 
 */
function deg2rad(deg) {
    return deg * (Math.PI/180)
}

module.exports = router;