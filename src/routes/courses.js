const { Router } = require("express");

const {
  readAllCourses,
  readCourseById,
  createNewCourseByBootcampId,
} = require("../controllers/courses");

const coursesRoute = Router({ mergeParams: true });
coursesRoute
  .route("/")
  .get(readAllCourses)
  .post(createNewCourseByBootcampId);
coursesRoute.route("/:id").get(readCourseById);

module.exports = coursesRoute;
