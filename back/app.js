const express = require('express');
const cors = require('cors');
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const path = require('path');
const fs = require('fs');

// Creating the Multer container for Render
const mediaPath = path.join(__dirname, 'media');
if (!fs.existsSync(mediaPath)) {
  fs.mkdirSync(mediaPath);
}

// Start up express
const app = express();

// Allow frontend URL to access the backend
app.use(cors({
  origin: 'https://openclassroomsproject7-1.onrender.com',
  credentials: true,
}));

// For parsing JSON bodies
app.use(express.json());

// Allows images to be uploaded
app.use('/media', express.static(path.join(__dirname, 'media')));
// User route
app.use('/api/auth', userRoutes);
// Post route
app.use('/api/posts', postRoutes);

module.exports = app;