const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middlewares/async");

// @desc    - Register user.
// @route   - POST /api/v1/auth/register
// @access - Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, role, password } = req.body;
  const user = await User.create({ name, email, role, password });
  const token = user.readSignedJwtToken();

  res.status(200).json({
    success: true,
    message: "Successfully registered the user.",
    data: { token },
  });
});

// @desc    - Login user.
// @route   - POST /api/v1/auth/login
// @access - Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const errorMessage = "Please provide an email and password.";
    return next(new ErrorResponse(errorMessage, 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    const errorMessage = "Invalid credentials.";
    return next(new ErrorResponse(errorMessage, 401));
  }

  const isMatchedUser = await user.matchPassword(password);

  if (!isMatchedUser) {
    const errorMessage = "Invalid credentials.";
    return next(new ErrorResponse(errorMessage, 401));
  }

  const token = user.readSignedJwtToken();

  res.status(200).json({
    success: true,
    message: "User has logged in successfully.",
    data: { token },
  });
});
