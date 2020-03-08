const { Router } = require("express");

const {
  readAllCourses,
  readCourseById,
  createNewCourseByBootcampId,
  updateCourseById,
  deleteCourseById,
} = require("../controllers/courses");

const Course = require("../models/Course");
const advancedResults = require("../middlewares/advanced-results");
const { protect, authorize } = require("../middlewares/auth");

const coursesRoute = Router({ mergeParams: true });
coursesRoute
  .route("/")
  .get(
    advancedResults(Course, {
      path: "bootcamp",
      select: "name description",
    }),
    readAllCourses,
  )
  .post(protect, authorize("publisher", "admin"), createNewCourseByBootcampId);
coursesRoute
  .route("/:id")
  .get(readCourseById)
  .put(protect, authorize("publisher", "admin"), updateCourseById)
  .delete(protect, authorize("publisher", "admin"), deleteCourseById);

module.exports = coursesRoute;
