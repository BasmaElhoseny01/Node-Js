const express = require('express');
// const tourController = require('../controllers/tourController');
//Note for this export we need same name are in the controllers file
const {
  checkBody,
  checkID,
  getAllTours,
  addNewTour,
  getTour,
  updateTour,
  deleteTour,
} = require('../controllers/tourController');

const router = express.Router();

//MiddleWare
//Param middle ware ist handler (req,res,next,val)
router.param('id', checkID);
router.use(checkBody);

router
  .route('/')
  // .get(tourController.getAllTours) //Case of using the commented export above 😀
  .get(getAllTours)
  //MiddleWare Chaining :D
  .post(checkBody, addNewTour);

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
