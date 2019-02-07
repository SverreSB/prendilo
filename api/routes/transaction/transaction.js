/******************************
 

    Route handler for api/transaction
    Includes: 
        - Post, to make a transaction between giver and receiver
        - func enoughStamps, to check if giver has sufficient fund. 
 

 ******************************/


const {User} = require('../../../models/objects/users/user');
const{Food} = require('../../../models/objects/food/food');
const auth = require('../../../middleware/auth');
const asyncMiddleware = require('../../../middleware/async');
const validation = require('../../helpers/transaction/validation');
const express = require('express');
const router = express.Router();


/**
 *  Route handler for api/transaction
 *  Information passed in:
        (receiver)req.user = user._id, is received from auth middleware function
        (food)req.body._id, id of food that receiver wants to pick up. 
 */
router.post('/', auth, asyncMiddleware (async (req,res) => {
    //validate body of request
    const validate = validation(req.body);
    if(validate.error) return res.status(400).send(validate.error.details[0].message);

    const receiver = await User.findById(req.user);
    const food = await Food.findById(req.body._id);

    //validate food, receiver and that receiver has sufficient funds.
    if(!receiver) return res.status(400).send('Receiver not found');
    if(!food) return res.status(400).send("Food object not found");
    if(!enoughStamps(receiver)) return res.status(400).send('Insufficient funds');
    
    //Transaction is made, receiver earns 0.5 tokens, receiver loses a stamp
    const giver = await User.findByIdAndUpdate(food.postedBy, {
        $inc: {earnedStamps: 0.5} 
    });
    if(!giver) return res.status(400).send("Giver not found");
    if(!receiver.foodStamp){
        receiver.earnedStamps -= 1; 
    }else{
        receiver.foodStamp -= 1;
    }
    
    //Updating db, delete food and saving changes to receiver. Send http respons.
    receiver.save();
    food.delete();
    res.send(receiver);//maybe send a req for api/update/delete?
    /*.redirect(`/api/update/delete/${food._id}`)*/ 
}));


/**
 *  Boolean function that checks if user has foodStamps or not 
 *  @param {User} user 
 */
function enoughStamps(user){
    if(user.foodStamp || user.earnedStamps >= 1){
        return true;
    }
    return false;
}

module.exports = router;