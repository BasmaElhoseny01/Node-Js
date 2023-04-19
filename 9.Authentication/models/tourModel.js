//Creating Model and Schema

const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator')

// Schema
const tourSchema = new mongoose.Schema({
    //Simply it can be name:String 
    name: {
        type: String,
        required: [true, "A tour must have a name"],
        unique: true,
        trim: true,
        maxlength: [40, 'A Tour name must have less than or equal 40 characters'],
        minlength: [10, 'A Tour name must have more than or equal 10 characters'],
        // validate: [validator.isAlpha, 'Tour must contain only characters']
    },
    slug: String,
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
        enum: {
            values: ['easy', 'medium', 'difficult'],
            message: "Difficulty is either easy , medium or difficult"
        }
    },
    ratingsQuantity: {
        type: Number,
        default: 0
        // Not required bec its isn't the user's responsibility to cal these values they are calculated automatically from the reviews we got on the tour
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        // Not required bec its isn't the user's responsibility to cal these values they are calculated automatically from the reviews we got on the tour
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
    },
    price: {
        type: Number,
        required: [true, "A tour must have a price"]
    },
    priceDiscount: {
        type: Number,
        validate: {
            message: "Discount price should be below regular price",
            validator: function (val) {
                //val ==> value inserted for the priceDiscount
                return val < this.price;
            }
        }
    },
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
        //Fields Limiting (Exclude field from Schema so not to be shown)
        select: false
    },
    startDates: [Date],
    secretTour: {
        type: Boolean,
        default: false
    }
}, {
    toJSON: { virtuals: true },//When we get as Json Make virtuals Appear
    toObject: { virtuals: true }
})


// Virtual Properties
tourSchema.virtual('durationWeeks').get(function () {
    //used regular function to be able to access this key word referring to the document
    return this.duration / 7;
    //Note these attribute can't be used in queries bec actually it isn't part of the schema
    // Don't forget to add the option that theses virtual options appear with the request by setting virtuals to true in the schema definition above
});


// Document Middle Ware
//Pre Save Hook runs before save() and create()
tourSchema.pre('save', function (next) {
    //this ==> Document being saved
    console.log("Before Document being saved")
    this.slug = slugify(this.name, { lower: true });
    next();
})
//Multiple Middle ware for the same Hook (Save Hook) 
tourSchema.pre('save', function (next) {
    //this ==> Document being saved
    console.log("Called After Above Middle Ware 😉")
    next();
})

//POST
tourSchema.post('save', function (doc, next) {
    //doc already saved document
    console.log(doc)
    next();

})


// Query Middle Ware
//This is find hook so it is executed before find query 😎
// tourSchema.pre('find', function (next) {
tourSchema.pre(/^find/, function (next) {
    // this ➡ Query
    this.find({ secretTour: { $ne: true } });

    this.start = Date.now();
    next()
})

// The Above find hook works for find but not for findOne 😭
//Sol(1) redefine new findOne hook 
// tourSchema.pre('findOne', function (next) {
//     // this ➡ Query
//     this.find({ secretTour: { $ne: true } });
//     next()
// })
//Sol(2) Use Regular Expressions ==> Shown Above 👆 

// Post Query Execution
tourSchema.post(/^find/, function (docs, next) {
    //this ==> Query
    console.log(`Query Took ${Date.now() - this.start} milliseconds `)
    next();
})


// Aggregation MiddleWares
//The Problem is that we fixed that we don'y get a secret tour when calling find
//But still the secret tour appears @ the tour stats ==> Aggregation 
tourSchema.pre('aggregate', function (next) {
    //this ???  see the console.log :D
    console.log(this.pipeline())//this==> Aggregation Object here we use  pipeline() to see pipeline of the aggregation 
    //So all we need to do is to add another stage of match at the beginning of the pipeline to match non secret tours
    this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });

    //shift ==> add to the end of the pipeline
    next();
})

// Creating Models = Like Classes that we use to create documents 
//Syntax:(Name of model, Schema)
//Note this name is used by Mongo to be Collection name + s 
const Tour = mongoose.model('Tour', tourSchema);

//Default Export
module.exports = Tour;