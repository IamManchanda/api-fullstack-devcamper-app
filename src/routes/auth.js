const { Router } = require("express");

const {
  readLoggedInUser,
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  updateLoggedInUserDetails,
  updateLoggedInUserPassword,
} = require("../controllers/auth");

const { protect } = require("../middlewares/auth");

const authRoute = Router();
authRoute.route("/me").get(protect, readLoggedInUser);
authRoute.route("/me/update-details").put(protect, updateLoggedInUserDetails);
authRoute.route("/me/update-password").put(protect, updateLoggedInUserPassword);
authRoute.route("/register").post(registerUser);
authRoute.route("/login").post(loginUser);
authRoute.route("/forgot-password").post(forgotPassword);
authRoute.route("/reset-password/:resetToken").put(resetPassword);

module.exports = authRoute;
