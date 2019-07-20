/******************************
 

    Helper file containing functions for comparing hashed and salted
    password with the password that the user wrote in
 

 ******************************/


const bcrypt = require('bcrypt');


async function bcryptCompare(inputKey, hashedKey){
    const isValid = await bcrypt.compare(inputKey, hashedKey);
    return isValid;
}


exports.bcryptCompare = bcryptCompare;