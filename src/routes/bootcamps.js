const { Router } = require("express");

const {
  readAllBootcamps,
  readAllBootcampsByDistance,
  readBootcampById,
  createNewBootcamp,
  updateBootcampById,
  deleteBootcampById,
} = require("../controllers/bootcamps");

const bootcampsRoute = Router();
bootcampsRoute
  .route("/")
  .get(readAllBootcamps)
  .post(createNewBootcamp);
bootcampsRoute
  .route("/:id")
  .get(readBootcampById)
  .put(updateBootcampById)
  .delete(deleteBootcampById);
bootcampsRoute
  .route("/radius/:zipcode/:distance")
  .get(readAllBootcampsByDistance);

module.exports = bootcampsRoute;
