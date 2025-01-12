const express = require('express');
const userContrler = require('../Controller/userControler')
const user = express.Router();
const authControl = require('../Controller/authController');

user.post('/signup',authControl.signup);
user.post('/login',authControl.login);


user
    .route('/')
    .get(userContrler.getAllUsers)
    .post(userContrler.createUser);

user
    .route('/:id')
    .get(userContrler.getUser)
    .patch(userContrler.updateUser)
    .delete(userContrler.deleteUser);

module.exports = user;
