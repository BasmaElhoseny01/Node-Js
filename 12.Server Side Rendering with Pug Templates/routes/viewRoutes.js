const express = require('express')
const router = express.Router();
const viewController = require('../controllers/viewController')
const authController = require('../controllers/authController')

router.use(authController.isLoggedIn)//make this middle ware called before all the coming routes

router.get('/', viewController.getOverview) //pug
router.get('/tours/:slug', viewController.getTour) //pug
router.get('/login', viewController.getLogInForm) //pug


module.exports = router;