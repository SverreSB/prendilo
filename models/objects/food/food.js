/******************************


    File containing the food object.

        
 ******************************/


const mongoose = require('mongoose');
const Joi = require('joi');

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
    },
    foodImage: {
        type: String,
        required: true
    }
});


const Food = mongoose.model('Food', schema);


function validate(body) {
    const schema = {
        name: Joi.string().min(2).max(32).required(),
        type: Joi.string().min(2).max(12).required()
    }

    const validation = Joi.validate(body, schema);

    return validation;
}

exports.Food = Food;
exports.foodSchema = schema;
exports.validateUpdate = validate;