const express = require('express');

const otpController = require('../controller/otpController');

const router = express.Router();


router.route('/otp').post(otpController.sendOtp)

module.exports = router;

