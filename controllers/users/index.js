const signupUser = require("./signupUser");
const loginUser = require("./loginUser");
const getCurrentUser = require("./getCurrentUser");
const logoutUser = require("./logoutUser");
const updateStatusUser = require("./updateStatusUser");
const updateAvatar = require("./updateAvatar");
const verify = require("./verify");
const resendVerifyEmail = require("./resendVerifyEmail");

module.exports = {
  signupUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  updateStatusUser,
  updateAvatar,
  verify,
  resendVerifyEmail,
};
