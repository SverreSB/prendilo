const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 4,
        maxlength: 16,
        required: true
    },
    password: {
        type: String,
        minlength: 8
    }
});


const User = mongoose.model('User', schema);


exports.User = User;
exports.userSchema = schema;