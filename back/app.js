const express = require('express');
const dotenv = require('dotenv').config();
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const path = require('path');

// grab DB details from .env file
dotenv;

// start up express
const app = express();

// create API routes
app.use(express.json());

app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// allows images to be uploaded
app.use('/media', express.static(path.join(__dirname, 'media')));
// login and signup
app.use('/api/auth', userRoutes);
// post route
app.use('/api/posts', postRoutes);

module.exports = app;