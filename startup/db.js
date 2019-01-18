/******************************


    File containing the connection with the database.


 ******************************/


const mongoose = require('mongoose');


module.exports = function() {
    //Connects to mongodb
    mongoose.connect("mongodb://localhost:27017/prendilo", { useNewUrlParser: true })
        .then( () => console.log('Connected to givaway database'))
        .catch(err => console.log('Could not connect to database', err));
    
    //Adding this to not get DeprecationWarning: collection.ensureIndex is deprecated. 
    mongoose.set('useCreateIndex', true);
}