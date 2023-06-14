const Review = require('../models/reviewModel')
const APIFeatures = require('../utils/apiFeatures')
const catchAsync = require('../utils/catchAsync')
const { getTourStats } = require('./tourController')

exports.getAllReviews = catchAsync(async (req, res, next) => {
    //if tourId is passed just return reviews om this your
    let filter = {}
    if (req.params.tourId) filter = { tour: req.params.tourId }
    const reviews = await Review.find(filter).populate('tour');


    res.status(200).json({
        status: "success",
        results: reviews.length,
        data: {
            reviews
        }
    })
})


exports.createReview = catchAsync(async (req, res, next) => {
    const newReview = await Review.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            review: newReview
        }
    })
})