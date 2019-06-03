/******************************
 

    Middleware function to validate email address
 

 ******************************/


module.exports = function(req, res, next) {

    const email = req.body.email;
    try {
        if(!validateEmail(email)) return res.status(400).send('Invalid email');
        next();
    }catch(err) { res.status(400).send('Invalid email') }
}

//Function from https://stackoverflow.com/a/46181
function validateEmail(email) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

