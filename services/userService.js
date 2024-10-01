const bcrypt = require("bcryptjs");

const User = require("../models/userModel");
const constants = require("../constants/constants");
const { createUserValidation } = require("../services/validationService");
const { mongooseErrorHandler } = require("../utils/mongooseErrorHandler");
const { successResponse, customResponse } = require("../utils/customResponse");

exports.createUserService = async (userDetails) => {
  // console.log("reqbody", req);
  // const { username, mobile, fistName, lastName } = userDetails;

  const SALT_ROUNDS = 10;

  try {
    const validationErrors = createUserValidation(userDetails);
    if (validationErrors.length > 0) {
      return customResponse(
        constants.VALIDATION_ERROR,
        constants.FAILURE_STATUS,
        constants.INPUT_VALIDATION_FAIL,
        validationErrors
      );
    }

    const hashedPassword = await bcrypt.hash(userDetails.password, SALT_ROUNDS);
    userDetails.password = hashedPassword;

    // not storing confirm password into DB
    delete userDetails.confirmPassword;

    const newUser = await User.create(userDetails);

    console.log(`Successfully created user ${newUser.username}`);

    return successResponse({
      newUser,
    });
  } catch (error) {
    const normalizedError = mongooseErrorHandler(error);
    return customResponse(
      constants.VALIDATION_ERROR,
      constants.FAILURE_STATUS,
      normalizedError.message,
      normalizedError.details
    );
    
    // {
    //   code: constants.VALIDATION_ERROR,
    //   status: "Failure",
    //   message: normalizedError.message,
    //   details: normalizedError.details,
    // };
  }
};
