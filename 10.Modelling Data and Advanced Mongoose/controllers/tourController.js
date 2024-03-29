const fs = require('fs')

//Import Tour Model
const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

exports.getAllTours = factory.getAll(Tour);
// exports.getAllTours = catchAsync(async (req, res, next) => {
//     // Reading All Documents
//     // try {
//     // Syntax:() so all documents are returned
//     // const tours = await Tour.find();

//     //Query String
//     // console.log(req.query);

//     // // Filtering
//     // //Exclude Special field names from teh query string 
//     // // const queryObj=req.query;//Shallow Copy
//     // const queryObj={...req.query};//new Object that have key-pair of the old object
//     // const excludedFields=['page','sort','limit','fields'];
//     // excludedFields.forEach(el=>delete queryObj[el]);

//     // // Await ==> the query is executed
//     // // const tours = await Tour.find(queryObj);
//     // // a.Build Query
//     // // const query = Tour.find(queryObj);
//     // // const tours = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy');//Similar :D


//     // // Advanced Filtering
//     // // Request:{{baseURL}}/v1/tours?duration[gte]=5  ==> duration >=5
//     // //req.query:{ duration: { gte: '5' } }  ❌
//     // // MongolDB Query (Correct) :{ duration: { $gte: 5 } } ➡ so we need to transform first tp second
//     // //Sol replace gte with $gte
//     // let queryString=JSON.stringify(queryObj);
//     // queryString=queryString.replace(/\b(gt|gte|lt|lte)\b/g,match=>`$${match}`);//\b exact without any string around it \g replace all occurrences instead first match only is replaced
//     // // console.log(JSON.parse(queryString))//{ duration: { '$gte': '5' } } ✅

//     // // a.Build Query
//     // let query = Tour.find(JSON.parse(queryString));


//     // // Sorting
//     // if(req.query.sort){
//     //     //Query:sort=price
//     //     //Mongoose:[price]
//     //     // query=query.sort(req.query.sort);

//     //     //Query:sort=price,ratingsAverage
//     //     //Mongoose:[price,ratingsAverage]
//     //     const sortBy=req.query.sort.split(',').join(' ');
//     //     query=query.sort(sortBy);

//     // }
//     // else{
//     //     //Sort by Created At even if he didn't specify the sort
//     //     query=query.sort('-createdAt')
//     // }

//     // // Fields Limiting
//     // if(req.query.fields){
//     //     const fields=req.query.fields.split(',').join(' ');
//     //     query=query.select(fields);
//     // }
//     // else{
//     //     //just remove __v
//     //     query=query.select('-__v ')
//     // }


//     // // Pagination
//     // const page = req.query.page*1||1;
//     // const limit = req.query.limit*1||100;
//     // //EX: page 1:1-10 page 2:11-20 page 3:21-30  he request 2,10 so skip first 10 documents
//     // const skip=(page-1)*limit

//     // query=query.skip(skip).limit(limit)


//     // b.Execute Query
//     const features = new APIFeatures(Tour.find(), req.query)
//         .filter()
//         .sort()
//         .limitFields()
//         .paginate()
//     const tours = await features.query;


//     res.status(200).json({
//         status: "success",//success fail[err in the client] error[err in the server]})
//         results: tours?.length,
//         data: {
//             tours
//         }
//     })
//     // } catch (err) {
//     //     res.status(400).json({
//     //         status: 'fail',
//     //         message: err
//     //     });
//     // }
// })

exports.aliasTopTours = async (req, res, next) => {
    req.query.sort = '-ratingsAverage,price';
    req.query.limit = 5;
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty'
    next();
}

//7.4 Get One Factory Handler
exports.getTour = factory.getOne(Tour, { path: 'reviews' })
// exports.getTour = catchAsync(async (req, res, next) => {
//     // Read Document by ID

//     //3.1. Populate
//     // const tour = await Tour.findById(req.params.id).populate('guides');
//     // const tour = await Tour.findById(req.params.id).populate({
//     //     path: 'guides',
//     //     select: "-__v -passwordChangesAt"
//     // });
//     const tour = await Tour.findById(req.params.id).populate('reviews');

//     if (!tour) {
//         return next(new AppError('No tour found with that ID', 404))
//     }
//     res.status(200).json({
//         status: "success",//success fail[err in the client] error[err in the server]})
//         data: {
//             tour
//         }
//     })

// })

//7.3. Delete Factory Handler
exports.createTour = factory.createOne(Tour);
// exports.createTour = catchAsync(async (req, res, next) => {
//     // Creating Document
//     const newTour = await Tour.create(req.body);

//     console.log("createTour()");
//     res.status(201).json({
//         status: 'success',
//         data: {
//             tour: newTour
//         }
//     })
// })


//7.2. Update Factory Handler
exports.updateTour = factory.updateOne(Tour);
// exports.updateTour = catchAsync(async (req, res, next) => {
//     // Update Document
//     const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,// to return the new updated document
//         runValidators: true//to rerun validators on the updated document
//     })

//     if (!tour) {
//         return next(new AppError('No tour found with that ID', 404))
//     }

//     res.status(200).json({
//         status: "success",
//         data: {
//             tour
//         }
//     })
// })


//7.1. Delete Factory Handler
exports.deleteTour = factory.deleteOne(Tour);
// exports.deleteTour = catchAsync(async (req, res, next) => {
//     // Delete Documents

//     const tour = await Tour.findByIdAndDelete(req.params.id)

//     if (!tour) {
//         return next(new AppError('No tour found with that ID', 404))
//     }

//     res.status(204).json({
//         // This isn't returned bec 204 no content
//         status: "success",
//         data: null
//     })
// })

// Aggregation
exports.getTourStats = catchAsync(async (req, res, next) => {
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
})


exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
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
            $limit: 12
        }
    ])

    res.status(200).json({
        status: "success",
        data: {
            plan
        }
    })
})


exports.getToursWithin = catchAsync(async (req, res, next) => {
    const { distance, latlng, unit } = req.params;
    const [lat, lng] = latlng.split(',');


    if (!lat || !lng) {
        next(new AppError('Please provide latitude and longitude in the format lag,lng.', 400));
    }

    //$geoWithin search with a geometry
    const radius = unit == "mi" ? distance / 3963.2 : distance / 6378.1// divide by radius of the earth else KM
    const tours = await Tour.find({ startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } } });
    res.status(200).json({
        status: "success",
        results: tours.length,
        data: {
            data: tours
        }
    })
    //don't forget to index the Tour by start Location  for better performance

})

exports.getDistances = catchAsync(async (req, res, next) => {
    const { latlng, unit } = req.params;
    const [lat, lng] = latlng.split(',');
    const multiplier = unit === 'mi' ? 0.000621371 : 0.001;


    if (!lat || !lng) {
        next(new AppError('Please provide latitude and longitude in the format lag,lng.', 400));
    }

    //Cal
    const distances = await Tour.aggregate([
        {
            //must be the first space
            $geoNear: {
                //will automatically use the special index(startLocation) with 2dsphere bec we have specified only 1 if there is more than 2 index with 
                //2dsphere we have here to specify the key to be used
                near: {
                    type: 'Point',
                    coordinates: [lng * 1, lat * 1]
                },
                distanceField: 'distance',
                distanceMultiplier: multiplier// convert distance to KM   /1000
            }
        },
        {
            $project: {
                distance: 1,
                name: 1

            }
        }
    ]);
    res.status(200).json({
        status: "success",
        data: {
            data: distances
        }
    })
})
