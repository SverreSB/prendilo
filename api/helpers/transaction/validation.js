const Joi = require('joi');

//Validating body that was passed as request to transaction api
module.exports = function(body){
    const schema = {
        _id: Joi.string().min(24).required()
    }

    validation = Joi.validate(body, schema);

    return validation;
}
