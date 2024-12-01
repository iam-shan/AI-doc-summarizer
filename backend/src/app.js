const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();

require('dotenv').config();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/users', userRoutes);

module.exports = app;