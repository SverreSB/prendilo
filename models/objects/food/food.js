/******************************


    File containing the food object.

        
 ******************************/


const mongoose = require('mongoose');
const Joi = require('joi');

const GeoSchema = new mongoose.Schema({
    type: {
        type: String,
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        index: "2dsphere",
        validate: [arrayLimit, '{PATH} must contain 2 items(latitude and longitude)']
    }
})

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
    geometry: {
        type: GeoSchema,
        required: true
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
        geometry: Joi.object().required()
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