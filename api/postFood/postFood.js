const {Food} = require('../../models/objects/food/food');
const auth = require('../../middleware/auth');
const asyncMiddleware = require('../../middleware/async');
const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


router.post('/', auth, asyncMiddleware(async(req, res) => {
    const food = new Food(_.pick(req.body, ['name', 'type']));
    food.save();
    res.send(_.pick(food, ['_id']));
}));



/**
 *  Fetching user data for given ID if given token is correct for user asked after
 */
/*router.post('/', async (req, res) => {
    jwt.verify(req.token, config.get('jwtPrivateKey'), (err, authData) => {
        if(err){
            res.sendStatus(403);
        }
        else{
            res.json({
                message: 'Post the data....',
                authData 
            });
        }
    });
    //res.send(_.pick(['email', '_id']));
});*/

module.exports = router;