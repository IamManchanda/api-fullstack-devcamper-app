const { Router } = require("express");

const { registerUser } = require("../controllers/auth");

const authRoute = Router();
authRoute.route("/register").post(registerUser);

module.exports = authRoute;
