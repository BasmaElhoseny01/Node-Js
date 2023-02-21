//1.Consume Promises [already superagent already support promises]
//.then.catch
const fs = require('fs')
const superagent = require('superagent')
// Pending Promise then it becomes resolved promise :D or rejected Promise if sth went wrong :(

//-Read From file
//-Http Request We need superagent[use then to consume promise]
//-Write in File

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
    //Call Back
    console.log(`Read ${data}`)
    //This get Method returns a promise
    superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
        .then((res) => {
            //Call Back Function
            console.log(res.body)

            fs.writeFile('dog-img.txt', res.body.message, err => {
                //Call Back
                if (err) return console.log(err.message);
                console.log("Image Saved in file")
            })
        }).catch(err => { console.log(err.message) })
})