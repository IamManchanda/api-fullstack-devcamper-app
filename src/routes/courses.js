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
const { protect } = require("../middlewares/auth");

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
  .post(protect, createNewCourseByBootcampId);
coursesRoute
  .route("/:id")
  .get(readCourseById)
  .put(protect, updateCourseById)
  .delete(protect, deleteCourseById);

module.exports = coursesRoute;
