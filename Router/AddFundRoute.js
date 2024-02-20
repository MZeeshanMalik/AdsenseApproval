const express = require("express");
const router = express.Router();
const FundController = require("../controller/addFundsController");
const authController = require("../controller/authenticationController");
router
  .route("/")
  .post(
    authController.protect,
    FundController.uploadUsePhoto,
    FundController.resizeUserPhoto,
    FundController.NewFund
  );
module.exports = router;
