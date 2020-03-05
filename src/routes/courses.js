const { Router } = require("express");

const {
  readAllCourses,
  readCourseById,
  createNewCourseByBootcampId,
  updateCourseById,
  deleteCourseById,
} = require("../controllers/courses");

const coursesRoute = Router({ mergeParams: true });
coursesRoute
  .route("/")
  .get(readAllCourses)
  .post(createNewCourseByBootcampId);
coursesRoute
  .route("/:id")
  .get(readCourseById)
  .put(updateCourseById)
  .delete(deleteCourseById);

module.exports = coursesRoute;
