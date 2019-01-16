const {Food} = require('../../models/objects/food/food');
const express = require('express');
const _ = require('lodash');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get('/', async(req, res) => {
    const food = await Food.find().select('-_id').select('-__v');
    console.log(food);
    res.send(food);
});


module.exports = router;