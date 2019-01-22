/******************************
 

    Route handler for api/updateFood
    Includes: 
        - Post, to store the food the user wants to post in database. 
 

 ******************************/


const {Food, validateUpdate} = require('../../../models/objects/food/food');
const {User} = require('../../../models/objects/users/user');
const auth = require('../../../middleware/auth');
const asyncMiddleware = require('../../../middleware/async');
const express = require('express');
const multer = require('multer');
const _ = require('lodash');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();


router.post('/:id', asyncMiddleware(async(req, res) => {
    const validation = validateUpdate(req.body);
    if(validation.error) return res.status(400).send(validation.error.details[0].message);

    const food = await Food.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        type: req.body.type
        },{
            new: true
        });

    if(!food) return res.status(400).send(`Fodd with ID '${req.params.id}' was not found`);
    
    res.send(food);
}));


/**
 * 	Delete request, deleting food by id
	   	Checks if given ID exists, if not then an error will appear.
	   	If ID exists the the food is deleted.
 */
router.delete('/delete/:id', asyncMiddleware( async (req, res) => {
    const food = await Food.findById(req.params.id);
    if(!food) return res.status(404).send("Error, food does not exist");
	
	res.send(food);
	food.delete();
}));


module.exports = router;