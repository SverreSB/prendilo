const jwt = require('jsonwebtoken');
const config = require('config');


/**
 *  Function for authorizing a request using jwt. 
 */
module.exports = function (req, res, next) {

    //const token = req.header('x-auth-token');

    //const token = req.body.token;

    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        
        req.token = bearerToken;
        next()
    }
    else{
        res.status(403).send('Forbidden');
    }
    /*if(!token) return res.status(401).send('Access denied. No token provided');

    try{
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    }catch (exp){
        res.status(400).send('Invalid token');
    }*/
}