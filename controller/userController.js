const { createUserService } = require("../services/userService");

exports.createUser = async (req, res) => {
  const userDetails = req.body;
  console.log("user details ", userDetails);
  try {
    const createUserResponse = await createUserService(userDetails);
    return res.json(createUserResponse);
  } catch (error) {
    console.log(`error getting user details -- Error: -- ${error}`);
    return res.status(500).json(error);
  }
};
