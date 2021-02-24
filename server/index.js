const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const keys = require('../config/keys');
require('./models/Scene');
require('./models/Furniture');
require('./models/Client');
require('./models/Log');

const app = express();
const PORT = process.env.PORT || 4040;

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true // pass default values
}));

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../client/public')));

// Connect to MongoDB
mongoose.connect(keys.mongoURI, {useNewUrlParser: true, dbName:"virtision"});

// Answer API requests.
app.use(require('./routes'));

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../client/public', 'index.html'));
});

app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
});
