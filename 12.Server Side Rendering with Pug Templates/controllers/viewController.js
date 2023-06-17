const Tour = require('../models/tourModel')
const catchAsync = require('../utils/catchAsync')

exports.getOverview = catchAsync(async (req, res) => {
    //1) Get Tour data from collection
    const tours = await Tour.find({})

    //2) Build template
    //3) Build that template using tour data from 1)
    res.status(200).render('overview', {
        title: "All Tours",
        tours
    })
});

exports.getTour = (req, res) => {
    res.status(200).render('tour', {
        title: "The Forest Hiker"
    })
}