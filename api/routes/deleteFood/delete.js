/******************************
 

    Route handler for api/updateFood
    Includes: 
        - Delete, to delete the food object from database. 
 

 ******************************/

const {Food} = require('../../../models/objects/food/food');
const auth = require('../../../middleware/auth');
const asyncMiddleware = require('../../../middleware/async');
const express = require('express');
const router = express.Router();

/**
 * 	Delete request, deleting food by id
	   	Checks if given ID exists, if not then an error will appear.
	   	If ID exists the the food is deleted.
 */
router.delete('/:id', auth, asyncMiddleware( async (req, res) => {
    const food = await Food.findById(req.params.id);
    if(!food) return res.status(404).send("Error, food does not exist");
	if(food.postedBy != req.user) return res.status(400).send("Force log out");
	res.send(food);
	food.delete();
}));

module.exports = router;