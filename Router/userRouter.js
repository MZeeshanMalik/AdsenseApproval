const express = require("express");
const router = express.Router();
const userController = require('../controller/userController')
const authController = require('../controller/authenticationController')

// Users Routes

router.route('/').get(authController.protect ,userController.getAllUsers);
router.route('/signup').post(authController.signup)
router.route('/login').post(authController.login)
router.route('/logout').get(authController.logout)
router.route('/forgotPassword').post(authController.forgotPassword)
router.route('/resetPassword/:token').patch(authController.resetPassword)

module.exports = router;