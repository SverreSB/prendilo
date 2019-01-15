const jwt = require('jsonwebtoken');
const config = require('config');

function isLoggedIn(token){
    jwt.verify(req.token, config.get('jwtPrivateKey'), (err, authData) => {
        if(err){
            res.sendStatus(403);
        }
        else{
            res.json({
                message: 'Post the data....',
                authData 
            });
        }
    })
}

exports.isLoggedIn = isLoggedIn;