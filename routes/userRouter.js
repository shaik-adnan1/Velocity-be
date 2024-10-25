const express = require("express");

const { getUserDetails } = require("../services/getUserDetailsService");
const router = express.Router();

router.route("/").post(getUserDetails);

module.exports = router;
