/******************************
 

    Helper file containing functions for comparing hashed and salted
    password with the password that the user wrote in
 

 ******************************/


const bcrypt = require('bcrypt');


async function bcryptCompare(inputPw, hashedPw){
    return await bcrypt.compare(inputPw, hashedPw);
}


exports.bcryptCompare = bcryptCompare;