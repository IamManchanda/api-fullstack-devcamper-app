const ErrorResponse = require("../utils/ErrorResponse");

const errorHandler = (error, req, res, next) => {
  let localError = { ...error };
  localError.message = error.message;

  if (error.name === "CastError") {
    const errorMessage = `Bootcamp not found based on provided id: ${error.value}`;
    localError = new ErrorResponse(errorMessage, 404);
  }

  if (error.code === 11000) {
    const errorMessage = `Duplicate field value entered`;
    localError = new ErrorResponse(errorMessage, 400);
  }

  if (error.name === "ValidationError") {
    const errorMessage = Object.values(error.errors).map(val => val.message);
    localError = new ErrorResponse(errorMessage, 400);
  }

  res.status(localError.statusCode || 500).json({
    success: false,
    error: localError.message || "Server error",
  });
};

module.exports = errorHandler;
