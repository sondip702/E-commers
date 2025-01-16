const express = require('express');
const userController = require('../Controller/UserController')
const user = express.Router();

user.post('/signup',userController.registation);
user.post('/login', userController.login);
user.post('/logout', userController.logout);


module.exports = user;
