const express = require('express')
const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const authController = require('../controller/authenticationController')
const viewController = require('../controller/viewController')
console.log('hello world')
router.get('/' , viewController.getHomePage);
router.get('/about' , viewController.about);
router.get('/login' , viewController.login);
router.get('/signup' , viewController.signup);
router.get('/user',authController.protect, viewController.user);
router.get('/order',authController.protect , viewController.order);
router.get('/Add-Funds', viewController.addFunds);
router.get('/contact',viewController.contact);

module.exports = router;