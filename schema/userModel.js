const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please tell your name']
    },
    email: {
        type: String,
        require: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail,'Please provide a valid email']
    },
    phone: String,
    password: {
        type: String,
        require: [true, 'Please provite a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        require: [true, 'Please confirm your password'],
        validate:{
            validator: function(el){
            return el === this.password;
        },
        message: 'Password are not the same'
    }
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;