//Here we Focus MiddleWares
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');


const AppError = require('./utils/appError.js');
const globalErrorHandler = require('./controllers/errorController')

//Creating app
//This adds bunch of methods to teh app variable :)
const app = express();


// Global MiddleWares

// Setting Security HTTP Headers ➡ helmet
//It just adds headers for the security that we can modify read the documentation :D
//Remember: app.use(function_name) not function call helmet() returns a function name
app.use(helmet())


//Development Logging
//Morgan Middleware for logging Requests
if (process.env.NODE_ENV === 'development') {
  //Check that Configure Env variables before app is run in server.js
  app.use(morgan('dev'));
}

//Rate Limiting : Prevent same IP to make mny requests to our API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,//mille sec  //Limited to 100 requests per 1Hr
  message: 'Too many request from this API, please try again in an hour'
})
// app.use(limiter) => we can use this but we just specified the api version of the base url
app.use('/api', limiter)

//Body Parser, reading data from body into req.body
//Express.json() middleware to modify incoming request to have a body  😉
//this adds this middleware to the middleware stack
app.use(express.json(
  { limit: '10kb' }//max body is 10KiloBytes
));


//Data Sanitization against NoSQL query Injection
//Filter out the $ from the request
// mongoSanitize(): returns a middle ware function
app.use(mongoSanitize())

//Data Sanitization against XSS
//filter out <> html
//"name": "<div>BasmaElhoseny</div>" ==> "name": "&lt;div>BasmaElhoseny&lt;/div>"
//The tag is removed such that to prevent injection of millions html :)
// xss-clean(): returns a middle ware function
app.use(xss())


//Parameter Pollution
// req:{{URL}}/v1/tours?sort=duration&sort=price
// err:this.queryString.sort.split is not a function
// bec:sort becomes an array so use  [ 'duration', 'price' ]  
// sol: hpp:  price  removed Duplicates
//But we want to allow duplicates in some fields so pass as an option
//req:{{URL}}/v1/tours?duration=5&duration=9
// bec:sort becomes an array so use  8 
// sol:we want to allow duplication  of the duration  
app.use(hpp({
  whitelist: ['duration',
    'ratingsQuantity',
    'ratingsAverage',
    'maxGroupSize',
    'difficulty',
    'price']
}))


// Serving Static file
// http://localhost:8000/test.html ==> serves test.html 😋
app.use(express.static(`${__dirname}/public`));


//Test middleware
//Adding our own function to the middleware stack
app.use((req, res, next) => {
  console.log('Hello From Middle Ware');
  //pass the request to the next middleware
  next();
});


// Note:Route handlers are them selves middleware but they only apply for a certain url not called for every request as we done above 😎😎
//Order of the middleware in the stack are defined by the order they appear in the code
//So express.json() is executed before our custom middle ware 😆

// 2) Routes
//Mounting Router (tourRouter) on a route(/api/v1/tours)
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

//Unhandled Routes
//all =>get post batch ...
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this Server`, 404));
});


//Error Handling Middle Ware
//Defining an error middleware by passing 4 arguments [refer to globalErrorHandler to see what are the 4 arguments]
app.use(globalErrorHandler);

module.exports = app;
