const mongoose = require('mongoose');
const Joi = require('joi');


const schema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 4,
        maxlength: 16,
        required: true
    },
    phone: {
        type: Number,
        min: 1111,
        max: 999999999999,
        required: true,
        unique: true

    },
    email: {
        type: String,
        min: 6,
        max: 255,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 8
    }
});



const User = mongoose.model('User', schema);


/**
 * Function for validating that data given by user matches a given schema
 * @param {*} body, json file
 */
function validate(body){
    const schema = {
        name: Joi.string().min(2).max(16).required(),
        phone: Joi.number().min(1111).max(99999999999).required(),
        email: Joi.string().required(),
        password: Joi.string().min(8).required()
    }

    var validation = Joi.validate(body, schema);

    return validation;

}


exports.User = User;
exports.userSchema = schema;
exports.validate = validate;