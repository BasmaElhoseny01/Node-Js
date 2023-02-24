const express = require('express')
const fs = require('fs')

//1.Creating app
//This adds bunch of methods to teh app variable :) 
const app = express();

//Reading Fake Data from File Sync[Blocking]
//Convert to JSON using JSON.parse()
const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tours-simple.json`));

//3.Define Route
app.get('/', (req, res) => {
    //Call Back Func [Route Handler]
    //res.status(200).send('Hello from the server Side');   //text/html; charset=utf-8 [Text Response]
    res.status(200).json({ message: 'Hello from the server Side' });   //application/json; charset=utf-8 [JSON Response]
})

//4.Handling GET Requests
// Versioning Endpoint 🔢
app.get('/api/v1/tours', (req, res) => {
    res.status(200).send({
        status: ""//success fail[err in the client] error[err in the server]})
        ,
        data: {
            tours//tours:tours
        }
    })
})

//2.Start Up A Server
const port = 8000;
//listen(portNo,call back function)
app.listen(port, () => {
    console.log(`Server Running on Port ${port} 🔥🔥`);
})
