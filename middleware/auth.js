/******************************
 

    Middleware function to authorize user based on jw-token
 

 ******************************/


const jwt = require('jsonwebtoken');
const config = require('config');


/**
 *  Function for authorizing a request using jwt. 
        Checks if bearer header exists. If not, then and 403 status is sent.
        If it exists, then the function splits the bearerHeader and stores 
        the token in a constant. Then a try catch to verify the token.
 */
module.exports = function (req, res, next) {  
    const bearerHeader = req.headers['authorization'];
    if(bearerHeader){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        
        try{
            const decoded = jwt.verify(bearerToken, config.get('jwtPrivateKey'));
            req.token = bearerToken;
            req.user = decoded;
            next()
        }catch(err) { res.status(403).send('Forbidden') } 
    }
    else{
        res.status(403).send('Forbidden');
    }
}