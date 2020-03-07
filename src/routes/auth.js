const { Router } = require("express");

const { registerUser, loginUser } = require("../controllers/auth");

const authRoute = Router();
authRoute.route("/register").post(registerUser);
authRoute.route("/login").post(loginUser);

module.exports = authRoute;
