const fs = require('fs')

//Import Tour Model
const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
    //3.1. Reading All Documents
    try {
        // Syntax:() so all documents are returned
        const tours = await Tour.find();

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