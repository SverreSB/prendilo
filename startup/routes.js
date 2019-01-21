/******************************


    File containing the routes for this project.


 ******************************/


const express = require('express');
const signup = require('../api/routes/signup/signup');
const login = require('../api/routes/login/login');
const postFood = require('../api/routes/postFood/postFood');
const findFood = require('../api/routes/findFood/findFood');
const account = require('../api/routes/account/account');
const redirectPf = require('../api/routes/postFood/redirectPostFood');
const redirectFf = require('../api/routes/findFood/redirectFindFood');
const redirectAcc = require('../api/routes/account/redirectAccount');
const updateFood = require('../api/routes/updateFood/update');


module.exports = function(app){
    app.use(express.json());
    app.use('/api/signup', signup);
    app.use('/api/login', login);
    app.use('/api/postFood', postFood);
    app.use('/api/findFood', findFood);
    app.use('/api/updateFood', updateFood);
    app.use('/api/account', account);
    app.use('/api/postFood/redirect', redirectPf);
    app.use('/api/findFood/redirect', redirectFf);
    app.use('/api/account/redirect', redirectAcc);

}