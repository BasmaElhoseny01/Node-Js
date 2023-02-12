//The previous version of code isn’t efficient every time the user hit 
//this url the data is read from the file although it is the same data so remove it
const fs = require('fs')
const http = require('http')
const url = require('url')



//Reading HTML file
const html = fs.readFileSync(`${__dirname}/index.html`, 'utf-8')

//Creating server object
//Syntax createServer(call back function)
const server = http.createServer((req, res) => {

    //http://127.0.0.1:8000/html?id=10

    //parse url
    console.log(url.parse(req.url, true))

    // Url {
    //     protocol: null,
    //     slashes: null,
    //     auth: null,
    //     host: null,
    //     port: null,
    //     hostname: null,
    //     hash: null,
    //     search: '?id=10',
    //     query: [Object: null prototype] { id: '10' }, ********
    //     pathname: '/html',
    //     path: '/html?id=10',
    //     href: '/html?id=10'
    //   }

    //Saving pathname and query object
    const { pathname, query } = url.parse(req.url, true)
    console.log("pathname:",pathname,"Query:",query)
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(html)
})

//Listening to the incoming requests from the client
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000')
})