const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");
const sendEmail = require("../utils/sendEmail");
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
// @route   - GET /api/v1/auth/me
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

// @desc    - Forgot password.
// @route   - POST /api/v1/auth/forgot-password
// @access - Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    const errorMessage = "There is no user with that email.";
    return next(new ErrorResponse(errorMessage, 400));
  }

  const resetToken = user.readResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  console.log(resetToken);

  const resetUrl = `${req.protocol}://${req.get(
    "host",
  )}/api/v1/reset-password/${resetToken}`;
  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password Reset Token",
      message,
    });
    res.status(200).json({
      success: true,
      message: "Email sent",
    });
  } catch (error) {
    console.log(error);
    user.resetPasswordToken = undefined;
    user.resetPasswordFinish = undefined;

    await user.save({ validateBeforeSave: false });
    const errorMessage = "Email could not be sent.";
    return next(new ErrorResponse(errorMessage, 500));
  }

  res.status(200).json({
    success: true,
    /* message: "Forgotten password reset token", */
    data: { user },
  });
});
