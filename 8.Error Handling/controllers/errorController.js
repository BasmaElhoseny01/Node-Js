
const sendErrorDev = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        })
    } else {
        //print this error
        console.error(`ERROR 🔥🔥`,err) 
        res.status(500).json({
            status: 'error',
            message: 'something went wrong',
        })
    }
}

const sendErrorProd = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
}

module.exports = (err, req, res, next) => {
    // console.log(err.stack)
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res)
    }
    else if (process.env.NODE_ENV === 'production') {
        sendErrorProd(err, res)
    }
    next();
}