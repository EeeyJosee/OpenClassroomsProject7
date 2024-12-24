const { Post } = require('../models');
const fs = require('fs');

// display all posts
exports.getAllPosts = (request, response, next) => {
    Post.findAll({ order: [['createdAt', 'DESC']] }).then(
        (posts) => {
            response.status(200).json(posts);
        }
    ).catch(
        (error) => {
            response.status(400).json({
                error: 'Posts were not found!'
            });
        }
    );
};

// return a single post
exports.getOnePost = (request, response, next) => {
    Post.findOne({ where: { id: request.params.id } }).then(
        (post) => {
            response.status(200).json(post);
        }
    ).catch(
        (error) => {
            response.status(400).json({
                error: 'Post was not found!'
            });
        }
    );
};

// create a new post with or without media
exports.createPost = (request, response, next) => {
    // post created with multimedia
    if (request.file) {
        request.body = JSON.parse(request.body.post);

        const url = request.protocol + '://' + request.get('host');
        const post = new Post({
            message: request.body.message,
            mediaUrl: url + '/media/' + request.file.filename,
            title: request.body.title,
            read: [],
            UserId: request.auth.userId
        });
        post.save().then(
            () => {
                response.status(201).json({
                    message: 'New post created!'
                });
            }
        ).catch(
            (error) => {
                response.status(400).json({
                    error: 'Post was not created!'
                });
            }
        );
    }
    // post created without multimedia
    else {
        const post = new Post({
            message: request.body.message,
            title: request.body.title,
            read: [],
            UserId: request.auth.userId
        });
        post.save().then(
            () => {
                response.status(201).json({
                    message: 'New post created!'
                });
            }
        ).catch(
            (error) => {
                response.status(400).json({
                    error: 'Post was not created!'
                });
            }
        );
    }
};

// modify contents of existing post
exports.modifyPost = (request, response, next) => {
    Post.findOne({ where: { id: request.params.id } }).then(
        (post) => {
            if (!post) {
                return response.status(404).json({
                    error: 'Post not found!'
                });
            }

            // parse media before validating user
            if (request.file) {
                request.body = JSON.parse(request.body.post);
            }

            // verify user authorization
            if (!((post.UserId == request.auth.userId) && (post.UserId == request.body.userId))) {
                return response.status(401).json({
                    error: 'Request not authorized!'
                });
            }
            else {
                if (request.file) {
                    const filename = post.mediaUrl.split('/media/')[1];
                    fs.unlink('media/' + filename, () => { })
                    const url = request.protocol + '://' + request.get('host');
                    post = {
                        UserId: request.params.id,
                        // id: UserId: request.body.id,
                        message: request.body.message,
                        title: request.body.title,
                        mediaUrl: url + '/media/' + request.file.filename
                    };

                } else {
                    post = {
                        UserId: request.params.id,
                        // id: UserId: request.body.id,
                        message: request.body.message,
                        title: request.body.title,
                        mediaUrl: request.body.mediaUrl
                    };
                }
                Post.updateOne({ id: request.params.id }, post).then(
                    () => {
                        response.status(201).json({
                            message: 'Post has been updated!'
                        });
                    }
                ).catch(
                    (error) => {
                        response.status(400).json({
                            error: 'Post was not updated!'
                        });
                    }
                );
            }
        }
    )
};

// delete an existing post
exports.deletePost = (request, response, next) => {
    Post.findOne({ where: { id: request.params.id } }).then(
        (post) => {
            if (!post) {
                return response.status(404).json({
                    error: 'Post not found!'
                });
            }
            if (post.UserId !== request.auth.userId) {
                return response.status(401).json({
                    error: 'Request not authorized!'
                });
            }

            if (post.mediaUrl) {
                const filename = post.mediaUrl.split('/media/')[1];
                fs.unlink('media/' + filename, () => {
                    Post.destroy({ where: { id: request.params.id } }).then(
                        () => {
                            response.status(200).json({
                                message: 'Deleted!'
                            });
                        }
                    ).catch(
                        (error) => {
                            response.status(400).json({
                                error: 'Post could not be deleted!'
                            });
                        }
                    );
                })
            }
            else {
                Post.destroy({ where: { id: request.params.id } }).then(
                    () => {
                        response.status(200).json({
                            message: 'Deleted!'
                        });
                    }
                ).catch(
                    (error) => {
                        response.status(400).json({
                            error: 'Post could not be deleted!'
                        });
                    }
                );
            }
        }
    );
};

// mark post as read or unread
exports.readPost = (request, response, next) => {
    userIdBody = request.body.UserId;
    userReadBody = request.body.read;

    Post.findOne({ where: { id: request.params.id } }).then(
        (post) => {
            if (!post) {
                return response.status(404).json({
                    error: 'Post not found!'
                });
            }
            // check who read post
            read = post.read;

            switch (userReadBody) {
                case 1: // mark a post as read
                    if (read.includes(userIdBody)) {
                        return response.status(400).json({
                            error: 'Post has already been read!'
                        });
                    }
                    if (!read.includes(userIdBody)) {
                        read = [...read, userIdBody]
                        post.update({ read }).then(
                            (post) => {
                                post.save().then(
                                    () => {
                                        response.status(201).json({
                                            message: 'Post is now read!'
                                        });
                                    }
                                ).catch(
                                    (error) => {
                                        response.status(400).json({
                                            error: 'Post could not be marked read!'
                                        });
                                    }
                                );
                            }
                        );
                    };
                    break;

                case 0: // mark a post as unread
                    if (!read.includes(userIdBody)) {
                        return response.status(400).json({
                            error: 'Post is already unread!'
                        });
                    }
                    if (read.includes(userIdBody)) {
                        // splice id from the array
                        const index = read.indexOf(userIdBody);

                        if (index == 0) {// deletion of first record
                            const [first, ...second] = read;
                            read = second;
                        }
                        if (read.length == index + 1) {// deletion of last record
                            const first = read.slice(0, index)
                            read = first;
                        }
                        else {// deletion of a record in the middle
                            const first = read.slice(0, index);
                            const second = read.slice(index + 1, read.length);
                            read = [...first, ...second];
                        }
                        post.update({ read }).then(
                            (post) => {
                                post.save().then(
                                    () => {
                                        response.status(201).json({
                                            message: 'Post has been marked unread!'
                                        });
                                    }
                                ).catch(
                                    (error) => {
                                        response.status(400).json({
                                            error: 'Post could not be marked as unread!'
                                        });
                                    }
                                );
                            }
                        );
                    }
                    break;

                default:
                    return response.status(400).json({
                        error: '"read" is not of the values 0 or 1!'
                    });
            }
        }
    )
};