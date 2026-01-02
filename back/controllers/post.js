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
exports.createPost = async (req, res) => {
  try {
    if (req.body.post) {
      req.body = JSON.parse(req.body.post);
    }

    let media = null;

    if (req.file) {
      const url = req.protocol + '://' + req.get('host');
      media = `${url}/media/${req.file.filename}`;
    }

    await Post.create({
      title: req.body.title,
      message: req.body.message,
      media: media,
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

    if (req.body.post) {
      req.body = JSON.parse(req.body.post);
    }

    const updates = {
      title: req.body.title ?? post.title,
      message: req.body.message ?? post.message,
    };

    // Replace media if a new one is uploaded
    if (req.file) {
      if (post.media) {
        const filename = post.media.split('/media/')[1];
        fs.unlink(`media/${filename}`, () => {});
      }

      const url = req.protocol + '://' + req.get('host');
      updates.media = `${url}/media/${req.file.filename}`;
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