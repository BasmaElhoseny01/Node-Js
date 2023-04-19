const dotenv = require('dotenv');
const mongoose = require('mongoose');

//Must be Before any thing that needs to access it
dotenv.config({ path: './config.env' });

//Unhandled Exceptions
process.on('uncaughtException', err => {
  console.log("UNHANDLED EXCEPTION: 🔥 Shutting down...")
  console.log(err.name, err.message);
  //shut down the app [Must Here] bec the app crashed
  process.exit(1);
})

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(con => {
  // console.log(con.connections);
  console.log("DB Connection successful!⭐")
});

// Configure Mongo DB
// Start Up A Server
const port = process.env.PORT || 8000;

//listen(portNo,call back function)
const server = app.listen(port, () => {
  console.log(`Server Running on Port ${port} 🔥🔥`);
});

//Unhandled Rejections
process.on('unhandledRejection', err => {
  console.log("UNHANDLED REJECTION: 🔥 Shutting down...")
  console.log(err.name, err.message);
  server.close(() => {
    //shut down the app [Optional Here]
    process.exit(1);
  })
})
