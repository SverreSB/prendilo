/******************************
 

    Route handler for api/updateFood
    Includes: 
        - Post, to store the food the user wants to post in database. 
 

 ******************************/


const {Food, validateUpdate} = require('../../../models/objects/food/food');
const auth = require('../../../middleware/auth');
const asyncMiddleware = require('../../../middleware/async');
const express = require('express');
const multer = require('multer');
const router = express.Router();


router.post('/:id', asyncMiddleware(async(req, res) => {
    //Validating input
    const validation = validateUpdate(req.body);
    if(validation.error) return res.status(400).send(validation.error.details[0].message);

    //updating food by id given in request
    const food = await Food.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        type: req.body.type
        },{
            new: true
        });

    //Handling food not found
    if(!food) return res.status(400).send(`Food with ID '${req.params.id}' was not found`);
    
    res.send(food);
}));


module.exports = router;