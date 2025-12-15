const express = require('express');
const cors = require('cors');
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const path = require('path');

// start up express
const app = express();

// Allow frontend URL to access the backend
app.use(cors({
  origin: 'https://openclassroomsproject7-1.onrender.com',
  credentials: true,
}));

// For parsing JSON bodies
app.use(express.json());

// allows images to be uploaded
app.use('/media', express.static(path.join(__dirname, 'media')));
// user route
app.use('/api/auth', userRoutes);
// post route
app.use('/api/posts', postRoutes);

module.exports = app;