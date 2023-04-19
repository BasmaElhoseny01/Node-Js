const mongoose = require('mongoose');
const validator = require('validator')

const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');

//Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name']
    },
    email: {
        type: String,
        required: [true, 'Please Provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false//new=ver shown in select query result
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            //Works only on SAVE & CREATE!!!
            validator: function (el) {
                return el === this.password
            },
            message: "Passwords are not the same"
        }
    }
})

//Pre save middleWare
userSchema.pre('save', async function (next) {
    // not working :( if you added catch async bec it will be called as arrow function => this isn't defined)
    if (!this.isModified('password')) {
        // Called only if the password is modified
        return next();//just pass to the next middle ware
    }

    this.password = await bcrypt.hash(this.password, 12);//12=>cost parameter

    //We don't need to save it to DB just need it to pass the validator above for match between passwords
    this.passwordConfirm = undefined

    return next();
});

// //2.Instance Method => available for all documents of a certain collection 
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword,userPassword)
};

const User = mongoose.model('User', userSchema);

module.exports = User;  