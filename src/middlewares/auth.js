const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/ErrorResponse");
const User = require("../models/User");

const { JWT_SECRET } = process.env;

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } /* else if (req.cookies.token) {
    token = req.cookies.token;
  } */

  if (!token) {
    const errorMessage = "Not authorized to access this route.";
    return next(new ErrorResponse(errorMessage, 401));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    const errorMessage = "Not authorized to access this route.";
    return next(new ErrorResponse(errorMessage, 401));
  }
});
