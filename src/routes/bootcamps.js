const { Router } = require("express");

const {
  readAllBootcamps,
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

module.exports = bootcampsRoute;
