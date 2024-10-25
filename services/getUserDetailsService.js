const { User } = require("../models/userModel");

exports.getUserDetails = async (userFetchData) => {
  console.log("userFetchData", userFetchData);
  let user = await User.findOne(userFetchData);
  console.log("user details at getUserDetails", user);
  return user;
};
