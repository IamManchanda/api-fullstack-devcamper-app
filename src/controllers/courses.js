const Course = require("../models/Course");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middlewares/async");

// @desc    - Read all courses or Read all courses by bootcamp id.
// @route   - GET /api/v1/courses
// @route   - GET /api/v1/bootcamps/:bootcampId/courses
// @access - Public
exports.readAllCourses = asyncHandler(async (req, res, next) => {
  const { bootcampId } = req.params;
  let query;
  if (bootcampId) {
    query = Course.find({ bootcamp: bootcampId });
  } else {
    query = Course.find();
  }
  const courses = await query;

  res.status(200).json({
    success: true,
    message: bootcampId
      ? `Successfully read all courses`
      : `Successfully read all courses by bootcamp id : ${bootcampId}`,
    data: {
      count: courses.length,
      courses,
    },
  });
});
