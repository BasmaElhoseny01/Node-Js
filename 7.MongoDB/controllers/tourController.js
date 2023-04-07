const fs = require('fs')

//Import Tour Model
const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');


exports.getAllTours = async (req, res) => {
    //3.1. Reading All Documents
    try {
        // Syntax:() so all documents are returned
        // const tours = await Tour.find();

        //Query String
        // console.log(req.query);

        // // 7.Filtering
        // //Exclude Special field names from teh query string 
        // // const queryObj=req.query;//Shallow Copy
        // const queryObj={...req.query};//new Object that have key-pair of the old object
        // const excludedFields=['page','sort','limit','fields'];
        // excludedFields.forEach(el=>delete queryObj[el]);

        // // Await ==> the query is executed
        // // const tours = await Tour.find(queryObj);
        // // a.Build Query
        // // const query = Tour.find(queryObj);
        // // const tours = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy');//Similar :D


        // // 8.Advanced Filtering
        // // Request:{{baseURL}}/v1/tours?duration[gte]=5  ==> duration >=5
        // //req.query:{ duration: { gte: '5' } }  ❌
        // // MongolDB Query (Correct) :{ duration: { $gte: 5 } } ➡ so we need to transform first tp second
        // //Sol replace gte with $gte
        // let queryString=JSON.stringify(queryObj);
        // queryString=queryString.replace(/\b(gt|gte|lt|lte)\b/g,match=>`$${match}`);//\b exact without any string around it \g replace all occurrences instead first match only is replaced
        // // console.log(JSON.parse(queryString))//{ duration: { '$gte': '5' } } ✅

        // // a.Build Query
        // let query = Tour.find(JSON.parse(queryString));


        // // 9.Sorting
        // if(req.query.sort){
        //     //Query:sort=price
        //     //Mongoose:[price]
        //     // query=query.sort(req.query.sort);

        //     //Query:sort=price,ratingsAverage
        //     //Mongoose:[price,ratingsAverage]
        //     const sortBy=req.query.sort.split(',').join(' ');
        //     query=query.sort(sortBy);

        // }
        // else{
        //     //Sort by Created At even if he didn't specify the sort
        //     query=query.sort('-createdAt')
        // }

        // // 10.Fields Limiting
        // if(req.query.fields){
        //     const fields=req.query.fields.split(',').join(' ');
        //     query=query.select(fields);
        // }
        // else{
        //     //just remove __v
        //     query=query.select('-__v ')
        // }


        // //11.Pagination
        // const page = req.query.page*1||1;
        // const limit = req.query.limit*1||100;
        // //EX: page 1:1-10 page 2:11-20 page 3:21-30  he request 2,10 so skip first 10 documents
        // const skip=(page-1)*limit

        // query=query.skip(skip).limit(limit)


        // b.Execute Query
        const features = new APIFeatures(Tour.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate()
        const tours = await features.query;


        res.status(200).json({
            status: "success",//success fail[err in the client] error[err in the server]})
            results: tours.length,
            data: {
                tours
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}


exports.aliasTopTours = async (req, res, next) => {
    req.query.sort = '-ratingsAverage,price';
    req.query.limit = 5;
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty'
    next();
}

exports.getTour = async (req, res) => {
    //3.2. Read Document by ID

    try {
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status: "success",//success fail[err in the client] error[err in the server]})
            data: {
                tour
            }
        })

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.createTour = async (req, res) => {
    //2. Creating Document

    try {
        //1.a
        // Calling save() on the new created document
        // const newTour = new Tour ({});
        // newTour.save().then(doc=>{
        //doc is the newly created Document 😆
        // }).catch(err=>{

        // })

        //1.b
        //or Simply call create() on the Model it self
        // Note : line save() create returns a promise so we can use .then but instead we  will use await 😉
        // newTour ==> newly created document exactly lik doc as in 1.a
        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
}

exports.updateTour = async (req, res) => {
    //4. Update Document
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,// to return the new updated document
            runValidators: true//to rerun validators on the updated document
        })

        res.status(200).json({
            status: "success",
            data: {
                tour
            }
        })
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
}

exports.deleteTour = async (req, res) => {
    // 5. Delete Documents
    try {
        await Tour.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: "success",
            data: null
        })

    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
}

// 12.Aggregation
exports.getTourStats = async (req, res) => {
    try {
        const stats = await Tour.aggregate([
            //Array of the aggregation stages

            // a.Match Select fields matching certain conditions
            {
                $match: { ratingsAverage: { $gte: 4.5 } }
            },
            // b.Grouping
            {
                $group: {
                    // _id:null,//all in 1 document
                    // _id: '$difficulty',//Group by Difficulty
                    _id: { $toUpper: '$difficulty' },//Group by Difficulty [Make jus Upper Case 😎]
                    numTours: { $sum: 1 },//get count of Tours <3
                    numRatings: { $sum: '$ratingsQuantity' },
                    avgRating: { $avg: '$ratingsAverage' },
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' },
                }
            },
            // Sort Groups :D
            {
                $sort: { avgPrice: -1 }
            },
            //Exclude easy from the group [new another match :D]
            // {
            //     $match:{_id:{$ne:'EASY'}}
            // }
        ])

        res.status(200).json({
            status: "success",
            data: {
                stats
            }
        })
    }
    catch (err) {
        res.status(404).json({
            status: "fail",
            message: err
        })
    }
}


exports.getMonthlyPlan = async (req, res) => {
    try {
        const year = req.params.year

        const plan = await Tour.aggregate([
            {
                //c.Unwind
                $unwind: '$startDates'//Each Start dat is a separate Document 
            },
            {
                $match: {
                    startDates: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: '$startDates' },
                    numToursStarts: { $sum: 1 },
                    tours: { $push: '$name' }
                }
            },
            {
                $addFields: { month: '$_id' }
            },
            {
                //d.Projection
                $project: {
                    _id: 0
                }
            },
            {
                $sort: { numToursStarts: -1 }
            },
            {
                //Not useful here but to show that their is a start called limit
                $limit:12
            }
        ])

        res.status(200).json({
            status: "success",
            data: {
                plan
            }
        })
    }
    catch (err) {
        res.status(404).json({
            status: "fail",
            message: err
        })
    }
}