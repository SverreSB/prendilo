const jwt = require('jsonwebtoken');
const config = require('config');

function isLoggedIn(token){
    const authorization = jwt.verify(token, config.get('jwtPrivateKey'), (err) => {
        if(err){
            return false;
        }
        else{
            return true;
        }
    });
    return authorization;
}

exports.isLoggedIn = isLoggedIn;