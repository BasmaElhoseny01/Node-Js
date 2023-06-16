const mongoose = require('mongoose');
const Tour = require('./tourModel')

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'Review can not be empty']
    },

    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    tour: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tour',
        required: [true, 'Review must belong to a tour']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a user']
    }
}
    , {
        toJSON: { virtuals: true },//When we get as Json Make virtuals Appear
        toObject: { virtuals: true }
    }

)


reviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: "user",
        select: "name photo"
    })
    // .populate({
    //     path: "tour",
    //     select: "name"
    // })
    next();
})

//10. Static method
reviewSchema.statics.calAverageRatings = async function (tourId) {
    //this in static method point to the model
    //We need to use aggregate  rem aggregate returns a promise
    const stats = await this.aggregate([
        {
            $match: { tour: tourId }
        },
        {
            $group: {
                _id: '$tour',//$attribute
                nRating: { $sum: 1 },//num of ratings
                avgRating: { $avg: '$rating' }
            }
        }
    ])

    //update the tour
    await Tour.findByIdAndUpdate(tourId, { ratingsQuantity: stats[0].nRating, ratingsAverage: stats[0].avgRating })

}

// cal this static method to cal the avg after each save for a review
reviewSchema.post('save', function () {
    //this -> refers to the document being saved
    // Review.calAverageRatings(this.tour);//but note that Review isn't declared yet
    // Knowing that swapping this with the line of Review Delectation will work but this middleware won't be called on this Model
    //sol use this.constructor ==> Review Model
    this.constructor.calAverageRatings(this.tour);
})

//findByIdAndUpdate
//findByIdAndDelete
reviewSchema.pre(/^findOneAnd/, async function (next) {
    //here we don't have access to the tourId just the review Id
    //this -> query
    this.r = await this.findOne(); //save result in this(document) r to be able to access it in the post middle ware
    console.log(this.r);
    next();
})

reviewSchema.post(/^findOneAnd/,function () {
    //here after we have save the new review call back the calAverage using the tourId saved from the pre middleware
    this.r.constructor.calAverageRatings(this.r.tour); //this.r is the document
})


const Review = mongoose.model('Review', reviewSchema);

//Default Export
module.exports = Review 