const constants = require("../constants/constants");
const { customResponse } = require("../utils/customResponse");

const mongooseErrorHandler = (error) => {
  // Log unexpected error and return custom error response
  console.log("Error message:", error.message || error);

  if (error.name === "ValidationError") {
    const errors = Object.keys(error.errors).map((key) => ({
      field: key,
      message: error.errors[key].message,
    }));

    console.log("errors", error);

    return customResponse(
      constants.VALIDATION_ERROR,
      constants.FAILURE_STATUS,
      "Validation failed",
      errors
    );
    // {
    //   code: constants.VALIDATION_ERROR,
    //   message: "Validation failed",
    //   details: errors,
    // };
  }

  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    return customResponse(
      constants.DUPLICATE_KEY_ERROR,
      constants.FAILURE_STATUS,
      `Duplicate value for ${field}`,
      {
        field,
        value: error.keyValue[field],
      }
    );
    // {
    //   code: constants.DUPLICATE_KEY_ERROR,
    //   message: `Duplicate value for ${field}`,
    //   details: {
    //     field,
    //     value: error.keyValue[field],
    //   },
    // };
  }

  return customResponse(
    constants.SOMETHING_WENT_WRONG,
    constants.FAILURE_STATUS,
    "An unexpected error occurred",
    error.message || "Unknown error"
  );
  // {
  //   code: constants.SOMETHING_WENT_WRONG,
  //   message: "An unexpected error occurred",
  //   details: error.message || "Unknown error",
  // };
};

module.exports = {
  mongooseErrorHandler,
};
