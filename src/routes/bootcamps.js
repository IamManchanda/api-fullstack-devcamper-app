const { Router } = require("express");

const {
  readAllBootcamps,
  readBootcampById,
  createNewBootcamp,
  updateBootcampById,
  deleteBootcampById,
} = require("../controllers/bootcamps");

const bootcampsRoutes = Router();
bootcampsRoutes
  .route("/")
  .get(readAllBootcamps)
  .post(createNewBootcamp);
bootcampsRoutes
  .route("/:id")
  .get(readBootcampById)
  .put(updateBootcampById)
  .delete(deleteBootcampById);

module.exports = bootcampsRoutes;
