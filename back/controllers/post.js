const { Post } = require('../models');
const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

// display all posts
exports.getAllPosts = (request, response) => {
    Post.findAll({ order: [['createdAt', 'DESC']] })
        .then(posts => response.status(200).json(posts))
        .catch(() =>
            response.status(400).json({ error: 'Posts were not found!' })
        );
};

exports.getOnePost = (request, response) => {
    Post.findOne({ where: { id: request.params.id } })
        .then(post => response.status(200).json(post))
        .catch(() =>
            response.status(400).json({ error: 'Post was not found!' })
        );
};

// create a new post with or without media
exports.createPost = async (req, res) => {
    try {
        if (req.body.post) {
            req.body = JSON.parse(req.body.post);
        }

        let media = null;

        if (req.file) {
            const url = `${req.protocol}://${req.get('host')}`;
            let finalFilename = req.file.filename;

            if (
                req.file.mimetype === 'image/heic' ||
                req.file.mimetype === 'image/heif'
            ) {
                const convertedName = req.file.filename.replace(/\.\w+$/, '.jpg');
                const convertedPath = path.join('media', convertedName);

                await sharp(req.file.path)
                    .jpeg({ quality: 80 })
                    .toFile(convertedPath);

                fs.unlinkSync(req.file.path);
                finalFilename = convertedName;
            }

            media = `${url}/media/${finalFilename}`;
        }

        await Post.create({
            title: req.body.title,
            message: req.body.message,
            media,
            read: [],
            UserId: req.auth.userId
        });

        res.status(201).json({ message: 'New post created!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Post was not created!' });
    }
};

// modify contents of existing post
exports.modifyPost = async (req, res) => {
    try {
        const post = await Post.findOne({ where: { id: req.params.id } });

        if (!post) {
            return res.status(404).json({ error: 'Post not found!' });
        }

        if (post.UserId !== req.auth.userId) {
            return res.status(401).json({ error: 'Request not authorized!' });
        }

        // Parse JSON body if multipart
        if (req.body.post) {
            req.body = JSON.parse(req.body.post);
        }

        const updates = {
            title: req.body.title ?? post.title,
            message: req.body.message ?? post.message
        };

        // Handle new media upload
        if (req.file) {
            // delete old media if exists
            if (post.media) {
                const oldFilename = post.media.split('/media/')[1];
                fs.unlink(`media/${oldFilename}`, () => {});
            }

            const url = `${req.protocol}://${req.get('host')}`;
            let finalFilename = req.file.filename;

            // Convert HEIC/HEIF to JPEG
            if (
                req.file.mimetype === 'image/heic' ||
                req.file.mimetype === 'image/heif'
            ) {
                const convertedName = req.file.filename.replace(/\.\w+$/, '.jpg');
                const convertedPath = path.join('media', convertedName);

                await sharp(req.file.path)
                    .jpeg({ quality: 80 })
                    .toFile(convertedPath);

                fs.unlinkSync(req.file.path);
                finalFilename = convertedName;
            }

            updates.media = `${url}/media/${finalFilename}`;
        }

        await post.update(updates);

        res.status(200).json({ message: 'Post updated!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Post was not updated!' });
    }
};

// delete an existing post
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findOne({ where: { id: req.params.id } });

        if (!post) {
            return res.status(404).json({ error: 'Post not found!' });
        }

        if (post.UserId !== req.auth.userId) {
            return res.status(401).json({ error: 'Request not authorized!' });
        }

        if (post.media) {
            const filename = post.media.split('/media/')[1];
            fs.unlink(`media/${filename}`, () => {});
        }

        await post.destroy();
        res.status(200).json({ message: 'Post deleted!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Post could not be deleted!' });
    }
};

// mark post as read or unread
exports.readPost = (request, response) => {
    const userIdBody = request.body.UserId;
    const userReadBody = request.body.read;

    Post.findOne({ where: { id: request.params.id } }).then(post => {
        if (!post) {
            return response.status(404).json({ error: 'Post not found!' });
        }

        let read = post.read;

        switch (userReadBody) {
            case 1:
                if (read.includes(userIdBody)) {
                    return response.status(400).json({
                        error: 'Post has already been read!'
                    });
                }

                read = [...read, userIdBody];
                post.update({ read }).then(() =>
                    response.status(201).json({ message: 'Post is now read!' })
                );
                break;

            case 0:
                if (!read.includes(userIdBody)) {
                    return response.status(400).json({
                        error: 'Post is already unread!'
                    });
                }

                read = read.filter(id => id !== userIdBody);
                post.update({ read }).then(() =>
                    response.status(201).json({ message: 'Post has been marked unread!' })
                );
                break;

            default:
                return response.status(400).json({
                    error: '"read" must be 0 or 1!'
                });
        }
    });
};