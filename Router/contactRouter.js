const contactController = require('../controller/contactController')
const express = require('express')
const authController = require('../controller/authenticationController')
const router = express.Router();

router.route('/').post(contactController.createNeworder);
module.exports = router
