const { Router } = require("express");

const {
  readCurrentLoggedInUser,
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");

const { protect } = require("../middlewares/auth");

const authRoute = Router();
authRoute.route("/me").get(protect, readCurrentLoggedInUser);
authRoute.route("/register").post(registerUser);
authRoute.route("/login").post(loginUser);
authRoute.route("/forgot-password").post(forgotPassword);
authRoute.route("/reset-password/:resetToken").put(resetPassword);

module.exports = authRoute;
