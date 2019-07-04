/******************************


    File containing the routes for this project.


 ******************************/


const express = require('express');

//Account related API
const signup = require('../api/routes/signup/signup');
const login = require('../api/routes/login/login');
const account = require('../api/routes/account/account');

//Food API
const postFood = require('../api/routes/postFood/postFood');
const findFood = require('../api/routes/findFood/findFood');
const updateFood = require('../api/routes/updateFood/update');
const deleteFood = require('../api/routes/deleteFood/delete');

//Redirect API
const redirectPf = require('../api/routes/postFood/redirectPostFood');
const redirectFf = require('../api/routes/findFood/redirectFindFood');
const redirectAcc = require('../api/routes/account/redirectAccount');

//Feature API
const transaction = require('../api/routes/transaction/transaction');

//Chat API
const message = require('../api/routes/chat/message');
const start = require('../api/routes/chat/start');


module.exports = function(app){
    app.use(express.json());

    //Account related routes
    app.use('/api/signup', signup);
    app.use('/api/login', login);
    app.use('/api/account', account);

    //Food routes
    app.use('/api/postFood', postFood);
    app.use('/api/findFood', findFood);
    app.use('/api/updateFood', updateFood);
    app.use('/api/deleteFood', deleteFood);

    //Redirects
    app.use('/api/postFood/redirect', redirectPf);
    app.use('/api/findFood/redirect', redirectFf);
    app.use('/api/account/redirect', redirectAcc);

    //Feature routes
    app.use('/api/transaction', transaction);

    //Chat routes
    app.use('/api/chat/message', message);
    app.use('/api/chat/start', start);
}