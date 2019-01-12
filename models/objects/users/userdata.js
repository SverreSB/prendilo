const {userSchema} = require('./user');
const mongoose = require('mongoose');
const Joi = require('Joi');


const schema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 16,
        required: true
    },
    surname: {
        type: String,
        minlength: 2,
        maxlength: 16,
        required: true
    },
    
    phone: {
        type: Number,
        min: 1111,
        max: 999999999999,
        required: true

    },
    user: {
        type: userSchema,
        required: true
    }

});


const Userdata = mongoose.model('Userdata', schema);


/**
 * Function for validating that data given by user matches a given schema
 * @param {*} body, json file
 */
function validate(body){
    const schema = {
        name: Joi.string().min(2).max(16).required(),
        surname: Joi.string().min(2).max(16).required(),
        phone: Joi.number().min(1111).max(99999999999).required(),
        username: Joi.string().min(2).max(16).required(), 
        password: Joi.string().min(8).required()
    }

    var validation = Joi.validate(body, schema);

    return validation;

}


exports.Userdata = Userdata;
exports.validate = validate;
