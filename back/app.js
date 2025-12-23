const express = require('express');
const cors = require('cors');
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});

// Creating the Multer container for Render
const mediaPath = path.join(__dirname, 'media');
if (!fs.existsSync(mediaPath)) {
  fs.mkdirSync(mediaPath);
}

// Start up express
const app = express();

// Determine allowed origin based on environment
const allowedOrigin = process.env.NODE_ENV === 'production'
  ? 'https://openclassroomsproject7-1.onrender.com' // your production frontend
  : 'http://localhost:3001'; // your local frontend

// Enable CORS
app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}));

// Handle preflight requests for all routes
app.options('*', cors({ origin: allowedOrigin, credentials: true }));

// For parsing JSON bodies
app.use(express.json());

// Serve uploaded media
app.use('/media', express.static(path.join(__dirname, 'media')));

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);

module.exports = app;