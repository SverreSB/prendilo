/******************************
 

    Helper file containing functions for
    cryptating files that are beeing sent to the database
 

 ******************************/
const bcrypt = require('bcrypt');


 /**
  *   Function for salting password
         Using bcrypt genSalt
  */
 async function salt(){
    const salt = await bcrypt.genSalt(10);

    return salt;
 }

 /**
  *   Function for hashing salted password
         Using bcrypt hash to hash salted password.
  */
 async function hash(password, salt){
   const hashed = await bcrypt.hash(password, salt);

   return hashed;
 }

 exports.salt = salt;
 exports.hash = hash;