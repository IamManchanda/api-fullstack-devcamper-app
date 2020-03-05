const { Router } = require("express");

const { readAllCourses } = require("../controllers/courses");

const coursesRoute = Router({ mergeParams: true });
coursesRoute.route("/").get(readAllCourses);

module.exports = coursesRoute;
