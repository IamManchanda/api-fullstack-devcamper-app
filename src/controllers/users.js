const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middlewares/async");

// @desc    - Read all users.
// @route   - GET /api/v1/auth/admin/users
// @access - Private/Admin
exports.readAllUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    message: "Successfully read all users",
    ...res.advancedResults,
  });
});

// @desc    - Read user by id.
// @route   - GET /api/v1/auth/admin/users/:id
// @access - Private/Admin
exports.readUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    success: true,
    message: `Successfully fetched user by id: ${req.params.id}`,
    data: { user },
  });
});

// @desc    - Create new user.
// @route   - POST /api/v1/auth/admin/users/
// @access - Private/Admin
exports.createNewUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({
    success: true,
    message: `Successfully fetched user by id: ${req.params.id}`,
    data: { user },
  });
});

// @desc    - Update user by id.
// @route   - PUT /api/v1/auth/admin/users/:id
// @access - Private/Admin
exports.updateUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    message: `Successfully fetched user by id: ${req.params.id}`,
    data: { user },
  });
});

// @desc    - Delete user by id.
// @route   - DELETE /api/v1/auth/admin/users/:id
// @access - Private/Admin
exports.deleteUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: `Successfully deleted user by id: ${req.params.id}`,
  });
});
