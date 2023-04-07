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

const router = express.Router();

//Param middle ware its handler (req,res,next,val)
// router.param('id', checkID);

//12.Aliasing
//alias to request provided regularly 5 best and cheapest
// so will still call getallTour but we only need to add some query elements in the query so use middleware 🕛
router.route('/top-5-cheap').get(aliasTopTours,getAllTours);

router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);

router
  .route('/')
  // .get(tourController.getAllTours) //Case of using the commented export above 😀
  .get(getAllTours)
  //MiddleWare Chaining :D
  .post(createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

module.exports = router;
