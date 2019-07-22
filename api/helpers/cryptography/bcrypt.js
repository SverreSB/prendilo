/******************************
 

    Helper file containing functions using bcrypt library
 

 ******************************/

const bcrypt = require('bcrypt');

//function for generating salt
function salt() {
    return bcrypt.genSalt(10);
}

//asynchronous function for hashing a secret(password, key, ...)
async function hash(secret, salt) {
    const hash = await bcrypt.hash(secret, salt);
    return hash;    
}

//asynchronous function for comparing input from user with hashed secret from db
async function compare(inputSecret, hashedSecret) {
    const isValid = await bcrypt.compare(inputSecret, hashedSecret);
    return isValid;
}

exports.salt = salt;
exports.hash = hash;
exports.compare = compare;