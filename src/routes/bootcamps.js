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

const bootcampsRoute = Router();

bootcampsRoute.use("/:bootcampId/courses", coursesRoute);

bootcampsRoute
  .route("/")
  .get(readAllBootcamps)
  .post(createNewBootcamp);

bootcampsRoute
  .route("/:id")
  .get(readBootcampById)
  .put(updateBootcampById)
  .delete(deleteBootcampById);

bootcampsRoute.route("/:id/photo").put(uploadPhotoForBootcampById);

bootcampsRoute
  .route("/radius/:zipcode/:distance")
  .get(readAllBootcampsByDistance);

module.exports = bootcampsRoute;
