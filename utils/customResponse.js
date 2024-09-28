const constants = require("../constants/constants");

const successResponse = (details) => {
  return {
    code: constants.SUCCESS_CODE,
    message: constants.SUCCESS_MESSAGE,
    details,
  };
};

const customResponse = (code, message, details) => {
  return {
    code,
    message,
    details,
  };
};

module.exports = {
  successResponse,
  customResponse,
};
