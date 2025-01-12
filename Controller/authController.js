const jwt = require('jsonwebtoken')
const User = require('../schema/userModel');
const catchAsync = require('../Error/catchAsync');
const AppError = require('../Error/AppError')

const signToken = id =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    });
}

exports.signup = catchAsync(async(req, res, next)=>{
    const newUser =await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });
    const toekn =signToken(newUser._id);
    res.status(201).json({
        status: 'sucess',
        toekn,
        data: {
            user: newUser
        }
    })
});

exports.login =catchAsync( async (req,res,next)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return next(new AppError('Please provide emaili and password', 400));
    }

    const user = await User.findOne({email}).select('+password');

    if(!user || !(await user.correctPassword(password, user.password))){
        return next(new AppError('Incorrect email or password', 401));
    }

    const toekn = signToken(user._id);
    res.status(201).json({
        status: 'sucess',
        toekn
    });
});

exports.protect = catchAsync(async (req, res, next)=>{
    
    let token;
    if(req.headers.authorization &&
        req.headers.authorization.startsWith('hello')
    ){
        token = req.headers.authorization.split(' ')[1];
    }
    console.log(token);

    if(!token){
        return next(
            new AppError('You are not logged in! Please log in to get access.', 401)
        );
    }

    next();
})