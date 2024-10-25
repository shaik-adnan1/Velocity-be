const express = require("express");

const otpController = require("../controller/otpController");
const userDetailsController = require("../controller/userController");

const router = express.Router();

router.route("/otp").post(otpController.sendOtp);
// router.route("/test").post(otpController.test);
// router.route("/test/verify").post(otpController.testVerify);
router.route("/otp/verify").post(otpController.verifyOtp);

// validate if provided number exists in DB? returns the user data : creates a new user in DB.
router.route("/validateNumber").post(userDetailsController.validateNumber);

router
  .route("/createUserProfile")
  .post(userDetailsController.createUserProfile);

module.exports = router;
