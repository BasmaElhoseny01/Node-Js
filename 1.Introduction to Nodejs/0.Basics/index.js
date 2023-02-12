const fs = require('fs')

const hello = "Hello World"
console.log(hello)
//node index.js

/*************************************************************File System module in NodeJS**********************************************/
//1.Read file Synchronously
//Syntax:location,char encoding
const readFile = fs.readFileSync('./txt/input.txt', 'utf-8')
console.log(readFile)

//2.Write into file Synchronously
const txtOut = `this is written Back: ${readFile}`
fs.writeFileSync('./txt/output.txt', txtOut)

//3.Read File Asynchronously
//Syntax:path,char encoding,call back func
fs.readFile('./txt/inputa.txt', 'utf-8', (err, data) => {
    if (err) return console.log("ERROR🧨🧨", err)
    console.log(data)
})
console.log("Reading file...")

//4.Write File Asynchronously
const txtOutAsync = "This written Async";
fs.writeFile('./txt/outputAs.txt', txtOutAsync, 'utf-8', err => {
    console.log("Data Written in file :)")
})
console.log("Writing file...")