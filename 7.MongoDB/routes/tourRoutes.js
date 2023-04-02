const express = require('express');
// const tourController = require('../controllers/tourController');
//Note for this export we need same name are in the controllers file
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
} = require('../controllers/tourController');

const router = express.Router();

//Param middle ware its handler (req,res,next,val)
// router.param('id', checkID);


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
