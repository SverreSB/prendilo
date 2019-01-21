/******************************
 

    Route handler for api/postFood
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


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './upload/');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
});


const fileFilter = (req, file, cb) => {
    if(file.originalname.match(/\.(jpg|jpeg|png)$/)) cb(null, true);
    else cb(null, false);
}

const fileSize = 1024 * 1024 * 5; //5Mb

const upload = multer({
    storage,
    limits:{
        fileSize 
    },
    fileFilter
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/**
 *  Route handler for api/postFood
        Takes the data that is passed in the request
        and creates a food object that is being stored in the database.     
 */
router.post('/', auth, upload.single('foodImage'), asyncMiddleware(async(req, res) => {
    
    const user = await User.findById(req.user._id);
    
    req.body.postedBy = req.user._id;
    req.body.lat = user.lat;
    req.body.long = user.long;
    req.body.foodImage = req.file.path
    
    
    const food = new Food(_.pick(req.body, ['name', 'type', 'postedBy', 'lat', 'long', 'foodImage']));
    food.save();
    res.send(_.pick(food, ['_id']));
}));


module.exports = router;