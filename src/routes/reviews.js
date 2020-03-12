const { Router } = require("express");

const { readAllReviews, readReviewById } = require("../controllers/reviews");

const Review = require("../models/Review");
const advancedResults = require("../middlewares/advanced-results");
const { protect, authorize } = require("../middlewares/auth");

const reviewsRoute = Router({ mergeParams: true });
reviewsRoute.route("/").get(
  advancedResults(Review, {
    path: "bootcamp",
    select: "name description",
  }),
  readAllReviews,
);
reviewsRoute.route("/:id").get(readReviewById);

module.exports = reviewsRoute;