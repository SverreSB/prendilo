/******************************
 

    Helper file containing functions for
    cryptating files that are beeing sent to the database
 

 ******************************/
const bcrypt = require('bcrypt');


 /**
  * Salt
  */
 async function salt(){
    const salt = await bcrypt.genSalt(10);

    return salt;
 }

 async function hash(password, salt){
   const hashed = await bcrypt.hash(password, salt);

   return hashed;
 }

 exports.salt = salt;
 exports.hash = hash;