/******************************


    File containing the food object.

        
 ******************************/


const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 32,
        required: true,
    },
    type: {
        type: String,
        min: 2,
        max: 12,
        require: true
    },
    postedBy: {
        type: String
    }, 
    postedBy: {
        type: String,
        require: true
    },
    lat: {
        type: Number,
        required: true
    },
    long: {
        type: Number,
        required: true
    }
});


const Food = mongoose.model('Food', schema);


exports.Food = Food;
exports.foodSchema = schema;