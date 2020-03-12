const { Router } = require("express");

const {
  readAllReviews,
  readReviewById,
  createNewReviewByBootcampId,
  updateReviewById,
  deleteReviewById,
} = require("../controllers/reviews");

const Review = require("../models/Review");
const advancedResults = require("../middlewares/advanced-results");
const { protect, authorize } = require("../middlewares/auth");

const reviewsRoute = Router({ mergeParams: true });
reviewsRoute
  .route("/")
  .get(
    advancedResults(Review, {
      path: "bootcamp",
      select: "name description",
    }),
    readAllReviews,
  )
  .post(protect, authorize("user", "admin"), createNewReviewByBootcampId);
reviewsRoute
  .route("/:id")
  .get(readReviewById)
  .put(protect, authorize("user", "admin"), updateReviewById)
  .delete(protect, authorize("user", "admin"), deleteReviewById);

module.exports = reviewsRoute;
