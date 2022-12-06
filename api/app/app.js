const express = require('express');
const routes = require('../routes/routes');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, GET, DELETE');
    }
    next();
});

app.get('/', (req, res, next) => {
    res.status(201).json({
        message: 'Service is up and running!',
        method: req.method,
    });
});

app.use('/users', routes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message,
            status: error.status,
        }
    });
});

mongoose.connect(process.env.mongodURL, (err) => {
    if (err) {
        console.error('Error:', err.message);
    } else {
        console.log('MogoDB server connection established');
    }
});

module.exports = app;