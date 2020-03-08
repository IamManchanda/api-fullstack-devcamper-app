const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middlewares/async");

const { JWT_COOKIE_FINISH } = process.env;

const sendTokenResponse = (user, statusCode, res, message) => {
  const token = user.readSignedJwtToken();
  const options = {
    expires: new Date(Date.now() + JWT_COOKIE_FINISH * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      message,
      data: { token },
    });
};

// @desc    - Read current logged in user.
// @route   - POST /api/v1/auth/me
// @access - Private
exports.readCurrentLoggedInUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    message: "Read current logged in user successfully.",
    data: { user },
  });
});

// @desc    - Register user.
// @route   - POST /api/v1/auth/register
// @access - Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, role, password } = req.body;
  const user = await User.create({ name, email, role, password });

  const successMessage = "Successfully registered the user.";
  sendTokenResponse(user, 200, res, successMessage);
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

  const successMessage = "User has logged in successfully.";
  sendTokenResponse(user, 200, res, successMessage);
});
