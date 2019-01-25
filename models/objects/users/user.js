/******************************


    File containing the user object.
    Containing functions for:
        - Validating that the values passed in to create a user is correct
        - Validating that login values meets a certain criteria. 


 ******************************/


const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');


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
        min: 4,
        max: 64,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 4,
        maxlength: 128
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


/**
 *  Function for generating Jwt
        Making a function so I can get a user object and 
        use this function as 'user.generateJwt()'
 */
schema.methods.generateJwt = function(){
    const token = jwt.sign({_id: this._id}, config.get('jwtPrivateKey'));
    return token;
}


const User = mongoose.model('User', schema);


/**
 * Function for validating that data given by user matches a given schema
 * @param {*} body, json file
 */
function validateSignup(body){
    const schema = {
        name: Joi.string().min(2).max(16).required(),
        phone: Joi.number().min(1111).max(99999999999).required(),
        email: Joi.string().min(4).max(64).required(),
        password: Joi.string().min(4).max(128).required(),
        lat: Joi.number().required(),
        long: Joi.number().required(),
    }

    const validation = Joi.validate(body, schema);

    return validation;

}

function validatePassword(body){
    const schema = {
        old_password: Joi.string().min(4).max(128).required(),
        new_password: Joi.string().min(4).max(128).required(),
        confirm_password: Joi.string().min(4).max(128).required()
    }

    const validation = Joi.validate(body, schema);

    return validation;
}


/**
 *  Function for validating user login with Joi
 *  @param {*} body, json file
 */
function validateLogin(body){
    const schema = {
        email: Joi.string().min(4).max(64).required(),
        password: Joi.string().min(4).required()
    };

    const validation = Joi.validate(body, schema);

    return validation;

}


exports.User = User;
exports.userSchema = schema;
exports.validateSignup = validateSignup;
exports.validateLogin = validateLogin;
exports.validatePassword = validatePassword;