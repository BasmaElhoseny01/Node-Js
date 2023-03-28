const fs = require('fs')

//Reading Fake Data from File Sync[Blocking]
//Convert to JSON using JSON.parse()
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/tours-simple.json`));


exports.checkID = (req, res, next, val) => {
    const id = req.params.id * 1
    if (id > tours.length) {
        console.log("Param MiddleWare is called Value of ID", val)
        //Return so that the function isn't completed
        return res.status(404).json({
            status: "fail",
            message: "Invalid ID"
        })
    }
    next();
}

exports.checkBody = (req, res, next) => {
    const name = req.body.name
    const price = req.body.price
    if (!name || !price) {
        return res.status(400).json({
            status:"fail",
            message:"Missing name or price",
        })
    }
    next();
}

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: "success",//success fail[err in the client] error[err in the server]})
        results: tours.length,
        data: {
            tours//tours:tours
        }
    })
}

exports.getTour = (req, res) => {
    const id = req.params.id * 1 //*1 to convert string to int
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

exports.addNewTour = (req, res) => {
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

exports.updateTour = (req, res) => {
    const id = req.params.id * 1
    res.status(200).json({
        status: "success",
        data: {
            tour: "<Updated Tour Object ...>"
        }
    })
}

exports.deleteTour = (req, res) => {
    const id = req.params.id * 1
    res.status(204).json({
        status: "success",
        data: null
    })
}