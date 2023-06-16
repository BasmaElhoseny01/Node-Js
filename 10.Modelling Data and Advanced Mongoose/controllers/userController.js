//Import Tour Model
const User = require('../models/userModel');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory')

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    //filter out keys not in the allowed fields
    Object.keys(obj).forEach(
        el => {
            if (allowedFields.includes(el)) {
                newObj[el] = obj[el]
            }
        }
    )
    return newObj
}

//8. getme
exports.getMe = (req, res, next) => {
    //similar to user.getOne except that user.getOne need id to be passed at the parameter list so this middle ware puts the id to the params list then call user.getOne in the stack next fun
    req.params.id = req.user.id;

    next();
}


//Update user data other than password
exports.updateMe = catchAsync(async (req, res, next) => {
    //1.Create Error id the user tried to update password here
    if (req.body.password || req.body.passwordConfirm) {
        return next(new AppError('This route is not for passwords update please use /updateMyPassword.', 400))
    }

    //2.Update ones passed
    const filteredBody = filterObj(req.body, 'name', 'email')
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        //Options
        new: true,
        runValidators: true//ex valid email
    })

    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }
    })
    next()

})

//Delete Account
exports.deleteMe = catchAsync(async (req, res, next) => {
    const deletedUser = await User.findByIdAndUpdate(req.user.id, { active: false })

    res.status(204).json({
        status: "success",
        data: null
    })

});

exports.getAllUsers = factory.getAll(User);
exports.createUser = factory.createOne(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User); //Don't Update passwords by this
exports.deleteUser = factory.deleteOne(User);



//Unimplemented Router example
// exports.deleteUser = (req, res) => {
//     res.status(500).json({
//         status: "error",
//         message: "This route is not yet defined"
//     })
// }