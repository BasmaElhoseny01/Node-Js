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
  getMonthlyPlan
} = require('../controllers/tourController');
const authController = require('./../controllers/authController');

const router = express.Router();

//Param middle ware its handler (req,res,next,val)
// router.param('id', checkID);

//Aliasing
//alias to request provided regularly 5 best and cheapest
// so will still call getallTour but we only need to add some query elements in the query so use middleware 🕛
router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, getAllTours)//We need to protect tours models such that they aren't get if the user isn't logged in[protect middle ware]
  //MiddleWare Chaining :D
  .post(createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  //Authentication -Authorization -Controller to delete function
  .delete(authController.protect, authController.restrictTo('admin', 'lead-guide'), deleteTour);//This can't be done by any user even logged in[Authentication] only admins can do so Authorization

module.exports = router;
