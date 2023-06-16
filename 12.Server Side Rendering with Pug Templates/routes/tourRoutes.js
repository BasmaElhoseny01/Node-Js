const express = require('express');
// const tourController = require('../controllers/tourController');
//Note for this export we need same name are in the controllers file
const {
  getAllTours,
  aliasTopTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  getTourStats,
  getMonthlyPlan,
  getToursWithin,
  getDistances
} = require('../controllers/tourController');
const authController = require('./../controllers/authController');

const router = express.Router();
//import reviews router
const reviewRouter = require('./reviewRoutes')



//Param middle ware its handler (req,res,next,val)
// router.param('id', checkID);


// Nested Routes Our aim is to have
// POST /tour/1235ds//reviews  [add reviews on this tour]
// GET /tour/1235ds//reviews  [get all reviews on this tour]
// GE /tour/1235ds//reviews  [get specific review on this tour]
router.use('/:tourId/reviews', reviewRouter) //same id as we mount routes in app.js

//Aliasing
//alias to request provided regularly 5 best and cheapest
// so will still call getallTour but we only need to add some query elements in the query so use middleware 🕛
router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    getMonthlyPlan);

//Geographical
router.route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(getToursWithin)

//like the above but get the distance between each tour start location and the latlng passed
router.route('/distances/:latlng/unit/:unit')
.get(getDistances)


// /tours-within/233/center/-40,45/unit/mi
router
  .route('/')
  .get(getAllTours)//we need any one to get our tours
  .post(
    authController.protect,//We need to protect tours models such that they aren't get if the user isn't logged in[protect middle ware]
    //MiddleWare Chaining :D
    authController.restrictTo('admin', 'lead-guide'),
    createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    updateTour)
  //Authentication -Authorization -Controller to delete function
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    deleteTour);//This can't be done by any user even logged in[Authentication] only admins can do so Authorization

module.exports = router;