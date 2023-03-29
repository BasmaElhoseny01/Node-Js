const dotenv = require('dotenv');
const mongoose = require('mongoose');

//Must be Before any thing that needs to access it
dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(con => {
  console.log(con.connections);
  console.log("DB Connection successful!⭐")
});

// Configure Mongo DB
// Start Up A Server
const port = process.env.PORT || 3000;

//listen(portNo,call back function)
app.listen(port, () => {
  console.log(`Server Running on Port ${port} 🔥🔥`);
});
