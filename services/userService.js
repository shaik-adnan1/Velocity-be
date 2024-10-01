const User = require("../models/userModel");
const { createUserValidation } = require("../services/validationService");
const { mongooseErrorHandler } = require("../utils/mongooseErrorHandler");

exports.createUserService = async (userDetails) => {
  // console.log("reqbody", req);
  // const { username, mobile, fistName, lastName } = userDetails;
  try {
    const validationErrors = createUserValidation(userDetails);
    if (validationErrors.length > 0) {
      return {
        status: "Failure",
        message: "Validation failed",
        details: validationErrors, // Return all validation errors at once
      };
    }

    const newUser = await User.create(userDetails);
    console.log(`Successfully created user ${newUser.username}`);

    return {
      status: "Success",
      message: "Received user details",
      details: {
        newUser,
      },
    };
  } catch (error) {
    const normalizedError = mongooseErrorHandler(error);
    return {
      status: "Failure",
      message: normalizedError.message,
      details: normalizedError.details,
    };
  }
};
