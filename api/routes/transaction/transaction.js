const {User} = require('../../../models/objects/users/user');
const{Food} = require('../../../models/objects/food/food');
const auth = require('../../../middleware/auth');
const asyncMiddleware = require('../../../middleware/async');
const express = require('express');
const router = express.Router();

router.post('/', auth, async (req,res) => {
    const receiver = await User.findById(req.user);
    const food = await Food.findById(req.body._id);

    const giver = await User.findById(food.postedBy);

    console.log(`rec: ${receiver}`);
    console.log(`food: ${food}`);
    console.log(`giver: ${giver}`);
    res.send(giver);

});

module.exports = router;