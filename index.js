const mongoose = require('mongoose');
const config = require('config');
const express = require('express');
const signup = require('./api/signup/signup');
const login = require('./api/login/login');
const postFood = require('./api/postFood/postFood');
const findFood = require('./api/findFood/findFood');
const account = require('./api/account/account');
const redirectPF = require('./api/postFood/redirectPostFood');
const redirectFF = require('./api/findFood/redirectFindFood');

//Adding this to not get DeprecationWarning: collection.ensureIndex is deprecated. 
mongoose.set('useCreateIndex', true);
app = express();


/**
 *  Throws error if jwtPrivateKey is not defined.
 */
if(!config.get('jwtPrivateKey')){
    console.error('ERROR: JSON Web Token not defined');
    process.exit(1);
}


/**
 *  Throws error if not connected to mongoDB
 */
mongoose.connect("mongodb://localhost:27017/giveaway", { useNewUrlParser: true })
    .then( () => console.log('Connected to givaway database'))
    .catch(err => console.log('Could not connect to database', err));


app.use(express.json());
app.use('/api/signup', signup);
app.use('/api/login', login);
app.use('/api/postFood', postFood);
app.use('/api/findFood', findFood);
app.use('/api/account', account);
app.use('/api/postFood/redirect', redirectPF);
app.use('/api/findFood/redirect', redirectFF);
app.use(function(err, req, res, next){
    res.status(500).send('Something went wrong');
});
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.sendFile('./html/index.html', {root: __dirname});
});


app.get('/postfood', (req, res) => {
    res.sendFile('./html/postFood.html', { root: __dirname});
});


app.get('/findfood', (req, res) => {
    res.sendFile('./html/findFood.html', { root: __dirname});
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));