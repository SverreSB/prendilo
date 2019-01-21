const config = require('config');
const express = require('express');


app = express();
require('./startup/routes')(app);
require('./startup/db')();



/**
 *  Throws error if jwtPrivateKey is not defined.
 */
if(!config.get('jwtPrivateKey')){
    console.error('ERROR: JSON Web Token not defined');
    process.exit(1);
}


app.use(function(err, req, res, next){
    res.status(500).send('Something went wrong');
});
app.use(express.static(__dirname + '/public'));
app.use('/upload', express.static('upload'));


app.get('/', (req, res) => {
    res.sendFile('./html/index.html', {root: __dirname});
});


app.get('/postfood', (req, res) => {
    res.sendFile('./html/postFood.html', { root: __dirname});
});


app.get('/findfood', (req, res) => {
    res.sendFile('./html/findFood.html', { root: __dirname});
});

app.get('/myAccount', (req, res) => {
    res.sendFile('./html/myAccount.html', { root: __dirname});
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));