const express = require('express')

const reviewController = require('../controllers/reviewController')
const authController = require('../controllers/authController')


//6.2. we need to merge para,s to be able to access tourId from the nested route tour
const router = express.Router({ mergeParams: true })

router.route('/')
    .get(reviewController.getAllReviews)
    .post(authController.protect,
        authController.restrictTo('user'),
        reviewController.createReview)


module.exports = router