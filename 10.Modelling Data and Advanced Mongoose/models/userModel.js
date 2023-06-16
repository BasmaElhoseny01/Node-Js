const mongoose = require('mongoose');

const validator = require('validator')
const bcrypt = require('bcryptjs');
const crypto = require('crypto')

const catchAsync = require('../utils/catchAsync');
const { reset } = require('nodemon');

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
    role: {
        type: String,
        enum: ['user', 'guide', 'lead-guide', 'admin'],
        default: 'user'
    },
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
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
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

userSchema.pre('save', function (next) {
    // //Such that is performed automatically whenever we save
    // if (this.isModified('password')) {
    //     this.passwordChangedAt = Date.now() - 1000;//we subtract 1000 mill sec from the time to solve the problem that the JWT may be faster than saving this value to the DB so dec this [NOT Accurate]
    // }
    // next()

    //Another implantation to see how did we used isNew
    if (!this.isModified('password') || this.isNew) return next();
    this.passwordChangedAt = Date.now() - 1000;
    next()

})


//Middle ware to filter collections by active flag
userSchema.pre('/^find/', function (next) {
    //This here points to the current query
    this.filter({ active: { $ne: false } })
    next();
})

//Instance Method => available for all documents of a certain collection 
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
};

//Instance Method to check if the password has been changed after the passed JWT timestamp
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        //passwordChanged Attribute exist 

        //Date to Timestamp -> From mill sec to sec
        const passwordChangedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000)
        return passwordChangedTimestamp > JWTTimestamp//if we changed the password after toke is issued :D
    }
    //False password hasn't been changed after the JWT is generated then the JWT is still valid
    return false
}

//Generate Random token for the user ot rest the password
userSchema.methods.createPasswordResetToken = function () {
    // NB: It is a Random string but we don't need it to be cryptographically strong like password hash we made 
    // For the password
    //32 Bytes to be generated
    const token = crypto.randomBytes(32).toString('hex')

    // Fine We will send this to the user and compare the token with th user in the resetpassword email with taht 
    //But where to store this rem it is stateless then save this toke to the DB but if an 
    //attacker gain access to the DB it will see the reset token and use it to reset the password
    //so we need to hash it and store it encrypted but not very intensive like password so use crypto
    this.passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')//converted in hex
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    // console.log(Date.now())
    // console.log("herrrrrrrr", this.passwordResetExpires)
    // // this.passwordResetExpires = Date.now()
    // console.log(this.passwordResetExpires > Date.now())
    return token

}

const User = mongoose.model('User', userSchema);

module.exports = User;  