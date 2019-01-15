const jwt = require('jsonwebtoken');
const config = require('config');

/**
 *  Function for authorizing a request using jwt. 
 */
module.exports = function (req, res, next) {  
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        
        req.token = bearerToken;
        next()
    }
    else{
        res.status(403).send('Forbidden');
    }
}