//Here we Focus MiddleWares
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const AppError = require('./utils/appError.js');
const globalErrorHandler = require('./controllers/errorController')

//Creating app
//This adds bunch of methods to teh app variable :)
const app = express();

// Serving Static file
//http://localhost:8000/test.html ==> serves test.html 😋
app.use(express.static(`${__dirname}/public`));

//1)MiddleWare
//Morgan Middleware for logging Requests
if (process.env.NODE_ENV === 'development') {
  //Check that Configure Env variables before app is run in server.js
  app.use(morgan('dev'));
}

//Express.json() middleware to modify incoming request to have a body  😉
//this adds this middleware to the middleware stack
app.use(express.json());

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

//1.Unhandled Routes
//all =>get post batch ...
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this Server`
  // })

  // const err=new Error(`Can't find ${req.originalUrl} on this Server`)
  // err.status='fail'
  // err.statusCode=404

  // If next function receives an argument no matter what is it express knows it is an error 😎😎
  // So that it skips all other middle wares in the middleware stack
  // and send err to the error handling middleware we created down
  // next(err);

  //using appError class
  next(new AppError(`Can't find ${req.originalUrl} on this Server`, 404));
});


// 2. Error Handling Middle Ware
//Defining an error middleware by passing 4 arguments [refer to globalErrorHandler to see what are the 4 arguments]
app.use(globalErrorHandler);

module.exports = app;
