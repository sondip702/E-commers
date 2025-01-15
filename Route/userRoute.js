const express = require('express');
const userController = require('../Controller/UserController')
const user = express.Router();

user.post('/signup',userController.registation);
user.post('/login', userController.login);


module.exports = user;
