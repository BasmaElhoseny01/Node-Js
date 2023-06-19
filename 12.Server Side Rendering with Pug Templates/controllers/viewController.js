const Tour = require('../models/tourModel')
const catchAsync = require('../utils/catchAsync')

exports.getOverview = catchAsync(async (req, res, next) => {
    //1) Get Tour data from collection
    const tours = await Tour.find({})

    //2) Build template
    //3) Build that template using tour data from 1)
    res.status(200).render('overview', {
        title: "All Tours",
        tours
    })
});

exports.getTour = async (req, res) => {
    const tour = await Tour.findOne({ slug: req.params.slug }).populate({
        path: "reviews",
        fields: 'review rating user'
    })
    res.status(200).render('tour', {
        title: tour.name,
        tour
    })
}

exports.getLogInForm = async (req, res) => {
    res.status(200).render('login', {
        title: 'Log into your account'
    })
}