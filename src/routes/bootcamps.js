const { Router } = require("express");

const {
  readAllBootcamps,
  readAllBootcampsByDistance,
  readBootcampById,
  createNewBootcamp,
  updateBootcampById,
  uploadPhotoForBootcampById,
  deleteBootcampById,
} = require("../controllers/bootcamps");

const Bootcamp = require("../models/Bootcamp");
const advancedResults = require("../middlewares/advanced-results");
const { protect, authorize } = require("../middlewares/auth");
const coursesRoute = require("./courses");
const reviewsRoute = require("./reviews");

const bootcampsRoute = Router();

bootcampsRoute.use("/:bootcampId/courses", coursesRoute);
bootcampsRoute.use("/:bootcampId/reviews", reviewsRoute);

bootcampsRoute
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), readAllBootcamps)
  .post(protect, authorize("publisher", "admin"), createNewBootcamp);

bootcampsRoute
  .route("/:id")
  .get(readBootcampById)
  .put(protect, authorize("publisher", "admin"), updateBootcampById)
  .delete(protect, authorize("publisher", "admin"), deleteBootcampById);

bootcampsRoute
  .route("/:id/photo")
  .put(protect, authorize("publisher", "admin"), uploadPhotoForBootcampById);

bootcampsRoute
  .route("/radius/:zipcode/:distance")
  .get(readAllBootcampsByDistance);

module.exports = bootcampsRoute;
