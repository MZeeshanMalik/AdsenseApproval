const orderController = require('../controller/orderController')
const express = require('express')
const authController = require('../controller/authenticationController')
const router = express.Router();

router.route('/api/v1').post(orderController.createNeworder);
module.exports = router
