const jwt = require('jsonwebtoken')
const User = require('./../models/userModel');
const catchAsync = require('../utils/catchAsync');

const AppError = require('./../utils/appError')


const signToken = id => {
    //payload,secret,options
    return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

}

exports.signup = catchAsync(async (req, res, next) => {

    const newUser = await User.create(
        // req.body  //Any one can add role as admin so we just pick the fields we need from here
        {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm
        })


    //Making new user sign in
    const token = signToken(newUser._id)
    //Send the token to the user :D

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    });
});



exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    //1.Check if email and password exist in the req
    if (!email || !password) {
        return next(new AppError('Please provide email and password', 400))
    }

    //2.Check if the user exists && password is correct
    //Note:using + bec the password field is by default not selected
    const user = await User.findOne({ email }).select('+password');//password field is added to the response :D

    const correct = await user.correctPassword(password, user.password);

    if (!user || !correct) {
        return next(new AppError('Incorrect email or password', 401))
    }

    //3.Send token to the client
    res.status(200).json({
        status: 'success',
        token: signToken(user._id)
    });
});
