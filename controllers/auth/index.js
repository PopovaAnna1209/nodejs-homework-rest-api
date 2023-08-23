const { ctrlWrapper } = require("../../helpers");

const signup = require("./signup");
const signin = require("./signin");
const getCurrentUser = require("../users/getCurrentUser");
const signout = require("./signout");
const resendEmail = require("./resendEmail");
const verifyEmail = require("./verifyEmail");

module.exports = {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  signout: ctrlWrapper(signout),
  resendEmail: ctrlWrapper(resendEmail),
  verifyEmail: ctrlWrapper(verifyEmail),
};