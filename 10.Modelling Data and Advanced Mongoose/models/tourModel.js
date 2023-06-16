//Creating Model and Schema

const mongoose = require('mongoose');
const slugify = require('slugify');


// const User = require('./userModel')
// const validator = require('validator')

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
        set: val => Math.round(val * 10) / 10//call back run every time value is set for ratingsAverage
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
    },
    //1.GeoJson   must have type:{} and coordinates[ latitude ,longitude ] so that it is detected as GeoJson
    startLocation: {
        type: {
            type: String,
            default: 'Point',
            enum: ['Point'],
        },
        coordinates: [Number],

        //Extra
        description: String,
        address: String,
    },
    locations: [
        {
            type: {
                type: String,
                default: 'Point',
                enum: ['Point'],
            },
            coordinates: [Number],

            //Extra
            description: String,
            address: String,
            day: Number,//Day of the tour in which the people will go to this location Ex start location has Day 0
        }
    ],
    // // 2.1. Embedding
    // guides: Array,
    // 3.1 Reference
    guides: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User',//User Schema no need to import it is just a string

    }]
}, {
    toJSON: { virtuals: true },//When we get as Json Make virtuals Appear
    toObject: { virtuals: true }
})


//9. Indexes  {{URL}}/v1/tours?price[lt]=1000
// tourSchema.index({ price: 1 });//1 asc -1 des

// 9.1. Compound index  {{URL}}/v1/tours?price[lt]=1000&ratingsAverage[gte]=4.7
tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ startLocation: '2dsphere' });


// Virtual Properties
tourSchema.virtual('durationWeeks').get(function () {
    //used regular function to be able to access this key word referring to the document
    return this.duration / 7;
    //Note these attribute can't be used in queries bec actually it isn't part of the schema
    // Don't forget to add the option that theses virtual options appear with the request by setting virtuals to true in the schema definition above
});

//5. Virtual population for the reviews of the tour instead of storing an array of the reviews' ids on each tour
tourSchema.virtual('reviews', {
    ref: 'Review',//Model to reference
    foreignField: 'tour',//the field  in the model referenced
    localField: "_id",//field in this model to be mapped to foreignField
})

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


// //2.2. Embed Guides Data in guides
// tourSchema.pre('save', async function (next) {
//     //this ==> Document being saved  [Not the body sent :D]

//     //Get the corresponding user for the guides id passed  
//     const guidesPromises = this.guides.map(async id => await User.findById(id));
//     //The above line returns an array of promises we need to convert to their repossess

//     this.guides = await Promise.all(guidesPromises);
//     next();
// })

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


//3.2. Populate Middle ware for guides in Tours
//Why pre not post when i tried post we got ids not populated so i think we need to populate first
tourSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'guides',
        select: "-__v -passwordChangeAt"
    });
    next();
})

// Post Query Execution
tourSchema.post(/^find/, function (docs, next) {
    //this ==> Query
    console.log(`Query Took ${Date.now() - this.start} milliseconds `)
    next();
})


// Aggregation MiddleWares
//The Problem is that we fixed that we don't get a secret tour when calling find
//But still the secret tour appears @ the tour stats ==> Aggregation 
// tourSchema.pre('aggregate', function (next) {
//     //this ???  see the console.log :D
//     console.log(this.pipeline())//this==> Aggregation Object here we use  pipeline() to see pipeline of the aggregation 
//     //So all we need to do is to add another stage of match at the beginning of the pipeline to match non secret tours
//     this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });

//     //shift ==> add to the end of the pipeline
//     next();
// })

// Creating Models = Like Classes that we use to create documents 
//Syntax:(Name of model, Schema)
//Note this name is used by Mongo to be Collection name + s 
const Tour = mongoose.model('Tour', tourSchema);

//Default Export
module.exports = Tour;