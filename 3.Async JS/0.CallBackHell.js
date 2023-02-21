//0.Call Backs Hells [Triangular shape of levels]
//Call Backs inside Call Backs ==> Difficult to understand and hard to maintain

//-Read From file
//-Http Request We need superagent
//-Write in File
const fs = require('fs')
const superagent = require('superagent')

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
    //Call Back
    console.log(`Read ${data}`)
    superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err, res) => {
        //Call Back
        if (err) return console.log(err.message);
        console.log(res.body)

        fs.writeFile('dog-img.txt', res.body.message, err => {
            //Call Back
            if (err) return console.log(err.message);
            console.log("Image Saved in file")
        })
    })
})