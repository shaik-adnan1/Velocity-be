const constants = require("../constants/constants");
const { customResponse } = require("../utils/customResponse");

const mongooseErrorHandler = (error) => {
  if (error.name === "ValidationError") {
    const errors = Object.keys(error.errors).map((key) => ({
      field: key,
      message: error.errors[key].message,
    }));

    return customResponse(
      constants.VALIDATION_ERROR,
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

  console.log("error.message", error.message);

  return customResponse(
    constants.SOMETHING_WENT_WRONG,
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
