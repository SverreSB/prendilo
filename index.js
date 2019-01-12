const mongoose = require('mongoose');
const express = require('express');
app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/giveaway", { useNewUrlParser: true })
    .then( () => console.log('Connected to givaway database'))
    .catch(err => console.log('Could not connect to database', err));

app.get('/', (req, res) => {
    res.send('Nothing going on here, just landing page for index.js');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));