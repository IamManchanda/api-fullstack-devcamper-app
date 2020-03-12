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

// @desc    - Read review by id.
// @route   - GET /api/v1/reviews/:id
// @access - Public
exports.readReviewById = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description",
  });

  if (!review) {
    const errorMessage = `Review not found based on provided id: ${req.params.id}`;
    return next(new ErrorResponse(errorMessage, 404));
  }

  res.status(200).json({
    success: true,
    message: `Successfully fetched review by id: ${req.params.id}`,
    data: { review },
  });
});

// @desc    - Create new review by bootcamp id.
// @route   - POST /api/v1/bootcamps/:bootcampId/reviews
// @access - Private
exports.createNewReviewByBootcampId = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;
  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    const errorMessage = `Bootcamp not found based on provided id: ${req.params.bootcampId}`;
    return next(new ErrorResponse(errorMessage, 404));
  }

  const review = await Review.create(req.body);

  res.status(201).json({
    success: true,
    message: `Successfully created new review by bootcamp id : ${req.params.bootcampId}`,
    data: { review },
  });
});

// @desc    - Update review by id.
// @route   - PUT /api/v1/reviews/:id
// @access - Private
exports.updateReviewById = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);

  if (!review) {
    const errorMessage = `Review not found based on provided id: ${req.params.id}`;
    return next(new ErrorResponse(errorMessage, 404));
  }

  if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
    const errorMessage = `User: ${req.user.id} is not authorized to update this review`;
    return next(new ErrorResponse(errorMessage, 401));
  }

  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: `Successfully updated review by id: ${req.params.id}`,
    data: { review },
  });
});

// @desc    - Delete review by id.
// @route   - DELETE /api/v1/reviews/:id
// @access - Private
exports.deleteReviewById = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    const errorMessage = `Review not found based on provided id: ${req.params.id}`;
    return next(new ErrorResponse(errorMessage, 404));
  }

  if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
    const errorMessage = `User: ${req.user.id} is not authorized to delete this review`;
    return next(new ErrorResponse(errorMessage, 401));
  }

  await review.remove();

  res.status(200).json({
    success: true,
    message: `Successfully deleted review by id: ${req.params.id}`,
  });
});
