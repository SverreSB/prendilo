/******************************
 

    Route handler for api/postFood
    Includes: 
        - Post, to store the food the user wants to post in database. 
 

 ******************************/


const {Food, validatePost} = require('../../../models/objects/food/food');
const {User} = require('../../../models/objects/users/user');
const auth = require('../../../middleware/auth');
const asyncMiddleware = require('../../../middleware/async');
const express = require('express');
const multer = require('multer');
const _ = require('lodash');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/**
 *  Setting up how to store files- 
        Adding filters and sets filesize 
        before creating a constant 'upload'
        that uses multer to adds all the above variables 
        to save the file correctly. 
 */

//Sets how to store file. is stored in upload folder with date and filename
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './upload/');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
});


//File filter. Accepts jpg, jpeg, png
const fileFilter = (req, file, cb) => {
    if(file.originalname.match(/\.(jpg|jpeg|png)$/)) cb(null, true);
    else cb(null, false);
}

const fileSize = 1024 * 1024 * 5; //5Mb

//Using multer to set storage info, filesize limit and adding file restrictions
const upload = multer({
    storage,
    limits:{
        fileSize 
    },
    fileFilter
});


/**
 *  Route handler for api/postFood
        Takes the data that is passed in the request
        and creates a food object that is being stored in the database.
        upload.single('foodImage') -> middleware to check format of image 
        include: req.body.foodImage = req.file.path
 */
router.post('/', auth, asyncMiddleware(async(req, res) => {
    
    //const user = await User.findById(req.user._id);
    
    //setting requsted body for necessary food information. 
    req.body.postedBy = req.user._id;
    req.body.geometry = {"type": "Point", "coordinates": [generateLong(), generateLat()]};
    
    const validateInput = validatePost(req.body);
    if(validateInput.error) return res.status(400).send('Invalid input');

    const food = new Food(_.pick(req.body, ['name', 'type', 'postedBy', 'geometry', 'foodImage']));
    food.save( (err, result) => {
        if(err) { res.status(500).send(err.message) }
        else { res.send(_.pick(food, ['_id'])) }
    });
}));

function generateLat() {
    const min = 36.627;
    const max = 36.666;
    return (Math.random() * (max - min) + min).toFixed(3); 
}

function generateLong() {
    const min = -121.751;
    const max = -121.816;
    return (Math.random() * (max - min) + min).toFixed(3); 
}


module.exports = router;