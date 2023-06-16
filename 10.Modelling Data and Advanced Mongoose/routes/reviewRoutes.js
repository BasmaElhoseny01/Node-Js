const express = require('express')

const authController = require('../controllers/authController')
const reviewController = require('../controllers/reviewController')


//6.2. we need to merge para,s to be able to access tourId from the nested route tour
const router = express.Router({ mergeParams: true })

//Authenticated :D
router.use(authController.protect);

router.route('/')
    .get(reviewController.getAllReviews)
    .post(
        authController.restrictTo('user'),
        reviewController.setTourUserIds,
        reviewController.createReview)

router.route('/:id')
    .get(reviewController.getReview)
    .patch(authController.restrictTo('user', 'admin'), reviewController.updateReview)
    .delete(authController.restrictTo('user', 'admin'), reviewController.deleteReview);


module.exports = router