const { Router } = require("express");

const {
  readCurrentLoggedInUser,
  registerUser,
  loginUser,
  forgotPassword,
} = require("../controllers/auth");

const { protect } = require("../middlewares/auth");

const authRoute = Router();
authRoute.route("/me").get(protect, readCurrentLoggedInUser);
authRoute.route("/register").post(registerUser);
authRoute.route("/login").post(loginUser);
authRoute.route("/forgot-password").post(forgotPassword);

module.exports = authRoute;
