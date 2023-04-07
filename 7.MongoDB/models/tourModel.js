//1. Creating Model and Schema

const mongoose = require('mongoose');

// Schema
const tourSchema = new mongoose.Schema({
    //Simply it can be name:String 
    name: {
        type: String,
        required: [true, "A tour must have a name"],
        unique: true,
        trim: true
    },
    duration: {
        type: Number,
        required: [true, "A tour must have a duration"],
    },
    maxGroupSize: {
        type: Number,
        required: [true, "A tour must have a group size"],
    },
    difficulty: {
        type: String,
        required: [true, "A tour must have a difficulty"],
    },
    ratingsQuantity: {
        type: Number,
        default: 0
        // Not required bec its isn't the user's responsibility to cal these values they are calculated automatically from the reviews we got on the tour
    },
    ratingsAverage: {
        type: Number,
        default: 4.5
        // Not required bec its isn't the user's responsibility to cal these values they are calculated automatically from the reviews we got on the tour
    },
    price: {
        type: Number,
        required: [true, "A tour must have a price"]
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true,//Trim space @ begin and end of the string
    },
    description: {
        type: String,
        trim: true,//Trim space @ begin and end of the string
    },
    imageCover: {
        type: String,
        required: true
    },
    images: [String],// 🔴🔴 Array of strings
    createdAt: {
        type: Date,
        default: Date.now(),
        // 10.b.Fields Limiting (Exclude field from Schema so not to be shown)
        select:false
    },
    startDates: [Date]
})

// Creating Models = Like Classes that we use to create documents 
//Syntax:(Name of model, Schema)
//Note this name is used by Mongo to be Collection name + s 
const Tour = mongoose.model('Tour', tourSchema);

//Default Export
module.exports = Tour;