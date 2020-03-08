const { Router } = require("express");

const {
  readCurrentLoggedInUser,
  registerUser,
  loginUser,
} = require("../controllers/auth");

const { protect } = require("../middlewares/auth");

const authRoute = Router();
authRoute.route("/me").get(protect, readCurrentLoggedInUser);
authRoute.route("/register").post(registerUser);
authRoute.route("/login").post(loginUser);

module.exports = authRoute;
