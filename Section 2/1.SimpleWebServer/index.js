//Creating simple web server
const http = require('http')

//Creating server object
//Syntax createServer(call back function)
const server = http.createServer((req,res)=>{
    //Call Back every time req is sent to the server
    res.end("Hello from the server")//response for he request :)
})

//Listening to the incoming requests from the client
//listen(portNo,host,callBack func [optionally it is called back when server starts listening])
server.listen(8000,'127.0.0.1',()=>{
    console.log('Listening to requests on port 8000')
})

//Now Event Loop is created :) that keeps listening for the requests.
//Run server  node index.js
//Send request to the server ==> http://127.0.0.1:8000/