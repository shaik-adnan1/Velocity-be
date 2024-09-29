const express = require("express");

const otpController = require("../controller/otpController");
const userDetailsController = require("../controller/userController");

const router = express.Router();

router.route("/otp").post(otpController.sendOtp);

router.route("/createUser").post(userDetailsController.createUser);

module.exports = router;
