const dotenv = require('dotenv');
//Must be Before any thing that needs to access it
dotenv.config({ path: './config.env' });

const app = require('./app');

// Start Up A Server
const port = process.env.PORT || 3000;

//listen(portNo,call back function)
app.listen(port, () => {
  console.log(`Server Running on Port ${port} 🔥🔥`);
});
