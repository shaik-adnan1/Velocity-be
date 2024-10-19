const express = require("express");

const otpController = require("../controller/otpController");
const userDetailsController = require("../controller/userController");

const router = express.Router();

router.route("/otp").post(otpController.sendOtp);
// router.route("/test").post(otpController.test);
// router.route("/test/verify").post(otpController.testVerify);
router.route("/otp/verify").post(otpController.verifyOtp);

router.route("/createUser").post(userDetailsController.createUser);

module.exports = router;
