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
    location: {
        type: Array,
        validate: [arrayLimit, '{PATH} must contain 2 items(latitude and longitude)']
    }
    /*,
    foodImage: {
        type: String,
        required: true
    }*/
});

function arrayLimit(val){ 
    return val.length == 2;
}
const Food = mongoose.model('Food', schema);


function validatePost(body) {
    const schema = {
        name: Joi.string().min(2).max(32).required(),
        type: Joi.string().min(2).max(12).required(),
        name: Joi.string().min(2).max(32).required(),
        type: Joi.string().min(2).max(12).required(),
        postedBy: Joi.string().required(),
        location: Joi.array().required()
    }

    const validation = Joi.validate(body, schema);

    return validation;
}

function validateUpdate(body) {
    const schema = {
        name: Joi.string().min(2).max(32).required(),
        type: Joi.string().min(2).max(12).required()
    }

    const validation = Joi.validate(body, schema);

    return validation;
}

exports.Food = Food;
exports.foodSchema = schema;
exports.validateUpdate = validateUpdate;
exports.validatePost = validatePost