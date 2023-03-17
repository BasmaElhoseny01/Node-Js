//Here we Focus on Refactoring an Organizing Routes for detailed comments refer to app_unrefactored.js
const express = require('express')
const fs = require('fs')

//1.Creating app
//This adds bunch of methods to teh app variable :) 
const app = express();

///5.1 Express.json() middleware to modify incoming request to have a body  😉
app.use(express.json())


//Reading Fake Data from File Sync[Blocking]
//Convert to JSON using JSON.parse()
const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tours-simple.json`));

const helloServer = (req, res) => {
    //Call Back Func [Route Handler]
    //res.status(200).send('Hello from the server Side');   //text/html; charset=utf-8 [Text Response]
    res.status(200).json({ message: 'Hello from the server Side' });   //application/json; charset=utf-8 [JSON Response]
}

const getAllTours = (req, res) => {
    res.status(200).json({
        status: "success",//success fail[err in the client] error[err in the server]})
        results: tours.length,
        data: {
            tours//tours:tours
        }
    })
}

const getTour = (req, res) => {
    const id = req.params.id * 1 //*1 to convert string to int
    // if (id > tours.length) {
    //     return res.status(404).json({
    //         status: "fail",
    //         message:"Invalid ID"
    //     })
    // }

    const tour = tours.find(el => el.id === id)
    if (!tour) {
        return res.status(404).json({
            status: "fail",
            message: "Invalid ID"
        })
    }
    res.status(200).json({
        status: "success",//success fail[err in the client] error[err in the server]})
        data: {
            tour
        }
    })
}

const addNewTour = (req, res) => {
    //Data of new tour is in the body
    //Express Doesn't put data i the request so we need a middleware express.json() that modifies the incoming request => app.use(express.json())
    // console.log(req.body)//if we didn't add express.json() this prints undefined
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body)//Link 2 Json Objects together
    console.log(req.body)

    tours.push(newTour)
    //Write Asynchronously 😋
    fs.writeFile(`${__dirname}/data/tours-simple.json`,
        JSON.stringify(tours),
        err => {
            res.status(201).json({
                status: 201,
                data: {
                    tour: newTour
                }
            })
        })
}

const updateTour = (req, res) => {
    const id = req.params.id * 1
    if (id > tours.length) {
        return res.status(404).json({
            status: "fail",
            message: "Invalid ID"
        })
    }
    res.status(200).json({
        status: "success",
        data: {
            tour: "<Updated Tour Object ...>"
        }
    })
}

const deleteTour = (req, res) => {
    const id = req.params.id * 1
    if (id > tours.length) {
        return res.status(404).json({
            status: "fail",
            message: "Invalid ID"
        })
    }
    res.status(204).json({
        status: "success",
        data: null
    })
}

// app.get('/', helloServer)
// app.get('/api/v1/tours', getAllTours)
// app.get('/api/v1/tours/:id',getTour)
// app.post('/api/v1/tours', addNewTour)
// app.patch('/api/v1/tours/:id',updateTour)
// app.delete('/api/v1/tours/:id',deleteTour)

app
  .route('/')
  .get(helloServer)

app
   .route('/api/v1/tours')
   .get(getAllTours)
   .post(addNewTour)

app
   .route('/api/v1/tours/:id')
   .get(getTour)
   .patch(updateTour)
   .delete(deleteTour)
//2.Start Up A Server
const port = 8000;
//listen(portNo,call back function)
app.listen(port, () => {
    console.log(`Server Running on Port ${port} 🔥🔥`);
})