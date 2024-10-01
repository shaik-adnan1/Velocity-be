const constants = require("../constants/constants");

const successResponse = (details) => {
  return {
    code: constants.SUCCESS_CODE,
    status: constants.SUCCESS_STATUS,
    message: constants.SUCCESS_MESSAGE,
    details,
  };
};

const customResponse = (code, status, message, details) => {
  return {
    code,
    status,
    message,
    details,
  };
};

module.exports = {
  successResponse,
  customResponse,
};
