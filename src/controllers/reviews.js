const Review = require("../models/Review");
const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middlewares/async");

// @desc    - Read all reviews or Read all reviews by bootcamp id.
// @route   - GET /api/v1/reviews
// @route   - GET /api/v1/bootcamps/:bootcampId/reviews
// @access - Public
exports.readAllReviews = asyncHandler(async (req, res, next) => {
  const { bootcampId } = req.params;
  if (bootcampId) {
    const reviews = await Review.find({
      bootcamp: bootcampId,
    });
    res.status(200).json({
      success: true,
      message: `Successfully read all reviews by bootcamp id : ${bootcampId}`,
      data: {
        count: reviews.length,
        reviews,
      },
    });
  } else {
    res.status(200).json({
      message: "Successfully read all reviews",
      ...res.advancedResults,
    });
  }
});
