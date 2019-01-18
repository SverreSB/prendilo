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

    const user = await User.findById(req.user);
	
	food.forEach(food => {
		const distance = getDistanceFromLatLonInKm(user.lat, user.long, food.lat, food.long);
		console.log(distance);
	});


    res.status(200).json(food);
});


function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    console.log(`${lat1}, ${lat2}`);
	var R = 6371; // Radius of the earth in km
	
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
	var dLon = deg2rad(lon2-lon1); 
	
    var a = 
      	Math.sin(dLat/2) * Math.sin(dLat/2) +
      	Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
		  Math.sin(dLon/2) * Math.sin(dLon/2); 

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c; // Distance in km
	
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }


module.exports = router;