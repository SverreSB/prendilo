const jwt = require('jsonwebtoken');
const config = require('config');


/**
 *  Function for authorizing a request using jwt. 
 */
module.exports = function (req, res, next) {

    //const token = req.header('x-auth-token');

    const token = req.body.token;
    console.log(token);

    if(!token) return res.status(401).send('Access denied. No token provided');

    try{
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    }catch (exp){
        res.status(400).send('Invalid token');
    }
}