const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const crypto = require('crypto')

const User = require('./../models/userModel');

const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError')
const sendEmail = require('./../utils/email')

const signToken = id => {
    //payload:Data we want to encode :D
    // NOTE: the data in pay load are decoded not encrypted so that anyone with the token can see it as we i did in JWT.io so don't store sensitive data in the JWT
    //,secret,options
    return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

}

const createAndSendToken = (user, statusCode, res) => {
    const token = signToken(user._id)
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    })

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


    createAndSendToken(newUser, 201, res)
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


    createAndSendToken(user, 200, res)
});


//3.Authentication : verifies the identity of a user or service
exports.protect = catchAsync(async (req, res, next) => {

    //1.Get Token from the req header [Check if token is sent with the request]
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];//Bearer TOKEN
    }

    if (!token) {
        return next(new AppError("You aren't logged in! Please login in to gain access", 401))
    }

    //2.Verify this token
    //Token,JWT_Secret in order to generate the test signature,call back function but we will here use promise just for syntax matching of the project that uses async await
    //We need to promise from the .verify 
    //Return is the decoded data
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)


    //3.Check if user still exists (Handle case that user has been deleted but Token still exists and unexpired but the id it holds is for a user that doesn't exist)
    const currentUser = await User.findById(decoded.id)
    if (!currentUser) {
        return next(new AppError('The User belonging to this Token no longer exist', 401))
    }

    //4. User has changed the password then the token is invalid (Handle someone has stole the password so he is able to generate tokens using this password we need to prevent this)
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(new AppError('User recently changed the password ! Log in again', 401))
    }

    //Then here we grant access to the protected route 😁
    req.user = currentUser;//Just to be useful in the future add the user to the req
    next();
});

//4.Authorization : determines their access rights
//Note:We can't pass arguments to middleware function so how to solve this problem
//So add a wrapper function that accepts unknown number of parameters and make it return middleware function 
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        //Remember we added req.user in the protect middle ware :) so that it is available here
        if (!roles.includes(req.user.role)) {
            //4.3:Forbidden
            return next(new AppError('You do not have permission to perform this action'), 403)
        }
        next();
    }
}

//5.1.forgetPassword
exports.forgetPassword = catchAsync(async (req, res, next) => {
    //1.Get User based on the POSTed email
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(new AppError('There is no user with that email address !', 404))
    }

    //2.Generate the random reset token
    //Make an instance function :D
    const resetToken = user.createPasswordResetToken()

    //Save what we have assigned in passwordResetToken and passwordResetExpires
    // added the option because he want the things after
    await user.save({ validateBeforeSave: false })

    //3.Send Actual Email
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
    const email_body = `Forgot your password? Submit a PATCH request with your new password and password Confirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email `

    //Why to use try catch not using global catch async bec before throwing error we need to remove the reset token and its expirey from the datat base 
    //bec sth went wrong in sending the mail
    try {
        //NB: here the token is sent not encrypted bec we assume that teh mail is very secure place that only the user that can access
        await sendEmail({
            email: user.email,
            subject: "Your Password reset token (valid for 10 min)",
            message: email_body
        })

        return res.status(200).json({
            status: "success",
            message: "Token sent to email!"
        })
    }
    catch (err) {
        //Undo what we have done
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined
        //Save Back
        await user.save({ validateBeforeSave: false })

        console.log(err)
        return next(new AppError('There was an error sending the email. Try again later!', 500))
    }

});


exports.resetPassword = catchAsync(async (req, res, next) => {

    //1.Get user Based on the token
    token = req.params.token
    hashedToken = crypto.createHash('sha256').update(token).digest('hex')//converted in hex

    //But remember what is the Data base is the encrypted
    //Query on the Token hashed and its expiration date :D hasn't passed
    const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } })

    //Note here Mongo will handle conversions from timestamp to date 
    if (!user) {
        return next(new AppError('Token is invalid or has expired', 400))
    }

    //2. Set the new password [Bec the token hasn't expired and there is a user]
    //Then here rest the password
    user.password = req.body.password
    user.passwordConfirm = req.body.passwordConfirm
    //Delete the Rest Token and expiry date
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined

    await user.save();//DON'T TURN OFF VALIDATOR TO CHECK ON THE PASSWORD NUMBER length

    //3.Update changePasswordAt property for the user
    //By the pre save we added in the UserModel <3

    //4.Log the user in and send JWT
    createAndSendToken(user, 201, res)
});


exports.updatePassword = catchAsync(async (req, res, next) => {
    //1.Get User from the collection
    //req.user doesn't contain password :( so get it again
    const user = await User.findById(req.user._id).select("+password")

    //2.If Passed Password is correct
    const correct = await user.correctPassword(req.body.password, user.password);
    if (!correct) {
        return next(new AppError('Incorrect Password!', 401))//401 unauthorized
    }


    //3.Update the password
    user.password = req.body.newPassword
    user.passwordConfirm = req.body.newPasswordConfirm
    await user.save()//Validation is done automatically

    //4.Login and send JWT Token Back
    createAndSendToken(user, 200, res)
});