const ErrorResponse = require("../utils/ErrorResponse");

const errorHandler = (error, req, res, next) => {
  console.log(error.stack ? error.stack.red : null);

  let localError = { ...error };
  localError.message = error.message;

  if (error.name === "CastError") {
    const errorMessage = `Bootcamp not found based on provided id: ${error.value}`;
    localError = new ErrorResponse(errorMessage, 404);
  }
  res.status(localError.statusCode || 500).json({
    success: false,
    error: localError.message || "Server error",
  });
};

module.exports = errorHandler;
