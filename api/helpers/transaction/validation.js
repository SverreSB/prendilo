const Joi = require('joi');

module.exports = function(body){
    const schema = {
        _id: Joi.string().min(24).required()
    }

    validation = Joi.validate(body, schema);

    return validation;
}
