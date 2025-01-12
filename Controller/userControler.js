const User = require('../schema/userModel');
const catchAsync = require('../Error/catchAsync');
exports.getAllUsers = catchAsync(async(req, res) =>{
    const users = await User.find();
    res.status(200).json({
        staus: 'error',
        results: users.length,
        data: {
            users
        }
    });
});

exports.createUser = (req, res) =>{
    res.status(500).json({
        staus: 'error',
        message: 'This route is not yet defined!'
    });
};

exports.getUser = (req, res) =>{
    res.status(500).json({
        staus: 'error',
        message: 'This route is not yet defined!'
    });
};

exports.updateUser = (req, res) =>{
    res.status(500).json({
        staus: 'error',
        message: 'This route is not yet defined!'
    });
};

exports.deleteUser = (req, res) =>{
    res.status(500).json({
        staus: 'error',
        message: 'This route is not yet defined!'
    });
};