//3.Build Promise
//Promisify Read and Write file functions ie make them return promises instead of having callback functions inside functions


//-Read From file [Return Promise]
//-Http Request We need superagent[use then to consume promise]
//-Write in File [Return Promise]


const fs = require('fs')
const superagent = require('superagent')


//Read File To return Promise
const readFilePro = file => {
    // Promise(Executer function)
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject('File not Found 🙁');//Available in catch()
            resolve(data);//Data is what to be available in then
        })
    });
}


//Read File To return Promise
const writeFilePro = (file, data) => {
    // Promise(Executer function)
    return new Promise((resolve, reject) => {
        fs.writeFile(`${file}`, data, err => {
            if (err) reject("Couldn't write in file", err.message);
            resolve('Image Saved in file 😉😉')
        })
    });
}


// readFilePro(`${__dirname}/dog.txt`)
//     .then(data => {
//         console.log(`Read ${data}`)
//         superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
//             .then((res) => {
//                 //Call Back Function
//                 console.log(res.body)
//                 writeFilePro('dog-img.txt', res.body.message)
//                 .then(data=>{
//                     console.log(data)
//                 })
//                 .catch(err=> console.log(err))
//             }).catch(err => { console.log(err.message) })

//     }).catch(err => {
//         console.log(err)
//     })

//We still have callbacks inside callbacks we didn't Solve any thing :(
//Sol: Make each handler returns a new promise [Chain Results]


readFilePro(`${__dirname}/dog.txt`)
    .then(data => {
        console.log(`Read ${data}`)
        return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
    }).then((res) => {
        //Call Back Function
        console.log(res.body)
        return writeFilePro('dog-img.txt', res.body.message)
    }).then(data => {
        console.log(data)
    })
    .catch(err => {
        //1 single catch handler :)
        console.log(err.message)
    })
