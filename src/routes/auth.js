const { Router } = require("express");

const {
  readCurrentLoggedInUser,
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  updateUserDetails,
  updateUserPassword,
} = require("../controllers/auth");

const { protect } = require("../middlewares/auth");

const authRoute = Router();
authRoute.route("/me").get(protect, readCurrentLoggedInUser);
authRoute.route("/me/update-details").put(protect, updateUserDetails);
authRoute.route("/me/update-password").put(protect, updateUserPassword);
authRoute.route("/register").post(registerUser);
authRoute.route("/login").post(loginUser);
authRoute.route("/forgot-password").post(forgotPassword);
authRoute.route("/reset-password/:resetToken").put(resetPassword);

module.exports = authRoute;
