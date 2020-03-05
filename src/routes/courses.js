const { Router } = require("express");

const { readAllCourses, readCourseById } = require("../controllers/courses");

const coursesRoute = Router({ mergeParams: true });
coursesRoute.route("/").get(readAllCourses);
coursesRoute.route("/:id").get(readCourseById);

module.exports = coursesRoute;
