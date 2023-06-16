// Factory Handlers
//Factory fun is a func that returns another func

const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const APIFeatures = require('../utils/apiFeatures');


exports.deleteOne = Model => catchAsync(async (req, res, next) => {
    console.log(req.params.id)
    // Delete Documents

    const doc = await Model.findByIdAndDelete(req.params.id)

    if (!doc) {
        return next(new AppError('No document found with that ID', 404))
    }

    res.status(204).json({
        // This isn't returned bec 204 no content
        status: "success",
        data: null
    })
})


exports.updateOne = Model => catchAsync(async (req, res, next) => {
    // Update Document
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,// to return the new updated document
        runValidators: true//to rerun validators on the updated document
    })

    if (!doc) {
        return next(new AppError('No document found with that ID', 404))
    }

    res.status(200).json({
        status: "success",
        data: {
            doc
        }
    })
})

exports.createOne = Model => catchAsync(async (req, res, next) => {
    // Creating Document
    const doc = await Model.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            data: doc
        }
    })
})


exports.getOne = (Model, popOptions) => catchAsync(async (req, res, next) => {
    // Read Document by ID
    let query = Model.findById(req.params.id);
    if (popOptions) {
        query = query.populate(popOptions);
    }
    const doc = await query;

    // const doc = await Model.findById(req.params.id).populate('reviews')

    if (!doc) {
        return next(new AppError('No document found with that ID', 404))
    }
    res.status(200).json({
        status: "success",//success fail[err in the client] error[err in the server]})
        data: {
            doc
        }
    })
})


exports.getAll = Model => catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    let filter = {}
    if (req.params.tourId) filter = { tour: req.params.tourId }

    const features = new APIFeatures(Model.find(filter), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate()
    const docs = await features.query;


    res.status(200).json({
        status: "success",//success fail[err in the client] error[err in the server]})
        results: docs?.length,
        data: {
            data: docs
        }
    })
})