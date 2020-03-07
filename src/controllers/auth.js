const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middlewares/async");

// @desc    - Register user.
// @route   - GET /api/v1/auth/register
// @access - Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(200).json({
    success: true,
    message: "Successfully registered the user.",
  });
});
