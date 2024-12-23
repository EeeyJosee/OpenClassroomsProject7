const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post');

router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getOnePost);
router.post('/:id/read', auth, postCtrl.readPost);
router.post('/', auth, multer, postCtrl.createPost);
router.delete('/:id', auth, postCtrl.deletePost);
// router.put('/:id', auth, multer, postCtrl.modifyPost);

module.exports = router;