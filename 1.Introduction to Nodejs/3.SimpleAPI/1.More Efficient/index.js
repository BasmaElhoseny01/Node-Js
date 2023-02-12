//The previous version of code isn’t efficient every time the user hit 
//this url the data is read from the file although it is the same data so remove it
const fs = require('fs')
const http = require('http')
const url = require('url')



//Making read file function now @ top level code so it is executed once when the program is run
//So we must modify it ti read sync so the server doesn't start until it file is read <3
const data = fs.readFileSync(`${__dirname}/data.json`, 'utf-8')
const productData = JSON.parse(data)

//Creating server object
//Syntax createServer(call back function)
const server = http.createServer((req, res) => {
    //Call Back every time req is sent to the server
    const pathName = req.url

    //Note: /favicon.ico  is printed when sending any request bec the browser always sends request for the fav icon
    // console.log(pathName)

    if (pathName === '/product') {
        res.end("This is a product")
    }
    else if (pathName === '/overview') {
        res.end("This is an overview")
    }
    else if (pathName === '/api') {
        res.writeHead(200, {
            //Specify type of res to be json
            'Content-type': 'application/json'
        })
        //End sends string not object else Error :(
        res.end(data)
    }
    else {
        //If this if isn't here unknown request url will have no response causing browser to keep loading
        //Syntax:(statusCode,headers object)
        res.writeHead(404, {
            //standard Headers
            //Type of the Response Content
            //The browser is waiting for html response
            'Content-type': 'text/html',

            //your own made up Headers
            'Basma-Header': "Hello <3"

        });//status Code ofr the response 404 (not found)
        res.end("<h1>UnKnown Path</h1")//response for he request :)

    }
})

//Listening to the incoming requests from the client
//listen(portNo,host,callBack func [optionally it is called back when server starts listening])
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000')
})