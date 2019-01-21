/******************************
 

    Route handler for api/updateFood
    Includes: 
        - Post, to store the food the user wants to post in database. 
 

 ******************************/


const {Food} = require('../../../models/objects/food/food');
const {User} = require('../../../models/objects/users/user');
const auth = require('../../../middleware/auth');
const asyncMiddleware = require('../../../middleware/async');
const express = require('express');
const multer = require('multer');
const _ = require('lodash');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();


/**
 * 	Delete request, deleting genre by id
	   	Checks if given ID exists, if not then an error will appear.
	   	If ID exists the the genre is deleted.
 */
router.delete('/:id', async (req, res) => {
    const food = await Food.findById(req.params.id);
    if(!food) return res.status(404).send("Error, food does not exist");
	
	res.send(food);
	food.delete();
});


module.exports = router;