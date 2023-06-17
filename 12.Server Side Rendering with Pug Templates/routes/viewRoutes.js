const express = require('express')
const router = express.Router();
const viewController = require('../controllers/viewController')

router.get('/', viewController.getOverview) //pug
router.get('/tour', viewController.getTour) //pug

module.exports = router;