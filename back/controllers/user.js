const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// create a new user
exports.signup = (request, response, next) => {
    bcrypt.hash(request.body.password, 10).then(
        (hash) => {
            const user = new User({
                email: request.body.email,
                password: hash,
                firstName: request.body.firstName,
                lastName: request.body.lastName
            });
            user.save().then(
                () => {
                    response.status(201).json({
                        messgae: 'User added successfully!'
                    });
                }
            ).catch(
                (error) => {
                    response.status(400).json({
                        error: 'User was not added! Email already exists!'
                    });
                }
            );
        }
    );
};

// log into the website
exports.login = (request, response, next) => {
    User.findOne({ where: { email: request.body.email } }).then(
        (user) => {
            if (!user) {
                return response.status(401).json({
                    error: 'User not found!'
                });
            }
            bcrypt.compare(request.body.password, user.password).then(
                (valid) => {
                    if (!valid) {
                        return response.status(401).json({
                            error: 'Incorrect password!'
                        });
                    }
                    const token = jwt.sign(
                        { userId: user.id },
                        process.env.TOKEN_SECRET,
                        { expiresIn: '24h' });
                    response.status(200).json({
                        userId: user.id,
                        token: token
                    });
                }
            ).catch(
                (error) => {
                    response.status(500).json({
                        error: 'Something went wrong with the token!'
                    });
                }
            );
        }
    ).catch(
        (error) => {
            response.status(500).json({
                error: 'User not found!'
            });
        }
    );
};

// delete an existing user
exports.deleteUser = (request, response, next) => {
    User.findOne({ where: { id: request.params.id } }).then(
        (user) => {
            if (!user) {
                return response.status(404).json({
                    error: 'User not found!'
                });
            }
            if (user.id !== request.auth.userId) {
                return response.status(401).json({
                    error: 'Request not authorized!'
                });
            }
            User.destroy({ where: { id: request.params.id } }).then(
                () => {
                    response.status(200).json({
                        message: 'Deleted!'
                    });
                }
            ).catch(
                (error) => {
                    response.status(400).json({
                        error: 'User could not be deleted!'
                    });
                }
            );
        }
    );
};