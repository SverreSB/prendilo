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
        min: 6,
        max: 64,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 128
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
        email: Joi.string().min(6).max(64).required(),
        password: Joi.string().min(8).max(128).required()
    }

    var validation = Joi.validate(body, schema);

    return validation;

}


/**
 *  Function for validating user login with Joi
 *  @param {*} body, json file
 */
function validateLogin(body){
    const schema = {
        email: Joi.string().min(6).max(64).required(),
        password: Joi.string().min(8).required()
    };

    const validation = Joi.validate(body, schema);

    return validation;

}


exports.User = User;
exports.userSchema = schema;
exports.validateSignup = validateSignup;
exports.validateLogin = validateLogin