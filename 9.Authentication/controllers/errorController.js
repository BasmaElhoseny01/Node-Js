const AppError = require('../utils/appError')

const handelCastErrorDB = err => {
    //path=> name of the input field of which data is wrong
    const message = `Invalid ${err.path}: ${err.value}`
    return new AppError(message, 400);
}

const handleDuplicateKeyDB = err =>{
    //match regex
    const value=err.message.match(/(["'])(\\?.)*?\1/)[0]
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
}

const handleValidateErrorDB=err=>{
    const errors=Object.values(err.errors).map(el=>el.message)
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
}

const sendErrorDev = (err, res) => {
    console.log("Error dev", err)

    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}
const sendErrorProd = (err, res) => {
    if (err?.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        })
    } else {
        //print this error
        console.error(`ERROR 🔥🔥`, err)
        res.status(500).json({
            status: 'error',
            message: 'something went wrong',
        })
    }
}

module.exports = (err, req, res, next) => {
    // console.log(err.stack)
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'

    if (process.env.NODE_ENV.trim() === 'development') {
        sendErrorDev(err, res)
    }
    else if (process.env.NODE_ENV.trim() === 'production') {
        let error;
    
        //3.a.Invalid Mongo ID
        if (err.name === 'CastError') error = handelCastErrorDB(err)
        //3.b Duplicate Key
        if(err.code===11000) error=handleDuplicateKeyDB(err)
        //3.c Validation Error
        if(err.name==="ValidationError") error=handleValidateErrorDB(err)
        
        sendErrorProd(error, res)
    }
    next();
}