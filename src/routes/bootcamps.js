const { Router } = require("express");
const coursesRoute = require("./courses");

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
const { protect } = require("../middlewares/auth");

const bootcampsRoute = Router();

bootcampsRoute.use("/:bootcampId/courses", coursesRoute);

bootcampsRoute
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), readAllBootcamps)
  .post(protect, createNewBootcamp);

bootcampsRoute
  .route("/:id")
  .get(readBootcampById)
  .put(protect, updateBootcampById)
  .delete(protect, deleteBootcampById);

bootcampsRoute.route("/:id/photo").put(protect, uploadPhotoForBootcampById);

bootcampsRoute
  .route("/radius/:zipcode/:distance")
  .get(readAllBootcampsByDistance);

module.exports = bootcampsRoute;
