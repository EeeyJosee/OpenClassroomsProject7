const multer = require('multer');
const path = require('path');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'audio/mpeg': 'mp3',
    'video/mp4': 'mp4',
    'video/webm': 'webm'
};

// Storage config
const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, 'media');
    },
    filename: (request, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + '_' + Date.now() + '.' + extension);
    }
});

// Export middleware
module.exports = multer({ storage }).single('media');